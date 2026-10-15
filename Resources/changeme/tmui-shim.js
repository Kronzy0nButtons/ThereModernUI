// ThereModernUI - changeme/tmui-shim.js
// Headless ChangeMe. The real UI lives in the dock's Wardrobe DNA tab; this
// window only exists because the client insists on opening it, so it shrinks
// to nothing, reports its state, and executes the dock's body change commands
// (they are only accepted by the client when they come from this window).
// The two sides talk through localStorage, same origin, instant events:
//   tmui-dna      (shim -> dock)  { at, boot, open, treatments }
//   tmui-dna-cmd  (dock -> shim)  { seq, items: [{ command, query }] }
// Author: DANKIES

There.init({
  data: {
    lastSeq: 0,
    // one id per window instance: the dock reacts to a NEW id, never to a
    // heartbeat (hidden pages get their timers throttled, so beats can arrive
    // a minute apart and must not look like a fresh open)
    boot: Date.now() + ':' + Math.random(),
    open: true,
  },

  onReady: function() {
    There.fsCommand('setStageWidthHeight', {
      width: 10,
      height: 10,
    });
    // invisible: the dock is the face of this feature
    There.fsCommand('setWidthHeight', {
      width: 0,
      height: 0,
    });

    // the stock page registers these so the client doesn't nag with the
    // welcome / leave treatment dialogs. keep that behavior
    There.variables.welcometreatmentsdialog = '1';
    There.fsCommand('registerFlashProp', {
      var: 'welcomeTreatmentsDialog',
      val: '1',
    });
    There.variables.leavetreatmentsdialog = '1';
    There.fsCommand('registerFlashProp', {
      var: 'leaveTreatmentsDialog',
      val: '1',
    });

    There.announce();
    window.addEventListener('storage', function(event) {
      if (event.key == 'tmui-dna-cmd') {
        There.runCommands();
      }
    });
    window.addEventListener('beforeunload', function() {
      There.post(false);
    });
    // a heartbeat so the dock knows the engine is alive
    There.setNamedTimer('dna-beat', 2000, There.announce);
  },

  onVariable: function(name, value) {
    if (name == 'there_treatmentsenabled') {
      if (value == 1) {
        There.data.leaveAsk = 0;
        There.clearNamedTimer('dna-leave-failsafe');
      }
      There.announce();
    }
    // walking off the spa platform: ask the dock first (it may want to save
    // the look to the lookset), with a failsafe so nobody gets trapped here
    if (name == 'there_userrequestsleave' && value == 1) {
      There.variables.there_userrequestsleave = '0';
      There.data.leaveAsk = Date.now();
      There.post(true);
      There.setNamedTimer('dna-leave-failsafe', 20000, There.doLeave);
      return;
    }
    if (name == 'there_teleporting' && value == 1) {
      There.post(false);
    }
  },

  post: function(open) {
    // remember the state so heartbeats repeat the truth instead of
    // resurrecting "open" after a teleport away
    if (open !== undefined) {
      There.data.open = !!open;
    }
    try {
      localStorage.setItem('tmui-dna', JSON.stringify({
        at: Date.now(),
        boot: There.data.boot,
        open: !!There.data.open,
        treatments: There.variables.there_treatmentsenabled == 1,
        looksetName: There.variables.looksettoupdate || '',
        looksetPoid: There.variables.looksettoupdatepoid || '',
        leaveAsk: There.data.leaveAsk || 0,
        saveResult: There.data.saveResult || null,
      }));
    } catch (error) {
    }
  },

  doLeave: function() {
    There.clearNamedTimer('dna-leave-failsafe');
    There.data.leaveAsk = 0;
    There.fsCommand('requestChangeMeLeave');
    There.post(false);
    There.fsCommand('closeWindow');
  },

  announce: function() {
    There.post();
    There.setNamedTimer('dna-beat', 2000, There.announce);
  },

  runCommands: function() {
    let msg = null;
    try {
      msg = JSON.parse(localStorage.getItem('tmui-dna-cmd') || 'null');
    } catch (error) {
    }
    if (!msg || msg.seq == There.data.lastSeq) {
      return;
    }
    There.data.lastSeq = msg.seq;
    if (msg.leave) {
      There.doLeave();
      return;
    }
    if (msg.save && msg.poid) {
      There.fetch({
        path: '/ChangeMe/ReconfigureOldLookset',
        query: {
          avoid: There.variables.there_pilotdoid,
          poid: msg.poid,
          homedoid: msg.poid,
        },
        dataType: 'xml',
        success: function(xml) {
          // success here is ErrorCode 0, not the Result node other calls use
          let ok = false;
          let raw = '';
          try {
            raw = new XMLSerializer().serializeToString(xml).slice(0, 160);
            const code = xml.getElementsByTagName('ErrorCode')[0];
            ok = code ? code.textContent == '0' : false;
          } catch (error) {
          }
          There.data.saveResult = { at: Date.now(), ok: ok, raw: raw };
          There.announce();
        },
        error: function(xhr) {
          There.data.saveResult = { at: Date.now(), ok: false, raw: 'http ' + (xhr && xhr.status) };
          There.announce();
        },
      });
      return;
    }
    if (!Array.isArray(msg.items)) {
      return;
    }
    There.fsCommand('beginChangingAvatarLooks');
    for (const item of msg.items) {
      if (item && typeof item.command == 'string' && /^set[A-Za-z]+$/.test(item.command)) {
        There.fsCommand(item.command, item.query || {});
      }
    }
    There.fsCommand('endChangingAvatarLooks');
  },
});
