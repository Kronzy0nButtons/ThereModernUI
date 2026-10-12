// ThereModernUI - ytmusic.js
// YouTube music player for the dock's Music panel (search via Piped, no API key)
// Author: DANKIES
//
// Playback is the YouTube IFrame API in a tiny player. Playlists, queue and
// settings live in localStorage per avatar. Some videos have embedding
// turned off by the uploader, those just get skipped.

const YtMusic = {
  apiReady: false,
  player: null,
  playerReady: false,
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
    YtMusic.loadIFrameApi();
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
            thumb: it.thumbnail || `https://i.ytimg.com/vi/${vid}/default.jpg`,
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
    return { id: id, title: input.trim(), author: '', duration: 0, thumb: `https://i.ytimg.com/vi/${id}/default.jpg` };
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

  playTrack: function(track) {
    if (!YtMusic.playerReady || !YtMusic.player) {
      YtMusic.pendingCue = track;
      return;
    }
    try {
      YtMusic.player.loadVideoById(track.id);
      YtMusic.player.setVolume(YtMusic.data.volume);
    } catch (error) {
    }
  },

  togglePlay: function() {
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
    try { pos = YtMusic.player.getCurrentTime(); } catch (e) {}
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
