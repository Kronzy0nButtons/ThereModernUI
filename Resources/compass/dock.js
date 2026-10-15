// ThereModernUI - dock.js
// The bottom dock: buttons, quick bar, panels and everything they open.
// Author: DANKIES
There.init({
  // Lives in the compass GUI slot. The native window is sized to the visible
  // content so empty transparent bits don't eat clicks meant for the world.
  // Draggable, and the engine remembers where you park it.
  stageWidth: 440,
  stageHeight: 120,

  compass: {
    headings: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
  },

  // Wardrobe comes from /pilotPobs/accoutrements, each item has a real `type`
  // (upperBody, lowerBody, shoes...). Tabs map to sets of types, "all" = everything.
  wardrobeTabs: [
    { id: 'all', name: 'All', types: null },
    { id: 'tops', name: 'Tops', types: ['upperbody'] },
    { id: 'bottoms', name: 'Bottoms', types: ['lowerbody'] },
    { id: 'shoes', name: 'Shoes', types: ['shoes', 'footwear'] },
    { id: 'head', name: 'Head', types: ['head', 'hair', 'hat', 'headwear'] },
    { id: 'face', name: 'Face', types: ['face', 'contacts', 'eyewear', 'glasses'] },
    { id: 'accessories', name: 'Accessories', types: ['earrings', 'accessory', 'jewelry', 'neckwear', 'wristwear', 'gloves', 'belt'] },
    // saved combos come from their own pilotPobs containers. No catalog image so
    // they get a glyph, but still Put On / About / Rename / Delete
    { id: 'outfits', name: 'Outfits', pob: 'outfits', glyph: '👔' },
    { id: 'dna', name: 'DNA', dna: true },
    { id: 'looksets', name: 'Looksets', pob: 'looksets', glyph: '✨' },
  ],

  // Emotes from the community Emotomatic db. Clicking sends it as chat, that's
  // how emotes fire in There ('twist etc)
  EMOTES: [
    { cat: 'Dances', items: ['twist', 'bodywave', 'toehop', 'handstand', 'nightfever', 'giddyup', 'yessir', 'heyhey', 'jig', 'chickendance', 'patch'] },
    { cat: 'Poses', items: ['wave', 'bow', 'clap', 'point', 'toast', 'hi5', 'tada', 'yada', 'yay', 'drat', 'doh', 'hmm', 'shrug', 'tth', 'tu', 'td', 'whatever', 'rtr', 'welcome', 'comehere', 'handup', 'hole', 'leftpose', 'rightpose', 'backpose'] },
    { cat: 'Faces', items: ['smile', 'grin', 'wink', 'laugh', 'kiss', 'coy', 'blush', 'sexy', 'tongue', 'yes', 'no', 'mad', 'angry', 'surprise', 'frown', 'sad', 'yawn', 'rolleyes', 'bluesteel'] },
    { cat: 'Icons', items: ['heart', 'flowers', 'flower', 'cash', 'daggers', 'snake', 'afk', 'rock', 'paper', 'scissors', 'boo', 'chicken', 'idea', 'curse', 'givemic', 'sleep', 'vash', 'what', 'monkey', 'cutepoint'] },
    { cat: 'Numbers', items: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    { cat: 'Sounds', items: ['cricket'] },
  ],

  // Events / Review links, straight from the client's shortcut config
  URL_EVENTS: 'https://webapps.prod.there.com/eventmgmt/eventmgmt?op=search2&HappeningNow=1&minPop=1',
  URL_REVIEW: 'https://webapps.prod.there.com/wsgi-scripts/review.py/reviewables',

  // dock buttons the user can toggle in Settings > Dock buttons.
  // settings/about minis always show so you can't hide your way out
  // group = which dock section the button lives in; reordering stays inside it.
  // main: the big buttons. view: camera controls. tools: the minis next to
  // Library / Settings / About
  DOCK_BUTTONS: [
    { id: 'friends', name: 'Friends', group: 'main' },
    { id: 'inventory', name: 'Items', group: 'main' },
    { id: 'wardrobe', name: 'Wardrobe', group: 'main' },
    { id: 'shop', name: 'Shop', group: 'main' },
    { id: 'auctions', name: 'Auctions', group: 'main' },
    { id: 'places', name: 'Places', group: 'main' },
    { id: 'events', name: 'Events', group: 'main' },
    { id: 'review', name: 'Review Something', group: 'main' },
    { id: 'emotes', name: 'Emotes', group: 'main' },
    { id: 'gifs', name: 'GIFs', group: 'main' },
    { id: 'scenes', name: 'Scenes', group: 'main' },
    { id: 'developer', name: 'Developer', group: 'main' },
    { id: 'viewstd', name: 'Standard View', group: 'view' },
    { id: 'viewface', name: 'Face Mirror', group: 'view' },
    { id: 'viewbody', name: 'Body Mirror', group: 'view' },
    { id: 'actionmode', name: 'Action Mode', group: 'tools' },
    { id: 'music', name: 'Music', group: 'tools' },
    { id: 'volume', name: 'Volume', group: 'tools' },
    { id: 'quickbar', name: 'Quick Bar', group: 'tools' },
  ],

  DOCK_GROUPS: { main: 'Main buttons', view: 'Camera views', tools: 'Tools' },

  // hidden on a fresh dock (still in the Library)
  DOCK_DEFAULT_OFF: ['review', 'developer', 'scenes'],

  // per-avatar choice wins, else default on unless in DOCK_DEFAULT_OFF
  dockButtonOn: function(id) {
    const v = (There.prefs().dock || {})[id];
    if (v === true || v === false) {
      return v;
    }
    return There.DOCK_DEFAULT_OFF.indexOf(id) < 0;
  },

  // accent themes (Settings > Theme). bright = hover/active tint
  THEMES: [
    { name: 'Sky', accent: '#38bdf8', bright: '#bae6fd' },
    { name: 'Violet', accent: '#a78bfa', bright: '#ddd6fe' },
    { name: 'Emerald', accent: '#4ade80', bright: '#bbf7d0' },
    { name: 'Pink', accent: '#f472b6', bright: '#fbcfe8' },
    { name: 'Amber', accent: '#fbbf24', bright: '#fde68a' },
    { name: 'Red', accent: '#f87171', bright: '#fecaca' },
    { name: 'Teal', accent: '#2dd4bf', bright: '#99f6e4' },
    { name: 'Slate', accent: '#94a3b8', bright: '#e2e8f0' },
    { name: 'Indigo', accent: '#818cf8', bright: '#c7d2fe' },
    { name: 'Purple', accent: '#c084fc', bright: '#e9d5ff' },
    { name: 'Cyan', accent: '#22d3ee', bright: '#a5f3fc' },
    { name: 'Lime', accent: '#a3e635', bright: '#d9f99d' },
    { name: 'Orange', accent: '#fb923c', bright: '#fed7aa' },
    { name: 'Gold', accent: '#eab308', bright: '#fde047' },
    { name: 'Rose', accent: '#fb7185', bright: '#fecdd3' },
    { name: 'Ice', accent: '#cbd5e1', bright: '#f1f5f9' },
  ],

  onReady: function() {
    There.data.panel = '';
    There.data.inventory = null;
    There.data.accoutrements = null;
    There.data.search = '';

    There.fsCommand('setStageWidthHeight', {
      width: There.stageWidth,
      height: There.stageHeight,
    });
    There.fsCommand('setTextureBitDepth', {
      depth: 32,
    });

    // every request gets a timeout unless it sets its own. There.fetch has none, and
    // the client sometimes never answers one, which used to stall whatever was
    // waiting on it for good (live sync, the chat feed...)
    $.ajaxSetup({ timeout: 20000 });

    // refit the native window whenever content changes so world clicks pass through
    new ResizeObserver(function() {
      There.syncWindowSize();
      There.syncPanelWidth();
    }).observe($('.dockroot')[0]);

    // the dock hugs the window bottom, so when the native window resizes every
    // rect moves even though the content didn't: recompute the shape
    $(window).on('resize', function() {
      There.syncWindowShape();
    });

    // cache compass nodes, heading updates come in fast
    There.data.needleEl = $('.dock .compass .rose .needle')[0];
    There.data.headingEl = $('.dock .compass .heading')[0];

    try {
      CatalogImages.init(There.variables.there_webapps);
    } catch (error) {
    }

    try {
      YtMusic.onTrackChange = There.onMusicTrack;
      YtMusic.onPlayerStateChange = There.onMusicState;
      YtMusic.init(There.data.pilotDoid || 0);
    } catch (error) {
    }

    // pause meter: any stretch the dock's page was blocked for 100ms or more,
    // with what it was doing then. shown in Settings > Sync & data
    try {
      new PerformanceObserver(function(list) {
        for (const e of list.getEntries()) {
          if (e.duration < 100) {
            continue;
          }
          const d = There.data.doing;
          const what = d && Date.now() - d.at < 3000 ? d.what : 'background';
          const worst = There.data.worstPause;
          if (!worst || e.duration > worst.ms) {
            There.data.worstPause = { ms: Math.round(e.duration), what: what };
          }
          There.data.lastPause = { ms: Math.round(e.duration), what: what };
        }
      }).observe({ entryTypes: ['longtask'] });
    } catch (error) {
    }

    // /commands in chat (the Command Bar's list, when it's installed): the dock
    // needs the chat feed open for them, even with GIFs and Party sync off
    try {
      TmuiCommands.onReady = There.ensureChatPoll;
      TmuiCommands.init();
    } catch (error) {
    }

    // F1-F12 in game: the patched FlashProxy forwards hotkeys here while the game
    // has focus. Stock FlashProxy just ignores this
    There.fsCommand('tmuiHotkeys');

    // Window shaping: with our FlashProxy, clicks outside the dock's real parts
    // fall through to the world, so the native window can keep ONE constant size.
    // That's the fix for the dock wandering up when a panel closes: the client
    // re-anchors a resized window by its top-left corner and clamps it back on
    // screen, so every resize could move it. The ack (tmui_shape) switches it on.
    try {
      const saved = JSON.parse(localStorage.getItem(There.shapeWinKey) || 'null');
      if (saved && saved.ok) {
        // shaping worked before: go to the constant size right away so the dock
        // sits at its final spot from the first frame
        There.data.windowW = saved.w || 0;
        There.fsCommand('setWidthHeight', {
          width: Math.max(1, There.data.windowW || 1),
          height: There.shapeWindowHeight(),
        });
      }
    } catch (error) {
    }
    // FlashProxy can only answer once the page is fully loaded on its side, which
    // is after this runs, so knock a few times. Stock FlashProxy never answers
    // and we drop back to tight sizing
    There.data.shapeTries = 0;
    const shapeProbe = function() {
      if (There.data.shapeOn) {
        return;
      }
      There.data.shapeTries += 1;
      if (There.data.shapeTries > 8) {
        try {
          localStorage.removeItem(There.shapeWinKey);
        } catch (error) {
        }
        There.syncWindowSize();
        return;
      }
      There.fsCommand('tmuiShape', 'rects=all');
      There.setNamedTimer('shape-probe', 1500, shapeProbe);
    };
    shapeProbe();

    // Probe the client bridge. FlashProxy intercepts 127.0.0.1:9999 in-process, so
    // this works even with the Cockpit's external port off. Once it answers,
    // setCockpit starts the startup work (light requests first, clothing last).
    There.checkCockpit();

    $('.dockroot').attr('data-ready', '1');

    // per-avatar data is keyed by doid, so lock the dock until the game tells us.
    // failsafe so we never stay locked if it never shows up
    There.updateGate();

    // newer release out? lock the dock behind an overlay that opens the release page (tmui/update.js)
    if (typeof TmuiUpdate != 'undefined') {
      $('.appvernum').text('v' + TmuiUpdate.version);
      TmuiUpdate.start(function(blocked) {
        if (blocked && There.data.panel) {
          There.closePanel();
        }
        // the overlay sits over the dock area: the input shape has to cover it
        // or the pinned window clips it out of existence
        There.data.shapeSent = null;
        There.syncWindowShape();
      });
    }
    There.setNamedTimer('avatar-failsafe', 30000, function() {
      if (!There.avatarKnown()) {
        There.data.avatarGiveUp = true;
        There.updateGate();
      }
    });
  },

  /* ------- dock gate -------
   * Overlay over the dock (panels closed) while it's not safe to use:
   *   bridge    : client not answering yet
   *   avatar    : don't know which avatar yet (per-avatar stuff would load/save wrong)
   *   switching : different avatar logged in, swapping its data in
   * Teleports already hide the dock and block hotkeys. */

  avatarKnown: function() {
    const d = String(There.data.pilotDoid || '');
    return d !== '' && d !== '0';
  },

  gateReason: function() {
    if (There.data.cockpitUp === false) {
      return 'bridge';
    }
    if (!There.avatarKnown() && !There.data.avatarGiveUp) {
      return 'avatar';
    }
    if (There.data.switchingAvatar) {
      return 'switching';
    }
    return '';
  },

  // hotkeys (F-keys, R) are also off during teleports, dock is hidden then
  inputBlocked: function() {
    if (typeof TmuiUpdate != 'undefined' && TmuiUpdate.blocked) {
      return true;
    }
    return There.gateReason() !== '' || There.data.teleporting === true;
  },

  GATE_TEXT: {
    bridge: 'Waiting for the There client\u2026',
    avatar: 'Loading your avatar\u2026',
    switching: 'Switching avatar\u2026',
  },

  updateGate: function() {
    const reason = There.gateReason();
    $('.dockroot').attr('data-gate', reason);
    if (reason) {
      $('.dockgate .dgtext').text(There.GATE_TEXT[reason]);
    }
    if ((reason == 'avatar' || reason == 'switching') && There.data.panel) {
      There.data.panel = '';
      $('.dockroot').attr('data-panel', '');
      There.clearItemMenu();
    }
  },

  /* ------- There Cockpit (local service) gate ------- */



  // Poll the local ScriptHook service and show/hide the gate.
  // One missed probe isn't enough to drop it: the embedded server is single
  // threaded, so a busy moment (menu walk etc) can time out a probe. Need 2 misses.
  checkCockpit: function() {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/ScriptHook/Get`,
      data: { Path: '/client' },
      dataType: 'xml',
      timeout: 4000,
      success: function() {
        There.data.cockpitMisses = 0;
        There.setCockpit(true);
      },
      error: function() {
        There.data.cockpitMisses = (There.data.cockpitMisses || 0) + 1;
        if (There.data.cockpitMisses >= 2 || There.data.cockpitUp === undefined) {
          There.setCockpit(false);
        }
      },
      complete: function() {
        // fast while down so it clears quickly, slow heartbeat once up
        const up = There.data.cockpitUp;
        There.setNamedTimer('cockpit-check', up ? 5000 : 1500, There.checkCockpit);
      },
    });
  },

  setCockpit: function(up) {
    const was = There.data.cockpitUp;
    There.data.cockpitUp = up;
    $('.dockroot').attr('data-cockpit', up ? 'up' : 'down');
    There.updateGate();
    $('.cockpitdot').attr('title', up
      ? 'Client Bridge: connected'
      : 'Client Bridge: waiting for the There client…');
    // lost the Cockpit, close any open panel/action bar
    if (!up && was !== false && There.data.panel) {
      There.data.panel = '';
      $('.dockroot').attr('data-panel', '');
      There.clearItemMenu();
    }
    // start the speedometer loop once; it reschedules itself forever after
    if (up && !There.data.speedoRunning) {
      There.data.speedoRunning = true;
      There.setNamedTimer('speedo', 3000, There.speedoTick);
    }
    // down -> up: kick off startup sync (inventory, action map, clothing preload)
    if (up && was === false) {
      There.playSound('menu item activate');
    }
    // bridge is up (first time or after a drop): cheap single reads first
    // (balance, action mode), then startup sync. Clothing preload always last, it's heavy
    if (up && was !== true) {
      There.refreshTbux();
      There.refreshActionMode();
      There.startupSync();
    }
  },

  onVariable: function(name, value) {
    if (name == 'tmui_hotkey') {
      // "F<n>:<seq>" from FlashProxy. seq makes every press a new value.
      // same path as clicking the slot, cooldown included
      if (There.inputBlocked()) {
        return;
      }
      if (/^R:/.test(String(value || ''))) {
        There.reloadGun();
        return;
      }
      const m = String(value || '').match(/^F(\d{1,2}):/);
      if (m && Number(m[1]) >= 1 && Number(m[1]) <= There.QUICK_SLOTS) {
        There.useQuickSlot(Number(m[1]) - 1);
      }
      return;
    }
    if (name == 'tmui_shape') {
      // FlashProxy understands window shaping: constant window size from now on
      if (!There.data.shapeOn) {
        There.data.shapeOn = true;
        There.data.shapeSent = null;
        There.saveShapeWin();
        There.syncWindowSize();
      }
      return;
    }
    // the DLL's picture store is up: photos come off disk from now on
    if (name == 'tmui_imgcache') {
      if (!CatalogImages.localLane) {
        CatalogImages.localLane = true;
        There.prefetchPhotos();
      }
      return;
    }
    if (name == 'tmui_rmb') {
      $('.speedo').attr('data-boost', value == '1' ? '1' : '0');
      return;
    }
    // Delete pressed in game: getting out. drop the needle now, then let a
    // quick seat check confirm (still seated = the key was for something
    // else, and the live needle comes straight back)
    if (name == 'tmui_getout') {
      if ($('.speedo').attr('data-active') == '1') {
        There.speedoShutdown();
        There.setNamedTimer('speedo', 900, There.speedoTick);
      }
      return;
    }
    if (name == 'tmui_chatreader') {
      // "0": the page reading the feed for us closed, read it ourselves again
      if (value == '0') {
        There.data.chatRelayAt = 0;
        There.clearNamedTimer('shadow-poll');
        There.shadowPoll();
        return;
      }
      There.onChatReaderSeen();
      return;
    }
    // FlashProxy keeps /command lines from other pages: every one is ours
    if (name == 'tmui_cmdowner') {
      There.data.cmdOwner = value == '1';
      return;
    }
    if (name == 'tmui_chatfeed') {
      There.onChatRelay(value);
      return;
    }
    if (name == 'tmui_actionmode') {
      // real Action Mode as seen by FlashProxy. once this arrives it wins
      There.data.amLive = true;
      There.data.actionMode = value == '1';
      $('.dock .item[data-id="actionmode"]').attr('data-on', value == '1' ? '1' : '').attr('data-busy', '');
      There.clearNamedTimer('actionmode-refresh');
      return;
    }
    if (name == 'tmui_keymode') {
      // off | mapped | chat, drives the Action Chat banner
      $('.dockroot').attr('data-keymode', value);
      return;
    }
    if (name == 'there_avheading') {
      // engine fires this many times a second. keep the latest value and only touch
      // the DOM once per animation frame
      There.data.heading = Number(value) || 0;
      if (!There.data.headingPending) {
        There.data.headingPending = true;
        requestAnimationFrame(There.paintHeading);
      }
      return;
    }
    if (name == 'there_teleporting') {
      There.data.teleporting = value == '1';
      $('.dockroot').attr('data-teleporting', value);
      There.clearNamedTimer('teleport-failsafe');
      if (There.data.teleporting) {
        There.setNamedTimer('teleport-failsafe', 60000, function() {
          There.data.teleporting = false;
          $('.dockroot').attr('data-teleporting', '0');
        });
      }
    }
    if (name == 'there_pilotdoid') {
      // different avatar from the loaded one: gate while we swap its data in.
      // first avatar of the session just lifts the gate
      const prev = There.avatarKnown() ? String(There.data.pilotDoid) : '';
      const switching = prev !== '' && String(value || '') !== prev;
      if (switching) {
        There.data.switchingAvatar = true;
        There.updateGate();
      }
      There.data.pilotDoid = value;
      // /commands match on the avatar's name
      if (typeof TmuiCommands != 'undefined') {
        TmuiCommands.loadPilot();
      }
      // re-key the clothing image cache to this avatar
      try {
        CatalogImages.pilotDoid = value;
        CatalogImages.poids = Object.assign({}, CatalogImages.poids, CatalogImages.loadPoids());
      } catch (error) {
      }
      // folders, Quick Bar and view prefs are per-avatar, reload them
      There.data.folderCache = {};
      There.data.quick = null;
      There.data.viewPrefs = null;
      There.applyViewPrefs();
      There.setQuickBarOpen(There.prefs().quickOpen);
      // music playlists/settings are per-avatar too
      try {
        YtMusic.data.pilotDoid = value;
        YtMusic.load();
      } catch (error) {
      }
      // re-key My Things action map (reloads lazily from this avatar's saved copy)
      // and emote favs/routines, and stop any shadow
      There.data.myThingsMap = null;
      There.data.itemPhotos = null;
      There.data.builderNames = null;
      There.data.emoteFavs = null;
      There.data.routines = null;
      There.data.routineSel = null;
      There.data.scenes = null;
      There.data.sceneSel = null;
      There.stopShadow();
      There.stopRoutine();
      There.stopScene();
      if (switching) {
        // short settle so the new avatar's Quick Bar is in place first
        There.setNamedTimer('avatar-switch', 900, function() {
          There.data.switchingAvatar = false;
          There.updateGate();
        });
      } else {
        There.updateGate();
      }
    }
    if (name == 'there_resourceshost') {
      There.data.host = value;
      // slot icons use this host. a bar drawn before it arrived has blank thumbs
      if ($('.quickbar').attr('data-active') == '1') {
        There.renderQuickBar();
      }
    }
  },

  // paint the compass once per frame, only rewrite the text when it changes
  paintHeading: function() {
    There.data.headingPending = false;
    const deg = There.data.heading || 0;
    const needle = There.data.needleEl;
    if (needle) {
      needle.style.setProperty('--heading', `${-deg}deg`);
    }
    const rounded = Math.round(deg);
    if (rounded !== There.data.headingShown) {
      There.data.headingShown = rounded;
      const headingEl = There.data.headingEl;
      if (headingEl) {
        const idx = (Math.round(deg / 45) % 8 + 8) % 8;
        headingEl.textContent = `${There.compass.headings[idx]} ${rounded}°`;
      }
    }
  },

  /* ------- speedometer -------
   * Speed: /thobs/<doid>/edprops/posOrDel/value (same source the old Flash GPS
   * addon read) gives our live world position in centimeters, so speed is just
   * distance over time. Seat detection: while in a vehicle or on a board, our
   * own presence0/interactions sprouts a "Get out"/"Get off" method. Checked
   * slowly; once seated, the position is sampled fast. The strip waits for real
   * movement before appearing, so a parked ride stays quiet, and a 30s grace
   * keeps it up at red lights. */

  SPEEDO_IDLE_MS: 2500,
  SPEEDO_FAST_MS: 400,
  SPEEDO_MIN_KMH: 6,
  // The client only trickles a ride's position out through ScriptHook, far slower
  // than it really moves, so raw distance/time reads way low. Calibrated so a
  // buggy at full throttle shows around 30 mph. Bump it if rides feel faster.
  SPEEDO_CAL: 45,
  // raw km/h below this is feed jitter while parked, show 0
  SPEEDO_DEAD_KMH: 0.15,
  // where the speed bar maxes out, in shown mph
  SPEEDO_BAR_MPH: 50,
  // tach face: 0..9 x1000 RPM, redline drawn from 7
  SPEEDO_RPM_MAX: 9,

  // "State ( x, y, z )", position in cm
  parsePosOrDel: function(xml) {
    try {
      const raw = xml.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue || '';
      const m = raw.match(/\(([^)]+)\)/);
      if (m) {
        const pos = m[1].split(',').map(parseFloat);
        if (pos.length == 3 && pos.every(n => !isNaN(n))) {
          return pos;
        }
      }
    } catch (error) {
    }
    return null;
  },

  // slow loop: are we in/on something we could drive?
  speedoTick: function() {
    const doid = There.data.pilotDoid;
    // stay quiet while the dock is busy or the bridge is down
    if (!doid || !There.data.cockpitUp || !There.prefs().speedo ||
        There.data.sweep || There.data.mapWaiters || There.data.loadingAcc) {
      There.speedoNote(!doid ? 'no doid' : !There.data.cockpitUp ? 'bridge down' : !There.prefs().speedo ? 'disabled' : 'dock busy');
      There.setSpeedo(false);
      There.setNamedTimer('speedo', 5000, There.speedoTick);
      return;
    }
    There.menuKids(`/thobs/${doid}/presence0/interactions`, function(names) {
      const seated = (names || []).some(n => /^get (out|off)\b/i.test(n));
      There.speedoNote(names == null ? 'read failed' : (seated ? 'seated' : `on foot (${(names || []).join('/') || 'none'})`));
      if (!seated) {
        There.data.speedoSeatStreak = 0;
        // the engine cuts: spin the needle down before the gauge goes
        There.speedoShutdown();
        There.data.speedoPrev = null;
        There.data.speedoEma = 0;
        There.data.speedoVeh = null;
        There.data.speedoFacing = null;
        There.data.speedoAnchor = null;
        There.data.speedoReverse = false;
        There.setNamedTimer('speedo', There.SPEEDO_IDLE_MS, There.speedoTick);
        return;
      }
      // just got out (or Delete was pressed): the menu can lag a moment and
      // still say seated. take it only on two readings in a row, so a stale
      // one can't flick the engine back on
      There.data.speedoSeatStreak = (There.data.speedoSeatStreak || 0) + 1;
      const justLeft = There.data.speedoOff ||
        Date.now() - (There.data.speedoOffAt || 0) < 3000;
      if (justLeft && There.data.speedoSeatStreak < 2) {
        There.setNamedTimer('speedo', 400, There.speedoTick);
        return;
      }
      // our own position freezes while seated, the VEHICLE's thob is what moves.
      // on mount, find it: it's the object right under us
      There.setSpeedo(true);
      if (!There.data.speedoVeh) {
        There.speedoFindVehicle(function(veh) {
          There.data.speedoVeh = veh;
          There.speedoNote(veh ? `tracking ${veh}` : 'seat found, vehicle not');
          There.data.speedoChecks = 0;
          There.speedoSample();
        });
        return;
      }
      There.data.speedoChecks = 0;
      There.speedoSample();
    });
  },

  // the thob nearest our seat spot (we just sat down ON it). one paced pass
  // over the area's objects, only ever runs once per mount
  speedoFindVehicle: function(cb) {
    const doid = There.data.pilotDoid;
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `/thobs/${doid}/edprops/posOrDel/value` },
      dataType: 'xml',
      success: function(xml) {
        const mePos = There.parsePosOrDel(xml);
        if (!mePos) {
          cb(null);
          return;
        }
        There.menuKids('/thobs', function(ids) {
          ids = (ids || []).filter(id => /^\d+$/.test(id) && id != String(doid));
          let best = null;
          let bestDist = 1500; // within 15m of the seat or it isn't our ride
          const step = function(i) {
            if (i >= ids.length) {
              cb(best);
              return;
            }
            There.fetch({
              path: '/ScriptHook/Get',
              query: { Path: `/thobs/${ids[i]}/edprops/posOrDel/value` },
              dataType: 'xml',
              success: function(xml2) {
                const p = There.parsePosOrDel(xml2);
                if (p) {
                  const d = Math.sqrt(
                    (p[0] - mePos[0]) ** 2 + (p[1] - mePos[1]) ** 2 + (p[2] - mePos[2]) ** 2);
                  if (d < bestDist) {
                    bestDist = d;
                    best = ids[i];
                  }
                }
              },
              complete: function() {
                // pace it, the embedded server is single threaded
                There.setNamedTimer('speedo-find', 40, function() {
                  step(i + 1);
                });
              },
            });
          };
          step(0);
        });
      },
      error: function() {
        cb(null);
      },
    });
  },

  // fast loop while seated: sample the vehicle's position, show the speed
  speedoSample: function() {
    const doid = There.data.pilotDoid;
    if (!doid || !There.data.cockpitUp || !There.prefs().speedo) {
      There.setSpeedo(false);
      There.setNamedTimer('speedo', 5000, There.speedoTick);
      return;
    }
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `/thobs/${There.data.speedoVeh || doid}/edprops/posOrDel/value` },
      dataType: 'xml',
      success: function(xml) {
        There.speedoMeasure(There.parsePosOrDel(xml));
        // every few samples make sure we're still seated
        There.data.speedoChecks = (There.data.speedoChecks || 0) + 1;
        // every other sample: getting out from the menu shows within half a second
        const recheck = There.data.speedoChecks % 2 == 0;
        // crawling (stops, reversing): look more often so R and N show quickly
        const crawl = (There.data.speedoEma || 0) * There.SPEEDO_CAL * 0.621 < 10;
        There.setNamedTimer('speedo', crawl ? 250 : There.SPEEDO_FAST_MS, recheck ? There.speedoTick : There.speedoSample);
      },
      error: function() {
        // the vehicle thob can vanish (put away while seated): fall back
        There.data.speedoVeh = null;
        There.setSpeedo(false);
        There.setNamedTimer('speedo', 6000, There.speedoTick);
      },
    });
  },

  speedoMeasure: function(pos) {
    const now = Date.now();
    const prev = There.data.speedoPrev;
    let kmh = 0;
    if (pos && prev && now - prev.t > 200) {
      const dt = (now - prev.t) / 1000;
      const d = Math.sqrt(
        (pos[0] - prev.p[0]) ** 2 + (pos[1] - prev.p[1]) ** 2 + (pos[2] - prev.p[2]) ** 2);
      kmh = d / dt * 0.036;
      // a teleport looks like warp speed, swallow it
      if (kmh > 700) {
        kmh = 0;
        There.data.speedoEma = 0;
      }
    }
    if (pos) {
      There.speedoTrackReverse(pos, kmh * There.SPEEDO_CAL * 0.621);
      There.gpsFeed(pos);
    }
    if (pos) {
      There.data.speedoPrev = { p: pos, t: now };
    }
    // quick on the throttle, settles smoothly when coasting
    There.data.speedoEma = (There.data.speedoEma || 0) * 0.35 + kmh * 0.65;
    // samples only feed a gauge that's up and running. turning it on (or back
    // on mid spin-down) is the seat check's job alone: a sample still in
    // flight when you got out must not restart the engine
    if (There.data.speedoOff || $('.speedo').attr('data-active') != '1') {
      return;
    }
    const shown = There.data.speedoEma < There.SPEEDO_DEAD_KMH ? 0 : There.data.speedoEma * There.SPEEDO_CAL;
    There.showSpeedo(shown);
  },

  // Reverse. The game exposes no heading for a vehicle, only where it is, so
  // the way it's FACING is learned from driving: moving forward, facing is
  // the direction of travel. A car can't spin round on the spot, so when it
  // slows to a crawl and then moves off the other way, it's backing up (and
  // while reversing it faces away from its travel). The world is a sphere, so
  // "up" is away from its centre and only the level part of the motion counts.
  // The first move after getting in is taken as forward.
  // Direction is judged once the vehicle has really covered a little ground
  // since the last judgement (parked jitter stays well inside it), not by
  // speed: reversing builds speed slowly and must still show at once.
  SPEEDO_STEP: 1.2,
  // faster than this (shown mph) can't be reverse gear
  SPEEDO_REVERSE_MAX: 12,

  speedoTrackReverse: function(pos, mph) {
    const anchor = There.data.speedoAnchor;
    if (!anchor) {
      There.data.speedoAnchor = pos;
      return;
    }
    const r = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1] + pos[2] * pos[2]) || 1;
    const up = [pos[0] / r, pos[1] / r, pos[2] / r];
    let d = [pos[0] - anchor[0], pos[1] - anchor[1], pos[2] - anchor[2]];
    const rise = d[0] * up[0] + d[1] * up[1] + d[2] * up[2];
    d = [d[0] - rise * up[0], d[1] - rise * up[1], d[2] - rise * up[2]];
    const len = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    if (len < There.SPEEDO_STEP) {
      return;
    }
    There.data.speedoAnchor = pos;
    const dir = [d[0] / len, d[1] / len, d[2] / len];
    // reverse gear is slow: anything quick is forward. this also corrects a
    // wrong start (dock reloaded mid-ride and the first move was backing up)
    if (mph > There.SPEEDO_REVERSE_MAX) {
      There.data.speedoFacing = dir;
      There.data.speedoReverse = false;
      return;
    }
    const facing = There.data.speedoFacing;
    if (!facing) {
      There.data.speedoFacing = dir;
      There.data.speedoReverse = false;
      return;
    }
    const dot = dir[0] * facing[0] + dir[1] * facing[1] + dir[2] * facing[2];
    const back = [-dir[0], -dir[1], -dir[2]];
    // a flip only counts at crawling speed: nothing turns round at speed
    const slow = mph < 10;
    if (!There.data.speedoReverse) {
      if (dot < -0.5 && slow) {
        There.data.speedoReverse = true;
        There.data.speedoFacing = back;
      } else if (dot > -0.5) {
        There.data.speedoFacing = dir;
      }
    } else {
      // reversing: travel points out the back, so moving WITH facing = forward
      if (dot > 0.5 && slow) {
        There.data.speedoReverse = false;
        There.data.speedoFacing = dir;
      } else if (dot < 0.5) {
        There.data.speedoFacing = back;
      }
    }
  },

  setSpeedo: function(on) {
    // back in the seat mid spin-down: the engine catches again
    if (on && There.data.speedoOff) {
      There.data.speedoOff = null;
    }
    const was = $('.speedo').attr('data-active') == '1';
    if (on && !was) {
      // show first so the position code can measure it
      $('.speedo').attr('data-active', '1');
      There.speedoStartup();
      There.applySpeedoPos();
      There.syncWindowShape();
      return;
    }
    $('.speedo').attr('data-active', on ? '1' : '0');
    if (was != on) {
      There.syncWindowShape();
    }
  },

  // the gauge is draggable; its spot is kept as right/bottom offsets so it
  // stays put relative to the screen corner across sessions
  applySpeedoPos: function() {
    try {
      const pos = JSON.parse(localStorage.getItem('dock.speedopos') || 'null');
      if (pos && pos.r >= 0 && pos.b >= 0) {
        $('.speedo').css({ right: `${pos.r}px`, bottom: `${pos.b}px` });
        return;
      }
    } catch (error) {
    }
    // no saved spot yet: sit centered over the dock where a new player sees it
    const el = $('.speedo')[0];
    if (el) {
      const w = el.getBoundingClientRect().width || 240;
      $('.speedo').css('right', `${Math.max(2, Math.round((window.innerWidth - w) / 2))}px`);
    }
  },

  saveSpeedoPos: function() {
    const el = $('.speedo')[0];
    if (!el) {
      return;
    }
    const r = el.getBoundingClientRect();
    try {
      localStorage.setItem('dock.speedopos', JSON.stringify({
        r: Math.round(window.innerWidth - r.right),
        b: Math.round(window.innerHeight - r.bottom),
      }));
    } catch (error) {
    }
  },

  // debug note while we chase the seat signal, shows in Settings next to the
  // sync status. cheap: only writes when the text changes
  speedoNote: function(text) {
    if (There.data.speedoNote !== text) {
      There.data.speedoNote = text;
      There.updateSyncStatus();
    }
  },

  // tick marks + numbers around the 240 degree tach dial (0-9, x1000 RPM),
  // drawn once. actual speed shows digitally in the middle
  buildSpeedoDial: function() {
    const NS = 'http://www.w3.org/2000/svg';
    const ticks = $('.speedo .sgticks')[0];
    const labels = $('.speedo .sglabels')[0];
    if (!ticks || !labels || ticks.childNodes.length) {
      return;
    }
    const max = There.SPEEDO_RPM_MAX;
    for (let v = 0; v <= max * 2; v++) {
      const major = v % 2 == 0;
      const deg = (210 - 240 * (v / (max * 2))) * Math.PI / 180;
      const cos = Math.cos(deg);
      const sin = Math.sin(deg);
      const line = document.createElementNS(NS, 'line');
      const r1 = major ? 70 : 73;
      line.setAttribute('x1', 100 + r1 * cos);
      line.setAttribute('y1', 104 - r1 * sin);
      line.setAttribute('x2', 100 + 78 * cos);
      line.setAttribute('y2', 104 - 78 * sin);
      if (!major) {
        line.setAttribute('data-minor', '1');
      }
      ticks.appendChild(line);
      if (major) {
        const text = document.createElementNS(NS, 'text');
        text.setAttribute('x', 100 + 56 * cos);
        text.setAttribute('y', 104 - 56 * sin + 5);
        text.textContent = v / 2;
        labels.appendChild(text);
      }
    }
    const legend = document.createElementNS(NS, 'text');
    legend.setAttribute('class', 'sglegend');
    legend.setAttribute('x', 100);
    legend.setAttribute('y', 76);
    legend.textContent = 'x1000 RPM';
    labels.appendChild(legend);
  },

  // new target for the gauge; a little lerp loop glides everything there so the
  // needle and arc never jump in steps between samples
  showSpeedo: function(kmh) {
    There.buildSpeedoDial();
    There.data.speedoTarget = kmh;
    if (!There.data.speedoAnimOn) {
      There.data.speedoAnimOn = true;
      requestAnimationFrame(There.speedoAnim);
    }
  },

  // There's vehicles have no gearbox: the engine is one sound whose pitch
  // rises with speed. The needle follows that same note, one smooth climb from
  // idle to near the redline at top speed, never dropping on a fake shift.
  // Boost leans it toward the redline. Rising a little faster at the start
  // keeps it in step with how the pitch is heard pulling away
  SPEEDO_IDLE_RPM: 0.9,
  SPEEDO_TOP_RPM: 7.4,

  // automatic: neutral at a stop, drive when moving, R when backing up
  speedoGear: function(mph) {
    // the smoothed speed lags at a crawl: a detected reverse shows at once
    if (There.data.speedoReverse && mph > 0.05) {
      return 'R';
    }
    if (mph < 0.4) {
      return 'N';
    }
    return 'D';
  },

  speedoRpm: function(mph, boost) {
    const f = Math.max(0, Math.min(1, mph / There.SPEEDO_BAR_MPH));
    let rpm = There.SPEEDO_IDLE_RPM + Math.pow(f, 0.8) * (There.SPEEDO_TOP_RPM - There.SPEEDO_IDLE_RPM);
    rpm += (boost || 0) * 1.1;
    return Math.min(rpm, 8.6);
  },

  /* ------- photo prefetch -------
   * Hand the picture store every wardrobe and inventory photo, in batches,
   * so they're on disk before a panel opens. It skips the ones it already
   * has, so this is cheap to repeat whenever the lists change. */

  prefetchPhotos: function() {
    if (!CatalogImages.localLane || !CatalogImages.loaded) {
      return;
    }
    const items = (There.data.accoutrements || []).concat(There.data.inventory || []);
    const sent = There.data.photosSent = There.data.photosSent || {};
    const files = [];
    for (const f of CatalogImages.filesFor(items)) {
      if (!sent[f]) {
        sent[f] = true;
        files.push(f);
      }
    }
    // the wardrobe opens on All: its photos first
    let i = 0;
    const batch = function() {
      if (i >= files.length) {
        return;
      }
      There.fsCommand('tmuiPrefetch', { files: files.slice(i, i + 80).join('|') });
      i += 80;
      There.setNamedTimer('photo-prefetch', 250, batch);
    };
    batch();
  },

  /* ------- GPS screen beside the speedo -------
   * The Places map engine (gpsmaps.js) on a tilted plane, heading-up like a
   * sat-nav: the map turns and slides under a fixed car arrow. Fed by the
   * speedo's own position samples, drawn in its animation frames, so it
   * costs no extra reads from the game. */

  GPS_PLANE: 520,

  gpsFeed: function(pos) {
    if (!There.prefs().gps || !There.prefs().gpsOpen || typeof TmuiMaps == 'undefined') {
      return;
    }
    const at = TmuiMaps.locate(pos);
    if (!at) {
      return;
    }
    // the same ground distance per screen pixel on every island: zoom by the
    // map's own scale
    const r = TmuiMaps.region(at.id);
    const z = r ? Math.max(1.4, Math.min(6, r.sx / 40)) : 2.5;
    const g = There.data.gps;
    if (!g || g.src != at.src) {
      // a different map: jump straight there, no slide across the sea
      There.data.gps = { src: at.src, x: at.px, y: at.py, z: z, tx: at.px, ty: at.py, tz: z };
      $('.gpsimg').attr('src', at.src);
      $('.gpsname').text(at.name);
    } else {
      g.tx = at.px;
      g.ty = at.py;
      g.tz = z;
    }
  },

  gpsFrame: function() {
    const g = There.data.gps;
    if (!g || !There.prefs().gps || !There.prefs().gpsOpen) {
      return;
    }
    // glide between samples; samples are a quarter to half a second apart
    g.x += (g.tx - g.x) * 0.12;
    g.y += (g.ty - g.y) * 0.12;
    g.z += (g.tz - g.z) * 0.1;
    const half = There.GPS_PLANE / 2;
    const h = There.data.heading || 0;
    $('.gpsmap').css('transform',
      `translate(${half}px, ${half}px) rotate(${-h}deg) scale(${g.z}) translate(${-g.x}px, ${-g.y}px)`);
    // the sea's grid turns and drifts with the map, so motion reads even
    // over open water
    $('.gpssea').css({
      transform: `rotate(${-h}deg)`,
      'background-position': `${-g.x * g.z}px ${-g.y * g.z}px`,
    });
  },

  // getting out cuts the engine: the gauge stays up while it spins down, then
  // slides away
  speedoShutdown: function() {
    if ($('.speedo').attr('data-active') != '1') {
      return;
    }
    if (There.data.speedoOff) {
      return;
    }
    const rpm = There.data.speedoRpmShown || 0;
    There.data.speedoOff = { engine: rpm, n: rpm, v: 0, last: performance.now(), still: 0 };
    There.data.speedoOffAt = Date.now();
    There.data.speedoSeatStreak = 0;
    There.data.speedoTarget = 0;
    $('.speedo .spdval').text('0');
    There.data.speedoDigits = 0;
    $('.speedo .spdgear').text('N');
    There.data.speedoGearShown = 'N';
    if (!There.data.speedoAnimOn) {
      There.data.speedoAnimOn = true;
      requestAnimationFrame(There.speedoAnim);
    }
  },

  // one frame of the spin-down. the engine's revs fall away fast then trail
  // off; the needle is a sprung pointer chasing them, so it lags a touch,
  // knocks against the zero peg and settles. true once it's all at rest
  speedoSpinDown: function() {
    const s = There.data.speedoOff;
    const now = performance.now();
    const dt = Math.min(0.05, (now - s.last) / 1000);
    s.last = now;
    s.engine = Math.max(0, s.engine * Math.exp(-dt * 4.5) - 0.8 * dt);
    const accel = (s.engine - s.n) * 140 - s.v * 13;
    s.v += accel * dt;
    s.n += s.v * dt;
    if (s.n < 0) {
      s.n = 0;
      // off the peg with a little of its speed, then dead
      s.v = Math.abs(s.v) > 0.15 ? -s.v * 0.32 : 0;
    }
    const frac = Math.max(0, Math.min(1, s.n / There.SPEEDO_RPM_MAX));
    $('.speedo .sgneedle').css('transform', `rotate(${-30 + 240 * frac}deg)`);
    $('.speedo .sgfill').css('stroke-dashoffset', 360.2 * (1 - frac));
    There.data.speedoRpmShown = s.n;
    if (s.engine == 0 && s.n < 0.01 && Math.abs(s.v) < 0.05) {
      s.still += dt;
    } else {
      s.still = 0;
    }
    // a beat at rest on the peg before the gauge goes
    return s.still > 0.6;
  },

  // getting in: the starter cranks the needle in jerky pulses, the engine
  // catches and flares past 2k, then drops back and settles into its idle.
  // same sprung needle as the spin-down
  speedoStartup: function() {
    There.buildSpeedoDial();
    There.data.speedoOff = null;
    There.data.speedoStart = { t: 0, n: 0, v: 0, last: performance.now() };
    if (!There.data.speedoAnimOn) {
      There.data.speedoAnimOn = true;
      requestAnimationFrame(There.speedoAnim);
    }
  },

  // where the engine's revs are, t seconds into a start
  speedoCrankRpm: function(t) {
    if (t < 0.8) {
      // starter motor churning: a few lumpy pulses a second, not firing yet
      return 0.15 + Math.abs(Math.sin(t * 11)) * 0.55 + Math.sin(t * 47) * 0.03;
    }
    if (t < 1.0) {
      // it catches
      return 0.6 + (t - 0.8) / 0.2 * 1.9;
    }
    // the flare dies back down to idle
    return There.SPEEDO_IDLE_RPM + 1.6 * Math.exp(-(t - 1.0) * 3.2);
  },

  // one frame of the start. true once it has settled to idle
  speedoCrank: function() {
    const s = There.data.speedoStart;
    const now = performance.now();
    const dt = Math.min(0.05, (now - s.last) / 1000);
    s.last = now;
    s.t += dt;
    const engine = There.speedoCrankRpm(s.t);
    const accel = (engine - s.n) * 160 - s.v * 14;
    s.v += accel * dt;
    s.n += s.v * dt;
    if (s.n < 0) {
      s.n = 0;
      s.v = Math.abs(s.v) > 0.15 ? -s.v * 0.32 : 0;
    }
    const frac = Math.max(0, Math.min(1, s.n / There.SPEEDO_RPM_MAX));
    $('.speedo .sgneedle').css('transform', `rotate(${-30 + 240 * frac}deg)`);
    $('.speedo .sgfill').css('stroke-dashoffset', 360.2 * (1 - frac));
    There.data.speedoRpmShown = s.n;
    return s.t > 2.4;
  },

  speedoAnim: function() {
    if ($('.speedo').attr('data-active') != '1') {
      There.data.speedoAnimOn = false;
      There.data.speedoShown = 0;
      There.data.speedoOff = null;
      There.data.speedoStart = null;
      There.data.gps = null;
      return;
    }
    There.gpsFrame();
    if (There.data.speedoStart && !There.data.speedoOff) {
      // pulling away mid-start: hand over to the live needle at once
      const moving = (There.data.speedoTarget || 0) * 0.621 > 2;
      if (moving || There.speedoCrank()) {
        There.data.speedoStart = null;
      }
      requestAnimationFrame(There.speedoAnim);
      return;
    }
    if (There.data.speedoOff) {
      if (There.speedoSpinDown()) {
        There.data.speedoOff = null;
        There.data.speedoShown = 0;
        There.data.speedoRpmShown = 0;
        There.setSpeedo(false);
      }
      requestAnimationFrame(There.speedoAnim);
      return;
    }
    const target = There.data.speedoTarget || 0;
    let shown = There.data.speedoShown || 0;
    // letting off drops quicker than pulling away climbs, like the engine note
    shown += (target - shown) * (target < shown ? 0.16 : 0.08);
    if (Math.abs(target - shown) < 0.05) {
      shown = target;
    }
    There.data.speedoShown = shown;
    const mph = shown * 0.621;
    // boost eases in and out rather than stepping
    const boostOn = $('.speedo').attr('data-boost') == '1' ? 1 : 0;
    There.data.speedoBoost = (There.data.speedoBoost || 0) + (boostOn - (There.data.speedoBoost || 0)) * 0.06;
    // the rev needle tracks the speed closely (it IS the engine note), with a
    // touch of smoothing so sample steps don't make it twitch
    const rpmTarget = There.speedoRpm(mph, There.data.speedoBoost);
    let rpm = There.data.speedoRpmShown;
    rpm = rpm == undefined ? rpmTarget : rpm + (rpmTarget - rpm) * (rpmTarget < rpm ? 0.22 : 0.14);
    There.data.speedoRpmShown = rpm;
    // an old beach buggy's lumpy idle: the needle shivers and now and then
    // stumbles, fading out as soon as it pulls away. display only, never fed
    // back into the needle's own motion
    const idle = Math.max(0, 1 - mph / 4);
    let wobble = 0;
    if (idle > 0) {
      const t = performance.now() / 1000;
      wobble = Math.sin(t * 23) * 0.03 + Math.sin(t * 7.3 + 1.7) * 0.045;
      // the stumble: a short dip every couple of seconds, off the beat
      const lump = Math.sin(t * 2.9) * Math.sin(t * 1.3 + 0.6);
      if (lump > 0.82) {
        wobble -= (lump - 0.82) * 0.6;
      }
      wobble *= idle;
    }
    const frac = Math.max(0, Math.min(1, (rpm + wobble) / There.SPEEDO_RPM_MAX));
    $('.speedo .sgneedle').css('transform', `rotate(${-30 + 240 * frac}deg)`);
    $('.speedo .sgfill').css('stroke-dashoffset', 360.2 * (1 - frac));
    const rounded = Math.round(mph);
    if (rounded !== There.data.speedoDigits) {
      There.data.speedoDigits = rounded;
      $('.speedo .spdval').text(rounded);
    }
    const gear = There.speedoGear(mph);
    if (gear !== There.data.speedoGearShown) {
      There.data.speedoGearShown = gear;
      $('.speedo .spdgear').text(gear);
    }
    requestAnimationFrame(There.speedoAnim);
  },

  // panels match the dock's width: measure the pill, publish it as --panel-w
  syncPanelWidth: function() {
    const dock = $('.dock')[0];
    const root = $('.dockroot')[0];
    if (!dock || !root) {
      return;
    }
    const w = Math.max(360, Math.round(dock.getBoundingClientRect().width));
    root.style.setProperty('--panel-w', w + 'px');
  },

  // send a chat line through the chat console (this is how emotes fire)
  sendChat: function(text) {
    if (!text) {
      return;
    }
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: {
        Path: '/acc/addChatText',
        Args: `text=${text.substring(0, 80)}\n`,
      },
      dataType: 'xml',
    });
  },

  /* ------- emotes: favorites + grid ------- */

  emoteFavsKey: function() {
    return `dock.emotefavs.${There.data.pilotDoid || 0}`;
  },

  emoteFavs: function() {
    if (!There.data.emoteFavs) {
      try {
        There.data.emoteFavs = JSON.parse(localStorage.getItem(There.emoteFavsKey()) || '[]') || [];
      } catch (error) {
        There.data.emoteFavs = [];
      }
    }
    return There.data.emoteFavs;
  },

  toggleEmoteFav: function(name) {
    let favs = There.emoteFavs();
    const i = favs.indexOf(name);
    if (i >= 0) {
      favs.splice(i, 1);
    } else {
      favs.push(name);
    }
    try {
      localStorage.setItem(There.emoteFavsKey(), JSON.stringify(favs));
    } catch (error) {
    }
    There.playSound('control down');
    There.renderEmotes($('.emotesearch input').val());
  },

  // fire an emote. in add-to-routine mode it appends a step instead
  emoteClick: function(name) {
    if (There.data.routineAdd) {
      const r = There.routineById(There.data.routineAdd);
      if (r) {
        r.steps.push({ e: name, d: 2 });
        There.saveRoutines();
        There.playSound('control down');
        $('.emotebanner .ebtext').text(`Adding to "${r.name}" (${r.steps.length} steps). Click emotes to add more.`);
        return;
      }
    }
    There.playSound('close menu');
    There.sendChat(`'${name}'`);
    There.maybeAutoClose();
  },

  // emote grid by category, Favorites on top. one HTML string + delegated
  // handlers (no per-chip closures) so it's as cheap as the inventory grid
  renderEmotes: function(filter) {
    filter = (filter || '').trim().toLowerCase();
    const favs = There.emoteFavs();
    const esc = function(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    };
    const chip = function(n) {
      const fav = favs.indexOf(n) >= 0;
      return `<div class="emotebtn" data-emote="${esc(n)}"${fav ? ' data-fav="1"' : ''}>'${esc(n)}</div>`;
    };
    let html = '';
    let shown = 0;
    const favItems = favs.filter(n => !filter || n.toLowerCase().includes(filter));
    if (favItems.length) {
      html += `<div class="emotegroup"><div class="eglabel">★ Favorites</div><div class="egitems">${favItems.map(chip).join('')}</div></div>`;
      shown += favItems.length;
    }
    for (const group of There.EMOTES) {
      const items = filter ? group.items.filter(n => n.toLowerCase().includes(filter)) : group.items;
      if (!items.length) {
        continue;
      }
      html += `<div class="emotegroup"><div class="eglabel">${esc(group.cat)}</div><div class="egitems">${items.map(chip).join('')}</div></div>`;
      shown += items.length;
    }
    if (shown == 0) {
      html = '<div class="empty">No emotes match.</div>';
    }
    $('.emotesbody').html(html);
  },

  /* ------- emote routines (sequencer) ------- */

  routinesKey: function() {
    return `dock.routines.${There.data.pilotDoid || 0}`;
  },

  routines: function() {
    if (!There.data.routines) {
      try {
        const raw = JSON.parse(localStorage.getItem(There.routinesKey()) || '{}');
        There.data.routines = Array.isArray(raw.routines) ? raw.routines : [];
      } catch (error) {
        There.data.routines = [];
      }
    }
    return There.data.routines;
  },

  saveRoutines: function() {
    try {
      localStorage.setItem(There.routinesKey(), JSON.stringify({ routines: There.routines() }));
    } catch (error) {
    }
  },

  routineById: function(id) {
    return There.routines().find(r => r.id == id) || null;
  },

  setEmoteTab: function(tab) {
    There.data.emoteTab = tab;
    $('.emotespanel').attr('data-etab', tab);
    $('.emotetabs .tab').attr('data-active', '0');
    $(`.emotetabs .tab[data-etab="${tab}"]`).attr('data-active', '1');
    if (tab == 'routines') {
      There.renderRoutines();
    }
  },

  renderRoutines: function() {
    const body = $('.routinesbody');
    $(body).empty();
    const routines = There.routines();

    // playback / shadow status
    if (There.data.routinePlaying) {
      const r = There.routineById(There.data.routinePlaying.id);
      let st = $('<div class="rtstatus"></div>');
      $('<span></span>').text(`Playing "${r ? r.name : '?'}", step ${There.data.routinePlaying.index + 1}/${There.data.routinePlaying.steps.length}${There.data.routinePlaying.loop ? ' · looping' : ''}`).appendTo($(st));
      $('<div class="rtbtn" data-danger="1"></div>').text('Stop').on('click', function() {
        There.stopRoutine();
        There.renderRoutines();
      }).appendTo($(st));
      $(st).appendTo($(body));
    }

    // routine chips + new
    let chips = $('<div class="rtchips"></div>');
    for (const r of routines) {
      (function(rt) {
        let c = $('<div class="plchip"></div>').text(rt.name);
        if (There.data.routineSel == rt.id) {
          $(c).attr('data-active', '1');
        }
        $(c).on('click', function() {
          There.data.routineSel = rt.id;
          There.renderRoutines();
        });
        $(c).appendTo($(chips));
      })(r);
    }
    $('<div class="plchip" data-accent="1"></div>').text('+ New routine').on('click', function() {
      There.showFolderPrompt('New routine', '', function(name) {
        name = (name || '').trim();
        if (name) {
          const r = { id: 'rt' + Date.now().toString(36), name: name, loop: false, steps: [] };
          There.routines().push(r);
          There.saveRoutines();
          There.data.routineSel = r.id;
        }
        There.renderRoutines();
      });
    }).appendTo($(chips));
    $(chips).appendTo($(body));

    // editor for the selected routine
    const sel = There.routineById(There.data.routineSel);
    if (sel) {
      let ed = $('<div class="rteditor"></div>');
      let row = $('<div class="rtcontrols"></div>');
      $('<div class="rtbtn" data-accent="1"></div>').html(tmuiIcon('play') + ' Play').on('click', function() {
        There.playRoutine(sel.id);
      }).appendTo($(row));
      let loopBtn = $('<div class="rtbtn"></div>').html(tmuiIcon('repeat') + ' Loop').attr('data-on', sel.loop ? '1' : '0');
      $(loopBtn).on('click', function() {
        sel.loop = !sel.loop;
        There.saveRoutines();
        There.renderRoutines();
      });
      $(loopBtn).appendTo($(row));
      $('<div class="rtbtn"></div>').html(tmuiIcon('plus') + ' Add steps').on('click', function() {
        There.data.routineAdd = sel.id;
        $('.emotebanner').attr('data-active', '1');
        $('.emotebanner .ebtext').text(`Adding to "${sel.name}" (${sel.steps.length} steps). Click emotes to add more.`);
        There.setEmoteTab('emotes');
      }).appendTo($(row));
      $('<div class="rtbtn"></div>').text('Rename').on('click', function() {
        There.showFolderPrompt('Rename routine', sel.name, function(name, action) {
          if (action == 'delete') {
            There.data.routines = There.routines().filter(r => r.id != sel.id);
            There.data.routineSel = null;
            There.saveRoutines();
          } else if ((name || '').trim()) {
            sel.name = name.trim();
            There.saveRoutines();
          }
          There.renderRoutines();
        }, true);
      }).appendTo($(row));
      $(row).appendTo($(ed));

      if (sel.steps.length == 0) {
        $('<div class="rthint"></div>').text('No steps yet. Use "Add steps", then click emotes to build the routine.').appendTo($(ed));
      }
      sel.steps.forEach(function(step, i) {
        let srow = $('<div class="rtstep"></div>');
        if (There.data.routinePlaying && There.data.routinePlaying.id == sel.id && There.data.routinePlaying.index == i) {
          $(srow).attr('data-now', '1');
        }
        $('<span class="rtnum"></span>').text(i + 1).appendTo($(srow));
        $('<span class="rtname"></span>').text(`'${step.e}`).appendTo($(srow));
        let delay = $('<input type="number" class="rtdelay" min="0.5" max="60" step="0.5">').val(step.d);
        $(delay).on('change input', function() {
          const v = Math.max(0.5, Math.min(60, Number($(this).val()) || 2));
          step.d = v;
          There.saveRoutines();
        }).on('mousedown keydown', function(ev) {
          ev.stopPropagation();
          if (ev.type == 'keydown' && !$(this).is(':focus')) {
        There.fsCommand('getKeyboardFocus');
            $(this).focus();
          }
        });
        $(delay).appendTo($(srow));
        $('<span class="rtsec"></span>').text('s').appendTo($(srow));
        $('<div class="rtbtn rtx" data-danger="1"></div>').html(tmuiIcon('xmark')).on('click', function() {
          sel.steps.splice(i, 1);
          There.saveRoutines();
          There.renderRoutines();
        }).appendTo($(srow));
        $(srow).appendTo($(ed));
      });
      $(ed).appendTo($(body));
    } else if (routines.length == 0) {
      $('<div class="rthint"></div>').text('Build dance routines: a sequence of emotes with a delay between each. Create one to get started.').appendTo($(body));
    }

    let sh = $('<div class="shadowbox"></div>');
    $('<div class="eglabel"></div>').text('Shadow an avatar').appendTo($(sh));
    $('<div class="rthint"></div>').text('Copies every emote they chat (‘twist etc.) the moment they do it, for synced routines with another player.').appendTo($(sh));
    let srow = $('<div class="shrow"></div>');
    let input = $('<input type="text" class="shname" placeholder="Avatar name" spellcheck="false">').val(There.data.shadowTarget || '');
    $(input).on('mousedown keydown click', function(ev) {
      ev.stopPropagation();
      if (!$(this).is(':focus')) {
        There.fsCommand('getKeyboardFocus');
        $(this).focus();
      }
    });
    $(input).appendTo($(srow));
    let btn = $('<div class="rtbtn"></div>');
    if (There.data.shadowOn) {
      $(btn).attr('data-danger', '1').text('Stop shadowing');
    } else {
      $(btn).attr('data-accent', '1').text('Shadow');
    }
    $(btn).on('click', function() {
      if (There.data.shadowOn) {
        There.stopShadow();
      } else {
        There.startShadow($(input).val());
      }
      There.renderRoutines();
    });
    $(btn).appendTo($(srow));
    $(srow).appendTo($(sh));
    if (There.data.shadowOn) {
      $('<div class="rtstatus"></div>').text(`Shadowing ${There.data.shadowTarget}. Their emotes play on you.`).appendTo($(sh));
    }
    $(sh).appendTo($(body));
  },

  /* routine playback */

  playRoutine: function(id) {
    const r = There.routineById(id);
    if (!r || !r.steps.length) {
      return;
    }
    There.stopRoutine();
    There.data.routinePlaying = { id: id, steps: r.steps.slice(), index: -1, loop: r.loop };
    There.playSound('close menu');
    There.routineStep();
    There.renderRoutines();
  },

  routineStep: function() {
    const p = There.data.routinePlaying;
    if (!p) {
      return;
    }
    p.index++;
    if (p.index >= p.steps.length) {
      if (p.loop) {
        p.index = 0;
      } else {
        There.stopRoutine();
        if (There.data.panel == 'emotes' && There.data.emoteTab == 'routines') {
          There.renderRoutines();
        }
        return;
      }
    }
    const step = p.steps[p.index];
    There.sendChat(`'${step.e}'`);
    if (There.data.panel == 'emotes' && There.data.emoteTab == 'routines') {
      $('.rtstep').attr('data-now', '0');
      $('.rtstep').eq(p.index).attr('data-now', '1');
    }
    There.setNamedTimer('routine-step', Math.max(500, (step.d || 2) * 1000), There.routineStep);
  },

  stopRoutine: function() {
    There.clearNamedTimer('routine-step');
    There.data.routinePlaying = null;
  },

  /* shadow mode: replay another avatar's chat emotes live */

  startShadow: function(name) {
    name = (name || '').trim();
    if (!name) {
      return;
    }
    if (name.toLowerCase() == (There.variables.there_pilotname || '').toLowerCase()) {
      return; // shadowing yourself would echo forever
    }
    There.data.shadowTarget = name;
    There.data.shadowOn = true;
    There.playSound('close menu');
    // announce it so the target knows what's going on
    There.sendChat(`[TMUI] [SHADOW] Shadowing ${name}'s Emotes`);
    There.ensureChatPoll();
  },

  stopShadow: function() {
    if (There.data.shadowOn && There.data.shadowTarget) {
      There.sendChat(`[TMUI] [SHADOW] Stopped shadowing ${There.data.shadowTarget}'s Emotes`);
    }
    There.data.shadowOn = false;
    There.ensureChatPoll();
  },

  // start/stop the shared chat feed poll depending on who needs it (shadow, party sync)
  ensureChatPoll: function() {
    const need = There.data.shadowOn || There.prefs().party || There.prefs().gifs ||
      (typeof TmuiCommands != 'undefined' && TmuiCommands.ready());
    if (need && !There.data.chatPollOn) {
      There.data.chatPollOn = true;
      There.data.shadowVer = undefined;
      There.data.chatSeen = null;
      There.setNamedTimer('shadow-poll', 8000, There.shadowPoll);
    } else if (!need && There.data.chatPollOn) {
      There.data.chatPollOn = false;
      There.clearNamedTimer('shadow-poll');
    }
  },

  // Poll the local chat feed (version-gated, only NEW lines come back) and hand
  // lines to Shadow (replay emote tokens) and Party sync (play other TMUI users'
  // tracks). Same trick There Edge's shortcut bar uses for its puppeteer.
  // Read the chat feed the way the client expects: ONE request open at a time,
  // passing lastVer, and the client answers when new chat arrives (which can be
  // minutes when it's quiet). Never time it out or abandon it: the client keeps an
  // abandoned request open, they pile up, and other windows' feeds (the Command
  // Bar's /commands typed in chat) stop being answered. Only re-ask after an answer.
  CHAT_POLL_MS: 1000,

  shadowPoll: function() {
    if (!There.data.chatPollOn || There.data.chatPolling) {
      return;
    }
    // another page (the Command Bar) reads the feed and FlashProxy hands us a copy:
    // don't read it too, two readers split the lines between them. If the copies
    // stop for 15 minutes (that page closed), go back to reading it ourselves
    if (There.data.chatRelayAt && Date.now() - There.data.chatRelayAt < 15 * 60 * 1000) {
      There.setNamedTimer('shadow-poll', 60000, There.shadowPoll);
      return;
    }
    if (!There.data.cockpitUp) {
      There.setNamedTimer('shadow-poll', 2000, There.shadowPoll);
      return;
    }
    const query = { Oid: 1, request: Math.random() };
    if (There.data.shadowVer != undefined) {
      query.lastVer = There.data.shadowVer;
    }
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    There.data.chatPolling = true;
    let failed = false;
    There.data.chatXhr = $.ajax({
      url: `http://${host}/VersionedXmlSvc/CommMessageData`,
      data: query,
      dataType: 'xml',
      timeout: 0, // no timeout on purpose, see above
      success: function(xml) {
        There.handleChatXml(xml, There.data.shadowVer == undefined, true);
      },
      error: function() {
        failed = true;
      },
      complete: function() {
        There.data.chatPolling = false;
        // straight back in after an answer; back off a little after an error
        There.setNamedTimer('shadow-poll', failed ? 5000 : There.CHAT_POLL_MS, There.shadowPoll);
      },
    });
  },

  // A chat feed answer (our own, or the Command Bar's copy from FlashProxy).
  // backlog = what was already there when the reader started: remember it,
  // don't act on it. direct = we read it ourselves, so no other page got
  // these lines (only then do we run /commands, or they'd run twice)
  handleChatXml: function(xml, backlog, direct) {
    try {
      const ver = xml.getElementsByTagName('version')[0]?.childNodes[0]?.nodeValue;
      if (ver != undefined) {
        There.data.shadowVer = ver;
      }
      const lines = [];
      for (const xmlMsg of xml.getElementsByTagName('msg')) {
        const author = xmlMsg.getElementsByTagName('authorName')[0]?.childNodes[0]?.nodeValue || '';
        let text = '';
        const xmlText = xmlMsg.getElementsByTagName('text')[0];
        if (xmlText) {
          for (const child of xmlText.childNodes) {
            if (child.tagName == undefined) {
              text += child.nodeValue;
            }
          }
        }
        lines.push({ author: author, text: text, key: author + '\u0001' + text });
      }
      if (backlog) {
        There.data.chatSeen = lines.map(l => l.key).slice(-50);
        return;
      }
      // lastVer answers only carry new lines, but be safe if a whole buffer comes back
      const prev = There.data.chatSeen || [];
      const fresh = lines.length > 1 && prev.length ? There.newChatLines(prev, lines) : lines;
      There.data.chatSeen = prev.concat(fresh.map(l => l.key)).slice(-50);
      for (const line of fresh) {
        There.onChatLine(line.author, line.text, !!direct);
      }
    } catch (error) {
    }
  },

  // FlashProxy saw another page (the Command Bar) ask the chat feed. From now on
  // we take its copies instead of reading the feed ourselves. If we already had
  // a read open, end it once (it can't be helped, it may take one line with it).
  onChatReaderSeen: function() {
    const first = !There.data.chatRelayAt;
    There.data.chatRelayAt = Date.now();
    if (first && There.data.chatXhr && There.data.chatPolling) {
      try {
        There.data.chatXhr.abort();
      } catch (error) {
      }
    }
  },

  // "tmui_chatfeed" from FlashProxy: "<0 backlog | 1 new>|<xml>"
  onChatRelay: function(value) {
    const v = String(value || '');
    const bar = v.indexOf('|');
    if (bar < 0) {
      return;
    }
    let xml;
    try {
      xml = $.parseXML(v.slice(bar + 1));
    } catch (error) {
      return;
    }
    There.onChatReaderSeen();
    const commands = typeof TmuiCommands != 'undefined' && TmuiCommands.ready();
    if (!There.prefs().gifs && !There.prefs().party && !There.data.shadowOn && !commands) {
      return;
    }
    There.handleChatXml(xml, v.slice(0, bar) === '0');
  },

  // The buffer slides: old lines drop off the front, new ones land at the end.
  // Find where the last few lines we saw now sit and take everything after them.
  // A 5 line anchor keeps a repeated message (same GIF twice) from being missed.
  newChatLines: function(prevKeys, lines) {
    for (let len = Math.min(5, prevKeys.length); len > 0; len--) {
      const tail = prevKeys.slice(prevKeys.length - len);
      for (let end = lines.length - 1; end >= len - 1; end--) {
        let hit = true;
        for (let k = 0; k < len; k++) {
          if (lines[end - len + 1 + k].key !== tail[k]) {
            hit = false;
            break;
          }
        }
        if (hit) {
          return lines.slice(end + 1);
        }
      }
    }
    // none of what we saw is in this reply, so it's all new
    return lines;
  },

  onChatLine: function(author, text, direct) {
    const target = (There.data.shadowTarget || '').toLowerCase();
    const me = (There.variables.there_pilotname || '').toLowerCase();
    // a /command: ours when we typed it, or when the player we mimic did
    // (/emote <name>). lines the Command Bar also got are ours only once
    // FlashProxy hides /commands from it (cmdOwner), or both would run them
    if ((direct || There.data.cmdOwner) && typeof TmuiCommands != 'undefined' && TmuiCommands.ready()) {
      const lower = author.toLowerCase();
      const puppeteer = String(TmuiCommands.session.puppeteer || '').toLowerCase();
      const trimmed = text.trim();
      if (lower == me && trimmed.startsWith('/')) {
        TmuiCommands.run(trimmed);
        return;
      }
      if (puppeteer && lower == puppeteer) {
        if (trimmed.startsWith('/')) {
          TmuiCommands.run(trimmed);
        }
        for (const token of trimmed.split(' ')) {
          if (/^['`]+[a-zA-Z0-9]+$/.test(token)) {
            There.sendChat(token + token[0]);
          }
        }
      }
    }
    // party sync: someone broadcast a track, play along
    if (There.prefs().party && author.toLowerCase() != me) {
      // "[TMUI] [DJ] [<id>]" (older docks sent "[TMUI] np:<id>")
      const pm = text.match(/\[TMUI\] (?:\[DJ\] \[([A-Za-z0-9_-]{11})\]|np:([A-Za-z0-9_-]{11}))/);
      const pid = pm && (pm[1] || pm[2]);
      if (pid && There.data.lastPartyId != pid) {
        There.data.lastPartyId = pid;
        There.playPartyTrack(pid, author);
      }
    }
    // GIFs: someone (maybe you) shared "[TMUI] [GIF] [<id>]"
    if (There.prefs().gifs) {
      const gm = text.match(There.GIF_TAG);
      if (gm) {
        There.receiveGif(gm[1], author);
      }
    }
    // shadow: replay the target's emotes. all forms count: 'twist (bubble),
    // 'twist' (hidden), ['twist'] (how the feed records hidden). resend as hidden
    if (There.data.shadowOn && author.toLowerCase() == target) {
      for (const token of text.split(/\s+/)) {
        const m = token.match(/^\[?(['`]+)([a-zA-Z0-9]+)['`]*\]?$/);
        if (m) {
          There.sendChat(m[1][0] + m[2] + m[1][0]);
        }
      }
    }
  },

  /* ------- Scenes: one action that chains many -------
   * A scene is a named list of steps, each run after its own delay:
   *   outfit   : put on a saved outfit/lookset   {pob, poid, name}
   *   wear     : put on one clothing item        {poid, name}
   *   emote    : chat an emote                   {e}
   *   routine  : start a dance routine           {id, name}
   *   music    : play a playlist / pause         {pl, name}  (pl '' = pause)
   *   camera   : switch view                     {view: std|face|body}
   *   item     : an inventory action             {name, doid, action}
   * Per avatar. A scene can go on a Quick Bar slot / F-key. */

  SCENE_TYPES: [
    { id: 'outfit', name: 'Outfit', icon: 'shirt' },
    { id: 'wear', name: 'Clothing', icon: 'shirt' },
    { id: 'emote', name: 'Emote', icon: 'face-smile' },
    { id: 'routine', name: 'Routine', icon: 'person-running' },
    { id: 'music', name: 'Music', icon: 'music' },
    { id: 'camera', name: 'Camera', icon: 'camera' },
    { id: 'item', name: 'Item', icon: 'box-open' },
  ],

  CAMERA_VIEWS: [
    { id: 'std', name: 'Standard View', path: '/mainMenu/Views/Standard View/activate' },
    { id: 'face', name: 'Face Mirror', path: '/mainMenu/Views/Face Mirror/activate' },
    { id: 'body', name: 'Body Mirror', path: '/mainMenu/Views/Body Mirror/activate' },
  ],

  scenesKey: function() {
    return `dock.scenes.${There.data.pilotDoid || 0}`;
  },

  scenes: function() {
    if (!There.data.scenes) {
      try {
        const raw = JSON.parse(localStorage.getItem(There.scenesKey()) || '{}');
        There.data.scenes = Array.isArray(raw.scenes) ? raw.scenes : [];
      } catch (error) {
        There.data.scenes = [];
      }
    }
    return There.data.scenes;
  },

  saveScenes: function() {
    try {
      localStorage.setItem(There.scenesKey(), JSON.stringify({ scenes: There.scenes() }));
    } catch (error) {
    }
  },

  sceneById: function(id) {
    return There.scenes().find(s => s.id == id) || null;
  },

  // one-line readable description of a step
  sceneStepText: function(st) {
    switch (st.type) {
      case 'outfit': return st.name || 'Outfit';
      case 'wear': return st.name || 'Clothing';
      case 'emote': return `'${st.e}`;
      case 'routine': return st.name || 'Routine';
      case 'music': return st.pl ? `Play "${st.name}"` : 'Pause music';
      case 'camera': {
        const v = There.CAMERA_VIEWS.find(c => c.id == st.view);
        return v ? v.name : 'Camera';
      }
      case 'item': return `${st.action}: ${st.name}`;
    }
    return st.type;
  },

  /* playback */

  playScene: function(id) {
    const sc = There.sceneById(id);
    if (!sc || !sc.steps.length) {
      return;
    }
    There.stopScene();
    There.data.scenePlaying = { id: id, steps: sc.steps.slice(), index: -1 };
    There.playSound('close menu');
    There.sceneStep();
    if (There.data.panel == 'scenes') {
      There.renderScenes();
    }
  },

  sceneStep: function() {
    const p = There.data.scenePlaying;
    if (!p) {
      return;
    }
    p.index++;
    if (p.index >= p.steps.length) {
      There.data.scenePlaying = null;
      if (There.data.panel == 'scenes') {
        There.renderScenes();
      }
      return;
    }
    const st = p.steps[p.index];
    // delay runs BEFORE the step so "wait 2s, then dance" reads right.
    // first step's delay is usually 0
    There.setNamedTimer('scene-step', Math.max(0, (Number(st.d) || 0) * 1000), function() {
      if (There.data.scenePlaying !== p) {
        return;
      }
      try {
        There.runSceneStep(st);
      } catch (error) {
      }
      if (There.data.panel == 'scenes') {
        $('.scstep').attr('data-now', '0');
        $('.scstep').eq(p.index).attr('data-now', '1');
      }
      There.sceneStep();
    });
  },

  runSceneStep: function(st) {
    switch (st.type) {
      case 'outfit':
      case 'wear':
        There.fetch({
          path: '/ScriptHook/Invoke',
          query: { Path: `/pilotPobs/${st.pob || 'accoutrements'}/${st.poid}/Put on` },
          dataType: 'xml',
        });
        break;
      case 'emote':
        There.sendChat(`'${st.e}'`);
        break;
      case 'routine':
        There.playRoutine(st.id);
        break;
      case 'music': {
        if (!st.pl) {
          if (YtMusic.isPlaying()) {
            YtMusic.togglePlay();
          }
          break;
        }
        const pl = YtMusic.data.playlists.find(x => x.id == st.pl);
        if (pl && pl.tracks.length) {
          YtMusic.playQueue(pl.tracks, 0);
        }
        break;
      }
      case 'camera': {
        const v = There.CAMERA_VIEWS.find(c => c.id == st.view);
        if (v) {
          There.invokeMenu(v.path);
        }
        break;
      }
      case 'item':
        There.invokeInventoryMenuAction({ name: st.name, doid: st.doid }, st.action);
        break;
    }
  },

  stopScene: function() {
    There.clearNamedTimer('scene-step');
    There.data.scenePlaying = null;
  },

  /* editor */

  renderScenes: function() {
    const body = $('.scenesbody');
    $(body).empty();
    const scenes = There.scenes();

    if (There.data.scenePlaying) {
      const sp = There.sceneById(There.data.scenePlaying.id);
      let st = $('<div class="rtstatus"></div>');
      $('<span></span>').text(`Playing "${sp ? sp.name : '?'}"`).appendTo($(st));
      $('<div class="rtbtn" data-danger="1"></div>').html(tmuiIcon('stop') + ' Stop').on('click', function() {
        There.stopScene();
        There.renderScenes();
      }).appendTo($(st));
      $(st).appendTo($(body));
    }

    // scene chips (drag onto the Quick Bar) + new
    let chips = $('<div class="rtchips"></div>');
    for (const sc of scenes) {
      (function(s) {
        let c = $('<div class="plchip"></div>').html(tmuiIcon('clapperboard')).append($('<span></span>').text(s.name));
        if (There.data.sceneSel == s.id) {
          $(c).attr('data-active', '1');
        }
        $(c).attr('title', 'Click to edit · drag onto the Quick Bar');
        $(c).on('click', function() {
          There.data.sceneSel = s.id;
          There.data.scenePicker = null;
          There.renderScenes();
        });
        There.makeDraggable(c, { kind: 'scene', sceneId: s.id, name: s.name });
        $(c).appendTo($(chips));
      })(sc);
    }
    $('<div class="plchip" data-accent="1"></div>').text('+ New scene').on('click', function() {
      There.showFolderPrompt('New scene', '', function(name) {
        name = (name || '').trim();
        if (name) {
          const s = { id: 'sc' + Date.now().toString(36), name: name, steps: [] };
          There.scenes().push(s);
          There.saveScenes();
          There.data.sceneSel = s.id;
        }
        There.renderScenes();
      });
    }).appendTo($(chips));
    $(chips).appendTo($(body));

    const sel = There.sceneById(There.data.sceneSel);
    if (!sel) {
      $('<div class="rthint"></div>').text(scenes.length
        ? 'Pick a scene to edit it.'
        : 'A scene chains outfits, clothing, emotes, routines, music, camera views and item actions into ONE action. Create one to get started.').appendTo($(body));
      return;
    }

    let row = $('<div class="rtcontrols"></div>');
    $('<div class="rtbtn" data-accent="1"></div>').html(tmuiIcon('play') + ' Play').on('click', function() {
      There.playScene(sel.id);
    }).appendTo($(row));
    $('<div class="rtbtn"></div>').html(tmuiIcon('plus') + ' Add step').on('click', function() {
      There.data.scenePicker = There.data.scenePicker ? null : 'emote';
      There.renderScenes();
    }).appendTo($(row));
    $('<div class="rtbtn"></div>').text('Rename').on('click', function() {
      There.showFolderPrompt('Rename scene', sel.name, function(name, action) {
        if (action == 'delete') {
          There.data.scenes = There.scenes().filter(s => s.id != sel.id);
          There.data.sceneSel = null;
          There.saveScenes();
        } else if ((name || '').trim()) {
          sel.name = name.trim();
          There.saveScenes();
        }
        There.renderScenes();
      }, true);
    }).appendTo($(row));
    $(row).appendTo($(body));

    if (!sel.steps.length) {
      $('<div class="rthint"></div>').text('No steps yet. Use "Add step". Each step waits its delay, then runs.').appendTo($(body));
    }
    sel.steps.forEach(function(st, i) {
      let srow = $('<div class="rtstep scstep"></div>');
      if (There.data.scenePlaying && There.data.scenePlaying.id == sel.id && There.data.scenePlaying.index == i) {
        $(srow).attr('data-now', '1');
      }
      $('<span class="rtnum"></span>').text(i + 1).appendTo($(srow));
      const t = There.SCENE_TYPES.find(x => x.id == st.type);
      let nm = $('<span class="rtname"></span>');
      $('<span class="sctype"></span>').text(t ? t.name : st.type).appendTo($(nm));
      $('<span></span>').text(There.sceneStepText(st)).appendTo($(nm));
      $(nm).appendTo($(srow));
      $('<span class="rtsec"></span>').text('after').appendTo($(srow));
      let delay = $('<input type="number" class="rtdelay" min="0" max="60" step="0.5">').val(st.d || 0);
      $(delay).on('change input', function() {
        st.d = Math.max(0, Math.min(60, Number($(this).val()) || 0));
        There.saveScenes();
      }).on('mousedown keydown', function(ev) {
        ev.stopPropagation();
        if (ev.type == 'keydown' && !$(this).is(':focus')) {
          There.fsCommand('getKeyboardFocus');
          $(this).focus();
        }
      });
      $(delay).appendTo($(srow));
      $('<span class="rtsec"></span>').text('s').appendTo($(srow));
      $('<div class="rtbtn rtx" data-danger="1"></div>').html(tmuiIcon('xmark')).on('click', function() {
        sel.steps.splice(i, 1);
        There.saveScenes();
        There.renderScenes();
      }).appendTo($(srow));
      $(srow).appendTo($(body));
    });

    if (There.data.scenePicker) {
      There.renderScenePicker(body, sel);
    }
  },

  // add-step picker: type row, then a form for that type
  renderScenePicker: function(body, sel) {
    const kind = There.data.scenePicker;
    let box = $('<div class="scpicker"></div>');
    let types = $('<div class="sctypes"></div>');
    for (const t of There.SCENE_TYPES) {
      (function(tt) {
        let c = $('<div class="plchip"></div>').html(tmuiIcon(tt.icon)).append($('<span></span>').text(tt.name));
        if (kind == tt.id) {
          $(c).attr('data-active', '1');
        }
        $(c).on('click', function() {
          There.data.scenePicker = tt.id;
          There.renderScenes();
        });
        $(c).appendTo($(types));
      })(t);
    }
    $(types).appendTo($(box));

    let form = $('<div class="scform"></div>');
    const add = function(step) {
      step.d = sel.steps.length ? 1 : 0;
      sel.steps.push(step);
      There.saveScenes();
      There.playSound('control down');
      There.renderScenes();
    };
    const selectOf = function(options, placeholder) {
      let s = $('<select></select>');
      $('<option value=""></option>').text(placeholder).appendTo($(s));
      for (const o of options) {
        $('<option></option>').attr('value', o.v).text(o.t).appendTo($(s));
      }
      $(s).on('mousedown', function(ev) { ev.stopPropagation(); });
      return s;
    };
    const addBtn = function(onClick) {
      return $('<div class="rtbtn" data-accent="1"></div>').html(tmuiIcon('plus') + ' Add').on('click', onClick);
    };

    switch (kind) {
      case 'emote': {
        const opts = [];
        for (const g of There.EMOTES) {
          for (const n of g.items) {
            opts.push({ v: n, t: `${g.cat}: '${n}` });
          }
        }
        const s = selectOf(opts, 'Choose an emote…');
        $(form).append(s, addBtn(function() {
          if ($(s).val()) {
            add({ type: 'emote', e: $(s).val() });
          }
        }));
        break;
      }
      case 'routine': {
        const s = selectOf(There.routines().map(r => ({ v: r.id, t: r.name })), There.routines().length ? 'Choose a routine…' : 'No routines yet (make one in Emotes)');
        $(form).append(s, addBtn(function() {
          const r = There.routineById($(s).val());
          if (r) {
            add({ type: 'routine', id: r.id, name: r.name });
          }
        }));
        break;
      }
      case 'music': {
        const opts = [{ v: '__pause', t: 'Pause music' }].concat(YtMusic.data.playlists.map(p => ({ v: p.id, t: `Play "${p.name}"` })));
        const s = selectOf(opts, 'Choose…');
        $(form).append(s, addBtn(function() {
          const v = $(s).val();
          if (v == '__pause') {
            add({ type: 'music', pl: '' });
          } else if (v) {
            const p = YtMusic.data.playlists.find(x => x.id == v);
            if (p) {
              add({ type: 'music', pl: p.id, name: p.name });
            }
          }
        }));
        break;
      }
      case 'camera': {
        const s = selectOf(There.CAMERA_VIEWS.map(c => ({ v: c.id, t: c.name })), 'Choose a view…');
        $(form).append(s, addBtn(function() {
          if ($(s).val()) {
            add({ type: 'camera', view: $(s).val() });
          }
        }));
        break;
      }
      case 'outfit': {
        // saved outfits + looksets (loaded on demand, cached with the wardrobe)
        There.data.pobCache = There.data.pobCache || {};
        const have = function() {
          return [].concat(
            (There.data.pobCache.outfits || []).map(o => ({ v: `outfits|${o.poid}`, t: `Outfit: ${o.name}` })),
            (There.data.pobCache.looksets || []).map(o => ({ v: `looksets|${o.poid}`, t: `Lookset: ${o.name}` })));
        };
        const missing = ['outfits', 'looksets'].filter(k => !There.data.pobCache[k]);
        if (missing.length) {
          $('<div class="rthint"></div>').text('Loading your outfits…').appendTo($(form));
          let left = missing.length;
          for (const k of missing) {
            const tab = There.wardrobeTabs.find(t => t.pob == k);
            There.loadPobList(tab, function(items) {
              There.data.pobCache[k] = items;
              if (--left == 0 && There.data.panel == 'scenes' && There.data.scenePicker == 'outfit') {
                There.renderScenes();
              }
            });
          }
          break;
        }
        const s = selectOf(have(), have().length ? 'Choose an outfit…' : 'No saved outfits');
        $(form).append(s, addBtn(function() {
          const v = $(s).val();
          if (!v) {
            return;
          }
          const [pob, poid] = v.split('|');
          const o = (There.data.pobCache[pob] || []).find(x => x.poid == poid);
          add({ type: 'outfit', pob: pob, poid: poid, name: o ? o.name : 'Outfit' });
        }));
        break;
      }
      case 'wear': {
        // search clothing (synced at startup)
        let input = $('<input type="text" placeholder="Search clothing…" spellcheck="false">');
        let results = $('<div class="scresults"></div>');
        const draw = function() {
          const q = ($(input).val() || '').trim().toLowerCase();
          $(results).empty();
          if (!q) {
            return;
          }
          const hits = (There.data.accoutrements || []).filter(a => a.name.toLowerCase().includes(q)).slice(0, 30);
          for (const a of hits) {
            (function(it) {
              $('<div class="plchip"></div>').text(it.name).on('click', function() {
                add({ type: 'wear', poid: it.poid, name: it.name });
              }).appendTo($(results));
            })(a);
          }
          if (!hits.length) {
            $('<div class="rthint"></div>').text(There.data.accoutrements ? 'No matches.' : 'Clothing is still syncing…').appendTo($(results));
          }
        };
        $(input).on('mousedown click', function(ev) {
          ev.stopPropagation();
          if (!$(this).is(':focus')) {
            There.fsCommand('getKeyboardFocus');
            $(this).focus();
          }
        }).on('keydown', function(ev) {
          ev.stopPropagation();
        }).on('input', function() {
          There.setNamedTimer('scene-wear-search', 120, draw);
        });
        $(form).append(input, results);
        break;
      }
      case 'item': {
        // inventory items + one of their actions
        const items = (There.data.inventory || []);
        const si = selectOf(items.map(it => ({ v: it.doid, t: it.name })), items.length ? 'Choose an item…' : 'Inventory is still syncing…');
        let sa = selectOf([], 'Action…');
        $(si).on('change', function() {
          const it = items.find(x => x.doid == $(si).val());
          $(sa).empty();
          $('<option value=""></option>').text('Action…').appendTo($(sa));
          const labels = it ? (it.menuActions && it.menuActions.length ? it.menuActions
            : There.knownActions(it) || (it.interactions || '').split(',').map(p => (p.split(':')[1] || '').trim()).filter(Boolean)) : [];
          for (const l of labels) {
            $('<option></option>').attr('value', l).text(l).appendTo($(sa));
          }
        });
        $(form).append(si, sa, addBtn(function() {
          const it = items.find(x => x.doid == $(si).val());
          if (it && $(sa).val()) {
            add({ type: 'item', name: it.name, doid: it.doid, action: $(sa).val() });
          }
        }));
        break;
      }
    }
    $(form).appendTo($(box));
    $(box).appendTo($(body));
  },

  /* ------- GIFs (KLIPY) -------
   * Search KLIPY, share a GIF in chat as "[TMUI] [GIF] [<slug>]". Other TMUI
   * docks on the chat feed look the slug up and show it above the dock. Only the
   * slug goes through chat and images only load from KLIPY's CDN, so nobody can
   * push random images/links onto other screens. No rating filter, There is 18+.
   * Searches debounced + cached, lookups cached per slug. */

  // KLIPY API key (one for everyone). NOT in this file or git: the build makes
  // klipykey.js from a local secrets file with the key scrambled (window.TMUI_KLIPY)
  // and we unscramble it here. No file = GIFs just say unavailable.
  KLIPY_KEY: (function() {
    try {
      const blob = atob(window.TMUI_KLIPY || '');
      const mask = 'ThereModernUI';
      let key = '';
      for (let i = 0; i < blob.length; i++) {
        key += String.fromCharCode(blob.charCodeAt(i) ^ mask.charCodeAt(i % mask.length));
      }
      return key;
    } catch (error) {
      return '';
    }
  })(),
  KLIPY_BASE: 'https://api.klipy.com/api/v1/',
  GIF_TAG: /\[TMUI\] \[GIF\] \[([A-Za-z0-9-]{3,100})\]/,

  // KLIPY wants a per-user id, so a random anonymous one per install
  klipyCustomer: function() {
    if (There.data.klipyCustomer) {
      return There.data.klipyCustomer;
    }
    let id = '';
    try {
      id = localStorage.getItem('tmui.klipyCustomer') || '';
      if (!id) {
        id = 'tmui-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('tmui.klipyCustomer', id);
      }
    } catch (error) {
      id = id || 'tmui-anon';
    }
    There.data.klipyCustomer = id;
    return id;
  },

  klipyUrl: function(path, params) {
    const q = new URLSearchParams(Object.assign({ customer_id: There.klipyCustomer() }, params || {}));
    return `${There.KLIPY_BASE}${encodeURIComponent(There.KLIPY_KEY)}/gifs/${path}?${q.toString()}`;
  },

  isKlipyUrl: function(url) {
    return /^https:\/\/static\.klipy\.com\//.test(String(url || ''));
  },

  // best URL for a size (sm ~220px), webp first
  klipyMedia: function(g, size) {
    const f = g && g.file && (g.file[size] || g.file.sm || g.file.xs || g.file.md);
    const m = f && (f.webp || f.gif);
    return m && There.isKlipyUrl(m.url) ? m.url : '';
  },

  // still frame (jpg). grid uses these so 30+ GIFs don't all animate at once
  // (the HUD re-renders every frame)
  klipyStill: function(g, size) {
    const f = g && g.file && (g.file[size] || g.file.sm || g.file.xs);
    const m = f && f.jpg;
    return m && There.isKlipyUrl(m.url) ? m.url : '';
  },

  renderGifs: function(query) {
    const body = $('.gifsbody');
    if (!There.KLIPY_KEY) {
      $(body).html('<div class="empty">GIFs aren&#8217;t available in this build yet.</div>');
      return;
    }
    const q = String(query || '').trim();
    const seq = There.data.gifSeq = (There.data.gifSeq || 0) + 1;
    There.data.gifCache = There.data.gifCache || {};
    const cacheKey = q.toLowerCase() || ':trending';
    const show = function(list) {
      if (seq != There.data.gifSeq) {
        return;
      }
      $(body).empty();
      if (!list.length) {
        $(body).html('<div class="empty">No GIFs found.</div>');
        return;
      }
      for (const g of list) {
        const url = There.klipyMedia(g, 'sm');
        if (!url || !g.slug) {
          continue;
        }
        const still = There.klipyStill(g, 'sm') || url;
        const tile = $('<div class="giftile"></div>').css('background-image', `url("${still}")`).attr('title', g.title || 'GIF');
        // only the hovered tile animates
        $(tile).on('mouseenter', function() {
          $(this).css('background-image', `url("${url}")`);
        }).on('mouseleave', function() {
          $(this).css('background-image', `url("${still}")`);
        }).on('click', function() {
          There.sendGif(g);
        });
        $(tile).appendTo($(body));
      }
    };
    if (There.data.gifCache[cacheKey]) {
      show(There.data.gifCache[cacheKey]);
      return;
    }
    $(body).html('<div class="empty">Loading&#8230;</div>');
    const url = q
      ? There.klipyUrl('search', { q: q, per_page: 24, page: 1, locale: 'en_US' })
      : There.klipyUrl('trending', { per_page: 24, page: 1, locale: 'en_US' });
    fetch(url).then(r => r.json()).then(function(json) {
      const list = (json && json.data && Array.isArray(json.data.data)) ? json.data.data : [];
      There.data.gifCache[cacheKey] = list;
      show(list);
    }).catch(function() {
      if (seq == There.data.gifSeq) {
        $(body).html('<div class="empty">Couldn&#8217;t reach KLIPY right now. Try again in a moment.</div>');
      }
    });
  },

  sendGif: function(g) {
    const now = Date.now();
    if (now - (There.data.gifLast || 0) < 4000) {
      $('.gifsnote').text('Wait a moment between GIFs');
      return;
    }
    if (!g || !/^[A-Za-z0-9-]{3,100}$/.test(g.slug || '')) {
      return;
    }
    There.data.gifLast = now;
    There.playSound('menu item activate');
    There.sendChat(`[TMUI] [GIF] [${g.slug}]`);
    There.closePanel();
    // your own GIF comes back via the chat feed like everyone else's. only show it
    // locally when the feed isn't being read (received GIFs off)
    if (!There.prefs().gifs) {
      There.showGifCard(g, There.variables.there_pilotname || 'You');
    }
  },

  // GIF code from chat: look the slug up (cached, so repeats are free) and show it
  receiveGif: function(slug, author) {
    if (!There.KLIPY_KEY || !There.prefs().gifs) {
      return;
    }
    const cache = There.data.gifChecked = There.data.gifChecked || {};
    if (cache[slug] !== undefined) {
      if (cache[slug]) {
        There.showGifCard(cache[slug], author);
      }
      return;
    }
    fetch(There.klipyUrl(encodeURIComponent(slug)))
      .then(r => r.json())
      .then(function(json) {
        const g = json && json.result && json.data;
        cache[slug] = (g && There.klipyMedia(g, 'sm')) ? g : null;
        if (cache[slug]) {
          There.showGifCard(g, author);
        }
      })
      .catch(function() {
      });
  },

  // queue a GIF card (max 3 waiting), each shows ~6s or until clicked
  showGifCard: function(g, author) {
    const url = There.klipyMedia(g, 'sm');
    if (!url) {
      return;
    }
    const queue = There.data.gifQueue = There.data.gifQueue || [];
    queue.push({ url: url, author: author });
    if (queue.length > 3) {
      queue.shift();
    }
    if (!There.data.gifShowing) {
      There.nextGifCard();
    }
  },

  nextGifCard: function() {
    const next = (There.data.gifQueue || []).shift();
    if (!next) {
      There.data.gifShowing = false;
      $('.gifcard').attr('data-active', '0');
      $('.gifcard .gcimg').attr('src', '');
      return;
    }
    There.data.gifShowing = true;
    $('.gifcard .gcimg').attr('src', next.url);
    $('.gifcard .gcfrom').text(next.author);
    $('.gifcard').attr('data-active', '1');
    There.setNamedTimer('gifcard', 6000, There.nextGifCard);
  },

  /* ------- party music sync ------- */

  setParty: function(on) {
    There.prefs().party = !!on;
    There.savePrefs();
    There.ensureChatPoll();
    There.refreshNowPlaying();
    There.playSound('control down');
    if (on) {
      const t = YtMusic.current();
      if (t && YtMusic.isPlaying()) {
        There.broadcastTrack(t);
      }
    }
  },

  broadcastTrack: function(track) {
    if (!There.prefs().party || !track || !track.id) {
      return;
    }
    if (There.data.lastBroadcastId == track.id) {
      return;
    }
    There.data.lastBroadcastId = track.id;
    There.sendChat(`[TMUI] [DJ] [${track.id}]`);
  },

  // play a track someone broadcast, and don't re-broadcast it or two people
  // ping-pong the same line forever
  playPartyTrack: function(videoId, author) {
    There.data.suppressBroadcast = true;
    YtMusic.enqueue({
      id: videoId,
      title: `♪ via ${author}`,
      author: author,
      duration: 0,
      thumb: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    });
    YtMusic.data.index = YtMusic.data.queue.length - 1;
    YtMusic.playCurrent();
  },

  syncWindowSize: function() {
    // Size the native window to just the dock (+ panel when open). The HUD window
    // is NOT per-pixel click-through, so any oversized transparent area eats world
    // clicks. Keep it tight.
    const el = $('.dockroot')[0];
    if (el == undefined) {
      return;
    }
    const rect = el.getBoundingClientRect();
    if (There.data.shapeOn) {
      // Constant-size mode (our FlashProxy shapes mouse input instead): resizing
      // is what made the dock wander, so keep one size and only ever grow it.
      // The dock hugs the window's bottom edge, so with the size pinned the pill
      // stays exactly where the player dragged it, panels or not.
      const w = Math.max(There.data.windowW || 0, Math.ceil(rect.width));
      if (w != There.data.windowW) {
        There.data.windowW = w;
        There.saveShapeWin();
      }
      There.fsCommand('setWidthHeight', {
        width: Math.max(1, w),
        height: Math.max(There.shapeWindowHeight(), Math.ceil(rect.height)),
      });
      There.syncWindowShape();
      return;
    }
    There.fsCommand('setWidthHeight', {
      width: Math.max(1, Math.ceil(rect.width)),
      height: Math.max(1, Math.ceil(rect.height)),
    });
  },

  /* ------- constant window + input shaping -------
   * The client re-anchors a resized HUD window by its top-left corner and clamps
   * it back on screen, so the old resize-to-fit made the pill drift up whenever a
   * panel closed. With our FlashProxy the window keeps one size and tmuiShape
   * tells it which rects are really ours; everything else passes clicks to the
   * world, so the big window costs nothing. */

  shapeWinKey: 'dock.shapewin',

  saveShapeWin: function() {
    try {
      localStorage.setItem(There.shapeWinKey, JSON.stringify({
        ok: 1,
        w: There.data.windowW || 0,
      }));
    } catch (error) {
    }
  },

  // tall enough for the biggest stack (panel + action bar + quick bar + dock),
  // capped to the game window so small clients don't fight the clamp
  shapeWindowHeight: function() {
    let h = 820;
    const client = parseInt(There.variables.there_windowheight || '0', 10) || 0;
    if (client > 200) {
      h = Math.min(h, client - 20);
    }
    return h;
  },

  // the parts of the window that are really ours, padded a little so the drop
  // shadows stay inside and the pill edge is still grabbable. closed panels and
  // bars collapse to zero height, so they filter themselves out
  syncWindowShape: function() {
    if (!There.data.shapeOn) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    const pad = 8;
    const rects = [];
    const take = function(el) {
      if (!el) {
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) {
        return;
      }
      rects.push([
        Math.max(0, Math.floor((r.left - pad) * dpr)),
        Math.max(0, Math.floor((r.top - pad) * dpr)),
        Math.ceil((r.width + 2 * pad) * dpr),
        Math.ceil((r.height + 2 * pad) * dpr),
      ].join(','));
    };
    $('.dockroot').children().each(function() {
      take(this);
    });
    take($('.tmtip[data-active="1"]')[0]);
    take($('.tmui-update')[0]);
    const value = rects.join(';');
    if (value === There.data.shapeSent) {
      return;
    }
    There.data.shapeSent = value;
    There.fsCommand('tmuiShape', `rects=${value}`);
  },

  // GUI command via the client's local command service. There.guiCommand
  // (postMessage) is ignored from the compass-slot window, HTTP works
  engineGuiCommand: function(action) {
    There.fetch({
      path: '/GuiService/simulateGuiCommand',
      query: {
        action: action,
        GuiCommandArgs: `action=${action}`,
      },
      dataType: 'xml',
    });
  },

  /* ------- Action Mode toggle -------
   * "Default to Action Mode" is a checkable menu item (There > Customize > World).
   * Hitting its /activate node via ScriptHook toggles it even with the toolbar
   * hidden, no keypress/Ctrl hacks. /marked gives the checked state. */

  ACTION_MODE_PATH: '/mainMenu/There/Customize/World/Default to Action Mode',

  // toggle via the "Default to Action Mode" menu item. the "In Action Mode...
  // Click OK" system message gets auto-accepted by messagebar.js, nothing to poll here
  toggleActionMode: function() {
    if (There.data.amLive) {
      // FlashProxy reports the result (tmui_actionmode), just flip it
      $('.dock .item[data-id="actionmode"]').attr('data-busy', '1');
      There.fetch({
        path: '/ScriptHook/Invoke',
        query: { Path: `${There.ACTION_MODE_PATH}/activate` },
        dataType: 'xml',
      });
      There.setNamedTimer('actionmode-refresh', 5000, function() {
        $('.dock .item[data-id="actionmode"]').attr('data-busy', '');
      });
      return;
    }
    // optimistic: flip the button + WASD mapper now (menu call and its message are
    // slow), then check the real state in the background and fix it if it didn't take
    const want = There.data.actionMode !== true;
    There.setActionModeUi(want);
    $('.dock .item[data-id="actionmode"]').attr('data-busy', '1');
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: `${There.ACTION_MODE_PATH}/activate` },
      dataType: 'xml',
      complete: function() {
        There.confirmActionMode(want, 0);
      },
    });
  },

  // re-read the checkbox until it matches (up to ~4s)
  confirmActionMode: function(want, tries) {
    There.setNamedTimer('actionmode-refresh', 700, function() {
      There.readActionMode(function(on) {
        if (on === want || tries >= 5) {
          $('.dock .item[data-id="actionmode"]').attr('data-busy', '');
          if (on !== null) {
            There.setActionModeUi(on);
          }
          return;
        }
        There.confirmActionMode(want, tries + 1);
      });
    });
  },

  setActionModeUi: function(on) {
    if (There.data.amLive) {
      return;
    }
    There.data.actionMode = on;
    $('.dock .item[data-id="actionmode"]').attr('data-on', on ? '1' : '');
    There.syncKeymap();
  },

  // show the "Default to Action Mode" checkbox state on the button. if the menu
  // node can't be reached right now, keep the last known state
  refreshActionMode: function() {
    There.readActionMode(function(on) {
      if (on !== null) {
        There.setActionModeUi(on);
      }
    });
  },

  // cb(true|false), or cb(null) if the node couldn't be read
  readActionMode: function(cb) {
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `${There.ACTION_MODE_PATH}/marked` },
      dataType: 'xml',
      success: function(xml) {
        let on = null;
        try {
          const v = xml.getElementsByTagName('Value')[0];
          on = !!(v && v.childNodes[0] && v.childNodes[0].nodeValue == '1');
        } catch (error) {
        }
        cb(on);
      },
      error: function() {
        cb(null);
      },
    });
  },

  // Action Mode key mapper (patched FlashProxy): WASD moves, Space jumps, other
  // letters don't type, Enter goes to Action Chat until sent/Esc.
  // The dock only ALLOWS it (Settings switch). FlashProxy detects real Action Mode
  // itself (hidden clipped cursor), however it got switched on.
  syncKeymap: function() {
    There.fsCommand('tmuiKeymap', There.prefs().keymap ? 'on=1' : 'on=0');
  },

  // run a main-menu node by path (camera views etc)
  invokeMenu: function(path) {
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: path },
      dataType: 'xml',
    });
  },

  // Tbux balance on the dock. refreshed on cockpit-up and a slow heartbeat
  refreshTbux: function() {
    let got = false;
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/pilotPobs/therebucks/balance' },
      dataType: 'xml',
      success: function(xml) {
        try {
          const v = xml.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue;
          if (v != undefined) {
            const n = Number(v);
            $('.tbux .tbamount').text(isNaN(n) ? v : n.toLocaleString('en-US'));
            got = true;
          }
        } catch (error) {
        }
      },
      complete: function() {
        // early in a session the balance node might not exist yet, so retry soon
        // rather than waiting a whole minute
        There.setNamedTimer('tbux-refresh', got ? 60000 : 3000, There.refreshTbux);
      },
    });
  },

  sendCommIntent: function(action) {
    try {
      localStorage.setItem('communicator2.intent', JSON.stringify({
        action: action,
        ts: Date.now(),
      }));
    } catch (error) {
    }
  },

  activate: function(id) {
    There.playSound('close menu');
    switch (id) {
      case 'friends': {
        There.sendCommIntent('showbuddies');
        There.engineGuiCommand('communicator');
        break;
      }
      // Shop / Auctions / Places open in the in-client browser (like Events and Dev),
      // near fullscreen with a margin, instead of the tiny native windows
      case 'shop': {
        There.togglePanel('shop');
        break;
      }
      case 'auctions': {
        There.togglePanel('auctions');
        break;
      }
      case 'places': {
        There.togglePanel('places');
        break;
      }
      case 'inventory': {
        There.togglePanel('inventory');
        break;
      }
      case 'wardrobe': {
        There.togglePanel('wardrobe');
        break;
      }
      case 'events': {
        There.openUrl(There.URL_EVENTS);
        break;
      }
      case 'review': {
        There.openUrl(There.URL_REVIEW);
        break;
      }
      case 'emotes': {
        There.togglePanel('emotes');
        break;
      }
      case 'gifs': {
        There.togglePanel('gifs');
        break;
      }
      case 'scenes': {
        There.togglePanel('scenes');
        break;
      }
      case 'apptray': {
        There.togglePanel('apps');
        break;
      }
      case 'developer': {
        There.openUrl('https://webapps.prod.there.com/wsgi-scripts/submissions.py/submissions');
        break;
      }
      case 'viewstd': {
        There.invokeMenu('/mainMenu/Views/Standard View/activate');
        break;
      }
      case 'viewface': {
        There.invokeMenu('/mainMenu/Views/Face Mirror/activate');
        break;
      }
      case 'viewbody': {
        There.invokeMenu('/mainMenu/Views/Body Mirror/activate');
        break;
      }
      case 'quickbar': {
        There.toggleQuickBar();
        break;
      }
      case 'actionmode': {
        There.toggleActionMode();
        break;
      }
      case 'music': {
        There.togglePanel('music');
        break;
      }
      case 'volume': {
        // the game's sliders in a dock panel (run through the headless window)
        There.togglePanel('volume');
        break;
      }
      case 'settings': {
        There.togglePanel('settings');
        break;
      }
      case 'about': {
        There.togglePanel('about');
        break;
      }
    }
  },

  /* ------- in-dock panels (inventory / wardrobe) ------- */

  togglePanel: function(id) {
    if (There.data.panel == id) {
      There.closePanel();
      return;
    }
    There.data.doing = { what: `opening ${id}`, at: Date.now() };
    There.data.panel = id;
    There.data.search = '';
    $('.panelsearch input').val('');
    There.clearItemMenu();
    There.syncPanelWidth();
    $('.dockroot').attr('data-panel', id);
    if (id == 'inventory' || id == 'wardrobe' || id == 'places') {
      There.applyViewPrefs();
    }
    if (id == 'inventory') {
      $('.panel .paneltitle').text('Inventory');
      $('.tabs').empty();
      $('.foldertabs').empty();
      There.loadInventory();
    } else if (id == 'wardrobe') {
      $('.panel .paneltitle').text('Wardrobe');
      There.data.wardrobeTab = There.data.wardrobeTab ?? There.wardrobeTabs[0].id;
      There.renderWardrobeTabs();
      There.loadWardrobe(There.data.wardrobeTab);
    } else if (id == 'music') {
      There.data.musicTab = There.data.musicTab || 'search';
      There.renderMusic();
    } else if (id == 'apps') {
      There.renderAppTray();
    } else if (id == 'shop') {
      There.loadShop(There.data.shopCat || '1000000001');
    } else if (id == 'auctions') {
      There.loadAuctionsHome();
    } else if (id == 'places') {
      $('.panel .paneltitle').text('Places');
      There.renderPlacesTabs();
      There.loadPlaces();
      if (There.data.placesTab == 'map') {
        There.mapTick();
      }
    } else if (id == 'scenes') {
      There.data.scenePicker = null;
      There.renderScenes();
    } else if (id == 'gifs') {
      $('.gifsearch input').val('');
      $('.gifsnote').text('Click a GIF to share it in chat');
      There.renderGifs('');
    } else if (id == 'emotes') {
      $('.emotesearch input').val('');
      There.renderEmotes('');
      There.setEmoteTab(There.data.emoteTab || 'emotes');
    } else if (id == 'settings') {
      There.renderMusicSettings();
      There.renderDockToggles();
      There.renderThemeSwatches();
      There.updateSyncStatus();
    } else if (id == 'volume') {
      There.volOpen();
    }
    // About is static, nothing to load
  },

  /* ------- Volume panel -------
   * The game only hands its sound levels to its own volume window and only
   * takes changes from it, so that window runs headless (volumecontrol/
   * volume.js) and the dock talks to it through localStorage: tmui-vol for
   * its reports, tmui-vol-cmd for our changes. */

  volState: function() {
    try {
      return JSON.parse(localStorage.getItem('tmui-vol') || 'null');
    } catch (error) {
      return null;
    }
  },

  volSend: function(msg) {
    const seq = Date.now() + Math.random();
    try {
      localStorage.setItem('tmui-vol-cmd', JSON.stringify(Object.assign({ seq: seq }, msg)));
    } catch (error) {
    }
    return seq;
  },

  // the panel shows the last known levels at once. the hidden window stays
  // open between visits, so it usually answers the ping within a frame; only
  // when nobody answers is it opened (the client's volume command toggles, so
  // asking while it's open would close it). changes made before it's up wait
  // in tmui-vol-cmd and it runs them when it starts
  volOpen: function() {
    There.volRender(There.volState());
    There.data.volPing = There.volSend({ ping: true });
    There.setNamedTimer('vol-launch', 250, function() {
      const now = There.volState();
      const answered = now && now.open && now.pong == There.data.volPing;
      if (!answered && There.data.panel == 'volume') {
        There.engineGuiCommand('volumeSliders');
      }
    });
  },

  volRender: function(st) {
    // first time ever: no saved levels yet, the window's report fills them in
    if (!st) {
      return;
    }
    const rows = [
      ['voice', st.voice, st.voiceEnabled],
      ['music', st.music, st.musicEnabled],
      ['environment', st.environment, 1],
    ];
    for (const [id, level, enabled] of rows) {
      const row = $(`.volrow[data-id="${id}"]`);
      const pct = Math.round(Math.max(0, Math.min(1, Number(level) || 0)) * 100);
      // leave the slider alone while it's being dragged
      if (There.data.volDrag != id) {
        $(row).find('.volslider').val(pct);
        $(row).find('.volvalue').text(pct + '%');
      }
      $(row).attr('data-enabled', enabled == 0 ? '0' : '1');
    }
    const muted = Number(st.mute) == 1;
    $('.volmute').attr('data-on', muted ? '1' : '0');
    $('.volmutetext').text(muted ? 'Sound muted' : 'Mute all');
    const notes = [];
    if (st.voiceEnabled == 0) {
      notes.push('Voice is off');
    }
    if (st.musicEnabled == 0) {
      notes.push('Music is off');
    }
    $('.volnote').text(notes.join(' · '));
  },

  // a report from the volume window
  onVolState: function(st) {
    if (!st) {
      return;
    }
    // a new window: the dock opened it, or the game's own menu did. either
    // way the panel is its face
    if (st.open && st.boot && st.boot != There.data.volBoot) {
      There.data.volBoot = st.boot;
      if (There.data.panel != 'volume') {
        There.togglePanel('volume');
        return;
      }
    }
    if (There.data.panel == 'volume') {
      There.volRender(st);
    }
  },

  /* ------- "Cache all photos" sweep -------
   * A clothing item's catalog image only lives on its session-gated About page.
   * Can't read it cross-origin, but loading it in a hidden same-session iframe
   * gets it into the WebView's HTTP cache. catalogcache.js --wardrobe then pulls
   * poid->image pairs out of that cache into catalogcache.json. So we just visit
   * each About page once, never read it. */

  allWardrobePoids: function() {
    const seen = {};
    const poids = [];
    for (const it of (There.data.accoutrements || [])) {
      if (it.poid && !seen[it.poid]) {
        seen[it.poid] = true;
        poids.push(it.poid);
      }
    }
    return poids;
  },

  startCacheSweep: function() {
    const begin = function() {
      const poids = There.allWardrobePoids();
      if (poids.length == 0) {
        There.setCacheText('Nothing to cache');
        return;
      }
      There.data.sweep = {
        poids: poids,
        index: 0,
        paused: false,
        cancelled: false,
      };
      $('.cachebar').attr('data-state', 'running');
      There.sweepStep();
    };
    // need the full accoutrement list first
    if (There.data.accoutrements) {
      begin();
    } else {
      There.setCacheText('Loading list…');
      There.loadAccoutrements(begin);
    }
  },

  sweepStep: function() {
    const s = There.data.sweep;
    if (s == undefined || s.cancelled) {
      There.endCacheSweep('Cancelled');
      return;
    }
    if (s.paused) {
      return;
    }
    if (s.index >= s.poids.length) {
      CatalogImages.savePoids();
      There.itemPhotoSweep(s);
      return;
    }
    const poid = s.poids[s.index];
    const pct = Math.round((s.index / s.poids.length) * 100);
    $('.cachebar .pfill').css('width', pct + '%');
    There.setCacheText(`${s.index + 1}/${s.poids.length}`);

    // skip poids we already have
    if (CatalogImages.poids[poid]) {
      s.index++;
      There.setNamedTimer('sweep-next', 0, There.sweepStep);
      return;
    }

    // Open the item's About page. Our BrowserProxy fork (coupling.js) reads the
    // Product ID off the page and sets the window title to
    // "TMUI<sep>productId<sep>poid<sep>name", which we read back. All in-process.
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: `/pilotPobs/accoutrements/${poid}/About` },
      dataType: 'xml',
      complete: function() {
        // give BrowserProxy time to load the page and run coupling.js
        There.setNamedTimer('sweep-read', There.sweepDelay, function() {
          There.waitAboutTitle(poid, function(info) {
            if (info && info.image) {
              CatalogImages.poids[poid] = info.image;
              s.ok = (s.ok || 0) + 1;
            }
            s.index++;
            There.setNamedTimer('sweep-next', 80, There.sweepStep);
          });
        });
      },
    });
  },

  sweepDelay: 700,

  // After the clothing: inventory items with no photo (builder items, and any the
  // catalog list doesn't know). They have no About method of their own, so the
  // About page opens through the My Things menu. Needs the action map, built
  // once if any of them is missing from it.
  itemPhotoSweep: function(s) {
    const todo = (There.data.inventory || []).filter(i => There.itemNeedsPhoto(i));
    const done = function() {
      There.endCacheSweep(`Done, ${s.ok || 0} photos`);
      if (There.data.panel == 'wardrobe' || There.data.panel == 'inventory') {
        There.renderFolderView();
      }
    };
    if (!todo.length) {
      done();
      return;
    }
    const map = There.data.myThingsMap || There.loadMyThingsMap() || {};
    const go = function() {
      s.builder = todo;
      s.bIndex = 0;
      There.itemPhotoStep(s, done);
    };
    if (todo.some(i => !map[i.name])) {
      There.setCacheText('Finding items…');
      There.buildMyThingsMap(go);
    } else {
      There.data.myThingsMap = map;
      go();
    }
  },

  itemPhotoStep: function(s, done) {
    if (s.cancelled) {
      There.endCacheSweep('Cancelled');
      return;
    }
    if (s.paused) {
      s.resumeBuilder = function() { There.itemPhotoStep(s, done); };
      return;
    }
    if (s.bIndex >= s.builder.length) {
      done();
      return;
    }
    const it = s.builder[s.bIndex];
    $('.cachebar .pfill').css('width', Math.round((s.bIndex / s.builder.length) * 100) + '%');
    There.setCacheText(`Items ${s.bIndex + 1}/${s.builder.length}`);
    const path = (There.data.myThingsMap || {})[it.name];
    const next = function() {
      s.bIndex++;
      There.setNamedTimer('sweep-next', 80, function() { There.itemPhotoStep(s, done); });
    };
    if (!path) {
      next();
      return;
    }
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: `${path}/About/activate` },
      dataType: 'xml',
      complete: function() {
        There.setNamedTimer('sweep-read', There.sweepDelay, function() {
          There.waitAboutTitle(it.doid, function(info) {
            if (info && info.productId && info.image) {
              There.saveItemPhoto(it.doid, info);
              s.ok = (s.ok || 0) + 1;
            }
            next();
          }, it.name);
        });
      },
    });
  },

  // Bigger About pages take a while to load, so the title isn't ours yet when we
  // first look. Keep checking (every 600ms, ~4s max) and stop as soon as it shows.
  waitAboutTitle: function(poid, done, name, tries) {
    tries = tries || 0;
    There.readAboutTitle(poid, function(info) {
      if ((info && info.image) || tries >= 6 || (There.data.sweep && There.data.sweep.cancelled)) {
        done(info);
        return;
      }
      There.setNamedTimer('sweep-read', 600, function() {
        There.waitAboutTitle(poid, done, name, tries + 1);
      });
    }, name);
  },

  // find the About window and pull the ProductId out of our injected title
  readAboutTitle: function(poid, done, name) {
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/client/windows' },
      dataType: 'xml',
      success: function(xml) {
        let windows = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const id = child.getElementsByTagName('Name')[0]?.childNodes[0]?.nodeValue;
            if (id && /^0x/.test(id)) {
              windows.push(id);
            }
          }
        } catch (error) {
        }
        There.scanAboutWindows(windows, 0, poid, done, name);
      },
      error: function() {
        done(null);
      },
    });
  },

  scanAboutWindows: function(windows, i, poid, done, name) {
    if (i >= windows.length) {
      done(null);
      return;
    }
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `/client/windows/${windows[i]}/titleBarText` },
      dataType: 'xml',
      success: function(xml) {
        const t = xml.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue || '';
        // TMUI<sep>productId<sep>poid<sep>image<sep>name
        const parts = t.split('│');
        if (parts[0] === 'TMUI' && (parts[2] === '' || parts[2] === String(poid) || (name && parts[4] === name))) {
          done({ productId: parts[1], poid: parts[2], image: parts[3], name: parts[4] });
          return;
        }
        There.scanAboutWindows(windows, i + 1, poid, done, name);
      },
      error: function() {
        There.scanAboutWindows(windows, i + 1, poid, done, name);
      },
    });
  },

  pauseCacheSweep: function() {
    if (There.data.sweep) {
      There.data.sweep.paused = true;
      $('.cachebar').attr('data-state', 'paused');
    }
  },

  resumeCacheSweep: function() {
    if (There.data.sweep && There.data.sweep.paused) {
      There.data.sweep.paused = false;
      $('.cachebar').attr('data-state', 'running');
      if (There.data.sweep.resumeBuilder) {
        const r = There.data.sweep.resumeBuilder;
        There.data.sweep.resumeBuilder = null;
        r();
      } else {
        There.sweepStep();
      }
    }
  },

  cancelCacheSweep: function() {
    if (There.data.sweep) {
      There.data.sweep.cancelled = true;
    }
    There.endCacheSweep('Cancelled');
  },

  endCacheSweep: function(msg) {
    There.clearNamedTimer('sweep-timeout');
    There.clearNamedTimer('sweep-next');
    $('.cachebar .pfill').css('width', '100%');
    delete There.data.sweep;
    There.setCacheText(msg);
    There.refreshFooter();
    There.setSyncNote(`Photos: ${msg}`);
    There.setNamedTimer('photo-note', 4000, function() {
      if (!There.data.sweep) {
        There.setSyncNote('');
      }
    });
    $('.cachebar').attr('data-state', 'idle');
    try {
      $('.abouthost')[0].src = 'about:blank';
    } catch (error) {
    }
    delete There.data.sweep;
  },

  setCacheText: function(t) {
    $('.cachebar .ptext').text(t);
    if (There.data.sweep) {
      There.setSyncNote(`Caching photos… ${t}`);
    }
  },

  // clear cached clothing photos: drop the in-memory images (grid goes back to
  // glyphs) and ask the helper to wipe the file section
  clearPhotoCache: function() {
    try {
      CatalogImages.poids = {};
      CatalogImages.savePoids();
    } catch (error) {
    }
    // the About-harvested item photos too, so a clear really starts from zero
    try {
      There.data.itemPhotos = {};
      localStorage.removeItem(There.itemPhotosKey());
    } catch (error) {
    }
    There.setCacheText('Cleared');
    There.refreshFooter();
    if (There.data.panel == 'wardrobe' || There.data.panel == 'inventory') {
      There.renderFolderView();
    }
  },

  closePanel: function(force) {
    // at the spa, closing the wardrobe IS leaving: offer the save first
    if (!force && There.data.panel == 'wardrobe' && There.data.wardrobeTab == 'dna') {
      const st = There.dnaState();
      if (st.treatments) {
        if (There.data.dnaDirty) {
          There.data.dnaCloseAsk = true;
          There.data.dnaGateSig = null;
          There.updateDnaGate();
          return;
        }
        There.dnaLeaveNow();
      }
    }
    There.data.dnaCloseAsk = false;
    There.data.panel = '';
    $('.dockroot').attr('data-panel', '');
    There.clearItemMenu();
    There.playSound('close menu');
  },

  // open a URL in the client's browser window. fsCommand('browser', url) is what
  // the MiniMap mod does from this same slot (postMessage guiCommands get ignored)
  openUrl: function(url) {
    There.playSound('menu item activate');
    There.fsCommand('browser', url);
  },

  /* ------- Wardrobe DNA tab (body and face shape) -------
   * The looks live in the avatarLooks feed (phenomorph and sibling weights,
   * skin tone index). Edits commit through the headless ChangeMe shim
   * (Resources/changeme), because the client only accepts the body change
   * commands from that window. Editing unlocks at a spa, exactly like the
   * game intends: the shim relays there_treatmentsenabled and we honor it. */

  // slider rows ported from the stock ChangeMe layout. two ids = a paired
  // slider (left of center drives the first, right the second)
  DNA_SLIDERS: [
    { section: 'Body', label: 'Upper body', cat: 'upperbody', gendered: true },
    { section: 'Body', label: 'Lower body', cat: 'lowerbody', ids: ['phenob'] },
    { section: 'Body', label: 'Weight', cat: 'weight', ids: ['sibb'] },
    { section: 'Body', label: 'Muscles', cat: 'muscularity', ids: ['sibc'],
      envelope: [[-0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0]], multiplier: [1] },
    { section: 'Head shape', label: 'Height', cat: 'head,hair', ids: ['tall'] },
    { section: 'Head shape', label: 'Round', cat: 'head,hair', ids: ['round'] },
    { section: 'Head shape', label: 'Square', cat: 'head,hair', ids: ['square'] },
    { section: 'Head shape', label: 'Pyramid', cat: 'head,hair', ids: ['pyramid'] },
    { section: 'Head shape', label: 'Wedge', cat: 'head,hair', ids: ['wedge'] },
    { section: 'Eyes & brows', label: 'Brow thickness', cat: 'head', ids: ['eyebrowthinner', 'eyebrowthicker'] },
    { section: 'Eyes & brows', label: 'Brows closer', cat: 'head', ids: ['eyebrowscloser'] },
    { section: 'Eyes & brows', label: 'Eyes apart', cat: 'head,hair', ids: ['eyesapart'] },
    { section: 'Eyes & brows', label: 'Eye size', cat: 'head', ids: ['eyessmaller', 'eyesbigger'] },
    { section: 'Eyes & brows', label: 'Eye tilt', cat: 'head', ids: ['eyetilt'] },
    { section: 'Eyes & brows', label: 'Ears wider', cat: 'head', ids: ['earswider'] },
    { section: 'Nose', label: 'Bridge', cat: 'head', ids: ['nosebridgesmaller', 'nosebridgelarger'] },
    { section: 'Nose', label: 'Bulb', cat: 'head', ids: ['nosebulbsmall'], reverse: true },
    { section: 'Nose', label: 'Hook', cat: 'head', ids: ['nosehook'] },
    { section: 'Nose', label: 'Length', cat: 'head', ids: ['noselonger'] },
    { section: 'Nose', label: 'Width', cat: 'head', ids: ['nosewider'] },
    { section: 'Mouth & jaw', label: 'Jaw square', cat: 'head', ids: ['jawsquare'] },
    { section: 'Mouth & jaw', label: 'Chin down', cat: 'head', ids: ['chindown'] },
    { section: 'Mouth & jaw', label: 'Chin forward', cat: 'head', ids: ['chinforward'] },
    { section: 'Mouth & jaw', label: 'Chin thickness', cat: 'head', ids: ['chinthinner', 'chinthicker'] },
    { section: 'Mouth & jaw', label: 'Cheeks', cat: 'head', ids: ['cheeks'] },
    { section: 'Mouth & jaw', label: 'Lip thickness', cat: 'head', ids: ['lipsthinner', 'lipsthicker'] },
    { section: 'Mouth & jaw', label: 'Mouth size', cat: 'head', ids: ['mouthsmaller'], reverse: true },
    { section: 'Mouth & jaw', label: 'Muzzle', cat: 'head', ids: ['muzzle'] },
  ],

  // the 10 named There skin tones (featurecolor index 1..10), approximate colors
  DNA_SKINS: [
    { name: 'Milk', color: '#f4ddc8' },
    { name: 'Vanilla', color: '#efd0b0' },
    { name: 'Latte', color: '#e3bb94' },
    { name: 'Ginger', color: '#d9a878' },
    { name: 'Butterscotch', color: '#cf9460' },
    { name: 'Caramel', color: '#b97f4e' },
    { name: 'Cappuccino', color: '#9c6239' },
    { name: 'Mocha', color: '#7d4a2b' },
    { name: 'Chocolate', color: '#5e3620' },
    { name: 'Espresso', color: '#412514' },
  ],

  // is the headless ChangeMe engine alive, and did the spa unlock editing?
  dnaState: function() {
    try {
      const st = JSON.parse(localStorage.getItem('tmui-dna') || 'null');
      if (st && st.open && Date.now() - st.at < 6000) {
        return {
          alive: true,
          treatments: !!st.treatments,
          looksetName: st.looksetName || '',
          looksetPoid: st.looksetPoid || '',
          leaveAsk: st.leaveAsk || 0,
        };
      }
    } catch (error) {
    }
    return { alive: false, treatments: false, looksetName: '', looksetPoid: '', leaveAsk: 0 };
  },

  // which lookset is the avatar wearing right now? that's the one the spa
  // saves over. checked once per spa session
  dnaCurrentLookset: function(cb) {
    if (There.data.dnaLookset !== undefined) {
      cb(There.data.dnaLookset);
      return;
    }
    There.menuKids('/pilotPobs/looksets', function(poids) {
      poids = (poids || []).filter(p => /^\d+$/.test(p));
      const step = function(i) {
        if (i >= poids.length) {
          There.data.dnaLookset = null;
          cb(null);
          return;
        }
        There.fetch({
          path: '/ScriptHook/Get',
          query: { Path: `/pilotPobs/looksets/${poids[i]}/wearing` },
          dataType: 'xml',
          success: function(xml) {
            let worn = false;
            try {
              worn = xml.getElementsByTagName('Value')[0].textContent == '1';
            } catch (error) {
            }
            if (worn) {
              // its display name rides on the pob node
              There.fetch({
                path: '/ScriptHook/Get',
                query: { Path: `/pilotPobs/looksets/${poids[i]}/name` },
                dataType: 'xml',
                success: function(xml2) {
                  let name = '';
                  try {
                    name = xml2.getElementsByTagName('Value')[0].textContent || '';
                  } catch (error) {
                  }
                  There.data.dnaLookset = { poid: poids[i], name: name };
                  There.data.dnaGateSig = null;
                  cb(There.data.dnaLookset);
                },
                error: function() {
                  There.data.dnaLookset = { poid: poids[i], name: '' };
                  cb(There.data.dnaLookset);
                },
              });
              return;
            }
            There.setNamedTimer('dna-ls-walk', 40, function() {
              step(i + 1);
            });
          },
          error: function() {
            There.data.dnaLookset = null;
            cb(null);
          },
        });
      };
      step(0);
    });
  },

  // the shim runs the save inside the ChangeMe context; we wait for its answer
  dnaSaveLookset: function(cb) {
    There.dnaCurrentLookset(function(lookset) {
      const st = There.dnaState();
      const poid = (lookset && lookset.poid) || st.looksetPoid;
      if (!poid) {
        cb(false, 'no worn lookset found');
        return;
      }
      There.data.dnaSaveStart = Date.now();
      There.data.dnaSaveCb = cb;
      try {
        localStorage.setItem('tmui-dna-cmd', JSON.stringify({
          seq: Date.now() + Math.random(),
          save: true,
          poid: poid,
        }));
      } catch (error) {
      }
      // if no answer comes back, report the failure instead of hanging
      There.setNamedTimer('dna-save-timeout', 8000, function() {
        if (There.data.dnaSaveCb) {
          const pending = There.data.dnaSaveCb;
          There.data.dnaSaveCb = null;
          pending(false, 'engine silent, relog to reload it');
        }
      });
    });
  },

  // short banner message, the gate redraws around it
  dnaNoteShow: function(text, ms) {
    There.data.dnaNote = { text: text, until: Date.now() + ms };
    There.data.dnaGateSig = null;
    There.updateDnaGate();
    There.setNamedTimer('dna-note', ms + 50, There.updateDnaGate);
  },

  dnaLeaveNow: function() {
    try {
      localStorage.setItem('tmui-dna-cmd', JSON.stringify({ seq: Date.now() + Math.random(), leave: true }));
    } catch (error) {
    }
  },

  renderDna: function() {
    const grid = $('.grid');
    $(grid).empty();
    let host = $('<div class="dnahost"></div>');
    $('<div class="empty"></div>').text('Reading your looks\u2026').appendTo($(host));
    $(host).appendTo($(grid));
    There.fetchAvatarLooks(function(looks) {
      if (There.data.panel != 'wardrobe' || There.data.wardrobeTab != 'dna') {
        return;
      }
      There.renderDnaSliders(looks);
    });
    There.pollDna();
  },

  // keep the gate note live while the tab is open
  pollDna: function() {
    if (There.data.panel != 'wardrobe' || There.data.wardrobeTab != 'dna') {
      return;
    }
    There.updateDnaGate();
    There.setNamedTimer('dna-poll', 1000, There.pollDna);
  },

  fetchAvatarLooks: function(cb) {
    There.fetch({
      path: '/VersionedXmlSvc/avatarLooks',
      query: { Oid: There.data.pilotDoid, request: Math.random() },
      dataType: 'xml',
      success: function(xml) {
        const looks = { skeleton: null, skin: 0, attributes: {} };
        try {
          const root = xml.getElementsByTagName('AvatarLooks')[0];
          for (const child of root.childNodes) {
            if (child.nodeName == 'Skeleton') {
              looks.skeleton = child.textContent;
            } else if (child.nodeName == 'FeatureColorIndex') {
              looks.skin = Number(child.textContent);
            } else if (child.nodeName == 'Phenomorph' || child.nodeName == 'Sibling') {
              const name = child.getElementsByTagName('Name')[0].textContent;
              looks.attributes[name.toLowerCase()] = {
                name: name,
                value: Number(child.getElementsByTagName('Value')[0].textContent),
                setter: child.nodeName == 'Phenomorph' ? 'setPhenomorphWeight' : 'setSiblingWeight',
              };
            }
          }
        } catch (error) {
        }
        There.data.dnaLooks = looks;
        cb(looks);
      },
      error: function() {
        cb(null);
      },
    });
  },

  renderDnaSliders: function(looks) {
    const host = $('.grid .dnahost');
    $(host).empty();
    if (!looks || !looks.skeleton) {
      $('<div class="empty"></div>').text('Could not read your looks. Is the Client Bridge on?').appendTo($(host));
      return;
    }
    $('<div class="dnagate"></div>').appendTo($(host));
    let bodyWrap = $('<div class="dnabody"></div>');
    let figWrap = $('<div class="dnafigwrap"></div>');
    $('<svg class="dnafig" viewBox="0 0 120 250"></svg>').appendTo($(figWrap));
    $('<div class="dnafigcap"></div>').text('Live preview').appendTo($(figWrap));
    // camera pad: orbits the real avatar via arrow taps (ChangeMe camera scheme)
    let cam = $('<div class="dnacam"></div>');
    const camBtn = function(key, glyph, title, slot) {
      $('<div class="dnacambtn"></div>').attr('data-k', slot || key).attr('title', title).html(glyph).on('click', function() {
        There.playSound('control down');
        There.fsCommand('tmuiKey', 'key=' + key);
      }).appendTo($(cam));
    };
    camBtn('up', tmuiIcon('play'), 'Camera up (closer to the face)');
    camBtn('right', tmuiIcon('play'), 'Turn left', 'left');
    camBtn('down', tmuiIcon('play'), 'Camera down / back out');
    camBtn('left', tmuiIcon('play'), 'Turn right', 'right');
    $('<div class="dnacamcap"></div>').text('Camera').appendTo($(figWrap));
    $(cam).appendTo($(figWrap));
    $(figWrap).appendTo($(bodyWrap));
    let cols = $('<div class="dnacols"></div>');
    $(cols).appendTo($(bodyWrap));
    $(bodyWrap).appendTo($(host));
    There.data.dnaValues = {};
    for (const a in looks.attributes) {
      There.data.dnaValues[a] = looks.attributes[a].value;
    }
    const colsHost = cols;
    let lastSection = null;
    for (const def of There.DNA_SLIDERS) {
      // the upper body slider is built per gender, stock ChangeMe does the same
      let spec = def;
      if (def.gendered) {
        if (looks.skeleton == 'ft0') {
          spec = Object.assign({}, def, {
            ids: ['phenod', 'phenoa'],
            envelope: [
              [0.0, 0.01, 0.02, 0.03, 0.08, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
              [-1.0, -0.8, -0.6, -0.4, -0.3, -0.1, -0.04, -0.03, -0.02, -0.01, -0.0],
            ],
            multiplier: [1, -1],
          });
        } else {
          spec = Object.assign({}, def, {
            ids: ['phenod'],
            envelope: [[0.0, 0.01, 0.02, 0.03, 0.08, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0]],
            multiplier: [1],
          });
        }
      }
      if (spec.section != lastSection) {
        lastSection = spec.section;
        let sec = $('<div class="dnaacc" data-open="0"></div>');
        let secHead = $('<div class="dnaacchead"></div>');
        $('<span></span>').text(spec.section).appendTo($(secHead));
        $('<span class="dnaacchevron"></span>').html(tmuiIcon('play')).appendTo($(secHead));
        $(secHead).appendTo($(sec));
        let secBody = $('<div class="dnaaccbody"></div>');
        $(secBody).appendTo($(sec));
        $(sec).appendTo($(colsHost));
        There.data.dnaCurBody = secBody;
      }
      There.buildDnaSlider(There.data.dnaCurBody, spec, looks);
    }
    // skin tone section (featurecolor), the 10 named There tones
    const skinWrap = $('<div class="dnaacc" data-open="0"></div>');
    let skinHead = $('<div class="dnaacchead"></div>');
    $('<span></span>').text('Skin tone').appendTo($(skinHead));
    $('<span class="dnaacchevron"></span>').html(tmuiIcon('play')).appendTo($(skinHead));
    $(skinHead).appendTo($(skinWrap));
    let skinBody = $('<div class="dnaaccbody dnaskinbody"></div>');
    let swatchRow = $('<div class="dnaskins"></div>');
    There.DNA_SKINS.forEach(function(tone, i) {
      const index = i + 1;
      let sw = $('<div class="dnaskin"></div>').attr('title', tone.name).css('background-color', tone.color);
      if (looks.skin == index) {
        $(sw).attr('data-selected', '1');
      }
      $(sw).on('click', function() {
        if (!There.dnaState().treatments) {
          return;
        }
        There.playSound('control down');
        $('.dnaskins .dnaskin').attr('data-selected', '0');
        $(sw).attr('data-selected', '1');
        There.data.dnaDirty = true;
        There.dnaCommit([{
          command: 'setFeatureColorIndex',
          query: { index: index, bodyChangeCategory: 'skincolor' },
        }]);
      });
      $(sw).appendTo($(swatchRow));
    });
    $(swatchRow).appendTo($(skinBody));
    $(skinBody).appendTo($(skinWrap));
    $(skinWrap).appendTo($(cols));

    $('.dnaacc').first().attr('data-open', '1');
    There.setNamedTimer('dna-fit', 30, function() {
      $('.dnaacc[data-open="1"] .dnaslider').each(function() {
        const fn = $(this).data('dnaRefresh');
        if (fn) {
          fn();
        }
      });
    });
    $('.dnaacchead').off('click.dna').on('click.dna', function() {
      There.playSound('control down');
      const acc = $(this).closest('.dnaacc');
      const open = $(acc).attr('data-open') == '1' ? '0' : '1';
      // accordion: only one section open at a time
      $('.dnaacc').attr('data-open', '0');
      $(acc).attr('data-open', open);
      if (open == '1') {
        $(acc).find('.dnaslider').each(function() {
          const fn = $(this).data('dnaRefresh');
          if (fn) {
            fn();
          }
        });
      }
    });
    There.drawDnaFigure();
    There.data.dnaGateSig = null;
    There.updateDnaGate();
  },

  /* ------- the live preview silhouette -------
   * A stylized outline, not a render: each slider nudges the shape the way it
   * nudges the avatar, so you can see roughly what you are doing before the
   * world catches up. Pure SVG, redrawn whole on every change. */

  drawDnaFigure: function() {
    const el = $('.grid .dnafig')[0];
    if (!el) {
      return;
    }
    const vals = There.data.dnaValues || {};
    const v = function(id) {
      return vals[id] || 0;
    };
    const clamp = function(x, lo, hi) {
      return Math.min(hi, Math.max(lo, x));
    };
    const female = (There.data.dnaLooks || {}).skeleton == 'ft0';

    // head: 0..1 weights widen or stretch the skull, pairs give net effects
    const headW = 11 * (1 + 0.30 * v('round') + 0.20 * v('square') + 0.15 * v('wedge') - 0.10 * v('pyramid'));
    const headH = 14 * (1 + 0.35 * v('tall'));
    const jaw = clamp(0.5 + 0.5 * v('jawsquare'), 0.5, 1);
    const chinNet = v('chinthicker') - v('chinthinner');
    const cheeks = v('cheeks');

    // body: shoulders from the upper body morph, waist from weight, hips from
    // the lower body morph, limbs thicken with muscle
    const upper = clamp(Math.abs(v('phenod')) + Math.abs(v('phenoa')), 0, 1);
    const lower = clamp(Math.abs(v('phenob')), 0, 1);
    const weight = clamp(v('sibb'), 0, 1);
    const muscle = clamp((v('sibc') + 0.5) / 1.5, 0, 1);

    const shoulderW = (female ? 20 : 24) * (1 + 0.40 * upper + 0.15 * muscle);
    const waistW = (female ? 11 : 14) * (1 + 0.95 * weight + 0.15 * muscle);
    const hipW = (female ? 17 : 15) * (1 + 0.55 * lower + 0.45 * weight);
    const armW = 4.2 * (1 + 0.9 * muscle + 0.3 * weight);
    const legW = 6 * (1 + 0.5 * muscle + 0.5 * weight);

    const cx = 60;
    const headTop = 8;
    const headCy = headTop + headH;
    const neckY = headCy + headH * 0.9;
    const shY = neckY + 8;
    const waistY = 118;
    const hipY = 138;
    const footY = 236;

    // face hints: eyes, nose, mouth follow their sliders
    const eyeGap = 4.2 * (1 + 0.6 * v('eyesapart'));
    const eyeR = 1.5 * (1 + 0.5 * (v('eyesbigger') - v('eyessmaller')));
    const eyeTilt = 1.6 * v('eyetilt');
    const noseL = 4 * (1 + 0.6 * v('noselonger'));
    const noseW = 1.4 * (1 + 0.8 * v('nosewider'));
    const mouthW = 5.5 * (1 - 0.45 * v('mouthsmaller'));
    const lipT = 1 + 1.4 * clamp(v('lipsthicker') - v('lipsthinner'), -0.5, 1);

    const chinY = headCy + headH * (0.98 + 0.06 * clamp(chinNet, -1, 1));
    const jawW = headW * (0.55 + 0.35 * jaw + 0.12 * cheeks);

    const p = [];
    // head outline: dome plus jaw taper to the chin
    p.push(`M ${cx - headW} ${headCy}`);
    p.push(`A ${headW} ${headH} 0 1 1 ${cx + headW} ${headCy}`);
    p.push(`Q ${cx + jawW} ${chinY - 2} ${cx} ${chinY + 3}`);
    p.push(`Q ${cx - jawW} ${chinY - 2} ${cx - headW} ${headCy}`);
    const head = p.join(' ');

    // torso: shoulders, waist pinch, hips; mirrored
    const torso = [
      `M ${cx - shoulderW} ${shY}`,
      `Q ${cx - shoulderW - 2} ${shY + 16} ${cx - waistW} ${waistY}`,
      `Q ${cx - hipW - 1} ${hipY - 6} ${cx - hipW} ${hipY}`,
      `L ${cx + hipW} ${hipY}`,
      `Q ${cx + hipW + 1} ${hipY - 6} ${cx + waistW} ${waistY}`,
      `Q ${cx + shoulderW + 2} ${shY + 16} ${cx + shoulderW} ${shY}`,
      `Q ${cx} ${shY - 7} ${cx - shoulderW} ${shY}`,
    ].join(' ');

    const arm = function(side) {
      const sx = cx + side * (shoulderW - 1);
      const ex = cx + side * (shoulderW + 7);
      return `M ${sx} ${shY + 2} Q ${ex} ${(shY + waistY) / 2} ${cx + side * (waistW + 12)} ${hipY + 8}`;
    };
    const leg = function(side) {
      const sx = cx + side * (hipW * 0.5);
      return `M ${sx} ${hipY} Q ${cx + side * (hipW * 0.55)} ${(hipY + footY) / 2} ${cx + side * (hipW * 0.38)} ${footY}`;
    };

    const eyeY = headCy - headH * 0.05;
    const face = [
      `<ellipse class="df-eye" cx="${cx - eyeGap}" cy="${eyeY + eyeTilt}" rx="${eyeR}" ry="${eyeR * 0.75}"></ellipse>`,
      `<ellipse class="df-eye" cx="${cx + eyeGap}" cy="${eyeY - eyeTilt}" rx="${eyeR}" ry="${eyeR * 0.75}"></ellipse>`,
      `<path class="df-line" d="M ${cx} ${eyeY + 2} L ${cx - noseW} ${eyeY + 2 + noseL} L ${cx + noseW} ${eyeY + 2 + noseL}"></path>`,
      `<path class="df-lip" style="stroke-width:${lipT}" d="M ${cx - mouthW} ${chinY - 4} Q ${cx} ${chinY - 2.5} ${cx + mouthW} ${chinY - 4}"></path>`,
    ].join('');

    el.innerHTML =
      `<path class="df-body" d="${torso}"></path>` +
      `<path class="df-limb" style="stroke-width:${armW}" d="${arm(-1)}"></path>` +
      `<path class="df-limb" style="stroke-width:${armW}" d="${arm(1)}"></path>` +
      `<path class="df-limb" style="stroke-width:${legW}" d="${leg(-1)}"></path>` +
      `<path class="df-limb" style="stroke-width:${legW}" d="${leg(1)}"></path>` +
      `<path class="df-head" d="${head}"></path>` +
      face;
  },

  buildDnaSlider: function(host, spec, looks) {
    let row = $('<div class="dnarow"></div>');
    $('<div class="dnalabel"></div>').text(spec.label).appendTo($(row));
    let track = $('<div class="dnaslider"></div>');
    let knob = $('<div class="dnaknob"></div>');
    $(knob).appendTo($(track));
    $(track).appendTo($(row));
    $(row).appendTo($(host));

    // measured live: the accordion may be collapsed (width 0) at build time
    const width = function() { return Math.max(80, ($(track).width() || 150) - 11); };
    const state = {
      ids: spec.ids,
      cats: spec.cat.split(','),
      reverse: !!spec.reverse,
      envelopes: spec.envelope,
      multipliers: spec.multiplier || spec.ids.map(() => 1),
      values: spec.ids.map(function(id) {
        const a = looks.attributes[id];
        return a ? a.value : 0;
      }),
    };

    // position from values: the stock ChangeMe math, ported as is
    const refresh = function() {
      let value = 0.0;
      if (state.envelopes != undefined) {
        const envelope = state.envelopes[0];
        const count = envelope.length - 1;
        const step = 1.0 / count;
        value = state.values[0] * state.multipliers[0];
        let i0 = 0;
        let i1 = 0;
        for (let i = 0; i <= count; i++) {
          i0 = i;
          i1 = Math.min(i + 1, count);
          if (value >= envelope[i0] && value < envelope[i1]) {
            break;
          }
        }
        const t = i0 == i1 ? 0.0 : (value - envelope[i0]) / (envelope[i1] - envelope[i0]);
        value = (i0 + t) * step;
      } else if (state.values.length == 1) {
        value = state.values[0];
      } else {
        if (state.values.filter(e => e != 0.0).length > 1) {
          return;
        }
        value = 0.5 - state.values[0] / 2.0 + state.values[1] / 2.0;
      }
      if (state.reverse) {
        value = 1.0 - value;
      }
      const frac = Math.min(Math.max(0, value), 1);
      $(knob).css('left', frac * width() + 'px');
      $(track).css('--fill', (frac * 100) + '%');
    };
    $(track).data('dnaRefresh', refresh);

    // values from position, same stock math
    const split = function() {
      let value = parseFloat($(knob).css('left')) / width();
      if (state.reverse) {
        value = 1.0 - value;
      }
      if (state.envelopes != undefined) {
        for (const index in state.envelopes) {
          const envelope = state.envelopes[index];
          const count = envelope.length - 1;
          const step = 1.0 / count;
          const i0 = Math.floor(value * count);
          const i1 = Math.min(i0 + 1, count);
          const t1 = (value - i0 * step) / step;
          state.values[index] = (envelope[i0] * (1.0 - t1) + envelope[i1] * t1) * state.multipliers[index];
        }
      } else if (state.values.length == 1) {
        state.values[0] = value;
      } else {
        const v = (value - 0.5) * 2.0;
        state.values[0] = v < 0.0 ? -v : 0.0;
        state.values[1] = v > 0.0 ? v : 0.0;
      }
    };

    const commit = function() {
      const items = [];
      for (const cat of state.cats) {
        state.ids.forEach(function(id, index) {
          const attr = There.data.dnaLooks.attributes[(cat == 'hair' ? 'hair_' : '') + id];
          if (!attr) {
            return;
          }
          attr.value = state.values[index];
          items.push({
            command: attr.setter,
            query: { name: attr.name, weight: state.values[index], bodyChangeCategory: cat },
          });
        });
      }
      state.ids.forEach(function(id, index) {
        for (const cat of state.cats) {
          There.data.dnaValues[(cat == 'hair' ? 'hair_' : '') + id] = state.values[index];
        }
      });
      There.drawDnaFigure();
      if (items.length) {
        There.data.dnaDirty = true;
        There.dnaCommit(items);
      }
    };

    let drag = null;
    $(knob).on('mousedown', function(event) {
      if (event.which == 1 && There.dnaState().treatments) {
        drag = { dx: event.pageX - parseFloat($(knob).css('left')) };
        event.stopPropagation();
        event.preventDefault();
      }
    });
    $(document).on('mousemove.dna' + spec.ids[0], function(event) {
      if (drag) {
        const nx = Math.min(Math.max(0, event.pageX - drag.dx), width());
        $(knob).css('left', nx + 'px');
        $(track).css('--fill', (nx / width() * 100) + '%');
        split();
        state.ids.forEach(function(id, index) {
          There.data.dnaValues[id] = state.values[index];
        });
        There.drawDnaFigure();
      }
    }).on('mouseup.dna' + spec.ids[0], function() {
      if (drag) {
        drag = null;
        split();
        commit();
      }
    });
    $(track).on('mousedown', function(event) {
      if (event.which == 1 && !drag && There.dnaState().treatments) {
        const nx2 = Math.min(Math.max(0, event.offsetX - 5), width());
        $(knob).css('left', nx2 + 'px');
        $(track).css('--fill', (nx2 / width() * 100) + '%');
        split();
        commit();
        event.stopPropagation();
      }
    });
    refresh();
  },

  // the dock asks, the headless ChangeMe window does
  dnaCommit: function(items) {
    try {
      localStorage.setItem('tmui-dna-cmd', JSON.stringify({ seq: Date.now() + Math.random(), items: items }));
    } catch (error) {
    }
  },

  updateDnaGate: function() {
    const gate = $('.grid .dnagate');
    if (!gate.length) {
      return;
    }
    const st = There.dnaState();
    // a leave request is only real if it just happened; stale ones in storage
    // must never force anyone out of the spa
    if (st.leaveAsk && Date.now() - st.leaveAsk > 25000) {
      st.leaveAsk = 0;
    }
    const note = (There.data.dnaNote && Date.now() < There.data.dnaNote.until) ? There.data.dnaNote.text : '';
    const leaving = ((st.leaveAsk && There.data.dnaLeaveSeen != st.leaveAsk) || There.data.dnaCloseAsk) && (There.data.dnaDirty || There.data.dnaCloseAsk);
    if (!leaving) {
      There.data.dnaLeaveAlerted = false;
      $(gate).attr('data-alert', '');
    }
    const sig = [st.alive, st.treatments, st.looksetPoid, st.leaveAsk, !!There.data.dnaDirty, !!There.data.dnaCloseAsk, note].join('|');
    if (sig == There.data.dnaGateSig) {
      return;
    }
    There.data.dnaGateSig = sig;
    $('.grid .dnahost').attr('data-locked', st.treatments ? '0' : '1');
    $(gate).empty();
    if (note) {
      $(gate).attr('data-on', '1');
      $('<span></span>').text(note).appendTo($(gate));
      return;
    }
    // walking off the spa or closing the wardrobe with unsaved changes:
    // offer the save first
    const closing = !!There.data.dnaCloseAsk;
    if ((st.leaveAsk && There.data.dnaLeaveSeen != st.leaveAsk) || closing) {
      if (!There.data.dnaDirty && !closing) {
        There.data.dnaLeaveSeen = st.leaveAsk;
        There.dnaLeaveNow();
      } else {
        $(gate).attr('data-on', '1').attr('data-alert', '1');
        // alert the player: this prompt is holding them at the spa
        if (!There.data.dnaLeaveAlerted) {
          There.data.dnaLeaveAlerted = true;
          There.playSound('dialog appear');
        }
        const ln = (There.data.dnaLookset && There.data.dnaLookset.name) || st.looksetName;
        $('<span></span>').text('Leaving the spa. Save your new look' +
          (ln ? ` to "${ln}"` : '') + '?').appendTo($(gate));
        let btns = $('<span class="dnagatebtns"></span>');
        const finish = function() {
          There.data.dnaLeaveSeen = st.leaveAsk || There.data.dnaLeaveSeen;
          There.dnaLeaveNow();
          if (closing) {
            There.closePanel(true);
          }
        };
        $('<span class="dnabtn"></span>').text('Save & leave').on('click', function() {
          There.dnaNoteShow('Saving your look\u2026', 6000);
          There.dnaSaveLookset(function(ok, why) {
            There.dnaNoteShow(ok ? 'Saved. See you around!' : `Save failed (${why}), leaving anyway.`, 5000);
            finish();
          });
        }).appendTo($(btns));
        $('<span class="dnabtn"></span>').text('Leave without saving').on('click', function() {
          There.data.dnaDirty = false;
          finish();
        }).appendTo($(btns));
        $(btns).appendTo($(gate));
        return;
      }
    }
    if (st.treatments) {
      $(gate).attr('data-on', '1');
      $('<span></span>').text('Spa unlocked. Changes apply right away.').appendTo($(gate));
      const lookset = There.data.dnaLookset;
      if (lookset === undefined) {
        There.dnaCurrentLookset(function() {
          There.data.dnaGateSig = null;
          There.updateDnaGate();
        });
      }
      if (lookset || st.looksetPoid) {
        let btns = $('<span class="dnagatebtns"></span>');
        let save = $('<span class="dnabtn"></span>').text(`Save to "${(lookset && lookset.name) || st.looksetName || 'lookset'}"`).on('click', function() {
          There.dnaNoteShow('Saving your look\u2026', 8000);
          There.dnaSaveLookset(function(ok, why) {
            There.dnaNoteShow(ok ? 'Saved!' : `Save failed: ${why}`, 6000);
          });
        });
        $(save).appendTo($(btns));
        $(btns).appendTo($(gate));
      }
    } else if (st.alive) {
      $(gate).attr('data-on', '0');
      $('<span></span>').text('Viewing only. Step onto a spa platform to unlock editing.').appendTo($(gate));
    } else {
      $(gate).attr('data-on', '0');
      $('<span></span>').text('Viewing only. Open ChangeMe or step onto a spa platform to unlock editing.').appendTo($(gate));
    }
  },

  /* ------- Shop and Auctions panels -------
   * The public webapps serve clean XML without a login (buying and bidding DO
   * need one, those open the native browser where There Central handles it).
   * The XML has no CORS headers, so reads go through FlashProxy's
   * /tmui-webapps/ bridge, which is same origin for this page. */

  WEBAPPS_MEDIA: 'https://webapps.prod.there.com/catalog/media/',

  webappsFetch: function(path, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      dataType: 'xml',
      timeout: 15000,
      success: function(xml) {
        cb(xml);
      },
      error: function() {
        cb(null);
      },
    });
  },

  // the _small thumbnails blur when blown up to tile size: use the large art,
  // fall back to the small file if a large one doesn't exist
  webappsImg: function(el, small, large) {
    const big = large || (small ? small.replace(/_small(\.[a-z]+)$/i, '$1') : '');
    let img = $('<img>').attr('loading', 'lazy').attr('decoding', 'async');
    if (big && big != small) {
      $(img).on('error', function() {
        $(this).off('error');
        if (small) {
          $(this).attr('src', There.WEBAPPS_MEDIA + small);
        }
      }).attr('src', There.WEBAPPS_MEDIA + big);
    } else if (small) {
      $(img).attr('src', There.WEBAPPS_MEDIA + small);
    } else {
      return;
    }
    $(img).appendTo($(el));
  },

  xmlText: function(node, tag) {
    try {
      return node.getElementsByTagName(tag)[0]?.textContent || '';
    } catch (error) {
      return '';
    }
  },

  /* ------- shop ------- */

  loadShop: function(cat) {
    There.data.shopCat = cat;
    $('.shopbody').html('<div class="empty">Loading\u2026</div>');
    There.webappsFetch(`catalog/product?category=${encodeURIComponent(cat)}`, function(xml) {
      if (There.data.panel != 'shop') {
        return;
      }
      if (!xml) {
        $('.shopbody').html('<div class="empty">The shop did not answer. Try again in a moment.</div>');
        return;
      }
      There.renderShop(xml);
    });
  },

  renderShop: function(xml) {
    const crumbs = $('.shopcrumbs');
    const body = $('.shopbody');
    $(crumbs).empty();
    $(body).empty();
    const here = There.xmlText(xml, 'HierName') || 'Shop';
    const catId = There.xmlText(xml, 'CategoryHier');
    const crumb = function(name, cat, isHere) {
      let el = $('<span class="crumb"></span>').text(name);
      if (isHere) {
        $(el).attr('data-here', '1');
        $(crumbs).append(el);
        return;
      }
      $(el).on('click', function() {
        There.playSound('control down');
        There.loadShop(cat);
      });
      $(crumbs).append(el, $('<span></span>').text('\u203A'));
    };
    if (catId != '1000000001') {
      crumb('Shop', '1000000001', false);
    }
    for (const anc of xml.getElementsByTagName('Ancestors')[0]?.getElementsByTagName('Category') || []) {
      const hid = There.xmlText(anc, 'Hid');
      if (hid && hid != '1000000001') {
        crumb(There.xmlText(anc, 'HierName'), hid, false);
      }
    }
    crumb(here, catId, true);

    // mid level tiles with pictures and price ranges
    let shown = 0;
    for (const di of xml.getElementsByTagName('DisplayItem')) {
      const name = There.xmlText(di, 'HierName');
      const hid = There.xmlText(di, 'Hid');
      const img = There.xmlText(di, 'Image');
      const price = There.xmlText(di, 'Text2');
      let tile = $('<div class="shoptile"></div>').attr('title', There.xmlText(di, 'Text1') || name);
      if (img) {
        let tim = $('<div class="scimg"></div>');
        There.webappsImg(tim, img);
        $(tim).appendTo($(tile));
        $(tile).attr('data-pic', '1');
      }
      let tfoot = $('<div class="scfoot"></div>');
      $('<div class="scname"></div>').text(name).appendTo($(tfoot));
      if (price) {
        $('<div class="scprice"></div>').text(price + 'T').appendTo($(tfoot));
      }
      $(tfoot).appendTo($(tile));
      (function(h) {
        $(tile).on('click', function() {
          There.playSound('control down');
          There.loadShop(h);
        });
      })(hid);
      $(tile).appendTo($(body));
      shown++;
    }
    // plain subcategory tiles (root level)
    if (!shown) {
      for (const sc of xml.getElementsByTagName('SubCategories')[0]?.getElementsByTagName('Category') || []) {
        const name = There.xmlText(sc, 'HierName');
        const m = (There.xmlText(sc, 'Url') || '').match(/category=(\d+)/);
        if (!m) {
          continue;
        }
        let tile = $('<div class="shoptile"></div>');
        $('<div></div>').text(name).appendTo($(tile));
        (function(h) {
          $(tile).on('click', function() {
            There.playSound('control down');
            There.loadShop(h);
          });
        })(m[1]);
        $(tile).appendTo($(body));
        shown++;
      }
    }
    // leaf products: picture, name, price. clicking opens our item page
    for (const pr of xml.getElementsByTagName('Product')) {
      const product = {
        name: There.xmlText(pr, 'ShortName') || There.xmlText(pr, 'LongName'),
        pid: There.xmlText(pr, 'ProductId'),
        price: There.xmlText(pr, 'Price'),
        img: There.xmlText(pr, 'SmallImageUrl'),
        large: There.xmlText(pr, 'LargeImageUrl'),
        short: There.xmlText(pr, 'ShortDescription'),
        long: There.xmlText(pr, 'LongDescription'),
        canTry: !!There.xmlText(pr, 'TryUrl'),
      };
      let card = $('<div class="shopcard"></div>').attr('title', product.name);
      let im = $('<div class="scimg"></div>');
      There.webappsImg(im, product.img, product.large);
      $(im).appendTo($(card));
      let foot = $('<div class="scfoot"></div>');
      $('<div class="scname"></div>').text(product.name).appendTo($(foot));
      $('<div class="scprice"></div>').html(`${tmuiIcon('coins')}${product.price}T`).appendTo($(foot));
      $(foot).appendTo($(card));
      (function(p) {
        $(card).on('click', function() {
          There.playSound('control down');
          There.showShopDetail(p);
        });
      })(product);
      $(card).appendTo($(body));
      shown++;
    }
    if (!shown) {
      $(body).html('<div class="empty">Nothing in this category.</div>');
    }
    There.applyGridScale();
  },

  // our own item page: big picture, the full description, Buy and Try. the
  // There Central page stays one click away for everything else
  showShopDetail: function(p) {
    const body = $('.shopbody');
    $(body).empty();
    let d = $('<div class="itemdetail"></div>');
    $('<div class="idback"></div>').text('\u2039 Back').on('click', function() {
      There.playSound('control down');
      There.loadShop(There.data.shopCat || '1000000001');
    }).appendTo($(d));
    let top = $('<div class="idtop"></div>');
    let im = $('<div class="idimg"></div>');
    if (p.large || p.img) {
      $('<img>').attr('src', There.WEBAPPS_MEDIA + (p.large || p.img)).appendTo($(im));
    }
    $(im).appendTo($(top));
    let info = $('<div class="idinfo"></div>');
    $('<div class="idname"></div>').text(p.name || 'Item ' + p.pid).appendTo($(info));
    $('<div class="idprice"></div>').html(`${tmuiIcon('coins')}${p.price}T`).appendTo($(info));
    if (p.short) {
      $('<div class="idmeta"></div>').append($('<span class="mv"></span>').text(p.short)).appendTo($(info));
    }
    $(info).appendTo($(top));
    $(top).appendTo($(d));
    if (p.long) {
      $('<div class="iddesc"></div>').text(p.long.replace(/^"|"$/g, '')).appendTo($(d));
    }
    let btns = $('<div class="idbtns"></div>');
    $('<div class="button"></div>').attr('data-primary', '1').text('Buy').on('click', function() {
      There.playSound('menu item activate');
      There.openUrl(`https://webapps.prod.there.com/catalog/product?confirm=${p.pid}`);
    }).appendTo($(btns));
    if (p.canTry) {
      $('<div class="button"></div>').text('Try').on('click', function() {
        There.playSound('menu item activate');
        There.openUrl(`https://webapps.prod.there.com/catalog/product?try=${p.pid}`);
      }).appendTo($(btns));
    }
    $('<span class="idlink"></span>').text('View on There Central').on('click', function() {
      There.openUrl(`https://webapps.prod.there.com/catalog/product?id=${p.pid}`);
    }).appendTo($(btns));
    $(btns).appendTo($(d));
    $(d).appendTo($(body));
  },

  // card size slider and tile/list view, shared by both panels
  applyGridScale: function() {
    const px = There.prefs().shopScale || 150;
    const view = There.prefs().shopView || 'tile';
    $('.shopbody, .aubody').css('--shopw', px + 'px').attr('data-view', view);
    $('.gridscale').val(px);
    $('.shopviewtoggle .vbtn').attr('data-active', '0');
    $(`.shopviewtoggle .vbtn[data-view="${view}"]`).attr('data-active', '1');
  },

  /* ------- auctions ------- */

  loadAuctionsHome: function() {
    There.data.auBack = There.loadAuctionsHome;
    $('.aucrumbs').empty();
    $('.aubody').html('<div class="empty">Loading\u2026</div>');
    There.webappsFetch('items/home', function(xml) {
      if (There.data.panel != 'auctions') {
        return;
      }
      if (!xml) {
        $('.aubody').html('<div class="empty">Auctions did not answer. Try again in a moment.</div>');
        return;
      }
      // category dropdown (ours, native selects die in the HUD), once
      if (!There.data.aucats) {
        const cats = [];
        const root = xml.getElementsByTagName('Categories')[0];
        for (const c of root ? root.getElementsByTagName('Category') : []) {
          const id = There.xmlText(c, 'CategoryId');
          const name = There.xmlText(c, 'Name');
          if (id && name) {
            cats.push({ id: id, name: name });
          }
        }
        There.data.aucats = cats;
        const list = $('.aucatlist');
        $(list).empty();
        const opt = function(id, name) {
          $('<div class="opt"></div>').text(name).on('click', function(event) {
            event.stopPropagation();
            There.playSound('control down');
            There.pickAuctionCat(id, name);
          }).appendTo($(list));
        };
        opt('', 'All categories');
        for (const c of cats) {
          opt(c.id, c.name);
        }
      }
      const body = $('.aubody');
      $(body).empty();
      // featured auctions ride a sliding 3-up carousel
      const feat = xml.getElementsByTagName('FeaturedAuctions')[0];
      const featList = feat ? Array.from(feat.getElementsByTagName('Listing')) : [];
      if (featList.length) {
        $('<div class="ausection"></div>').html('<span class="austar">\u2605</span> Featured').appendTo($(body));
        let car = $('<div class="aucarousel"></div>');
        let track = $('<div class="autrack"></div>');
        for (const li of featList.slice(0, 12)) {
          There.renderAuctionCard(track, li, true);
        }
        $(track).appendTo($(car));
        $('<div class="aunav auprev"></div>').text('\u2039').on('click', function(event) {
          event.stopPropagation();
          There.playSound('control down');
          There.auSlideTo((There.data.auSlide || 0) - 1);
          There.setNamedTimer('aucarousel', 3500, There.auAutoSlide);
        }).appendTo($(car));
        $('<div class="aunav aunext"></div>').text('\u203A').on('click', function(event) {
          event.stopPropagation();
          There.playSound('control down');
          There.auSlideTo((There.data.auSlide || 0) + 1);
          There.setNamedTimer('aucarousel', 3500, There.auAutoSlide);
        }).appendTo($(car));
        // breathe while hovered
        $(car).on('mouseenter', function() {
          There.clearNamedTimer('aucarousel');
        }).on('mouseleave', function() {
          There.setNamedTimer('aucarousel', 2500, There.auAutoSlide);
        });
        $(car).appendTo($(body));
        There.data.auSlide = 0;
        There.setNamedTimer('aucarousel', 2500, There.auAutoSlide);
      }
      // "designer picks" in the feed are DESIGNERS, not auctions: name chips
      // that open everything that designer has listed
      const picks = xml.getElementsByTagName('DesignerFeaturedAuctions')[0];
      const designers = [];
      for (const li of picks ? picks.getElementsByTagName('Listing') : []) {
        const name = There.xmlText(li, 'ArtKitDesignerName');
        if (name && !designers.includes(name)) {
          designers.push(name);
        }
      }
      if (designers.length) {
        $('<div class="ausection"></div>').html('<span class="austar">\u2605</span> Featured designers').appendTo($(body));
        let wrap = $('<div class="auchips"></div>');
        for (const name of designers) {
          (function(n) {
            $('<div class="auchip"></div>').text(n).on('click', function() {
              There.playSound('control down');
              There.loadDesigner(n);
            }).appendTo($(wrap));
          })(name);
        }
        $(wrap).appendTo($(body));
      }
      if ($(body).children().length == 0) {
        $(body).html('<div class="empty">No featured auctions right now. Browse a category or search.</div>');
      }
      There.applyGridScale();
    });
  },

  // featured carousel: slide the window, wrapping at the ends
  auSlideTo: function(i) {
    const track = $('.aucarousel .autrack')[0];
    if (!track || !track.children.length) {
      return;
    }
    const max = Math.max(0, track.children.length - 3);
    if (i < 0) {
      i = max;
    }
    if (i > max) {
      i = 0;
    }
    There.data.auSlide = i;
    const step = track.children[0].getBoundingClientRect().width + 8;
    track.style.transform = `translateX(${-i * step}px)`;
  },

  auAutoSlide: function() {
    if (There.data.panel == 'auctions' && $('.aucarousel').length) {
      There.auSlideTo((There.data.auSlide || 0) + 1);
      There.setNamedTimer('aucarousel', 2500, There.auAutoSlide);
    }
  },

  // category drill-down via /items/browse: subcategory tiles, crumbs, listings
  loadAuctionsBrowse: function(cat) {
    There.data.auBack = function() {
      There.loadAuctionsBrowse(cat);
    };
    $('.aubody').html('<div class="empty">Loading\u2026</div>');
    let browseQ = `items/browse?ProductHierarchyId=${encodeURIComponent(cat)}&PageSize=30&Page=1`;
    if (There.data.ausortParam) {
      browseQ += `&${There.data.ausortParam}`;
    }
    There.webappsFetch(browseQ, function(xml) {
      if (There.data.panel != 'auctions') {
        return;
      }
      const crumbs = $('.aucrumbs');
      const body = $('.aubody');
      $(crumbs).empty();
      $(body).empty();
      if (!xml) {
        $(body).html('<div class="empty">Auctions did not answer. Try again in a moment.</div>');
        return;
      }
      // crumbs: All > ancestors (the current category is the last ancestor)
      $('<span class="crumb"></span>').text('All').on('click', function() {
        There.playSound('control down');
        There.pickAuctionCat('', '');
      }).appendTo($(crumbs));
      const ancestors = Array.from(xml.getElementsByTagName('Ancestors')[0]?.getElementsByTagName('Category') || []);
      ancestors.forEach(function(anc, i) {
        $('<span></span>').text('\u203A').appendTo($(crumbs));
        const hid = There.xmlText(anc, 'Hid');
        let el = $('<span class="crumb"></span>').text(There.xmlText(anc, 'HierName'));
        if (i == ancestors.length - 1) {
          $(el).attr('data-here', '1');
        } else {
          $(el).on('click', function() {
            There.playSound('control down');
            There.loadAuctionsBrowse(hid);
          });
        }
        $(el).appendTo($(crumbs));
      });
      // subcategories as tiles
      const schema = xml.getElementsByTagName('SubCategories')[0];
      for (const sc of schema ? schema.getElementsByTagName('Category') : []) {
        const id = There.xmlText(sc, 'Id');
        const name = There.xmlText(sc, 'Name');
        if (!id) {
          continue;
        }
        let tile = $('<div class="shoptile"></div>');
        $('<div></div>').text(name).appendTo($(tile));
        (function(h) {
          $(tile).on('click', function() {
            There.playSound('control down');
            There.loadAuctionsBrowse(h);
          });
        })(id);
        $(tile).appendTo($(body));
      }
      const listings = xml.getElementsByTagName('Listing');
      if (listings.length) {
        $('<div class="ausection"></div>').text('Auctions').appendTo($(body));
        for (const li of listings) {
          There.renderAuctionCard(body, li);
        }
      }
      if ($(body).children().length == 0) {
        $(body).html('<div class="empty">Nothing here right now.</div>');
      }
      There.applyGridScale();
    });
  },

  // sort keys straight from the auction site's own column headers
  AUCTION_SORTS: [
    { label: 'Price low to high', param: 'SortAscNum=CurrentPrice' },
    { label: 'Price high to low', param: 'SortDescNum=CurrentPrice' },
    { label: 'Name A to Z', param: 'SortAsc=LongName' },
    { label: 'Name Z to A', param: 'SortDesc=LongName' },
    { label: 'Ending soonest', param: 'SortAscDate=EndTime' },
    { label: 'Newest listings', param: 'SortDescNum=ItemId' },
    { label: 'Designer A to Z', param: 'SortAsc=ArtKitDesignerName' },
  ],

  pickAuctionSort: function(param, label) {
    There.data.ausortParam = param;
    $('.ausort .ausortlabel').text(param ? label : 'Sort…');
    $('.ausortlist, .aucatlist').attr('data-open', '0');
    $('.ausort, .aucat').attr('data-open', '0');
    if ($('.aucontrols .ausearch').val().trim()) {
      There.searchAuctions();
    } else if (There.data.aucatSel) {
      There.loadAuctionsBrowse(There.data.aucatSel);
    } else if (param) {
      // no category picked: sort across everything via the root category
      There.loadAuctionsBrowse('1000000001');
    } else {
      There.loadAuctionsHome();
    }
  },

  pickAuctionCat: function(id, name) {
    There.data.aucatSel = id;
    $('.aucat .aucatlabel').text(id ? name : 'Browse…');
    $('.aucatlist').attr('data-open', '0');
    $('.aucat').attr('data-open', '0');
    if ($('.aucontrols .ausearch').val().trim()) {
      There.searchAuctions();
    } else if (id) {
      There.loadAuctionsBrowse(id);
    } else {
      There.loadAuctionsHome();
    }
  },

  loadDesigner: function(name) {
    There.data.auBack = function() {
      There.loadDesigner(name);
    };
    const crumbs = $('.aucrumbs');
    $(crumbs).empty();
    $('<span class="crumb"></span>').text('All').on('click', function() {
      There.playSound('control down');
      There.pickAuctionCat('', '');
    }).appendTo($(crumbs));
    $('<span></span>').text('\u203A').appendTo($(crumbs));
    $('<span class="crumb" data-here="1"></span>').text(`Designer: ${name}`).appendTo($(crumbs));
    $('.aubody').html('<div class="empty">Loading\u2026</div>');
    let q = `items/designersearch?ArtKitDesignerName=${encodeURIComponent(name)}` +
      '&ProductHierarchyId=1000000001&DesignerOnly=yes&PageSize=30&Page=1';
    q += `&${There.data.ausortParam || 'SortDescNum=ItemId'}`;
    There.webappsFetch(q, function(xml) {
      if (There.data.panel != 'auctions') {
        return;
      }
      const body = $('.aubody');
      $(body).empty();
      const listings = xml ? xml.getElementsByTagName('Listing') : [];
      for (const li of listings) {
        There.renderAuctionCard(body, li);
      }
      if (!listings.length) {
        $(body).html('<div class="empty">Nothing listed by this designer right now.</div>');
      }
      There.applyGridScale();
    });
  },

  renderAuctionCard: function(body, li, feat) {
    const id = There.xmlText(li, 'ItemId') || There.xmlText(li, 'Id');
    const name = There.xmlText(li, 'LongName') || 'Auction ' + id;
    const img = There.xmlText(li, 'SmallImageUrl');
    const imgLarge = There.xmlText(li, 'LargeImageUrl');
    const price = There.xmlText(li, 'CurrentPrice');
    const bids = There.xmlText(li, 'BidCount');
    let card = $('<div class="aucard"></div>');
    if (feat) {
      $(card).attr('data-feat', '1');
    }
    $(card).attr('title', name);
    let im = $('<div class="scimg"></div>');
    There.webappsImg(im, img, imgLarge);
    $(im).appendTo($(card));
    let foot = $('<div class="scfoot"></div>');
    $('<div class="scname"></div>').text(name).appendTo($(foot));
    if (price) {
      $('<div class="scprice"></div>').html(`${tmuiIcon('coins')}${price}T` + (bids ? ` \u00B7 ${bids} bid${bids == '1' ? '' : 's'}` : '')).appendTo($(foot));
    }
    $(foot).appendTo($(card));
    (function(itemId) {
      $(card).on('click', function() {
        There.playSound('control down');
        There.showAuctionDetail(itemId);
      });
    })(id);
    $(card).appendTo($(body));
  },

  // our own auction page from /items/view: picture, price, seller, time left
  showAuctionDetail: function(itemId) {
    const body = $('.aubody');
    $(body).html('<div class="empty">Loading\u2026</div>');
    There.webappsFetch(`items/view?ItemId=${encodeURIComponent(itemId)}`, function(xml) {
      if (There.data.panel != 'auctions') {
        return;
      }
      $(body).empty();
      if (!xml) {
        $(body).html('<div class="empty">That auction did not load. Try again in a moment.</div>');
        return;
      }
      let d = $('<div class="itemdetail"></div>');
      $('<div class="idback"></div>').text('\u2039 Back').on('click', function() {
        There.playSound('control down');
        (There.data.auBack || There.loadAuctionsHome)();
      }).appendTo($(d));
      let top = $('<div class="idtop"></div>');
      const img = There.xmlText(xml, 'LargeImageUrl') || There.xmlText(xml, 'SmallImageUrl');
      let im = $('<div class="idimg"></div>');
      if (img) {
        $('<img>').attr('src', There.WEBAPPS_MEDIA + img).appendTo($(im));
      }
      $(im).appendTo($(top));
      let info = $('<div class="idinfo"></div>');
      const name = There.xmlText(xml, 'LongName') || There.xmlText(xml, 'ShortName') || 'Auction ' + itemId;
      $('<div class="idname"></div>').text(name).appendTo($(info));
      const price = There.xmlText(xml, 'CurrentPrice');
      const bids = There.xmlText(xml, 'BidCount');
      if (price) {
        $('<div class="idprice"></div>').html(`${tmuiIcon('coins')}${price}T` + (bids ? ` \u00B7 ${bids} bid${bids == '1' ? '' : 's'}` : '')).appendTo($(info));
      }
      const meta = [];
      const designer = There.xmlText(xml, 'ArtKitDesignerName');
      const designerDoid = There.xmlText(xml, 'ArtKitDesigner');
      const seller = There.xmlText(xml, 'SellerName');
      const sellerDoid = There.xmlText(xml, 'Seller');
      const ends = There.xmlText(xml, 'EndTime');
      const qty = There.xmlText(xml, 'Quantity');
      if (designer) {
        meta.push(['Designer', designer, designerDoid]);
      }
      if (seller) {
        meta.push(['Seller', seller, sellerDoid]);
      }
      if (qty && qty != '0' && qty != '1') {
        meta.push(['Quantity', qty]);
      }
      if (ends) {
        meta.push(['Ends', ends]);
      }
      if (meta.length) {
        let grid = $('<div class="idmeta"></div>');
        for (const m of meta) {
          $('<span class="ml"></span>').text(m[0]).appendTo($(grid));
          let mv = $('<span class="mv"></span>');
          if (m[2]) {
            // names open the avatar's There profile, same page the site links
            (function(doid) {
              $('<span class="idlink"></span>').text(m[1]).on('click', function() {
                There.openUrl(`https://webapps.prod.there.com/profiles/profiles?AvatarDoid=${doid}&Mode=OutThere&op=view`);
              }).appendTo($(mv));
            })(m[2]);
          } else {
            $(mv).text(m[1]);
          }
          $(mv).appendTo($(grid));
        }
        $(grid).appendTo($(info));
      }
      $(info).appendTo($(top));
      $(top).appendTo($(d));
      const desc = There.xmlText(xml, 'LongDescription');
      const extra = There.xmlText(xml, 'ExtraDescription');
      if (desc) {
        $('<div class="iddesc"></div>').text(desc).appendTo($(d));
      }
      if (extra && extra != desc) {
        $('<div class="iddesc"></div>').text(extra).appendTo($(d));
      }
      let btns = $('<div class="idbtns"></div>');
      $('<div class="button"></div>').attr('data-primary', '1').text('Bid / Buy').on('click', function() {
        There.playSound('menu item activate');
        There.openUrl(`https://webapps.prod.there.com/items/view?ItemId=${itemId}`);
      }).appendTo($(btns));
      $('<span class="idlink"></span>').text('View on There Central').on('click', function() {
        There.openUrl(`https://webapps.prod.there.com/items/view?ItemId=${itemId}`);
      }).appendTo($(btns));
      $(btns).appendTo($(d));
      $(d).appendTo($(body));
    });
  },

  searchAuctions: function() {
    const text = $('.aucontrols .ausearch').val().trim();
    const cat = There.data.aucatSel || '';
    if (!text) {
      if (cat) {
        There.loadAuctionsBrowse(cat);
      } else {
        There.loadAuctionsHome();
      }
      return;
    }
    There.data.auBack = There.searchAuctions;
    $('.aucrumbs').empty();
    $('.aubody').html('<div class="empty">Searching\u2026</div>');
    let q = `items/fulltextsearch?Fulltext=${encodeURIComponent(text)}&PageSize=30&Page=1`;
    if (cat) {
      q += `&ProductHierarchyId=${encodeURIComponent(cat)}`;
    }
    if (There.data.ausortParam) {
      q += `&${There.data.ausortParam}`;
    }
    There.webappsFetch(q, function(xml) {
      if (There.data.panel != 'auctions') {
        return;
      }
      const body = $('.aubody');
      $(body).empty();
      const listings = xml ? xml.getElementsByTagName('Listing') : [];
      for (const li of listings) {
        There.renderAuctionCard(body, li);
      }
      if (!listings.length) {
        $(body).html('<div class="empty">No auctions match.</div>');
      }
      There.applyGridScale();
    });
  },

  /* ------- Places panel -------
   * The native Places > Go To Favorite menu holds the player's bookmarks,
   * with their folders from Organize. Walk it on open (it's tiny), click =
   * the entry's own activate node, which is a native teleport. */

  PLACES_MENU: '/mainMenu/Places/Go To Favorite',

  // flatten the native favorites (their Organize folders are ignored, our own
  // folder system does the organizing) into panel items
  loadPlaces: function() {
    There.renderFolderView();
    There.menuKids(There.PLACES_MENU, function(names) {
      const items = [];
      const finish = function() {
        items.sort((x, y) => x.name.localeCompare(y.name));
        There.data.places = items;
        if (There.data.panel == 'places') {
          There.renderWhenFree();
        }
      };
      if (names == null || !names.length) {
        finish();
        return;
      }
      const step = function(i) {
        if (i >= names.length) {
          finish();
          return;
        }
        There.menuKids(`${There.PLACES_MENU}/${names[i]}`, function(kids) {
          if (kids && kids.length) {
            for (const k of kids) {
              items.push({ name: k, suffix: `${names[i]}/${k}`, place: true, glyph: '📍' });
            }
          } else {
            items.push({ name: names[i], suffix: names[i], place: true, glyph: '📍' });
          }
          There.setNamedTimer('places-walk', 40, function() {
            step(i + 1);
          });
        });
      };
      step(0);
    });
  },

  teleportToFavorite: function(suffix) {
    There.playSound('menu item activate');
    // Action Mode hides the game UI and its menus read dead, peek while invoking
    There.withUiPeek(function(done) {
      There.fetch({
        path: '/ScriptHook/Invoke',
        query: { Path: `${There.PLACES_MENU}/${suffix}/activate` },
        dataType: 'xml',
        complete: done,
      });
    });
    There.closePanel();
  },

  /* ------- custom item folders (nested, per scope, per avatar) -------
   * All local, in localStorage. Keyed by avatar (pilotDoid) so accounts never
   * share folders, and by scope:
   *   inventory         -> one tree for all possessions
   *   wardrobe:<catId>   -> a tree per clothing category (tops, bottoms, ...)
   * Items referenced by doid (possessions) or poid (clothing). Nesting via a
   * `parent` link, null = scope root. Nothing leaves the machine. */

  // stable id for an item within its scope (places go by their menu path)
  itemKey: function(item) {
    return String(item.doid || item.poid || item.suffix || '');
  },

  // panels that share the custom folder system
  folderPanelOpen: function() {
    return ['inventory', 'wardrobe', 'places'].includes(There.data.panel);
  },

  // folder scope for the active panel. wardrobe is per category so "Summer"
  // under Tops isn't the same as under Shoes
  currentScope: function() {
    if (There.data.panel == 'wardrobe') {
      return 'wardrobe:' + (There.data.wardrobeTab || 'all');
    }
    if (There.data.panel == 'places') {
      return 'places';
    }
    return 'inventory';
  },

  foldersKey: function(scope) {
    return `dock.folders.${scope}.${There.data.pilotDoid || 0}`;
  },

  loadFolders: function(scope) {
    try {
      const raw = JSON.parse(localStorage.getItem(There.foldersKey(scope)) || '{}');
      if (Array.isArray(raw.folders)) {
        return raw.folders
          .filter(f => f && typeof f.name == 'string' && typeof f.id == 'string')
          .map(f => ({
            id: f.id,
            name: f.name,
            parent: (typeof f.parent == 'string' && f.parent) ? f.parent : null,
            members: Array.isArray(f.members) ? f.members.map(String) : [],
          }));
      }
    } catch (error) {
    }
    return [];
  },

  // folders for a scope (default: active one), cached so we don't re-parse each render
  folders: function(scope) {
    scope = scope || There.currentScope();
    There.data.folderCache = There.data.folderCache || {};
    if (!There.data.folderCache[scope]) {
      There.data.folderCache[scope] = There.loadFolders(scope);
    }
    return There.data.folderCache[scope];
  },

  saveFolders: function(scope) {
    scope = scope || There.currentScope();
    try {
      localStorage.setItem(There.foldersKey(scope), JSON.stringify({
        folders: There.folders(scope),
      }));
    } catch (error) {
    }
  },

  newFolderId: function() {
    return 'f' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  },

  // new folder under `parent` (null = root). reuses a same-named sibling
  createFolder: function(name, parent) {
    name = (name || '').trim();
    if (!name) {
      return null;
    }
    parent = parent || null;
    const folders = There.folders();
    let folder = folders.find(f => f.parent == parent && f.name.toLowerCase() == name.toLowerCase());
    if (!folder) {
      folder = { id: There.newFolderId(), name: name, parent: parent, members: [] };
      folders.push(folder);
      There.saveFolders();
    }
    return folder;
  },

  renameFolder: function(folderId, name) {
    name = (name || '').trim();
    const folder = There.folders().find(f => f.id == folderId);
    if (folder && name) {
      folder.name = name;
      There.saveFolders();
    }
  },

  // delete a folder and everything under it. items just become unfiled, they
  // still exist in inventory/wardrobe
  deleteFolder: function(folderId) {
    const folders = There.folders();
    const toRemove = new Set([folderId]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const f of folders) {
        if (f.parent && toRemove.has(f.parent) && !toRemove.has(f.id)) {
          toRemove.add(f.id);
          grew = true;
        }
      }
    }
    const kept = folders.filter(f => !toRemove.has(f.id));
    There.data.folderCache[There.currentScope()] = kept;
    There.saveFolders();
    // if we were inside a deleted folder, climb back to the surviving parent
    const scope = There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    const path = (There.data.folderPath[scope] || []).filter(id => !toRemove.has(id));
    There.data.folderPath[scope] = path;
  },

  folderById: function(folderId, scope) {
    return There.folders(scope).find(f => f.id == folderId) || null;
  },

  childFolders: function(parentId, scope) {
    return There.folders(scope).filter(f => (f.parent || null) == (parentId || null));
  },

  // which folder (if any) the item is in, in the active scope
  folderOf: function(item, scope) {
    const key = There.itemKey(item);
    return There.folders(scope).find(f => f.members.includes(key)) || null;
  },

  // move an item into a folder (out of any other in this scope), or out of all
  // folders when folderId is falsy
  moveToFolder: function(item, folderId, scope) {
    scope = scope || There.currentScope();
    const key = There.itemKey(item);
    if (!key) {
      return; // not a filable item (e.g. a dragged scene chip)
    }
    for (const f of There.folders(scope)) {
      f.members = f.members.filter(m => m != key);
    }
    if (folderId && folderId != 'unfiled' && folderId != 'all' && folderId != 'root') {
      const folder = There.folderById(folderId, scope);
      if (folder && !folder.members.includes(key)) {
        folder.members.push(key);
      }
    }
    There.saveFolders(scope);
  },

  /* ------- folder navigation (breadcrumb path per scope) ------- */

  // folder we're currently in for a scope (null = root)
  currentFolderId: function(scope) {
    scope = scope || There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    const path = There.data.folderPath[scope] || [];
    return path.length ? path[path.length - 1] : null;
  },

  // breadcrumb chain for a scope (root -> ... -> current)
  folderBreadcrumb: function(scope) {
    scope = scope || There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    const path = There.data.folderPath[scope] || [];
    const crumbs = [];
    for (const id of path) {
      const f = There.folderById(id, scope);
      if (f) {
        crumbs.push(f);
      }
    }
    return crumbs;
  },

  enterFolder: function(folderId) {
    const scope = There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    There.data.folderPath[scope] = (There.data.folderPath[scope] || []).concat([folderId]);
  },

  // jump to a folder already on the path (root if folderId is null)
  gotoFolder: function(folderId) {
    const scope = There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    if (!folderId) {
      There.data.folderPath[scope] = [];
      return;
    }
    const path = There.data.folderPath[scope] || [];
    const i = path.indexOf(folderId);
    There.data.folderPath[scope] = i >= 0 ? path.slice(0, i + 1) : path;
  },

  folderUp: function() {
    const scope = There.currentScope();
    There.data.folderPath = There.data.folderPath || {};
    const path = There.data.folderPath[scope] || [];
    path.pop();
    There.data.folderPath[scope] = path;
  },

  /* ------- folders backup (export / import, per avatar) ------- */

  // every folder scope for this avatar. keys look like "dock.folders.<scope>.<doid>"
  collectFolders: function() {
    const doid = String(There.data.pilotDoid || 0);
    const suffix = '.' + doid;
    const prefix = 'dock.folders.';
    const scopes = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix) && key.endsWith(suffix)) {
          const scope = key.slice(prefix.length, key.length - suffix.length);
          try {
            const val = JSON.parse(localStorage.getItem(key) || '{}');
            if (val && Array.isArray(val.folders) && val.folders.length) {
              scopes[scope] = val.folders;
            }
          } catch (error) {
          }
        }
      }
    } catch (error) {
    }
    return scopes;
  },

  exportFolders: function() {
    const doid = String(There.data.pilotDoid || 0);
    const payload = {
      app: 'ThereModernUI',
      kind: 'folders',
      version: 1,
      avatarDoid: doid,
      avatarName: There.variables.there_pilotname || '',
      exportedAt: new Date().toISOString(),
      scopes: There.collectFolders(),
    };
    const json = JSON.stringify(payload, null, 2);
    const scopeCount = Object.keys(payload.scopes).length;
    if (scopeCount == 0) {
      There.setFoldersNote('No folders to export yet.');
      return;
    }
    // download via Blob URL + fake anchor click (works in WebView2)
    try {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const stamp = new Date().toISOString().slice(0, 10);
      const safeName = (payload.avatarName || doid).replace(/[^a-z0-9_-]+/gi, '_');
      const a = document.createElement('a');
      a.href = url;
      a.download = `ThereModernUI-folders-${safeName}-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
      There.setFoldersNote(`Exported ${scopeCount} folder set(s) for this avatar.`);
    } catch (error) {
      There.setFoldersNote('Could not export (browser blocked the download).');
    }
    There.playSound('menu item activate');
  },

  // Restore a backup into THIS avatar only. The file's own doid is ignored on
  // purpose so any account's backup restores into whoever's logged in, but we
  // warn if they differ so nothing gets merged by surprise.
  importFoldersFromFile: function(file) {
    const reader = new FileReader();
    reader.onload = function() {
      let data;
      try {
        data = JSON.parse(String(reader.result || ''));
      } catch (error) {
        There.setFoldersNote('That file is not valid JSON.');
        return;
      }
      if (!data || data.app != 'ThereModernUI' || data.kind != 'folders' || typeof data.scopes != 'object') {
        There.setFoldersNote('That is not a ThereModernUI folders backup.');
        return;
      }
      There.applyImportedFolders(data);
    };
    reader.onerror = function() {
      There.setFoldersNote('Could not read that file.');
    };
    reader.readAsText(file);
  },

  applyImportedFolders: function(data) {
    const doid = String(There.data.pilotDoid || 0);
    let restored = 0;
    for (const scope in data.scopes) {
      const folders = data.scopes[scope];
      if (!Array.isArray(folders)) {
        continue;
      }
      // sanitise to just the fields we store
      const clean = folders
        .filter(f => f && typeof f.name == 'string' && typeof f.id == 'string')
        .map(f => ({
          id: f.id,
          name: f.name,
          parent: (typeof f.parent == 'string' && f.parent) ? f.parent : null,
          members: Array.isArray(f.members) ? f.members.map(String) : [],
        }));
      try {
        // always the CURRENT avatar's key, never the backup's doid
        localStorage.setItem(`dock.folders.${scope}.${doid}`, JSON.stringify({ folders: clean }));
        restored++;
      } catch (error) {
      }
    }
    // drop cached folders so the next render re-reads storage
    There.data.folderCache = {};
    There.data.folderPath = {};
    const note = (data.avatarDoid && data.avatarDoid != doid)
      ? `Imported ${restored} folder set(s) from a different avatar into this one.`
      : `Imported ${restored} folder set(s).`;
    There.setFoldersNote(note);
    There.playSound('menu item activate');
    // refresh an open panel so the restored folders show
    if (There.folderPanelOpen()) {
      There.renderFolderView();
    }
  },

  setFoldersNote: function(text) {
    $('.setfolders').text(text || '');
  },

  /* ------- music settings (instance picker) ------- */

  renderMusicSettings: function() {
    $('.musicinstance').val(YtMusic.data.instance || '');
    const picks = $('.instancepicks');
    $(picks).empty();
    // "Auto-find" tries each default instance, first that works wins
    let auto = $('<div class="instpick" data-accent="1"></div>').text('⚡ Auto-find a working one');
    $(auto).on('click', function() {
      There.setMusicNote('Testing instances…');
      YtMusic.autoPickInstance(function(found) {
        if (found) {
          $('.musicinstance').val(found);
          There.setMusicNote('Using ' + found);
        } else {
          There.setMusicNote('None of the known instances answered. Paste one manually.');
        }
      });
    });
    $(auto).appendTo($(picks));
    for (const inst of YtMusic.defaultInstances) {
      (function(url) {
        let chip = $('<div class="instpick"></div>').text(url.replace(/^https?:\/\//, ''));
        if (YtMusic.data.instance == url) {
          $(chip).attr('data-active', '1');
        }
        $(chip).on('click', function() {
          $('.musicinstance').val(url);
          There.saveMusicInstance(url);
        });
        $(chip).appendTo($(picks));
      })(inst);
    }
  },

  saveMusicInstance: function(url) {
    url = (url || $('.musicinstance').val() || '').trim();
    if (!url) {
      return;
    }
    There.setMusicNote('Testing…');
    YtMusic.probeInstance(url, function(ok) {
      YtMusic.setInstance(url);
      There.renderMusicSettings();
      There.setMusicNote(ok ? 'Saved. This instance works.' : 'Saved, but it did not answer a test search. It may still work later, or try Auto-find.');
    });
  },

  setMusicNote: function(text) {
    $('.musicnote').text(text || '');
  },

  /* ------- Music panel (YouTube-backed) ------- */

  renderMusic: function() {
    There.renderMusicTabs();
    There.renderMusicBody();
    There.refreshNowPlaying();
    $('.npvolslider').val(YtMusic.data.volume);
  },

  renderMusicTabs: function() {
    const tabs = $('.musictabs');
    $(tabs).empty();
    const mk = function(id, label, icon) {
      let el = $('<div class="tab"></div>').attr('data-id', id);
      if (icon) {
        $(el).html(tmuiIcon(icon));
      }
      $('<span></span>').text(label).appendTo($(el));
      if ((There.data.musicTab || 'search') == id) {
        $(el).attr('data-active', '1');
      }
      $(el).on('click', function() {
        There.playSound('control down');
        There.data.musicTab = id;
        There.data.musicPlaylist = null;
        There.renderMusic();
      });
      $(el).appendTo($(tabs));
    };
    mk('search', 'Search', 'magnifying-glass');
    mk('queue', 'Queue', 'list');
    for (const pl of YtMusic.data.playlists) {
      let el = $('<div class="tab" data-folder="1"></div>')
        .attr('data-id', 'pl:' + pl.id)
        .append($('<span></span>').text(pl.name))
        .append($('<span class="tabcount"></span>').text(pl.tracks.length));
      if (There.data.musicTab == ('pl:' + pl.id)) {
        $(el).attr('data-active', '1');
      }
      (function(plid) {
        $(el).on('click', function() {
          There.playSound('control down');
          There.data.musicTab = 'pl:' + plid;
          There.renderMusic();
        }).on('contextmenu', function(event) {
          event.preventDefault();
          There.musicPlaylistMenu(plid);
        });
      })(pl.id);
      $(el).appendTo($(tabs));
    }
    let add = $('<div class="tab tabadd" title="New playlist"></div>').text('+ Playlist');
    $(add).on('click', function() {
      There.showFolderPrompt('New playlist', '', function(name) {
        const pl = YtMusic.createPlaylist(name);
        if (pl) {
          There.data.musicTab = 'pl:' + pl.id;
        }
        There.renderMusic();
      });
    });
    $(add).appendTo($(tabs));
  },

  musicPlaylistMenu: function(plid) {
    const pl = YtMusic.data.playlists.find(p => p.id == plid);
    if (!pl) {
      return;
    }
    There.showFolderPrompt('Rename playlist', pl.name, function(name, action) {
      if (action == 'delete') {
        YtMusic.deletePlaylist(plid);
        if (There.data.musicTab == 'pl:' + plid) {
          There.data.musicTab = 'search';
        }
      } else {
        YtMusic.renamePlaylist(plid, name);
      }
      There.renderMusic();
    }, true);
  },

  renderMusicBody: function() {
    const body = $('.musicbody');
    $(body).empty();
    const tab = There.data.musicTab || 'search';
    if (tab == 'search') {
      // last results if any, otherwise a hint
      if (There.data.musicResults && There.data.musicResults.length) {
        for (const t of There.data.musicResults) {
          There.renderTrackRow(t, body, 'search');
        }
      } else {
        $('<div class="musichint"></div>').html(There.data.musicSearching
          ? 'Searching…'
          : 'Type a song name and press Enter, or paste a YouTube link.').appendTo($(body));
      }
      return;
    }
    if (tab == 'queue') {
      const q = YtMusic.data.queue;
      if (q.length == 0) {
        $('<div class="musichint"></div>').text('The queue is empty. Play something from Search or a playlist.').appendTo($(body));
        return;
      }
      q.forEach(function(t, i) {
        There.renderTrackRow(t, body, 'queue', i);
      });
      return;
    }
    if (tab.indexOf('pl:') == 0) {
      const pl = YtMusic.data.playlists.find(p => p.id == tab.slice(3));
      if (!pl) {
        There.data.musicTab = 'search';
        There.renderMusic();
        return;
      }
      if (pl.tracks.length == 0) {
        $('<div class="musichint"></div>').text('This playlist is empty. Add tracks from Search (the ♪ button).').appendTo($(body));
        return;
      }
      // "Play all" header
      let head = $('<div class="plhead"></div>');
      $('<div class="plplayall"></div>').text('▶ Play all').on('click', function() {
        YtMusic.playQueue(pl.tracks, 0);
        There.data.musicTab = 'queue';
        There.renderMusic();
      }).appendTo($(head));
      $(head).appendTo($(body));
      pl.tracks.forEach(function(t) {
        There.renderTrackRow(t, body, 'playlist', null, pl.id);
      });
    }
  },

  // one track row: thumb, title/author, actions for the context
  renderTrackRow: function(track, body, context, queueIndex, playlistId) {
    let row = $('<div class="trackrow"></div>').attr('title', track.title);
    const cur = YtMusic.current();
    if (cur && cur.id == track.id && context == 'queue') {
      $(row).attr('data-current', '1');
    }
    let thumb = $('<div class="trackthumb"></div>');
    if (track.thumb) {
      $(thumb).css('background-image', `url("${track.thumb}")`);
    }
    $(row).append(thumb);
    let meta = $('<div class="trackmeta"></div>');
    $('<div class="tracktitle"></div>').text(track.title).appendTo($(meta));
    $('<div class="trackauthor"></div>').text((track.author || '') + (track.duration ? ' · ' + YtMusic.fmtDuration(track.duration) : '')).appendTo($(meta));
    $(row).append(meta);

    let acts = $('<div class="trackacts"></div>');
    $('<div class="trackbtn" title="Play"></div>').html(tmuiIcon('play')).on('click', function(e) {
      e.stopPropagation();
      if (context == 'queue' && queueIndex != null) {
        YtMusic.data.index = queueIndex;
        YtMusic.playCurrent();
      } else if (context == 'playlist' && playlistId) {
        const pl = YtMusic.data.playlists.find(p => p.id == playlistId);
        const start = pl ? pl.tracks.findIndex(t => t.id == track.id) : 0;
        YtMusic.playQueue(pl.tracks, Math.max(0, start));
        There.data.musicTab = 'queue';
      } else {
        YtMusic.enqueue(track);
        YtMusic.data.index = YtMusic.data.queue.length - 1;
        YtMusic.playCurrent();
      }
      There.renderMusic();
    }).appendTo($(acts));
    $('<div class="trackbtn" title="Add to queue"></div>').html(tmuiIcon('plus')).on('click', function(e) {
      e.stopPropagation();
      YtMusic.enqueue(track);
      There.renderMusic();
    }).appendTo($(acts));
    // add to playlist (search/queue)
    if (context != 'playlist') {
      $('<div class="trackbtn" title="Add to playlist"></div>').html(tmuiIcon('music')).on('click', function(e) {
        e.stopPropagation();
        There.addTrackToPlaylistPrompt(track);
      }).appendTo($(acts));
    } else {
      // remove from this playlist
      $('<div class="trackbtn" data-danger="1" title="Remove"></div>').html(tmuiIcon('xmark')).on('click', function(e) {
        e.stopPropagation();
        YtMusic.removeFromPlaylist(playlistId, track.id);
        There.renderMusic();
      }).appendTo($(acts));
    }
    $(row).append(acts);
    $(row).appendTo($(body));
  },

  // pick a playlist to add a track to (same chooser style as the action bar)
  addTrackToPlaylistPrompt: function(track) {
    if (YtMusic.data.playlists.length == 0) {
      There.showFolderPrompt('New playlist', '', function(name) {
        const pl = YtMusic.createPlaylist(name);
        if (pl) {
          YtMusic.addToPlaylist(pl.id, track);
        }
        There.renderMusic();
      });
      return;
    }
    // just cycle a small inline chooser at the top of the body
    const body = $('.musicbody');
    let bar = $('<div class="plchooser"></div>');
    $('<span></span>').text('Add to: ').appendTo($(bar));
    for (const pl of YtMusic.data.playlists) {
      (function(p) {
        $('<div class="plchip"></div>').text(p.name).on('click', function() {
          YtMusic.addToPlaylist(p.id, track);
          There.renderMusic();
        }).appendTo($(bar));
      })(pl);
    }
    $('<div class="plchip" data-accent="1"></div>').text('+ New').on('click', function() {
      There.showFolderPrompt('New playlist', '', function(name) {
        const pl = YtMusic.createPlaylist(name);
        if (pl) {
          YtMusic.addToPlaylist(pl.id, track);
        }
        There.renderMusic();
      });
    }).appendTo($(bar));
    $(body).prepend($(bar));
  },

  doMusicSearch: function(q) {
    q = (q || '').trim();
    There.data.musicTab = 'search';
    // pasted link/id adds the track directly, no API call
    const direct = YtMusic.trackFromInput(q);
    if (direct && /youtu|^[\w-]{11}$/.test(q)) {
      There.data.musicResults = [direct];
      There.renderMusic();
      return;
    }
    There.data.musicSearching = true;
    There.data.musicResults = [];
    There.renderMusic();
    const run = function(isRetry) {
      YtMusic.search(q, function(results, err) {
        if (results && results.length == 0 && !isRetry) {
          // empty might mean a dead instance: auto-pick once, then retry
          $('.musicbody').empty();
          $('<div class="musichint"></div>').text('Finding a working music service…').appendTo($('.musicbody'));
          YtMusic.autoPickInstance(function() { run(true); });
          return;
        }
        There.data.musicSearching = false;
        if (results) {
          There.data.musicResults = results;
        } else if (!isRetry) {
          // hard error: auto-pick a working instance and retry once
          $('.musicbody').empty();
          $('<div class="musichint"></div>').text('That music service is down, trying another…').appendTo($('.musicbody'));
          YtMusic.autoPickInstance(function(found) {
            if (found) {
              run(true);
            } else {
              There.data.musicSearching = false;
              There.data.musicResults = [];
              if (There.data.panel == 'music') {
                There.renderMusic();
                $('.musicbody').prepend($('<div class="musichint" data-err="1"></div>').text('No music service is reachable right now. Set one in Settings → Music search service.'));
              }
            }
          });
          return;
        } else {
          There.data.musicResults = [];
        }
        if (There.data.panel == 'music') {
          There.renderMusic();
          if (!results || results.length == 0) {
            $('.musicbody').prepend($('<div class="musichint"></div>').text('No results.'));
          }
        }
      });
    };
    run(false);
  },

  /* now-playing bar */

  onMusicTrack: function(track) {
    There.refreshNowPlaying();
    if (There.data.panel == 'music' && There.data.musicTab == 'queue') {
      There.renderMusicBody();
    }
    // party sync: broadcast what we just started, unless it CAME from the party
    // feed (no ping-pong)
    if (There.data.suppressBroadcast) {
      There.data.suppressBroadcast = false;
    } else {
      There.broadcastTrack(track);
    }
  },

  onMusicState: function() {
    There.refreshNowPlaying();
  },

  refreshNowPlaying: function() {
    const t = YtMusic.current();
    const playing = YtMusic.isPlaying();
    const playGlyph = tmuiIcon(playing ? 'pause' : 'play');

    // slim dock mini-player, shown whenever a track is loaded (Music panel open or not)
    const mp = $('.miniplayer');
    if (!t) {
      $(mp).attr('data-active', '0');
    } else {
      $(mp).attr('data-active', '1');
      $('.miniplayer .mpthumb').css('background-image', t.thumb ? `url("${t.thumb}")` : '');
      $('.miniplayer .mptitle').text(t.title);
      $('.miniplayer .mpauthor').text(t.author || '');
      $('.miniplayer .mpplay').html(playGlyph);
      $(mp).attr('data-playing', playing ? '1' : '0');
    }

    // full now-playing bar in the Music panel
    const np = $('.nowplaying');
    if (!t) {
      $(np).attr('data-active', '0');
      return;
    }
    $(np).attr('data-active', '1');
    $('.nowplaying .npthumb').css('background-image', t.thumb ? `url("${t.thumb}")` : '');
    $('.nowplaying .nptitle').text(t.title);
    $('.nowplaying .npauthor').text(t.author || '');
    $('.nowplaying .npplay').html(playGlyph);
    $('.nowplaying .npbtn[data-id="shuffle"]').attr('data-on', YtMusic.data.shuffle ? '1' : '');
    const rep = YtMusic.data.repeat;
    $('.nowplaying .npbtn[data-id="repeat"]')
      .attr('data-on', rep == 'off' ? '' : '1')
      .html(tmuiIcon('repeat') + (rep == 'one' ? '<span class="rep1">1</span>' : ''));
    $('.nowplaying .npbtn[data-id="party"]').attr('data-on', There.prefs().party ? '1' : '');
  },


  iconUrl: function(assetName) {
    if (!assetName) {
      return null;
    }
    const host = There.data.host || There.variables.there_resourceshost;
    if (!host) {
      return null;
    }
    return `http://${host}/resources/${assetName}`;
  },

  // cards per chunk. folders + first chunk go in right away, more get appended
  // as you scroll. keeps DOM nodes and image lookups bounded on big inventories
  CHUNK: 30,
  // cards built per frame inside a chunk
  CARD_SLICE: 10,

  renderCards: function(items) {
    There.clearItemMenu();
    let grid = $('.grid');
    $(grid).empty();
    const search = There.data.search.trim().toLowerCase();
    const filtered = search == '' ? items : items.filter(i => i.name.toLowerCase().includes(search));
    There.setFooterCount(filtered.length);

    // folder cards for this level (inventory + wardrobe). hidden while searching,
    // search covers the whole scope
    let folderCount = 0;
    if (!search && There.folderPanelOpen()) {
      const subs = There.childFolders(There.currentFolderId());
      for (let folder of subs) {
        There.renderFolderCard(folder, grid);
        folderCount++;
      }
    }

    if (filtered.length == 0 && folderCount == 0) {
      $('<div class="empty"></div>').text(items.length == 0 ? 'Nothing here.' : 'No matches.').appendTo($(grid));
      return;
    }

    // stash the list for chunked rendering, draw the first chunk
    There.data.renderList = filtered;
    There.data.renderPos = 0;
    There.renderChunk();
  },

  // append the next CHUNK from There.data.renderList
  renderChunk: function() {
    const list = There.data.renderList || [];
    let pos = There.data.renderPos || 0;
    if (pos >= list.length) {
      return;
    }
    const grid = $('.grid')[0];
    // one slice per frame: a panel opening on hundreds of items never builds
    // them all in one long block, the first slice paints while the rest follow
    const end = Math.min(pos + There.CHUNK, list.length);
    const sliceEnd = Math.min(pos + There.CARD_SLICE, end);
    const frag = document.createDocumentFragment();
    for (; pos < sliceEnd; pos++) {
      frag.appendChild(There.buildCard(list[pos])[0]);
    }
    if (grid) {
      grid.appendChild(frag);
    }
    There.data.renderPos = pos;
    if (pos < end) {
      const list0 = list;
      requestAnimationFrame(function() {
        // a newer render replaced this list: stop
        if (There.data.renderList === list0) {
          There.renderChunk();
        }
      });
      return;
    }
    // still not filling the viewport (no scrollbar = no scroll event), keep going
    if (grid && pos < list.length && grid.scrollHeight <= grid.clientHeight + 4) {
      There.setNamedTimer('render-fill', 0, There.renderChunk);
    }
  },

  // grid scroll: next chunk when near the bottom
  onGridScroll: function() {
    const grid = $('.grid')[0];
    if (!grid || !There.data.renderList) {
      return;
    }
    if ((There.data.renderPos || 0) >= There.data.renderList.length) {
      return;
    }
    if (grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 300) {
      There.renderChunk();
    }
  },

  // build one card (jQuery): thumb, interactions, drag. split out so renderCards
  // can build in chunks
  buildCard: function(item) {
    const host = There.data.host || There.variables.there_resourceshost;
    let card = $('<div class="card"></div>');
    $(card).attr('title', item.name + (item.status ? `\n${item.status}` : ''));
    let thumb = $('<div class="thumb"></div>');
    if (item.glyph) {
      $(thumb).text(item.glyph);
    } else {
      $(thumb).html(tmuiIcon(There.data.panel == 'wardrobe' ? 'shirt' : 'box-open'));
    }
    $(card).append(thumb);

    // outfits/looksets (item.pob) have no catalog image, keep the glyph
    if (item.pob) {
      $('<div class="cardname"></div>').text(item.name).appendTo($(card));
      There.makeDraggable(card, item);
      $(card).on('click', function(event) {
        event.preventDefault();
        There.toggleWear(item);
        There.maybeAutoClose();
      }).on('contextmenu', function(event) {
        event.preventDefault();
        There.showItemMenu(card, item, event);
      });
      return card;
    }

    // tile view prefers the catalog photo; list view prefers the local icon and only
    // falls back to catalog when there's none
    (function(thumbEl, it) {
      const showUrl = function(url) {
        // a real lazy img, not a background: the browser then fetches and
        // decodes only what scrolls into view, off the render path, instead
        // of bursting on every chunk (the wardrobe ALL scroll hitches)
        const img = $('<img class="thumbimg" alt="">')
          .attr('loading', 'lazy').attr('decoding', 'async').attr('src', url);
        // the picture store couldn't get it: straight from There instead
        $(img).one('error', function() {
          const direct = CatalogImages.fallbackUrl(this.src);
          if (direct) {
            this.src = direct;
          }
        });
        $(thumbEl).empty().append(img);
      };
      const localIcon = (it.icon && /\.(png|jpg|jpeg|gif)$/i.test(it.icon))
        ? `http://${host}/resources/${it.icon}` : null;
      const listView = There.prefs().view == 'list';
      const fromCatalog = function() {
        if (it.productId) {
          CatalogImages.imageForProduct(it.productId, 'medium', function(url) {
            if (url) { showUrl(url); } else if (localIcon) { showUrl(localIcon); }
          });
        } else if (it.poid) {
          CatalogImages.imageForPoid(it.poid, function(url) {
            if (url) { showUrl(url); } else if (localIcon) { showUrl(localIcon); }
          });
        } else if (localIcon) {
          showUrl(localIcon);
        }
      };
      try {
        if (listView && localIcon) {
          showUrl(localIcon);
        } else {
          fromCatalog();
        }
      } catch (error) {
      }
    })(thumb, item);

    $('<div class="cardname"></div>').text(item.name).appendTo($(card));
    if (item.status) {
      $('<div class="cardstatus"></div>').text(item.status).appendTo($(card));
    }
    There.makeDraggable(card, item);
    // wardrobe + Quick Equip on: left-click wears/takes off. otherwise (or in
    // Inventory) left-click opens the action bar like right-click
    $(card).on('click', function(event) {
      event.preventDefault();
      if (There.data.panel == 'wardrobe' && item.poid && There.prefs().quickEquip) {
        There.toggleWear(item);
        There.maybeAutoClose();
      } else {
        There.showItemMenu(card, item, event);
      }
    });
    $(card).on('contextmenu', function(event) {
      event.preventDefault();
      There.showItemMenu(card, item, event);
    });
    return card;
  },

  // folder card: glyph + name + count of everything inside (sub-folders too).
  // left-click opens, right-click renames/deletes
  renderFolderCard: function(folder, grid) {
    const total = There.folderItemCount(folder.id);
    let card = $('<div class="card folderCard"></div>').attr('title', folder.name);
    let thumb = $('<div class="thumb"></div>').html(tmuiIcon('folder'));
    $(card).append(thumb);
    $('<div class="cardname"></div>').text(folder.name).appendTo($(card));
    $('<div class="cardstatus"></div>').text(total + (total == 1 ? ' item' : ' items')).appendTo($(card));
    (function(fid) {
      $(card).on('click', function(event) {
        event.preventDefault();
        There.playSound('control down');
        There.enterFolder(fid);
        There.data.search = '';
        $('.panelsearch input').val('');
        There.renderFolderView();
      }).on('contextmenu', function(event) {
        event.preventDefault();
        There.folderEditPrompt(fid);
      });
      // drop an item on the folder to file it
      There.makeDropTarget(card, function(item) {
        There.playSound('close menu');
        There.moveToFolder(item, fid);
        There.renderFolderView();
      });
    })(folder.id);
    $(card).appendTo($(grid));
  },

  // item count under a folder, recursing into sub-folders
  folderItemCount: function(folderId) {
    let count = 0;
    const walk = function(id) {
      const f = There.folderById(id);
      if (f) {
        count += f.members.length;
      }
      for (const child of There.childFolders(id)) {
        walk(child.id);
      }
    };
    walk(folderId);
    return count;
  },

  /* ------- drag & drop -------
   * Cards are draggable. Drop on folder cards / breadcrumbs to move into that
   * folder, or on Quick Bar slots to assign. The item rides on There.data.dragItem
   * because custom dataTransfer payloads are flaky in WebView2; dataTransfer just
   * carries a marker. */

  makeDraggable: function(el, item) {
    const node = el[0] || el;
    node.setAttribute('draggable', 'true');
    $(el).on('dragstart', function(event) {
      There.data.dragItem = item;
      $('.dockroot').attr('data-dragging', '1');
      try {
        const dt = event.originalEvent.dataTransfer;
        dt.effectAllowed = 'copyMove';
        dt.setData('text/plain', There.itemKey(item));
      } catch (error) {
      }
      $(el).addClass('dragging');
    }).on('dragend', function() {
      There.data.dragItem = null;
      $('.dockroot').attr('data-dragging', '');
      $(el).removeClass('dragging');
      $('.droptarget').removeClass('droptarget');
    });
  },

  // make an element a drop target, onDrop(item) runs on drop
  makeDropTarget: function(el, onDrop) {
    $(el).on('dragover', function(event) {
      if (There.data.dragItem) {
        event.preventDefault();
        try {
          event.originalEvent.dataTransfer.dropEffect = 'move';
        } catch (error) {
        }
      }
    }).on('dragenter', function(event) {
      if (There.data.dragItem) {
        event.preventDefault();
        $(el).addClass('droptarget');
      }
    }).on('dragleave', function() {
      $(el).removeClass('droptarget');
    }).on('drop', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(el).removeClass('droptarget');
      const item = There.data.dragItem;
      if (item) {
        onDrop(item);
      }
    });
  },

  /* ------- Quick Bar -------
   * Toggleable strip of slots. Drop an item on a slot to make a shortcut (a COPY,
   * item stays where it was). Click fires the primary action: clothing wears/takes
   * off, a prop does its first interaction (Take Out etc). Per avatar. */

  QUICK_SLOTS: 12,

  quickKey: function() {
    return `dock.quickbar.${There.data.pilotDoid || 0}`;
  },

  loadQuickBar: function() {
    try {
      const raw = JSON.parse(localStorage.getItem(There.quickKey()) || '{}');
      if (Array.isArray(raw.slots)) {
        return raw.slots.slice(0, There.QUICK_SLOTS);
      }
    } catch (error) {
    }
    return [];
  },

  quickSlots: function() {
    if (!There.data.quick) {
      There.data.quick = There.loadQuickBar();
    }
    return There.data.quick;
  },

  saveQuickBar: function() {
    try {
      localStorage.setItem(There.quickKey(), JSON.stringify({ slots: There.quickSlots() }));
    } catch (error) {
    }
  },

  toggleQuickBar: function() {
    const open = $('.quickbar').attr('data-active') == '1';
    There.setQuickBarOpen(!open);
    // remember open/closed per avatar so it survives a reload
    There.prefs().quickOpen = !open;
    There.savePrefs();
  },

  // show/hide the Quick Bar row (toggle + prefs restore)
  setQuickBarOpen: function(show) {
    $('.quickbar').attr('data-active', show ? '1' : '0');
    // light the dock's Quick Bar button while the row is showing
    $('.dock .item[data-id="quickbar"]').attr('data-on', show ? '1' : '');
    if (show) {
      There.renderQuickBar();
    }
  },

  // assign an item to a slot. stores just enough to show and fire it later,
  // whether or not a panel is open
  assignQuickSlot: function(index, item) {
    const shortcut = {
      name: item.name,
      poid: item.poid || null,
      doid: item.doid || null,
      pob: item.pob || null,
      productId: item.productId || null,
      icon: item.icon || null,
      glyph: item.glyph || null,
      // primary verb for inventory items (first listed)
      interactions: item.interactions || null,
      // scenes are slotted by reference so edits carry over
      kind: item.kind || null,
      sceneId: item.sceneId || null,
      // favorite places teleport from the bar
      place: item.place || null,
      suffix: item.suffix || null,
    };
    const slots = There.quickSlots();
    slots[index] = shortcut;
    There.saveQuickBar();
    There.renderQuickBar();
  },

  clearQuickSlot: function(index) {
    const slots = There.quickSlots();
    slots[index] = null;
    There.saveQuickBar();
    There.renderQuickBar();
  },

  renderQuickBar: function() {
    const host = There.data.host || There.variables.there_resourceshost;
    const slots = There.quickSlots();
    const wrap = $('.quickslots');
    $(wrap).empty();
    for (let i = 0; i < There.QUICK_SLOTS; i++) {
      const item = slots[i] || null;
      let slot = $('<div class="qslot"></div>').attr('data-index', i);
      if (item) {
        $(slot).attr('title', `${item.name} (F${i + 1})`);
        let thumb = $('<div class="qthumb"></div>');
        if (item.kind == 'scene') {
          const sc = There.sceneById(item.sceneId);
          $(thumb).html(tmuiIcon('clapperboard'));
          $(slot).attr('title', `Scene: ${sc ? sc.name : item.name} (F${i + 1})`);
          $(slot).append(thumb);
        } else {
        if (item.glyph) { $(thumb).text(item.glyph); } else { $(thumb).html(tmuiIcon('box-open')); }
        $(slot).append(thumb);
        // same photo lookup as the cards
        (function(thumbEl, it) {
          const show = function(url) {
            if (url) { $(thumbEl).css('background-image', `url("${url}")`).text(''); }
          };
          const localIcon = (it.icon && /\.(png|jpg|jpeg|gif)$/i.test(it.icon))
            ? `http://${host}/resources/${it.icon}` : null;
          // slots prefer the local icon, catalog photo only when there isn't one (clothing)
          try {
            if (localIcon) {
              show(localIcon);
            } else if (it.productId) {
              CatalogImages.imageForProduct(it.productId, 'small', function(url) { show(url); });
            } else if (it.poid) {
              CatalogImages.imageForPoid(it.poid, function(url) { show(url); });
            }
          } catch (error) {
          }
        })(thumb, item);
        }
      } else {
        $(slot).attr('data-empty', '1').text('F' + (i + 1));
      }
      (function(index, it) {
        // don't let a slot click start a dock drag
        $(slot).on('mousedown', function(event) {
          event.stopPropagation();
        }).on('click', function(event) {
          event.preventDefault();
          if (it) {
            There.useQuickSlot(index);
          }
        }).on('contextmenu', function(event) {
          event.preventDefault();
          if (it) {
            There.clearQuickSlot(index);
            There.playSound('close menu');
          }
        });
        // drop an item here to assign it
        There.makeDropTarget(slot, function(dropped) {
          There.playSound('close menu');
          There.assignQuickSlot(index, dropped);
        });
      })(i, item);
      $(slot).appendTo($(wrap));
    }
  },

  // Fire a slot's primary action (clothing toggles wear, inventory runs its first verb).
  // Min gap between Quick Bar activations (click or F-key, any slot) so mashing
  // keys can't flood the client/server.
  QUICK_COOLDOWN: 800,

  // Action Mode hides the game UI so item menus read empty and can't be used.
  // Peek: patched FlashProxy holds Ctrl (the game's own "show UI" key) while `work`
  // runs, then lets go (2s failsafe in the DLL). Outside Action Mode it just runs.
  withUiPeek: function(work) {
    if (!(There.data.amLive && There.data.actionMode)) {
      work(function() {});
      return;
    }
    There.fsCommand('tmuiPeek', 'on=1');
    let finished = false;
    const done = function() {
      if (!finished) {
        finished = true;
        There.fsCommand('tmuiPeek', 'on=0');
      }
    };
    // give the game a moment to bring the UI back before reading menus
    setTimeout(function() {
      work(done);
    }, 150);
  },

  useQuickSlot: function(index) {
    if (There.inputBlocked()) {
      return;
    }
    const item = There.quickSlots()[index];
    if (!item) {
      return;
    }
    const now = Date.now();
    if (now - (There.data.quickLast || 0) < There.QUICK_COOLDOWN) {
      return;
    }
    There.data.quickLast = now;
    $('.quickslots').attr('data-cool', '1');
    There.setNamedTimer('quick-cool', There.QUICK_COOLDOWN, function() {
      $('.quickslots').attr('data-cool', '');
    });
    There.playSound('close menu');
    $('.qslot[data-index="' + index + '"]').addClass('qpulse');
    There.setNamedTimer('qpulse' + index, 320, function() {
      $('.qslot[data-index="' + index + '"]').removeClass('qpulse');
    });
    // favorite place: teleport there
    if (item.place && item.suffix) {
      There.teleportToFavorite(item.suffix);
      return;
    }
    // scene: run the whole chain
    if (item.kind == 'scene') {
      There.playScene(item.sceneId);
      return;
    }
    // clothing/outfit: toggle wear via its pob container
    if (item.poid && !item.interactions) {
      There.toggleWear(item);
      return;
    }
    // Inventory: proper equip/unequip toggle. Read the item's LIVE actions from its
    // My Things node and fire the verb that fits (Aim/Take Out/Hold when stowed,
    // Put Away/Put Back when out). NEVER fall back to a random action, that's how a
    // slot ended up opening Trade/Auction. No equip verb = open the action bar.
    if (item.interactions) {
      // Action Mode hides the UI (menus read empty), peek it back while we work
      There.withUiPeek(function(done) {
        There.inventoryMenuPath(item, function(path) {
          if (!path) {
            done();
            return;
          }
          There.menuKids(path, function(names) {
            if (!names || !names.length) {
              done();
              return;
            }
            if (!There.justUsed(item)) {
              There.learnActions(item, names);
            }
            // can be put away = it's out, so put it away. a held gun can list "Aim"
            // next to "Put Away", so put-away has to win
            const pick =
              names.find(n => There.UNEQUIP_VERBS.test(n)) ||
              names.find(n => There.EQUIP_VERBS.test(n));
            if (!pick) {
              done();
              item.menuActions = names;
              There.buildItemMenu(null, item);
              return;
            }
            const isGun = names.some(n => There.RELOAD_VERB.test(n));
            // a gun: remember it for R (reload)
            if (isGun) {
              There.data.heldGun = item.name;
            }
            // putting a gun away from the bar also leaves Action Mode (like Insert).
            // only with FlashProxy's live state and only if still in Action Mode after
            if (isGun && There.UNEQUIP_VERBS.test(pick)) {
              There.setNamedTimer('gun-away-am', 1200, function() {
                if (There.data.amLive && There.data.actionMode) {
                  There.toggleActionMode();
                }
              });
            }
            // its state flips, so the actions we had for it are out of date
            item.actedAt = Date.now();
            item.menuActions = null;
            There.fetch({
              path: '/ScriptHook/Invoke',
              query: { Path: `${path}/${pick}/activate` },
              dataType: 'xml',
              complete: done,
            });
          });
        });
      });
    }
  },

  // The held gun: an item whose live actions have Reload AND a put-away verb.
  // Last gun found is checked first so repeat calls cost one menu read. A gun
  // with Reload but no put-away is the fallback. cb({ name, path, reload }) or cb(null)
  RELOAD_VERB: /^reload/i,

  findHeldGun: function(cb) {
    const inv = There.data.inventory || [];
    let names = inv.filter(it => /reload/i.test(it.interactions || '')).map(it => it.name);
    if (!names.length) {
      names = inv.filter(it => /gun|blaster|launcher|rifle|pistol/i.test(it.name || '')).map(it => it.name);
    }
    if (There.data.heldGun) {
      names.unshift(There.data.heldGun);
    }
    names = [...new Set(names)].slice(0, 12);
    let fallback = null;
    const tryNext = function(i) {
      if (i >= names.length) {
        There.data.heldGun = fallback ? fallback.name : null;
        cb(fallback);
        return;
      }
      There.inventoryMenuPath({ name: names[i] }, function(path) {
        if (!path) {
          tryNext(i + 1);
          return;
        }
        There.menuKids(path, function(kids) {
          const reload = (kids || []).find(n => There.RELOAD_VERB.test(n));
          if (reload && (kids || []).some(n => There.UNEQUIP_VERBS.test(n))) {
            There.data.heldGun = names[i];
            cb({ name: names[i], path: path, reload: reload });
            return;
          }
          if (reload && !fallback) {
            fallback = { name: names[i], path: path, reload: reload };
          }
          tryNext(i + 1);
        });
      });
    };
    tryNext(0);
  },

  // R while mapped: reload the held gun
  reloadGun: function() {
    if (There.inputBlocked()) {
      return;
    }
    const now = Date.now();
    if (now - (There.data.reloadLast || 0) < 600) {
      return;
    }
    There.data.reloadLast = now;
    There.withUiPeek(function(done) {
      There.findHeldGun(function(gun) {
        if (!gun) {
          done();
          return;
        }
        There.playSound('control down');
        There.fetch({
          path: '/ScriptHook/Invoke',
          query: { Path: `${gun.path}/${gun.reload}/activate` },
          dataType: 'xml',
          complete: done,
        });
      });
    });
  },

  // take-out/equip verbs and the stow verbs. they're state-exclusive in the menu
  // (stowed gun shows "Aim", equipped shows "Put Away") so one click always toggles
  EQUIP_VERBS: /^(take (one )?out|aim|hold|wield|wear|ride|drive|board)$/i,
  UNEQUIP_VERBS: /^(put (back|away)( current)?|stow|holster|lower|dismount)$/i,

  /* ------- item action menu ------- */

  itemActions: function(item) {
    let actions = [];
    if (item.place) {
      actions.push({ kind: 'teleport', label: 'Teleport' });
    } else if (item.interactions) {
      if (!There.data.myThingsMap) {
        There.data.myThingsMap = There.loadMyThingsMap();
      }
      if (item.menuActions && item.menuActions.length) {
        // REAL action list from the item's My Things node (richer and state-accurate:
        // Take Out <-> Put Back, Give, Lend...)
        for (const name of item.menuActions) {
          actions.push({ kind: 'verb', label: name, danger: /^return$/i.test(name) });
        }
      } else if (There.data.myThingsMap && There.data.myThingsMap[item.name]) {
        // path cached but live actions not in yet: show the inventory table's
        // "id:Label" pairs as a quick first render
        for (let part of item.interactions.split(',')) {
          const m = part.match(/^\s*(\d+)\s*:\s*(.+?)\s*$/);
          if (m) {
            actions.push({ kind: 'verb', verb: m[1], label: m[2] });
          }
        }
      }
      // no cached path yet = no buttons (they'd just miss). the bar shows a syncing
      // note and buttons appear once refreshInvActions resolves the item
    } else if (item.pob) {
      // outfits/looksets: saved combos under /pilotPobs/<pob>/<poid>/<Method>
      if (item.worn) {
        actions.push({ kind: 'method', method: 'Take off', label: 'Take Off' });
      } else {
        actions.push({ kind: 'method', method: 'Put on', label: 'Put On' });
      }
      actions.push({ kind: 'method', method: 'About', label: 'About' });
      actions.push({ kind: 'method', method: 'Rename', label: 'Rename' });
      actions.push({ kind: 'method', method: 'Delete', label: 'Delete', danger: true });
    } else if (item.poid) {
      // wardrobe items use named method nodes under /pilotPobs/accoutrements/<poid>/<Method>.
      // "Put on"/"Take off" depends on whether it's worn
      if (item.worn) {
        actions.push({ kind: 'method', method: 'Take off', label: 'Take Off' });
      } else {
        actions.push({ kind: 'method', method: 'Put on', label: 'Put On' });
      }
      actions.push({ kind: 'method', method: 'About', label: 'About' });
      actions.push({ kind: 'method', method: 'Give', label: 'Give' });
      actions.push({ kind: 'method', method: 'Trade', label: 'Trade' });
      actions.push({ kind: 'method', method: 'Auction', label: 'Auction' });
      actions.push({ kind: 'method', method: 'Return', label: 'Return', danger: true });
    }
    // folder actions work for items in every panel
    actions.push({ kind: 'folder', label: '📁 Move to…' });
    if (There.folderOf(item)) {
      actions.push({ kind: 'unfile', label: 'Remove from folder' });
    }
    return actions;
  },

  showItemMenu: function(card, item, event) {
    // Open the action bar (short panel under the main one): picture + name +
    // buttons. For wardrobe items the worn state is fetched in the background and
    // the bar rebuilt to flip Put On / Take Off, never wait on it to show.
    There.playSound('close menu');
    // seen this kind of item before: use its remembered actions, no menu read
    // (not right after using one of its actions, its table labels are behind)
    if (item.interactions && !item.menuActions && !There.justUsed(item)) {
      const known = There.knownActions(item);
      if (known) {
        item.menuActions = known;
      }
    }
    There.buildItemMenu(card, item);
    There.refreshWornState(card, item);
    if (item.interactions && !item.menuActions) {
      There.refreshInvActions(card, item, true);
    }
  },

  /* ------- actions remembered per kind of item -------
   * Every drink of the same kind, every hoverboard, every builder kit has the same
   * action list, so once we've read one item's menu we keep that list for the
   * kind and skip the read for the rest. The kind is the item's icon plus the
   * labels the inventory table gives it. The table labels follow the item's
   * state (Take Out vs Put Back), so a board that's out is a different kind from
   * one that's stowed and they never get each other's buttons. */

  actionTypesKey: 'dock.actiontypes',

  actionTypeKey: function(item) {
    if (!item || !item.interactions) {
      return null;
    }
    const labels = item.interactions.split(',').map(p => (p.split(':').slice(1).join(':')).trim()).filter(Boolean);
    if (!labels.length) {
      return null;
    }
    return (item.builder ? 'builder' : (item.icon || '')) + '|' + labels.join(',');
  },

  actionTypes: function() {
    if (!There.data.actionTypes) {
      try {
        const raw = JSON.parse(localStorage.getItem(There.actionTypesKey) || '{}');
        There.data.actionTypes = (raw && typeof raw.types == 'object') ? raw.types : {};
      } catch (error) {
        There.data.actionTypes = {};
      }
    }
    return There.data.actionTypes;
  },

  saveActionTypes: function() {
    try {
      localStorage.setItem(There.actionTypesKey, JSON.stringify({ types: There.actionTypes() }));
    } catch (error) {
    }
  },

  knownActions: function(item) {
    const key = There.actionTypeKey(item);
    const list = key && There.actionTypes()[key];
    return list && list.length ? list.slice() : null;
  },

  // remember a menu read for this kind, but only when it agrees with the table
  // (every table label is in the menu). If it doesn't, the item changed state
  // since the last sync and the read only fits this one item right now
  learnActions: function(item, names) {
    const key = There.actionTypeKey(item);
    if (!key || !names || !names.length) {
      return;
    }
    const have = names.map(n => n.toLowerCase());
    const table = key.slice(key.indexOf('|') + 1).split(',');
    if (!table.every(l => have.includes(l.toLowerCase()))) {
      return;
    }
    const types = There.actionTypes();
    if (String(types[key]) == String(names)) {
      return;
    }
    types[key] = names.slice();
    // keep it small, drop the oldest kinds
    const keys = Object.keys(types);
    if (keys.length > 400) {
      for (const k of keys.slice(0, keys.length - 400)) {
        delete types[k];
      }
    }
    There.saveActionTypes();
  },

  // used one of its actions in the last few minutes: its table labels may still
  // show the old state until the next sync, so read it live instead
  justUsed: function(item) {
    return !!item.actedAt && Date.now() - item.actedAt < 5 * 60 * 1000;
  },

  forgetActions: function(item) {
    const key = There.actionTypeKey(item);
    const types = There.actionTypes();
    if (key && types[key]) {
      delete types[key];
      There.saveActionTypes();
    }
  },

  // wardrobe/outfit: read wearing state and rebuild so Put On / Take Off is right
  refreshWornState: function(card, item) {
    if (!item.poid || item.interactions) {
      return;
    }
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `${There.pobBase(item)}/wearing` },
      dataType: 'xml',
      success: function(xml) {
        try {
          const v = xml.getElementsByTagName('Value')[0];
          item.worn = v && v.childNodes[0] && v.childNodes[0].nodeValue == '1';
        } catch (e) {
          item.worn = false;
        }
        if (There.data.menuOpen && There.data.menuItem === item) {
          There.buildItemMenu(card, item);
        }
      },
    });
  },

  // resolve a background image for an item (same order as grid thumbs) and pass
  // it to `cb`. returns the local icon URL (or null) for an immediate fallback
  resolveItemImage: function(item, cb) {
    const host = There.data.host || There.variables.there_resourceshost;
    const localIcon = (item.icon && /\.(png|jpg|jpeg|gif)$/i.test(item.icon))
      ? `http://${host}/resources/${item.icon}` : null;
    try {
      if (item.productId) {
        CatalogImages.imageForProduct(item.productId, 'medium', function(url) {
          cb(url || localIcon);
        });
        return localIcon;
      }
      if (item.poid && !item.pob) {
        CatalogImages.imageForPoid(item.poid, function(url) {
          cb(url || localIcon);
        });
        return localIcon;
      }
    } catch (error) {
    }
    cb(localIcon);
    return localIcon;
  },

  buildItemMenu: function(card, item, event) {
    There.data.menuItem = item;
    const actions = There.itemActions(item);
    const bar = $('.actionbar');

    // picture + name so it's clear which item you're acting on
    const thumb = $('.actionbar .abthumb');
    $(thumb).css('background-image', '');
    if (item.glyph) {
      $(thumb).text(item.glyph);
    } else {
      $(thumb).html(tmuiIcon(There.data.panel == 'wardrobe' ? 'shirt' : 'box-open'));
    }
    const immediate = There.resolveItemImage(item, function(url) {
      // only apply if the bar still shows this item
      if (There.data.menuItem === item && url) {
        $('.actionbar .abthumb').css('background-image', `url("${url}")`).text('');
      }
    });
    if (immediate) {
      $(thumb).css('background-image', `url("${immediate}")`).text('');
    }
    $('.actionbar .abname').text(item.name);

    const acts = $('.actionbar .abactions');
    $(acts).empty();
    if (actions.length == 0) {
      $('<div class="abnote"></div>').text('No actions').appendTo($(acts));
    } else if (item.interactions && !actions.some(a => a.kind == 'verb')) {
      // action path not cached yet: say so, buttons swap in when the sync resolves it
      $('<div class="abnote"></div>').text('Syncing this item’s actions…').appendTo($(acts));
    }
    for (let action of actions) {
      let el = $('<div class="abbtn"></div>').text(action.label);
      if (action.danger) {
        $(el).attr('data-danger', '1');
      }
      (function(a) {
        $(el).on('click', function(ev) {
          ev.stopPropagation();
          There.invokeItemAction(item, a);
          if (a.kind == 'folder') {
            // "Move to…" opens a chooser in the bar, keep it open
            return;
          }
          if (a.kind == 'method' && a.method != 'Delete') {
            // wear toggles: keep the bar open and rebuild so worn state + labels update
            There.setNamedTimer('menu-rebuild', 900, function() {
              if (There.data.menuOpen && There.data.menuItem === item) {
                item.worn = undefined; // force a fresh worn read
                There.buildItemMenu(card, item);
                There.refreshWornState(card, item);
              }
            });
            return;
          }
          if (a.kind == 'verb') {
            // inventory actions change the menu (Take Out <-> Put Back): keep the bar open
            // and re-read the real actions shortly after
            item.actedAt = Date.now();
            There.setNamedTimer('menu-rebuild', 1100, function() {
              if (There.data.menuOpen && There.data.menuItem === item) {
                item.menuActions = null;
                There.refreshInvActions(card, item);
              }
            });
            return;
          }
          // anything else (Delete) closes the bar
          There.clearItemMenu();
        });
      })(action);
      $(el).appendTo($(acts));
    }

    $(bar).attr('data-active', '1');
    There.data.menuOpen = true;
  },

  // redraw the open panel now, or as soon as the item action bar closes
  renderWhenFree: function() {
    if (There.data.menuOpen) {
      There.data.renderPending = true;
    } else {
      There.renderFolderView();
    }
  },

  clearItemMenu: function() {
    $('.actionbar').attr('data-active', '0').attr('data-mode', '');
    $('.actionbar .abactions').empty();
    $('.actionbar .abthumb').css('background-image', '').text('');
    $('.actionbar .abname').text('');
    const wasOpen = There.data.menuOpen;
    There.data.menuOpen = false;
    There.data.menuItem = null;
    if (wasOpen && There.data.renderPending) {
      There.data.renderPending = false;
      if (There.folderPanelOpen()) {
        There.renderFolderView();
      }
    }
  },

  // swap the action buttons for a folder chooser: a chip per folder (current one
  // highlighted) + "New folder…". picking one moves the item and closes the bar
  showMoveToFolder: function(item) {
    $('.actionbar').attr('data-mode', 'move');
    const acts = $('.actionbar .abactions');
    $(acts).empty();
    const current = There.folderOf(item);
    const done = function() {
      There.clearItemMenu();
      There.renderFolderView();
    };

    // depth-first list of every folder in this scope, indented, so you can move
    // into any nesting level
    const chipFor = function(folder, depth) {
      const prefix = depth > 0 ? (' '.repeat(depth * 2) + '└ ') : '';
      let chip = $('<div class="abbtn"></div>').text(prefix + folder.name);
      if (current && current.id == folder.id) {
        $(chip).attr('data-active', '1');
      }
      (function(fid) {
        $(chip).on('click', function(ev) {
          ev.stopPropagation();
          There.moveToFolder(item, fid);
          done();
        });
      })(folder.id);
      $(chip).appendTo($(acts));
    };
    const walk = function(parentId, depth) {
      for (const f of There.childFolders(parentId)) {
        chipFor(f, depth);
        walk(f.id, depth + 1);
      }
    };

    // "Unfile" if it's currently in a folder
    if (current) {
      let un = $('<div class="abbtn"></div>').text('Unfile');
      $(un).on('click', function(ev) {
        ev.stopPropagation();
        There.moveToFolder(item, null);
        done();
      });
      $(un).appendTo($(acts));
    }

    walk(null, 0);

    // "+ New folder here": make a sub-folder at this level and move the item in
    let add = $('<div class="abbtn" data-accent="1"></div>').text('+ New folder');
    $(add).on('click', function(ev) {
      ev.stopPropagation();
      There.showFolderPrompt('New folder', '', function(name) {
        const folder = There.createFolder(name, There.currentFolderId());
        if (folder) {
          There.moveToFolder(item, folder.id);
        }
        done();
      });
    });
    $(add).appendTo($(acts));
  },

  // small inline text prompt over the panel. onConfirm(name, action) on OK; with
  // `withDelete` a Delete button calls onConfirm('', 'delete').
  // prompt element belongs to whichever panel is open (grid and music have their own)
  promptHost: function() {
    if (There.data.panel == 'music') {
      return $('.musicprompt');
    }
    if (There.data.panel == 'emotes') {
      return $('.emoteprompt');
    }
    if (There.data.panel == 'scenes') {
      return $('.scenesprompt');
    }
    return $('.panel .folderprompt');
  },

  showFolderPrompt: function(title, value, onConfirm, withDelete) {
    const host = There.promptHost();
    $(host).empty();
    $('<div class="fptitle"></div>').text(title).appendTo($(host));
    const input = $('<input type="text" class="fpinput" spellcheck="false">').val(value || '');
    $(input).appendTo($(host));
    const row = $('<div class="fprow"></div>').appendTo($(host));
    const confirm = function() {
      const name = $(input).val();
      There.hideFolderPrompt();
      onConfirm(name, 'ok');
    };
    if (withDelete) {
      $('<div class="fpbtn" data-danger="1"></div>').text('Delete').on('click', function() {
        There.hideFolderPrompt();
        onConfirm('', 'delete');
      }).appendTo($(row));
    }
    $('<div class="fpbtn"></div>').text('Cancel').on('click', function() {
      There.hideFolderPrompt();
    }).appendTo($(row));
    $('<div class="fpbtn" data-accent="1"></div>').text('OK').on('click', confirm).appendTo($(row));
    $(host).attr('data-active', '1');
    $(input).on('keydown', function(event) {
      event.stopPropagation();
      if (event.key == 'Enter') {
        confirm();
      } else if (event.key == 'Escape') {
        There.hideFolderPrompt();
      }
    }).on('mousedown', function(event) {
      event.stopPropagation();
    });
    There.fsCommand('getKeyboardFocus');
    setTimeout(function() { $(input).focus(); }, 0);
  },

  hideFolderPrompt: function() {
    $('.folderprompt').attr('data-active', '0').empty();
    $('.musicprompt').attr('data-active', '0').empty();
  },

  // pilotPobs container a wardrobe/outfit item lives in
  pobBase: function(item) {
    return `/pilotPobs/${item.pob || 'accoutrements'}/${item.poid}`;
  },

  // wardrobe/outfit left-click: read wearing, call the opposite method
  toggleWear: function(item) {
    There.playSound('close menu');
    const base = There.pobBase(item);
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `${base}/wearing` },
      dataType: 'xml',
      success: function(xml) {
        let worn = false;
        try {
          const v = xml.getElementsByTagName('Value')[0];
          worn = v && v.childNodes[0] && v.childNodes[0].nodeValue == '1';
        } catch (e) {
        }
        There.fetch({
          path: '/ScriptHook/Invoke',
          query: { Path: `${base}/${worn ? 'Take off' : 'Put on'}` },
          dataType: 'xml',
        });
      },
    });
  },

  // optional per-panel auto-close after an action (Settings > Controls)
  maybeAutoClose: function() {
    const p = There.prefs();
    if ((There.data.panel == 'inventory' && p.closeInv) ||
        (There.data.panel == 'wardrobe' && p.closeWard) ||
        (There.data.panel == 'emotes' && p.closeEmotes)) {
      There.closePanel();
    }
  },

  invokeItemAction: function(item, action) {
    There.playSound('close menu');
    if (action.kind == 'teleport') {
      There.teleportToFavorite(item.suffix);
      return;
    }
    if (action.kind == 'folder') {
      There.showMoveToFolder(item);
      return;
    }
    if (action.kind == 'unfile') {
      There.moveToFolder(item, null);
      There.renderFolderView();
      return;
    }
    if (action.kind == 'method') {
      // call the method node directly on the item's pob container
      There.fetch({
        path: '/ScriptHook/Invoke',
        query: { Path: `${There.pobBase(item)}/${action.method}` },
        dataType: 'xml',
      });
      // Rename/Delete change the list, so reload the wardrobe. Put on / Take off only
      // change worn state and the bar rebuild handles that without wiping the grid
      if (['Rename', 'Delete'].includes(action.method)) {
        There.setNamedTimer('wardrobe-refresh', 1200, function() {
          if (item.pob) {
            if (There.data.pobCache) {
              delete There.data.pobCache[item.pob];
            }
          } else {
            There.data.accoutrements = null;
          }
          if (There.data.panel == 'wardrobe') {
            There.loadWardrobe(There.data.wardrobeTab);
          }
        });
      }
      There.maybeAutoClose();
      return;
    }
    // Inventory: go through the item's node in the native My Things menu tree
    // (ScriptHook exposes all of it):
    //   /mainMenu/My Things/<folders...>/<Item Name>/<Action>/activate
    // Same native path the Organizer uses (InventoryManagerPossession::executeNthInteraction), checked in the logs.
    There.invokeInventoryMenuAction(item, action.label);
    There.maybeAutoClose();
  },

  /* ------- inventory actions via the My Things menu tree -------
   * We know items by name/doid, but their nodes are nested in the user's folders
   * under /mainMenu/My Things. Walk the tree once (read-only) for a name -> path
   * map, cached until a lookup misses. A container whose name matches an
   * inventory item is an item (record, don't recurse), anything else is a folder. */

  MY_THINGS: '/mainMenu/My Things',

  // child names of a menu node, minus the standard menu leaves
  menuKids: function(path, cb) {
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: path },
      dataType: 'xml',
      success: function(xml) {
        let names = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const n = child.getElementsByTagName('Name')[0]?.childNodes[0]?.nodeValue;
            if (n && !['grayedOut', 'marked', 'statusText', 'activate'].includes(n)) {
              names.push(n);
            }
          }
        } catch (error) {
        }
        cb(names);
      },
      error: function() {
        cb(null);
      },
    });
  },

  // names that mean "this is an item's action list", never descend into these
  MENU_ACTIONISH: /^(About|Take (One )?Out|Put (Back|Away)( Current)?|Give|Lend|Trade|Auction|Return|Hold|Drop( Current)?|Pick Up|Use|Wear|Preview\b.*|Add \d+ days?\b.*)$/i,

  // Walk My Things, mapping every inventory item name (plus `extraName` for Quick
  // Bar lookups when inventory isn't loaded) to its menu path. Strictly sequential
  // and paced: the embedded server is single threaded and each browse pokes the
  // native Organizer, so a burst glitches the client and starves the cockpit check.
  buildMyThingsMap: function(done, extraName) {
    // concurrent callers share one walk
    if (There.data.mapWaiters) {
      There.data.mapWaiters.push(done);
      return;
    }
    There.data.mapWaiters = [done];
    There.setSyncNote('Mapping item actions… (menus may flicker)');

    const wanted = {};
    for (const it of (There.data.inventory || [])) {
      wanted[it.name] = true;
    }
    if (extraName) {
      wanted[extraName] = true;
    }
    const skip = { 'ChangeMe': 1, 'Organize...': 1, 'Therebucks': 1 };
    const pilot = There.variables.there_pilotname;
    const map = {};
    const queue = [{ path: There.MY_THINGS, depth: 0 }];

    const finish = function() {
      // merge over the cached map (a walk during a partial inventory list mustn't
      // clobber good entries), then prune items that are gone
      const merged = Object.assign({}, There.data.myThingsMap || There.loadMyThingsMap() || {}, map);
      if ((There.data.inventory || []).length) {
        const names = {};
        for (const it of There.data.inventory) {
          names[it.name] = true;
        }
        if (extraName) {
          names[extraName] = true;
        }
        for (const k in merged) {
          if (!names[k]) {
            delete merged[k];
          }
        }
      }
      There.data.myThingsMap = merged;
      There.data.myThingsBuilt = Date.now();
      There.saveMyThingsMap();
      There.setSyncNote('');
      const waiters = There.data.mapWaiters || [];
      There.data.mapWaiters = null;
      for (const w of waiters) {
        try { w(merged); } catch (e) {}
      }
    };

    const step = function() {
      const next = queue.shift();
      if (!next) {
        finish();
        return;
      }
      There.menuKids(next.path, function(names) {
        if (names && names.length) {
          // children look like an action list: it's an item we didn't match by name.
          // record nothing, don't descend
          const actionish = names.filter(n => There.MENU_ACTIONISH.test(n)).length;
          const isItemNode = next.depth > 0 && actionish > 0 && actionish >= names.length / 2;
          if (!isItemNode) {
            for (const n of names) {
              if (skip[n] || n === pilot) {
                continue;
              }
              const p = `${next.path}/${n}`;
              if (wanted[n]) {
                map[n] = p;
              } else if (next.depth < 6) {
                queue.push({ path: p, depth: next.depth + 1 });
              }
            }
          }
        }
        // pace it so the server keeps up with everything else
        There.setNamedTimer('mythings-walk', 40, step);
      });
    };
    step();
  },

  /* Map is saved per avatar so startup needs no menu walking (every menu node touch
   * makes the engine sync native menu widgets = visible artifacting). Only walk on
   * the very first run, or lazily when an unknown/stale item gets used. */

  myThingsKey: function() {
    return `dock.mythings.${There.data.pilotDoid || 0}`;
  },

  loadMyThingsMap: function() {
    try {
      const raw = JSON.parse(localStorage.getItem(There.myThingsKey()) || '{}');
      if (raw && typeof raw.map == 'object') {
        return raw.map;
      }
    } catch (error) {
    }
    return null;
  },

  saveMyThingsMap: function() {
    try {
      localStorage.setItem(There.myThingsKey(), JSON.stringify({
        map: There.data.myThingsMap || {},
      }));
    } catch (error) {
    }
  },

  // menu path for an item by name: memory map, then saved map, then one coalesced
  // walk (cooldown-guarded) as a last resort
  inventoryMenuPath: function(item, cb) {
    if (!There.data.myThingsMap) {
      There.data.myThingsMap = There.loadMyThingsMap();
    }
    const map = There.data.myThingsMap;
    if (map && map[item.name]) {
      cb(map[item.name]);
      return;
    }
    const now = Date.now();
    if (now - (There.data.myThingsBuilt || 0) < 5000) {
      cb(null);
      return;
    }
    There.buildMyThingsMap(function(m) {
      cb(m[item.name] || null);
    }, item.name);
  },

  // run one action on an inventory item via its menu node. stale path (item moved
  // folders / left and came back) heals itself: drop it, re-walk once, retry once
  invokeInventoryMenuAction: function(item, label, retried) {
    There.inventoryMenuPath(item, function(path) {
      if (!path) {
        // About fallback when the item isn't in the menu tree
        if (/^about$/i.test(label)) {
          const webapps = There.variables.there_webapps || 'webapps.prod.there.com';
          There.openUrl(`https://${webapps}/about/about?doid=${item.doid || item.poid}`);
        }
        return;
      }
      There.fetch({
        path: '/ScriptHook/Invoke',
        query: { Path: `${path}/${label}/activate` },
        dataType: 'xml',
        success: function(xml) {
          let ok = false;
          try {
            const r = xml.getElementsByTagName('Result')[0];
            ok = r && r.childNodes[0] && r.childNodes[0].nodeValue == '1';
          } catch (e) {
          }
          if (!ok && !retried) {
            if (There.data.myThingsMap) {
              delete There.data.myThingsMap[item.name];
              There.saveMyThingsMap();
            }
            There.data.myThingsBuilt = 0;
            There.invokeInventoryMenuAction(item, label, true);
          } else if (!ok) {
            // still no luck: the remembered list for this kind may be wrong for it,
            // forget it and read this item's own menu
            There.forgetActions(item);
            item.menuActions = null;
            if (There.data.menuOpen && There.data.menuItem === item) {
              There.refreshInvActions(null, item);
            }
          }
        },
      });
    });
  },

  // fetch an item's REAL action list from its menu node (more than the inventory
  // table has: Give, Lend, Trade, Auction...) and rebuild the bar once known
  // learn = this read can teach the item's kind (not after we just used an
  // action: the table hasn't caught up with the new state yet)
  refreshInvActions: function(card, item, learn) {
    There.inventoryMenuPath(item, function(path) {
      if (!path) {
        return;
      }
      There.menuKids(path, function(names) {
        if (names && names.length) {
          if (learn) {
            There.learnActions(item, names);
          }
          item.menuActions = names;
          if (There.data.menuOpen && There.data.menuItem === item) {
            There.buildItemMenu(card, item);
          }
        }
      });
    });
  },

  // fetch + parse the inventory table into There.data.inventory. done(changed, failed):
  // changed = the item SET differs (doid+name, not status, so countdowns don't
  // churn the action map)
  fetchInventoryData: function(done) {
    $.ajax({
      url: `http://${There.data.host || There.variables.there_resourceshost}/inventoryManager/displayInventoryTable`,
      dataType: 'html',
      timeout: 8000,
      success: function(html) {
        const table = There.parseInventoryTable(html);
        // builder items aren't in the inventory table, add them from their own list
        There.fetchBuilderItems(function(builder) {
          const items = table.concat(builder).sort((a, b) => a.name.localeCompare(b.name));
          const sig = items.map(i => `${i.doid}:${i.name}`).join('|');
          const changed = sig !== There.data.invSig;
          There.data.invSig = sig;
          There.data.inventory = items;
          if (changed) {
            There.prefetchPhotos();
          }
          done(changed, false);
        });
      },
      error: function() {
        done(false, true);
      },
    });
  },

  // Builder items (add-on kits: rugs, ramps, signs...) live under
  // /pilotPobs/extensions with just a name and status, and the inventory table
  // leaves them out. Their actions (Take One Out, Give, Trade...) sit in the My
  // Things menu like any other item, so they work through the same menu path.
  // Names are cached by oid so a sync only looks up new ones.
  BUILDER_ACTIONS: '1:Take One Out,2:Give,3:Trade,4:Auction,5:Return,6:About',

  fetchBuilderItems: function(cb) {
    const cache = There.data.builderNames = There.data.builderNames || {};
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/pilotPobs/extensions' },
      dataType: 'xml',
      success: function(xml) {
        const oids = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const oid = child.getElementsByTagName('Name')[0]?.childNodes[0]?.nodeValue;
            if (oid && /^\d+$/.test(oid)) {
              oids.push(oid);
            }
          }
        } catch (error) {
        }
        const missing = oids.filter(o => cache[o] === undefined);
        const photos = There.itemPhotos();
        const finish = function() {
          cb(oids.filter(o => cache[o]).map(o => ({
            doid: o,
            name: cache[o],
            // set once "Cache all photos" has read this item's About page
            productId: photos[o] ? photos[o].productId : '',
            status: 'Builder',
            interactions: There.BUILDER_ACTIONS,
            icon: '',
            glyph: '🧱',
            builder: true,
          })));
        };
        // a couple at a time, the local server is single threaded
        let next = 0;
        let running = 0;
        const pump = function() {
          if (next >= missing.length && running == 0) {
            finish();
            return;
          }
          while (running < 2 && next < missing.length) {
            const oid = missing[next++];
            running++;
            There.fetch({
              path: '/ScriptHook/Get',
              query: { Path: `/pilotPobs/extensions/${oid}/name` },
              dataType: 'xml',
              success: function(x) {
                cache[oid] = x.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue || '';
              },
              complete: function() {
                running--;
                pump();
              },
            });
          }
        };
        pump();
      },
      error: function() {
        cb([]);
      },
    });
  },

  // Inventory item photos read off About pages by the photo sweep (builder items,
  // and anything the catalog list doesn't cover): doid -> { productId, image },
  // saved per avatar. The image is registered with CatalogImages under the real
  // product id so every card / slot / action bar finds it.
  itemPhotosKey: function() {
    return `dock.itemphotos.${There.data.pilotDoid || 0}`;
  },

  itemPhotos: function() {
    if (!There.data.itemPhotos) {
      try {
        There.data.itemPhotos = JSON.parse(localStorage.getItem(There.itemPhotosKey()) || '{}') || {};
      } catch (error) {
        There.data.itemPhotos = {};
      }
      for (const oid in There.data.itemPhotos) {
        There.registerItemPhoto(There.data.itemPhotos[oid]);
      }
    }
    return There.data.itemPhotos;
  },

  registerItemPhoto: function(p) {
    if (p && p.productId && p.image && !CatalogImages.map[p.productId]) {
      CatalogImages.map[p.productId] = { small: p.image, medium: p.image, large: p.image };
    }
  },

  // no catalog photo yet (a small game icon doesn't count, we want the real photo)
  itemNeedsPhoto: function(it) {
    if ((it.productId && CatalogImages.map[it.productId]) || There.itemPhotos()[it.doid]) {
      return false;
    }
    return true;
  },

  saveItemPhoto: function(oid, info) {
    const photos = There.itemPhotos();
    photos[oid] = { productId: info.productId, image: info.image };
    There.registerItemPhoto(photos[oid]);
    try {
      localStorage.setItem(There.itemPhotosKey(), JSON.stringify(photos));
    } catch (error) {
    }
    const it = (There.data.inventory || []).find(i => String(i.doid) === String(oid));
    if (it && !it.productId) {
      it.productId = info.productId;
    }
  },

  loadInventory: function() {
    $('.grid').empty();
    $('<div class="empty"></div>').text('Loading…').appendTo($('.grid'));
    There.fetchInventoryData(function(changed, failed) {
      if (There.data.panel != 'inventory') {
        return;
      }
      if (failed && !There.data.inventory) {
        $('.grid').empty();
        $('<div class="empty"></div>').text('Could not load inventory.').appendTo($('.grid'));
        return;
      }
      There.renderFolderView();
    });
  },

  /* ------- live sync (startup + periodic incremental) -------
   * Order matters: inventory table and My Things map first (both cheap), heavy
   * clothing preload after. Otherwise ~1300 clothing requests hog the browser's 6
   * connections to the local server and the first slot click waits ~30s for its walk.
   * After that, a light pass every 45s catches purchases/trades/gifts: one
   * inventory request plus a clothing diff that only fetches NEW items. */

  SYNC_INTERVAL: 45000,

  startupSync: function() {
    if (There.data.syncStarted || !There.data.cockpitUp) {
      return;
    }
    There.data.syncStarted = true;
    There.setSyncNote('Syncing inventory…');
    There.settleInventory(function() {
      const clothing = function() {
        There.setSyncNote('Loading clothing…');
        const after = function() {
          There.setSyncNote('');
          There.updateSyncStatus();
          There.scheduleSync();
        };
        if (!There.data.accoutrements && !There.data.loadingAcc) {
          There.loadAccoutrements(after, function(done, total) {
            There.setSyncNote(`Loading clothing… ${done}/${total}`);
          });
        } else {
          after();
        }
      };
      // action map is saved per avatar, so with a cache startup does ZERO menu walking
      // (menu touches flicker native widgets). only a first-ever run walks
      if (!There.data.myThingsMap) {
        There.data.myThingsMap = There.loadMyThingsMap();
      }
      // hold the big clothing load back a bit. hundreds of requests at login
      // starve the client's local server and other windows' chat feeds (e.g. the
      // Command Bar's /commands) can hang for the whole session. opening the
      // wardrobe still loads it straight away
      const later = function() {
        There.setSyncNote('');
        There.setNamedTimer('clothing-preload', 20000, clothing);
      };
      if (There.data.myThingsMap && Object.keys(There.data.myThingsMap).length) {
        later();
      } else {
        There.setSyncNote('Mapping item actions (first run)…');
        There.buildMyThingsMap(later);
      }
    });
  },

  scheduleSync: function() {
    There.data.syncLast = Date.now();
    There.setNamedTimer('periodic-sync', There.SYNC_INTERVAL, There.incrementalSync);
    // watchdog: if nothing reschedules us for 3 minutes the chain died, start again
    There.setNamedTimer('sync-watchdog', 3 * 60 * 1000, function() {
      if (Date.now() - (There.data.syncLast || 0) >= 3 * 60 * 1000) {
        There.data.syncRunning = false; // a sync that never finished doesn't count
        There.incrementalSync();
      }
    });
  },

  // Right after login the client is still filling the inventory, so the first read
  // can come back short. Re-read every few seconds until the count holds still for
  // two reads in a row (give up after a minute), updating an open panel as it fills.
  settleInventory: function(done) {
    const started = Date.now();
    let lastCount = -1;
    let stable = 0;
    const read = function() {
      There.fetchInventoryData(function(changed) {
        const count = (There.data.inventory || []).length;
        stable = count > 0 && count == lastCount ? stable + 1 : 0;
        lastCount = count;
        if (changed && There.data.panel == 'inventory' && !There.data.menuOpen) {
          There.renderFolderView();
        }
        if (stable >= 2 || Date.now() - started > 60000) {
          done();
          return;
        }
        There.setSyncNote(`Syncing inventory… ${count} items`);
        There.setNamedTimer('inventory-settle', 4000, read);
      });
    };
    read();
  },

  incrementalSync: function(manual) {
    // one at a time: a nudge while a sync is running is covered by that sync
    if (There.data.syncRunning) {
      return;
    }
    // back off while the service is down or heavy work is running
    if (!There.data.cockpitUp || There.data.sweep || There.data.mapWaiters || There.data.loadingAcc) {
      There.scheduleSync();
      return;
    }
    There.data.syncRunning = true;
    if (manual) {
      There.setSyncNote('Syncing…');
    }
    There.fetchInventoryData(function(invChanged) {
      if (invChanged) {
        // item set changed (bought/traded/taken out). DON'T re-walk the menu, that's
        // what artifacts the screen. just prune departed items, new ones resolve on first use
        if (There.data.myThingsMap) {
          const names = {};
          for (const it of (There.data.inventory || [])) {
            names[it.name] = true;
          }
          for (const k in There.data.myThingsMap) {
            if (!names[k]) {
              delete There.data.myThingsMap[k];
            }
          }
          There.saveMyThingsMap();
        }
        if (There.data.panel == 'inventory') {
          There.renderWhenFree();
        }
      }
      There.syncAccoutrements(function(clothChanged) {
        if (clothChanged && There.data.panel == 'wardrobe') {
          There.renderWhenFree();
        }
        if (manual) {
          There.setSyncNote('');
        }
        There.data.syncRunning = false;
        There.updateSyncStatus();
        There.scheduleSync();
      });
    });
  },

  // diff the clothing child list against ours: fetch new poids, drop vanished. done(changed)
  syncAccoutrements: function(done) {
    if (!There.data.accoutrements) {
      done(false);
      return;
    }
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/pilotPobs/accoutrements' },
      dataType: 'xml',
      success: function(xml) {
        let oids = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const oid = child.getElementsByTagName('Name')[0]?.childNodes[0]?.nodeValue;
            if (oid && /^\d+$/.test(oid)) {
              oids.push(oid);
            }
          }
        } catch (error) {
        }
        const have = {};
        for (const a of There.data.accoutrements) {
          have[a.poid] = true;
        }
        const curr = {};
        for (const o of oids) {
          curr[o] = true;
        }
        const added = oids.filter(o => !have[o]);
        const removedAny = There.data.accoutrements.some(a => !curr[a.poid]);
        if (!added.length && !removedAny) {
          done(false);
          return;
        }
        if (removedAny) {
          There.data.accoutrements = There.data.accoutrements.filter(a => curr[a.poid]);
        }
        if (!added.length) {
          done(true);
          return;
        }
        There.fetchAccDetailsFor(added, function(newItems) {
          There.data.accoutrements = There.data.accoutrements
            .concat(newItems)
            .sort((a, b) => a.name.localeCompare(b.name));
          done(true);
        });
      },
      error: function() {
        done(false);
      },
    });
  },

  // fetch name+type one by one for a SMALL set of new poids
  fetchAccDetailsFor: function(oids, cb) {
    const out = [];
    const leaf = function(oid, field, c) {
      There.fetch({
        path: '/ScriptHook/Get',
        query: { Path: `/pilotPobs/accoutrements/${oid}/${field}` },
        dataType: 'xml',
        success: function(x) {
          c(x.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue || '');
        },
        error: function() {
          c('');
        },
      });
    };
    const next = function(i) {
      if (i >= oids.length) {
        cb(out);
        return;
      }
      leaf(oids[i], 'name', function(nm) {
        leaf(oids[i], 'type', function(tp) {
          if (nm) {
            out.push({ poid: oids[i], name: nm, type: tp, status: '' });
          }
          next(i + 1);
        });
      });
    };
    next(0);
  },

  // drives the Settings status line and the slim progress strip on the dock, so
  // when a sync (and maybe menu flicker) is running you can see why
  setSyncNote: function(text) {
    $('.syncstatus').attr('data-busy', text ? '1' : '');
    if (text) {
      $('.syncstatus').text(text);
    }
    $('.syncbar').attr('data-active', text ? '1' : '0');
    $('.syncbar .sbtext').text(text || '');
  },

  updateSyncStatus: function() {
    const inv = (There.data.inventory || []).length;
    const acc = (There.data.accoutrements || []).length;
    const map = Object.keys(There.data.myThingsMap || {}).length;
    const t = new Date();
    const hh = String(t.getHours()).padStart(2, '0');
    const mm = String(t.getMinutes()).padStart(2, '0');
    const chatWay = There.data.chatRelayAt ? ' · chat via Command Bar' : (There.data.chatPollOn ? ' · chat direct' : '');
    const pinned = There.data.shapeOn ? ' · window pinned' : '';
    const spd = There.data.speedoNote ? ` · speedo: ${There.data.speedoNote}` : '';
    const lp = There.data.lastPause;
    const wp = There.data.worstPause;
    const pause = lp ? ` · last pause ${lp.ms}ms (${lp.what}), worst ${wp.ms}ms (${wp.what})` : ' · no pauses';
    $('.syncstatus').text(`${inv} items · ${acc} clothing · ${map} action paths · updated ${hh}:${mm}${chatWay}${pinned}${spd}${pause}`);
  },

  /* ------- unified folder view (inventory + wardrobe categories) -------
   * Each level shows its sub-folders as cards, then the items filed right there.
   * Tab row has a breadcrumb (All > Folder > Sub...) and "+ Folder" to make one here. */

  // base items for the current category before folder filtering
  // (inventory = all possessions, wardrobe = this category)
  currentItems: function() {
    if (There.data.panel == 'inventory') {
      return There.data.inventory || [];
    }
    if (There.data.panel == 'places') {
      return There.data.places || [];
    }
    if (There.data.panel == 'wardrobe') {
      const tab = There.wardrobeTabs.find(t => t.id == There.data.wardrobeTab) || There.wardrobeTabs[0];
      // outfits/looksets have their own pob cache, the rest filter accoutrements
      if (tab.pob) {
        return (There.data.pobCache && There.data.pobCache[tab.pob]) || [];
      }
      return There.filterWardrobe(tab);
    }
    return [];
  },

  // items filed at this level (unfiled ones when at the scope root)
  itemsAtCurrentLevel: function() {
    const all = There.currentItems();
    const cur = There.currentFolderId();
    const search = (There.data.search || '').trim().toLowerCase();
    let items = all.filter(function(it) {
      const f = There.folderOf(it);
      return (f ? f.id : null) == cur;
    });
    if (search) {
      // searching looks across the whole scope, not just this level
      items = all.filter(it => it.name.toLowerCase().includes(search));
    }
    return items;
  },

  // breadcrumb row (.foldertabs, under the category tabs). root is "All"; in the
  // wardrobe that just means this category's top level
  renderFolderTabs: function() {
    const scope = There.currentScope();
    const crumbs = There.folderBreadcrumb(scope);
    let tabs = $('.foldertabs');
    $(tabs).empty();

    const makeCrumb = function(name, folderId, isLast) {
      let el = $('<div class="tab"></div>').append($('<span></span>').text(name));
      if (isLast) {
        $(el).attr('data-active', '1');
      }
      $(el).on('click', function() {
        There.playSound('control down');
        There.gotoFolder(folderId);
        There.data.search = '';
        $('.panelsearch input').val('');
        There.renderFolderView();
      });
      // drop on a crumb to move the item there ("All" = unfile)
      There.makeDropTarget(el, function(item) {
        There.playSound('close menu');
        There.moveToFolder(item, folderId);
        There.renderFolderView();
      });
      $(el).appendTo($(tabs));
    };
    makeCrumb('All', null, crumbs.length == 0);
    crumbs.forEach(function(f, i) {
      $('<div class="crumbsep">›</div>').appendTo($(tabs));
      makeCrumb(f.name, f.id, i == crumbs.length - 1);
    });

    // "+ Folder" makes a sub-folder at this level
    let add = $('<div class="tab tabadd" title="New folder here"></div>').text('+ Folder');
    $(add).on('click', function() {
      There.showFolderPrompt('New folder', '', function(name) {
        There.createFolder(name, There.currentFolderId());
        There.renderFolderView();
      });
    });
    $(add).appendTo($(tabs));
  },

  // tabs + grid (folders, then items) for the current level
  renderFolderView: function() {
    // the DNA tab owns the grid while it is open, card renders would stomp it
    if (There.data.panel == 'wardrobe' && There.data.wardrobeTab == 'dna') {
      return;
    }
    // so does the Places map
    if (There.data.panel == 'places' && There.data.placesTab == 'map') {
      return;
    }
    There.renderFolderTabs();
    There.renderCards(There.itemsAtCurrentLevel());
  },

  /* ------- panel view prefs (card scale + tile/list, per avatar) ------- */

  prefsKey: function() {
    return `dock.viewprefs.${There.data.pilotDoid || 0}`;
  },

  loadPrefs: function() {
    let prefs = { scale: 60, view: 'tile', quickOpen: false, quickEquip: true, dock: {}, compact: true, showCompass: true, showTbux: true, keymap: true, gifs: true };
    try {
      const raw = JSON.parse(localStorage.getItem(There.prefsKey()) || '{}');
      if (raw.scale >= 48 && raw.scale <= 132) {
        prefs.scale = raw.scale;
      }
      if (raw.view == 'tile' || raw.view == 'list') {
        prefs.view = raw.view;
      }
      prefs.quickOpen = raw.quickOpen === true;
      // default on, only false if saved false
      prefs.quickEquip = raw.quickEquip !== false;
      // only an explicit `false` hides a button, so new buttons from updates show up
      if (raw.dock && typeof raw.dock == 'object') {
        prefs.dock = raw.dock;
      }
      if (raw.theme && raw.theme.accent) {
        prefs.theme = { accent: raw.theme.accent, bright: raw.theme.bright || raw.theme.accent };
      }
      prefs.party = raw.party === true;
      // compact is the default, only explicit `false` turns it off
      prefs.compact = raw.compact !== false;
      // compass + Tbux on by default, `false` hides
      prefs.showCompass = raw.showCompass !== false;
      prefs.showTbux = raw.showTbux !== false;
      // WASD + Space in Action Mode: default on
      prefs.keymap = raw.keymap !== false;
      // other people's GIFs: default on
      prefs.gifs = raw.gifs !== false;
      // speedometer while driving: default on
      prefs.speedo = raw.speedo !== false;
      // the GPS screen beside it: default on
      prefs.gps = raw.gps !== false;
      // ...but folded to a button until opened
      prefs.gpsOpen = raw.gpsOpen === true;
      // card size and view in the Shop and Auctions grids
      prefs.shopScale = (raw.shopScale >= 110 && raw.shopScale <= 230) ? raw.shopScale : 150;
      prefs.shopView = raw.shopView == 'list' ? 'list' : 'tile';
      // close a panel right after using it: off unless asked for
      prefs.closeInv = raw.closeInv === true;
      prefs.closeWard = raw.closeWard === true;
      prefs.closeEmotes = raw.closeEmotes === true;
      // the saved button order (Settings > Dock buttons)
      if (Array.isArray(raw.dockOrder)) {
        prefs.dockOrder = raw.dockOrder.filter(id => typeof id == 'string');
      }
    } catch (error) {
    }
    return prefs;
  },

  prefs: function() {
    if (!There.data.viewPrefs) {
      There.data.viewPrefs = There.loadPrefs();
    }
    return There.data.viewPrefs;
  },

  savePrefs: function() {
    try {
      localStorage.setItem(There.prefsKey(), JSON.stringify(There.prefs()));
    } catch (error) {
    }
  },

  // push prefs into the DOM (--card, view mode, slider, active view button)
  applyViewPrefs: function() {
    const p = There.prefs();
    $('.grid').css('--card', p.scale + 'px');
    $('.panel').attr('data-view', p.view);
    $('.scaleslider').val(p.scale);
    $('.viewtoggle .vbtn').attr('data-active', '0');
    $('.viewtoggle .vbtn[data-view="' + p.view + '"]').attr('data-active', '1');
    $('.quickequip .qeswitch').attr('data-on', p.quickEquip ? '1' : '0');
    There.applyDockPrefs();
    There.applyTheme();
    There.ensureChatPoll();
  },

  applyTheme: function() {
    const t = There.prefs().theme;
    // re-setting the same colours restyles every element in the dock (hidden
    // panels too) on each panel open: skip when nothing changed
    const sig = JSON.stringify(t || null);
    if (sig === There.data.themeSig) {
      return;
    }
    There.data.themeSig = sig;
    const root = document.documentElement;
    // blend the accent into a dark base color, "r, g, b" out
    const mix = function(base, frac, hex) {
      const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
      if (!m) {
        return null;
      }
      const n = parseInt(m[1], 16);
      const a = [n >> 16 & 255, n >> 8 & 255, n & 255];
      return base.map((b, i) => Math.round(b * (1 - frac) + a[i] * frac)).join(', ');
    };
    if (t && t.accent) {
      root.style.setProperty('--accent', t.accent);
      root.style.setProperty('--accent-bright', t.bright || t.accent);
      // the WebView here is too old for color-mix(), glows and tints use this
      const am = /^#?([0-9a-f]{6})$/i.exec(t.accent);
      if (am) {
        const an = parseInt(am[1], 16);
        root.style.setProperty('--accent-rgb', `${an >> 16 & 255}, ${an >> 8 & 255}, ${an & 255}`);
      }
      // full theme: pull the dark surfaces toward the accent too, so the pill,
      // panels, menus and tooltips all match instead of staying plain slate
      const tint = mix([17, 21, 28], 0.16, t.accent);
      if (tint) {
        root.style.setProperty('--tint', tint);
        root.style.setProperty('--tint-deep', mix([12, 16, 22], 0.13, t.accent));
        root.style.setProperty('--tint-raised', mix([28, 35, 45], 0.18, t.accent));
      }
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-bright');
      root.style.removeProperty('--accent-rgb');
      root.style.removeProperty('--tint');
      root.style.removeProperty('--tint-deep');
      root.style.removeProperty('--tint-raised');
    }
    // publish for the communicator and message bar, they follow along live
    try {
      localStorage.setItem('tmui-theme', JSON.stringify(
        t && t.accent ? { accent: t.accent, bright: t.bright || t.accent } : null));
    } catch (error) {
    }
  },

  renderThemeSwatches: function() {
    const host = $('.themeswatches');
    $(host).empty();
    const cur = (There.prefs().theme || { accent: '#38bdf8' }).accent.toLowerCase();
    for (const th of There.THEMES) {
      (function(t) {
        let sw = $('<div class="swatch"></div>')
          .attr('title', t.name)
          .css('background-color', t.accent)
          .attr('data-active', t.accent.toLowerCase() == cur ? '1' : '0');
        $(sw).on('click', function() {
          There.prefs().theme = { accent: t.accent, bright: t.bright };
          There.savePrefs();
          There.applyTheme();
          There.renderThemeSwatches();
          There.playSound('control down');
        });
        $(sw).appendTo($(host));
      })(th);
    }
  },

  // the buttons in their saved order. ids that are gone get dropped, buttons a
  // newer version adds slot in at their stock spot instead of vanishing
  dockButtonOrder: function() {
    const saved = There.prefs().dockOrder;
    if (!Array.isArray(saved) || !saved.length) {
      return There.DOCK_BUTTONS.slice();
    }
    const left = {};
    for (const b of There.DOCK_BUTTONS) {
      left[b.id] = b;
    }
    const out = [];
    for (const id of saved) {
      if (left[id]) {
        out.push(left[id]);
        delete left[id];
      }
    }
    for (const b of There.DOCK_BUTTONS) {
      if (left[b.id]) {
        out.push(b);
      }
    }
    return out;
  },

  // swap a button with its nearest neighbor in the SAME section, so moving
  // never pulls a button out of its group
  moveDockButton: function(id, dir) {
    const order = There.dockButtonOrder();
    const ids = order.map(b => b.id);
    const i = ids.indexOf(id);
    if (i < 0) {
      return;
    }
    const step = dir < 0 ? -1 : 1;
    let j = i + step;
    while (j >= 0 && j < order.length && order[j].group != order[i].group) {
      j += step;
    }
    if (j < 0 || j >= order.length) {
      return;
    }
    ids[i] = ids[j];
    ids[j] = id;
    There.prefs().dockOrder = ids;
    There.savePrefs();
    There.applyDockPrefs();
    There.renderDockToggles();
    There.playSound('control down');
  },

  // show/hide dock buttons per prefs, dock auto-sizes its width
  applyDockPrefs: function() {
    // the GPS screen rides inside the speedo cluster; the window shape must
    // follow when it comes or goes
    const gps = There.prefs().gps ? '1' : '0';
    const gpsOpen = There.prefs().gps && There.prefs().gpsOpen ? '1' : '0';
    if ($('.speedo').attr('data-gps') != gps || $('.speedo').attr('data-gpsopen') != gpsOpen) {
      $('.speedo').attr('data-gps', gps).attr('data-gpsopen', gpsOpen);
      There.syncWindowShape();
    }
    for (const b of There.DOCK_BUTTONS) {
      $(`.dock .item[data-id="${b.id}"]`).attr('data-off', There.dockButtonOn(b.id) ? '' : '1');
    }
    // arrange each section in the saved order (appendChild moves in place)
    for (const b of There.dockButtonOrder()) {
      const wrap = $(`.dock .dockitems[data-group="${b.group}"]`)[0];
      const el = $(`.dock .item[data-id="${b.id}"]`)[0];
      if (wrap && el) {
        wrap.appendChild(el);
      }
    }
    // open Library lists hidden buttons, keep it current
    if (There.data.panel == 'apps') {
      There.renderAppTray();
    }
    $('.dockroot').attr('data-compact', There.prefs().compact ? '1' : '');
    $('.dockroot').attr('data-nocompass', There.prefs().showCompass ? '' : '1');
    $('.dockroot').attr('data-notbux', There.prefs().showTbux ? '' : '1');
    There.syncKeymap();
    There.ensureChatPoll();
    // panels follow the dock width, which just changed
    There.syncPanelWidth();
  },

  setDockButton: function(id, on) {
    There.prefs().dock[id] = !!on;
    There.savePrefs();
    There.applyDockPrefs();
    There.playSound('control down');
  },

  // Library: a tile per hidden dock button so you can open it without turning it
  // back on. icons come from the hidden button itself so they always match
  renderAppTray: function() {
    const hidden = There.DOCK_BUTTONS.filter(b => !There.dockButtonOn(b.id));
    if (!hidden.length) {
      $('.appsbody').html('<div class="empty">Everything is already on your dock. Buttons you hide in Settings &gt; Dock buttons show up here.</div>');
      return;
    }
    let html = '';
    for (const b of hidden) {
      const icon = $(`.dock .item[data-id="${b.id}"] .glyph`).attr('data-icon') || 'table-cells';
      html += `<div class="apptile" data-id="${b.id}"><div class="aticon">${tmuiIcon(icon)}</div><div class="atlabel">${b.name}</div></div>`;
    }
    $('.appsbody').html(html);
  },

  // toggle rows for Settings > Dock buttons
  renderDockToggles: function() {
    const dock = There.prefs().dock || {};
    const host = $('.docktoggles');
    $(host).empty();
    $('.appeartoggles, .controltoggles, .behaviortoggles, .giftoggles').empty();
    // dock-wide switches (Appearance / Controls), then a row per dock button
    const prefRow = function(label, key, target) {
      let row = $('<div class="dtrow"></div>');
      $('<span></span>').text(label).appendTo($(row));
      let sw = $('<div class="qeswitch"></div>').attr('data-on', There.prefs()[key] ? '1' : '0');
      $('<div class="qeknob"></div>').appendTo($(sw));
      $(sw).on('click', function() {
        const next = $(this).attr('data-on') != '1';
        $(this).attr('data-on', next ? '1' : '0');
        There.prefs()[key] = next;
        There.savePrefs();
        There.applyDockPrefs();
        There.playSound('control down');
      });
      $(sw).appendTo($(row));
      $(row).appendTo($(target));
    };
    // compact: icons only, tighter, labels go in tooltips
    prefRow('Compact dock', 'compact', '.appeartoggles');
    prefRow('Compass', 'showCompass', '.appeartoggles');
    prefRow('Tbux balance', 'showTbux', '.appeartoggles');
    prefRow('Action Mode keys (WASD, Space, R)', 'keymap', '.controltoggles');
    prefRow('Speedometer when driving', 'speedo', '.behaviortoggles');
    prefRow('GPS screen beside the speedometer', 'gps', '.behaviortoggles');
    prefRow('Close Inventory after an action', 'closeInv', '.behaviortoggles');
    prefRow('Close Wardrobe after an action', 'closeWard', '.behaviortoggles');
    prefRow('Close Emotes after sending one', 'closeEmotes', '.behaviortoggles');
    prefRow('Show GIFs from other ModernUI users', 'gifs', '.giftoggles');
    // rows follow the dock order, split under the same section headings as the
    // pill itself; the arrows move a button inside its section only
    const order = There.dockButtonOrder();
    let lastGroup = null;
    for (let i = 0; i < order.length; i++) {
      const b = order[i];
      if (b.group != lastGroup) {
        lastGroup = b.group;
        $('<div class="dtgroup"></div>').text(There.DOCK_GROUPS[b.group] || b.group).appendTo($(host));
      }
      const firstOfGroup = !order.some((o, k) => k < i && o.group == b.group);
      const lastOfGroup = !order.some((o, k) => k > i && o.group == b.group);
      const on = There.dockButtonOn(b.id);
      let row = $('<div class="dtrow"></div>');
      $('<span></span>').text(b.name).appendTo($(row));
      let mv = $('<div class="dtmove"></div>');
      (function(id) {
        let up = $('<span title="Move left on the dock">▲</span>').on('click', function() {
          There.moveDockButton(id, -1);
        });
        let down = $('<span title="Move right on the dock">▼</span>').on('click', function() {
          There.moveDockButton(id, 1);
        });
        if (firstOfGroup) {
          $(up).css('visibility', 'hidden');
        }
        if (lastOfGroup) {
          $(down).css('visibility', 'hidden');
        }
        $(mv).append(up, down);
      })(b.id);
      $(mv).appendTo($(row));
      let sw = $('<div class="qeswitch"></div>').attr('data-on', on ? '1' : '0');
      $('<div class="qeknob"></div>').appendTo($(sw));
      (function(id) {
        $(sw).on('click', function() {
          const next = $(this).attr('data-on') != '1';
          $(this).attr('data-on', next ? '1' : '0');
          There.setDockButton(id, next);
        });
      })(b.id);
      $(sw).appendTo($(row));
      $(row).appendTo($(host));
    }
  },

  setQuickEquip: function(on) {
    There.prefs().quickEquip = !!on;
    There.savePrefs();
    $('.qeswitch').attr('data-on', on ? '1' : '0');
    There.playSound('control down');
  },

  setScale: function(px) {
    px = Math.max(48, Math.min(132, Number(px) || 60));
    There.prefs().scale = px;
    $('.grid').css('--card', px + 'px');
    There.savePrefs();
  },

  setView: function(view) {
    if (view != 'tile' && view != 'list') {
      return;
    }
    There.prefs().view = view;
    There.savePrefs();
    There.applyViewPrefs();
    There.playSound('control down');
    // list and tile use different thumbs (icon vs catalog), so re-render
    if (There.folderPanelOpen()) {
      There.renderCards(There.itemsAtCurrentLevel());
    }
  },

  // redraw the footer count line for the open panel
  refreshFooter: function() {
    const n = parseInt($('.footcount').text(), 10);
    if (!isNaN(n)) {
      There.setFooterCount(n);
    }
  },

  // footer "N items" count
  setFooterCount: function(n) {
    const noun = There.data.panel == 'places' ? ' place' : ' item';
    $('.footcount').text(n + noun + (n == 1 ? '' : 's'));
    let missing = 0;
    if (There.data.panel == 'inventory') {
      missing = (There.data.inventory || []).filter(i => There.itemNeedsPhoto(i)).length;
    } else if (There.data.panel == 'wardrobe') {
      missing = (There.data.accoutrements || []).filter(a => !CatalogImages.poids[a.poid]).length;
    }
    if (There.data.sweep) {
      $('<span class="footphotos"></span>')
        .text(' · fixing photos · ')
        .append($('<a class="footstop"></a>').text('Stop'))
        .appendTo($('.footcount'));
    } else if (missing) {
      $('<span class="footphotos"></span>')
        .text(` · ${missing} without photos · `)
        .append($('<a class="footcache"></a>').text('Fix them'))
        .appendTo($('.footcount'));
    }
  },

  // rename/delete a folder (folder card context menu or action)
  folderEditPrompt: function(folderId) {
    const folder = There.folderById(folderId);
    if (!folder) {
      return;
    }
    There.showFolderPrompt('Rename folder', folder.name, function(name, action) {
      if (action == 'delete') {
        There.deleteFolder(folderId);
      } else {
        There.renameFolder(folderId, name);
      }
      There.renderFolderView();
    }, true);
  },

  parseInventoryTable: function(html) {
    // columns: Type, Doid, Name, ProductId, OwnerDoid, StatusText,
    // WobInteractions, IconAssetName
    let items = [];
    try {
      const doc = $('<div></div>').html(html);
      $(doc).find('tr').each(function() {
        const cells = $(this).find('td');
        if (cells.length < 8) {
          return; // header row (<th>) or junk
        }
        const doid = $(cells[1]).text().trim();
        const name = $(cells[2]).text().trim();
        const interactions = $(cells[6]).text().trim();
        // skip rows with no name, doid or interactions. they show up as blank
        // "In gear" cards you can't do anything with
        if (!name || !doid || !/^\d+$/.test(doid) || !interactions) {
          return;
        }
        items.push({
          doid: doid,
          name: name,
          productId: $(cells[3]).text().trim(),
          status: $(cells[5]).text().trim(),
          interactions: interactions,
          icon: $(cells[7]).text().trim(),
        });
      });
    } catch (error) {
    }
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  },

  /* ------- Places: Favorites | Map -------
   * The map is the GPS from gpsmaps.js: which island you're on, its picture,
   * and a dot with your heading, refreshed once a second while it's open. */

  renderPlacesTabs: function() {
    const current = There.data.placesTab || 'list';
    $('.dockroot').attr('data-placestab', current);
    let tabs = $('.tabs');
    $(tabs).empty();
    for (const [id, name] of [['list', 'Favorites'], ['map', 'Map']]) {
      let el = $('<div class="tab"></div>').text(name).attr('data-id', id);
      if (id == current) {
        $(el).attr('data-active', '1');
      }
      $(el).on('click', function() {
        if (There.data.placesTab == id) {
          return;
        }
        There.playSound('control down');
        There.data.placesTab = id;
        There.renderPlacesTabs();
        if (id == 'map') {
          There.drawMap();
          There.mapTick();
        } else {
          There.renderFolderView();
        }
      });
      $(el).appendTo($(tabs));
    }
  },

  // where to read the position from: seated, our own position freezes and
  // the vehicle's is the one that moves (the tacho already found it)
  mapTick: function() {
    if (There.data.panel != 'places' || There.data.placesTab != 'map') {
      return;
    }
    const seated = $('.speedo').attr('data-active') == '1' && There.data.speedoVeh;
    const doid = seated ? There.data.speedoVeh : There.data.pilotDoid;
    if (!doid || !There.data.cockpitUp) {
      $('.mapname').text('Waiting for the game…');
      There.setNamedTimer('map', 1500, There.mapTick);
      return;
    }
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `/thobs/${doid}/edprops/posOrDel/value` },
      dataType: 'xml',
      success: function(xml) {
        const pos = There.parsePosOrDel(xml);
        if (pos) {
          There.data.mapPos = pos;
          There.drawMap();
        }
      },
      complete: function() {
        There.setNamedTimer('map', 1000, There.mapTick);
      },
    });
  },

  // which map shows: 'auto' follows you island to island, 'main' is the
  // world, 'global' the planet, an island id browses that island
  setMapView: function(view) {
    There.data.mapView = view;
    There.mapResetZoom();
    There.drawMap();
  },

  drawMap: function() {
    const pos = There.data.mapPos;
    const view = There.data.mapView || 'auto';
    if (!pos) {
      return;
    }
    const at = view == 'auto' ? TmuiMaps.locate(pos) : TmuiMaps.locateOn(pos, view);
    if (!at) {
      return;
    }
    const shown = at.id;
    // the view changed under us (auto crossed onto another island): fresh zoom
    if (There.data.mapShown != shown) {
      There.data.mapShown = shown;
      There.mapResetZoom();
    }
    // the world uses the full-size picture so it stays sharp when zoomed
    const world = shown == 'main';
    $('.mapworld').toggle(world);
    $('.maplabels').toggle(world);
    $('.mapimg').toggle(!world);
    if (world) {
      There.buildMapLabels();
    } else {
      const img = $('.mapimg')[0];
      if (img && There.data.mapSrc != at.src) {
        There.data.mapSrc = at.src;
        img.src = at.src;
      }
    }
    // the dot: always in 'auto', elsewhere only when you're on that map
    const onMap = view == 'auto' || at.inside;
    $('.mapdot').toggle(onMap);
    if (onMap) {
      const left = Math.max(0, Math.min(100, at.px / TmuiMaps.WIDTH * 100));
      const top = Math.max(0, Math.min(100, at.py / TmuiMaps.HEIGHT * 100));
      $('.mapdot').css({ left: left + '%', top: top + '%' });
      $('.maparrow').css('transform', `rotate(${There.data.heading || 0}deg)`);
      There.data.mapDot = { x: left / 100, y: top / 100 };
      // following you while zoomed in on 'Here', unless you just dragged
      if (view == 'auto' && (There.data.mapZoom || 1) > 1 &&
          Date.now() - (There.data.mapDragAt || 0) > 3000) {
        There.mapCentreOn(There.data.mapDot);
      }
    }
    $('.mapname').text(onMap ? at.name : `${at.name} · you're elsewhere`);
    const ew = at.surface.x >= 0 ? 'E' : 'W';
    const ns = at.surface.y >= 0 ? 'N' : 'S';
    $('.mapcoords').text(`${Math.abs(at.surface.x).toLocaleString()} ${ew} · ` +
      `${Math.abs(at.surface.y).toLocaleString()} ${ns}`);
    $('.mapview').each(function() {
      $(this).attr('data-active', $(this).attr('data-view') == view ? '1' : '0');
    });
  },

  // island names on the world map; click one to browse it
  buildMapLabels: function() {
    if (There.data.mapLabelsBuilt) {
      return;
    }
    There.data.mapLabelsBuilt = true;
    const host = $('.maplabels');
    $(host).empty();
    const wp = TmuiMaps.WORLD_PLACE;
    $('.mapworld').css({
      left: wp.x / TmuiMaps.WIDTH * 100 + '%',
      top: wp.y / TmuiMaps.HEIGHT * 100 + '%',
      width: wp.w / TmuiMaps.WIDTH * 100 + '%',
      height: wp.h / TmuiMaps.HEIGHT * 100 + '%',
    });
    for (const spot of TmuiMaps.islandSpots()) {
      $('<div class="maplabel"></div>').text(spot.name).css({
        left: spot.px / TmuiMaps.WIDTH * 100 + '%',
        top: spot.py / TmuiMaps.HEIGHT * 100 + '%',
      }).on('click', function(event) {
        event.stopPropagation();
        There.playSound('menu item activate');
        There.setMapView(spot.id);
      }).on('mousedown', function(event) {
        event.stopPropagation();
      }).appendTo($(host));
    }
  },

  /* map zoom: the stage scales from its top-left corner and pans so it
     always covers the frame. the dot and labels counter-scale to stay put */

  mapResetZoom: function() {
    There.data.mapZoom = 1;
    There.data.mapPanX = 0;
    There.data.mapPanY = 0;
    There.applyMapZoom();
  },

  applyMapZoom: function() {
    const frame = $('.mapframe')[0];
    if (!frame) {
      return;
    }
    const z = There.data.mapZoom || 1;
    const w = frame.clientWidth;
    const h = frame.clientHeight;
    There.data.mapPanX = Math.max(w - w * z, Math.min(0, There.data.mapPanX || 0));
    There.data.mapPanY = Math.max(h - h * z, Math.min(0, There.data.mapPanY || 0));
    $('.mapstage').css('transform', `translate(${There.data.mapPanX}px, ${There.data.mapPanY}px) scale(${z})`);
    $('.mapframe').css('--mapz', z);
  },

  // zoom by a factor around a point in the frame (px from its top-left)
  mapZoomAt: function(factor, cx, cy) {
    const z = There.data.mapZoom || 1;
    const nz = Math.max(1, Math.min(8, z * factor));
    const k = nz / z;
    There.data.mapPanX = cx - (cx - (There.data.mapPanX || 0)) * k;
    There.data.mapPanY = cy - (cy - (There.data.mapPanY || 0)) * k;
    There.data.mapZoom = nz;
    There.applyMapZoom();
  },

  // put a spot (0..1 of the map) in the middle of the frame
  mapCentreOn: function(spot) {
    const frame = $('.mapframe')[0];
    if (!frame || !spot) {
      return;
    }
    const z = There.data.mapZoom || 1;
    There.data.mapPanX = frame.clientWidth / 2 - spot.x * frame.clientWidth * z;
    There.data.mapPanY = frame.clientHeight / 2 - spot.y * frame.clientHeight * z;
    There.applyMapZoom();
  },

  renderWardrobeTabs: function() {
    let tabs = $('.tabs');
    $(tabs).empty();
    for (let tab of There.wardrobeTabs) {
      let el = $('<div class="tab"></div>').text(tab.name).attr('data-id', tab.id);
      if (tab.id == There.data.wardrobeTab) {
        $(el).attr('data-active', '1');
      }
      $(el).on('click', function() {
        There.playSound('control down');
        There.data.wardrobeTab = tab.id;
        There.data.search = '';
        $('.panelsearch input').val('');
        // new category = new folder scope, start at root
        There.gotoFolder(null);
        There.renderWardrobeTabs();
        There.loadWardrobe(tab.id);
      });
      $(el).appendTo($(tabs));
    }
  },

  // items for a tab, filtered by its `type` set. full accoutrement list loads once
  // (cached) and filters locally so tab switches are instant
  loadWardrobe: function(tabId) {
    const tab = There.wardrobeTabs.find(t => t.id == tabId) || There.wardrobeTabs[0];

    // body and face shape editing (the old ChangeMe treatments)
    if (tab.dna) {
      $('.foldertabs').empty();
      // no folders, card sizes or quick equip here: hide the footer chrome
      $('.dockroot').attr('data-dna', '1');
      There.renderDna();
      return;
    }
    $('.dockroot').attr('data-dna', '0');

    // outfits/looksets come from their own pilotPobs container
    if (tab.pob) {
      There.data.pobCache = There.data.pobCache || {};
      if (There.data.pobCache[tab.pob]) {
        There.renderFolderView();
        return;
      }
      $('.foldertabs').empty();
      $('.grid').empty();
      $('<div class="empty"></div>').text(`Loading ${tab.name.toLowerCase()}…`).appendTo($('.grid'));
      There.loadPobList(tab, function(items) {
        There.data.pobCache[tab.pob] = items;
        if (There.data.panel == 'wardrobe' && There.data.wardrobeTab == tab.id) {
          There.renderFolderView();
        }
      });
      return;
    }

    if (There.data.accoutrements) {
      There.renderFolderView();
      return;
    }
    // still loading (maybe from the preload): progress bar on the shared load,
    // render when done
    There.showGridLoading('Loading wardrobe…');
    There.loadAccoutrements(function() {
      if (There.data.panel == 'wardrobe') {
        There.renderFolderView();
      }
    }, function(done, total) {
      if (There.data.panel == 'wardrobe' && !There.data.accoutrements) {
        There.updateGridLoading(done, total);
      }
    });
  },

  // progress bar in the grid while a big list loads
  showGridLoading: function(label) {
    $('.foldertabs').empty();
    let grid = $('.grid');
    $(grid).empty();
    let box = $('<div class="loadbox"></div>');
    $('<div class="loadlabel"></div>').text(label).appendTo($(box));
    let bar = $('<div class="loadbar"></div>');
    $('<div class="loadfill"></div>').appendTo($(bar));
    $(bar).appendTo($(box));
    $('<div class="loadcount"></div>').appendTo($(box));
    $(box).appendTo($(grid));
  },

  updateGridLoading: function(done, total) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    $('.grid .loadfill').css('width', pct + '%');
    $('.grid .loadcount').text(total > 0 ? `${done} / ${total}` : '');
  },

  // load a pilotPobs container (outfits/looksets): child names as glyph items
  // with a pob path for actions
  loadPobList: function(tab, done) {
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: `/pilotPobs/${tab.pob}` },
      dataType: 'xml',
      success: function(xml) {
        let oids = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const id = child.getElementsByTagName('Name')[0]?.childNodes[0]?.nodeValue;
            if (id && /^\d+$/.test(id)) {
              oids.push(id);
            }
          }
        } catch (e) {
        }
        let items = [];
        let remaining = oids.length;
        if (remaining == 0) {
          done([]);
          return;
        }
        for (const oid of oids) {
          There.fetch({
            path: '/ScriptHook/Get',
            query: { Path: `/pilotPobs/${tab.pob}/${oid}/name` },
            dataType: 'xml',
            success: function(x) {
              const nm = x.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue;
              if (nm) {
                items.push({ poid: oid, name: nm, pob: tab.pob, glyph: tab.glyph });
              }
            },
            complete: function() {
              if (--remaining == 0) {
                items.sort((a, b) => a.name.localeCompare(b.name));
                done(items);
              }
            },
          });
        }
      },
      error: function() {
        done([]);
      },
    });
  },

  filterWardrobe: function(tab) {
    const all = There.data.accoutrements || [];
    if (!tab.types) {
      return all;
    }
    const set = tab.types;
    return all.filter(it => set.includes((it.type || '').toLowerCase()));
  },

  // load every accoutrement's name + type from /pilotPobs/accoutrements.
  // one fetch per item, throttled, cached after
  loadAccoutrements: function(done, progress) {
    if (There.data.loadingAcc) {
      // already loading (e.g. preload): a late caller hooks into the in-flight load
      // rather than starting a second one
      if (done) {
        There.data.accDoneCbs = (There.data.accDoneCbs || []).concat([done]);
      }
      if (progress) {
        There.data.accProgressCbs = (There.data.accProgressCbs || []).concat([progress]);
        // fire once now with the current count
        if (There.data.accProgress) {
          progress(There.data.accProgress.done, There.data.accProgress.total);
        }
      }
      return;
    }
    There.data.loadingAcc = true;
    There.data.accDoneCbs = done ? [done] : [];
    There.data.accProgressCbs = progress ? [progress] : [];
    There.data.accProgress = { done: 0, total: 0 };
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/pilotPobs/accoutrements' },
      dataType: 'xml',
      success: function(xml) {
        let oids = [];
        try {
          for (const child of xml.getElementsByTagName('Child')) {
            const nameEl = child.getElementsByTagName('Name')[0];
            const oid = nameEl?.childNodes[0]?.nodeValue;
            if (oid && /^\d+$/.test(oid)) {
              oids.push(oid);
            }
          }
        } catch (error) {
        }
        There.fetchAccoutrementDetails(oids);
      },
      error: function() {
        There.data.loadingAcc = false;
        There.fireAccDone();
      },
    });
  },

  // call every registered progress/done callback (preload + late UI)
  fireAccProgress: function(done, total) {
    There.data.accProgress = { done: done, total: total };
    for (const cb of (There.data.accProgressCbs || [])) {
      try { cb(done, total); } catch (error) {}
    }
  },

  fireAccDone: function() {
    const cbs = There.data.accDoneCbs || [];
    There.data.accDoneCbs = [];
    There.data.accProgressCbs = [];
    for (const cb of cbs) {
      try { cb(); } catch (error) {}
    }
  },

  fetchAccoutrementDetails: function(oids) {
    // name and type are separate leaf reads
    let items = [];
    let i = 0;
    // keep this low, the local server is single threaded and other windows need it too
    const CONCURRENCY = 2;
    let active = 0;
    let finished = 0;
    const total = oids.length;
    const leaf = function(oid, field, cb) {
      There.fetch({
        path: '/ScriptHook/Get',
        query: { Path: `/pilotPobs/accoutrements/${oid}/${field}` },
        dataType: 'xml',
        success: function(xml) {
          const v = xml.getElementsByTagName('Value')[0]?.childNodes[0]?.nodeValue;
          cb(v || '');
        },
        error: function() {
          cb('');
        },
      });
    };
    const pump = function() {
      if (finished >= total) {
        items.sort((a, b) => a.name.localeCompare(b.name));
        There.data.accoutrements = items;
        There.data.loadingAcc = false;
        There.fireAccDone();
        There.prefetchPhotos();
        return;
      }
      while (active < CONCURRENCY && i < total) {
        const oid = oids[i++];
        active++;
        let name = '', type = '', got = 0;
        const check = function() {
          if (++got < 2) {
            return;
          }
          if (name) {
            items.push({ poid: oid, name: name, type: type, status: '' });
          }
          active--;
          finished++;
          There.fireAccProgress(finished, total);
          pump();
        };
        leaf(oid, 'name', function(v) { name = v; check(); });
        leaf(oid, 'type', function(v) { type = v; check(); });
      }
    };
    There.fireAccProgress(0, total);
    pump();
  },

  applySearch: function() {
    if (There.data.panel == 'inventory' && There.data.inventory) {
      There.renderCards(There.itemsAtCurrentLevel());
    } else if (There.data.panel == 'wardrobe') {
      There.renderCards(There.itemsAtCurrentLevel());
    } else if (There.data.panel == 'places') {
      There.renderCards(There.itemsAtCurrentLevel());
    }
  },
});

$(document).ready(function() {
  // Drag the dock from any empty bit of the pill. Buttons and slots stop their
  // mousedown bubbling, so only bare dock area starts a drag. The engine
  // remembers the spot across sessions.
  $('.dock').on('mousedown', function(event) {
    if (event.which == 1) {
      There.fsCommand('beginDragWindow');
    }
    event.preventDefault();
  });

  $('.dock .item').on('mouseover', function() {
    There.playSound('control rollover');
  }).on('mousedown', function(event) {
    There.playSound('control down');
    event.stopPropagation();
  });

  $('.dock .item').on('click', function() {
    There.activate($(this).attr('data-id'));
  });


  $('.panelclose').on('click', function() {
    There.closePanel();
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });

  // drag the gauge cluster anywhere and remember the spot. while dragging, the
  // whole window takes the mouse so the pointer can't outrun the input shape
  // the GPS button folds the screen open and shut (remembered). shut, it does
  // no work at all
  $('.spdgpsbtn').on('mousedown', function(event) {
    event.stopPropagation();
  }).on('click', function(event) {
    event.stopPropagation();
    const p = There.prefs();
    p.gpsOpen = !p.gpsOpen;
    There.savePrefs();
    There.data.gps = null;
    if (p.gpsOpen && There.data.speedoPrev) {
      There.gpsFeed(There.data.speedoPrev.p);
    }
    There.playSound(p.gpsOpen ? 'open menu' : 'close menu');
    There.applyDockPrefs();
  });

  $('.speedo').on('mousedown', function(event) {
    if (event.which != 1) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const el = $('.speedo')[0];
    const start = el.getBoundingClientRect();
    const sx = event.clientX;
    const sy = event.clientY;
    $(el).attr('data-dragging', '1');
    if (There.data.shapeOn) {
      There.data.shapeSent = null;
      There.fsCommand('tmuiShape', 'rects=all');
    }
    const move = function(ev) {
      const r = Math.max(2, Math.min(window.innerWidth - start.width - 2,
        window.innerWidth - start.right - (ev.clientX - sx)));
      const b = Math.max(2, Math.min(window.innerHeight - start.height - 2,
        window.innerHeight - start.bottom - (ev.clientY - sy)));
      $(el).css({ right: `${r}px`, bottom: `${b}px` });
    };
    const up = function() {
      $(document).off('mousemove', move).off('mouseup', up);
      $(el).attr('data-dragging', '');
      There.saveSpeedoPos();
      There.syncWindowShape();
    };
    $(document).on('mousemove', move).on('mouseup', up);
  });

  // close the action bar on any click that isn't a card or the bar
  $(document).on('mousedown', function(event) {
    if (There.data.menuOpen && $(event.target).closest('.actionbar, .grid .card').length == 0) {
      There.clearItemMenu();
    }
  });
  $('.actionbar').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.actionbar .abclose').on('click', function() {
    There.clearItemMenu();
  });

  $('.cachebar .button.cacheall').on('click', function() {
    There.playSound('control down');
    There.startCacheSweep();
  });

  $('.cachebar .pbtn[data-id="pause"]').on('click', function() {
    There.pauseCacheSweep();
  });
  $('.cachebar .pbtn[data-id="resume"]').on('click', function() {
    There.resumeCacheSweep();
  });
  $('.cachebar .pbtn[data-id="cancel"]').on('click', function() {
    There.cancelCacheSweep();
  });

  $('.cachebar .button.clearcache').on('click', function() {
    There.playSound('control down');
    There.clearPhotoCache();
  });

  // Settings: folders backup export/import (per avatar)
  $('.button.setexport').on('click', function() {
    There.playSound('control down');
    There.exportFolders();
  });
  $('.button.setimport').on('click', function() {
    There.playSound('control down');
    $('.importfile').val('').trigger('click');
  });
  $('.importfile').on('change', function() {
    const file = this.files && this.files[0];
    if (file) {
      There.importFoldersFromFile(file);
    }
  });

  // Settings: collapsible sections (keeps the panel scrollbar-free). first one
  // open, rest closed
  $('.setsection').attr('data-open', '0').first().attr('data-open', '1');
  $('.setsection .setheading').on('click', function() {
    There.playSound('control down');
    const sec = $(this).closest('.setsection');
    $(sec).attr('data-open', $(sec).attr('data-open') == '1' ? '0' : '1');
  });

  // Settings: clear learned images (item photos + clothing map)
  $('.button.clearimgs').on('click', function() {
    There.playSound('control down');
    There.clearPhotoCache();
  });

  // Settings: manual sync
  $('.button.syncnow').on('click', function() {
    There.playSound('control down');
    There.clearNamedTimer('periodic-sync');
    There.incrementalSync(true);
  });

  // Settings: music search instance
  $('.musicinstsave').on('click', function() {
    There.saveMusicInstance();
  });
  $('.musicinstance').on('click', function() {
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
    if (event.key == 'Enter') {
      There.saveMusicInstance();
    }
  });

  // About: open credit links in the client browser
  $('.aboutlink').on('click', function() {
    const url = $(this).attr('data-href');
    if (url) {
      There.openUrl(url);
    }
  });

  // clicks in settings/about shouldn't start a window drag
  $('.settingspanel, .aboutpanel').on('mousedown', function(event) {
    event.stopPropagation();
  });

  $('.panelsearch input').on('click', function() {
    if ($(this).is(':focus')) {
      return;
    }
    There.fsCommand('getKeyboardFocus');
    $(this).focus();
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
    if (event.key == 'Escape') {
      $(this).val('');
      There.data.search = '';
      There.applySearch();
    }
  }).on('input', function() {
    There.data.search = $(this).val();
    There.applySearch();
  });

  // drag the dock by empty space in a panel header (not the search box, title or close)
  $('.panelbar').on('mousedown', function(event) {
    event.stopPropagation();
    if ($(event.target).closest('input, textarea, .panelsearch, .musicsearch, .emotesearch, .gifsearch, .panelclose, .paneltitle').length) {
      return;
    }
    if (event.which == 1) {
      There.fsCommand('beginDragWindow');
      event.preventDefault();
    }
  });

  // Places map: view buttons, + and -, wheel zoom around the pointer, drag to
  // pan, double-click to reset
  $('.mapview').on('click', function() {
    There.playSound('control down');
    There.setMapView($(this).attr('data-view'));
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.mapzoom').on('click', function() {
    const frame = $('.mapframe')[0];
    const dir = Number($(this).attr('data-dir'));
    There.playSound('control down');
    There.mapZoomAt(dir > 0 ? 1.5 : 1 / 1.5, frame.clientWidth / 2, frame.clientHeight / 2);
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.mapframe').on('wheel', function(event) {
    event.preventDefault();
    const e = event.originalEvent;
    const rect = this.getBoundingClientRect();
    There.mapZoomAt(e.deltaY < 0 ? 1.25 : 1 / 1.25, e.clientX - rect.left, e.clientY - rect.top);
  }).on('mousedown', function(event) {
    if (event.which != 1) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const start = { x: event.pageX, y: event.pageY, px: There.data.mapPanX || 0, py: There.data.mapPanY || 0 };
    $(document).on('mousemove.mapdrag', function(e) {
      There.data.mapPanX = start.px + (e.pageX - start.x);
      There.data.mapPanY = start.py + (e.pageY - start.y);
      There.data.mapDragAt = Date.now();
      There.applyMapZoom();
    }).on('mouseup.mapdrag', function() {
      $(document).off('.mapdrag');
    });
  }).on('dblclick', function() {
    There.mapResetZoom();
  });

  // Volume panel: live while dragging (a few changes a second), exact on release
  $('.volslider').on('input', function() {
    const row = $(this).closest('.volrow');
    const id = $(row).attr('data-id');
    const pref = $(row).attr('data-pref');
    const value = Number($(this).val()) / 100;
    There.data.volDrag = id;
    $(row).find('.volvalue').text(Math.round(value * 100) + '%');
    There.setNamedTimer(`vol-set-${id}`, 120, function() {
      There.volSend({ set: { pref: pref, value: value } });
    });
  }).on('change', function() {
    const row = $(this).closest('.volrow');
    const id = $(row).attr('data-id');
    There.clearNamedTimer(`vol-set-${id}`);
    There.volSend({ set: { pref: $(row).attr('data-pref'), value: Number($(this).val()) / 100 } });
    There.playSound('control up');
    // let the game's answer land before reports may move this slider again
    There.setNamedTimer('vol-drag-end', 400, function() {
      There.data.volDrag = null;
    });
  }).on('mousedown', function(event) {
    There.playSound('control down');
    event.stopPropagation();
  });

  $('.volmute').on('click', function() {
    There.playSound('control down');
    There.volSend({ toggleMute: true });
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });

  // chunked rendering: more cards as the grid nears the bottom
  $('.grid').on('scroll', function() {
    There.onGridScroll();
  });

  // footer: card-size slider (live) + tile/list toggle
  $('.scaleslider').on('input', function() {
    There.setScale($(this).val());
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.viewtoggle .vbtn').on('click', function() {
    There.setView($(this).attr('data-view'));
  });
  $('.quickequip .qeswitch').on('click', function() {
    There.setQuickEquip($(this).attr('data-on') != '1');
  });
  $('.panelfooter').on('mousedown', function(event) {
    event.stopPropagation();
  });

  // Music: search box
  $('.musicsearch input').on('click', function() {
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
    if (event.key == 'Enter') {
      There.doMusicSearch($(this).val());
    } else if (event.key == 'Escape') {
      $(this).val('');
    }
  });

  // Music: transport controls
  $('.nowplaying').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.nowplaying .npbtn[data-id="play"]').on('click', function() {
    YtMusic.togglePlay();
    There.setNamedTimer('np-refresh', 250, There.refreshNowPlaying);
  });
  $('.nowplaying .npbtn[data-id="next"]').on('click', function() {
    YtMusic.next(false);
  });
  $('.nowplaying .npbtn[data-id="prev"]').on('click', function() {
    YtMusic.prev();
  });
  $('.nowplaying .npbtn[data-id="shuffle"]').on('click', function() {
    YtMusic.toggleShuffle();
    There.refreshNowPlaying();
  });
  $('.nowplaying .npbtn[data-id="repeat"]').on('click', function() {
    YtMusic.cycleRepeat();
    There.refreshNowPlaying();
  });
  $('.nowplaying .npbtn[data-id="party"]').on('click', function() {
    There.setParty(!There.prefs().party);
  });

  // F1-F12 fire slots 1-12 (while this window has keyboard focus)
  $(document).on('keydown', function(event) {
    const m = (event.key || '').match(/^F(\d{1,2})$/);
    if (m && Number(m[1]) <= There.QUICK_SLOTS && !$(event.target).is('input') && !There.inputBlocked()) {
      event.preventDefault();
      There.useQuickSlot(Number(m[1]) - 1);
    }
  });
  $('.npvolslider').on('input', function() {
    YtMusic.setVolume($(this).val());
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.musicpanel').on('mousedown', function(event) {
    event.stopPropagation();
  });

  // Emotes: search + click containment. chip clicks are delegated (one handler
  // for the grid) to keep renders cheap
  $('.emotespanel').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.scenespanel').on('mousedown', function(event) {
    event.stopPropagation();
  });
  // Places: bookmark here (native Add Favorite dialog), undo teleport, Central
  $('.button.placemark').on('click', function() {
    There.playSound('control down');
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: '/mainMenu/Places/Add Favorite.../activate' },
      dataType: 'xml',
    });
    There.closePanel();
  });
  $('.button.placeundo').on('click', function() {
    There.playSound('control down');
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: '/mainMenu/Places/Undo Last Teleport/activate' },
      dataType: 'xml',
    });
  });
  $('.button.placedel').on('click', function() {
    There.playSound('control down');
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: { Path: '/mainMenu/Places/Organize.../activate' },
      dataType: 'xml',
    });
    There.closePanel();
  });
  // Shop / Auctions panels
  $('.shoppanel, .auctionspanel').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.button.shopcentral').on('click', function() {
    There.openUrl('https://webapps.prod.there.com/catalog/index.html');
  });
  $('.button.aucentral').on('click', function() {
    There.openUrl('https://webapps.prod.there.com/items/home');
  });
  $('.aucontrols .ausearch').on('click', function() {
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (event.key == 'Enter') {
      There.searchAuctions();
    }
  });
  $('.aucontrols .aucat').on('mousedown', function(event) {
    event.stopPropagation();
  }).on('click', function(event) {
    event.stopPropagation();
    There.playSound('control down');
    const open = $('.aucatlist').attr('data-open') == '1' ? '0' : '1';
    $('.ausortlist').attr('data-open', '0');
    $('.aucatlist').attr('data-open', open);
    $('.aucat').attr('data-open', open);
  });
  $('.aucatlist, .ausortlist').on('mousedown', function(event) {
    event.stopPropagation();
  });
  // the sort dropdown, filled once from the static list
  (function() {
    const list = $('.ausortlist');
    const opt = function(param, label) {
      $('<div class="opt"></div>').text(label).on('click', function(event) {
        event.stopPropagation();
        There.playSound('control down');
        There.pickAuctionSort(param, label);
      }).appendTo($(list));
    };
    opt('', 'Default order');
    for (const so of There.AUCTION_SORTS) {
      opt(so.param, so.label);
    }
  })();
  $('.ausort').on('mousedown', function(event) {
    event.stopPropagation();
  }).on('click', function(event) {
    event.stopPropagation();
    There.playSound('control down');
    const open = $('.ausortlist').attr('data-open') == '1' ? '0' : '1';
    $('.aucatlist').attr('data-open', '0');
    $('.ausortlist').attr('data-open', open);
    $('.ausort').attr('data-open', open);
  });
  // clicking anywhere else closes the lists
  $(document).on('mousedown', function() {
    $('.aucatlist, .ausortlist').attr('data-open', '0');
    $('.aucat, .ausort').attr('data-open', '0');
  });
  $('.shopviewtoggle .vbtn').on('click', function() {
    There.playSound('control down');
    There.prefs().shopView = $(this).attr('data-view') == 'list' ? 'list' : 'tile';
    There.savePrefs();
    There.applyGridScale();
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.gridscale').on('input change', function() {
    There.prefs().shopScale = Math.max(110, Math.min(230, Number($(this).val()) || 150));
    There.savePrefs();
    There.applyGridScale();
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });

  $('.placecentral').on('click', function() {
    There.openUrl('https://webapps.prod.there.com/places/places?count=100');
  });
  $('.appspanel').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.appsbody').on('click', '.apptile', function() {
    There.activate($(this).attr('data-id'));
  });
  $('.emotesbody').on('click', '.emotebtn', function() {
    There.emoteClick($(this).attr('data-emote'));
  }).on('contextmenu', '.emotebtn', function(event) {
    event.preventDefault();
    There.toggleEmoteFav($(this).attr('data-emote'));
  });
  $('.emotetabs .tab').on('click', function() {
    There.playSound('control down');
    There.setEmoteTab($(this).attr('data-etab'));
  });
  $('.emotebanner .ebdone').on('click', function() {
    There.data.routineAdd = null;
    $('.emotebanner').attr('data-active', '0');
    There.setEmoteTab('routines');
  });
  // GIFs: search (debounced + cached to go easy on the API key) and the
  // received-GIF card (click to dismiss)
  // panel footer "Cache them": run the photo sweep from where the gap is seen
  $(document).on('click', '.footcache', function() {
    There.playSound('control down');
    if (!There.data.sweep) {
      There.startCacheSweep();
    }
    There.refreshFooter();
  });
  $(document).on('click', '.footstop', function() {
    There.playSound('control down');
    There.cancelCacheSweep();
    There.refreshFooter();
  });

  $('.gifsearch input').on('click', function() {
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
    if (event.key == 'Enter') {
      There.clearNamedTimer('gif-search');
      There.renderGifs($(this).val());
    }
    if (event.key == 'Escape') {
      $(this).val('');
      There.renderGifs('');
    }
  }).on('input', function() {
    const v = $(this).val();
    There.setNamedTimer('gif-search', 600, function() {
      if (v.trim().length != 1) {
        There.renderGifs(v);
      }
    });
  });
  $('.gifspanel, .gifcard').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.gifcard').on('click', function() {
    There.clearNamedTimer('gifcard');
    There.nextGifCard();
  });

  $('.emotesearch input').on('click', function() {
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
  }).on('keydown', function(event) {
    event.stopPropagation();
    if (!$(this).is(':focus')) {
      There.fsCommand('getKeyboardFocus');
      $(this).focus();
    }
    if (event.key == 'Escape') {
      $(this).val('');
      There.renderEmotes('');
    }
  }).on('input', function() {
    // re-render when typing pauses, not every keystroke
    const v = $(this).val();
    There.setNamedTimer('emote-search', 120, function() {
      There.renderEmotes(v);
    });
  });

  // mini-player controls. stop mousedown so clicks don't drag the dock
  $('.miniplayer').on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.miniplayer .mpbtn[data-id="play"]').on('click', function() {
    YtMusic.togglePlay();
    There.setNamedTimer('np-refresh', 250, There.refreshNowPlaying);
  });
  $('.miniplayer .mpbtn[data-id="next"]').on('click', function() {
    YtMusic.next(false);
  });
  $('.miniplayer .mpbtn[data-id="prev"]').on('click', function() {
    YtMusic.prev();
  });
  $('.miniplayer .mpbtn[data-id="open"]').on('click', function() {
    if (There.data.panel != 'music') {
      There.togglePanel('music');
    }
  });

  // message bar auto-accepted an Action Mode prompt (e.g. gun out), so Action
  // Mode may have changed behind our back. re-read it
  window.addEventListener('storage', function(event) {
    // the headless volume window reporting its levels
    if (event.key == 'tmui-vol') {
      let st = null;
      try {
        st = JSON.parse(event.newValue || 'null');
      } catch (error) {
      }
      There.onVolState(st);
      return;
    }
    // the headless ChangeMe engine: a spa unlock pulls the DNA tab up
    if (event.key == 'tmui-dna') {
      let st = null;
      try {
        st = JSON.parse(event.newValue || 'null');
      } catch (error) {
      }
      // the shim finished a save we asked for
      if (st && st.saveResult && There.data.dnaSaveCb && st.saveResult.at >= There.data.dnaSaveStart) {
        const pending = There.data.dnaSaveCb;
        There.data.dnaSaveCb = null;
        There.clearNamedTimer('dna-save-timeout');
        There.data.dnaDirty = !st.saveResult.ok;
        pending(st.saveResult.ok, st.saveResult.ok ? '' : 'game said no: ' + (st.saveResult.raw || 'no detail'));
      }
      const wasAlive = Date.now() - (There.data.dnaAliveAt || 0) < 6000;
      if (st && st.open) {
        There.data.dnaAliveAt = st.at;
      }
      // the window just opened (ChangeMe menu or a spa): the dock takes over.
      // a new boot id is the real signal; the liveness gap is only a fallback
      // for an old shim, because hidden pages get their timers throttled and a
      // late heartbeat must not yank the player back to the wardrobe
      const justOpened = st && st.open &&
        (st.boot ? There.data.dnaBootSeen != st.boot : !wasAlive);
      if (st && st.boot && st.open) {
        There.data.dnaBootSeen = st.boot;
      }
      if (justOpened) {
        There.playSound('menu item activate');
        if (st.treatments) {
          There.data.wardrobeTab = 'dna';
        }
        if (There.data.panel != 'wardrobe') {
          There.togglePanel('wardrobe');
        } else {
          There.renderWardrobeTabs();
          There.loadWardrobe(There.data.wardrobeTab);
        }
      } else if (st && st.open && st.treatments && !There.data.dnaAnnounced) {
        // already open when the spa unlocked: jump to the DNA tab
        There.data.dnaAnnounced = true;
        There.data.wardrobeTab = 'dna';
        if (There.data.panel != 'wardrobe') {
          There.togglePanel('wardrobe');
        } else {
          There.renderWardrobeTabs();
          There.loadWardrobe('dna');
        }
      }
      if (st && (!st.open || !st.treatments)) {
        There.data.dnaAnnounced = false;
      }
      // the player stepped off the spa platform: a new leave request must pull
      // the DNA tab back to the front so the save / leave prompt is actually
      // seen, wherever they navigated to in the meantime
      if (st && st.leaveAsk && There.data.dnaLeaveSeen != st.leaveAsk) {
        const fresh = Date.now() - st.leaveAsk < 25000;
        const needPrompt = There.data.dnaDirty;
        if (fresh && needPrompt) {
          if (There.data.panel != 'wardrobe' || There.data.wardrobeTab != 'dna') {
            There.data.wardrobeTab = 'dna';
            if (There.data.panel != 'wardrobe') {
              There.togglePanel('wardrobe');
            } else {
              There.renderWardrobeTabs();
              There.loadWardrobe('dna');
            }
          }
        } else if (fresh && !needPrompt) {
          // nothing to save, just release them
          There.data.dnaLeaveSeen = st.leaveAsk;
          There.dnaLeaveNow();
        }
      }
      if (There.data.panel == 'wardrobe' && There.data.wardrobeTab == 'dna') {
        There.updateDnaGate();
      }
      return;
    }
    // message bar saw something (purchase, gift, trade...): sync shortly
    if (event.key == 'tmui-msg-activity' && There.data.syncStarted) {
      There.setNamedTimer('activity-sync', 1500, function() {
        There.incrementalSync();
      });
    }
    if (event.key == 'tmui-actionmode-accepted') {
      There.setNamedTimer('actionmode-accepted', 800, There.refreshActionMode);
    }
  });

  // keep the play/pause glyph in sync while open
  setInterval(function() {
    if (There.data.panel == 'music') {
      There.refreshNowPlaying();
    }
  }, 1500);

  // Themed tooltips. Browser `title` tooltips can't be styled, so on hover we move
  // the title into our .tmtip box and put it back on leave. Code that changes titles
  // later (status light etc) still works. Delegated, so new elements get it too.
  $(document).on('mouseover', '[title]', function() {
    const el = this;
    const text = el.getAttribute('title');
    if (!text) {
      return;
    }
    el.setAttribute('data-tmtip', text);
    el.removeAttribute('title');
    There.data.tipEl = el;
    There.setNamedTimer('tmtip', 350, function() {
      if (There.data.tipEl !== el) {
        return;
      }
      const tip = $('.tmtip')[0];
      tip.textContent = text;
      tip.setAttribute('data-active', '1');
      // above if there's room, else below, clamped to the window
      const r = el.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      let x = r.left + r.width / 2 - tw / 2;
      let y = r.top - th - 6;
      if (y < 2) {
        y = r.bottom + 6;
      }
      x = Math.max(4, Math.min(x, window.innerWidth - tw - 4));
      y = Math.max(2, Math.min(y, window.innerHeight - th - 2));
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
      There.syncWindowShape();
    });
  }).on('mouseout', '[data-tmtip]', function(event) {
    // ignore moves between the element's own children
    if (event.relatedTarget && this.contains(event.relatedTarget)) {
      return;
    }
    const text = this.getAttribute('data-tmtip');
    this.removeAttribute('data-tmtip');
    if (text && !this.hasAttribute('title')) {
      this.setAttribute('title', text);
    }
    if (There.data.tipEl === this) {
      There.data.tipEl = null;
    }
    There.clearNamedTimer('tmtip');
    $('.tmtip').attr('data-active', '0');
    There.syncWindowShape();
  }).on('mousedown', function() {
    There.clearNamedTimer('tmtip');
    $('.tmtip').attr('data-active', '0');
    There.syncWindowShape();
  });

  // fill [data-icon] elements with their inline SVG (monochrome via currentColor, see icons.js)
  $('[data-icon]').each(function() {
    try {
      this.innerHTML = tmuiIcon($(this).attr('data-icon'));
    } catch (error) {
    }
  });

  // apply saved view prefs + Quick Bar state on DOM ready (re-applied with that
  // avatar's prefs once the doid arrives)
  There.applyViewPrefs();
  There.setQuickBarOpen(There.prefs().quickOpen);
});
