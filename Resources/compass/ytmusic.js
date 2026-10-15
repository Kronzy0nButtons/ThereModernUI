// ThereModernUI - ytmusic.js
// YouTube music player for the dock's Music panel (search via Piped, no API key)
// Author: DANKIES
//
// Playback is audio-first: Piped resolves an audio-only stream and a plain
// <audio> element plays it, far lighter than the whole YouTube iframe player
// (whose spin-up can hitch the game for a moment). The iframe only loads as a
// fallback when a stream can't be resolved. Playlists, queue and settings live
// in localStorage per avatar. Some videos have embedding turned off by the
// uploader, those just get skipped.

const YtMusic = {
  apiReady: false,
  player: null,
  playerReady: false,
  engine: 'audio',             // which engine owns playback right now
  audio: null,                 // the <audio> element (audio engine)
  audioFor: null,              // track id the audio element is playing
  nowFor: null,                // track id we were last asked to play
  onPlayerStateChange: null,   // set by dock.js to refresh the UI
  onTrackChange: null,         // set by dock.js
  pendingCue: null,            // track asked for before the player was ready

  // public Piped instances for the quick-pick list. They come and go a lot, user
  // can paste any base in Settings and ytProbe finds one that's alive
  defaultInstances: [
    'https://api.piped.private.coffee',
    'https://pipedapi.ducks.party',
    'https://pipedapi.kavin.rocks',
    'https://pipedapi.adminforge.de',
    'https://pipedapi.reallyaweso.me',
    'https://pipedapi.leptons.xyz',
  ],

  // tiny test search against an instance, callback(ok)
  probeInstance: function(base, callback) {
    base = (base || '').trim().replace(/\/+$/, '');
    if (!base) {
      callback(false);
      return;
    }
    $.ajax({
      url: `${base}/search?q=music&filter=videos`,
      dataType: 'json',
      timeout: 6000,
      success: function(data) {
        callback(!!(data && data.items));
      },
      error: function() {
        callback(false);
      },
    });
  },

  // walk the defaults, switch to the first one that answers. callback(base or null)
  autoPickInstance: function(callback) {
    const list = YtMusic.defaultInstances.slice();
    const tryNext = function(i) {
      if (i >= list.length) {
        callback(null);
        return;
      }
      YtMusic.probeInstance(list[i], function(ok) {
        if (ok) {
          YtMusic.setInstance(list[i]);
          callback(list[i]);
        } else {
          tryNext(i + 1);
        }
      });
    };
    tryNext(0);
  },

  data: {
    pilotDoid: 0,
    instance: null,            // chosen Piped API base
    playlists: [],             // [{id, name, tracks:[{id,title,author,duration,thumb}]}]
    queue: [],                 // current play queue (array of tracks)
    index: -1,                 // current index in queue
    shuffle: false,
    repeat: 'off',             // 'off' | 'all' | 'one'
    volume: 70,
  },

  init: function(pilotDoid) {
    YtMusic.data.pilotDoid = pilotDoid || 0;
    YtMusic.load();
    // the iframe API is NOT loaded here anymore: the audio engine carries
    // playback, the iframe only spins up on first fallback
    YtMusic.createAudio();
    // the first play of a session otherwise pays for both of these: the
    // browser opening its audio output, and a possibly dead Piped instance
    // timing out in silence. pay them now, while nothing is happening
    setTimeout(function() {
      YtMusic.warmAudio();
      YtMusic.checkInstance();
    }, 3500);
  },

  // an idle running AudioContext keeps the audio output open, so the first
  // real track doesn't stall on device initialization
  warmCtx: null,
  warmAudio: function() {
    if (YtMusic.warmCtx) {
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        YtMusic.warmCtx = new Ctx();
        if (YtMusic.warmCtx.resume) {
          YtMusic.warmCtx.resume().catch(function() {});
        }
      }
    } catch (error) {
    }
  },

  // make sure the chosen Piped instance is alive before anyone presses play
  checkInstance: function() {
    const base = YtMusic.data.instance;
    if (!base) {
      YtMusic.autoPickInstance(function() {});
      return;
    }
    YtMusic.probeInstance(base, function(ok) {
      if (!ok) {
        YtMusic.autoPickInstance(function() {});
      }
    });
  },

  /* ------- persistence (per avatar) ------- */

  key: function() {
    return `dock.music.${YtMusic.data.pilotDoid || 0}`;
  },

  load: function() {
    try {
      const raw = JSON.parse(localStorage.getItem(YtMusic.key()) || '{}');
      if (Array.isArray(raw.playlists)) {
        YtMusic.data.playlists = raw.playlists;
        // migrate art saved before: instance-proxied thumbnail urls rot when
        // that instance dies, YouTube's own CDN never does. the host must be
        // ytimg itself: proxied urls carry "?host=i.ytimg.com" and must not
        // slip through
        for (const pl of YtMusic.data.playlists) {
          for (const t of (pl.tracks || [])) {
            if (t && t.id && !/^https?:\/\/i\.ytimg\.com\//.test(t.thumb || '')) {
              t.thumb = `https://i.ytimg.com/vi/${t.id}/mqdefault.jpg`;
            }
          }
        }
      }
      if (typeof raw.instance == 'string') {
        YtMusic.data.instance = raw.instance;
      }
      if (raw.volume >= 0 && raw.volume <= 100) {
        YtMusic.data.volume = raw.volume;
      }
      if (raw.shuffle === true) {
        YtMusic.data.shuffle = true;
      }
      if (raw.repeat == 'all' || raw.repeat == 'one') {
        YtMusic.data.repeat = raw.repeat;
      }
    } catch (error) {
    }
    if (!YtMusic.data.instance) {
      YtMusic.data.instance = YtMusic.defaultInstances[0];
    }
  },

  save: function() {
    try {
      localStorage.setItem(YtMusic.key(), JSON.stringify({
        playlists: YtMusic.data.playlists,
        instance: YtMusic.data.instance,
        volume: YtMusic.data.volume,
        shuffle: YtMusic.data.shuffle,
        repeat: YtMusic.data.repeat,
      }));
    } catch (error) {
    }
  },

  setInstance: function(url) {
    url = (url || '').trim().replace(/\/+$/, '');
    if (url) {
      YtMusic.data.instance = url;
      YtMusic.save();
    }
  },

  /* ------- search (keyless, Piped API) ------- */

  // callback(tracks|null, err?), results already normalised to our track shape
  search: function(q, callback) {
    q = (q || '').trim();
    if (!q) {
      callback([]);
      return;
    }
    const base = YtMusic.data.instance;
    const url = `${base}/search?q=${encodeURIComponent(q)}&filter=videos`;
    $.ajax({
      url: url,
      dataType: 'json',
      timeout: 9000,
      success: function(data) {
        const items = (data && data.items) ? data.items : [];
        const tracks = [];
        for (const it of items) {
          // Piped items: url "/watch?v=ID", title, uploaderName, duration, thumbnail
          const vid = YtMusic.extractId(it.url || it.videoId || '');
          if (!vid) {
            continue;
          }
          tracks.push({
            id: vid,
            title: it.title || '(untitled)',
            author: it.uploaderName || it.author || '',
            duration: it.duration || 0,
            // never the instance's proxied thumbnail: those urls rot when the
            // instance dies. YouTube's own image CDN works for any id, always
            thumb: `https://i.ytimg.com/vi/${vid}/mqdefault.jpg`,
          });
        }
        callback(tracks);
      },
      error: function(xhr, status) {
        callback(null, status == 'timeout' ? 'The music service timed out.' : 'The music service could not be reached. Try another instance in Settings.');
      },
    });
  },

  // video id from a full URL, a /watch?v= path or a bare id
  extractId: function(s) {
    s = String(s || '').trim();
    let m = s.match(/[?&]v=([\w-]{11})/) || s.match(/youtu\.be\/([\w-]{11})/) ||
            s.match(/\/watch\?v=([\w-]{11})/) || s.match(/^([\w-]{11})$/);
    return m ? m[1] : null;
  },

  // track from a pasted URL/ID, real title gets filled in later
  trackFromInput: function(input) {
    const id = YtMusic.extractId(input);
    if (!id) {
      return null;
    }
    return { id: id, title: input.trim(), author: '', duration: 0, thumb: `https://i.ytimg.com/vi/${id}/mqdefault.jpg` };
  },

  /* ------- IFrame player ------- */

  loadIFrameApi: function() {
    if (window.YT && window.YT.Player) {
      YtMusic.apiReady = true;
      YtMusic.createPlayer();
      return;
    }
    // YT calls this global once the API script has loaded
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      if (typeof prev == 'function') { try { prev(); } catch (e) {} }
      YtMusic.apiReady = true;
      YtMusic.createPlayer();
    };
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  },

  createPlayer: function() {
    if (YtMusic.player || !document.getElementById('ytplayer')) {
      return;
    }
    YtMusic.player = new YT.Player('ytplayer', {
      height: '120',
      width: '200',
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1, rel: 0 },
      events: {
        onReady: function() {
          YtMusic.playerReady = true;
          try { YtMusic.player.setVolume(YtMusic.data.volume); } catch (e) {}
          if (YtMusic.pendingCue) {
            const t = YtMusic.pendingCue;
            YtMusic.pendingCue = null;
            YtMusic.playTrack(t);
          }
        },
        onStateChange: function(ev) {
          // ended, go to next
          if (ev.data === YT.PlayerState.ENDED) {
            YtMusic.next(true);
          }
          if (YtMusic.onPlayerStateChange) {
            YtMusic.onPlayerStateChange(ev.data);
          }
        },
        onError: function() {
          // embed disabled or video gone, skip it
          YtMusic.next(true);
        },
      },
    });
  },

  /* ------- queue + transport ------- */

  playQueue: function(tracks, startIndex) {
    YtMusic.data.queue = tracks.slice();
    YtMusic.data.index = startIndex || 0;
    YtMusic.playCurrent();
  },

  // append, and start playing if nothing is
  enqueue: function(track) {
    YtMusic.data.queue.push(track);
    if (YtMusic.data.index < 0) {
      YtMusic.data.index = YtMusic.data.queue.length - 1;
      YtMusic.playCurrent();
    }
  },

  current: function() {
    const q = YtMusic.data.queue;
    return (YtMusic.data.index >= 0 && YtMusic.data.index < q.length) ? q[YtMusic.data.index] : null;
  },

  playCurrent: function() {
    const t = YtMusic.current();
    if (t) {
      YtMusic.playTrack(t);
      if (YtMusic.onTrackChange) {
        YtMusic.onTrackChange(t);
      }
    }
  },

  /* ------- the audio engine ------- */

  createAudio: function() {
    if (YtMusic.audio) {
      return;
    }
    const a = document.createElement('audio');
    a.preload = 'auto';
    // state codes mirror YT.PlayerState so the dock's UI code needs no change
    a.addEventListener('playing', function() { YtMusic.emitState(1); });
    a.addEventListener('pause', function() {
      if (!a.ended) { YtMusic.emitState(2); }
    });
    a.addEventListener('waiting', function() { YtMusic.emitState(3); });
    a.addEventListener('ended', function() {
      YtMusic.emitState(0);
      YtMusic.next(true);
    });
    a.addEventListener('error', function() {
      // stream url expired or the instance died mid-track: iframe takes over
      const t = YtMusic.current();
      if (YtMusic.engine == 'audio' && t && YtMusic.audioFor == t.id) {
        YtMusic.playViaYt(t);
      }
    });
    YtMusic.audio = a;
  },

  emitState: function(code) {
    if (YtMusic.onPlayerStateChange) {
      YtMusic.onPlayerStateChange(code);
    }
  },

  // ask Piped for the best audio-only stream, callback(url or null, info)
  fetchAudioUrl: function(videoId, callback) {
    const base = YtMusic.data.instance;
    if (!base) {
      callback(null);
      return;
    }
    $.ajax({
      url: `${base}/streams/${encodeURIComponent(videoId)}`,
      dataType: 'json',
      timeout: 4000,
      success: function(data) {
        let best = null;
        for (const s of (data && data.audioStreams) || []) {
          if (s && s.url && /^audio\//.test(String(s.mimeType || ''))) {
            if (!best || (s.bitrate || 0) > (best.bitrate || 0)) {
              best = s;
            }
          }
        }
        callback(best ? best.url : null, data);
      },
      error: function() {
        callback(null);
      },
    });
  },

  playTrack: function(track) {
    YtMusic.nowFor = track.id;
    YtMusic.fetchAudioUrl(track.id, function(url, info) {
      if (YtMusic.nowFor != track.id) {
        return; // the user moved on while we were resolving
      }
      if (!url || !YtMusic.audio) {
        YtMusic.playViaYt(track);
        return;
      }
      // pasted links come in with no duration, the stream info has it
      if (!track.duration && info && info.duration) {
        track.duration = info.duration;
      }
      YtMusic.engine = 'audio';
      YtMusic.audioFor = track.id;
      YtMusic.stopYt();
      const a = YtMusic.audio;
      try {
        a.src = url;
        a.volume = Math.max(0, Math.min(1, (YtMusic.data.volume || 0) / 100));
        a.play().catch(function() {
          if (YtMusic.nowFor == track.id) {
            YtMusic.playViaYt(track);
          }
        });
      } catch (error) {
        YtMusic.playViaYt(track);
      }
    });
  },

  // the old path: the full YouTube iframe player, loaded on first need
  playViaYt: function(track) {
    YtMusic.engine = 'yt';
    YtMusic.audioFor = null;
    try {
      YtMusic.audio.pause();
      YtMusic.audio.removeAttribute('src');
    } catch (error) {
    }
    if (!YtMusic.playerReady || !YtMusic.player) {
      YtMusic.pendingCue = track;
      YtMusic.loadIFrameApi();
      return;
    }
    try {
      YtMusic.player.loadVideoById(track.id);
      YtMusic.player.setVolume(YtMusic.data.volume);
    } catch (error) {
    }
  },

  stopYt: function() {
    try {
      if (YtMusic.playerReady && YtMusic.player) {
        YtMusic.player.stopVideo();
      }
    } catch (error) {
    }
  },

  togglePlay: function() {
    if (YtMusic.engine == 'audio' && YtMusic.audio && YtMusic.audio.src) {
      const a = YtMusic.audio;
      if (a.paused) {
        a.play().catch(function() {});
      } else {
        a.pause();
      }
      return;
    }
    if (!YtMusic.playerReady) {
      return;
    }
    try {
      const state = YtMusic.player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        YtMusic.player.pauseVideo();
      } else {
        YtMusic.player.playVideo();
      }
    } catch (error) {
    }
  },

  isPlaying: function() {
    if (YtMusic.engine == 'audio') {
      const a = YtMusic.audio;
      return !!(a && a.src && !a.paused && !a.ended);
    }
    try {
      return YtMusic.playerReady && YtMusic.player.getPlayerState() === YT.PlayerState.PLAYING;
    } catch (error) {
      return false;
    }
  },

  next: function(auto) {
    const q = YtMusic.data.queue;
    if (q.length == 0) {
      return;
    }
    if (auto && YtMusic.data.repeat == 'one') {
      YtMusic.playCurrent();
      return;
    }
    if (YtMusic.data.shuffle) {
      YtMusic.data.index = Math.floor(Math.random() * q.length);
    } else if (YtMusic.data.index < q.length - 1) {
      YtMusic.data.index++;
    } else if (YtMusic.data.repeat == 'all') {
      YtMusic.data.index = 0;
    } else {
      return; // end of queue
    }
    YtMusic.playCurrent();
  },

  prev: function() {
    const q = YtMusic.data.queue;
    if (q.length == 0) {
      return;
    }
    // >3s in restarts the track, otherwise previous
    let pos = 0;
    if (YtMusic.engine == 'audio' && YtMusic.audio) {
      pos = YtMusic.audio.currentTime || 0;
    } else {
      try { pos = YtMusic.player.getCurrentTime(); } catch (e) {}
    }
    if (pos > 3) {
      YtMusic.playCurrent();
      return;
    }
    if (YtMusic.data.index > 0) {
      YtMusic.data.index--;
    } else if (YtMusic.data.repeat == 'all') {
      YtMusic.data.index = q.length - 1;
    }
    YtMusic.playCurrent();
  },

  setVolume: function(v) {
    v = Math.max(0, Math.min(100, Number(v) || 0));
    YtMusic.data.volume = v;
    try { if (YtMusic.audio) { YtMusic.audio.volume = v / 100; } } catch (e) {}
    try { if (YtMusic.playerReady) { YtMusic.player.setVolume(v); } } catch (e) {}
    YtMusic.save();
  },

  toggleShuffle: function() {
    YtMusic.data.shuffle = !YtMusic.data.shuffle;
    YtMusic.save();
    return YtMusic.data.shuffle;
  },

  cycleRepeat: function() {
    YtMusic.data.repeat = YtMusic.data.repeat == 'off' ? 'all' : (YtMusic.data.repeat == 'all' ? 'one' : 'off');
    YtMusic.save();
    return YtMusic.data.repeat;
  },

  /* ------- playlists ------- */

  newPlaylistId: function() {
    return 'pl' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  },

  createPlaylist: function(name) {
    name = (name || '').trim();
    if (!name) {
      return null;
    }
    const pl = { id: YtMusic.newPlaylistId(), name: name, tracks: [] };
    YtMusic.data.playlists.push(pl);
    YtMusic.save();
    return pl;
  },

  renamePlaylist: function(id, name) {
    const pl = YtMusic.data.playlists.find(p => p.id == id);
    if (pl && (name || '').trim()) {
      pl.name = name.trim();
      YtMusic.save();
    }
  },

  deletePlaylist: function(id) {
    YtMusic.data.playlists = YtMusic.data.playlists.filter(p => p.id != id);
    YtMusic.save();
  },

  addToPlaylist: function(id, track) {
    const pl = YtMusic.data.playlists.find(p => p.id == id);
    if (pl && !pl.tracks.some(t => t.id == track.id)) {
      pl.tracks.push(track);
      YtMusic.save();
    }
  },

  removeFromPlaylist: function(id, trackId) {
    const pl = YtMusic.data.playlists.find(p => p.id == id);
    if (pl) {
      pl.tracks = pl.tracks.filter(t => t.id != trackId);
      YtMusic.save();
    }
  },

  // seconds -> mm:ss
  fmtDuration: function(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  },
};
