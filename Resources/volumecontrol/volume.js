// ThereModernUI - volumecontrol/volume.js
// Headless volume window. The sliders live in the dock's Volume panel; this
// window only exists because the client hands its sound preferences to it
// (the levels arrive as variables here, and the client only takes changes
// that come from this window). It shrinks to nothing, reports the levels and
// runs the dock's changes.
// The two sides talk through localStorage, same origin, instant events:
//   tmui-vol      (window -> dock)  { at, boot, open, pong, voice, music,
//                                     environment, voiceEnabled, musicEnabled, mute }
//   tmui-vol-cmd  (dock -> window)  { seq, ping | set: {pref, value} | toggleMute | close }
// Author: DANKIES. Based on There Edge by hmphus (MIT)

There.init({
  data: {
    lastSeq: 0,
    pong: 0,
    // one id per window instance: the dock opens its panel on a NEW id
    boot: Date.now() + ':' + Math.random(),
    open: true,
    levels: {
      voice: 0,
      music: 0,
      environment: 0,
      voiceEnabled: 1,
      musicEnabled: 1,
      mute: 0,
    },
  },

  onReady: function() {
    There.fsCommand('setStageWidthHeight', {
      width: 10,
      height: 10,
    });
    // invisible: the dock is the face of this window
    There.fsCommand('setWidthHeight', {
      width: 0,
      height: 0,
    });
    window.addEventListener('storage', function(event) {
      if (event.key == 'tmui-vol-cmd') {
        There.runCommand();
      }
    });
    window.addEventListener('beforeunload', function() {
      There.post(false);
    });
    There.post(true);
    // a slider moved while this window was still starting: apply it now
    There.runCommand(5000);
  },

  onVariable: function(name, value) {
    const levels = There.data.levels;
    switch (name) {
      case 'there_voicevolume': levels.voice = Number(value); break;
      case 'there_musicvolume': levels.music = Number(value); break;
      case 'there_environmentvolume': levels.environment = Number(value); break;
      case 'there_voiceenabled': levels.voiceEnabled = Number(value); break;
      case 'there_musicenabled': levels.musicEnabled = Number(value); break;
      case 'there_muteallsound': levels.mute = Number(value); break;
      default: return;
    }
    // a slider drag sends a burst of changes, report once it settles
    There.setNamedTimer('vol-post', 60, function() {
      There.post();
    });
  },

  post: function(open) {
    if (open !== undefined) {
      There.data.open = !!open;
    }
    try {
      localStorage.setItem('tmui-vol', JSON.stringify(Object.assign({
        at: Date.now(),
        boot: There.data.boot,
        open: There.data.open,
        pong: There.data.pong,
      }, There.data.levels)));
    } catch (error) {
    }
  },

  // maxAge: only commands newer than this many ms (the startup catch-up)
  runCommand: function(maxAge) {
    let msg = null;
    try {
      msg = JSON.parse(localStorage.getItem('tmui-vol-cmd') || 'null');
    } catch (error) {
    }
    if (!msg || msg.seq == undefined || msg.seq == There.data.lastSeq) {
      return;
    }
    if (maxAge && (Date.now() - msg.seq > maxAge || msg.close)) {
      return;
    }
    There.data.lastSeq = msg.seq;
    if (msg.close) {
      There.post(false);
      There.fsCommand('closeWindow');
      return;
    }
    if (msg.ping) {
      There.data.pong = msg.seq;
      There.post();
      return;
    }
    if (msg.toggleMute) {
      There.guiCommand({
        action: 'togglepreference',
        pref: 'MuteAllSound',
      });
      return;
    }
    const allowed = ['VoiceVolume', 'MusicVolume', 'EnvironmentVolume'];
    if (msg.set && allowed.indexOf(msg.set.pref) >= 0) {
      const value = Math.max(0, Math.min(1, Number(msg.set.value) || 0));
      There.guiCommand({
        action: 'setpreference',
        pref: msg.set.pref,
        value: value,
      });
    }
  },
});
