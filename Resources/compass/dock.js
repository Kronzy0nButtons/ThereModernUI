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
    { id: 'groups', name: 'Groups', group: 'main' },
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

    // newer release out? a strip at the top of the pill says so until it's
    // installed; the dock stays usable (tmui/update.js)
    if (typeof TmuiUpdate != 'undefined') {
      // the version in About opens the notes for the version you have
      $('.appvernum').text('v' + TmuiUpdate.version).attr('title', 'What\'s in this version').on('click', function() {
        There.showReleaseNotes(TmuiUpdate.version);
      }).on('mousedown', function(event) {
        event.stopPropagation();
      });
      $('.updatebar .ubget').on('click', There.startUpdate);
      $('.updatebar .ubnotes, .updatebar .ubtext').on('click', There.showReleaseNotes);
      // a mousedown on the pill drags the dock: the links keep theirs
      $('.updatebar .ublink, .updatebar .ubtext').on('mousedown', function(event) {
        event.stopPropagation();
      });
      TmuiUpdate.onChecked = There.renderUpdateNote;
      TmuiUpdate.start(There.renderUpdateBar);
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
    if (name == 'there_windowwidth' || name == 'there_windowheight') {
      // the teleport screen sizes itself from this when the game doesn't
      // tell it directly
      try {
        localStorage.setItem('tmui-window', JSON.stringify({
          w: Number(There.variables.there_windowwidth || 0),
          h: Number(There.variables.there_windowheight || 0),
        }));
      } catch (error) {
      }
    }
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
    // WebView2 serves the client's folders itself: files no longer pass
    // through the game's thread at all
    if (name == 'tmui_vhost') {
      There.data.vhost = true;
      if (typeof TmuiMaps != 'undefined') {
        TmuiMaps.base = 'https://tmui.res/Resources/compass/';
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
    // the mouse buttons while driving. in a buggy, boat or hoverpack the
    // right button held is boost; on a board or bike the right button jumps
    // and the left one fires a boost burst that runs on after the click
    if (name == 'tmui_rmb') {
      if (!There.boostTankRide()) {
        $('.speedo').attr('data-boost', value == '1' ? '1' : '0');
      }
      return;
    }
    if (name == 'tmui_lmb') {
      // the boost tank (boards and bikes) drains while this is held
      There.data.lmbDown = value == '1';
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
    // the DLL can fetch our newest setup and run it (tmuiUpdate)
    if (name == 'tmui_updater') {
      There.data.updater = value == '1';
      There.renderUpdateBar();
      return;
    }
    if (name == 'tmui_update') {
      There.onUpdateProgress(value);
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
      const hNew = Number(value) || 0;
      const hNow = performance.now();
      // the engine sends the heading about three times a second. keep the
      // last two with their spacing: the GPS glides from one to the next
      const hs = There.data.hdg || (There.data.hdg = { at: 0, ms: 0, prev: hNew, cur: hNew });
      if (hs.at) {
        const dt = hNow - hs.at;
        if (dt > 10) {
          hs.ms = hs.ms ? hs.ms * 0.7 + dt * 0.3 : dt;
        }
      }
      hs.prev = hs.cur;
      hs.cur = hNew;
      hs.at = hNow;
      There.data.heading = hNew;
      if (!There.data.headingPending) {
        There.data.headingPending = true;
        requestAnimationFrame(There.paintHeading);
      }
      return;
    }
    if (name == 'there_teleporting') {
      if (value == '1') {
        There.data.teleportSeenAt = Date.now();
      }
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
  // boards and bikes carry a boost tank: holding the left button spends it
  // (a second from full), letting go refills it (1.7 seconds from empty,
  // nothing refills while the button is down). Only in Action Mode
  BOOST_TANK_S: 1.0,
  BOOST_REFILL_S: 1.7,
  SEAT_EXIT: /^(get (out|off|up off)|dismount|unmount|exit|eject|disembark|leave (the )?(vehicle|seat|boat|buggy|bike|board)|hop off|climb (off|out)|jump off|stand up from)\b/i,
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
    // (the clothing sync used to hold the gauge back too; its reads now go
    // through the request queue while the gauge's own skip the line)
    if (!doid || !There.data.cockpitUp || !There.prefs().speedo ||
        There.data.sweep || There.data.mapWaiters) {
      There.speedoNote(!doid ? 'no doid' : !There.data.cockpitUp ? 'bridge down' : !There.prefs().speedo ? 'disabled' : 'dock busy');
      There.setSpeedo(false);
      There.setNamedTimer('speedo', 5000, There.speedoTick);
      return;
    }
    There.menuKids(`/thobs/${doid}/presence0/interactions`, function(names) {
      // the way out of a seat differs by vehicle: cars say Get Out, boards
      // Get Off, others Dismount, Exit, Eject and so on
      const exitName = (names || []).find(n => There.SEAT_EXIT.test(n)) || '';
      const seated = !!exitName;
      There.data.seatNames = seated ? (names || []).slice() : null;
      There.data.seatKind = !seated ? null : /^(get off|get up off|dismount|unmount|hop off|climb off|jump off|leave (the )?(bike|board))/i.test(exitName) ? 'on' : 'in';
      There.speedoNote(names == null ? 'read failed' : (seated ? `seated (${(names || []).join('/')})` : `on foot (${(names || []).join('/') || 'none'})`));
      if (!seated) {
        There.data.speedoSeatStreak = 0;
        // the engine cuts: spin the needle down before the gauge goes
        There.speedoShutdown();
        There.data.speedoPrev = null;
        There.data.speedoEma = 0;
        There.data.speedoVeh = null;
        There.data.vehKind = null;
        There.data.vehNote = null;
        There.data.vehPending = false;
        There.data.vehPack = false;
        There.clearNamedTimer('veh-pending');
        $('.speedo').attr('data-vehkind', '').attr('data-vehpending', '');
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
          // what the vehicle is: its thob's properties, read once per ride.
          // a ride seen before is known at once; a new one shows "linking"
          // until the reads come back (or four seconds, whichever first)
          There.data.vehKids = null;
          There.data.vehProps = {};
          const known = veh ? There.vehKinds()[veh] : undefined;
          if (known !== undefined) {
            There.data.vehKind = known || null;
            There.vehResolved();
          } else {
            There.data.vehPending = true;
            $('.speedo').attr('data-vehpending', veh ? '1' : '');
            There.setNamedTimer('veh-pending', 4000, There.vehResolved);
          }
          There.classifyVehicle();
          if (veh) {
            There.readVehicle(veh);
          }
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
    if (on) {
      There.preloadMaps();
    }
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
        // keep it on screen whatever was saved: the cluster has grown since
        // some spots were saved, and a bad save could park it off the edge
        const el = $('.speedo')[0];
        const w = el ? el.getBoundingClientRect().width || 240 : 240;
        const h = el ? el.getBoundingClientRect().height || 170 : 170;
        const r = Math.min(pos.r, Math.max(2, window.innerWidth - w - 2));
        const b = Math.min(pos.b, Math.max(2, window.innerHeight - h - 2));
        $('.speedo').css({ right: `${r}px`, bottom: `${b}px` });
        return;
      }
    } catch (error) {
    }
    // no saved spot yet: the stylesheet's default, above the dock's right half
    $('.speedo').css({ right: '', bottom: '' });
  },

  saveSpeedoPos: function() {
    const el = $('.speedo')[0];
    if (!el) {
      return;
    }
    const r = el.getBoundingClientRect();
    // a hidden gauge measures as nothing at the corner: saving that would
    // park it off screen for good
    if (r.width < 2 || r.height < 2) {
      return;
    }
    try {
      localStorage.setItem('dock.speedopos', JSON.stringify({
        r: Math.max(0, Math.round(window.innerWidth - r.right)),
        b: Math.max(0, Math.round(window.innerHeight - r.bottom)),
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
    // pitch: how steeply the last stretch climbed or fell (the raw position
    // against the one before it, up being away from the planet's centre)
    const prev = There.data.speedoPrev;
    if (prev && prev.p) {
      const r = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1] + pos[2] * pos[2]) || 1;
      const up = [pos[0] / r, pos[1] / r, pos[2] / r];
      const d = [pos[0] - prev.p[0], pos[1] - prev.p[1], pos[2] - prev.p[2]];
      const rise = d[0] * up[0] + d[1] * up[1] + d[2] * up[2];
      const horiz = Math.sqrt(Math.max(0, d[0] * d[0] + d[1] * d[1] + d[2] * d[2] - rise * rise));
      // only a real stretch of travel says anything about the slope; a hover
      // bobbing on the spot would read as a dive. the angle is halved (the
      // world's slopes are gentle and the bodywork smooths them) and averaged
      // across samples before the display sees it
      if (horiz > 4) {
        const raw = Math.atan2(rise, horiz) * 180 / Math.PI * 0.5;
        const pitch = Math.max(-18, Math.min(18, raw));
        There.data.aiPitchTarget = (There.data.aiPitchTarget || 0) * 0.6 + pitch * 0.4;
      } else {
        There.data.aiPitchTarget = (There.data.aiPitchTarget || 0) * 0.7;
      }
    }
    // the same ground distance per screen pixel on every island: zoom by the
    // map's own scale
    const r = TmuiMaps.region(at.id);
    // the island's own scale, times the player's zoom (the + and - buttons)
    const z = (r ? Math.max(1.4, Math.min(6, r.sx / 40)) : 2.5) * There.gpsZoomMul();
    const g = There.data.gps;
    const now = performance.now();
    if (!g || g.src != at.src) {
      // a different map: jump straight there, no slide across the sea. the
      // drawing is decoded first so the swap doesn't stall the needle
      There.data.gps = {
        src: at.src, x: at.px, y: at.py, z: z, tx: at.px, ty: at.py, tz: z, h: There.data.heading || 0,
        sx: at.px, sy: at.py, st: now, vx: 0, vy: 0,
      };
      $('.gpsname').text(at.name);
      There.mapImageReady(at.src, function() {
        if (There.data.gps && There.data.gps.src == at.src) {
          $('.gpsimg').attr('src', at.src);
        }
      });
    } else {
      // samples come a few times a second: keep the speed between them (map
      // pixels per second) so the frames in between can carry on moving
      const dt = (now - g.st) / 1000;
      if (dt > 0.05) {
        const vx = (at.px - g.sx) / dt;
        const vy = (at.py - g.sy) / dt;
        g.vx = g.vx * 0.3 + vx * 0.7;
        g.vy = g.vy * 0.3 + vy * 0.7;
      }
      g.ms = g.ms ? g.ms * 0.7 + (now - g.st) * 0.3 : now - g.st;
      g.sx = at.px;
      g.sy = at.py;
      g.st = now;
      g.tz = z;
    }
  },

  /* the map drawings are vector files with thousands of curves: decoding one
     takes a moment, so they're decoded ahead of time (all of them once the
     speedometer comes up) and a swap waits for the decode */
  mapImageReady: function(src, cb) {
    There.data.mapImages = There.data.mapImages || {};
    let img = There.data.mapImages[src];
    if (!img) {
      img = new Image();
      img.decoding = 'async';
      img.src = src;
      There.data.mapImages[src] = img;
    }
    const done = function() {
      if (cb) {
        cb();
      }
    };
    if (img.decode) {
      img.decode().then(done, done);
    } else if (img.complete) {
      done();
    } else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  },

  preloadMaps: function() {
    if (There.data.mapsPreloaded || typeof TmuiMaps == 'undefined') {
      return;
    }
    There.data.mapsPreloaded = true;
    const names = TmuiMaps.REGIONS.map(r => r.id).concat(['global', 'world']);
    // one at a time, so the dock stays responsive while they decode
    const step = function(i) {
      if (i >= names.length) {
        return;
      }
      There.mapImageReady(`${TmuiMaps.base}maps/${names[i]}.svg`, function() {
        setTimeout(function() {
          step(i + 1);
        }, 150);
      });
    };
    step(0);
  },

  // what the GPS is working with, once a second, into the Settings status
  // line: position samples, heading updates and the dock's own frame rate
  gpsStats: function(g) {
    const now = performance.now();
    const st = There.data.gpsStat || (There.data.gpsStat = { frames: 0, at: now });
    st.frames++;
    if (now - st.at < 1000) {
      return;
    }
    const fps = Math.round(st.frames * 1000 / (now - st.at));
    st.frames = 0;
    st.at = now;
    const hs = There.data.hdg || {};
    const el = $('.speedo')[0];
    const r = el ? el.getBoundingClientRect() : null;
    const box = r ? `, gauge at ${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)} in ${window.innerWidth}x${window.innerHeight}` : '';
    There.data.gpsNote = `${fps} fps, position every ${Math.round(g.ms || 0)} ms, heading every ${Math.round(hs.ms || 0)} ms${box}`;
    if (There.data.panel == 'settings') {
      There.updateSyncStatus();
    }
  },

  // the heading tape: built once (three turns of the compass, so it can
  // wrap), then slid so the heading sits under the centre mark
  GPS_TAPE_PX: 1.4,

  gpsTape: function(h) {
    const inner = $('.gpstapeinner');
    if (!inner.length) {
      return;
    }
    const k = There.GPS_TAPE_PX;
    if (!inner.children().length) {
      const names = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      let html = '';
      for (let deg = -360; deg < 720; deg += 10) {
        const x = (deg + 360) * k;
        html += `<div class="gpstick" data-major="${deg % 30 == 0 ? 1 : 0}" style="left:${x.toFixed(1)}px"></div>`;
      }
      // the points of the compass every 45 degrees, each on its own major tick
      for (let deg = -360; deg < 720; deg += 45) {
        const x = (deg + 360) * k;
        const name = names[(((deg % 360) + 360) % 360) / 45];
        html += `<div class="gpstick" data-major="1" style="left:${x.toFixed(1)}px"></div>`;
        html += `<div class="gpstlabel" data-card="${name.length == 1 ? 1 : 0}" style="left:${x.toFixed(1)}px">${name}</div>`;
      }
      $(inner).html(html).css('width', `${1080 * k}px`);
    }
    const width = $('.gpstape').width() || 182;
    const x = width / 2 - (h + 360) * k;
    inner.css('transform', `translateX(${x.toFixed(2)}px)`);
    const rounded = Math.round(h) % 360;
    if (rounded != There.data.gpsDegShown) {
      There.data.gpsDegShown = rounded;
      const names = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      $('.gpsdeg').text(`${String(rounded).padStart(3, '0')}\u00B0`);
      $('.gpscard').text(names[Math.round(rounded / 45) % 8]);
    }
  },

  // the housing's silhouette: the GPS bezel's box joined to a circle round
  // the tacho, measured off the layout so it always fits. a 1px larger copy
  // underneath is the outline
  drawSpeedoHousing: function() {
    const root = $('.speedo')[0];
    const bez = $('.speedo .gpsbezel')[0];
    const dial = $('.speedo .spdgauge')[0];
    const svg = $('.speedo .spdhousing')[0];
    if (!root || !bez || !dial || !svg) {
      return;
    }
    const R = root.getBoundingClientRect();
    const B = bez.getBoundingClientRect();
    const D = dial.getBoundingClientRect();
    // the N2O dial's face: the housing wraps it too
    const face = $('.speedo .sbface')[0];
    const N = face ? face.getBoundingClientRect() : null;
    const key = [$(root).attr('data-gpsopen') == '1' ? 1 : 0, R.width, R.height, B.left - R.left, B.top - R.top, B.width, B.height, D.left - R.left, D.top - R.top, D.width,
      N ? N.left - R.left : 0, N ? N.top - R.top : 0, N ? N.width : 0].map(v => Math.round(v)).join(',');
    if (There.data.housingKey == key) {
      return;
    }
    There.data.housingKey = key;
    const w = Math.ceil(R.width);
    const h = Math.ceil(R.height);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const bx = B.left - R.left;
    const by = B.top - R.top;
    // the circle hugs the dial's face with the same thin rim the screen has
    const F = ($('.speedo .sgface')[0] || dial).getBoundingClientRect();
    const cx = F.left - R.left + F.width / 2;
    const cy = F.top - R.top + F.height / 2;
    const cr = F.width / 2 + 7;
    const shape = function(grow) {
      const x = bx - grow;
      const y = by - grow;
      const bw = B.width + grow * 2;
      const bh = B.height + grow * 2;
      const rad = 16 + grow;
      const r = cr + grow;
      // the box (rounded on the left) runs on to the circle's centre line,
      // so its bottom edge meets the circle at the tangent and the two merge;
      // two subpaths with the same winding fill as one
      const box = `M${x + rad} ${y} H${cx} V${y + bh} H${x + rad} A${rad} ${rad} 0 0 1 ${x} ${y + bh - rad} V${y + rad} A${rad} ${rad} 0 0 1 ${x + rad} ${y} Z`;
      const circle = `M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy} Z`;
      // a smaller ring round the N2O dial, overlapping the big one so the
      // three fill as one shape
      let n2o = '';
      if (N && N.width > 0) {
        const nx = N.left - R.left + N.width / 2;
        const ny = N.top - R.top + N.height / 2;
        const nr = N.width / 2 + 6 + grow;
        n2o = `M${nx + nr} ${ny} A${nr} ${nr} 0 1 1 ${nx - nr} ${ny} A${nr} ${nr} 0 1 1 ${nx + nr} ${ny} Z`;
      }
      return box + circle + n2o;
    };
    // the map wraps the dial: the screen runs on under it to the dial's
    // centre line and its right edge is cut along a circle just outside the
    // dial's face. --wing is how far it runs past its own box, so what sits
    // in the screen (car, tape, HUD) can stay centred on the main part
    const scr = $('.speedo .gpsscreen')[0];
    const rim = $('.speedo .spdrim')[0];
    const open = $(root).attr('data-gpsopen') == '1';
    if (scr && rim) {
      const S = scr.getBoundingClientRect();
      // the screen's own box, from the bezel (padding 7 left, 10 right)
      const sl = B.left - R.left + 7;
      const st = S.top - R.top;
      const ownRight = B.left - R.left + B.width - 10;
      const sh = S.height;
      const fr = F.width / 2;
      const kr = fr + 5;
      const wing = open ? Math.max(0, cx - ownRight) : 0;
      root.style.setProperty('--wing', `${wing.toFixed(1)}px`);
      rim.setAttribute('width', w);
      rim.setAttribute('height', h);
      rim.setAttribute('viewBox', `0 0 ${w} ${h}`);
      // where the cut circle crosses the screen's top and bottom edges
      const ccx = cx - sl;
      const ccy = cy - st;
      const crossAt = y => ccx - Math.sqrt(Math.max(0, kr * kr - (y - ccy) * (y - ccy)));
      const reaches = kr > Math.abs(ccy) && kr > Math.abs(sh - ccy);
      const r9 = 9;
      let d = '';
      if (open && wing > 0 && reaches) {
        const xt = crossAt(0);
        const xb = crossAt(sh);
        d = `M${r9} 0 H${xt.toFixed(1)} A${kr} ${kr} 0 0 0 ${xb.toFixed(1)} ${sh} H${r9} A${r9} ${r9} 0 0 1 0 ${sh - r9} V${r9} A${r9} ${r9} 0 0 1 ${r9} 0 Z`;
        scr.style.clipPath = `path("${d}")`;
        // the outline in the root's coordinates, above the screen
        const dr = d.replace(/([MHVA])([^MHVAZ]*)/g, function(all, cmd, args) {
          const n = args.trim().split(/[\s,]+/).map(Number);
          if (cmd == 'H') {
            return `H${(n[0] + sl).toFixed(1)} `;
          }
          if (cmd == 'V') {
            return `V${(n[0] + st).toFixed(1)} `;
          }
          if (cmd == 'M') {
            return `M${(n[0] + sl).toFixed(1)} ${(n[1] + st).toFixed(1)} `;
          }
          // A rx ry rot large sweep x y
          return `A${n[0]} ${n[1]} ${n[2]} ${n[3]} ${n[4]} ${(n[5] + sl).toFixed(1)} ${(n[6] + st).toFixed(1)} `;
        });
        $(rim).find('.srscreen').attr('d', dr);
        $(rim).find('.srshine').attr('d', `M${(sl + r9).toFixed(1)} ${(st + 1).toFixed(1)} H${(sl + crossAt(1) - 2).toFixed(1)}`);
        // + and - lie on the map in its two wrapped corners, beside the curve
        // the three buttons follow the curve: zoom in and out in the corners,
        // the 3D/2D switch halfway down
        const place = function(id, y) {
          $(`.speedo .gpsside[data-id="${id}"]`).css({ left: `${(sl + crossAt(y) - 15).toFixed(1)}px`, top: `${(st + y).toFixed(1)}px` });
        };
        place('zoomin', 15);
        place('dim', sh / 2);
        place('zoomout', sh - 15);
        // the strip under the map runs on to where the map's bottom edge ends
        root.style.setProperty('--stripwing', `${Math.max(0, xb - (ownRight - sl) - 6).toFixed(1)}px`);
        $(root).attr('data-wrapped', '1');
      } else {
        scr.style.clipPath = '';
        $(rim).find('path').attr('d', '');
        $(root).attr('data-wrapped', '');
      }
    }
    $(svg).find('.shedge').attr('d', shape(1));
    $(svg).find('.shbody').attr('d', shape(0));
    // a hairline of light along the top edges
    $(svg).find('.shshine').attr('d', `M${bx + 16} ${by + 1} H${Math.min(bx + B.width, cx - cr + 6)} M${cx - cr * 0.7} ${cy - cr * 0.71 + 1} A${cr - 1} ${cr - 1} 0 0 1 ${cx + cr * 0.7} ${cy - cr * 0.71 + 1}`);
  },

  // the attitude indicator: pitch from the climb rate, bank the way a
  // coordinated turn would bank (speed times turn rate against gravity)
  gpsAttitude: function(g, hs) {
    const pitchWant = There.data.aiPitchTarget || 0;
    g.pitch = (g.pitch || 0) + (pitchWant - (g.pitch || 0)) * 0.06;
    let rate = 0;
    if (hs && hs.ms) {
      rate = (((hs.cur - hs.prev + 540) % 360) - 180) / (hs.ms / 1000);
    }
    const mph = (There.data.speedoShown || 0) * 0.621;
    const v = mph * 0.447;
    const bankWant = Math.max(-40, Math.min(40, Math.atan(v * rate * Math.PI / 180 / 9.81) * 180 / Math.PI));
    g.bank = (g.bank || 0) + (bankWant - (g.bank || 0)) * 0.1;
    // 2.2 screen units per degree: 10 degrees is one rung of the ladder;
    // the clamp on the measurement keeps the horizon on the screen
    const pitchPx = g.pitch * 2.2;
    $('.speedo .aihorizon').css('transform', `rotate(${(-g.bank).toFixed(2)}deg) translate(0px, ${pitchPx.toFixed(2)}px)`);
    $('.speedo .aibank').css('transform', `rotate(${(-g.bank).toFixed(2)}deg)`);
  },

  // each zoom step is about a third more (or less) of the map
  gpsZoomMul: function() {
    return Math.pow(1.35, There.prefs().gpsZoom || 0);
  },

  gpsZoomStep: function(dir) {
    const p = There.prefs();
    const next = Math.max(-3, Math.min(4, (p.gpsZoom || 0) + dir));
    if (next == (p.gpsZoom || 0)) {
      return;
    }
    p.gpsZoom = next;
    There.savePrefs();
    There.playSound('control down');
    // the frame eases to the new scale on its own
    const g = There.data.gps;
    if (g) {
      g.tz = g.tz / Math.pow(1.35, next - dir) * Math.pow(1.35, next);
    }
    There.applyGpsView();
  },

  applyGpsView: function() {
    const p = There.prefs();
    $('.speedo').attr('data-gpsflat', p.gpsFlat ? '1' : '');
    $('.gpsdim').text(p.gpsFlat ? '2D' : '3D');
    $('.gpsctlbtn[data-id="zoomin"]').attr('data-off', (p.gpsZoom || 0) >= 4 ? '1' : '');
    $('.gpsctlbtn[data-id="zoomout"]').attr('data-off', (p.gpsZoom || 0) <= -3 ? '1' : '');
  },

  // knots on the water, mph everywhere else
  speedUnits: function() {
    const k = There.data.vehKind;
    return k == 'boat' || k == 'air' ? { f: 0.868976, label: 'kn' } : { f: 1, label: 'mph' };
  },

  // the vehicle's thob, one level down: edprops and state hold its
  // properties, and the ones that look like a name or a type are read for
  // their values. a few requests, once per ride
  readVehicle: function(veh) {
    const want = /name|title|label|model|desc|type|kind|class|product/i;
    let budget = 8;
    There.menuKids(`/thobs/${veh}`, function(kids) {
      if (There.data.speedoVeh != veh) {
        return;
      }
      There.data.vehKids = kids || [];
      There.classifyVehicle();
      for (const branch of ['edprops', 'state']) {
        if (!There.data.vehKids.includes(branch)) {
          continue;
        }
        There.menuKids(`/thobs/${veh}/${branch}`, function(leaves) {
          if (There.data.speedoVeh != veh) {
            return;
          }
          for (const leaf of (leaves || [])) {
            if (!want.test(leaf) || budget <= 0) {
              continue;
            }
            budget--;
            There.fetch({
              path: '/ScriptHook/Get',
              query: { Path: `/thobs/${veh}/${branch}/${leaf}/value` },
              dataType: 'xml',
              success: function(xml) {
                if (There.data.speedoVeh != veh) {
                  return;
                }
                let v = '';
                try {
                  v = (xml.getElementsByTagName('Value')[0] || {}).textContent || '';
                } catch (error) {
                }
                v = String(v).replace(/\s+/g, ' ').trim().slice(0, 60);
                if (v) {
                  There.data.vehProps[`${branch}/${leaf}`] = v;
                  There.classifyVehicle();
                  // the catalog knows the product: name, blurb and category
                  if (/productId/i.test(leaf) && /^\d+$/.test(v)) {
                    There.webappsFetch(`catalog/product?id=${v}`, function(cat) {
                      if (!cat || There.data.speedoVeh != veh) {
                        return;
                      }
                      const t = function(tag) {
                        return (There.xmlText(cat, tag) || '').replace(/\s+/g, ' ').replace(/^"|"$/g, '').trim();
                      };
                      const cats = Array.from(cat.getElementsByTagName('HierName')).map(n => n.textContent.trim()).filter(Boolean);
                      const line = [t('LongName') || t('ShortName'), t('ShortDescription'), t('LongDescription'), cats.join('/')].filter(Boolean).join(' | ');
                      if (line) {
                        There.data.vehProps.catalog = line.slice(0, 160);
                        There.classifyVehicle();
                      }
                      There.vehResolved();
                    });
                  }
                }
              },
            });
          }
        });
      }
    });
  },

  // what each vehicle turned out to be, by its id and by its product, so the
  // next ride on it is known the moment you sit down
  vehKinds: function() {
    if (!There.data.vehKindsMap) {
      try {
        There.data.vehKindsMap = JSON.parse(localStorage.getItem('dock.vehkinds') || '{}') || {};
      } catch (error) {
        There.data.vehKindsMap = {};
      }
    }
    return There.data.vehKindsMap;
  },

  rememberVehicle: function(kind) {
    const map = There.vehKinds();
    if (There.data.speedoVeh) {
      map[There.data.speedoVeh] = kind || null;
      if (There.data.vehPack) {
        map[`pack${There.data.speedoVeh}`] = true;
      }
    }
    const pid = (There.data.vehProps || {})['edprops/productId'];
    if (pid) {
      map[`p${pid}`] = kind || null;
    }
    try {
      localStorage.setItem('dock.vehkinds', JSON.stringify(map));
    } catch (error) {
    }
  },

  // the reads are in (or we've waited long enough): settle the instruments
  vehResolved: function() {
    There.clearNamedTimer('veh-pending');
    if (!There.data.vehPending && $('.speedo').attr('data-vehpending') != '1') {
      return;
    }
    There.data.vehPending = false;
    $('.speedo').attr('data-vehpending', '');
    There.rememberVehicle(There.data.vehKind);
  },

  // what we know about the ride: the seat's actions, the vehicle's thob and
  // its named properties. a boat shows itself somewhere in there
  classifyVehicle: function() {
    const props = There.data.vehProps || {};
    const words = [].concat(There.data.seatNames || [], There.data.vehKids || [], Object.values(props)).join(' ');
    // flyers and boats both read in knots and get the attitude HUD
    let kind = null;
    if (/\b(boat|hoverboat|anchor|sail|hull|yacht|canoe|jet ?ski|skiff|raft|watercraft)\b/i.test(words)) {
      kind = 'boat';
    } else if (/\b(fly|flyer|flying|flies|skies|sky|hoverpack|jet ?pack|glider|balloon|helicopter|plane|aircraft|wings|flutterbug|airship)\b/i.test(words)) {
      kind = 'air';
    }
    There.data.vehPack = /\b(hover ?pack|jet ?pack)s?\b/i.test(words) || !!(There.data.speedoVeh && There.vehKinds()[`pack${There.data.speedoVeh}`]);
    There.data.vehKind = kind;
    // the attitude HUD is for the water and the air, not buggies
    $('.speedo').attr('data-vehkind', There.data.vehKind || '');
    // a product seen before settles it straight away
    const pid = props['edprops/productId'];
    if (There.data.vehPending && pid && There.vehKinds()[`p${pid}`] !== undefined) {
      There.data.vehKind = There.vehKinds()[`p${pid}`] || null;
      $('.speedo').attr('data-vehkind', There.data.vehKind || '');
      There.vehResolved();
    } else if (There.data.vehPending && kind) {
      There.vehResolved();
    }
    const shown = Object.keys(props).map(k => `${k}=${props[k]}`).join(', ');
    There.data.vehNote = `${There.data.speedoVeh || '?'} [${(There.data.vehKids || []).join('/') || 'no props read'}]${shown ? ' {' + shown + '}' : ''}${There.data.vehKind ? ' = ' + There.data.vehKind : ''}`;
    There.updateSyncStatus();
  },

  gpsFrame: function() {
    const g = There.data.gps;
    if (!g || !There.prefs().gps || !There.prefs().gpsOpen) {
      return;
    }
    // between samples the map keeps going at the last known speed (dead
    // reckoning, capped so a lost sample can't run away), and each real
    // sample pulls it gently back onto the line. stopped means stopped
    const moving = (There.data.speedoTarget || 0) > 1;
    if (!moving) {
      g.vx = 0;
      g.vy = 0;
    }
    const ahead = Math.min(1.0, (performance.now() - (g.st || 0)) / 1000);
    g.tx = g.sx + g.vx * ahead;
    g.ty = g.sy + g.vy * ahead;
    g.x += (g.tx - g.x) * 0.08;
    g.y += (g.ty - g.y) * 0.08;
    g.z += (g.tz - g.z) * 0.1;
    const half = There.GPS_PLANE / 2;
    // the heading arrives in steps from the engine: turn toward it the short
    // way round, a little each frame, so the map swings instead of snapping
    // the heading comes in steps (about three a second): show the previous
    // one gliding to the newest over the usual gap, so a turn is a steady
    // swing a beat behind rather than a snap at every update
    const hs = There.data.hdg;
    let want = There.data.heading || 0;
    if (hs && hs.at && hs.ms) {
      const f = Math.min(1, (performance.now() - hs.at) / Math.max(120, hs.ms));
      const d = ((hs.cur - hs.prev + 540) % 360) - 180;
      want = hs.prev + d * f;
    }
    if (g.h == null) {
      g.h = want;
    }
    // a tight follow now: the target itself is already smooth
    const turn = ((want - g.h + 540) % 360) - 180;
    g.h = (g.h + turn * 0.35 + 360) % 360;
    const h = g.h;
    There.gpsTape(h);
    There.gpsAttitude(g, hs);
    There.gpsStats(g);
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

  // boards and bikes boost from a tank on the left button. hoverpacks seat
  // you with "Hop Off" like a board, but boost like a buggy: right button
  // held, no limit
  boostTankRide: function() {
    return There.data.seatKind == 'on' && !There.data.vehPack;
  },

  // one frame of the boost tank. the N2O gauge shows the tank: needle and
  // arc follow the level, the glow runs while boost is actually on
  boostTankFrame: function() {
    const now = performance.now();
    let t = There.data.boostTank;
    if (!There.boostTankRide()) {
      // a buggy or boat, or on foot: the right button drives the gauge, the
      // tank's styling comes off
      if (t) {
        There.data.boostTank = null;
        $('.speedo .sbfill, .speedo .sbneedle').attr('style', '');
      }
      return;
    }
    if (!t) {
      t = There.data.boostTank = { level: 1, last: now };
    }
    const dt = Math.min(0.25, (now - t.last) / 1000);
    t.last = now;
    const held = !!There.data.lmbDown && !!There.data.actionMode;
    if (held) {
      t.level = Math.max(0, t.level - dt / There.BOOST_TANK_S);
    } else {
      t.level = Math.min(1, t.level + dt / There.BOOST_REFILL_S);
    }
    const boosting = held && t.level > 0;
    $('.speedo').attr('data-boost', boosting ? '1' : '0');
    // the arc is 106.8 long: empty hides it, full shows it all
    const arc = 106.8;
    $('.speedo .sbfill').attr('style', `stroke-dashoffset:${(arc * (1 - t.level) + 2).toFixed(1)};transition:stroke-dashoffset 80ms linear`);
    $('.speedo .sbneedle').attr('style', `transform:rotate(${(180 * t.level).toFixed(1)}deg);transition:transform 80ms linear`);
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
    // the housing straight away, not once the first GPS fix is in (it
    // only redraws when the layout actually changes)
    There.drawSpeedoHousing();
    There.gpsFrame();
    There.boostTankFrame();
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
    const units = There.speedUnits();
    const rounded = Math.round(mph * units.f);
    if (rounded !== There.data.speedoDigits) {
      There.data.speedoDigits = rounded;
      $('.speedo .spdval').text(rounded);
    }
    if (units.label !== There.data.unitShown) {
      There.data.unitShown = units.label;
      $('.speedo .spdunit').text(units.label);
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
        There.togglePanel('events');
        break;
      }
      case 'groups': {
        There.togglePanel('groups');
        break;
      }
      case 'review': {
        There.togglePanel('reviews');
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
        There.togglePanel('developer');
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
      if (There.data.auSeller) {
        There.loadSellerAuctions();
      } else {
        There.loadAuctionsHome();
      }
    } else if (id == 'places') {
      $('.panel .paneltitle').text('Places');
      There.loadPlaces();
      There.showPlacesTab();
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
    } else if (id == 'reviews') {
      There.loadReviews(false);
    } else if (id == 'developer') {
      There.renderDevTabs();
      There.loadDeveloper(false);
    } else if (id == 'events') {
      There.loadEvents();
    } else if (id == 'profile') {
      There.loadProfile();
    } else if (id == 'web') {
      There.loadSitePage();
    } else if (id == 'groups') {
      There.loadGroups(false);
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
   * Clothing: each item's photo filename is on its About page, which needs
   * the player's login; FlashProxy reads it with the game's own (aboutFetch).
   * Inventory items: the public catalog knows each product's photo by its
   * Product ID (catalogPhoto). No browser window either way; each photo goes
   * into the cards on screen as soon as it's found. */

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

    // skip poids we already have, or know have no photo
    if (!There.poidNeedsPhoto(poid)) {
      s.index++;
      There.setNamedTimer('sweep-next', 0, There.sweepStep);
      return;
    }

    // one at a time, paced
    const item = (There.data.accoutrements || []).find(a => String(a.poid) == String(poid));
    There.findPoidPhoto(poid, item ? item.name : '', function(image, why) {
      const label = item && item.name ? item.name : `item ${poid}`;
      if (image) {
        s.ok = (s.ok || 0) + 1;
      } else if (why.kind == 'none') {
        // the first such item is kept for the footer's Details link
        s.none = (s.none || 0) + 1;
        if (!s.other) {
          s.other = why.short;
          s.otherFull = `${label} (poid ${poid}) ${why.detail}`;
        }
      } else {
        s.failed = (s.failed || 0) + 1;
        if (!s.failWhy) {
          s.failWhy = `${label}: ${why.detail}`;
        }
      }
      s.index++;
      There.setNamedTimer('sweep-next', 250, There.sweepStep);
    });
  },

  // one clothing item's photo: its About page (read with the game's login),
  // then the catalog by Product ID. the photo is stored and put on the cards;
  // cb(image), or cb(null, { kind: 'none' | 'failed', short, detail })
  findPoidPhoto: function(poid, name, cb) {
    const store = function(image) {
      CatalogImages.poids[poid] = image;
      There.livePhoto('poid', poid, CatalogImages.mediaUrl(image));
      cb(image);
    };
    const read = function(tries) {
      There.aboutFetch(poid, function(info, other, why) {
        if (!info && other) {
          // There Central answered with some other page
          cb(null, { kind: 'none', short: other.title || other.text, detail: `got "${other.title || 'no title'}": ${other.text}`, raw: other.raw });
          return;
        }
        if (!info) {
          // no answer (slow page or a hiccup): one more go
          if (tries < 2) {
            There.setNamedTimer(`about-retry-${poid}`, 1000, function() { read(tries + 1); });
          } else {
            cb(null, { kind: 'failed', short: why || 'no answer', detail: why || 'no answer' });
          }
          return;
        }
        if (info.image) {
          store(info.image);
          return;
        }
        // no picture on the About page: the catalog may still have one under
        // its Product ID
        There.catalogPhoto(info.productId, function(cat, none) {
          if (cat) {
            store(cat.image);
          } else if (none) {
            cb(null, { kind: 'none', short: 'About page has no picture',
              detail: info.productId ? `About page has no picture, and the catalog has none for Product ID ${info.productId}` : 'About page has no picture and no Product ID', raw: info.raw });
          } else {
            cb(null, { kind: 'failed', short: 'catalog did not answer', detail: 'About page has no picture, and the catalog did not answer' });
          }
        });
      }, name);
    };
    read(1);
  },

  copyText: function(text, cb) {
    const fallback = function() {
      const t = document.createElement('textarea');
      t.value = text;
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (error) {
      }
      t.remove();
      cb(!!ok);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() { cb(true); }, fallback);
    } else {
      fallback();
    }
  },

  // the action bar's Fix photo: this one item, now, and say what came back
  itemLacksPhoto: function(item) {
    if (There.data.panel == 'wardrobe') {
      return !!item.poid && !item.pob && !CatalogImages.poids[item.poid];
    }
    return There.data.panel == 'inventory' && There.itemNeedsPhoto(item);
  },

  fixItemPhoto: function(card, item) {
    const note = function(text) {
      if (There.data.menuItem === item) {
        $('.actionbar .abnote.abphoto').remove();
        $('<div class="abnote abphoto"></div>').text(text).appendTo($('.actionbar .abactions'));
      }
    };
    note('Looking for the photo\u2026');
    const finish = function(image, why) {
      if (image) {
        CatalogImages.savePoids();
        There.refreshFooter();
        if (There.data.menuItem === item) {
          // the bar's picture, and the Fix photo button goes
          There.buildItemMenu(card, item);
        }
        return;
      }
      note(why.kind == 'none' ? `No photo on There Central: ${why.detail}` : `Couldn't read it: ${why.detail}`);
      if (why.raw && There.data.menuItem === item) {
        // the page as the dock received it, for working out what's different
        let link = $('<a class="ablink"></a>').text('Copy the page').on('click', function(ev) {
          ev.stopPropagation();
          There.copyText(`About page for ${item.name} (poid ${item.poid})\n\n${why.raw}`, function(ok) {
            $(link).text(ok ? 'Copied, paste it to the chat' : 'Couldn\'t copy');
          });
        });
        $('.actionbar .abnote.abphoto').append(link);
      }
      There.setSyncNote(`Photo for ${item.name}: ${why.detail}`);
      There.setNamedTimer('photo-note', 60000, function() {
        if (!There.data.sweep) {
          There.setSyncNote('');
        }
      });
    };
    if (There.data.panel == 'wardrobe') {
      There.findPoidPhoto(item.poid, item.name, finish);
      return;
    }
    // inventory: the catalog by Product ID is the only source
    There.catalogPhoto(item.productId, function(info, none) {
      if (info) {
        There.saveItemPhoto(item.doid, info);
        There.livePhoto('doid', item.doid, CatalogImages.pickSize(CatalogImages.map[info.productId], 'medium'));
        finish(info.image);
        return;
      }
      finish(null, {
        kind: none ? 'none' : 'failed',
        detail: !none ? 'the catalog did not answer' :
          (item.productId ? `the catalog has no picture for Product ID ${item.productId}` : 'it has no Product ID, so there is no catalog photo to find'),
      });
    });
  },

  // an item's About page, read straight through FlashProxy with the game's
  // own login (the client's AboutPoidUrl, from config/urlgenconfig.xml): no
  // browser window. cb({ productId, image, name }) or cb(null)
  aboutFetch: function(id, cb, name) {
    if (!/^\d+$/.test(String(id || ''))) {
      cb(null, null, `its id isn't a number (${String(id).slice(0, 30)})`);
      return;
    }
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/about/about?poid=${id}`,
      dataType: 'text',
      timeout: 15000,
      success: function(html) {
        // some items' About pages arrive as the raw XML the site's stylesheet
        // turns into the page (a browser does that quietly): the photo and
        // Product ID are fields on it
        if (/^\s*<\?xml/.test(html || '') && /<About[\s>]/.test(html)) {
          const xml = new DOMParser().parseFromString(html, 'text/xml');
          const get = function(tag) {
            const n = xml.getElementsByTagName(tag)[0];
            return n ? (n.textContent || '').trim() : '';
          };
          if (xml.documentElement && !xml.getElementsByTagName('parsererror').length && (get('ItemName') || get('ItemPicUrl') || get('ProductId'))) {
            const im = get('ItemPicUrl').match(/([^/"'?#\s]+\.(?:jpg|jpeg|gif|png))$/i);
            cb({ productId: (get('ProductId').match(/^\d{4,10}$/) || [])[0] || '', image: im ? im[1] : '', name: get('ItemName'), raw: html });
            return;
          }
        }
        const doc = new DOMParser().parseFromString(html || '', 'text/html');
        // most About pages are titled "There Help: About <item>", but not all:
        // a page that carries a catalog picture or a Product ID is one too
        // ...or one whose text carries the item's own name
        const flat = doc.body ? doc.body.textContent.replace(/\s+/g, ' ').trim() : '';
        const named = name && String(name).trim().length > 2 && flat.toLowerCase().includes(String(name).trim().toLowerCase());
        const tm = (doc.title || '').match(/There Help: About (.+)$/i) ||
          (named || /catalog\/media\/[^"'?#\s]+\.(?:jpg|jpeg|gif|png)|Product\s*ID[:\s]*?\d{4,10}/i.test(html || '') ? [null, (doc.title || '').trim()] : null);
        if (!tm) {
          // an answer, but not an item About page. cb(null, what) says what
          // it was (title and the start of its text); a login page counts as
          // no answer
          const title = (doc.title || '').replace(/\s+/g, ' ').trim();
          const login = !html || /log ?in/i.test(title) || /Login Required|name="password"/i.test(html);
          cb(null, login ? null : { title: title, text: flat.slice(0, 300) || 'an empty page', raw: html || '' }, login ? 'a login page came back' : '');
          return;
        }
        const text = doc.body ? (doc.body.textContent || '') : '';
        const pm = text.match(/Product\s*ID[:\s]*?(\d{4,10})/i);
        let image = '';
        for (const img of doc.querySelectorAll('img')) {
          const im = (img.getAttribute('src') || '').match(/catalog\/media\/([^"'?#\s]+\.(?:jpg|jpeg|gif|png))/i);
          if (im) {
            image = im[1];
            break;
          }
        }
        if (!image) {
          // the picture can sit in a link or style rather than an <img>
          const any = (html || '').match(/catalog\/media\/([^"'?#\s()]+\.(?:jpg|jpeg|gif|png))/i);
          image = any ? any[1] : '';
        }
        cb({ productId: pm ? pm[1] : '', image: image, name: (tm[1] || '').trim(), raw: html || '' });
      },
      error: function(xhr, status) {
        cb(null, null, status == 'timeout' ? 'it timed out' : `the request failed (${xhr && xhr.status ? 'HTTP ' + xhr.status : status || 'no answer'})`);
      },
    });
  },

  // After the clothing: inventory items with no photo (builder items, and any the
  // catalog list doesn't know). They have no About method of their own, so the
  // About page opens through the My Things menu. Needs the action map, built
  // once if any of them is missing from it.
  itemPhotoSweep: function(s) {
    const todo = (There.data.inventory || []).filter(i => There.itemNeedsPhoto(i));
    const done = function() {
      There.endCacheSweep(`Done, ${s.ok || 0} photos${s.none ? `, ${s.none} have none on There Central${s.other ? ` (no About page, the site said "${s.other.slice(0, 60)}")` : ''}` : ''}${s.failed ? `, ${s.failed} couldn't be read${s.failWhy ? ` (first one, ${s.failWhy})` : ''}` : ''}`);
      There.data.photoResult = s.otherFull ? `No About page for ${s.otherFull}` : '';
      if (There.data.panel == 'wardrobe' || There.data.panel == 'inventory') {
        There.renderFolderView();
      }
    };
    if (!todo.length) {
      done();
      return;
    }
    s.builder = todo;
    s.bIndex = 0;
    There.itemPhotoStep(s, done);
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
    const next = function() {
      s.bIndex++;
      There.setNamedTimer('sweep-next', 250, function() { There.itemPhotoStep(s, done); });
    };
    // the public catalog knows every product's photo by its Product ID (even
    // ones not in the shop): one read, no login, no browser window. items
    // without a Product ID have no catalog photo to find
    There.catalogPhoto(it.productId, function(info, none) {
      if (info) {
        There.saveItemPhoto(it.doid, info);
        s.ok = (s.ok || 0) + 1;
        There.livePhoto('doid', it.doid, CatalogImages.pickSize(CatalogImages.map[info.productId], 'medium'));
      } else if (none) {
        // no Product ID, or the catalog has no picture for it
        s.none = (s.none || 0) + 1;
      }
      next();
    });
  },

  // /catalog/product?id=<pid> (public XML): the product's photo filename
  catalogPhoto: function(productId, cb) {
    productId = String(productId || '').trim();
    if (!/^\d+$/.test(productId) || productId == '0') {
      cb(null, true);
      return;
    }
    There.webappsFetch(`catalog/product?id=${productId}`, function(xml) {
      const image = xml ? (There.xmlText(xml, 'MediumImageUrl') || There.xmlText(xml, 'LargeImageUrl') ||
        There.xmlText(xml, 'SmallImageUrl')) : '';
      // cb(info) found, cb(null, true) the catalog has none, cb(null) no answer
      cb(image ? { productId: productId, image: image } : null, !!xml && !image);
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
    // a result with details (what had no photo, what failed) stays up long
    // enough to read
    There.setNamedTimer('photo-note', /couldn't|have none/.test(msg) ? 30000 : 4000, function() {
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

  // the Peer Review and Developer search boxes share one handler: redraw
  // whichever panel the box belongs to
  searchPanelRender: function(input) {
    if ($(input).closest('.eventspanel').length) {
      // events search runs on Enter (it asks There Central); clearing it
      // goes back to the tab
      if (!$(input).val().trim() && There.data.evQuery) {
        There.data.evQuery = '';
        There.data.evOpen = null;
        There.renderEvTabs();
        There.evShow();
      }
      return;
    }
    if ($(input).closest('.developerpanel').length) {
      There.renderDeveloper();
    } else {
      There.renderReviews();
    }
  },

  /* ------- Events panel -------
   * There's activity listings are public XML (eventmgmt/browse, the keyword
   * search, each event's page); My Schedule and signing up use the game's
   * own login through FlashProxy. "Happening now" is worked out locally:
   * every listing carries its open and close times (GMT). */

  // the Activities page's groups, plus the event types added since
  // (22 card game, 26 quest, 27 sales, 28 game)
  EV_CATS: [
    ['all', 'All', null],
    ['explore', 'Explore', [17, 26]],
    ['hang', 'Hang Out', [20, 12, 5, 10, 4, 6]],
    ['sports', 'Play Sports', [9, 10, 8, 7, 3, 2, 19]],
    ['learn', 'Learn', [13]],
    ['show', 'See a Show', [15]],
    ['game', 'Play a Game', [18, 8, 7, 22, 28]],
    ['sales', 'Sales', [27]],
  ],

  EV_TABS: [['now', 'Happening now'], ['today', 'Today'], ['week', 'This week'], ['mine', 'My schedule']],

  EV_MINE: [['invite', 'Invitations'], ['attend', 'Going'], ['operate', 'Hosting']],

  evFetch: function(path, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(text) {
        const xml = new DOMParser().parseFromString(text || '', 'text/xml');
        const bad = !xml.documentElement || xml.getElementsByTagName('parsererror').length;
        cb(bad ? null : xml, text || '');
      },
      error: function() {
        cb(null, '');
      },
    });
  },

  // "2026-10-15 08:00:00" (GMT) -> Date
  evTime: function(s) {
    const t = Date.parse(String(s || '').trim().replace(' ', 'T') + 'Z');
    return isNaN(t) ? null : new Date(t);
  },

  evClock: function(d) {
    let h = d.getHours();
    const m = d.getMinutes();
    const pm = h >= 12;
    h = h % 12 || 12;
    return `${h}${m ? ':' + String(m).padStart(2, '0') : ''} ${pm ? 'pm' : 'am'}`;
  },

  evDay: function(d) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 86400000);
    if (diff == 0) {
      return 'Today';
    }
    if (diff == 1) {
      return 'Tomorrow';
    }
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  },

  evParse: function(xml) {
    const list = [];
    const txt = (el, tag) => {
      const n = el.getElementsByTagName(tag)[0];
      return n ? n.textContent.trim() : '';
    };
    const listings = xml.getElementsByTagName('Listing');
    const src = listings.length ? Array.from(listings) : Array.from(xml.getElementsByTagName('Event'));
    for (const li of src) {
      const d = li.getElementsByTagName('Data')[0] || li;
      const hostEl = d.getElementsByTagName('Host')[0];
      const ev = {
        id: txt(d, 'EventId') || txt(li, 'Id'),
        typeId: Number(txt(d, 'EventTypeId')) || 0,
        open: There.evTime(txt(d, 'OpenTime')),
        close: There.evTime(txt(d, 'CloseTime')),
        fee: Number(txt(d, 'Fee')) || 0,
        capacity: Number(txt(d, 'Capacity')) || 0,
        signups: Number(txt(d, 'Signups')) || 0,
        invite: txt(d, 'InvitationOnly') == '1',
        title: txt(d, 'Title'),
        desc: txt(d, 'Desc'),
        type: txt(d, 'EventType'),
        category: txt(d, 'ClubCategory').replace(/^"|"$/g, ''),
        host: hostEl ? txt(hostEl, 'Name') : '',
        hostDoid: hostEl ? txt(hostEl, 'Doid') : '',
      };
      if (ev.id && ev.title) {
        list.push(ev);
      }
    }
    return list;
  },

  loadEvents: function() {
    There.data.evTab = There.data.evTab || 'now';
    There.data.evCat = There.data.evCat || 'all';
    There.data.evMine = There.data.evMine || 'attend';
    There.data.evCache = There.data.evCache || {};
    There.data.evOpen = null;
    There.renderEvTabs();
    There.evShow();
  },

  renderEvTabs: function() {
    const tabs = $('.evtabs');
    $(tabs).empty();
    for (const [id, label] of There.EV_TABS) {
      $('<div class="tab"></div>').text(label).attr('data-active', id == There.data.evTab && !There.data.evQuery && !There.data.evPerson ? '1' : '0')
        .on('click', function() {
          There.playSound('control down');
          There.data.evPerson = null;
          There.data.evTab = id;
          There.data.evQuery = '';
          $('.evsearch input').val('');
          There.data.evOpen = null;
          There.renderEvTabs();
          There.evShow();
        }).appendTo($(tabs));
    }
    const cats = $('.evcats');
    $(cats).empty();
    if (There.data.evPerson && !There.data.evQuery) {
      // one chip: whose schedule this is, click to go back to the tabs
      const who = There.data.evPerson.name;
      const label = There.data.evPerson.label || `${who ? who + '\'s' : 'Their'} events`;
      $('<span class="lchip" data-on="1"></span>').text(`${label} \u2715`).attr('title', 'Back to all events')
        .on('click', function() {
          There.playSound('control down');
          There.data.evPerson = null;
          There.data.evOpen = null;
          There.renderEvTabs();
          There.evShow();
        }).appendTo($(cats));
      return;
    }
    const mine = There.data.evTab == 'mine' && !There.data.evQuery;
    for (const [id, label] of (mine ? There.EV_MINE : There.EV_CATS)) {
      const on = mine ? id == There.data.evMine : id == There.data.evCat;
      $('<span class="lchip"></span>').text(label).attr('data-on', on ? '1' : '0').on('click', function() {
        There.playSound('control down');
        if (mine) {
          There.data.evMine = id;
        } else {
          There.data.evCat = id;
        }
        There.data.evOpen = null;
        There.renderEvTabs();
        There.evShow();
      }).appendTo($(cats));
    }
  },

  // a group's events (its category on There Central's event list)
  showEventBrowse: function(path, label) {
    There.data.evPerson = { doid: '', name: '', label: label || 'Group events', path: path };
    There.data.evQuery = '';
    There.data.evOpen = null;
    $('.evsearch input').val('');
    if (There.data.panel == 'events') {
      There.renderEvTabs();
      There.evShow();
    } else {
      There.togglePanel('events');
    }
  },

  // someone's schedule (from their profile)
  showPersonEvents: function(doid, name) {
    There.data.evPerson = { doid: String(doid), name: name || '' };
    There.data.evQuery = '';
    There.data.evOpen = null;
    $('.evsearch input').val('');
    if (There.data.panel == 'events') {
      There.renderEvTabs();
      There.evShow();
    } else {
      There.togglePanel('events');
    }
  },

  // the list a tab needs: fetched once, kept 2 minutes
  evSource: function() {
    if (There.data.evPerson && There.data.evPerson.path && !There.data.evQuery) {
      return { key: `b:${There.data.evPerson.path}`, path: There.data.evPerson.path };
    }
    if (There.data.evPerson && !There.data.evQuery) {
      return { key: `p:${There.data.evPerson.doid}`, path: `eventmgmt/eventmgmt?op=mysched&ViewDoid=${encodeURIComponent(There.data.evPerson.doid)}` };
    }
    if (There.data.evQuery) {
      return { key: `q:${There.data.evQuery}`, path: `eventmgmt/fulltextsearch?Fulltext=${encodeURIComponent(There.data.evQuery)}&PageSize=200` };
    }
    switch (There.data.evTab) {
      case 'today':
        return { key: 'today', path: 'eventmgmt/browse?SearchDays=1&PageSize=200' };
      case 'mine':
        return { key: `mine:${There.data.evMine}`, path: `eventmgmt/myevents?show=${There.data.evMine}` };
      default:
        // happening now comes out of the week's list
        return { key: 'week', path: 'eventmgmt/browse?SearchDays=7&PageSize=200' };
    }
  },

  evShow: function(force) {
    const src = There.evSource();
    const cached = There.data.evCache[src.key];
    if (cached && Date.now() - cached.at < 120000 && !force) {
      There.renderEvents(cached);
      return;
    }
    $('.evbody').html('<div class="empty">Loading events…</div>');
    There.evFetch(src.path, function(xml, raw) {
      if (There.data.panel != 'events' || There.evSource().key != src.key || There.data.evOpen) {
        return;
      }
      if (!xml) {
        const login = /^\s*<!DOCTYPE|<html/i.test(raw);
        $('.evbody').html(`<div class="empty">${login ? 'Couldn\'t open this with your login. Try again in a moment.' : 'Events didn\'t answer. Try Refresh in a moment.'}</div>`);
        return;
      }
      const entry = { at: Date.now(), list: There.evParse(xml), hasListings: /<Listing>/.test(raw) };
      There.data.evCache[src.key] = entry;
      There.renderEvents(entry);
    });
  },

  renderEvents: function(entry) {
    const body = $('.evbody');
    $(body).empty();
    const now = new Date();
    let list = entry.list.slice();
    const searching = !!There.data.evQuery || !!There.data.evPerson;
    if (!searching && There.data.evTab == 'now') {
      list = list.filter(e => e.open && e.close && e.open <= now && now < e.close);
      list.sort((a, b) => a.close - b.close);
    } else {
      list.sort((a, b) => (a.open || 0) - (b.open || 0));
    }
    if (!(There.data.evTab == 'mine' && !searching)) {
      const cat = There.EV_CATS.find(c => c[0] == There.data.evCat);
      if (cat && cat[2]) {
        list = list.filter(e => cat[2].includes(e.typeId));
      }
    }
    $('.evcount').text(`${list.length} event${list.length == 1 ? '' : 's'}`);
    for (const ev of list) {
      There.evRow(ev, now).on('click', function() {
        There.playSound('control down');
        There.showEvent(ev);
      }).appendTo($(body));
    }
    if (!list.length) {
      let msg = 'No events here right now.';
      if (searching) {
        msg = 'No events match that search.';
      } else if (There.data.evTab == 'mine' && !entry.hasListings) {
        msg = 'Nothing here.';
      }
      $(body).append($('<div class="empty"></div>').text(msg));
    }
  },

  evRow: function(ev, now) {
    now = now || new Date();
    let row = $('<div class="evrow"></div>');
    let when = $('<div class="evwhen"></div>');
    const live = ev.open && ev.close && ev.open <= now && now < ev.close;
    if (live) {
      $(when).attr('data-live', '1').append($('<b></b>').text('Now'),
        $('<span></span>').text(`until ${There.evClock(ev.close)}`));
    } else if (ev.open) {
      $(when).append($('<b></b>').text(There.evDay(ev.open)), $('<span></span>').text(There.evClock(ev.open)));
    }
    $(when).appendTo($(row));
    let main = $('<div class="evmain"></div>');
    $('<div class="evtitle"></div>').text(ev.title).appendTo($(main));
    $('<div class="evmeta"></div>').text([ev.type, ev.category, ev.host ? `by ${ev.host}` : ''].filter(Boolean).join(' \u00B7 ')).appendTo($(main));
    $(main).appendTo($(row));
    let side = $('<div class="evside"></div>');
    $('<span class="evfee"></span>').attr('data-free', ev.fee ? '0' : '1').text(ev.fee ? `${ev.fee}T` : 'Free').appendTo($(side));
    if (ev.capacity) {
      $('<span class="evcap"></span>').text(`${ev.signups}/${ev.capacity}`).appendTo($(side));
    }
    $(side).appendTo($(row));
    return row;
  },

  // an event opened from somewhere other than the Events panel
  openEventFromPlace: function(ev) {
    if (There.data.panel != 'events') {
      There.togglePanel('events');
    }
    There.showEvent(ev);
  },

  showEvent: function(ev) {
    There.data.evOpen = ev.id;
    const body = $('.evbody');
    $(body).html('<div class="empty">Loading the event…</div>');
    There.evFetch(`eventmgmt/eventmgmt?op=view&id=${encodeURIComponent(ev.id)}`, function(xml) {
      if (There.data.evOpen != ev.id || There.data.panel != 'events') {
        return;
      }
      There.renderEvent(ev, xml);
    });
  },

  // "Happening now" / "Starts in 2h 15m" / "Starts Tue 20 Oct, 8 pm" / "Ended"
  evStatus: function(open, close) {
    const now = new Date();
    if (open && close && open <= now && now < close) {
      return { kind: 'live', text: `Happening now · until ${There.evClock(close)}` };
    }
    if (close && close <= now) {
      return { kind: 'over', text: 'Ended' };
    }
    if (open) {
      const mins = Math.round((open - now) / 60000);
      if (mins < 24 * 60) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return { kind: 'soon', text: `Starts in ${h ? h + 'h ' : ''}${m}m` };
      }
      return { kind: 'later', text: `Starts ${There.evDay(open)}, ${There.evClock(open)}` };
    }
    return { kind: 'later', text: '' };
  },

  renderEvent: function(ev, xml) {
    const body = $('.evbody');
    $(body).empty();
    const pick = function(scope, tag) {
      const s = xml ? xml.getElementsByTagName(scope)[0] : null;
      const n = s ? s.getElementsByTagName(tag)[0] : null;
      return n ? n.textContent.trim() : '';
    };
    const e = {
      title: pick('Event', 'Title') || ev.title,
      desc: pick('Event', 'Desc') || ev.desc,
      open: There.evTime(pick('Event', 'OpenTime')) || ev.open,
      close: There.evTime(pick('Event', 'CloseTime')) || ev.close,
      fee: Number(pick('Event', 'Fee') || ev.fee) || 0,
      capacity: Number(pick('Event', 'Capacity') || ev.capacity) || 0,
      signups: Number(pick('Event', 'Signups') || ev.signups) || 0,
      host: pick('Host', 'Name') || ev.host,
      hostDoid: pick('Host', 'Doid') || ev.hostDoid,
      zoneOid: pick('Zone', 'Oid'),
      place: pick('Zone', 'UserTitle'),
      placeDesc: pick('Zone', 'UserDesc'),
      region: [pick('Zone', 'Location'), pick('Zone', 'Region')].filter(Boolean).join(', '),
      image: pick('Zone', 'ImageUrl'),
      coHosted: pick('Event', 'CoHosted') == '1',
      invite: pick('Event', 'InvitationOnly') == '1' || ev.invite,
    };
    let d = $('<div class="evdetail"></div>');
    $('<div class="idback"></div>').text('‹ Back to events').on('click', function() {
      There.playSound('control down');
      There.data.evOpen = null;
      There.evShow();
    }).appendTo($(d));

    // hero: the place's picture, the status, title, host and tags
    let hero = $('<div class="evhero"></div>');
    let pic = $('<div class="evpic"></div>');
    if (e.image) {
      // the page's own rule: a full address as is, a bare name under /listings/media/
      const src = /^https?:/i.test(e.image) ? e.image : `https://webapps.prod.there.com/listings/media/${e.image}`;
      $('<img alt="">').attr('src', src).on('error', function() {
        $(this).remove();
        $(pic).html(tmuiIcon('calendar-days'));
      }).appendTo($(pic));
    } else {
      $(pic).html(tmuiIcon('calendar-days'));
    }
    $(pic).appendTo($(hero));
    let head = $('<div class="evhead"></div>');
    const st = There.evStatus(e.open, e.close);
    if (st.text) {
      $('<div class="evstatus"></div>').attr('data-kind', st.kind).append(
        $('<span class="evdot"></span>'), $('<span></span>').text(st.text)).appendTo($(head));
    }
    $('<div class="evname"></div>').text(e.title).appendTo($(head));
    if (e.host) {
      $('<div class="evhost"></div>').append(document.createTextNode('Hosted by '),
        $('<a></a>').text(e.host).on('click', function() {
          There.showProfile(e.hostDoid, e.host);
        }), e.coHosted ? document.createTextNode(' · club members co-host') : '').appendTo($(head));
    }
    let tags = $('<div class="evtags"></div>');
    for (const t of [ev.type, ev.category]) {
      if (t) {
        $('<span class="evtag"></span>').text(t).appendTo($(tags));
      }
    }
    $('<span class="evtag"></span>').attr('data-kind', e.fee ? 'paid' : 'free').text(e.fee ? `${e.fee}T ticket` : 'Free').appendTo($(tags));
    if (e.invite) {
      $('<span class="evtag"></span>').attr('data-kind', 'invite').text('Invitation only').appendTo($(tags));
    }
    $(tags).appendTo($(head));
    $(head).appendTo($(hero));
    $(hero).appendTo($(d));

    // actions
    let btns = $('<div class="idbtns evbtns"></div>');
    let note = $('<span class="revnote"></span>');
    if (e.zoneOid && st.kind != 'over') {
      $('<div class="button evgo"></div>').attr('data-primary', '1').append(
        $('<span class="evbtnicon"></span>').html(tmuiIcon('map-location-dot')), $('<span></span>').text('Go there now'))
        .on('click', function() {
          There.playSound('menu item activate');
          There.evTeleport(e.zoneOid);
          $(note).attr('data-bad', '0').text('Teleporting…');
        }).appendTo($(btns));
    }
    // signing up can cost the ticket price: then a second click is needed
    let armed = false;
    let sign = $('<div class="button"></div>').text('Sign up');
    if (st.kind == 'over') {
      $(sign).attr('data-off', '1');
    }
    $(sign).on('click', function() {
      if (st.kind == 'over') {
        return;
      }
      if (e.fee && !armed) {
        armed = true;
        $(sign).text(`Click again to sign up (${e.fee}T)`);
        There.setNamedTimer('ev-arm', 5000, function() {
          armed = false;
          $(sign).text('Sign up');
        });
        return;
      }
      armed = false;
      There.clearNamedTimer('ev-arm');
      There.playSound('menu item activate');
      $(note).attr('data-bad', '0').text('Signing you up…');
      There.evFetch(`eventmgmt/eventmgmt?op=avadd&id=${encodeURIComponent(ev.id)}`, function(xml2, raw) {
        const errVal = xml2 ? (xml2.getElementsByTagName('Value')[0] || {}).textContent : '';
        const errMsg = xml2 ? (xml2.getElementsByTagName('Message')[0] || {}).textContent : '';
        if (!xml2 && !raw) {
          $(note).attr('data-bad', '1').text('That didn\'t go through. Try again.');
        } else if (errVal && errVal != '0') {
          $(note).attr('data-bad', '1').text(errMsg || 'There Central said no.');
        } else {
          $(note).attr('data-bad', '0').text('You\'re signed up.');
          delete There.data.evCache['mine:attend'];
        }
      });
    }).appendTo($(btns));
    $('<span class="idlink"></span>').text('View on There Central').on('click', function() {
      There.openUrl(`https://webapps.prod.there.com/eventmgmt/eventmgmt?op=view&id=${ev.id}`);
    }).appendTo($(btns));
    $(btns).append(note).appendTo($(d));

    // info cards
    let cards = $('<div class="evcards"></div>');
    const card = function(icon, label, main, sub, extra) {
      let c = $('<div class="evcard"></div>');
      $('<div class="evcardhead"></div>').append($('<span class="evcardicon"></span>').html(tmuiIcon(icon)),
        $('<span></span>').text(label)).appendTo($(c));
      $('<div class="evcardmain"></div>').text(main).appendTo($(c));
      if (sub) {
        $('<div class="evcardsub"></div>').text(sub).appendTo($(c));
      }
      if (extra) {
        $(c).append(extra);
      }
      $(c).appendTo($(cards));
      return c;
    };
    if (e.open) {
      const same = e.close && e.open.toDateString() == e.close.toDateString();
      const mins = e.close ? Math.round((e.close - e.open) / 60000) : 0;
      const length = mins ? (mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 ? ' ' + (mins % 60) + 'm' : ''}` : `${mins}m`) : '';
      card('calendar-days', 'When', There.evDay(e.open),
        `${There.evClock(e.open)}${e.close ? ` to ${same ? '' : There.evDay(e.close) + ', '}${There.evClock(e.close)}` : ''}${length ? ` · ${length}` : ''}`);
    }
    if (e.place || e.region) {
      const wc = card('map-location-dot', 'Where', e.place || e.region, e.place ? e.region : '');
      if (e.zoneOid) {
        // the place's own page in the dock
        $(wc).addClass('evcardlink').attr('title', 'About this place').on('click', function() {
          There.playSound('control down');
          There.showPlace(e.zoneOid, e.place, {
            desc: e.placeDesc, location: pick('Zone', 'Location'), region: pick('Zone', 'Region'), pic: e.image,
          });
        });
      }
    }
    if (e.capacity) {
      const pct = Math.min(100, Math.round(e.signups / e.capacity * 100));
      const bar = $('<div class="evbar"></div>').append($('<div class="evbarfill"></div>').css('width', `${pct}%`));
      card('user-group', 'Spaces', `${e.signups} of ${e.capacity} signed up`,
        e.signups >= e.capacity ? 'Full' : `${e.capacity - e.signups} left`, bar);
    }
    $(cards).appendTo($(d));

    if (e.desc) {
      $('<div class="evsection"></div>').text('About this event').appendTo($(d));
      $('<div class="evabout"></div>').text(e.desc).appendTo($(d));
    }
    if (e.placeDesc && e.placeDesc != e.desc) {
      $('<div class="evsection"></div>').text('About the place').appendTo($(d));
      $('<div class="evabout"></div>').text(e.placeDesc).appendTo($(d));
    }
    $(d).appendTo($(body));
  },

  // "Go there now". There's goto link, asked through FlashProxy with the
  // game's own login, so no browser window opens. if the game hasn't started
  // teleporting a few seconds later, the link goes through the browser after
  // all (its window closes itself again)
  evTeleport: function(oid) {
    There.gotoTeleport(`obj=${encodeURIComponent(oid)}&shuffleok=1`);
  },

  /* ------- Places: Explore and Search -------
   * Explore is There Central's Places page (places/places.xml, public): the
   * islands, the hottest spots, featured landmarks, the day's FunZone and the
   * real estate links. The hottest spots feed (places/places?count=14) needs
   * the login, so FlashProxy reads it with the game's. Search is the public
   * place search, zones/browse. Teleports go through the site's goto page
   * with the login, so no browser window opens. */

  PX_DAYS: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  PZ_TYPES: [['all', 'All'], ['house', 'Houses'], ['club', 'Clubhouses'], ['funzone', 'Fun Zones'], ['hood', 'Neighborhoods'], ['lot', 'Lots']],

  // the tab decides what the panel body shows
  showPlacesTab: function() {
    There.renderPlacesTabs();
    const tab = There.data.placesTab || 'explore';
    $('.panelsearch input').attr('placeholder', tab == 'search' ? 'Search places on There Central (Enter)…' : 'Search…');
    if (tab == 'map') {
      There.drawMap();
      There.mapTick();
    } else if (tab == 'explore') {
      There.renderExplore();
    } else if (tab == 'search') {
      There.renderPlaceSearch(false);
    } else {
      There.renderFolderView();
    }
  },

  // teleport through the site's goto page with the game's login, no browser
  // window; the browser only if no teleport has started after 4 seconds
  gotoTeleport: function(query) {
    const path = `goto/goto?${query}`;
    const asked = Date.now();
    There.evFetch(path, function(xml, raw) {
      There.data.gotoRaw = raw;
    });
    There.setNamedTimer('ev-teleport', 4000, function() {
      if ((There.data.teleportSeenAt || 0) >= asked) {
        return;
      }
      const url = `https://webapps.prod.there.com/${path}`;
      if (typeof TmuiCommands != 'undefined' && TmuiCommands.browseAndClose) {
        TmuiCommands.browseAndClose(url);
      } else {
        There.fsCommand('browser', url);
      }
    });
  },

  // a named spot, the way the Places page's links do it
  gotoNamed: function(name, heading, radius, shuffle) {
    There.gotoTeleport(`op=gotoNamedPlace&placename=${encodeURIComponent(name)}&heading=${encodeURIComponent(heading || '0')}` +
      `&radius=${encodeURIComponent(radius || '5')}${shuffle ? '&shuffleok=1' : ''}`);
  },

  pxText: function(el, tag) {
    const n = el ? el.getElementsByTagName(tag)[0] : null;
    return n ? (n.textContent || '').trim() : '';
  },

  // pictures on the Places page: relative to /places/, or site-absolute
  pxMedia: function(uri) {
    uri = String(uri || '').trim();
    if (!uri) {
      return '';
    }
    if (/^https?:/i.test(uri)) {
      return uri;
    }
    return uri.charAt(0) == '/' ? `https://webapps.prod.there.com${uri}` : `https://webapps.prod.there.com/places/${uri}`;
  },

  openShopCat: function(cat) {
    There.data.shopCat = cat;
    if (There.data.panel == 'shop') {
      There.loadShop(cat);
    } else {
      There.togglePanel('shop');
    }
  },

  renderExplore: function() {
    const body = $('.placesbody');
    $('.footcount').text('');
    if (There.data.pxXml) {
      There.drawExplore(There.data.pxXml);
      return;
    }
    $(body).html('<div class="empty">Loading places…</div>');
    There.webappsFetch('places/places.xml', function(xml) {
      if (There.data.panel != 'places' || There.data.placesTab != 'explore') {
        return;
      }
      if (!xml) {
        $(body).html('<div class="empty">There Central did not answer. Try again in a moment.</div>');
        return;
      }
      There.data.pxXml = xml;
      There.drawExplore(xml);
    });
  },

  drawExplore: function(xml) {
    const body = $('.placesbody');
    $(body).empty();
    const dests = function(parent) {
      const p = xml.getElementsByTagName(parent)[0];
      return p ? Array.from(p.getElementsByTagName('dest')) : [];
    };
    const section = function(title) {
      $('<div class="evsection"></div>').text(title).appendTo($(body));
    };

    // the islands
    const islands = dests('ExploreThere');
    if (islands.length) {
      section('Teleport to an island');
      let row = $('<div class="pxislands"></div>');
      for (const d of islands) {
        const name = There.pxText(d, 'name');
        const label = There.pxText(d, 'text') || name;
        $('<div class="pxisland"></div>').append($('<b></b>').text(label), $('<span></span>').text(name != label ? name : ''))
          .attr('title', `Teleport to ${name}`).on('click', function() {
            There.playSound('menu item activate');
            There.gotoNamed(name, There.pxText(d, 'heading'), There.pxText(d, 'radius'), false);
          }).appendTo($(row));
      }
      $(row).appendTo($(body));
    }

    // the hottest spots, filled in when the feed answers
    section('Hottest spots right now');
    let hot = $('<div class="pxhot"></div>').html('<div class="empty">Checking who is where…</div>').appendTo($(body));
    There.loadHotSpots(hot);

    // featured landmarks
    const land = dests('FeaturedLandmarks');
    const tgp = xml.getElementsByTagName('tgp')[0];
    if (land.length || tgp) {
      section('Featured landmarks');
      let grid = $('<div class="pxland"></div>');
      const card = function(name, by, img, go) {
        let c = $('<div class="pxlandcard"></div>');
        let pic = $('<div class="pxlandpic"></div>');
        if (img) {
          $('<img alt="" loading="lazy">').attr('src', img).on('error', function() {
            $(this).remove();
          }).appendTo($(pic));
        }
        $(c).append(pic, $('<div class="pxlandname"></div>').text(name));
        if (by) {
          $('<div class="evcardsub"></div>').text(by).appendTo($(c));
        }
        $(c).attr('title', `Teleport to ${name}`).on('click', function() {
          There.playSound('menu item activate');
          go();
        }).appendTo($(grid));
      };
      for (const d of land) {
        const name = There.pxText(d, 'name');
        const imgEl = d.getElementsByTagName('image')[0];
        const by = There.pxText(d, 'designer');
        card(name, by ? `Photo: ${by}` : '', There.pxMedia(imgEl ? imgEl.getAttribute('URI') : ''), function() {
          There.gotoNamed(name, There.pxText(d, 'heading'), There.pxText(d, 'radius'), false);
        });
      }
      if (tgp) {
        const name = There.pxText(tgp, 'name');
        const doid = There.pxText(tgp, 'doid');
        const imgEl = tgp.getElementsByTagName('image')[0];
        const by = There.pxText(tgp, 'designer');
        card(name, by ? `Built by ${by}` : '', There.pxMedia(imgEl ? imgEl.getAttribute('URI') : ''), function() {
          There.gotoTeleport(`obj=${encodeURIComponent(doid)}`);
        });
      }
      $(grid).appendTo($(body));
    }

    // today's featured FunZone
    const day = There.PX_DAYS[new Date().getDay()];
    const dayEl = Array.from(xml.getElementsByTagName('Day')).find(d => d.getAttribute('day') == day);
    const text = dayEl ? dayEl.getElementsByTagName('Text')[0] : null;
    if (text) {
      const anchors = Array.from(text.getElementsByTagName('a'));
      const viewA = anchors.find(a => /op=view/.test(a.getAttribute('href') || ''));
      const img = text.getElementsByTagName('img')[0];
      // the blurb keeps the place's name, loses the rent/search link labels
      let blurb = (text.textContent || '');
      for (const a of anchors) {
        if (/zones\/browse|op=search/.test(a.getAttribute('href') || '')) {
          blurb = blurb.replace(a.textContent, '');
        }
      }
      blurb = blurb.replace(/\s+/g, ' ').replace(/\s+([!.,])/g, '$1').trim();
      // the link's id is the zone's, so the dock's own place page can open it
      const href = viewA ? viewA.getAttribute('href') || '' : '';
      const zoneId = (href.match(/[?&]id=(\d+)/) || [])[1] || '';
      const strong = text.getElementsByTagName('strong')[0];
      const fzName = ((strong && strong.textContent) || (viewA && viewA.textContent) || '').trim();
      const picUrl = img ? There.pxMedia(img.getAttribute('src')) : '';
      const openPlace = function() {
        There.playSound('control down');
        There.showPlace(zoneId, fzName, { pic: picUrl, type: 'Fun Zone' });
      };
      section('Featured FunZone');
      let fz = $('<div class="pxfun"></div>');
      if (zoneId) {
        $(fz).addClass('pxfunlink').attr('title', `About ${fzName || 'this place'}`).on('click', openPlace);
      }
      if (picUrl) {
        $('<img alt="">').attr('src', picUrl).on('error', function() {
          $(this).remove();
        }).appendTo($(fz));
      }
      let info = $('<div class="pxfuninfo"></div>');
      if (fzName) {
        $('<div class="pxlandname"></div>').text(fzName).appendTo($(info));
      }
      if (blurb) {
        $('<div class="pxblurb"></div>').text(blurb).appendTo($(info));
      }
      let btns = $('<div class="idbtns"></div>').on('click', function(ev) {
        // the buttons do their own thing, not the card's
        ev.stopPropagation();
      });
      if (zoneId) {
        $('<div class="button"></div>').attr('data-primary', '1').text('About this place').on('click', openPlace).appendTo($(btns));
        $('<div class="button"></div>').text('Go there now').on('click', function() {
          There.playSound('menu item activate');
          There.gotoTeleport(`obj=${encodeURIComponent(zoneId)}&shuffleok=1`);
        }).appendTo($(btns));
      }
      if (href) {
        $('<span class="idlink"></span>').text('There Central').on('click', function() {
          There.openUrl(new URL(href, 'https://webapps.prod.there.com/places/').href);
        }).appendTo($(btns));
      }
      $('<div class="button"></div>').text('All FunZones').on('click', function() {
        There.playSound('control down');
        There.placeSearchPreset({ type: 'funzone', rent: false });
      }).appendTo($(btns));
      $('<div class="button"></div>').text('FunZones for rent').on('click', function() {
        There.playSound('control down');
        There.placeSearchPreset({ type: 'funzone', rent: true });
      }).appendTo($(btns));
      $(info).append(btns);
      $(fz).append(info).appendTo($(body));
    }

    // real estate and the information links
    section('Real estate');
    let links = $('<div class="idbtns pxlinks"></div>');
    const link = function(label, fn) {
      $('<div class="button"></div>').text(label).on('click', function() {
        There.playSound('control down');
        fn();
      }).appendTo($(links));
    };
    link('Rent a house', function() {
      There.placeSearchPreset({ type: 'house', rent: true });
    });
    link('Neighborhoods', function() {
      There.placeSearchPreset({ type: 'hood', rent: false });
    });
    link('Buy a PortaZone', function() {
      There.openShopCat('1000000300');
    });
    link('Buy a lot', function() {
      There.openShopCat('1000000520');
    });
    link('Rent a neighborhood', function() {
      There.showSitePage('https://webapps.prod.there.com/help/kb2007.xml', 'Rent a neighborhood');
    });
    link('Making There your home', function() {
      There.showSitePage('https://webapps.prod.there.com/help/kb850.xml', 'Making There your home');
    });
    link('Lot set-up manual', function() {
      There.showSitePage('https://webapps.prod.there.com/help/kb835.xml', 'Lot set-up manual');
    });
    link('Placement policies', function() {
      There.showSitePage('https://webapps.prod.there.com/help/kb589.xml', 'Placement policies');
    });
    $(links).appendTo($(body));
  },

  pxKind: function(cls) {
    return ({ hangout: 'Hangout', hotspot: 'Hot spot', pointofinterest: 'Point of interest', waypoint: 'Waypoint' })[cls] || '';
  },

  // the busiest places, most people first. the site leaves a few system
  // zones out of this list; so do we
  loadHotSpots: function(box) {
    There.evFetch('places/places?count=14', function(xml, raw) {
      if (!$(box).closest('body').length) {
        return;
      }
      $(box).empty();
      const dests = xml ? Array.from(xml.getElementsByTagName('dest')) : [];
      if (!dests.length) {
        const login = /<html|<!DOCTYPE/i.test(raw || '');
        $(box).html(`<div class="empty">${login ? 'This list needs your login: it works after the next There restart.' : 'The list did not answer. Try again in a moment.'}</div>`);
        return;
      }
      const skip = /Zona|Paiz|Fisher|Zephyr|CosmoGirl Village/;
      const list = dests.map(function(d) {
        const ct = There.pxText(d, 'canteleport');
        return {
          name: There.pxText(d, 'name'),
          pop: Number(There.pxText(d, 'pop')) || 0,
          cls: There.pxText(d, 'destclass'),
          can: ct == '' ? true : ct == '1',
          heading: There.pxText(d, 'heading'),
          radius: There.pxText(d, 'radius'),
        };
      }).filter(d => d.name && d.cls != 'avdensityonly' && !skip.test(d.name));
      list.sort((a, b) => b.pop - a.pop);
      if (!list.length) {
        $(box).html('<div class="empty">Nowhere is busy right now.</div>');
        return;
      }
      for (const d of list) {
        let row = $('<div class="pxhotrow"></div>');
        const heat = d.pop >= 45 ? 3 : d.pop >= 15 ? 2 : d.pop > 0 ? 1 : 0;
        $('<span class="pxpop"></span>').attr('data-heat', heat).text(d.pop > 0 ? d.pop : '·').attr('title', `${d.pop} ${d.pop == 1 ? 'person' : 'people'} here`).appendTo($(row));
        let main = $('<div class="pxhotmain"></div>');
        $('<div class="pxhotname"></div>').text(d.name).appendTo($(main));
        const kind = There.pxKind(d.cls);
        if (kind) {
          $('<div class="evmeta"></div>').text(kind).appendTo($(main));
        }
        $(main).appendTo($(row));
        if (d.can) {
          const go = function() {
            There.playSound('menu item activate');
            There.gotoNamed(d.name, d.heading, d.radius, true);
          };
          $('<div class="button"></div>').text('Go').on('click', function(ev) {
            ev.stopPropagation();
            go();
          }).appendTo($(row));
          $(row).attr('title', `Teleport to ${d.name}`).on('click', go);
        } else {
          $(row).attr('data-off', '1').attr('title', 'No teleport to this one');
        }
        $(row).appendTo($(box));
      }
    });
  },

  /* ------- place search (zones/browse) ------- */

  pzState: function() {
    if (!There.data.pz) {
      There.data.pz = { type: 'all', rent: false, text: '', page: 1, pages: 1, list: [], key: '', open: null };
    }
    return There.data.pz;
  },

  // a search with filters set up front (the Explore links use it)
  placeSearchPreset: function(opts) {
    const pz = There.pzState();
    pz.type = opts.type || 'all';
    pz.rent = !!opts.rent;
    pz.text = '';
    pz.open = null;
    $('.panelsearch input').val('');
    There.data.search = '';
    There.data.placesTab = 'search';
    if (There.data.panel != 'places') {
      There.togglePanel('places');
    } else {
      There.showPlacesTab();
    }
  },

  // Enter in the search box on the Search tab
  placeSearchRun: function(text) {
    const pz = There.pzState();
    pz.text = String(text || '').trim();
    pz.open = null;
    There.renderPlaceSearch(false);
  },

  pzQuery: function(page) {
    const pz = There.pzState();
    const type = pz.type == 'club' ? 'house' : pz.type;
    let q = `zones/browse?ZoneType=${encodeURIComponent(type)}&Fulltext=${encodeURIComponent(pz.text)}&PageSize=60&Page=${page}`;
    if (pz.type == 'club') {
      q += '&RequiresClub=1';
    }
    if (pz.rent) {
      q += '&Rentable=1';
    }
    return q;
  },

  pzPicture: function(pic) {
    pic = String(pic || '').trim();
    if (!pic) {
      return '';
    }
    return /^https?:/i.test(pic) ? pic : `https://webapps.prod.there.com/listings/media/${pic}`;
  },

  pzMoney: function(n) {
    return `${Number(n || 0).toLocaleString()}T`;
  },

  renderPlaceSearch: function(force) {
    const pz = There.pzState();
    const body = $('.placesbody');
    $(body).empty();
    $('.footcount').text('');
    let chips = $('<div class="lchips pzchips"></div>');
    for (const [id, label] of There.PZ_TYPES) {
      $('<span class="lchip"></span>').text(label).attr('data-on', id == pz.type ? '1' : '0').on('click', function() {
        There.playSound('control down');
        pz.type = id;
        pz.open = null;
        There.renderPlaceSearch(false);
      }).appendTo($(chips));
    }
    $('<span class="lchip pzrent"></span>').text('For rent').attr('data-on', pz.rent ? '1' : '0').attr('title', 'Only places open to rent right now').on('click', function() {
      There.playSound('control down');
      pz.rent = !pz.rent;
      pz.open = null;
      There.renderPlaceSearch(false);
    }).appendTo($(chips));
    $(chips).appendTo($(body));
    let out = $('<div class="pzlist"></div>').appendTo($(body));
    if (pz.open) {
      There.renderPlaceDetail(pz.open, out);
      return;
    }
    const key = `${pz.type}|${pz.rent ? 1 : 0}|${pz.text}`;
    if (!force && pz.key == key && pz.list.length) {
      There.drawPlaceResults(out);
      return;
    }
    pz.key = key;
    pz.list = [];
    pz.page = 1;
    pz.pages = 1;
    $(out).html('<div class="empty">Searching There Central…</div>');
    There.fetchPlacePage(out);
  },

  fetchPlacePage: function(out) {
    const pz = There.pzState();
    const key = pz.key;
    const page = pz.page;
    There.webappsFetch(There.pzQuery(page), function(xml) {
      if (There.data.panel != 'places' || There.data.placesTab != 'search' || pz.key != key || pz.open) {
        return;
      }
      if (!xml) {
        $(out).html('<div class="empty">There Central did not answer. Try again in a moment.</div>');
        return;
      }
      // the region crumbs are Zone elements too; real places carry an oid
      const zones = Array.from(xml.getElementsByTagName('Zone')).filter(z => There.pxText(z, 'ZoneOid'));
      for (const z of zones) {
        const item = {
          oid: There.pxText(z, 'ZoneOid'),
          title: There.pxText(z, 'Title'),
          desc: There.pxText(z, 'Description'),
          type: There.pxText(z, 'ZoneTypeString'),
          region: There.pxText(z, 'Region'),
          location: There.pxText(z, 'ZoneLocation'),
          pic: There.pxText(z, 'UrlPicture'),
          renter: There.pxText(z, 'RenterName'),
          renterOid: There.pxText(z, 'RenterOid'),
          status: Number(There.pxText(z, 'Status')) || 0,
          rate: Number(There.pxText(z, 'Rate')) || 0,
          cap: Number(There.pxText(z, 'UserCapacity')) || 0,
          club: There.pxText(z, 'RequiresClub') == '1',
        };
        // "for rent" shows only places open to rent, as the site does
        if (pz.rent && item.status != 1) {
          continue;
        }
        pz.list.push(item);
      }
      const query = xml.getElementsByTagName('Query')[0];
      pz.pages = Number(There.pxText(query, 'Pages')) || 1;
      There.drawPlaceResults(out);
    });
  },

  drawPlaceResults: function(out) {
    const pz = There.pzState();
    $(out).empty();
    if (!pz.list.length) {
      $(out).html(`<div class="empty">${pz.text ? `No places match "${pz.text}".` : 'No places here right now.'}</div>`);
      $('.footcount').text('');
      return;
    }
    for (const z of pz.list) {
      let row = $('<div class="pzrow"></div>');
      let pic = $('<div class="pzpic"></div>');
      if (z.pic) {
        $('<img alt="" loading="lazy">').attr('src', There.pzPicture(z.pic)).on('error', function() {
          $(this).remove();
        }).appendTo($(pic));
      }
      let main = $('<div class="pzmain"></div>');
      $('<div class="pztitle"></div>').text(z.title || 'Untitled').appendTo($(main));
      const where = [z.location, z.region].filter(Boolean).join(' · ');
      $('<div class="evmeta"></div>').text([z.type + (z.club ? ' (club)' : ''), where].filter(Boolean).join(' · ')).appendTo($(main));
      let side = $('<div class="evside"></div>');
      if (z.status == 1) {
        $('<span class="evfee" data-free="1"></span>').text(z.rate ? `${There.pzMoney(z.rate)} to rent` : 'For rent').appendTo($(side));
      } else if (z.renter) {
        $('<span class="evcap"></span>').text(z.renter).appendTo($(side));
      }
      if (z.cap) {
        $('<span class="evcap"></span>').text(`Up to ${z.cap}`).appendTo($(side));
      }
      $(row).append(pic, main, side).on('click', function() {
        There.playSound('control down');
        pz.open = z;
        There.renderPlaceSearch(false);
      }).appendTo($(out));
    }
    if (pz.page < pz.pages) {
      let more = $('<div class="button pzmore"></div>').text('More places').on('click', function() {
        There.playSound('control down');
        $(more).text('Loading…').attr('data-off', '1');
        pz.page++;
        There.fetchPlacePage(out);
      });
      $('<div class="pzmorerow"></div>').append(more).appendTo($(out));
    }
    $('.footcount').text(`${pz.list.length} place${pz.list.length == 1 ? '' : 's'}${pz.page < pz.pages ? ' so far' : ''}`);
  },

  // a place's page from anywhere (event pages, search results). what's known
  // is drawn at once; the rest comes from the place's record on There Central
  // (public) and its event schedule (with the login)
  showPlace: function(oid, name, seed) {
    oid = String(oid || '').replace(/\D/g, '');
    if (!oid) {
      return;
    }
    const pz = There.pzState();
    pz.open = Object.assign({
      oid: oid, title: name || '', type: '', desc: '', region: '', location: '', pic: '',
      renter: '', renterOid: '', status: 0, rate: 0, cap: 0, club: false,
    }, seed || {});
    There.data.placesTab = 'search';
    if (There.data.panel != 'places') {
      There.togglePanel('places');
    } else {
      There.showPlacesTab();
    }
  },

  // the place's record: description, picture, map, who runs it, the rent
  placeFill: function(z, redraw) {
    if (z.full) {
      return;
    }
    z.full = 'loading';
    There.webappsFetch(`funzone/funzone?op=view&id=${encodeURIComponent(z.oid)}`, function(xml) {
      const fz = xml ? xml.getElementsByTagName('FunZone')[0] : null;
      if (fz) {
        z.title = There.pxText(fz, 'UserTitle') || z.title;
        z.desc = There.pxText(fz, 'UserDesc') || z.desc;
        z.location = There.pxText(fz, 'Location') || z.location;
        z.region = There.pxText(fz, 'Region') || z.region;
        z.pic = There.pxText(fz, 'ImageUrl') || z.pic;
        z.map = There.pxText(fz, 'MapUrl');
        z.rentPrice = Number(There.pxText(fz, 'RentPrice')) || 0;
        z.rentPeriod = Number(There.pxText(fz, 'RentPeriod')) || 0;
        const op = xml.getElementsByTagName('Operator')[0];
        if (op && There.pxText(op, 'Name')) {
          z.renter = There.pxText(op, 'Name');
          z.renterOid = There.pxText(op, 'Doid');
        }
      }
      z.full = true;
      redraw();
    });
  },

  // upcoming events at the place
  placeEvents: function(z, redraw) {
    if (z.events !== undefined) {
      return;
    }
    z.events = 'loading';
    There.evFetch(`eventmgmt/eventmgmt?op=zonesched&id=${encodeURIComponent(z.oid)}`, function(xml, raw) {
      if (xml) {
        const now = new Date();
        z.events = There.evParse(xml).filter(e => !e.close || e.close > now).sort((a, b) => (a.open || 0) - (b.open || 0));
      } else {
        z.events = /<html|<!DOCTYPE/i.test(raw || '') ? 'login' : [];
      }
      redraw();
    });
  },

  renderPlaceDetail: function(z, out) {
    const pz = There.pzState();
    $(out).empty();
    const redraw = function() {
      if (pz.open === z && There.data.panel == 'places' && There.data.placesTab == 'search') {
        There.renderPlaceSearch(false);
      }
    };
    There.placeFill(z, redraw);
    There.placeEvents(z, redraw);
    let d = $('<div class="evdetail pzdetail"></div>');
    $('<div class="idback"></div>').text('‹ Back to results').on('click', function() {
      There.playSound('control down');
      pz.open = null;
      There.renderPlaceSearch(false);
    }).appendTo($(d));
    let hero = $('<div class="evhero"></div>');
    let pic = $('<div class="evpic"></div>');
    if (z.pic) {
      $('<img alt="">').attr('src', There.pzPicture(z.pic)).on('error', function() {
        $(this).remove();
        $(pic).html(tmuiIcon('map-location-dot'));
      }).appendTo($(pic));
    } else {
      $(pic).html(tmuiIcon('map-location-dot'));
    }
    let head = $('<div class="evhead"></div>');
    $('<div class="evname"></div>').text(z.title || 'Untitled').appendTo($(head));
    if (z.renter) {
      $('<div class="evhost"></div>').append(document.createTextNode('Run by '), $('<a></a>').text(z.renter).on('click', function() {
        There.showProfile(z.renterOid, z.renter);
      })).appendTo($(head));
    }
    let tags = $('<div class="evtags"></div>');
    if (z.type) {
      $('<span class="evtag"></span>').text(z.type + (z.club ? ', club members' : '')).appendTo($(tags));
    }
    if (z.status == 1) {
      $('<span class="evtag" data-kind="free"></span>').text(z.rate ? `${There.pzMoney(z.rate)} to rent` : 'For rent').appendTo($(tags));
    } else if (z.rentPrice) {
      $('<span class="evtag" data-kind="paid"></span>').text(`Rent ${There.pzMoney(z.rentPrice)}${z.rentPeriod ? ` per ${z.rentPeriod} days` : ''}`).appendTo($(tags));
    }
    if (z.cap) {
      $('<span class="evtag"></span>').text(`Up to ${z.cap} people`).appendTo($(tags));
    }
    $(head).append(tags);
    $(hero).append(pic, head).appendTo($(d));
    let btns = $('<div class="idbtns evbtns"></div>');
    $('<div class="button evgo"></div>').attr('data-primary', '1').append(
      $('<span class="evbtnicon"></span>').html(tmuiIcon('map-location-dot')), $('<span></span>').text('Go there now'))
      .on('click', function() {
        There.playSound('menu item activate');
        There.gotoTeleport(`obj=${encodeURIComponent(z.oid)}&shuffleok=1`);
      }).appendTo($(btns));
    $('<span class="idlink"></span>').text('View on There Central').on('click', function() {
      There.openUrl(`https://webapps.prod.there.com/funzone/funzone?op=view&id=${z.oid}`);
    }).appendTo($(btns));
    $(d).append(btns);
    let cards = $('<div class="evcards"></div>');
    const where = [z.location, z.region].filter(Boolean);
    if (where.length) {
      let c = $('<div class="evcard"></div>');
      $('<div class="evcardhead"></div>').append($('<span class="evcardicon"></span>').html(tmuiIcon('map-location-dot')), $('<span></span>').text('Where')).appendTo($(c));
      $('<div class="evcardmain"></div>').text(where[0]).appendTo($(c));
      if (where[1]) {
        $('<div class="evcardsub"></div>').text(where[1]).appendTo($(c));
      }
      if (z.map) {
        // the site's little map of the spot, when it has one
        $('<img class="pzmap" alt="">').attr('src', There.pzPicture(z.map)).on('error', function() {
          $(this).remove();
        }).appendTo($(c));
      }
      $(c).appendTo($(cards));
    }
    if (cards.children().length) {
      $(d).append(cards);
    }
    if (z.desc) {
      $('<div class="evsection"></div>').text('About this place').appendTo($(d));
      $('<div class="evabout"></div>').text(z.desc).appendTo($(d));
    } else if (z.full == 'loading') {
      $('<div class="evcardsub"></div>').text('Loading the details\u2026').appendTo($(d));
    }
    $('<div class="evsection"></div>').text('Events here').appendTo($(d));
    const evs = z.events;
    if (evs == 'loading') {
      $('<div class="evcardsub"></div>').text('Checking the schedule\u2026').appendTo($(d));
    } else if (evs == 'login') {
      $('<div class="evcardsub"></div>').text('The schedule needs your login: it works after the next There restart.').appendTo($(d));
    } else if (!evs || !evs.length) {
      $('<div class="evcardsub"></div>').text('Nothing scheduled here right now.').appendTo($(d));
    } else {
      let list = $('<div class="pzevents"></div>');
      for (const ev of evs.slice(0, 12)) {
        There.evRow(ev).on('click', function() {
          There.playSound('control down');
          There.openEventFromPlace(ev);
        }).appendTo($(list));
      }
      $(list).appendTo($(d));
    }
    $(out).append(d);
    $('.footcount').text('');
  },

  /* ------- Pages from There Central -------
   * Help articles, club pages, classifieds: the page is fetched through
   * FlashProxy (with the login where the site wants it), drawn through its
   * own stylesheet when it comes as XML, and its content shown here minus
   * the site's header, menus and footer. Links inside go to the dock's own
   * panels when there is one for them, else stay in this panel; anything
   * off There Central opens in the browser. */

  SITE_BASE: 'https://webapps.prod.there.com/',

  // a There Central address -> the bridge path, or null for other sites
  siteBridgePath: function(url) {
    let u = null;
    try {
      u = new URL(url, There.SITE_BASE);
    } catch (error) {
      return null;
    }
    if (!/^https?:$/.test(u.protocol) || u.hostname != 'webapps.prod.there.com') {
      return null;
    }
    return u.pathname.replace(/^\//, '') + u.search;
  },

  // open a site address in the right place: a dock panel for the kinds it
  // knows, this panel for the rest of There Central, the browser otherwise
  openSite: function(url, title) {
    const path = There.siteBridgePath(url);
    if (path === null) {
      There.openUrl(url);
      return;
    }
    const q = new URL(url, There.SITE_BASE).searchParams;
    const m = function(re) {
      return re.test(path);
    };
    if (m(/^profiles\/profiles\?/) && q.get('AvatarDoid')) {
      There.showProfile(q.get('AvatarDoid'), title || '');
      return;
    }
    if (m(/^profiles\/profiles\?/) && q.get('AvatarName')) {
      There.showProfileByName(q.get('AvatarName'));
      return;
    }
    // a list of groups (a category or a search) opens in Groups
    if (m(/^listings\/listings\?/) && q.get('Type') == '7') {
      There.showGroupList(url, title || '');
      return;
    }
    if (m(/^funzone\/funzone\?/) && q.get('op') == 'view' && q.get('id')) {
      There.showPlace(q.get('id'), title || '', {});
      return;
    }
    if (m(/^eventmgmt\/eventmgmt\?/) && q.get('op') == 'view' && q.get('id')) {
      There.openEventFromPlace({ id: q.get('id'), title: title || '' });
      return;
    }
    if (m(/^zones\/browse/)) {
      const t = (q.get('ZoneType') || q.get('Filter') || 'all').toLowerCase();
      There.placeSearchPreset({ type: q.get('RequiresClub') == '1' ? 'club' : (t == 'all' ? 'all' : t), rent: q.get('Rentable') == '1' });
      return;
    }
    if (m(/^clubs\/clubs\?/) && q.get('op') == 'showmembers' && q.get('id')) {
      There.showClubMembers(url, title || '');
      return;
    }
    if (m(/^eventmgmt\/browse\?/)) {
      // the events list, without the site's page size so the panel gets them all
      const bq = new URLSearchParams(q);
      bq.set('PageSize', '200');
      // a group's Events button passes "<group>: Events"
      const group = title && title.includes(':') ? title.split(':')[0].trim() : '';
      There.showEventBrowse(`eventmgmt/browse?${bq.toString()}`, group ? `${group} events` : 'Group events');
      return;
    }
    if (m(/^clubs\/clubs\?/) && q.get('id') && (q.get('op') || 'home') == 'home') {
      There.showClub(q.get('id'), title || '');
      return;
    }
    // a group's own pages (Email, Invite, Applications, Administration...)
    if (m(/^clubs\/clubs\?/) && q.get('id') && !/^(home|showmembers|showforum|create)$/.test(q.get('op') || 'home')) {
      There.showClubTool(url, title || '');
      return;
    }
    if (m(/^clubs\/clubs$/) || (m(/^clubs\/clubs\?/) && !q.get('id') && q.get('op') != 'create')) {
      There.togglePanel('groups');
      return;
    }
    if (m(/^catalog\/product\?/) && q.get('category')) {
      There.openShopCat(q.get('category'));
      return;
    }
    if (m(/^items\/view\?/) && q.get('ItemId')) {
      if (There.data.panel != 'auctions') {
        There.togglePanel('auctions');
      }
      There.showAuctionDetail(q.get('ItemId'));
      return;
    }
    // pages that only make sense in a real browser
    if (m(/^gmap\//) || m(/^login\//) || m(/^banker\//) || m(/^catalog\/product\?(confirm|rentconfirm|try)=/)) {
      There.openUrl(url);
      return;
    }
    There.showSitePage(url, title);
  },

  showSitePage: function(url, title) {
    const full = new URL(url, There.SITE_BASE).href;
    There.data.web = There.data.web || { stack: [] };
    const w = There.data.web;
    if (There.data.panel != 'web') {
      // a fresh visit: Back leads to the panel this was opened from
      w.stack = [];
      w.current = null;
      w.from = There.data.panel || null;
    }
    if (!w.current || w.current.url != full) {
      if (w.current) {
        w.stack.push(w.current);
      }
      w.current = { url: full, title: title || '' };
    }
    if (There.data.panel == 'web') {
      There.loadSitePage();
    } else {
      There.togglePanel('web');
    }
  },

  loadSitePage: function() {
    const w = There.data.web;
    const body = $('.webbody');
    if (!w || !w.current) {
      $(body).html('<div class="empty">Nothing open.</div>');
      return;
    }
    const cur = w.current;
    $('.webpanel .paneltitle').text(cur.title || 'There Central');
    $('.webback').attr('data-off', w.stack.length || w.from ? '0' : '1');
    $('.webnote').text('Live from There Central');
    $(body).html('<div class="empty">Loading the page\u2026</div>');
    const path = There.siteBridgePath(cur.url);
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(raw) {
        if (There.data.web.current !== cur || There.data.panel != 'web') {
          return;
        }
        raw = raw || '';
        if (/Login Required|<title>[^<]*Log ?in/i.test(raw) && !/<Help>/.test(raw)) {
          $(body).html('<div class="empty">There Central wants you signed in for this page. It works after the next There restart.</div>');
          return;
        }
        const pi = raw.match(/<\?xml-stylesheet[^>]*href="([^"]+)"/);
        if (/^\s*<\?xml/.test(raw) && pi) {
          There.xslRender(raw, new URL(pi[1], cur.url).href, function(doc) {
            if (There.data.web.current !== cur || There.data.panel != 'web') {
              return;
            }
            if (!doc) {
              $(body).html('<div class="empty">The dock couldn\'t draw this page. Try it on There Central.</div>');
              return;
            }
            There.renderSitePage(doc, cur);
          });
          return;
        }
        There.renderSitePage(new DOMParser().parseFromString(raw, 'text/html'), cur);
      },
      error: function() {
        if (There.data.web.current === cur && There.data.panel == 'web') {
          $(body).html('<div class="empty">Couldn\'t reach There Central. Try again in a moment.</div>');
        }
      },
    });
  },

  // the page's content, the site's chrome left out, links and pictures fixed
  renderSitePage: function(doc, cur, target) {
    const body = $(target || '.webbody');
    // XSLT output can be an XML document: read it back as HTML
    try {
      doc = There.asHtmlDoc(doc) || doc;
    } catch (error) {
    }
    const root = doc.body || doc.documentElement;
    if (!root) {
      $(body).html('<div class="empty">The page was empty.</div>');
      return;
    }
    for (const el of root.querySelectorAll('#header, #globalNav, #breadcrumb, #footer, #linkList, #adwrapper, #globalSearchSec, script, style, link, iframe, object, embed, meta, noscript')) {
      el.remove();
    }
    // the part of the page that is the page. help articles sit in .content
    // beside an "Ask Us" sidebar (#Help) and a title strip, which go
    if (root.querySelector('#Help') && root.querySelector('.content')) {
      for (const el of root.querySelectorAll('#Help, .title')) {
        el.remove();
      }
    }
    const main = root.querySelector('#content') || root.querySelector('.content') || root.querySelector('#wrapper') || root;
    const page = document.createElement('div');
    page.className = 'sitepage';
    page.innerHTML = main.innerHTML;
    for (const el of page.querySelectorAll('form')) {
      el.replaceWith(...el.childNodes);
    }
    for (const el of page.querySelectorAll('*')) {
      for (const a of Array.from(el.attributes)) {
        if (/^on/i.test(a.name) || a.name == 'style' && /expression\(/i.test(a.value)) {
          el.removeAttribute(a.name);
        }
      }
      if (el.hasAttribute('background')) {
        el.removeAttribute('background');
      }
    }
    for (const img of page.querySelectorAll('img')) {
      const v = img.getAttribute('src') || '';
      // the site's spacer and button pictures aren't content
      if (/clear\.gif|btn_|nonpadded_triangle|bc_arrow|tc_logo|head_search/i.test(v) || !v) {
        img.remove();
        continue;
      }
      try {
        img.setAttribute('src', new URL(v, cur.url).href);
      } catch (error) {
        img.remove();
      }
    }
    for (const a of page.querySelectorAll('a')) {
      const href = a.getAttribute('href') || '';
      const label = (a.textContent || '').trim();
      a.removeAttribute('href');
      a.removeAttribute('target');
      if (!href || /^javascript:/i.test(href)) {
        continue;
      }
      $(a).on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        There.playSound('control down');
        let url = null;
        try {
          url = new URL(href, cur.url);
        } catch (error) {
          return;
        }
        There.openSite(url.href, label);
      });
    }
    // a title from the page when the link that opened it had none
    const title = (doc.title || '').replace(/\s+/g, ' ').trim();
    if (!cur.title && title && !target) {
      cur.title = title.replace(/^There (Help|Central)\s*[:-]?\s*/i, '');
      $('.webpanel .paneltitle').text(cur.title || 'There Central');
    }
    $(body).empty().append(page);
    $(body).scrollTop(0);
  },

  /* ------- Groups -------
   * There Central's Groups page (clubs/clubs, with the login), drawn through
   * its stylesheet and read for its five sections and their categories. A
   * category, a search or a club opens in the There Central panel, whose
   * Back comes back here. My groups are the clubs on your own profile. */

  GR_SECTIONS: {
    1001: 'Teams & Leagues', 1002: 'Businesses', 1003: 'Social & Recreation',
    1004: 'Neighborhoods & Households', 1005: 'Community',
  },

  GR_LIST: 'listings/listings?Type=7&PageSize=20&SinglePage=10&StylesheetSingle=/clubs/clubs_listing.xsl' +
    '&StylesheetMultiple=/clubs/clubs_listing_multiple.xsl&MultiplePage=3&SortAscDate=Date&PatchName=LeaderDoid' +
    '&PatchRestriction=Id&GroupCount=MembersGroupId',

  renderGrTabs: function() {
    const tabs = $('.grtabs');
    $(tabs).empty();
    const cur = There.data.grTab || 'browse';
    for (const [id, label] of [['browse', 'Browse'], ['mine', 'My groups']]) {
      $('<div class="tab"></div>').text(label).attr('data-active', id == cur ? '1' : '0').on('click', function() {
        if (There.data.grTab == id && !There.data.grClub && !There.data.grList && !There.data.grMembers && !There.data.grTool) {
          return;
        }
        There.playSound('control down');
        There.data.grTab = id;
        There.data.grClub = null;
        There.data.grList = null;
        There.data.grMembers = null;
        There.data.grTool = null;
        There.loadGroups(false);
      }).appendTo($(tabs));
    }
  },

  // a stylesheet's output as a plain HTML document. it can come back as an XML
  // document, where an empty element is written <table/>; read as HTML that
  // opens a table and swallows everything after it, so those are written out
  // in full first (the real void elements, like <br/> and <img/>, stay)
  asHtmlDoc: function(doc) {
    if (!doc || !doc.documentElement) {
      return null;
    }
    let html = doc.documentElement.outerHTML || '';
    if (doc.contentType && doc.contentType != 'text/html') {
      html = html.replace(/<([a-zA-Z][\w:-]*)(\s[^<>]*?)?\s*\/>/g, function(all, tag, attrs) {
        return /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(tag) ? all : `<${tag}${attrs || ''}></${tag}>`;
      });
    }
    return html ? new DOMParser().parseFromString(html, 'text/html') : null;
  },

  // a site page fetched with the login and drawn through its stylesheet,
  // handed back as a plain HTML document
  sitePageDoc: function(path, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    const base = There.SITE_BASE + path;
    const done = function(doc) {
      try {
        cb(There.asHtmlDoc(doc));
      } catch (error) {
        cb(null);
      }
    };
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(raw) {
        raw = raw || '';
        const pi = raw.match(/<\?xml-stylesheet[^>]*href="([^"]+)"/);
        if (/^\s*<\?xml/.test(raw) && pi) {
          There.xslRender(raw, new URL(pi[1], base).href, done);
          return;
        }
        done(raw ? new DOMParser().parseFromString(raw, 'text/html') : null);
      },
      error: function() {
        cb(null);
      },
    });
  },

  loadGroups: function(force) {
    There.renderGrTabs();
    const body = $('.grbody');
    $('.grcount').text('');
    $('.groupspanel .paneltitle').text('Groups');
    if (There.data.grTool) {
      There.loadClubTool();
      return;
    }
    if (There.data.grMembers) {
      There.loadMembers(false);
      return;
    }
    if (There.data.grClub) {
      There.loadClub();
      return;
    }
    if (There.data.grList) {
      There.loadGroupList(false);
      return;
    }
    if ((There.data.grTab || 'browse') == 'mine') {
      There.loadMyGroups(force);
      return;
    }
    if (There.data.grHome && !force) {
      There.drawGroups(There.data.grHome);
      return;
    }
    $(body).html('<div class="empty">Loading groups\u2026</div>');
    There.sitePageDoc('clubs/clubs', function(doc) {
      if (There.data.panel != 'groups' || (There.data.grTab || 'browse') != 'browse') {
        return;
      }
      const home = doc ? There.parseGroups(doc) : null;
      if (!home || !home.length) {
        $(body).html('<div class="empty">Groups didn\'t load. It needs your login, so it works after the next There restart; or try Refresh.</div>');
        return;
      }
      There.data.grHome = home;
      There.drawGroups(home);
    });
  },

  // the five sections: each one's blurb and its categories with counts
  parseGroups: function(doc) {
    const out = [];
    for (const id of Object.keys(There.GR_SECTIONS)) {
      const mark = doc.getElementById(id);
      const box = mark ? mark.closest('table') : null;
      if (!box) {
        continue;
      }
      const blurbEl = box.querySelector('.gry9');
      let blurb = blurbEl ? blurbEl.textContent.replace(/\s+/g, ' ').replace(/\bHelp\s*$/, '').trim() : '';
      const cats = [];
      for (const a of box.querySelectorAll('a[href*="listings"]')) {
        const href = a.getAttribute('href') || '';
        const cat = (href.match(/[?&]Category=(\d+)/) || [])[1];
        if (!cat) {
          continue;
        }
        const after = a.nextElementSibling;
        const count = after ? (after.textContent.match(/\((\d+)\)/) || [])[1] : '';
        cats.push({ id: cat, name: a.textContent.replace(/["\u201C\u201D]/g, '').trim(), count: count ? Number(count) : null });
      }
      if (cats.length) {
        out.push({ id: id, name: There.GR_SECTIONS[id], blurb: blurb, cats: cats });
      }
    }
    return out;
  },

  drawGroups: function(home) {
    const body = $('.grbody');
    $(body).empty();
    let total = 0;
    for (const sec of home) {
      let box = $('<div class="grsect"></div>');
      let head = $('<div class="grsecthead"></div>');
      $('<span class="grsectname"></span>').text(sec.name).appendTo($(head));
      $('<div class="button"></div>').text('Start one').attr('title', `Create a new ${sec.name.toLowerCase()} group on There Central`).on('click', function() {
        There.openUrl(`https://webapps.prod.there.com/clubs/clubs?op=create&category=${sec.id}`);
      }).appendTo($(head));
      $(box).append(head);
      if (sec.blurb) {
        $('<div class="grsectblurb"></div>').text(sec.blurb).appendTo($(box));
      }
      let cats = $('<div class="grcats"></div>');
      for (const c of sec.cats) {
        total += c.count || 0;
        let chip = $('<span class="grcat"></span>').append($('<span></span>').text(c.name));
        if (c.count != null) {
          $('<b></b>').text(c.count).appendTo($(chip));
        }
        $(chip).on('click', function() {
          There.playSound('control down');
          There.showGroupList(There.SITE_BASE + There.GR_LIST + `&Category=${c.id}&Filter=${c.id}`, c.name);
        }).appendTo($(cats));
      }
      $(box).append(cats).appendTo($(body));
    }
    $('.grcount').text(total ? `${total.toLocaleString()} groups` : '');
  },

  /* a list of groups (a category or a search), from the site's listing page:
     each club's name, description, leader, members and any skill it needs */
  showGroupList: function(url, title) {
    const from = There.data.panel && There.data.panel != 'groups' ? There.data.panel : null;
    There.data.grClub = null;
    There.data.grList = { url: new URL(url, There.SITE_BASE).href, title: title || '', items: [], next: '', pages: 0, from: from, loaded: false };
    if (There.data.panel == 'groups') {
      There.loadGroups(false);
    } else {
      There.togglePanel('groups');
    }
  },

  parseGroupList: function(doc) {
    const items = [];
    const seen = {};
    for (const a of doc.querySelectorAll('a[href*="clubs?op=home"], a[href*="clubs?id="]')) {
      const href = a.getAttribute('href') || '';
      const id = (href.match(/[?&]id=(\d+)/) || [])[1];
      const row = a.closest('tr');
      if (!id || seen[id] || !row) {
        continue;
      }
      const tds = row.querySelectorAll(':scope > td');
      if (tds.length < 3) {
        continue;
      }
      seen[id] = true;
      const cell = tds[0];
      const desc = cell.textContent.replace(a.textContent, '').replace(/\s+/g, ' ').trim();
      items.push({
        id: id,
        name: a.textContent.replace(/_/g, ' ').trim(),
        desc: desc,
        leader: tds[1].textContent.trim(),
        members: Number(tds[2].textContent.trim()) || 0,
        skill: tds[3] ? tds[3].textContent.replace(/\s+/g, ' ').trim() : '',
      });
    }
    let next = '';
    let pages = 0;
    for (const a of doc.querySelectorAll('a[href*="listings"]')) {
      const t = a.textContent.replace(/\s+/g, ' ').trim();
      if (/^Next/i.test(t)) {
        next = a.getAttribute('href') || '';
      } else if (/^\d+$/.test(t)) {
        pages = Math.max(pages, Number(t));
      }
    }
    return { items: items, next: next, pages: pages };
  },

  loadGroupList: function(more) {
    const L = There.data.grList;
    const body = $('.grbody');
    $('.groupspanel .paneltitle').text(L.title || 'Groups');
    if (L.loaded && !more) {
      There.drawGroupList();
      return;
    }
    if (!more) {
      $(body).html('<div class="empty">Loading groups\u2026</div>');
    }
    const url = more ? new URL(L.next, There.SITE_BASE).href : L.url;
    There.sitePageDoc(There.siteBridgePath(url), function(doc) {
      if (There.data.panel != 'groups' || There.data.grList !== L) {
        return;
      }
      if (!doc) {
        $(body).html('<div class="empty">The list didn\'t load. Try Refresh in a moment.</div>');
        return;
      }
      const r = There.parseGroupList(doc);
      L.items = L.items.concat(r.items.filter(i => !L.items.some(x => x.id == i.id)));
      L.next = r.next;
      L.pages = Math.max(L.pages, r.pages);
      L.page = (L.page || 0) + 1;
      L.loaded = true;
      There.drawGroupList();
    });
  },

  drawGroupList: function() {
    const L = There.data.grList;
    const body = $('.grbody');
    $(body).empty();
    $('<div class="idback"></div>').text(L.from ? '\u2039 Back' : '\u2039 Back to groups').on('click', function() {
      There.playSound('control down');
      There.data.grList = null;
      if (L.from) {
        There.togglePanel(L.from);
      } else {
        There.loadGroups(false);
      }
    }).appendTo($(body));
    if (!L.items.length) {
      $('<div class="empty"></div>').text('No groups here.').appendTo($(body));
      $('.grcount').text('');
      return;
    }
    let list = $('<div class="pzlist"></div>');
    for (const g of L.items) {
      let row = $('<div class="pzrow grrow"></div>');
      $('<div class="grbadge"></div>').html(tmuiIcon('user-group')).appendTo($(row));
      let main = $('<div class="pzmain"></div>');
      $('<div class="pztitle"></div>').text(g.name).appendTo($(main));
      if (g.desc) {
        $('<div class="grdesc"></div>').text(g.desc).appendTo($(main));
      }
      let meta = $('<div class="evmeta"></div>').append(document.createTextNode('Led by '));
      $('<a class="grlead"></a>').text(g.leader).on('click', function(ev) {
        ev.stopPropagation();
        There.playSound('control down');
        There.showProfileByName(g.leader);
      }).appendTo($(meta));
      if (g.skill) {
        $(meta).append(document.createTextNode(` \u00B7 needs ${g.skill}`));
      }
      $(main).append(meta);
      let side = $('<div class="evside"></div>');
      $('<span class="evcap"></span>').text(`${g.members} member${g.members == 1 ? '' : 's'}`).appendTo($(side));
      $(row).append(main, side).on('click', function() {
        There.playSound('control down');
        There.showClub(g.id, g.name);
      }).appendTo($(list));
    }
    $(body).append(list);
    if (L.next) {
      let more = $('<div class="button pzmore"></div>').text('More groups').on('click', function() {
        There.playSound('control down');
        $(more).text('Loading\u2026').attr('data-off', '1');
        There.loadGroupList(true);
      });
      $('<div class="pzmorerow"></div>').append(more).appendTo($(body));
    }
    $('.grcount').text(`${L.items.length} group${L.items.length == 1 ? '' : 's'}${L.next ? ` of about ${L.pages * 10}` : ''}`);
  },

  /* the club's home page -> plain fields */
  parseClub: function(doc) {
    const clean = function(t) {
      return String(t || '').replace(/\s+/g, ' ').trim();
    };
    const content = doc.querySelector('#content') || doc.body;
    if (!content) {
      return null;
    }
    const nameEl = content.querySelector('.gry14Bld');
    const c = {
      name: nameEl ? clean(nameEl.textContent).replace(/\s*Home Page$/i, '') : '',
      tabs: [], desc: '', photo: '', info: [], leader: '', founder: '', founded: '',
      status: '', join: '', stats: [], sections: [],
    };
    // the section links (Home, Members, Email, Administration...)
    const navCell = Array.from(content.querySelectorAll('table.gry10 td')).find(td => clean(td.textContent) == 'Home');
    if (navCell) {
      for (const td of navCell.closest('tr').querySelectorAll(':scope > td')) {
        const a = td.querySelector('a');
        if (a) {
          c.tabs.push({ label: clean(a.textContent), href: a.getAttribute('href') || '' });
        }
      }
    }
    // the headings are pictures named txt_<name>.gif; what follows each is its content
    const heads = Array.from(content.querySelectorAll('img[src*="/clubs/media/txt_"]'));
    const after = function(img) {
      const parts = [];
      let n = img.nextElementSibling;
      while (n && !(n.matches && n.matches('img[src*="/clubs/media/txt_"]')) && !n.querySelector('img[src*="/clubs/media/txt_"]')) {
        parts.push(n);
        n = n.nextElementSibling;
      }
      return parts;
    };
    for (const h of heads) {
      const key = ((h.getAttribute('src') || '').match(/txt_([A-Za-z]+)/) || [])[1] || '';
      const parts = after(h);
      if (/description/i.test(key)) {
        c.desc = parts.map(p => p.textContent).join('\n').trim();
      } else if (/photo/i.test(key)) {
        const img = parts.map(p => p.tagName == 'IMG' ? p : p.querySelector('img')).find(Boolean);
        const src = img ? img.getAttribute('src') || '' : '';
        if (src && !/img_groupPhoto\.gif/i.test(src)) {
          c.photo = new URL(src, There.SITE_BASE + 'clubs/').href;
        }
      } else if (/info/i.test(key)) {
        // filled from the rows below
      } else {
        const title = key.replace(/^group/i, '').replace(/([a-z])([A-Z])/g, '$1 $2') || 'More';
        const links = [];
        let text = '';
        for (const p of parts) {
          for (const a of p.tagName == 'A' ? [p] : p.querySelectorAll('a')) {
            if (clean(a.textContent)) {
              links.push({ label: clean(a.textContent), href: a.getAttribute('href') || '' });
            }
          }
          text += ' ' + p.textContent;
        }
        text = clean(text);
        if (links.length || text) {
          c.sections.push({ title: title.charAt(0).toUpperCase() + title.slice(1), links: links, text: links.length ? '' : text });
        }
      }
    }
    // group info rows
    const infoImg = heads.find(h => /txt_groupinfo/i.test(h.getAttribute('src') || ''));
    const infoTable = infoImg ? infoImg.parentElement.querySelector('table') : null;
    if (infoTable) {
      for (const td of infoTable.querySelectorAll('td.gry9')) {
        if (td.querySelector('img') && !clean(td.textContent)) {
          continue;
        }
        const t = clean(td.textContent.replace(/printDateSmall[\s\S]*?;|var cd[\s\S]*?;/g, ''));
        if (!t || td.querySelector('td')) {
          continue;
        }
        const leadA = td.querySelector('a[href*="AvatarName="]');
        if (/^Founded/i.test(t)) {
          const cd = (td.innerHTML.match(/var cd = '([^']+)'/) || [])[1];
          c.founded = cd ? (There.evTime(cd) || null) : null;
          c.founder = leadA ? clean(leadA.textContent) : '';
        } else if (/^Current leader/i.test(t)) {
          c.leader = leadA ? clean(leadA.textContent) : t.replace(/^Current leader:\s*/i, '');
        } else if (!c.info.includes(t)) {
          c.info.push(t);
        }
      }
      // "Group Type: Teams / "Buggy"" sits in a nested table
      const typeRow = Array.from(infoTable.querySelectorAll('tr')).find(tr => /^Group Type/i.test(clean(tr.textContent)) && !tr.querySelector('tr'));
      if (typeRow) {
        c.type = clean(typeRow.textContent).replace(/^Group Type:\s*/i, '').replace(/"/g, '');
        c.info = c.info.filter(t => !/^Group Type/i.test(t));
      }
    }
    // your status and the stats box
    const statusCell = Array.from(content.querySelectorAll('td.gry9')).find(td => /^You are/i.test(clean(td.textContent)));
    if (statusCell) {
      c.status = clean(statusCell.textContent).replace(/^You are\s*/i, '').replace(/\.$/, '');
      const j = statusCell.querySelector('a[href*="op=join"]');
      c.join = j ? j.getAttribute('href') : '';
    }
    for (const td of content.querySelectorAll('td.gry9')) {
      const t = clean(td.textContent);
      if (/^(Sports Group:|Group Rating:|\d[\d,]* (members|pending))/i.test(t) && !c.stats.includes(t)) {
        c.stats.push(t);
      }
    }
    return c.name ? c : null;
  },

  renderClub: function(c, cl, url) {
    const body = $('.grbody');
    $(body).empty();
    $('.groupspanel .paneltitle').text(c.name);
    $('<div class="idback"></div>').text(cl.from || cl.list ? '\u2039 Back' : '\u2039 Back to groups').on('click', function() {
      There.playSound('control down');
      There.data.grClub = null;
      if (cl.from) {
        There.togglePanel(cl.from);
      } else {
        There.data.grList = cl.list || null;
        There.loadGroups(false);
      }
    }).appendTo($(body));
    let d = $('<div class="evdetail"></div>');
    let hero = $('<div class="evhero"></div>');
    let pic = $('<div class="evpic"></div>');
    if (c.photo) {
      $('<img alt="">').attr('src', c.photo).on('error', function() {
        $(this).remove();
        $(pic).html(tmuiIcon('user-group'));
      }).appendTo($(pic));
    } else {
      $(pic).html(tmuiIcon('user-group'));
    }
    let head = $('<div class="evhead"></div>');
    if (c.status) {
      const leader = /leader/i.test(c.status);
      const member = /member/i.test(c.status) && !/visitor/i.test(c.status);
      $('<div class="evstatus"></div>').attr('data-kind', leader ? 'soon' : member ? 'live' : 'later')
        .append($('<span class="evdot"></span>'), $('<span></span>').text(leader ? 'You lead this group' : member ? 'You\'re a member' : 'You\'re visiting')).appendTo($(head));
    }
    $('<div class="evname"></div>').text(c.name).appendTo($(head));
    if (c.leader) {
      $('<div class="evhost"></div>').append(document.createTextNode('Led by '), $('<a></a>').text(c.leader).on('click', function() {
        There.showProfileByName(c.leader);
      })).appendTo($(head));
    }
    let tags = $('<div class="evtags"></div>');
    if (c.type) {
      $('<span class="evtag"></span>').text(c.type).appendTo($(tags));
    }
    for (const t of c.info) {
      const good = /accepting|unrestricted|\blisted/i.test(t) && !/not/i.test(t);
      $('<span class="evtag"></span>').attr('data-kind', good ? 'free' : '').text(t.replace(/^Group is\s*/i, '').replace(/^Membership is\s*/i, 'Membership ')).appendTo($(tags));
    }
    $(head).append(tags);
    $(hero).append(pic, head).appendTo($(d));

    let btns = $('<div class="idbtns evbtns"></div>');
    if (c.join) {
      $('<div class="button"></div>').attr('data-primary', '1').text('Join group').on('click', function() {
        There.openUrl(new URL(c.join, There.SITE_BASE + 'clubs/').href);
      }).appendTo($(btns));
    }
    for (const t of c.tabs) {
      $('<div class="button"></div>').text(t.label).on('click', function() {
        There.playSound('control down');
        There.openSite(new URL(t.href, There.SITE_BASE + 'clubs/').href, `${c.name}: ${t.label}`);
      }).appendTo($(btns));
    }
    if (btns.children().length) {
      $(d).append(btns);
    }

    let cards = $('<div class="evcards"></div>');
    const card = function(icon, label, main, sub) {
      let k = $('<div class="evcard"></div>');
      $('<div class="evcardhead"></div>').append($('<span class="evcardicon"></span>').html(tmuiIcon(icon)), $('<span></span>').text(label)).appendTo($(k));
      $('<div class="evcardmain"></div>').text(main).appendTo($(k));
      if (sub) {
        $('<div class="evcardsub"></div>').text(sub).appendTo($(k));
      }
      $(k).appendTo($(cards));
    };
    const memberStat = c.stats.find(t => /members$/i.test(t));
    if (memberStat) {
      const pend = c.stats.filter(t => /pending/i.test(t)).join(' \u00B7 ');
      card('user-group', 'Members', memberStat, pend);
    }
    if (c.founded || c.founder) {
      card('calendar-days', 'Founded', c.founded ? c.founded.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '', c.founder ? `by ${c.founder}` : '');
    }
    const sport = c.stats.find(t => /^Sports Group/i.test(t));
    const rating = c.stats.find(t => /^Group Rating/i.test(t));
    if (sport || rating) {
      card('map-location-dot', 'Sport', sport ? sport.replace(/^Sports Group:\s*/i, '') : '', rating ? rating.replace(/^Group /i, '') : '');
    }
    if (cards.children().length) {
      $(d).append(cards);
    }
    if (c.desc) {
      $('<div class="evsection"></div>').text('About this group').appendTo($(d));
      $('<div class="evabout"></div>').text(c.desc).appendTo($(d));
    }
    for (const sec of c.sections) {
      $('<div class="evsection"></div>').text(sec.title).appendTo($(d));
      if (sec.links.length) {
        let row = $('<div class="idbtns"></div>');
        for (const l of sec.links) {
          $('<div class="button"></div>').text(l.label).on('click', function() {
            There.playSound('control down');
            There.openSite(new URL(l.href, There.SITE_BASE + 'clubs/').href, l.label);
          }).appendTo($(row));
        }
        $(d).append(row);
      } else if (sec.text) {
        $('<div class="evabout"></div>').text(sec.text).appendTo($(d));
      }
    }
    $(body).append(d);
    $(body).scrollTop(0);
  },

  // a group's members, in the Groups panel; Back returns to the group
  showClubMembers: function(url, title) {
    const from = There.data.panel && There.data.panel != 'groups' ? There.data.panel : null;
    There.data.grMembers = {
      url: new URL(url, There.SITE_BASE).href, title: title || 'Members', items: [], next: '', loaded: false,
      club: There.data.panel == 'groups' ? There.data.grClub : null, list: There.data.grList, from: from,
    };
    if (There.data.panel == 'groups') {
      There.loadGroups(false);
    } else {
      There.togglePanel('groups');
    }
  },

  parseMembers: function(doc) {
    const items = [];
    const seen = {};
    for (const a of doc.querySelectorAll('a[href*="AvatarName="]')) {
      const row = a.closest('tr');
      if (!row || !/inviteddoid=|rcvdlst=/.test(row.innerHTML)) {
        continue;
      }
      const name = (a.textContent || '').trim();
      if (!name || seen[name]) {
        continue;
      }
      seen[name] = true;
      const tds = row.querySelectorAll(':scope > td');
      const cell = a.closest('td');
      const online = tds.length >= 4 ? /yes/i.test(tds[3].textContent) : false;
      const since = (row.innerHTML.match(/TStringToDate\(\s*'([^']+)'/) || [])[1];
      items.push({
        name: name,
        doid: (row.innerHTML.match(/(?:inviteddoid|rcvdlst)=(\d+)/) || [])[1] || '',
        leader: cell ? /\*/.test(cell.textContent) : false,
        online: online,
        since: since ? There.evTime(since) : null,
      });
    }
    let next = '';
    for (const a of doc.querySelectorAll('a[href*="showmembers"]')) {
      if (/^\s*Next/i.test(a.textContent || '')) {
        next = a.getAttribute('href') || '';
      }
    }
    return { items: items, next: next };
  },

  loadMembers: function(more) {
    const M = There.data.grMembers;
    const body = $('.grbody');
    $('.groupspanel .paneltitle').text(M.title);
    if (M.loaded && !more) {
      There.drawMembers();
      return;
    }
    if (!more) {
      $(body).html('<div class="empty">Loading members\u2026</div>');
    }
    const url = more ? new URL(M.next, There.SITE_BASE + 'clubs/').href : M.url;
    There.sitePageDoc(There.siteBridgePath(url), function(doc) {
      if (There.data.panel != 'groups' || There.data.grMembers !== M) {
        return;
      }
      if (!doc) {
        $(body).html('<div class="empty">The member list didn\'t load. Try Refresh in a moment.</div>');
        return;
      }
      const r = There.parseMembers(doc);
      M.items = M.items.concat(r.items.filter(i => !M.items.some(x => x.name == i.name)));
      M.next = r.next;
      M.loaded = true;
      // the page's own heading names the group
      const h = doc.querySelector('.gry12Bld');
      if (h && h.textContent.trim()) {
        M.title = h.textContent.trim().replace(/_/g, ' ');
      }
      There.drawMembers();
    });
  },

  drawMembers: function() {
    const M = There.data.grMembers;
    const body = $('.grbody');
    $(body).empty();
    $('.groupspanel .paneltitle').text(M.title);
    $('<div class="idback"></div>').text(M.from ? '\u2039 Back' : '\u2039 Back to the group').on('click', function() {
      There.playSound('control down');
      There.data.grMembers = null;
      if (M.from) {
        There.togglePanel(M.from);
      } else {
        There.data.grClub = M.club;
        There.data.grList = M.list;
        There.loadGroups(false);
      }
    }).appendTo($(body));
    if (!M.items.length) {
      $('<div class="empty"></div>').text('No members to show.').appendTo($(body));
      $('.grcount').text('');
      return;
    }
    // the leader first, then whoever's online, then by name
    const list = M.items.slice().sort((a, b) => b.leader - a.leader || b.online - a.online || a.name.localeCompare(b.name));
    let grid = $('<div class="grmembers"></div>');
    for (const m of list) {
      let card = $('<div class="grmember"></div>');
      $('<div class="grmface"></div>').html(tmuiIcon('user')).append($('<span class="grmdot"></span>').attr('data-on', m.online ? '1' : '0')).appendTo($(card));
      let main = $('<div class="grmmain"></div>');
      let top = $('<div class="grmname"></div>').text(m.name);
      $(main).append(top);
      const bits = [];
      if (m.online) {
        bits.push('Online now');
      }
      if (m.since) {
        bits.push(`Joined ${m.since.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`);
      }
      if (bits.length) {
        $('<div class="evmeta"></div>').text(bits.join(' \u00B7 ')).appendTo($(main));
      }
      $(card).append(main);
      if (m.leader) {
        $('<span class="proftier" data-tier="legendary"></span>').text('Leader').appendTo($(card));
      }
      $(card).attr('title', `${m.name}'s profile`).on('click', function() {
        There.playSound('control down');
        if (m.doid) {
          There.showProfile(m.doid, m.name);
        } else {
          There.showProfileByName(m.name);
        }
      }).appendTo($(grid));
    }
    $(body).append(grid);
    if (M.next) {
      let more = $('<div class="button pzmore"></div>').text('More members').on('click', function() {
        There.playSound('control down');
        $(more).text('Loading\u2026').attr('data-off', '1');
        There.loadMembers(true);
      });
      $('<div class="pzmorerow"></div>').append(more).appendTo($(body));
    }
    const on = M.items.filter(m => m.online).length;
    $('.grcount').text(`${M.items.length} member${M.items.length == 1 ? '' : 's'}${on ? `, ${on} online` : ''}`);
  },

  // one club, in the Groups panel. Back goes to where it was opened from
  showClub: function(id, name) {
    id = String(id || '').replace(/\D/g, '');
    if (!id) {
      return;
    }
    const from = There.data.panel && There.data.panel != 'groups' ? There.data.panel : null;
    // from a list, Back returns to that list
    There.data.grClub = { id: id, name: name || '', from: from, list: There.data.panel == 'groups' ? There.data.grList : null };
    if (There.data.panel == 'groups') {
      There.loadGroups(false);
    } else {
      There.togglePanel('groups');
    }
  },

  loadClub: function() {
    const c = There.data.grClub;
    const body = $('.grbody');
    $('.grcount').text('');
    $('.groupspanel .paneltitle').text(c.name || 'Group');
    $(body).html('<div class="empty">Loading the group\u2026</div>');
    const url = `https://webapps.prod.there.com/clubs/clubs?id=${c.id}&op=home`;
    There.sitePageDoc(`clubs/clubs?id=${c.id}&op=home`, function(doc) {
      if (There.data.panel != 'groups' || There.data.grClub !== c) {
        return;
      }
      if (!doc) {
        $(body).html('<div class="empty">The group didn\'t load. It needs your login, so it works after the next There restart.</div>');
        return;
      }
      let parsed = null;
      try {
        parsed = There.parseClub(doc);
      } catch (error) {
        parsed = null;
      }
      if (parsed) {
        There.renderClub(parsed, c, url);
        return;
      }
      There.renderSitePage(doc, { url: url, title: c.name }, '.grbody');
      const back = $('<div class="idback"></div>').text(c.from ? '\u2039 Back' : '\u2039 Back to groups').on('click', function() {
        There.playSound('control down');
        There.data.grClub = null;
        if (c.from) {
          There.togglePanel(c.from);
        } else {
          There.loadGroups(false);
        }
      });
      $(body).prepend(back);
      const title = (doc.title || '').replace(/\s+/g, ' ').trim();
      if (!c.name && title) {
        $('.groupspanel .paneltitle').text(title.replace(/^There (Groups?|Clubs?|Central)\s*[:-]?\s*/i, '') || 'Group');
      }
    });
  },

  // the clubs on your own profile
  loadMyGroups: function(force) {
    const body = $('.grbody');
    if (There.data.grMine && !force) {
      There.drawMyGroups(There.data.grMine);
      return;
    }
    $(body).html('<div class="empty">Loading your groups\u2026</div>');
    There.sitePageDoc('profiles/profiles?op=edit', function(doc) {
      if (There.data.panel != 'groups' || There.data.grTab != 'mine') {
        return;
      }
      let p = null;
      try {
        p = doc ? There.parseProfile(doc) : null;
      } catch (error) {
        p = null;
      }
      if (!p) {
        $(body).html('<div class="empty">Your groups didn\'t load. Try Refresh in a moment.</div>');
        return;
      }
      There.data.grMine = p.clubs;
      There.drawMyGroups(p.clubs);
    });
  },

  drawMyGroups: function(clubs) {
    const body = $('.grbody');
    $(body).empty();
    if (!clubs.length) {
      $(body).html('<div class="empty">You\'re not in any groups yet. Browse to find one.</div>');
      return;
    }
    // the ones you lead first
    const list = clubs.slice().sort((a, b) => (b.role == 'Leader') - (a.role == 'Leader') || a.name.localeCompare(b.name));
    let grid = $('<div class="grmine"></div>');
    for (const c of list) {
      let card = $('<div class="grclub"></div>');
      if (c.role) {
        $('<span class="proftier"></span>').attr('data-tier', c.role.toLowerCase() == 'leader' ? 'legendary' : '').text(c.role).appendTo($(card));
      }
      $('<span></span>').text(c.name).appendTo($(card));
      $(card).attr('title', c.name).on('click', function() {
        There.playSound('control down');
        There.showClub(c.id, c.name);
      }).appendTo($(grid));
    }
    $(body).append(grid);
    $('.grcount').text(`${clubs.length} group${clubs.length == 1 ? '' : 's'}`);
  },

  /* ------- Profiles -------
   * There Central's profile page, fetched with the game's login (FlashProxy
   * passes the session on /profiles/profiles) and drawn through its own
   * stylesheet like the listing pages, so no browser window opens. */

  showProfile: function(doid, name) {
    doid = String(doid || '').replace(/\D/g, '');
    if (!doid) {
      return;
    }
    There.data.profDoid = doid;
    There.data.profName = name || '';
    if (There.data.panel == 'profile') {
      There.loadProfile();
    } else {
      There.togglePanel('profile');
    }
  },

  // someone known only by name: their profile is fetched by name
  showProfileByName: function(name) {
    name = String(name || '').trim();
    if (!name) {
      return;
    }
    There.data.profDoid = `n:${name}`;
    There.data.profName = name;
    if (There.data.panel == 'profile') {
      There.loadProfile();
    } else {
      There.togglePanel('profile');
    }
  },

  profUrl: function(doid) {
    if (/^n:/.test(String(doid))) {
      return `https://webapps.prod.there.com/profiles/profiles?AvatarName=${encodeURIComponent(String(doid).slice(2))}&op=view`;
    }
    return `https://webapps.prod.there.com/profiles/profiles?AvatarDoid=${doid}&Mode=OutThere&op=view`;
  },

  loadProfile: function() {
    const doid = There.data.profDoid;
    const body = $('.profbody');
    $('.profilepanel .paneltitle').text(There.data.profName || 'Profile');
    $('.profnote').text('');
    if (!doid) {
      $(body).html('<div class="empty">Pick someone to see their profile.</div>');
      return;
    }
    $(body).html('<div class="empty">Loading the profile\u2026</div>');
    // your own profile comes as the edit page (it carries the form)
    const byName = /^n:/.test(String(doid));
    const mine = String(There.variables.there_pilotdoid || '') == doid;
    const path = mine ? 'profiles/profiles?op=edit' : byName ? `profiles/profiles?AvatarName=${encodeURIComponent(String(doid).slice(2))}&op=view` :
      `profiles/profiles?AvatarDoid=${doid}&Mode=OutThere&op=view`;
    There.data.profForm = null;
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    There.data.profRaw = '';
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(raw) {
        if (There.data.profDoid != doid) {
          return;
        }
        There.data.profRaw = raw || '';
        if (/Login Required/.test(raw || '')) {
          $(body).html('<div class="empty">There Central wants you signed in for profiles. Try again in a moment.</div>');
          return;
        }
        const pi = (raw || '').match(/<\?xml-stylesheet[^>]*href="([^"]+)"/);
        if (!pi) {
          There.renderProfile(new DOMParser().parseFromString(raw || '', 'text/html'), doid);
          There.profCheckSaved();
          return;
        }
        There.xslRender(raw, new URL(pi[1], 'https://webapps.prod.there.com/profiles/').href, function(doc) {
          if (There.data.profDoid != doid) {
            return;
          }
          if (!doc) {
            $(body).html('<div class="empty">The profile came back in a form the dock can\'t draw yet. Try Refresh in a moment.</div>');
            return;
          }
          There.renderProfile(doc, doid);
          There.profCheckSaved();
        });
      },
      error: function() {
        if (There.data.profDoid == doid) {
          $(body).html('<div class="empty">Couldn\'t reach There Central. Try again in a moment.</div>');
        }
      },
    });
  },

  /* the edit form's choices. The site's page fills its lists from files its
     stylesheet loads separately (the dock's engine skips those), so they live
     here, as the site has them */
  PROF_OPTIONS: {
    NEW_age: [['', 'Not set'], ['18to21', '18 - 21'], ['21to29', '21 - 29'], ['30to39', '30 - 39'], ['40to49', '40 - 49'], ['50plus', '50 +']],
    NEW_gender: [['', 'Not set'], ['Male', 'Male'], ['Female', 'Female']],
    NEW_maritalstatus: [['', 'Not set'], ['single', 'Single'], ['committed', 'Committed'], ['married', 'Married'], ['divorced', 'Divorced']],
    NEW_country: [''].concat(['United States', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Congo, Democratic Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe', 'Other']).map(v => [v, v || 'Not set']),
    NEW_area: [''].concat(['Albany', 'Albuquerque', 'Allentown', 'Anchorage', 'Atlanta', 'Atlantic City', 'Austin', 'Augusta', 'Baltimore', 'Baton Rouge', 'Bay Area', 'Birmingham', 'Bloomington IL', 'Boise ID', 'Boston', 'Buffalo NY', 'Charlotte', 'Charleston SC', 'Chattanooga', 'Chicago', 'Cincinnati', 'Cleveland', 'Colorado Springs', 'Columbia', 'Columbus', 'Dallas/Ft. Worth', 'Dayton', 'Denver', 'Des Moines', 'Detroit', 'El Paso', 'Flint', 'Fresno', 'Grand Rapids', 'Green Bay', 'Greenville', 'Harrisburg', 'Hartford', 'Honolulu', 'Houston', 'Indianapolis', 'Ithaca', 'Jacksonville', 'Kansas City', 'Knoxville', 'Lafayette', 'Lancaster', 'Lansing', 'Las Vegas', 'Lexington', 'Little Rock', 'Los Angeles', 'Louisville', 'Memphis', 'Miami/Ft. Lauderdale', 'Milwaukee', 'Minneapolis/ St. Paul', 'Mobile', 'Modesto', 'Monroe', 'Muncie-Kokomo', 'Nashville', 'New Bedford', 'New London', 'New Orleans', 'New York', 'Norfolk', 'Oklahoma City', 'Orlando', 'Philadelphia', 'Phoenix', 'Pittsburgh', 'Portland, ME', 'Portland, OR', 'Portsmouth', 'Presque Isle', 'Providence', 'Raleigh-Durham', 'Reno', 'Richmond', 'Roanoke', 'Rochester', 'Sacramento', 'Saginaw', 'Salt Lake City', 'San Antonio', 'San Diego', 'San Francisco', 'San Jose', 'Seattle', 'Silicon Valley', 'Spokane', 'St. Louis', 'Syracuse', 'Tampa Bay', 'Toledo', 'Tri-Cities', 'Twin Cities', 'Tucson', 'Tulsa', 'Utah', 'Washington D.C.', 'Wichita', 'Wilkes-Barre', 'Winston-Salem', 'Worcester']).map(v => [v, v || 'Not set']),
    NEW_state: [''].concat(['N/A', 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']).map(v => [v, v || 'Not set']),
  },

  // which section each skill sits in on the site's profile
  PROF_SECTIONS: [
    ['Leadership Experience', ['Event Host', 'Newbie Helper', 'Club Leader']],
    ['Sports Experience & Ratings', ['Board Rider', 'Buggy Driver', 'Sharpshooter', 'Pack Flyer', 'Bike Rider', 'Hoverboarder', 'Hover Bike Rider', 'Paintballer']],
    ['Social & Creative Experience', null],
  ],

  /* the profile straight from the data There Central sends (the page's
     stylesheet only lays this out): every skill with its rank and progress,
     the Fun Pass, clubs, details and pictures */
  parseProfileXml: function(raw, doid) {
    if (!/<profile[\s>]/.test(raw || '')) {
      return null;
    }
    const xml = new DOMParser().parseFromString(raw, 'text/xml');
    if (!xml.documentElement || xml.getElementsByTagName('parsererror').length) {
      return null;
    }
    const prof = xml.getElementsByTagName('profile')[0];
    const t = function(el, tag) {
      const n = el ? el.getElementsByTagName(tag)[0] : null;
      return n ? (n.textContent || '').trim() : '';
    };
    const attrs = {};
    for (const a of prof.getElementsByTagName('attrib')) {
      attrs[t(a, 'name')] = t(a, 'value');
    }
    const calc = function(name) {
      return Array.from(prof.getElementsByTagName('calc')).find(c => t(c, 'name') == name) || null;
    };
    const avpro = calc('AvPro');
    const name = attrs.AvatarName || t(avpro, 'AvatarName');
    if (!name) {
      return null;
    }
    const pdoid = t(prof, 'doid') || String(doid || '');
    const p = {
      name: name, doid: pdoid, attrs: attrs,
      mine: String(There.variables.there_pilotdoid || '') == pdoid,
      since: '', stats: [], pass: '', passPct: null, passNext: '', photos: [], details: [],
      hobbies: attrs.passions || '', bio: attrs.bio || '', skills: [], awards: [], clubs: [], links: [],
    };
    const since = There.evTime(attrs.MemberSince || t(avpro, 'CreationDate'));
    if (since) {
      p.since = since.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (attrs.numbuddies) {
      p.stats.push(['Buddies', attrs.numbuddies]);
    }
    if (t(avpro, 'NumBuddyingAv')) {
      p.stats.push(['Buddy of', t(avpro, 'NumBuddyingAv')]);
    }
    for (const [url, cap, label] of [['avpicurl', 'avpiclbl', 'In There'], ['mypicurl', 'mypiclbl', 'Out There']]) {
      if (/^https?:\/\//i.test(attrs[url] || '')) {
        p.photos.push({ src: attrs[url], caption: attrs[cap] || '', label: label });
      }
    }
    const age = (attrs.age || '').replace(/^(\d+)to(\d+)$/, '$1 - $2').replace(/^(\d+)plus$/, '$1+');
    const where = [attrs.area, attrs.state, attrs.country].filter(v => v && v != 'N/A').join(', ');
    for (const [k, v] of [['Age', age], ['Gender', attrs.gender], ['Location', where], ['Status', attrs.maritalstatus], ['Website', attrs.myurl]]) {
      if (v) {
        p.details.push([k, v.charAt(0).toUpperCase() + v.slice(1)]);
      }
    }
    // skills: the ranked ladders, sorted into the site's sections
    const tiers = /^(Casual|Avid|Expert|Renowned|Legendary)$/;
    const groups = {};
    const ladders = [];
    for (const cn of ['Skills', 'Xp']) {
      for (const sl of (calc(cn) ? calc(cn).getElementsByTagName('SkillLevel') : [])) {
        ladders.push(sl);
      }
    }
    // race scores for the buggy ladder
    const part = xml.getElementsByTagName('Participant')[0];
    const scores = part ? [['Day score', Number(t(part, 'DayScore')) || 0], ['Month score', Number(t(part, 'MonthScore')) || 0]] : [];
    for (const sl of ladders) {
      const ladder = t(sl, 'LadderName');
      const title = t(sl, 'Title');
      if (!ladder) {
        continue;
      }
      const pctText = t(sl, 'PercentToNextLevel');
      const pct = pctText === '' ? null : Math.round(Number(pctText) * 10) / 10;
      if (ladder == 'Fun Pass') {
        p.pass = title;
        p.passPct = pct;
        p.passNext = t(sl, 'NextLevelTitle');
        continue;
      }
      if (!tiers.test(title)) {
        p.awards.push(`${title} ${ladder}`.trim());
        continue;
      }
      const sec = (There.PROF_SECTIONS.find(sc => sc[1] && sc[1].includes(ladder)) || There.PROF_SECTIONS[There.PROF_SECTIONS.length - 1])[0];
      const extra = ladder == 'Buggy Driver' ? scores.map(kv => [kv[0], String(kv[1])]) : [];
      (groups[sec] = groups[sec] || []).push({ name: `${title} ${ladder}`, pct: pct, next: t(sl, 'NextLevelTitle'), rating: '', extra: extra });
    }
    for (const sc of There.PROF_SECTIONS) {
      if (groups[sc[0]]) {
        // highest rank first
        const order = ['Legendary', 'Renowned', 'Expert', 'Avid', 'Casual'];
        groups[sc[0]].sort((a, b) => order.indexOf(a.name.split(' ')[0]) - order.indexOf(b.name.split(' ')[0]) || (b.pct || 0) - (a.pct || 0));
        p.skills.push({ title: sc[0], items: groups[sc[0]] });
      }
    }
    const clubs = calc('Clubs');
    for (const c of (clubs ? clubs.getElementsByTagName('Club') : [])) {
      p.clubs.push({ id: t(c, 'ClubId'), name: t(c, 'ClubName').replace(/_/g, ' '), role: t(c, 'IsLeader') == '1' ? 'Leader' : 'Member' });
    }
    p.clubs.sort((a, b) => (b.role == 'Leader') - (a.role == 'Leader') || a.name.localeCompare(b.name));
    p.links = [
      ['Classifieds', `https://webapps.prod.there.com/listings/listings?Owner=${pdoid}&MultiplePage=3&SinglePage=10&Stylesheet=/personals/personals_categories.xsl`],
      ['Auctions', `https://webapps.prod.there.com/items/sellersearch?Seller=${pdoid}`],
      ['Events', `https://webapps.prod.there.com/eventmgmt/eventmgmt?op=mysched&ViewDoid=${pdoid}&stylesheet=/eventmgmt/event_theirschedule.xsl`],
    ];
    return p;
  },

  // the profile page (after its stylesheet) -> plain fields. works on the
  // read-only view and on your own edit form: each field is found by its label
  parseProfile: function(doc) {
    const base = 'https://webapps.prod.there.com/profiles/';
    const abs = function(v) {
      try {
        return new URL(v || '', base).href;
      } catch (error) {
        return '';
      }
    };
    const clean = function(t) {
      return String(t || '').replace(/\s+/g, ' ').trim();
    };
    const content = doc.querySelector('#content') || doc.body;
    if (!content) {
      return null;
    }
    const p = {
      name: clean((content.querySelector('.gry14Bld') || {}).textContent),
      mine: !!content.querySelector('input[name="NEW_avpicurl"], textarea[name="NEW_bio"]'),
      since: '',
      stats: [],
      pass: '',
      passImg: '',
      awards: [],
      photos: [],
      details: [],
      hobbies: '',
      bio: '',
      skills: [],
      clubs: [],
      links: [],
    };
    if (!p.name) {
      return null;
    }

    // a form field's shown value
    const fieldValue = function(el) {
      if (!el) {
        return '';
      }
      if (el.tagName == 'SELECT') {
        const opt = el.querySelector('option[selected]');
        return clean(opt ? opt.textContent : '');
      }
      if (el.tagName == 'TEXTAREA') {
        return String(el.textContent || '').trim();
      }
      if (el.tagName == 'INPUT') {
        return clean(el.getAttribute('value'));
      }
      return '';
    };
    const isField = function(el) {
      return !!el && /^(SELECT|TEXTAREA|INPUT)$/.test(el.tagName) &&
        !(el.tagName == 'INPUT' && /^(hidden|radio|image|checkbox)$/i.test(el.getAttribute('type') || ''));
    };
    // the value next to a bold label like "Age:" or "Hobbies & Interests"
    const labelled = function(re) {
      for (const lab of content.querySelectorAll('.gry10Bld, strong')) {
        if (!re.test(clean(lab.textContent))) {
          continue;
        }
        if (isField(lab.nextElementSibling)) {
          return fieldValue(lab.nextElementSibling);
        }
        const box = lab.parentElement;
        const inner = box ? box.querySelector('select, textarea, input') : null;
        if (isField(inner)) {
          return fieldValue(inner);
        }
        if (box && isField(box.nextElementSibling)) {
          return fieldValue(box.nextElementSibling);
        }
        // read-only page: the text beside the label
        let text = box ? clean(box.textContent.replace(lab.textContent, '')) : '';
        text = text.replace(/\(\d+ characters max\.?\)\s*:?/i, '').trim();
        if (text) {
          return text;
        }
        if (box && box.nextElementSibling && !box.nextElementSibling.querySelector('.gry10Bld, .orng12Bld')) {
          return String(box.nextElementSibling.textContent || '').trim();
        }
        return '';
      }
      return '';
    };

    // the innermost block that starts "Member since"
    const sinceBox = Array.from(content.querySelectorAll('i, div')).filter(el => /^Member since/i.test(clean(el.textContent)))
      .sort((a, b) => a.textContent.length - b.textContent.length)[0];
    if (sinceBox) {
      p.since = clean(sinceBox.textContent).replace(/^Member since\s*/i, '');
    }
    // buddy counts and similar "label / number" rows
    for (const td of content.querySelectorAll('td.gry10Bld')) {
      const lab = td.previousElementSibling;
      const v = clean(td.textContent);
      if (lab && /^\d[\d,]*$/.test(v)) {
        p.stats.push([clean(lab.textContent).replace(/:$/, ''), v]);
      }
    }
    const passImg = content.querySelector('img[src*="passport_"]');
    if (passImg) {
      const m = (passImg.getAttribute('src') || '').match(/passport_([A-Za-z]+)/);
      p.pass = m ? m[1] : '';
      p.passImg = abs(passImg.getAttribute('src'));
    }
    // photos: In There, then Out There. the stock "no picture" art doesn't count
    const photoFields = [['NEW_avpicurl', 'NEW_avpiclbl', 'In There'], ['NEW_mypicurl', 'NEW_mypiclbl', 'Out There']];
    if (p.mine) {
      for (const f of photoFields) {
        const url = fieldValue(content.querySelector(`input[name="${f[0]}"]`));
        if (/^https?:\/\//i.test(url)) {
          p.photos.push({ src: url, caption: fieldValue(content.querySelector(`textarea[name="${f[1]}"]`)), label: f[2] });
        }
      }
    } else {
      let n = 0;
      for (const img of content.querySelectorAll('img')) {
        const src = img.getAttribute('src') || '';
        if (/img_default_(in|out)there/.test(src)) {
          n++;
          continue;
        }
        if (/\/media\/|clear\.gif|^media\//i.test(src) || !src) {
          continue;
        }
        const w = Number(img.getAttribute('width') || 0);
        if (w && w < 40) {
          continue;
        }
        const after = (img.closest('a') || img).nextElementSibling;
        const cap = after && after.tagName == 'DIV' && !after.querySelector('strong, .gry10Bld, .orng12Bld') ? clean(after.textContent) : '';
        p.photos.push({ src: abs(src), caption: cap.length < 400 ? cap : '', label: (photoFields[n] || photoFields[1])[2] });
        n++;
      }
    }

    // About
    const detail = function(label, re) {
      const v = labelled(re);
      if (v) {
        p.details.push([label, v]);
      }
    };
    detail('Age', /^Age:?$/i);
    for (const kv of p.details) {
      kv[1] = kv[1].replace(/^(\d+)to(\d+)$/, '$1 - $2').replace(/^(\d+)plus$/, '$1+');
    }
    detail('Gender', /^Gender:?$/i);
    if (p.mine) {
      const where = [fieldValue(content.querySelector('select[name="NEW_area"]')),
        fieldValue(content.querySelector('select[name="NEW_state"]')),
        fieldValue(content.querySelector('select[name="NEW_country"]'))].filter(Boolean).join(', ');
      if (where) {
        p.details.push(['Location', where]);
      }
    } else {
      detail('Location', /^Location:?$/i);
    }
    detail('Status', /^Marital Status:?$/i);
    detail('Website', /^Website:?$/i);
    p.hobbies = labelled(/^Hobbies/i);
    p.bio = labelled(/^More About me/i);

    // experience: each orange heading's table of skills. a skill with no gauge
    // after it is maxed out
    for (const head of content.querySelectorAll('.orng12Bld')) {
      const title = clean(head.textContent);
      if (!/Experience|Games|Ratings/i.test(title)) {
        continue;
      }
      // the skills are the next table after the heading's own
      const holder = head.closest('table');
      let table = holder ? holder.nextElementSibling : null;
      while (table && table.tagName.toUpperCase() != 'TABLE') {
        table = table.nextElementSibling;
      }
      if (!table) {
        continue;
      }
      const group = { title: title, items: [] };
      let last = null;
      for (const tr of table.querySelectorAll('tr')) {
        const gauge = tr.querySelector('img[src*="skill_gauge"]');
        if (gauge) {
          if (last) {
            last.pct = parseFloat(gauge.getAttribute('title')) || 0;
          }
          continue;
        }
        const tds = tr.querySelectorAll('td');
        if (!tds.length) {
          continue;
        }
        const name = clean(tds[0].textContent);
        if (/:$/.test(name)) {
          // "Day Score: 00"
          if (last) {
            last.extra.push([name.replace(/:$/, ''), clean(tds[1] ? tds[1].textContent : '')]);
          }
          continue;
        }
        if (!name) {
          continue;
        }
        last = { name: name, pct: null, rating: clean(tds[1] ? tds[1].textContent : ''), extra: [] };
        group.items.push(last);
      }
      const ranked = group.items.filter(s => /^(Casual|Avid|Expert|Renowned|Legendary)\b/.test(s.name));
      for (const s of group.items) {
        if (!ranked.includes(s)) {
          p.awards.push(s.name);
        }
      }
      group.items = ranked;
      if (group.items.length) {
        p.skills.push(group);
      }
    }

    for (const a of content.querySelectorAll('a[href*="clubs?id="]')) {
      const id = ((a.getAttribute('href') || '').match(/id=(\d+)/) || [])[1];
      const role = a.closest('tr') ? clean((a.closest('tr').querySelector('td') || {}).textContent) : '';
      p.clubs.push({ id: id, name: clean(a.textContent).replace(/_/g, ' '), role: role == clean(a.textContent) ? '' : role });
    }
    for (const a of content.querySelectorAll('a')) {
      const href = a.getAttribute('href') || '';
      const t = clean(a.textContent);
      if (/sellersearch\?Seller=|op=mysched|personals_categories/.test(href) && t) {
        p.links.push([t, abs(href)]);
      }
    }
    return p;
  },

  renderProfile: function(doc, doid) {
    // the stylesheet's output can be an XML document (lowercase tags, no
    // HTML rules): read it back as plain HTML so it parses like the site's page
    try {
      doc = There.asHtmlDoc(doc) || doc;
    } catch (error) {
    }
    let p = null;
    try {
      p = There.parseProfileXml(There.data.profRaw, doid);
    } catch (error) {
      p = null;
    }
    if (!p) {
      try {
        p = There.parseProfile(doc);
      } catch (error) {
        p = null;
      }
    }
    if (!p) {
      There.renderProfilePage(doc, doid);
      return;
    }
    if (doc.querySelector('input[name="NEW_avpicurl"], textarea[name="NEW_bio"]')) {
      p.mine = true;
    }
    const body = $('.profbody');
    $('.profilepanel .paneltitle').text(p.mine ? 'My Profile' : 'Profile');
    // your own page is also the edit form: keep it for the editor
    There.data.profForm = p.mine ? doc.querySelector('#content form[method="POST"], #content form[method="post"]') : null;
    There.data.profParsed = p;
    let d = $('<div class="prof"></div>');

    // hero: photo, name, membership, counts
    let hero = $('<div class="profhero"></div>');
    let pic = $('<div class="profpic"></div>');
    const main = p.photos.find(f => f.label == 'In There') || p.photos[0];
    if (main) {
      $('<img alt="">').attr('src', main.src).on('error', function() {
        $(this).remove();
        $(pic).html(tmuiIcon('user'));
      }).appendTo($(pic));
    } else {
      $(pic).html(tmuiIcon('user'));
    }
    $(pic).appendTo($(hero));
    let head = $('<div class="profhead"></div>');
    $('<div class="profname"></div>').text(p.name).appendTo($(head));
    if (p.since) {
      $('<div class="profsince"></div>').text(`Member since ${p.since}`).appendTo($(head));
    }
    let chips = $('<div class="evtags"></div>');
    if (p.pass) {
      $('<span class="evtag profpass"></span>').attr('data-pass', p.pass.toLowerCase())
        .text(`${p.pass} Fun Pass${p.passPct != null && p.passNext ? ` \u00B7 ${p.passPct}% to ${p.passNext}` : ''}`).appendTo($(chips));
    }
    if (chips.children().length) {
      $(chips).appendTo($(head));
    }
    // their stuff: buttons at the bottom right of the header
    let btns = $('<div class="idbtns profherobtns"></div>');
    if (p.mine) {
      $('<div class="button"></div>').attr('data-primary', '1').text('Edit my profile').on('click', function() {
        There.playSound('control down');
        There.editProfile();
      }).appendTo($(btns));
    }
    for (const l of p.links) {
      $('<div class="button"></div>').text(l[0]).on('click', function() {
        There.playSound('control down');
        const seller = (/sellersearch\?Seller=(\d+)/.exec(l[1]) || [])[1];
        const sched = (/op=mysched.*ViewDoid=(\d+)/.exec(l[1]) || [])[1];
        if (seller) {
          There.showSellerAuctions(seller, p.name);
        } else if (sched) {
          There.showPersonEvents(sched, p.name);
        } else {
          // classifieds: the site's page, shown here
          There.showSitePage(l[1], `${p.name}'s classifieds`);
        }
      }).appendTo($(btns));
    }
    // the header's bottom row: counts on the left, buttons on the right
    let foot = $('<div class="profherofoot"></div>');
    if (p.stats.length) {
      let stats = $('<div class="profstats"></div>');
      for (const s of p.stats) {
        const label = s[0].replace(/^On my buddy list$/i, 'Buddies').replace(/^Have me as buddy$/i, 'Buddy of');
        $('<div class="profstat"></div>').append($('<b></b>').text(s[1]), $('<span></span>').text(label)).appendTo($(stats));
      }
      $(stats).appendTo($(foot));
    }
    if (btns.children().length) {
      $(btns).appendTo($(foot));
    }
    if (foot.children().length) {
      $(foot).appendTo($(head));
    }
    $(head).appendTo($(hero));
    $(hero).appendTo($(d));

    // About
    if (p.details.length || p.hobbies || p.bio) {
      $('<div class="evsection"></div>').text('About').appendTo($(d));
      let about = $('<div class="evabout profabout"></div>');
      if (p.details.length) {
        let grid = $('<div class="profdetails"></div>');
        for (const kv of p.details) {
          let v = $('<span class="mv"></span>');
          if (kv[0] == 'Website' && /^https?:\/\//i.test(kv[1])) {
            $('<span class="idlink"></span>').text(kv[1]).on('click', function() {
              There.openUrl(kv[1]);
            }).appendTo($(v));
          } else {
            $(v).text(kv[1]);
          }
          $(grid).append($('<span class="ml"></span>').text(kv[0]), v);
        }
        $(grid).appendTo($(about));
      }
      if (p.hobbies) {
        $('<div class="profsub"></div>').text('Hobbies & interests').appendTo($(about));
        $('<div class="proftext"></div>').text(p.hobbies).appendTo($(about));
      }
      if (p.bio) {
        $('<div class="profsub"></div>').text('More about me').appendTo($(about));
        $('<div class="proftext"></div>').text(p.bio).appendTo($(about));
      }
      $(about).appendTo($(d));
    }

    // other photos with their captions
    const extra = p.photos.filter(f => f != main || f.caption);
    if (extra.length) {
      $('<div class="evsection"></div>').text('Photos').appendTo($(d));
      let row = $('<div class="profphotos"></div>');
      for (const f of extra) {
        let c = $('<div class="profphoto"></div>');
        $('<img alt="">').attr('src', f.src).on('error', function() {
          $(c).remove();
        }).appendTo($(c));
        $('<div class="evcardsub"></div>').text(f.caption ? `${f.label}: ${f.caption}` : f.label).appendTo($(c));
        $(c).appendTo($(row));
      }
      $(row).appendTo($(d));
    }

    // experience
    for (const g of p.skills) {
      $('<div class="evsection"></div>').text(g.title).appendTo($(d));
      let list = $('<div class="profskills"></div>');
      for (const s of g.items) {
        const tier = (s.name.match(/^(Casual|Avid|Expert|Renowned|Legendary)\b/) || [])[1] || '';
        let row = $('<div class="profskill"></div>');
        let top = $('<div class="profskilltop"></div>');
        if (tier) {
          $('<span class="proftier"></span>').attr('data-tier', tier.toLowerCase()).text(tier).appendTo($(top));
        }
        $('<span class="profskillname"></span>').text(tier ? s.name.slice(tier.length).trim() : s.name).appendTo($(top));
        // progress toward the next rank; Legendary is the top
        if (s.pct != null) {
          $('<span class="profskillpct"></span>').text(s.next ? `${s.pct}% to ${s.next}` : `${s.pct}%`).appendTo($(top));
        } else if (tier == 'Legendary') {
          $('<span class="profskillpct"></span>').text('Top rank').appendTo($(top));
        }
        $(top).appendTo($(row));
        if (s.pct != null) {
          $('<div class="evbar"></div>').append($('<div class="evbarfill"></div>').css('width', `${Math.max(2, s.pct)}%`)).appendTo($(row));
        }
        const notes = [];
        if (s.rating) {
          notes.push(s.rating.charAt(0).toUpperCase() + s.rating.slice(1));
        }
        for (const kv of s.extra) {
          notes.push(`${kv[0]} ${kv[1]}`);
        }
        if (notes.length) {
          $('<div class="evcardsub"></div>').text(notes.join(' · ')).appendTo($(row));
        }
        $(row).appendTo($(list));
      }
      $(list).appendTo($(d));
    }

    if (p.awards.length) {
      $('<div class="evsection"></div>').text('Awards').appendTo($(d));
      let list = $('<div class="evtags profawards"></div>');
      for (const a of p.awards) {
        $('<span class="evtag"></span>').attr('data-kind', 'award').text(a).appendTo($(list));
      }
      $(list).appendTo($(d));
    }

    // clubs last (the longest list)
    if (p.clubs.length) {
      $('<div class="evsection"></div>').text('Clubs').appendTo($(d));
      let list = $('<div class="profclubs"></div>');
      for (const c of p.clubs) {
        let chip = $('<div class="profclub"></div>');
        if (c.role) {
          $('<span class="proftier"></span>').attr('data-tier', c.role.toLowerCase() == 'leader' ? 'legendary' : '').text(c.role).appendTo($(chip));
        }
        $('<span></span>').text(c.name).appendTo($(chip));
        $(chip).on('click', function() {
          There.playSound('control down');
          There.showClub(c.id, c.name);
        }).appendTo($(list));
      }
      $(list).appendTo($(d));
    }
    $(body).empty().append(d);
    $(body).scrollTop(0);
  },

  /* editing your own profile: the fields come from There Central's own edit
     form (your profile page is that form), and saving sends the whole form
     back with your changes, so anything not shown here is kept as it was */
  profFieldValue: function(el) {
    if (!el) {
      return '';
    }
    if (el.tagName == 'SELECT') {
      const opt = el.querySelector('option[selected]');
      return opt ? (opt.hasAttribute('value') ? opt.getAttribute('value') : opt.textContent.trim()) : '';
    }
    if (el.tagName == 'TEXTAREA') {
      return el.textContent || '';
    }
    return el.getAttribute('value') || '';
  },

  editProfile: function() {
    const form = There.data.profForm;
    const body = $('.profbody');
    if (!form) {
      There.loadProfile();
      return;
    }
    const field = function(name) {
      return form.querySelector(`[name="${name}"]`);
    };
    // the profile's saved values, from its data
    const attrs = (There.data.profParsed && There.data.profParsed.attrs) || {};
    let d = $('<div class="prof profform"></div>');
    $('<div class="idback"></div>').text('‹ Back to my profile').on('click', function() {
      There.playSound('control down');
      There.loadProfile();
    }).appendTo($(d));

    const inputs = {};
    const section = function(title) {
      $('<div class="evsection"></div>').text(title).appendTo($(d));
      return $('<div class="evabout profedit"></div>').appendTo($(d));
    };
    const label = function(box, text, el, max) {
      let row = $('<label class="proffield"></label>');
      let top = $('<div class="proflabel"></div>').append($('<span></span>').text(text));
      if (max) {
        let count = $('<span class="profcount"></span>');
        const upd = function() {
          const n = $(el).val().length;
          $(count).text(`${n} / ${max}`).attr('data-full', n >= max ? '1' : '0');
        };
        $(el).on('input', upd);
        upd();
        $(top).append(count);
      }
      $(row).append(top, el).appendTo($(box));
      return row;
    };
    const text = function(box, name, title, max, multi, rows) {
      const src = field(name);
      if (!src) {
        return null;
      }
      const el = multi ? $('<textarea spellcheck="true"></textarea>').attr('rows', rows || 3) : $('<input type="text" spellcheck="false">');
      // the saved value from the profile's data, else what the form carries
      const known = attrs[name.replace(/^NEW_/, '')];
      $(el).attr('maxlength', max).val(String(known != null ? known : There.profFieldValue(src)).slice(0, max));
      inputs[name] = el;
      label(box, title, el, max);
      return el;
    };
    const select = function(box, name, title) {
      const src = field(name);
      if (!src) {
        return null;
      }
      const el = $('<select></select>');
      const known = attrs[name.replace(/^NEW_/, '')];
      const cur = known != null ? known : There.profFieldValue(src);
      // the site's lists when the form has them, else the dock's copy
      let list = Array.from(src.querySelectorAll('option')).map(o => [o.hasAttribute('value') ? o.getAttribute('value') : o.textContent.trim(), o.textContent.trim() || 'Not set']);
      if (list.length <= 1 && There.PROF_OPTIONS[name]) {
        list = There.PROF_OPTIONS[name];
      }
      if (cur && !list.some(o => o[0] == cur)) {
        list = list.concat([[cur, cur]]);
      }
      for (const [v, label] of list) {
        $('<option></option>').attr('value', v).text(label).prop('selected', v == cur).appendTo($(el));
      }
      inputs[name] = el;
      label(box, title, el, 0);
      return el;
    };

    // who can see it
    let vis = section('Who can see my profile');
    let seg = $('<div class="lchips profvis"></div>');
    const radios = Array.from(form.querySelectorAll('input[name="NEW_accesslevel"]'));
    let level = attrs.accesslevel || (radios.find(r => r.hasAttribute('checked')) || radios[0] || { getAttribute: () => 'Public' }).getAttribute('value');
    for (const r of radios) {
      const v = r.getAttribute('value');
      $('<span class="lchip"></span>').text(v == 'Buddy' ? 'Buddies only' : 'Everyone').attr('data-on', v == level ? '1' : '0')
        .on('click', function() {
          level = v;
          $(seg).children().attr('data-on', '0');
          $(this).attr('data-on', '1');
        }).appendTo($(seg));
    }
    $(seg).appendTo($(vis));

    // the two pictures, previewed as you type
    const photo = function(title, urlName, capName) {
      let box = section(title);
      let prev = $('<div class="profprev"></div>').appendTo($(box));
      const url = text(box, urlName, 'Picture address (https://...)', 128, false);
      text(box, capName, 'Caption', 256, true, 2);
      const show = function() {
        const v = url ? $(url).val().trim() : '';
        $(prev).empty();
        if (/^https?:\/\//i.test(v)) {
          $('<img alt="">').attr('src', v).on('error', function() {
            $(prev).text('That address doesn\'t show a picture');
          }).appendTo($(prev));
        } else {
          $(prev).text('No picture');
        }
      };
      if (url) {
        $(url).on('change', show);
        show();
      }
    };
    photo('In There picture', 'NEW_avpicurl', 'NEW_avpiclbl');
    photo('Out There picture', 'NEW_mypicurl', 'NEW_mypiclbl');

    // details
    let det = section('Details');
    let grid = $('<div class="profgrid"></div>').appendTo($(det));
    select(grid, 'NEW_age', 'Age');
    select(grid, 'NEW_gender', 'Gender');
    const country = select(grid, 'NEW_country', 'Country');
    const area = select(grid, 'NEW_area', 'Area');
    const state = select(grid, 'NEW_state', 'State');
    // area and state only mean anything in the US, like on the site
    const usOnly = function() {
      const us = country && /^(United States|USA)$/.test($(country).val());
      for (const el of [area, state]) {
        if (el) {
          $(el).closest('.proffield').toggle(!!us);
          if (!us) {
            $(el).val('');
          }
        }
      }
    };
    if (country) {
      $(country).on('change', usOnly);
      usOnly();
    }
    select(grid, 'NEW_maritalstatus', 'Status');
    text(det, 'NEW_myurl', 'Website', 128, false);

    let about = section('About me');
    text(about, 'NEW_passions', 'Hobbies & interests', 512, true, 3);
    text(about, 'NEW_bio', 'More about me', 750, true, 6);

    let btns = $('<div class="idbtns"></div>');
    let note = $('<span class="revnote"></span>');
    let save = $('<div class="button"></div>').attr('data-primary', '1').text('Save changes');
    $(save).on('click', function() {
      if ($(save).attr('data-off') == '1') {
        return;
      }
      There.playSound('menu item activate');
      $(save).attr('data-off', '1');
      $(note).attr('data-bad', '0').text('Saving…');
      // the whole form, as the site would send it, with our values in
      const pairs = [];
      let sentLevel = false;
      for (const el of form.querySelectorAll('input, select, textarea')) {
        const name = el.getAttribute('name');
        if (!name) {
          continue;
        }
        const type = (el.getAttribute('type') || '').toLowerCase();
        if (type == 'radio') {
          if (name == 'NEW_accesslevel') {
            if (!sentLevel) {
              pairs.push([name, level]);
              sentLevel = true;
            }
          } else if (el.hasAttribute('checked')) {
            pairs.push([name, el.getAttribute('value') || 'on']);
          }
          continue;
        }
        if (type == 'image') {
          pairs.push([`${name}.x`, '1'], [`${name}.y`, '1']);
          continue;
        }
        if (type == 'checkbox' && !el.hasAttribute('checked')) {
          continue;
        }
        pairs.push([name, inputs[name] ? String($(inputs[name]).val() || '') : There.profFieldValue(el)]);
      }
      const sent = {};
      for (const kv of pairs) {
        sent[kv[0]] = kv[1];
      }
      const data = pairs.map(kv => `${encodeURIComponent(kv[0])}=${encodeURIComponent(kv[1])}`).join('&');
      const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
      $.ajax({
        url: `http://${host}/tmui-webapps/profiles/profiles?op=edit`,
        method: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        processData: false,
        dataType: 'text',
        timeout: 25000,
        success: function() {
          // read it back to be sure it stuck
          There.data.profVerify = sent;
          There.loadProfile();
        },
        error: function() {
          $(save).attr('data-off', '0');
          $(note).attr('data-bad', '1').text('That didn\'t go through. Try again.');
        },
      });
    }).appendTo($(btns));
    $('<div class="button"></div>').text('Cancel').on('click', function() {
      There.playSound('control down');
      There.loadProfile();
    }).appendTo($(btns));
    $(btns).append(note).appendTo($(d));

    $('.profilepanel .paneltitle').text('Edit My Profile');
    $(body).empty().append(d);
    $(body).scrollTop(0);
  },

  /* ------- a group's own pages -------
   * Email, Invite, Invitations, Applications, Affiliates, Links,
   * Administration, Quit: the site's pages, read for their tab row, heading
   * and forms, and drawn as dock forms. Their <form> tags sit inside table
   * rows, which an HTML parser drops, so which fields belong to which form is
   * marked in the raw page before it's parsed. Sending goes back through the
   * bridge with your login, the way the site's own form would. */

  showClubTool: function(url, title) {
    const from = There.data.panel && There.data.panel != 'groups' ? There.data.panel : null;
    const prev = There.data.grTool;
    There.data.grTool = {
      url: new URL(url, There.SITE_BASE).href, title: title || '',
      club: prev ? prev.club : (There.data.panel == 'groups' ? There.data.grClub : null),
      list: prev ? prev.list : There.data.grList,
      from: prev ? prev.from : from,
      doc: null, forms: [], note: '',
    };
    There.data.grMembers = null;
    if (There.data.panel == 'groups') {
      There.loadGroups(false);
    } else {
      There.togglePanel('groups');
    }
  },

  // some of these pages come as XML plus a stylesheet (Administration):
  // render it first, then read the result like any other page
  clubToolRead: function(raw, url, cb) {
    raw = raw || '';
    const pi = raw.match(/<\?xml-stylesheet[^>]*href="([^"]+)"/);
    if (/^\s*<\?xml/.test(raw) && pi) {
      // the stylesheet asks for HTML output, and the browser reads that back
      // with the HTML parser, which drops <form> tags sitting in table rows.
      // a copy of the stylesheet set to XML output keeps the tree as built
      There.xslFetch(new URL(pi[1], url).href, function(xsl) {
        let doc = null;
        try {
          const NS = 'http://www.w3.org/1999/XSL/Transform';
          const copy = xsl.cloneNode(true);
          let out = copy.getElementsByTagNameNS(NS, 'output')[0];
          if (!out) {
            out = copy.createElementNS(NS, 'xsl:output');
            copy.documentElement.insertBefore(out, copy.documentElement.firstChild);
          }
          out.setAttribute('method', 'xml');
          out.removeAttribute('doctype-public');
          out.removeAttribute('doctype-system');
          const proc = new XSLTProcessor();
          proc.importStylesheet(copy);
          doc = proc.transformToDocument(new DOMParser().parseFromString(raw, 'text/xml'));
        } catch (error) {
          doc = null;
        }
        const finish = function(d) {
          let html = d && d.documentElement ? new XMLSerializer().serializeToString(d.documentElement) : '';
          // XML writes empty tags as <div/>, <script/>, <textarea/>; read as a
          // web page those swallow everything after them
          html = html.replace(/<([a-zA-Z][\w:-]*)(\s[^<>]*?)?\s*\/>/g, function(all, tag, attrs) {
            return /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(tag) ? all : `<${tag}${attrs || ''}></${tag}>`;
          });
          cb(There.clubToolParse(html));
        };
        if (doc && doc.documentElement && !doc.querySelector('parsererror')) {
          finish(doc);
        } else {
          // the XML copy didn't work: the stylesheet as it is
          There.xslRender(raw, new URL(pi[1], url).href, finish);
        }
      });
      return;
    }
    cb(There.clubToolParse(raw));
  },

  // the raw page with every field tagged by the form it belongs to
  clubToolParse: function(raw) {
    const forms = [];
    let n = 0;
    const marked = String(raw || '').replace(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi, function(all, attrs, inner) {
      const attr = function(name) {
        const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
        return m ? (m[2] != undefined ? m[2] : m[3] != undefined ? m[3] : m[4]) : '';
      };
      forms.push({ n: n, action: attr('action') || '/clubs/clubs', method: (attr('method') || 'get').toLowerCase(), onsubmit: attr('onsubmit'), name: attr('name') });
      // an empty form: the browser already moved its fields out after it
      // (it does that to forms in table rows). it owns what follows
      if (!/<(input|textarea|select)\b/i.test(inner)) {
        return `<!--tmf-open-${n++}-->${inner}`;
      }
      const tagged = inner.replace(/<(input|textarea|select)\b/gi, `<$1 data-tmf="${n}"`);
      n++;
      return tagged;
    }).replace(/<!--tmf-open-(\d+)-->([\s\S]*?)(?=<!--tmf-open-|$)/g, function(all, num, seg) {
      return seg.replace(/<(input|textarea|select)\b(?![^>]*data-tmf)/gi, `<$1 data-tmf="${num}"`);
    });
    const doc = new DOMParser().parseFromString(marked, 'text/html');
    // the page's compileLists(): which ticked boxes fill which hidden field.
    // read as text, never run
    const lists = {};
    for (const sc of doc.querySelectorAll('script')) {
      const t = sc.textContent || '';
      if (!/compileLists/.test(t)) {
        continue;
      }
      const arrays = {};
      const re = /Form\s*(?:\.\s*(\w+)|\[\s*['"]([^'"]+)['"]\s*\])\s*\.checked[\s\S]{0,80}?(\w+)\s*\.\s*push\s*\(\s*['"]?([^'")]+?)['"]?\s*\)/g;
      let m;
      while ((m = re.exec(t))) {
        (arrays[m[3]] = arrays[m[3]] || []).push({ box: m[1] || m[2], value: m[4] });
      }
      const re2 = /Form\s*\.\s*(\w+)\s*\.\s*value\s*=\s*(\w+)/g;
      while ((m = re2.exec(t))) {
        lists[m[1]] = arrays[m[2]] || [];
      }
    }
    for (const f of forms) {
      f.lists = /compileLists/.test(f.onsubmit || '') ? lists : {};
    }
    return { doc: doc, forms: forms };
  },

  loadClubTool: function() {
    const T = There.data.grTool;
    const body = $('.grbody');
    $('.groupspanel .paneltitle').text(T.title || 'Group');
    if (T.doc) {
      There.drawClubTool();
      return;
    }
    $(body).html('<div class="empty">Loading\u2026</div>');
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${There.siteBridgePath(T.url)}`,
      dataType: 'text',
      timeout: 20000,
      success: function(raw) {
        if (There.data.panel != 'groups' || There.data.grTool !== T) {
          return;
        }
        There.clubToolRead(raw, T.url, function(r) {
          if (There.data.grTool !== T) {
            return;
          }
          T.doc = r.doc;
          T.forms = r.forms;
          There.drawClubTool();
        });
      },
      error: function() {
        if (There.data.grTool === T) {
          $(body).html('<div class="empty">This page didn\'t load. Try Refresh in a moment.</div>');
        }
      },
    });
  },

  // an image button's words, from its picture's name: btn_send.gif is "Send"
  clubButtonLabel: function(el) {
    const v = el.getAttribute('value') || el.getAttribute('alt') || '';
    if (v && el.getAttribute('type') != 'image') {
      return v;
    }
    const src = (el.getAttribute('src') || '').split('/').pop().replace(/\.\w+$/, '').replace(/^(btn|button)_?/i, '').replace(/_/g, ' ');
    return v || (src ? src.charAt(0).toUpperCase() + src.slice(1) : 'Send');
  },

  drawClubTool: function() {
    const T = There.data.grTool;
    const doc = T.doc;
    const body = $('.grbody');
    $(body).empty();
    const clean = t => String(t || '').replace(/\s+/g, ' ').trim();
    // heading: the breadcrumb's last step and the group it belongs to
    const crumb = doc.getElementById('breadcrumb');
    const here = crumb ? clean((crumb.querySelector('span.gry9Bld') || {}).textContent) : '';
    const homeA = crumb ? Array.from(crumb.querySelectorAll('a')).find(a => /op=home/.test(a.getAttribute('href') || '')) : null;
    const group = homeA ? clean(homeA.textContent).replace(/\s*Home$/i, '') : '';
    T.group = group;
    const title = here || clean(doc.title) || T.title || 'Group';
    $('.groupspanel .paneltitle').text(group ? `${group}: ${title}` : title);

    $('<div class="idback"></div>').text(T.from ? '\u2039 Back' : '\u2039 Back to the group').on('click', function() {
      There.playSound('control down');
      There.data.grTool = null;
      if (T.from) {
        There.togglePanel(T.from);
      } else {
        There.data.grClub = T.club;
        There.data.grList = T.list;
        There.loadGroups(false);
      }
    }).appendTo($(body));

    const wrap = $('<div class="cltool"></div>').appendTo($(body));
    // the group's tab row, the current one lit
    let navTable = null;
    for (const t of doc.querySelectorAll('table')) {
      if (t.querySelectorAll('a.mdBlu10Bld[href*="clubs?op="]').length >= 3 && !t.querySelector('table')) {
        navTable = t;
        break;
      }
    }
    // the site's own tab row isn't shown: the group page has its buttons
    const role = Array.from(doc.querySelectorAll('div')).find(d => /^You are (the|a|an) /i.test(clean(d.textContent)) && !d.querySelector('div'));
    if (role) {
      $('<div class="clrole"></div>').text(clean(role.textContent)).appendTo($(wrap));
    }
    if (T.note) {
      $('<div class="clnote"></div>').attr('data-bad', T.noteBad ? '1' : '').text(T.note).appendTo($(wrap));
    }

    const forms = T.forms.filter(f => /clubs/.test(f.action) && doc.querySelector(`[data-tmf="${f.n}"]:not([type="hidden"])`));
    // the page's other group links (Choose a New Leader...) as buttons
    if (forms.length && navTable) {
      const main = navTable.closest('td');
      const extra = $('<div class="idbtns clextra"></div>');
      for (const a of (main ? main.querySelectorAll('a[href*="clubs?op="]') : [])) {
        const label = clean(a.textContent);
        if (!label || navTable.contains(a) || a.closest('form, tr[data-tmf]')) {
          continue;
        }
        const href = new URL(a.getAttribute('href'), There.SITE_BASE + 'clubs/').href;
        $('<div class="button"></div>').text(label).on('click', function() {
          There.playSound('control down');
          There.openSite(href, group ? `${group}: ${label}` : label);
        }).appendTo(extra);
      }
      if (extra.children().length) {
        extra.appendTo($(wrap));
      }
    }
    for (const f of forms) {
      There.drawClubForm(wrap, f);
    }
    // no form: the page's words (a notice, a list) with its links
    if (!forms.length) {
      const main = navTable ? navTable.closest('td') : doc.body;
      const box = $('<div class="cltext"></div>').appendTo($(wrap));
      let any = false;
      if (main) {
        let past = !navTable;
        for (const el of Array.from(main.children)) {
          if (el === navTable) {
            past = true;
            continue;
          }
          if (!past || el.tagName == 'SCRIPT') {
            continue;
          }
          const t = clean(el.textContent);
          if (!t) {
            continue;
          }
          any = true;
          $('<p></p>').text(t).appendTo($(box));
          for (const a of el.querySelectorAll('a[href]')) {
            const label = clean(a.textContent);
            const href = a.getAttribute('href');
            if (!label || /^javascript:/i.test(href)) {
              continue;
            }
            $('<span class="cllink"></span>').text(label).on('click', function() {
              There.playSound('control down');
              There.openSite(new URL(href, There.SITE_BASE + 'clubs/').href, label);
            }).appendTo($(box));
          }
        }
      }
      // a list page with its form but nothing in it (no applicants, no
      // invitations): say so plainly under the page's own heading
      const listForm = T.forms.some(f => /clubs/.test(f.action) && doc.querySelector(`[data-tmf="${f.n}"]`));
      if (listForm) {
        $('<div class="clempty"></div>').text('Nobody here right now.').appendTo($(box));
      } else if (!any) {
        $('<div class="empty"></div>').text('Nothing to show on this page.').appendTo($(box));
      }
    }
    $(body).scrollTop(0);
  },

  drawClubForm: function(wrap, f) {
    const T = There.data.grTool;
    const doc = T.doc;
    const clean = t => String(t || '').replace(/\s+/g, ' ').trim();
    const els = Array.from(doc.querySelectorAll(`[data-tmf="${f.n}"]`));
    const box = $('<div class="profedit clform"></div>').appendTo($(wrap));
    const visible = el => !/display\s*:\s*none/i.test(el.getAttribute('style') || '');
    // a field's words: the text just before it (skipping hidden notes and
    // line breaks), else the bold label in its row
    const labelFor = function(el) {
      let prev = el.previousElementSibling;
      while (prev && (prev.tagName == 'BR' || !visible(prev) || !clean(prev.textContent))) {
        prev = prev.previousElementSibling;
      }
      if (prev && !prev.querySelector('input, textarea, select') && !/^(TABLE|TEXTAREA|INPUT|SELECT)$/.test(prev.tagName)) {
        return clean(prev.textContent).replace(/:$/, '');
      }
      const row = el.closest('tr');
      const lab = row ? row.querySelector('.gry10Bld, .gry9Bld') : null;
      return lab ? clean(lab.textContent).replace(/:$/, '') : '';
    };
    // what a tick box or radio is for: the cell beside it
    const choiceLabel = function(el) {
      const cell = el.closest('td');
      const next = cell ? cell.nextElementSibling : null;
      if (next && clean(next.textContent)) {
        return clean(next.textContent);
      }
      const row = el.closest('tr');
      return row ? clean(row.textContent) : '';
    };
    // the words before the fields
    const first = els.find(e => e.getAttribute('type') != 'hidden');
    const holder = first ? (first.closest('table') || {}).parentElement : null;
    if (holder) {
      const intro = clean(Array.from(holder.childNodes).filter(n => n.nodeType == 3).map(n => n.textContent).join(' '));
      if (intro) {
        $('<div class="clintro"></div>').text(intro).appendTo($(box));
      }
    }
    // section headings inside the form, in page order with the fields
    const firstEl = els[0];
    const lastEl = els[els.length - 1];
    const heads = Array.from(doc.querySelectorAll('.orng12Bld')).filter(h => firstEl && lastEl &&
      (firstEl.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      (lastEl.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING));
    const order = els.concat(heads).sort((x, y) => x === y ? 0 : (x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);

    const live = [];
    let buttons = [];
    let group = null;
    let groupName = '';
    const radios = {};
    for (const el of order) {
      if (el.classList && el.classList.contains('orng12Bld')) {
        $('<div class="clhead"></div>').text(clean(el.textContent)).appendTo($(box));
        group = null;
        continue;
      }
      const tag = el.tagName.toLowerCase();
      const type = (el.getAttribute('type') || (tag == 'input' ? 'text' : tag)).toLowerCase();
      const name = el.getAttribute('name') || '';
      if (type == 'hidden') {
        live.push({ name: name, get: () => el.getAttribute('value') || '' });
        continue;
      }
      if (type == 'image' || type == 'submit') {
        buttons.push({ label: There.clubButtonLabel(el), name: name, value: el.getAttribute('value') || '', image: type == 'image' });
        continue;
      }
      if (type == 'button' || type == 'reset') {
        continue;
      }
      if (type == 'radio') {
        // one choice per name, its question from the text before its table
        let r = radios[name];
        if (!r) {
          const table = el.closest('table');
          const field = $('<div class="proffield"></div>').appendTo($(box));
          $('<div class="proflabel"></div>').text(table ? labelFor(table) || name : name).appendTo($(field));
          r = radios[name] = { row: $('<div class="clradios"></div>').appendTo($(field)), inputs: [] };
          live.push({ name: name, get: function() {
            const on = r.inputs.find(x => x.inp.prop('checked'));
            return on ? on.value : null;
          } });
        }
        const line = $('<label class="clcheck clradio"></label>');
        const inp = $('<input type="radio">').attr('name', `tmf${f.n}-${name}`).prop('checked', el.hasAttribute('checked'));
        line.append(inp).append($('<span></span>').text(choiceLabel(el) || el.getAttribute('value') || ''));
        r.row.append(line);
        r.inputs.push({ inp: inp, value: el.getAttribute('value') || 'on' });
        group = null;
        continue;
      }
      if (type == 'checkbox') {
        // tick boxes under a shared heading ("Group Members Can:") go together
        const owner = el.closest('table') ? el.closest('table').parentElement : null;
        const title = owner ? clean(Array.from(owner.childNodes).filter(n => n.nodeType == 3).map(n => n.textContent).join(' ')).replace(/:$/, '') : '';
        if (!group || title != groupName) {
          // consecutive tick groups share a row, in columns
          let cols = box.children().last();
          if (!cols.hasClass('clcols')) {
            cols = $('<div class="clcols"></div>').appendTo($(box));
          }
          const field = $('<div class="proffield"></div>').appendTo(cols);
          if (title) {
            $('<div class="proflabel"></div>').text(title).appendTo($(field));
          }
          group = $('<div class="clchecks"></div>').appendTo($(field));
          groupName = title;
        }
        const line = $('<label class="clcheck"></label>');
        const inp = $('<input type="checkbox">').prop('checked', el.hasAttribute('checked'));
        line.append(inp).append($('<span></span>').text(choiceLabel(el) || el.getAttribute('value') || name));
        group.append(line);
        live.push({ name: name, box: name, get: () => inp.prop('checked') ? (el.getAttribute('value') || 'on') : null });
        continue;
      }
      group = null;
      const field = $('<div class="proffield"></div>').appendTo($(box));
      const label = labelFor(el) || name;
      const lab = $('<div class="proflabel"></div>').appendTo($(field));
      $('<span></span>').text(label.replace(/\s*\((\d+) char\. max\.\)\s*$/, '')).appendTo(lab);
      let ctl;
      if (tag == 'select') {
        ctl = $('<select></select>');
        for (const o of el.querySelectorAll('option')) {
          $('<option></option>').attr('value', o.getAttribute('value') != null ? o.getAttribute('value') : o.textContent).text(clean(o.textContent)).prop('selected', o.hasAttribute('selected')).appendTo(ctl);
        }
      } else if (tag == 'textarea') {
        ctl = $('<textarea></textarea>').attr('rows', Number(String(el.getAttribute('style') || '').match(/height:\s*(\d+)/i)?.[1] || 0) > 60 ? 4 : 2).val(el.textContent || '');
      } else {
        ctl = $('<input type="text">').val(el.getAttribute('value') || '');
      }
      // "(128 char. max.)" and limitChars(this, 128) both mean a limit
      const lim = Number(el.getAttribute('maxlength') || el.getAttribute('maxLength') || 0) ||
        Number((label.match(/\((\d+) char\. max\.\)/) || [])[1] || 0) ||
        Number((String(el.getAttribute('onkeyup') || '').match(/limitChars\(\s*this\s*,\s*(\d+)/) || [])[1] || 0);
      if (lim > 0) {
        ctl.attr('maxlength', lim);
        const count = $('<span class="profcount"></span>').appendTo(lab);
        const tick = function() {
          const n = String(ctl.val() || '').length;
          count.text(`${n}/${lim}`).attr('data-full', n >= lim ? '1' : '');
        };
        ctl.on('input', tick);
        tick();
      }
      ctl.appendTo($(field));
      live.push({ name: name, get: () => String(ctl.val() || ''), el: ctl });
    }
    if (!buttons.length) {
      buttons = [{ label: 'Send', name: '', value: '' }];
    }
    const btns = $('<div class="idbtns"></div>').appendTo($(box));
    const note = $('<span class="clsending"></span>');
    for (const b of buttons) {
      $('<div class="button"></div>').attr('data-primary', '1').attr('data-danger', /quit|leave|delete|remove|reject|decline/i.test(b.label) ? '1' : '').text(b.label).on('click', function() {
        const me = $(this);
        if (me.attr('data-off') == '1') {
          return;
        }
        There.playSound('menu item activate');
        const pairs = [];
        const ticked = {};
        for (const l of live) {
          const v = l.get();
          if (v === null || !l.name) {
            continue;
          }
          if (l.box) {
            ticked[l.box] = true;
          }
          pairs.push([l.name, v]);
        }
        // the page's own script would gather ticked boxes into a field
        for (const field of Object.keys(f.lists || {})) {
          const vals = f.lists[field].filter(x => ticked[x.box]).map(x => x.value);
          const at = pairs.findIndex(kv => kv[0] == field);
          if (at >= 0) {
            pairs[at][1] = vals.join(',');
          } else {
            pairs.push([field, vals.join(',')]);
          }
        }
        if (b.name) {
          pairs.push(b.image ? [`${b.name}.x`, '1'] : [b.name, b.value]);
          if (b.image) {
            pairs.push([`${b.name}.y`, '1']);
          }
        }
        const data = pairs.map(kv => `${encodeURIComponent(kv[0])}=${encodeURIComponent(kv[1])}`).join('&');
        const path = There.siteBridgePath(new URL(f.action, There.SITE_BASE + 'clubs/').href).replace(/\?.*$/, '');
        const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
        me.attr('data-off', '1');
        note.text('Sending\u2026');
        const done = function(raw, ok) {
          if (There.data.grTool !== T) {
            return;
          }
          me.attr('data-off', '');
          if (!ok) {
            note.text('That didn\'t go through. Try again.');
            return;
          }
          // the page the site answers with becomes the page we show
          There.clubToolRead(raw, There.SITE_BASE + path, function(r) {
            if (There.data.grTool !== T) {
              return;
            }
            T.doc = r.doc;
            T.forms = r.forms;
            T.note = `${b.label}: done.`;
            T.noteBad = false;
            There.drawClubTool();
          });
        };
        $.ajax({
          url: f.method == 'post' ? `http://${host}/tmui-webapps/${path}` : `http://${host}/tmui-webapps/${path}?${data}`,
          method: f.method == 'post' ? 'POST' : 'GET',
          data: f.method == 'post' ? data : undefined,
          contentType: 'application/x-www-form-urlencoded',
          processData: false,
          dataType: 'text',
          timeout: 25000,
          success: raw => done(raw, true),
          error: () => done('', false),
        });
      }).appendTo($(btns));
    }
    btns.append(note);
  },

  // native <select> lists open as their own little window, which the HUD's
  // window shape clips away: they can't be opened. every select in the dock
  // is swapped for one of ours; the real one stays (hidden) and keeps the
  // value, so code reading .val() and listening for change is unchanged
  upgradeSelects: function(root) {
    for (const sel of (root || document).querySelectorAll('select:not(.dsnative)')) {
      if (sel.closest('.dsel') || sel.id == 'catSelect') {
        continue;
      }
      const $s = $(sel).addClass('dsnative');
      const box = $('<div class="dsel"></div>').insertBefore($s);
      $s.appendTo(box);
      const btn = $('<div class="dsbtn"></div>').appendTo(box);
      const label = $('<span class="dslabel"></span>').appendTo(btn);
      $('<span class="dscaret"></span>').text('\u25BE').appendTo(btn);
      const list = $('<div class="dslist"></div>').appendTo(box);
      const show = function() {
        const o = sel.options[sel.selectedIndex];
        label.text(o ? o.textContent : '');
      };
      const close = function() {
        box.attr('data-open', '');
      };
      btn.on('click', function(event) {
        // inside a <label> (the profile editor's fields) a click is passed on
        // to the hidden select too; that second click must not close us
        event.preventDefault();
        event.stopPropagation();
        if (sel.disabled) {
          return;
        }
        const open = box.attr('data-open') == '1';
        $('.dsel[data-open="1"]').attr('data-open', '');
        if (open) {
          return;
        }
        There.playSound('control down');
        list.empty();
        Array.from(sel.options).forEach(function(o, i) {
          $('<div class="dsopt"></div>').text(o.textContent).attr('data-on', i == sel.selectedIndex ? '1' : '').on('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            There.playSound('control down');
            sel.selectedIndex = i;
            $s.trigger('change');
            show();
            close();
          }).appendTo(list);
        });
        // open upward when there's no room below inside the scrolling panel
        const scroller = box.closest('.grbody, .profbody, .settingsbody, .relbody, .scbody').get(0) || document.body;
        const room = scroller.getBoundingClientRect().bottom - btn.get(0).getBoundingClientRect().bottom;
        box.attr('data-up', room < 200 ? '1' : '').attr('data-open', '1');
        const on = list.find('[data-on="1"]').get(0);
        if (on) {
          list.scrollTop(on.offsetTop - 60);
        }
      });
      box.on('mousedown', function(event) {
        event.stopPropagation();
      }).on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
      $s.on('change', show);
      show();
    }
  },

  // after a save: does the fresh page carry what we sent?
  profCheckSaved: function() {
    const sent = There.data.profVerify;
    There.data.profVerify = null;
    const form = There.data.profForm;
    if (!sent || !form) {
      return;
    }
    let ok = true;
    for (const name of ['NEW_bio', 'NEW_passions', 'NEW_avpicurl', 'NEW_mypicurl', 'NEW_myurl']) {
      const el = form.querySelector(`[name="${name}"]`);
      if (el && name in sent && There.profFieldValue(el).trim() != String(sent[name]).trim()) {
        ok = false;
      }
    }
    $('.profnote').text(ok ? 'Profile saved' : 'There Central didn\'t keep the changes');
  },

  // the site's page, minus anything that runs or navigates on its own
  renderProfilePage: function(doc, doid) {
    const body = $('.profbody');
    const src = doc.body || doc.documentElement;
    if (!src) {
      $(body).html('<div class="empty">The profile was empty.</div>');
      return;
    }
    const page = document.createElement('div');
    page.className = 'sitepage';
    page.innerHTML = src.innerHTML;
    for (const el of page.querySelectorAll('script, style, link, iframe, object, embed, form, meta')) {
      el.remove();
    }
    for (const el of page.querySelectorAll('*')) {
      for (const a of Array.from(el.attributes)) {
        if (/^on/i.test(a.name)) {
          el.removeAttribute(a.name);
        }
      }
    }
    const base = 'https://webapps.prod.there.com/profiles/';
    for (const img of page.querySelectorAll('img')) {
      const v = img.getAttribute('src') || '';
      try {
        img.setAttribute('src', new URL(v, base).href);
      } catch (error) {
        img.remove();
      }
    }
    for (const a of page.querySelectorAll('a')) {
      const href = a.getAttribute('href') || '';
      a.removeAttribute('href');
      a.removeAttribute('target');
      $(a).on('click', function(event) {
        event.preventDefault();
        let url = null;
        try {
          url = new URL(href, base);
        } catch (error) {
        }
        if (!url || !/^https?:$/.test(url.protocol)) {
          return;
        }
        // another avatar's profile stays in the panel
        const other = url.searchParams.get('AvatarDoid');
        if (other && /profiles\/profiles/.test(url.pathname)) {
          There.playSound('control down');
          There.showProfile(other, $(a).text().trim());
          return;
        }
        There.openUrl(url.href);
      });
    }
    const title = (doc.title || '').trim();
    if (!There.data.profName && title) {
      $('.profilepanel .paneltitle').text(title);
    }
    $(body).empty().append(page);
    $(body).scrollTop(0);
  },

  /* ------- Developer panel: My Submissions -------
   * The submissions page, read through FlashProxy with the game's own login,
   * no browser window. Each submission is a div#s-<id> with spans for its
   * name, dates and status, a details block, and action links. */

  DEV_TABS: [['', 'All'], ['Closed', 'Approved'], ['Pending', 'Pending'], ['Rejected', 'Terminated']],

  devFetch: function(path, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/wsgi-scripts/submissions.py/${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(html) {
        cb(html || '');
      },
      error: function() {
        cb(null);
      },
    });
  },

  renderDevTabs: function() {
    const tabs = $('.devtabs');
    $(tabs).empty();
    const cur = There.data.devTab || '';
    for (const [status, label] of There.DEV_TABS) {
      $('<div class="tab"></div>').text(label).attr('data-active', status == cur ? '1' : '0').on('click', function() {
        if ((There.data.devTab || '') == status) {
          return;
        }
        There.playSound('control down');
        There.data.devTab = status;
        There.renderDevTabs();
        There.loadDeveloper(false);
      }).appendTo($(tabs));
    }
  },

  loadDeveloper: function(force) {
    const status = There.data.devTab || '';
    There.data.devCache = There.data.devCache || {};
    const cached = There.data.devCache[status];
    if (cached && Date.now() - cached.at < 120000 && !force) {
      There.renderDeveloper();
      return;
    }
    if (!cached) {
      $('.devbody').html('<div class="empty">Loading your submissions…</div>');
    }
    $('.devcount').text('Checking…');
    const q = `submissions?numHeaders=200&sort=create${status ? `&status=${encodeURIComponent(status)}` : ''}`;
    There.devFetch(q, function(html) {
      if (html === null) {
        $('.devcount').text('');
        if (!cached) {
          $('.devbody').html('<div class="empty">The Developer pages didn\'t answer. Try Refresh in a moment.</div>');
        }
        return;
      }
      const doc = new DOMParser().parseFromString(html, 'text/html');
      if (!/My Submissions/.test(doc.title || '')) {
        $('.devcount').text('');
        $('.devbody').html('<div class="empty">Couldn\'t open your submissions with your login. Try again once you\'re fully logged in.</div>');
        return;
      }
      There.data.devCache[status] = { at: Date.now(), list: There.parseSubmissions(doc) };
      if (There.data.panel == 'developer' && (There.data.devTab || '') == status) {
        There.renderDeveloper();
      }
    });
  },

  parseSubmissions: function(doc) {
    const list = [];
    for (const el of doc.querySelectorAll('div.submissionEven, div.submissionOdd')) {
      const id = (el.id || '').replace(/^s-/, '');
      if (!/^\d+$/.test(id)) {
        continue;
      }
      const txt = sel => {
        const n = el.querySelector(sel);
        return n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
      };
      const sub = {
        id: id,
        name: txt('.subProductName'),
        created: txt('.subCreation'),
        updated: txt('.subUpdate'),
        status: txt('.subProductStatus'),
        img: (el.querySelector('.devImg img') || { getAttribute: () => '' }).getAttribute('src') || '',
        facts: [],
        messages: [],
      };
      for (const div of el.querySelectorAll('.subMessages > div')) {
        const strong = div.querySelector('strong');
        if (strong) {
          const label = strong.textContent.replace(/:\s*$/, '').trim();
          const value = div.textContent.replace(strong.textContent, '').replace(/\s+/g, ' ').trim();
          sub.facts.push([label, value]);
          if (label == 'Product ID') {
            sub.pid = value;
          }
          if (label == 'Product Type') {
            sub.type = value;
          }
        } else {
          const t = div.textContent.replace(/\s+/g, ' ').trim();
          if (t) {
            sub.messages.push(t);
          }
        }
      }
      const link = function(pattern) {
        for (const a of el.querySelectorAll('a')) {
          const s = `${a.getAttribute('href') || ''} ${a.getAttribute('onclick') || ''}`;
          const m = s.match(pattern);
          if (m) {
            return m[1];
          }
        }
        return '';
      };
      sub.review = link(/review\.py\/review\?pid=(\d+)/);
      sub.buy = link(/product\?confirm=(\d+)/);
      sub.rent = link(/product\?rentconfirm=(\d+)/);
      sub.tryit = link(/product\?try=(\d+)/);
      sub.list = link(/addquantity\?ProductId=(\d+)/);
      list.push(sub);
    }
    return list;
  },

  // catalog pictures through the picture store; submission artwork (not in
  // the catalog yet) through FlashProxy with the login
  devImg: function(src) {
    if (/^\/catalog\/media\//.test(src)) {
      return There.reviewImg(src);
    }
    const m = String(src || '').match(/^\/developer\/asset\.cgi\?type=catimage&subid=(\d+)$/);
    if (m) {
      const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
      return `http://${host}/tmui-webapps/developer/asset.cgi?type=catimage&subid=${m[1]}`;
    }
    return null;
  },

  devStatusKind: function(status) {
    const s = String(status || '').toLowerCase();
    if (s == 'available' || s == 'approved' || s == 'closed') {
      return 'ok';
    }
    if (s == 'pending') {
      return 'wait';
    }
    if (s == 'cancelled' || s == 'rejected' || s == 'terminated') {
      return 'bad';
    }
    return 'other';
  },

  renderDeveloper: function() {
    const status = There.data.devTab || '';
    const cache = (There.data.devCache || {})[status];
    const list = cache ? cache.list : [];
    const q = ($('.devsearch input').val() || '').trim().toLowerCase();
    const shown = q ? list.filter(s => `${s.name} ${s.type || ''} ${s.status}`.toLowerCase().includes(q)) : list;
    const body = $('.devbody');
    $(body).empty();
    $('.devcount').text(`${list.length} submission${list.length == 1 ? '' : 's'}`);
    for (const sub of shown) {
      let row = $('<div class="devrow"></div>').attr('data-open', '0');
      let head = $('<div class="devhead"></div>');
      let thumb = $('<div class="devthumb"></div>');
      const src = There.devImg(sub.img);
      if (src) {
        $('<img>').attr('loading', 'lazy').attr('decoding', 'async').attr('src', src).appendTo($(thumb));
      }
      $(thumb).appendTo($(head));
      let main = $('<div class="devmain"></div>');
      $('<div class="devname"></div>').text(sub.name || `Submission ${sub.id}`).appendTo($(main));
      $('<div class="devtype"></div>').text(sub.type || '').appendTo($(main));
      $(main).appendTo($(head));
      $('<span class="devstatus"></span>').attr('data-kind', There.devStatusKind(sub.status)).text(sub.status || '?').appendTo($(head));
      $('<div class="devdates"></div>').append(
        $('<span></span>').text(`Created ${sub.created}`),
        $('<span></span>').text(`Updated ${sub.updated}`)).appendTo($(head));
      $(head).on('click', function() {
        There.playSound('control down');
        $(row).attr('data-open', $(row).attr('data-open') == '1' ? '0' : '1');
      });
      $(head).appendTo($(row));

      let more = $('<div class="devmore"></div>');
      let facts = $('<div class="revfacts"></div>');
      for (const [k, v] of sub.facts) {
        $('<span class="k"></span>').text(k).appendTo($(facts));
        $('<span class="v"></span>').text(v).appendTo($(facts));
      }
      $(facts).appendTo($(more));
      for (const m of sub.messages) {
        $('<div class="devmsg"></div>').text(m).appendTo($(more));
      }
      let btns = $('<div class="devbtns"></div>');
      const btn = function(label, fn) {
        $('<div class="button"></div>').text(label).on('click', function(event) {
          event.stopPropagation();
          There.playSound('menu item activate');
          fn();
        }).appendTo($(btns));
      };
      if (sub.review) {
        btn('Reviews', function() {
          There.togglePanel('reviews');
          There.showReview({ productid: sub.review, name: sub.name, type: sub.type || '', img: sub.img, test: false });
        });
      }
      const web = 'https://webapps.prod.there.com';
      if (sub.buy) {
        btn('Buy', function() { There.openUrl(`${web}/catalog/product?confirm=${sub.buy}`); });
      }
      if (sub.rent) {
        btn('Rent', function() { There.openUrl(`${web}/catalog/product?rentconfirm=${sub.rent}`); });
      }
      if (sub.tryit) {
        btn('Try', function() { There.openUrl(`${web}/catalog/product?try=${sub.tryit}`); });
      }
      if (sub.list) {
        btn('List at auction', function() { There.showListing(sub); });
      }
      if ($(btns).children().length) {
        $(btns).appendTo($(more));
      }
      $(more).appendTo($(row));
      $(row).appendTo($(body));
    }
    if (!shown.length) {
      $(body).html(`<div class="empty">${list.length ? 'No submissions match.' : 'No submissions here.'}</div>`);
    }
  },

  /* ------- My auctions (Auctions panel) -------
   * /items/myitems, read with the game's own login: every section on the
   * page (items bid on, items selling, ...) with whatever columns it has.
   * Items open in the panel's own auction page. */

  loadMyAuctions: function() {
    There.data.auBack = There.loadMyAuctions;
    const crumbs = $('.aucrumbs');
    $(crumbs).empty();
    $('<span class="crumb"></span>').text('Auctions').on('click', function() {
      There.playSound('control down');
      There.loadAuctionsHome();
    }).appendTo($(crumbs));
    $(crumbs).append($('<span></span>').text('›'), $('<span class="crumb" data-here="1"></span>').text('My auctions'));
    $('.aubody').html('<div class="empty">Loading your auctions…</div>');
    There.listFetch('items/myitems', null, function(doc) {
      if (There.data.panel != 'auctions' || There.data.auBack != There.loadMyAuctions) {
        return;
      }
      const sections = doc ? There.parseMyAuctions(doc) : null;
      if (!sections) {
        $('.aubody').html('<div class="empty">Couldn\'t open your auctions with your login. Try again in a moment.</div>');
        return;
      }
      There.renderMyAuctions(sections);
    });
  },

  // "Fri 25 Dec 2020 14:49:46 GMT" -> "2d 4h left" / "Ended"
  auTimeLeft: function(stamp) {
    const end = Date.parse(stamp);
    if (isNaN(end)) {
      return '';
    }
    let s = Math.floor((end - Date.now()) / 1000);
    if (s <= 0) {
      return 'Ended';
    }
    const d = Math.floor(s / 86400);
    s -= d * 86400;
    const h = Math.floor(s / 3600);
    s -= h * 3600;
    const m = Math.floor(s / 60);
    return d ? `${d}d ${h}h left` : h ? `${h}h ${m}m left` : `${m}m left`;
  },

  // each orange heading starts a section; its table's header row names the
  // columns, the rows after it are the items
  parseMyAuctions: function(doc) {
    const content = doc.querySelector('#content');
    if (!content) {
      return null;
    }
    const sections = [];
    let current = null;
    const walker = doc.createTreeWalker(content, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.classList.contains('orng12Bld')) {
        current = { title: node.textContent.replace(/[:\s]+$/, '').trim(), columns: null, items: [] };
        sections.push(current);
        continue;
      }
      if (!current || node.tagName != 'TR') {
        continue;
      }
      const cells = Array.from(node.children).filter(td => td.tagName == 'TD');
      if (!current.columns && cells.some(td => td.classList.contains('gry10Bld'))) {
        current.columns = cells.map(td => td.textContent.replace(/\s+/g, ' ').trim());
        continue;
      }
      if (current.columns && node.classList.contains('gry10')) {
        const item = { fields: [], links: [] };
        cells.forEach(function(td, i) {
          const label = current.columns[i];
          const script = td.querySelector('script');
          const stamp = script ? (script.textContent.match(/var time = '([^']+)'/) || [])[1] : null;
          for (const a of td.querySelectorAll('a[href]')) {
            const href = a.getAttribute('href') || '';
            const m = href.match(/items\/view\?ItemId=(\d+)/);
            if (m && !item.itemId) {
              item.itemId = m[1];
              item.title = a.textContent.replace(/\s+/g, ' ').trim();
            } else if (!/^javascript:|^#$/.test(href)) {
              item.links.push({ label: a.textContent.replace(/\s+/g, ' ').trim(), href: href });
            }
          }
          if (!label) {
            return;
          }
          const copy = td.cloneNode(true);
          for (const s of copy.querySelectorAll('script')) {
            s.remove();
          }
          let value = copy.textContent.replace(/\s+/g, ' ').trim();
          if (stamp) {
            value = There.auTimeLeft(stamp) || value;
          }
          if (label != 'Title') {
            item.fields.push([label, value]);
          }
        });
        if (item.itemId || item.fields.length) {
          current.items.push(item);
        }
      }
    }
    return sections;
  },

  renderMyAuctions: function(sections) {
    const body = $('.aubody');
    $(body).empty().attr('data-view', 'mine');
    let any = false;
    for (const sec of sections) {
      // each section folds; bids start folded so your own sales come first.
      // the choice is remembered per section
      const folds = There.prefs().myAuFolds || {};
      const folded = sec.title in folds ? !!folds[sec.title] : /bid/i.test(sec.title);
      let head = $('<div class="ausection mysection"></div>').attr('data-open', folded ? '0' : '1');
      $('<span class="mychev"></span>').html(tmuiIcon('play')).appendTo($(head));
      $('<span></span>').text(`${sec.title} (${sec.items.length})`).appendTo($(head));
      let group = $('<div class="mygroup"></div>').toggle(!folded);
      $(head).on('click', function() {
        const open = $(head).attr('data-open') != '1';
        $(head).attr('data-open', open ? '1' : '0');
        $(group).toggle(open);
        const p = There.prefs();
        p.myAuFolds = Object.assign({}, p.myAuFolds || {}, { [sec.title]: !open });
        There.savePrefs();
        There.playSound('control down');
      });
      $(body).append(head, group);
      if (!sec.items.length) {
        $('<div class="empty"></div>').text('Nothing here.').appendTo($(group));
        continue;
      }
      any = true;
      // live ones first, then the most recently ended
      const live = sec.items.filter(it => !it.fields.some(f => f[1] == 'Ended'));
      const ended = sec.items.filter(it => it.fields.some(f => f[1] == 'Ended'));
      for (const it of live.concat(ended)) {
        const isEnded = !live.includes(it);
        let row = $('<div class="myrow"></div>').attr('data-ended', isEnded ? '1' : '0');
        $('<div class="myname"></div>').text(it.title || `Auction ${it.itemId || ''}`).appendTo($(row));
        let facts = $('<div class="myfacts"></div>');
        for (const [k, v] of it.fields) {
          if (!v) {
            continue;
          }
          let chip = $('<span class="myfact"></span>');
          if (/winning/i.test(k)) {
            // still running: winning or outbid; over: won or not
            const yes = /^yes$/i.test(v);
            $(chip).attr('data-kind', yes ? 'ok' : 'bad')
              .text(isEnded ? (yes ? 'Won' : 'Not won') : (yes ? 'Winning' : 'Outbid'));
          } else if (/time left/i.test(k)) {
            $(chip).attr('data-kind', v == 'Ended' ? 'dim' : 'wait').text(v);
          } else {
            $(chip).append($('<span class="mk"></span>').text(k), document.createTextNode(` ${v}`));
          }
          $(chip).appendTo($(facts));
        }
        $(facts).appendTo($(row));
        if (it.links.length) {
          let btns = $('<div class="devbtns"></div>');
          for (const l of it.links) {
            $('<div class="button"></div>').text(l.label || 'Open').on('click', function(event) {
              event.stopPropagation();
              There.openUrl(new URL(l.href, 'https://webapps.prod.there.com/items/').href);
            }).appendTo($(btns));
          }
          $(btns).appendTo($(row));
        }
        if (it.itemId) {
          $(row).on('click', function() {
            There.playSound('control down');
            There.showAuctionDetail(it.itemId);
          });
        }
        $(row).appendTo($(group));
      }
    }
    if (!sections.length) {
      $(body).html('<div class="empty">No auctions to show.</div>');
    } else if (!any) {
      $('<div class="empty"></div>').text('You have no auctions right now.').appendTo($(body));
    }
  },

  /* ------- List at auction (Developer panel) -------
   * The "Sell your Item" form, rebuilt: same fields, same fees and profit
   * maths as the page's own script, posted the way the page posts it. What
   * comes back is shown as the server wrote it: its error, its confirmation
   * step (confirmed here with its own form), or its success text. */

  LIST_DURATIONS: [
    ['3600', '1 hour', 2], ['7200', '2 hours', 3], ['86400', '1 day', 4], ['259200', '3 days', 5],
    ['432000', '5 days', 6], ['604800', '1 week', 7], ['1209600', '2 weeks', 8],
    ['1814400', '3 weeks', 9], ['2592000', '1 month', 10], ['5184000', '2 months', 11],
  ],

  listFetch: function(path, body, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${path}`,
      method: body === null ? 'GET' : 'POST',
      data: body === null ? undefined : body,
      contentType: 'application/x-www-form-urlencoded',
      processData: false,
      dataType: 'text',
      timeout: 25000,
      success: function(html) {
        There.data.listRaw = html || '';
        // auction pages answer in XML plus a stylesheet; render it the way a
        // browser does, so every step reads like the page the player sees
        const pi = (html || '').match(/<\?xml-stylesheet[^>]*href="([^"]+)"/);
        if (pi) {
          const base = 'https://webapps.prod.there.com/' + path.split('?')[0].replace(/[^/]*$/, '');
          There.xslRender(html, new URL(pi[1], base).href, function(doc) {
            cb(doc || new DOMParser().parseFromString(html || '', 'text/html'));
          });
          return;
        }
        cb(new DOMParser().parseFromString(html || '', 'text/html'));
      },
      error: function() {
        cb(null);
      },
    });
  },

  /* XSLT, the way the browser does it: fetch the page's stylesheet (public
     files on There Central), fold in the stylesheets it includes, and
     transform the XML into the page. stylesheets are kept for the session */
  XSL_NS: 'http://www.w3.org/1999/XSL/Transform',

  xslFetch: function(url, cb) {
    There.data.xslCache = There.data.xslCache || {};
    if (There.data.xslCache[url]) {
      cb(There.data.xslCache[url].cloneNode(true));
      return;
    }
    const u = new URL(url);
    if (u.hostname != 'webapps.prod.there.com') {
      cb(null);
      return;
    }
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps${u.pathname}${u.search}`,
      dataType: 'text',
      timeout: 15000,
      success: function(text) {
        const doc = new DOMParser().parseFromString(text || '', 'text/xml');
        if (!doc.documentElement || doc.getElementsByTagName('parsererror').length) {
          cb(null);
          return;
        }
        There.xslInline(doc, url, 0, function(full) {
          if (full) {
            There.data.xslCache[url] = full;
          }
          cb(full ? full.cloneNode(true) : null);
        });
      },
      error: function() {
        cb(null);
      },
    });
  },

  // replace each xsl:include / xsl:import with the stylesheet it names
  xslInline: function(doc, url, depth, cb) {
    const links = Array.from(doc.documentElement.children).filter(el =>
      el.namespaceURI == There.XSL_NS && (el.localName == 'include' || el.localName == 'import'));
    if (!links.length || depth > 5) {
      cb(links.length ? null : doc);
      return;
    }
    const el = links[0];
    const href = new URL(el.getAttribute('href') || '', url).href;
    There.xslFetch(href, function(inc) {
      if (!inc) {
        cb(null);
        return;
      }
      // an import's rules lose to the importer's: put them first
      const at = el.localName == 'import' ? doc.documentElement.firstElementChild : el;
      for (const child of Array.from(inc.documentElement.children)) {
        doc.documentElement.insertBefore(doc.importNode(child, true), at);
      }
      el.remove();
      There.xslInline(doc, url, depth + 1, cb);
    });
  },

  xslRender: function(xmlText, xslUrl, cb) {
    There.xslFetch(xslUrl, function(xsl) {
      if (!xsl) {
        cb(null);
        return;
      }
      try {
        const xml = new DOMParser().parseFromString(xmlText, 'text/xml');
        const proc = new XSLTProcessor();
        proc.importStylesheet(xsl);
        const out = proc.transformToDocument(xml);
        cb(out && out.documentElement ? out : null);
      } catch (error) {
        cb(null);
      }
    });
  },

  // a page's readable text, scripts left out
  listText: function(el) {
    if (!el) {
      return '';
    }
    const copy = el.cloneNode(true);
    for (const s of copy.querySelectorAll('script, style, select')) {
      s.remove();
    }
    return copy.textContent.replace(/\s+/g, ' ').trim();
  },

  listError: function(doc) {
    for (const el of doc.querySelectorAll('.red12Bld, #submitText, .red10Bld')) {
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t) {
        return t;
      }
    }
    return '';
  },

  showListing: function(sub) {
    const body = $('.devbody');
    $(body).html('<div class="empty">Opening the listing form…</div>');
    There.data.listing = sub.list;
    There.listFetch(`items/addquantity?ProductId=${encodeURIComponent(sub.list)}`, null, function(doc) {
      if (There.data.listing != sub.list || There.data.panel != 'developer') {
        return;
      }
      const form = doc ? doc.querySelector('form[name="addItem"]') : null;
      if (!form) {
        // say what did come back. the auction pages answer in XML (a
        // stylesheet turns it into the page in a browser): list its fields
        const raw = There.data.listRaw || '';
        let what = !doc ? 'no answer at all' : '';
        if (doc && /^\s*<\?xml|^\s*<[A-Za-z]/.test(raw) && !/<html/i.test(raw.slice(0, 400))) {
          const xml = new DOMParser().parseFromString(raw, 'text/xml');
          const pi = (raw.match(/<\?xml-stylesheet[^>]*href="([^"]+)"/) || [])[1] || 'none';
          const fields = [];
          const walk = function(el, depth) {
            const kids = Array.from(el.children);
            if (!kids.length) {
              fields.push(`${el.nodeName}=${(el.textContent || '').trim().slice(0, 40)}`);
            } else {
              fields.push(`${el.nodeName}{`);
              for (const k of kids) {
                walk(k, depth + 1);
              }
              fields.push('}');
            }
          };
          if (xml.documentElement) {
            walk(xml.documentElement, 0);
          }
          what = `XML, stylesheet ${pi}: ${fields.join(' ').slice(0, 900)}`;
        } else if (doc) {
          what = `"${(doc.title || 'untitled').trim()}": ${There.listText(doc.body).slice(0, 160) || 'an empty page'}`;
        }
        $(body).empty().append($('<div class="empty listdump"></div>').text(
          `The listing form didn't load. There Central sent back ${what}`));
        return;
      }
      const scripts = Array.from(doc.querySelectorAll('script')).map(s => s.textContent).join('\n');
      const wm = scripts.match(/var theCost = parseInt\('(\d+)'\)/);
      const name = doc.querySelector('#content .gry10Bld');
      const pic = doc.querySelector('#content img[src*="/catalog/media/"]');
      const info = {
        pid: sub.list,
        oid: (form.querySelector('input[name="OId"]') || {}).value || '',
        name: name ? name.textContent.trim() : sub.name,
        desc: There.listText(name ? name.nextElementSibling : null),
        img: pic ? pic.getAttribute('src') : sub.img,
        wholesale: wm ? Number(wm[1]) : null,
      };
      There.renderListing(info);
    });
  },

  renderListing: function(info) {
    const body = $('.devbody');
    $(body).empty();
    const st = { type: 2, qty: '', price: '', dur: null, rate: '', days: 0, currency: 0, extra: '', logo: '', featured: '' };
    let d = $('<div class="itemdetail"></div>');
    $('<div class="idback"></div>').text('‹ Back to submissions').on('click', function() {
      There.playSound('control down');
      There.data.listing = null;
      There.renderDeveloper();
    }).appendTo($(d));
    let top = $('<div class="idtop"></div>');
    let im = $('<div class="idimg"></div>');
    const src = There.devImg(info.img);
    if (src) {
      $('<img>').attr('src', src).appendTo($(im));
    }
    $(im).appendTo($(top));
    let infoEl = $('<div class="idinfo"></div>');
    $('<div class="idname"></div>').text(info.name).appendTo($(infoEl));
    if (info.desc) {
      $('<div class="iddesc"></div>').text(info.desc).appendTo($(infoEl));
    }
    $('<div class="revverdict"></div>').text(info.wholesale != null ? `Wholesale ${info.wholesale}T, taken when it sells` : '').appendTo($(infoEl));
    $(infoEl).appendTo($(top));
    $(top).appendTo($(d));

    let f = $('<div class="revform listform"></div>');
    const field = function(label, el, hint) {
      let row = $('<div class="lfield"></div>');
      $('<div class="llabel"></div>').text(label).appendTo($(row));
      $(row).append(el);
      if (hint) {
        $('<div class="lhint"></div>').text(hint).appendTo($(row));
      }
      $(row).appendTo($(f));
      return row;
    };
    const chips = function(options, isOn, onPick) {
      let wrap = $('<div class="lchips"></div>');
      for (const [value, label] of options) {
        $('<span class="lchip"></span>').text(label).attr('data-v', value).on('click', function() {
          There.playSound('control down');
          onPick(value);
          update();
        }).appendTo($(wrap));
      }
      wrap.refresh = function() {
        $(wrap).children().each(function() {
          $(this).attr('data-on', isOn($(this).attr('data-v')) ? '1' : '0');
        });
      };
      return wrap;
    };
    const input = function(key, attrs) {
      let el = $('<input type="text">').attr(attrs || {});
      $(el).on('input', function() {
        st[key] = $(this).val();
        update();
      }).on('click', function() {
        if (!$(this).is(':focus')) {
          There.fsCommand('getKeyboardFocus');
          $(this).focus();
        }
      }).on('keydown mousedown', function(event) {
        event.stopPropagation();
      });
      return el;
    };

    const typeChips = chips([['2', 'Purchase only'], ['4', 'Rental only'], ['6', 'Purchase and rental']],
      v => Number(v) == st.type, v => { st.type = Number(v); });
    field('Sale type', typeChips);
    let nums = $('<div class="lrow"></div>');
    $(nums).append($('<span class="lmini">Quantity</span>'), input('qty', { maxlength: 5, placeholder: 'up to 10,000', class: 'lnum' }),
      $('<span class="lmini">Retail price (T)</span>'), input('price', { maxlength: 9, placeholder: 'e.g. 5000', class: 'lnum' }));
    field('Quantity and price', nums);
    let profit = $('<div class="lcalc"></div>');
    $(f).append(profit);
    const durChips = chips(There.LIST_DURATIONS.map(x => [x[0], x[1]]), v => v == st.dur, v => { st.dur = v; });
    field('Auction length', durChips);

    let rentWrap = $('<div class="lrent"></div>');
    $(f).append(rentWrap);
    let rateRow = $('<div class="lrow"></div>').append($('<span class="lmini">Rental percentage</span>'),
      input('rate', { maxlength: 5, placeholder: '% of retail per day', class: 'lnum' }));
    let rentCalc = $('<div class="lcalc"></div>');
    const dayChips = chips([1, 2, 4, 8, 16, 32, 64, 128, 256].map((b, i) => [String(b), `${i + 1} day${i ? 's' : ''}`]),
      v => (st.days & Number(v)) != 0, v => { st.days ^= Number(v); });
    $(rentWrap).append($('<div class="llabel"></div>').text('Rental'), rateRow, rentCalc,
      $('<div class="lhint"></div>').text('Rental lengths people may choose (pick any):'), dayChips);

    const curChips = chips([['0', 'ThereBux only'], ['3', 'US dollars only'], ['1', 'Buyer chooses']],
      v => Number(v) == st.currency, v => { st.currency = Number(v); });
    field('Buyer pays in', curChips, 'USD payments go through PayPal.');
    let extra = $('<textarea maxlength="1024" placeholder="Extra description (optional, up to 1,024 characters)"></textarea>');
    $(extra).on('input', function() {
      st.extra = $(this).val();
    }).on('click', function() {
      if (!$(this).is(':focus')) {
        There.fsCommand('getKeyboardFocus');
        $(this).focus();
      }
    }).on('keydown mousedown', function(event) {
      event.stopPropagation();
    });
    field('Extra description', extra);
    field('Logo', input('logo', { maxlength: 100, placeholder: 'Optional: a URL for a 190 x 135 logo', class: 'lwide' }));
    const featChips = chips([['', 'None'], ['2', 'Front page (1,400T a day)'], ['8', 'Featured designer (10,000T)'], ['4', 'Featured listing (3,000T)']],
      v => v == st.featured, v => { st.featured = v; });
    field('Enhance your listing', featChips);

    let fees = $('<div class="lfees"></div>');
    $(f).append(fees);
    let note = $('<div class="lhint"></div>').text('The wholesale price and a 5.25% final value fee are taken when it sells.');
    $(f).append(note);
    let send = $('<div class="button revsend"></div>').attr('data-primary', '1').text('List it');
    let sendNote = $('<span class="revnote"></span>');
    $('<div class="idbtns"></div>').append(send, sendNote).appendTo($(f));
    $(f).appendTo($(d));
    $(d).appendTo($(body));

    const n = v => (/^\d+$/.test(String(v).trim()) ? Number(String(v).trim()) : null);
    const fee = function() {
      const price = n(st.price);
      const rate = n(st.rate);
      let listing = 0;
      if (st.type == 2) {
        listing = price != null ? 100 : 0;
      } else if (st.type == 4) {
        listing = rate != null ? 200 : 0;
      } else {
        listing = 300;
      }
      let extraFee = 0;
      if (st.featured == '2') {
        const idx = st.dur ? (There.LIST_DURATIONS.find(x => x[0] == st.dur) || [0, 0, 0])[2] : 0;
        extraFee = idx <= 1 ? 0 : idx < 5 ? 1400 : idx == 5 ? 4200 : idx == 6 ? 7000 : idx == 7 ? 9800 : 19600;
      } else if (st.featured == '8') {
        extraFee = 10000;
      } else if (st.featured == '4') {
        extraFee = 3000;
      }
      return { listing: listing, extra: extraFee, total: listing + extraFee };
    };
    const problem = function() {
      const qty = n(st.qty);
      const price = n(st.price);
      if (qty == null || qty < 1 || qty > 10000) {
        return 'Enter a quantity from 1 to 10,000.';
      }
      if (price == null || price < 1) {
        return 'Enter a retail price in T.';
      }
      if (!st.dur) {
        return 'Pick an auction length.';
      }
      if (st.type != 2) {
        if (n(st.rate) == null) {
          return 'Enter a rental percentage.';
        }
        if (!st.days) {
          return 'Pick at least one rental length.';
        }
      }
      return '';
    };
    let armed = false;
    const update = function() {
      for (const c of [typeChips, durChips, dayChips, curChips, featChips]) {
        c.refresh();
      }
      $(rentWrap).toggle(st.type != 2);
      const price = n(st.price);
      $(profit).html('');
      if (price != null && info.wholesale != null) {
        const p = price - info.wholesale;
        $(profit).append(document.createTextNode(`${price}T retail − ${info.wholesale}T wholesale = `),
          $('<b></b>').text(`${p}T profit`).attr('data-bad', p < 0 ? '1' : '0'));
      }
      $(rentCalc).html('');
      const rate = parseFloat(st.rate);
      if (price != null && !isNaN(rate)) {
        const daily = Math.max(1, Math.round(price * rate / 100));
        const cost = Math.max(1, Math.round(price * rate * 50 / 10000));
        $(rentCalc).append(document.createTextNode(`${daily}T a day − ${cost}T wholesale = `),
          $('<b></b>').text(`${daily - cost}T profit a day`));
      }
      const fz = fee();
      $(fees).html('').append(document.createTextNode(`Listing fee ${fz.listing}T`),
        fz.extra ? document.createTextNode(` + enhancement ${fz.extra}T`) : '',
        document.createTextNode(' = '), $('<b></b>').text(`${fz.total}T total fees`));
      armed = false;
      $(send).text('List it');
      $(sendNote).attr('data-bad', '0').text('');
    };
    update();

    $(send).on('click', function() {
      const bad = problem();
      if (bad) {
        $(sendNote).attr('data-bad', '1').text(bad);
        return;
      }
      // a listing costs: second click sends, showing what it costs
      if (!armed) {
        armed = true;
        $(send).text(`Click again to list (${fee().total}T fees)`);
        There.setNamedTimer('list-arm', 5000, function() {
          armed = false;
          $(send).text('List it');
        });
        return;
      }
      armed = false;
      There.clearNamedTimer('list-arm');
      $(send).text('Sending…');
      There.playSound('menu item activate');
      // the page's fields in its own order; switched-off fields aren't sent
      const q = new URLSearchParams();
      q.append('OId', info.oid);
      q.append('ProductId', info.pid);
      q.append('ExtraDescription', st.extra);
      q.append('Type', String(st.type));
      q.append('Quantity', String(st.qty).trim());
      q.append('ItemPrice', String(st.price).trim());
      q.append('DurationSeconds', st.dur);
      if (st.type != 2) {
        q.append('RentRate', String(st.rate).trim());
      }
      q.append('RentTime', String(st.type != 2 ? st.days : 0));
      q.append('CurrencyFlags', String(st.currency));
      q.append('LogoUrl', String(st.logo).trim());
      if (st.featured) {
        q.append('Featured', st.featured);
      }
      q.append('x', '36');
      q.append('y', '7');
      There.listFetch('items/addquantityconfirm', q.toString(), function(doc) {
        $(send).text('List it');
        There.listOutcome(info, doc, sendNote);
      });
    });
  },

  // the labelled values on the "successfully listed" page, read in order:
  // each value runs up to the next label it knows
  LISTED_LABELS: ['Base Listing Fee', 'Front Page Featured Fee', 'Featured Designer Fee', 'Featured Listing Fee',
    'Total Listing Fees', 'Prior Therebucks balance', 'Current Therebucks balance', 'Auction ID', 'Sale Price',
    'Sale Ends', 'Seller', 'Seller\'s comments about this item', 'Item Description'],

  listedValues: function(text) {
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const labels = There.LISTED_LABELS.slice().sort((a, b) => b.length - a.length);
    const any = new RegExp(`(${labels.map(esc).join('|')})\\s*:?`, 'g');
    const out = {};
    const hits = [];
    let m;
    while ((m = any.exec(text)) !== null) {
      hits.push({ label: m[1], start: m.index, end: any.lastIndex });
    }
    for (let i = 0; i < hits.length; i++) {
      const stop = i + 1 < hits.length ? hits[i + 1].start : text.length;
      if (!(hits[i].label in out)) {
        out[hits[i].label] = text.slice(hits[i].end, stop).replace(/[\]\s]+$/, '').trim();
      }
    }
    return out;
  },

  renderListed: function(info, doc, text) {
    const v = There.listedValues(text);
    const body = $('.devbody');
    $(body).empty();
    let d = $('<div class="itemdetail listed"></div>');
    $('<div class="idback"></div>').text('‹ Back to submissions').on('click', function() {
      There.playSound('control down');
      There.data.listing = null;
      There.loadDeveloper(true);
    }).appendTo($(d));
    $('<div class="listedbanner"></div>').append(
      $('<span class="lbicon"></span>').html(tmuiIcon('gavel')),
      $('<span></span>').text('Listed! Your item is up for sale.')).appendTo($(d));

    let top = $('<div class="idtop"></div>');
    let im = $('<div class="idimg"></div>');
    const src = There.devImg(info.img);
    if (src) {
      $('<img>').attr('src', src).appendTo($(im));
    }
    $(im).appendTo($(top));
    let infoEl = $('<div class="idinfo"></div>');
    $('<div class="idname"></div>').text(info.name).appendTo($(infoEl));
    let facts = $('<div class="revfacts"></div>');
    const fact = function(k, val) {
      if (val) {
        $('<span class="k"></span>').text(k).appendTo($(facts));
        $('<span class="v"></span>').text(val).appendTo($(facts));
      }
    };
    const auctionId = (v['Auction ID'] || '').replace(/\D+/g, '');
    fact('Sale price', (String(v['Sale Price'] || '').match(/^\s*[\d,]+\s*T/) || [v['Sale Price']])[0]);
    fact('Auction ID', auctionId);
    fact('Ends', v['Sale Ends']);
    fact('Seller', v['Seller']);
    $(facts).appendTo($(infoEl));
    $(infoEl).appendTo($(top));
    $(top).appendTo($(d));

    // fees: the extras only when something was charged for them
    let fees = $('<div class="revfacts listedfees"></div>');
    // amounts are "1,234T"; the page runs the item name on after the last one
    const money = s => (String(s || '').match(/^\s*[\d,]+\s*T/) || [String(s || '').trim()])[0].replace(/\s+/g, '');
    const charged = s => /[1-9]/.test(money(s));
    const feeRow = function(k, val, always) {
      if (val && (always || charged(val))) {
        $('<span class="k"></span>').text(k).appendTo($(fees));
        $('<span class="v"></span>').text(money(val)).appendTo($(fees));
      }
    };
    feeRow('Listing fee', v['Base Listing Fee'], true);
    feeRow('Front page', v['Front Page Featured Fee']);
    feeRow('Featured designer', v['Featured Designer Fee']);
    feeRow('Featured listing', v['Featured Listing Fee']);
    feeRow('Total fees', v['Total Listing Fees'], true);
    if (v['Prior Therebucks balance'] || v['Current Therebucks balance']) {
      feeRow('Balance', `${money(v['Prior Therebucks balance'])} → ${money(v['Current Therebucks balance'])}`, true);
    }
    if ($(fees).children().length) {
      $('<div class="revsection"></div>').text('Fees').appendTo($(d));
      $(fees).appendTo($(d));
    }
    const comments = v['Seller\'s comments about this item'];
    if (comments) {
      $('<div class="revsection"></div>').text('Your comments').appendTo($(d));
      $('<div class="iddesc"></div>').text(comments).appendTo($(d));
    }

    let btns = $('<div class="idbtns"></div>');
    // the page's own link to the auction, when it has one
    const link = auctionId ? Array.from(doc.querySelectorAll('a[href]')).find(a => (a.getAttribute('href') || '').includes(auctionId)) : null;
    if (link) {
      $('<div class="button"></div>').attr('data-primary', '1').text('View the auction').on('click', function() {
        There.openUrl(new URL(link.getAttribute('href'), 'https://webapps.prod.there.com/items/').href);
      }).appendTo($(btns));
    }
    $('<div class="button"></div>').text('List another').on('click', function() {
      There.playSound('control down');
      There.showListing({ list: info.pid, name: info.name, img: info.img });
    }).appendTo($(btns));
    $(btns).appendTo($(d));
    $(d).appendTo($(body));
  },

  // what the server answered: its error, its own confirm step, or done
  listOutcome: function(info, doc, sendNote) {
    if (!doc) {
      $(sendNote).attr('data-bad', '1').text('That didn\'t go through. Nothing was listed; try again.');
      return;
    }
    const err = There.listError(doc);
    const again = doc.querySelector('form[name="addItem"]');
    if (again) {
      $(sendNote).attr('data-bad', '1').text(err || 'There Central sent the form back. Check the details and try again.');
      return;
    }
    const content = doc.querySelector('#content') || doc.body;
    const next = content ? Array.from(content.querySelectorAll('form')).find(fm => !/search/i.test(fm.getAttribute('action') || '')) : null;
    // listed: show it as a receipt rather than the page's run-on text
    if (!next && /successfully listed/i.test(There.listText(content))) {
      There.data.devCache = {};
      There.renderListed(info, doc, There.listText(content));
      return;
    }
    const body = $('.devbody');
    $(body).empty();
    let d = $('<div class="itemdetail"></div>');
    $('<div class="idback"></div>').text('‹ Back to submissions').on('click', function() {
      There.playSound('control down');
      There.data.listing = null;
      There.loadDeveloper(true);
    }).appendTo($(d));
    $('<div class="idname"></div>').text(info.name).appendTo($(d));
    $('<div class="iddesc"></div>').text(There.listText(content) || 'Done.').appendTo($(d));
    if (next) {
      const action = (next.getAttribute('action') || '').replace(/^https?:\/\/[^/]+/, '');
      const allowed = /^\/items\/addquantity/.test(action);
      let btns = $('<div class="idbtns"></div>');
      let note = $('<span class="revnote"></span>');
      // the page's own button wording when it has some
      const submitEl = next.querySelector('input[type="submit"], input[type="image"], button');
      const own = submitEl ? (submitEl.getAttribute('value') || submitEl.getAttribute('alt') || submitEl.textContent || '').trim() : '';
      const label = own && !/^submit$/i.test(own) ? own : 'Continue';
      let go = $('<div class="button"></div>').attr('data-primary', '1').text(allowed ? label : 'Finish on There Central');
      $(go).on('click', function() {
        if (!allowed) {
          There.openUrl(`https://webapps.prod.there.com/items/addquantity?ProductId=${info.pid}`);
          return;
        }
        $(go).text('Sending…');
        There.playSound('menu item activate');
        // that page's own form, sent as is
        const q = new URLSearchParams();
        for (const el of next.querySelectorAll('input, textarea, select')) {
          const nm = el.getAttribute('name');
          if (!nm || el.disabled) {
            continue;
          }
          if ((el.type == 'checkbox' || el.type == 'radio') && !el.checked) {
            continue;
          }
          if (el.type == 'image') {
            q.append('x', '36');
            q.append('y', '7');
            continue;
          }
          q.append(nm, el.value || '');
        }
        if (!next.querySelector('input[name]') && !q.has('x')) {
          q.append('x', '36');
          q.append('y', '7');
        }
        const method = (next.getAttribute('method') || 'GET').toUpperCase();
        const path = action.replace(/^\//, '');
        There.listFetch(method == 'POST' ? path : `${path}${path.includes('?') ? '&' : '?'}${q.toString()}`,
          method == 'POST' ? q.toString() : null, function(doc2) {
            There.listOutcome(info, doc2, note);
          });
      });
      $(btns).append(go, note).appendTo($(d));
    } else {
      // nothing left to confirm: the list changed
      There.data.devCache = {};
    }
    $(d).appendTo($(body));
  },

  /* ------- Peer Review panel -------
   * The submission list, each item's page and the review form, read and sent
   * through FlashProxy with the game's own login (the same one stock There
   * Edge hands its browser), so no browser window opens. The pages are plain
   * HTML tables; everything here reads them the way they're laid out. */

  REVIEW_BASE: 'wsgi-scripts/review.py/',

  // a review page as text, or null. cb(html)
  reviewFetch: function(path, cb) {
    const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/tmui-webapps/${There.REVIEW_BASE}${path}`,
      dataType: 'text',
      timeout: 20000,
      success: function(html) {
        cb(html || '');
      },
      error: function() {
        cb(null);
      },
    });
  },

  reviewDoc: function(html) {
    return new DOMParser().parseFromString(html || '', 'text/html');
  },

  // "/catalog/media/1067192049.jpg" -> a picture url (the picture store when on)
  reviewImg: function(src) {
    const m = String(src || '').match(/\/catalog\/media\/([A-Za-z0-9._-]+)$/);
    return m ? CatalogImages.mediaUrl(m[1]) : null;
  },

  loadReviews: function(force) {
    const fresh = There.data.revAt && Date.now() - There.data.revAt < 120000;
    if (There.data.revList && fresh && !force) {
      There.renderReviews();
      return;
    }
    if (!There.data.revList) {
      $('.revbody').html('<div class="empty">Loading submissions…</div>');
    }
    $('.revcount').text('Checking for submissions…');
    There.reviewFetch('reviewables', function(html) {
      if (html === null) {
        $('.revcount').text('');
        if (!There.data.revList) {
          $('.revbody').html('<div class="empty">Peer Review didn\'t answer. Try Refresh in a moment.</div>');
        }
        return;
      }
      const doc = There.reviewDoc(html);
      if (!/Product Submission Review/.test(doc.title || '')) {
        $('.revcount').text('');
        $('.revbody').html('<div class="empty">Couldn\'t open Peer Review with your login. Try again once you\'re fully logged in.</div>');
        return;
      }
      const list = [];
      for (const t of doc.querySelectorAll('table.gry10')) {
        const item = {};
        for (const tr of t.querySelectorAll('tr')) {
          const td = tr.querySelector('td');
          const m = td && /^\s*(Name|Type|Desc|Date|ProductId|SubmitId):/.exec(td.textContent);
          if (m) {
            const b = td.querySelector('b');
            item[m[1].toLowerCase()] = b ? b.textContent.trim() : '';
          }
        }
        if (!item.productid || item.productid == '0') {
          continue;
        }
        const cell = t.closest('td');
        const img = cell && cell.previousElementSibling ? cell.previousElementSibling.querySelector('img') : null;
        item.img = img ? img.getAttribute('src') : '';
        item.test = /\btest/i.test(`${item.name} ${item.desc}`);
        list.push(item);
      }
      There.data.revList = list;
      There.data.revAt = Date.now();
      if (There.data.panel == 'reviews' && !There.data.revOpen) {
        There.renderReviews();
      }
      $('.revcount').text(`${list.length} submission${list.length == 1 ? '' : 's'} waiting for review`);
    });
  },

  REVIEW_RULES: [
    'Peer Reviewers MUST try the submission in-world.',
    'DO NOT make false approvals.',
    'DO NOT make false rejections.',
    'Keep personal opinions out of comments and stick to detailing submission violations.',
    'If an item receives three (3) or more negative reviews the Designer is REQUIRED to CANCEL the submission.',
    'Designers are NOT allowed to approve their own designs.',
    'Designers are NOT allowed to use Alt Avatars to bump approvals for their own designs.',
    'Peer Reviewers are NOT allowed to use Alt Avatars to influence output of approvals or rejections.',
    'NO teaming with other Peer Reviewers to falsely approve or reject items.',
    'NO harassing or bullying allowed in the Peer Review System.',
    'DO NOT approve TEST items. Test items must be cancelled after 14 days.',
  ],

  // the rules on top of the list. open, with "I've read the rules", until the
  // player confirms once this session; reviews can't be sent before that
  buildReviewRules: function() {
    const read = !!There.data.revRulesRead;
    let card = $('<div class="revrules"></div>').attr('data-open', read ? '0' : '1');
    let head = $('<div class="rrhead"></div>');
    $('<span class="rricon"></span>').html(tmuiIcon('circle-info')).appendTo($(head));
    $('<span class="rrtitle"></span>').text('Peer Review rules').appendTo($(head));
    $('<span class="rrstate"></span>').text(read ? 'Read \u00B7 show' : 'Please read before reviewing').appendTo($(head));
    $(head).on('click', function() {
      if (!There.data.revRulesRead) {
        return;
      }
      const open = $(card).attr('data-open') != '1';
      $(card).attr('data-open', open ? '1' : '0');
      $(card).find('.rrstate').text(open ? 'Read \u00B7 hide' : 'Read \u00B7 show');
      There.playSound('control down');
    });
    $(head).appendTo($(card));
    let body = $('<div class="rrbody"></div>');
    $('<p></p>').text('All Developers and Peer Reviewers must read and understand the Submission Guidelines and the Peer Review Guidelines. ' +
      'Breaking them can mean permanent removal from the Developer Program and suspension from There.com.').appendTo($(body));
    let ul = $('<ul></ul>');
    for (const rule of There.REVIEW_RULES) {
      $('<li></li>').text(rule).appendTo($(ul));
    }
    $(ul).appendTo($(body));
    $('<p></p>').text('Comments that include opinions or defamatory remarks, grief other players or break the Terms of Service are strictly forbidden. ' +
      'Staff may cancel any submission at any time; reviewing a cancelled submission can cost you points.').appendTo($(body));
    let links = $('<div class="rrlinks"></div>');
    for (const [label, url] of [
      ['Submission Guidelines', 'https://webapps.prod.there.com/developers/developer_help_sg.xml'],
      ['Peer Review Guidelines', 'https://webapps.prod.there.com/help/kb2002.xml'],
      ['Peer Reviewer FAQs', 'https://webapps.prod.there.com/help/PeerReview_FAQs.html'],
      ['Suggested comments', 'https://webapps.prod.there.com/help/PeerReviewComments.pdf'],
    ]) {
      $('<span></span>').text(label).on('click', function() {
        There.openUrl(url);
      }).appendTo($(links));
    }
    $(links).appendTo($(body));
    if (!read) {
      $('<div class="rrok"></div>').text('I\'ve read the rules').on('click', function() {
        There.data.revRulesRead = true;
        There.playSound('menu item activate');
        $(card).replaceWith(There.buildReviewRules());
      }).appendTo($(body));
    }
    $(body).appendTo($(card));
    return card;
  },

  renderReviews: function() {
    There.data.revOpen = null;
    const body = $('.revbody');
    $(body).empty();
    There.buildReviewRules().appendTo($(body));
    const list = There.data.revList || [];
    const q = ($('.revsearch input').val() || '').trim().toLowerCase();
    const shown = q ? list.filter(i => `${i.name} ${i.type} ${i.desc}`.toLowerCase().includes(q)) : list;
    for (const item of shown) {
      let card = $('<div class="shopcard"></div>').attr('title', item.desc || item.name)
        .attr('data-test', item.test ? '1' : '0');
      let im = $('<div class="scimg"></div>');
      const src = There.reviewImg(item.img);
      if (src) {
        $('<img>').attr('loading', 'lazy').attr('decoding', 'async').attr('src', src)
          .one('error', function() {
            const direct = CatalogImages.fallbackUrl(this.src);
            if (direct) {
              this.src = direct;
            }
          }).appendTo($(im));
      }
      $(im).appendTo($(card));
      let foot = $('<div class="scfoot"></div>');
      $('<div class="scname"></div>').text(item.name || `Product ${item.productid}`).appendTo($(foot));
      $('<div class="scprice"></div>').text(item.type || '').appendTo($(foot));
      $(foot).appendTo($(card));
      $(card).on('click', function() {
        There.playSound('control down');
        There.showReview(item);
      });
      $(card).appendTo($(body));
    }
    if (!shown.length) {
      $(body).append(`<div class="empty">${list.length ? 'No submissions match.' : 'Nothing waiting for review right now.'}</div>`);
    }
  },

  // the item page: the facts, a review copy, the form, the reviews so far
  showReview: function(item) {
    There.data.revOpen = item.productid;
    const body = $('.revbody');
    $(body).html('<div class="empty">Loading…</div>');
    There.reviewFetch(`review?pid=${encodeURIComponent(item.productid)}`, function(html) {
      if (There.data.revOpen != item.productid || There.data.panel != 'reviews') {
        return;
      }
      if (html === null) {
        $(body).html('<div class="empty">That submission didn\'t load. Try again in a moment.</div>');
        return;
      }
      There.renderReview(item, There.reviewDoc(html));
    });
  },

  // "Label:" -> value cells from a page's two-column tables
  reviewPairs: function(doc) {
    const pairs = {};
    for (const tr of doc.querySelectorAll('tr')) {
      const tds = tr.querySelectorAll(':scope > td');
      if (tds.length == 2) {
        const k = tds[0].textContent.trim().replace(/:$/, '');
        if (k && !(k in pairs)) {
          pairs[k] = tds[1];
        }
      }
    }
    return pairs;
  },

  renderReview: function(item, doc) {
    const body = $('.revbody');
    $(body).empty();
    const pairs = There.reviewPairs(doc);
    const val = k => (pairs[k] ? pairs[k].textContent.replace(/\s+/g, ' ').trim() : '');
    let d = $('<div class="itemdetail"></div>');
    $('<div class="idback"></div>').text('‹ Back').on('click', function() {
      There.playSound('control down');
      There.renderReviews();
    }).appendTo($(d));

    let top = $('<div class="idtop"></div>');
    let im = $('<div class="idimg"></div>');
    const pic = doc.querySelector('img[src*="/catalog/media/"]');
    const src = There.reviewImg(pic ? pic.getAttribute('src') : item.img);
    if (src) {
      $('<img>').attr('src', src).appendTo($(im));
    }
    $(im).appendTo($(top));
    let info = $('<div class="idinfo"></div>');
    $('<div class="idname"></div>').text(val('Name') || item.name).appendTo($(info));
    let facts = $('<div class="revfacts"></div>');
    const fact = function(k, v) {
      if (v) {
        $('<span class="k"></span>').text(k).appendTo($(facts));
        $(facts).append($('<span class="v"></span>').append(v));
      }
    };
    const designer = pairs['Designer'] ? pairs['Designer'].querySelector('a') : null;
    if (designer) {
      fact('Designer', $('<a></a>').text(designer.textContent.trim()).on('click', function() {
        There.openUrl('https://webapps.prod.there.com' + designer.getAttribute('href'));
      }));
    }
    fact('Type', val('Product Type') || item.type);
    fact('Status', val('Product Status'));
    fact('Submitted', val('Submitted on') || item.date);
    fact('Product ID', item.productid);
    $(facts).appendTo($(info));
    $(info).appendTo($(top));
    $(top).appendTo($(d));
    const desc = val('Description') || item.desc;
    if (desc) {
      $('<div class="iddesc"></div>').text(desc).appendTo($(d));
    }
    const note = val('Designer Comment');
    if (note) {
      $('<div class="iddesc"></div>').text(`Designer's note: ${note}`).appendTo($(d));
    }

    // a review copy lands in your inventory, to try in-world first
    let btns = $('<div class="idbtns"></div>');
    let copy = $('<div class="button"></div>').attr('data-primary', '1').text('Get a review copy');
    let copyNote = $('<span class="revnote"></span>');
    $(copy).on('click', function() {
      if ($(copy).attr('data-busy') == '1') {
        return;
      }
      $(copy).attr('data-busy', '1');
      There.playSound('menu item activate');
      $(copyNote).attr('data-bad', '0').text('Asking for a copy…');
      There.reviewFetch(`getReviewCopy?pid=${encodeURIComponent(item.productid)}`, function(html) {
        $(copy).attr('data-busy', '0');
        if (html === null) {
          $(copyNote).attr('data-bad', '1').text('The request didn\'t go through. Try again.');
          return;
        }
        const msg = There.reviewMessage(There.reviewDoc(html));
        $(copyNote).attr('data-bad', '0').text(msg || 'Requested. Look for it in your inventory.');
      });
    });
    $(btns).append(copy, copyNote);
    $(btns).appendTo($(d));

    There.buildReviewForm(item, doc).appendTo($(d));

    // what other reviewers said
    const score = [['IP Rejections', 'IP'], ['ToS Rejections', 'ToS'], ['DG Rejections', 'DG'],
      ['Other Rejections', 'Other'], ['Comment-only Reviews', 'Comments'],
      ['Total Rejection Points', 'Rejection points'], ['Total Approval Points', 'Approval points'],
      ['Current Approval Score', 'Score']];
    let sc = $('<div class="revscore"></div>');
    for (const [k, label] of score) {
      if (pairs[k]) {
        $('<span></span>').append(document.createTextNode(`${label} `), $('<b></b>').text(val(k))).appendTo($(sc));
      }
    }
    if ($(sc).children().length) {
      $('<div class="revsection"></div>').text('Reviews so far').appendTo($(d));
      $(sc).appendTo($(d));
    }
    let list = $('<div class="revreviews"></div>');
    for (const tr of doc.querySelectorAll('tr')) {
      const tds = tr.querySelectorAll(':scope > td');
      const who = tds.length == 8 ? tds[0].querySelector('a') : null;
      if (!who) {
        continue;
      }
      const marks = [1, 2, 3, 4].map(i => tds[i + 1].textContent.trim()).filter(x => x && x != '-');
      const commentOnly = tds[6].textContent.trim();
      let rv = $('<div class="rv"></div>');
      let head = $('<div class="rvhead"></div>');
      $('<span class="who"></span>').text(who.textContent.trim()).on('click', function() {
        There.openUrl('https://webapps.prod.there.com' + who.getAttribute('href'));
      }).appendTo($(head));
      $('<span class="rvweight"></span>').text(`weight ${tds[1].textContent.trim()}`).appendTo($(head));
      let tag = $('<span class="rvtag"></span>');
      if (marks.length) {
        $(tag).attr('data-reject', '1').text('Rejected');
      } else if (commentOnly && commentOnly != '-') {
        $(tag).attr('data-comment', '1').text('Comment');
      } else {
        $(tag).text('Approved');
      }
      $(tag).appendTo($(head));
      $(head).appendTo($(rv));
      $('<div class="rvtext"></div>').text(tds[7].textContent.trim()).appendTo($(rv));
      $(rv).appendTo($(list));
    }
    if ($(list).children().length) {
      $(list).appendTo($(d));
    }
    $(d).appendTo($(body));
  },

  // a page's own notice, if it has one (errors and confirmations show in red)
  reviewMessage: function(doc) {
    for (const el of doc.querySelectorAll('.red14Bld, .red12Bld')) {
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t) {
        return t;
      }
    }
    return '';
  },

  // the page's form, rebuilt: same boxes, same mandatory comment, sent the
  // same way the page sends it
  buildReviewForm: function(item, doc) {
    const form = doc.querySelector('form[name="reviewForm"]');
    let wrap = $('<div></div>');
    $('<div class="revsection"></div>').text('Your review').appendTo($(wrap));
    let f = $('<div class="revform"></div>');
    if (!form) {
      $('<div class="revverdict"></div>').text('This submission isn\'t taking reviews right now.').appendTo($(f));
      return $(wrap).append(f);
    }
    const boxes = [
      ['rejectIP', 'Violates Intellectual Property rights', 'reject'],
      ['rejectTOS', 'Violates the There.com Terms of Service', 'reject'],
      ['rejectDGL', 'Violates the Developer Guidelines', 'reject'],
      ['rejectOTHER', 'Has other significant problems (see my comment)', 'reject'],
      ['rejectCOMMENT', 'Just a comment, not a vote either way', 'comment'],
    ];
    const state = {};
    let verdict = $('<div class="revverdict"></div>');
    // the rules the page states, held to here
    const designerEl = doc.querySelector('a[href*="AvatarDoid"]');
    const designer = designerEl ? designerEl.textContent.trim().toLowerCase() : '';
    const me = String(There.variables.there_pilotname || '').toLowerCase();
    const mine = !!designer && designer == me;
    const isTest = !!item.test;
    let blocked = '';
    const refresh = function() {
      const rejects = boxes.filter(b => b[2] == 'reject' && state[b[0]]).length;
      const approving = !rejects && !state.rejectCOMMENT;
      blocked = '';
      if (!There.data.revRulesRead) {
        blocked = 'Read the Peer Review rules on the list page before reviewing.';
      } else if (approving && mine) {
        blocked = 'Designers are not allowed to approve their own designs.';
      } else if (approving && isTest) {
        blocked = 'This looks like a test item. Test items must not be approved.';
      }
      if (blocked) {
        $(verdict).attr('data-blocked', '1').html('<b>Can\'t send:</b> ').append(document.createTextNode(blocked));
      } else if (rejects) {
        $(verdict).attr('data-blocked', '0').html('This review is a <b>rejection</b>.');
      } else if (state.rejectCOMMENT) {
        $(verdict).attr('data-blocked', '0').html('This review is a <b>comment only</b>, not a vote.');
      } else {
        $(verdict).attr('data-blocked', '0').html('No boxes ticked: this review <b>approves</b> the submission.');
      }
      if (typeof send != 'undefined') {
        $(send).attr('data-off', blocked ? '1' : '0');
      }
    };
    for (const [name, label, kind] of boxes) {
      // only the boxes the page really has
      if (!form.querySelector(`input[name="${name}"]`)) {
        continue;
      }
      let row = $('<div class="revcheck"></div>').attr('data-kind', kind).attr('data-on', '0');
      $('<span class="box"></span>').appendTo($(row));
      $('<span></span>').text(label).appendTo($(row));
      $(row).on('click', function() {
        state[name] = !state[name];
        $(row).attr('data-on', state[name] ? '1' : '0');
        There.playSound('control down');
        refresh();
      });
      $(row).appendTo($(f));
    }
    let text = $('<textarea maxlength="250" placeholder="Review comment (required)"></textarea>');
    $(text).on('click', function() {
      if (!$(this).is(':focus')) {
        There.fsCommand('getKeyboardFocus');
        $(this).focus();
      }
    }).on('keydown', function(event) {
      event.stopPropagation();
    }).on('mousedown', function(event) {
      event.stopPropagation();
    });
    $(text).appendTo($(f));
    refresh();
    $(verdict).appendTo($(f));
    var send = $('<div class="button revsend"></div>').attr('data-primary', '1').text('Submit review');
    let sendNote = $('<span class="revnote"></span>');
    let armed = false;
    refresh();
    $(send).on('click', function() {
      if (blocked) {
        return;
      }
      const comment = ($(text).val() || '').trim();
      if (!comment) {
        $(sendNote).attr('data-bad', '1').text('A comment is required.');
        $(text).focus();
        return;
      }
      // a review counts: second click sends
      if (!armed) {
        armed = true;
        $(send).text('Click again to send');
        There.setNamedTimer('rev-arm', 4000, function() {
          armed = false;
          $(send).text('Submit review');
        });
        return;
      }
      armed = false;
      There.clearNamedTimer('rev-arm');
      $(send).text('Sending…');
      There.playSound('menu item activate');
      // the fields in the page form's order, as its image button submits them
      const q = [];
      for (const el of form.querySelectorAll('input')) {
        const name = el.getAttribute('name');
        if (el.type == 'hidden' && name) {
          q.push(`${encodeURIComponent(name)}=${encodeURIComponent(el.value)}`);
        } else if (el.type == 'checkbox' && name && state[name]) {
          q.push(`${encodeURIComponent(name)}=${encodeURIComponent(el.value || 'yes')}`);
        } else if (el.type == 'text' && name == 'comment') {
          q.push(`comment=${encodeURIComponent(comment)}`);
        }
      }
      q.push('x=1', 'y=1');
      const action = (form.getAttribute('action') || '').split('/').pop() || 'myReview';
      There.reviewFetch(`${action}?${q.join('&')}`, function(html) {
        $(send).text('Submit review');
        if (html === null) {
          $(sendNote).attr('data-bad', '1').text('The review didn\'t go through. Try again.');
          return;
        }
        const msg = There.reviewMessage(There.reviewDoc(html));
        $(sendNote).attr('data-bad', '0').text(msg || 'Review sent. Thank you!');
        // show it among the others
        There.setNamedTimer('rev-reload', 1200, function() {
          if (There.data.revOpen == item.productid) {
            There.showReview(item);
          }
        });
      });
    });
    $('<div class="idbtns"></div>').append(send, sendNote).appendTo($(f));
    return $(wrap).append(f);
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
                There.showProfile(doid, m[1]);
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

  // someone's auctions (from their profile), drawn like a search
  showSellerAuctions: function(doid, name) {
    There.data.auSeller = { doid: String(doid), name: name || '' };
    if (There.data.panel == 'auctions') {
      There.loadSellerAuctions();
    } else {
      There.togglePanel('auctions');
    }
  },

  loadSellerAuctions: function() {
    const who = There.data.auSeller;
    There.data.auSeller = null;
    if (!who) {
      There.loadAuctionsHome();
      return;
    }
    There.data.auBack = function() {
      There.data.auSeller = who;
      There.loadSellerAuctions();
    };
    const crumbs = $('.aucrumbs');
    $(crumbs).empty();
    $('<span class="crumb"></span>').text('All').on('click', function() {
      There.playSound('control down');
      There.loadAuctionsHome();
    }).appendTo($(crumbs));
    $('<span></span>').text('\u203A').appendTo($(crumbs));
    $('<span class="crumb" data-here="1"></span>').text(who.name ? `${who.name}'s auctions` : 'Their auctions').appendTo($(crumbs));
    $('.aubody').html('<div class="empty">Loading\u2026</div>');
    let q = `items/sellersearch?Seller=${encodeURIComponent(who.doid)}&PageSize=60&Page=1`;
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
        $(body).html(`<div class="empty">${xml ? 'No auctions running right now.' : 'Auctions did not answer. Try again in a moment.'}</div>`);
      }
      There.applyGridScale();
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
    return There.resUrl(assetName);
  },

  // a file under the client's Resources folder: served by WebView2 itself
  // when the DLL maps the folder (no trip through the game), else by the
  // game's own server
  resUrl: function(rel) {
    rel = String(rel || '').replace(/^\/+/, '');
    if (There.data.vhost) {
      return `https://tmui.res/resources/${rel}`;
    }
    const host = There.data.host || There.variables.there_resourceshost;
    return host ? `http://${host}/resources/${rel}` : null;
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

  // a card's photo. a real lazy img, not a background: the browser then
  // fetches and decodes only what scrolls into view, off the render path,
  // instead of bursting on every chunk (the wardrobe ALL scroll hitches)
  // a background picture that falls back to There when the store hasn't got
  // it (and asks the store to fetch it for next time)
  bgPhoto: function(el, url, still) {
    const apply = function(u) {
      if (!still || still()) {
        $(el).css('background-image', `url("${u}")`).text('');
      }
    };
    const direct = CatalogImages.fallbackUrl(url);
    if (!direct) {
      apply(url);
      return;
    }
    const probe = new Image();
    probe.onload = function() {
      apply(url);
    };
    probe.onerror = function() {
      CatalogImages.wantStore(url);
      apply(direct);
    };
    probe.src = url;
  },

  setCardPhoto: function(thumbEl, url) {
    const img = $('<img class="thumbimg" alt="">')
      .attr('loading', 'lazy').attr('decoding', 'async').attr('src', url);
    // the picture store couldn't get it: straight from There instead
    $(img).one('error', function() {
      const direct = CatalogImages.fallbackUrl(this.src);
      if (direct) {
        CatalogImages.wantStore(this.src);
        this.src = direct;
      }
    });
    $(thumbEl).empty().append(img);
  },

  // a photo the sweep just found: into any card on screen showing that item,
  // no redraw (the grid keeps its place)
  livePhoto: function(attr, id, url) {
    if (!url || !id) {
      return;
    }
    $(`.grid .card[data-${attr}="${String(id).replace(/"/g, '')}"] .thumb`).each(function() {
      There.setCardPhoto(this, url);
    });
  },

  // build one card (jQuery): thumb, interactions, drag. split out so renderCards
  // can build in chunks
  buildCard: function(item) {
    const host = There.data.host || There.variables.there_resourceshost;
    let card = $('<div class="card"></div>');
    if (item.poid) {
      $(card).attr('data-poid', String(item.poid));
    }
    if (item.doid) {
      $(card).attr('data-doid', String(item.doid));
    }
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
        There.setCardPhoto(thumbEl, url);
      };
      const localIcon = (it.icon && /\.(png|jpg|jpeg|gif)$/i.test(it.icon))
        ? There.resUrl(it.icon) : null;
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
            ? There.resUrl(it.icon) : null;
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
            item.actedVerb = pick;
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
      ? There.resUrl(item.icon) : null;
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
        There.bgPhoto($('.actionbar .abthumb'), url, function() {
          return There.data.menuItem === item;
        });
      }
    });
    if (immediate) {
      There.bgPhoto(thumb, immediate);
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
            item.actedVerb = a.label;
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
    // no picture yet: look this one up on its own
    if (There.itemLacksPhoto(item)) {
      let fix = $('<div class="abbtn abfix"></div>').text('Fix photo').on('click', function(ev) {
        ev.stopPropagation();
        There.playSound('control down');
        $(fix).remove();
        There.fixItemPhoto(card, item);
      });
      $(fix).appendTo($(acts));
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
          const items = There.keepUsedItems(table.concat(builder)).sort((a, b) => a.name.localeCompare(b.name));
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

  // an item you just took out (or put back) can drop off the table, or come
  // back on it with no actions, while the game catches up. one used in the
  // last ten minutes keeps its place in the grid, with the table's status if
  // it has one. given or traded away, it goes. the status line says what was
  // kept and why
  DEPART_VERBS: /^(give|trade|auction|return|sell|drop|delete|discard)/i,

  keepUsedItems: function(items) {
    const have = {};
    for (const it of items) {
      have[it.doid] = true;
    }
    const kept = [];
    for (const old of (There.data.inventory || [])) {
      if (have[old.doid] || !old.actedAt || Date.now() - old.actedAt > 10 * 60 * 1000 || There.DEPART_VERBS.test(old.actedVerb || '')) {
        continue;
      }
      const row = (There.data.invSkipped || {})[old.doid];
      if (row) {
        old.status = row.status;
      }
      items.push(old);
      kept.push(`${old.name} (${row ? 'status "' + row.status + '", no actions' : 'off the table'})`);
    }
    There.data.invNote = kept.length ? `kept ${kept.join(', ')}` : null;
    return items;
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

  // clothing with no photo yet
  poidNeedsPhoto: function(poid) {
    return !CatalogImages.poids[poid];
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

  // the update strip: up while a newer release is out, with its version
  renderUpdateBar: function() {
    // a reinstall from Settings shows the strip for the release that's out
    const up = typeof TmuiUpdate != 'undefined' && (TmuiUpdate.available || (There.data.updForce && TmuiUpdate.latest));
    $('.updatebar').attr('data-active', up ? '1' : '0');
    $('.updatebar .ubver').text(up ? TmuiUpdate.latest : '');
    // with the DLL's updater the button does the whole job; otherwise it
    // hands the setup (or the release page) to the browser
    const btn = $('.updatebar .ubget');
    if (There.data.updater) {
      btn.text('Install it now').attr('title', 'Download the new setup and run it');
    } else {
      btn.text('Download it now').attr('title', up && TmuiUpdate.download ? 'Download the new setup' : 'Open the release page');
    }
    There.renderUpdateNote();
  },

  // What's new: the release's notes in a dock panel. They come with the
  // update check; an older cached answer without them asks GitHub again
  showReleaseNotes: function(version) {
    if (typeof TmuiUpdate == 'undefined') {
      return;
    }
    There.playSound('menu item activate');
    if (There.data.panel != 'release') {
      There.togglePanel('release');
    }
    const cached = TmuiUpdate.load();
    // a particular version (About's number): its own release, unless it's
    // the one the update check already knows
    const tag = version ? `v${String(version).replace(/^v/i, '')}` : '';
    if (tag && tag != `v${String(cached.latest || '').replace(/^v/i, '')}`) {
      const had = There.data.relNotes && There.data.relNotes[tag];
      if (had) {
        There.renderReleaseNotes(true, had);
        return;
      }
      $('.relbody').empty().append($('<div class="relempty"></div>').text('Loading the release notes\u2026'));
      fetch(`https://api.github.com/repos/${TmuiUpdate.repo}/releases/tags/${tag}`, {
        headers: { Accept: 'application/vnd.github+json' },
      }).then(r => r.ok ? r.json() : null).then(function(rel) {
        if (There.data.panel != 'release') {
          return;
        }
        if (!rel) {
          There.renderReleaseNotes(false, { latest: tag });
          return;
        }
        const d = { latest: rel.tag_name, name: rel.name || '', published: rel.published_at || '', notes: String(rel.body || '').slice(0, 60000), mine: true };
        There.data.relNotes = There.data.relNotes || {};
        There.data.relNotes[tag] = d;
        There.renderReleaseNotes(true, d);
      }).catch(function() {
        There.renderReleaseNotes(false, { latest: tag });
      });
      return;
    }
    if (cached.notes == undefined) {
      $('.relbody').empty().append($('<div class="relempty"></div>').text('Loading the release notes\u2026'));
      const was = TmuiUpdate.onChecked;
      TmuiUpdate.onChecked = function(ok) {
        TmuiUpdate.onChecked = was;
        if (typeof was == 'function') {
          was(ok);
        }
        There.renderReleaseNotes(ok);
      };
      TmuiUpdate.check(true);
      return;
    }
    There.renderReleaseNotes(true);
  },

  renderReleaseNotes: function(ok, given) {
    const d = given || TmuiUpdate.load();
    const body = $('.relbody').empty();
    const head = $('<div class="relhead"></div>').appendTo(body);
    $('<span class="relname"></span>').text(d.name || `ThereModernUI ${d.latest || ''}`).appendTo(head);
    if (d.published) {
      const t = new Date(d.published);
      if (!isNaN(t)) {
        $('<span class="reldate"></span>').text(t.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })).appendTo(head);
      }
    }
    if (!d.mine && (TmuiUpdate.available || There.data.updForce)) {
      $('<div class="button relget" data-primary="1"></div>').text(There.data.updater ? 'Install it now' : 'Download it now').on('click', There.startUpdate).appendTo(head);
    }
    if (!d.notes) {
      $('<div class="relempty"></div>').text(ok === false ? 'GitHub did not answer. Try again in a moment.' : 'This release has no notes.').appendTo(body);
      return;
    }
    body.append(There.markdownHtml(d.notes));
    body.find('.rellink').on('click', function() {
      const href = $(this).attr('data-href') || '';
      if (/^https:\/\//i.test(href)) {
        There.playSound('menu item activate');
        There.fsCommand('browser', href);
      }
    });
    body.scrollTop(0);
  },

  // the bits of markdown release notes use: headings, lists, bold, italics,
  // inline code, code blocks, rules and links. everything is escaped first
  markdownHtml: function(md) {
    const esc = function(t) {
      return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
    const inline = function(t) {
      let h = esc(t);
      const codes = [];
      h = h.replace(/`([^`]+)`/g, function(m, c) {
        codes.push(c);
        return `\u0000${codes.length - 1}\u0000`;
      });
      h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<span class="rellink" data-href="$2">$1</span>');
      h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
      h = h.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>');
      h = h.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codes[Number(i)]}</code>`);
      return h;
    };
    const lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let para = [];
    let list = false;
    let code = null;
    const flush = function() {
      if (para.length) {
        out.push(`<p>${inline(para.join(' '))}</p>`);
        para = [];
      }
      if (list) {
        out.push('</ul>');
        list = false;
      }
    };
    for (const line of lines) {
      if (code) {
        if (/^\s*```/.test(line)) {
          out.push(`<pre>${esc(code.join('\n'))}</pre>`);
          code = null;
        } else {
          code.push(line);
        }
        continue;
      }
      if (/^\s*```/.test(line)) {
        flush();
        code = [];
        continue;
      }
      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        flush();
        out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
        continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
        flush();
        out.push('<hr>');
        continue;
      }
      const li = line.match(/^\s*[-*]\s+(.*)$/);
      if (li) {
        if (para.length) {
          out.push(`<p>${inline(para.join(' '))}</p>`);
          para = [];
        }
        if (!list) {
          out.push('<ul>');
          list = true;
        }
        out.push(`<li>${inline(li[1])}</li>`);
        continue;
      }
      if (!line.trim()) {
        flush();
        continue;
      }
      if (list) {
        flush();
      }
      para.push(line.trim());
    }
    if (code) {
      out.push(`<pre>${esc(code.join('\n'))}</pre>`);
    }
    flush();
    return out.join('');
  },

  // Settings > Updates: what's installed, what's out, when we last asked
  renderUpdateNote: function(ok) {
    if (typeof TmuiUpdate == 'undefined') {
      return;
    }
    const at = TmuiUpdate.load().at;
    let when = 'not checked yet';
    if (at) {
      const t = new Date(at);
      when = `checked ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`;
    }
    if (ok === false) {
      when = 'GitHub did not answer';
    }
    const latest = TmuiUpdate.latest ? `latest ${/^v/i.test(TmuiUpdate.latest) ? '' : 'v'}${TmuiUpdate.latest}` : 'latest unknown';
    $('.updnote').text(`Installed v${TmuiUpdate.version} \u00b7 ${latest} \u00b7 ${when}`);
  },

  UPDATE_STEPS: {
    check: 'Finding the new setup\u2026',
    run: 'Setup is opening, carry on from there',
    done: 'Setup is opening, carry on from there',
  },

  // the button: the DLL fetches and runs the setup, telling us how far it
  // is (tmui_update); without it the browser gets the download
  startUpdate: function() {
    if (!There.data.updater) {
      TmuiUpdate.openDownload();
      return;
    }
    There.playSound('menu item activate');
    There.onUpdateProgress('check');
    There.fsCommand('tmuiUpdate');
  },

  onUpdateProgress: function(value) {
    const v = String(value || '');
    let text = '';
    const m = v.match(/^dl:(\d+)$/);
    There.clearNamedTimer('update-idle');
    if (m) {
      text = `Downloading ${m[1]}%`;
    } else if (/^err:/.test(v)) {
      // the DLL could not (the code says where, TmuiUpdates\update.log has
      // the steps): say so and leave Try again on the strip
      There.renderUpdateBar();
      $('.updatebar').attr('data-active', '1').attr('data-busy', '').attr('data-failed', '1');
      $('.updatebar .ubstep').text('');
      $('.updatebar .ubfail').text(`Install failed (${v.slice(4)})`);
      $('.updatebar .ubget').text('Try again');
      $('.updnote').text(`Install failed (${v.slice(4)})`);
      return;
    } else {
      text = There.UPDATE_STEPS[v] || '';
      if (text) {
        // setup is up (or was cancelled): back to the plain strip after a while
        There.setNamedTimer('update-idle', 30000, function() {
          There.onUpdateProgress('');
        });
      }
    }
    // the strip carries the progress even with no newer release out (a
    // reinstall from Settings), and settles back to its usual state after
    if (text) {
      $('.updatebar').attr('data-active', '1');
      $('.updnote').text(text);
    } else {
      There.renderUpdateBar();
    }
    $('.updatebar').attr('data-busy', text ? '1' : '').attr('data-failed', '');
    $('.updatebar .ubstep').text(text);
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
    const spd = (There.data.speedoNote ? ` · speedo: ${There.data.speedoNote}` : '') + (There.data.vehNote ? ` · vehicle: ${There.data.vehNote}` : '') + (There.data.gpsNote ? ` · gps: ${There.data.gpsNote}` : '') + (There.data.invNote ? ` · inventory: ${There.data.invNote}` : '');
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
    // so do the Places tabs other than Bookmarks
    if (There.data.panel == 'places' && (There.data.placesTab || 'explore') != 'list') {
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
      // how many requests the game is asked at once (the request queue)
      prefs.fetchLanes = [1, 2, 3, 4].includes(Number(raw.fetchLanes)) ? Number(raw.fetchLanes) : 2;
      // GPS zoom step (0 = the island's own scale) and flat or tilted view
      prefs.gpsZoom = Math.max(-3, Math.min(4, Math.round(Number(raw.gpsZoom) || 0)));
      prefs.gpsFlat = raw.gpsFlat === true;
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
    // the request queue's width
    const lanes = $('.perflanes');
    $(lanes).empty();
    for (const n of [1, 2, 3, 4]) {
      $('<span class="lchip"></span>').text(n == 1 ? '1 (smoothest)' : n == 4 ? '4 (fastest)' : String(n))
        .attr('data-on', There.fetchLanes() == n ? '1' : '0').on('click', function() {
          There.playSound('control down');
          There.prefs().fetchLanes = n;
          There.savePrefs();
          $(lanes).children().attr('data-on', '0');
          $(this).attr('data-on', '1');
          There.pumpFetchQueue();
        }).appendTo($(lanes));
    }
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
      missing = (There.data.accoutrements || []).filter(a => There.poidNeedsPhoto(a.poid)).length;
    }
    if (There.data.sweep) {
      $('<span class="footphotos"></span>')
        .text(' · fixing photos · ')
        .append($('<a class="footstop"></a>').text('Stop'))
        .appendTo($('.footcount'));
    } else if (missing) {
      let fp = $('<span class="footphotos"></span>')
        .text(` · ${missing} without photos · `)
        .append($('<a class="footcache"></a>').text('Fix them'));
      if (There.data.photoResult) {
        // what the last sync got back for one of them: hover to read, click
        // to show it in the sync bar
        $(fp).append(document.createTextNode(' · '), $('<a class="footdetail"></a>').text('Details').attr('title', There.data.photoResult));
      }
      $(fp).appendTo($('.footcount'));
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
    const skipped = {};
    There.data.invSkipped = skipped;
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
        if (!name || !doid || !/^\d+$/.test(doid)) {
          return;
        }
        // rows with no interactions show up as blank "In gear" cards you can't
        // do anything with: skipped, but noted so an item that was just used
        // can keep its place with the table's status
        if (!interactions) {
          skipped[doid] = { name: name, status: $(cells[5]).text().trim() };
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
    const current = There.data.placesTab || 'explore';
    $('.dockroot').attr('data-placestab', current);
    let tabs = $('.tabs');
    $(tabs).empty();
    for (const [id, name] of [['explore', 'Explore'], ['search', 'Search'], ['list', 'Bookmarks'], ['map', 'Map']]) {
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
        $('.panelsearch input').val('');
        There.data.search = '';
        There.showPlacesTab();
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
    There.hideMapCard();
    There.data.mapView = view == 'global' ? 'main' : view;
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
      $('<div class="mapspot"></div>').attr('title', spot.name).css({
        left: spot.px / TmuiMaps.WIDTH * 100 + '%',
        top: spot.py / TmuiMaps.HEIGHT * 100 + '%',
      }).on('click', function(event) {
        event.stopPropagation();
        There.playSound('control down');
        There.showMapCard(spot, this);
      }).on('mousedown', function(event) {
        event.stopPropagation();
      }).appendTo($(host));
    }
  },

  // a place's card beside its dot: the name and a way into its map
  showMapCard: function(spot, dot) {
    $('.mapspot').attr('data-on', '');
    $(dot).attr('data-on', '1');
    let card = $('.mapframe .mapcard');
    if (!card.length) {
      card = $('<div class="mapcard"></div>').on('mousedown click', function(event) {
        event.stopPropagation();
      }).appendTo($('.mapframe'));
    }
    card.empty();
    $('<div class="mapcardname"></div>').text(spot.name).appendTo(card);
    $('<div class="button mapcardgo"></div>').text('Open map').on('click', function() {
      There.playSound('menu item activate');
      There.hideMapCard();
      There.setMapView(spot.id);
    }).appendTo(card);
    There.data.mapCardDot = dot;
    card.attr('data-on', '1');
    There.placeMapCard();
  },

  hideMapCard: function() {
    $('.mapframe .mapcard').attr('data-on', '');
    $('.mapspot').attr('data-on', '');
    There.data.mapCardDot = null;
  },

  // keep the card by its dot as the map zooms and pans, inside the frame
  placeMapCard: function() {
    const dot = There.data.mapCardDot;
    const card = $('.mapframe .mapcard');
    const frame = $('.mapframe')[0];
    if (!dot || !card.length || !frame || !document.body.contains(dot)) {
      return;
    }
    const F = frame.getBoundingClientRect();
    const D = dot.getBoundingClientRect();
    const cw = card.outerWidth();
    const ch = card.outerHeight();
    let x = D.left - F.left + D.width / 2 - cw / 2;
    let y = D.top - F.top - ch - 8;
    if (y < 6) {
      y = D.bottom - F.top + 8;
    }
    x = Math.max(6, Math.min(F.width - cw - 6, x));
    card.css({ left: `${x}px`, top: `${y}px` });
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
    // while zooming or dragging the stage is one layer (cheap to move); once
    // it settles it's drawn again at the new size, so the vector maps are
    // sharp at any zoom instead of an enlarged picture of the last one
    $('.mapstage').attr('data-moving', '1').css('transform', `translate(${There.data.mapPanX}px, ${There.data.mapPanY}px) scale(${z})`);
    $('.mapframe').css('--mapz', z);
    There.setNamedTimer('map-sharp', 220, function() {
      $('.mapstage').attr('data-moving', '');
    });
    There.placeMapCard();
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
      if ((There.data.placesTab || 'explore') == 'list') {
        There.renderCards(There.itemsAtCurrentLevel());
      }
    }
  },
});

/* ------- the game request queue -------
 * Everything the dock asks the game itself (/ScriptHook and friends) is
 * answered on the game's own thread, so a burst of them is a stall. They
 * line up here and go a few at a time, with a breath between dispatches.
 * Position reads for the speedometer and the map skip the line so the
 * needle stays smooth. When the line backs up, the bar above the dock says
 * so. The width of the line is a Settings choice. */
There.FETCH_GAP_MS = 12;
There.fetchQueue = {
  waiting: [],
  active: 0,
  lastStart: 0,
  since: 0,
  noted: false,
};

There.private.stockFetch = There.fetch;

There.fetch = function(settings) {
  const path = String(settings.path || '');
  const target = String((settings.query && settings.query.Path) || '');
  // the game's own pages and the bridge pages don't go through the game's
  // thread, and the live reads are needed on time
  const live = settings.lane == 'live' || /\/edprops\/posOrDel\/value$/.test(target) || /\/presence0\/interactions$/.test(target) ||
    /^\/Resources\//i.test(path) || /tmui-webapps|tmui-img/.test(path) || !/^\//.test(path);
  if (live) {
    There.private.stockFetch(settings);
    return;
  }
  There.fetchQueue.waiting.push(settings);
  if (!There.fetchQueue.since) {
    There.fetchQueue.since = Date.now();
  }
  There.pumpFetchQueue();
};

There.fetchLanes = function() {
  const n = Number(There.prefs().fetchLanes);
  return n >= 1 && n <= 4 ? n : 2;
};

There.pumpFetchQueue = function() {
  const q = There.fetchQueue;
  // a lane that never came back (a request that never completed) would block
  // the line for good: after 15 seconds with nothing finishing, free them
  if (q.active > 0 && q.waiting.length && Date.now() - Math.max(q.lastStart, q.lastDone || 0) > 15000) {
    q.active = 0;
  }
  while (q.active < There.fetchLanes() && q.waiting.length) {
    const wait = There.FETCH_GAP_MS - (Date.now() - q.lastStart);
    if (wait > 0) {
      There.setNamedTimer('fetch-queue', wait, There.pumpFetchQueue);
      break;
    }
    const settings = q.waiting.shift();
    q.active++;
    q.lastStart = Date.now();
    const done = settings.complete;
    There.private.stockFetch(Object.assign({}, settings, {
      complete: function(xhr, status) {
        q.active = Math.max(0, q.active - 1);
        q.lastDone = Date.now();
        if (done != undefined) {
          try {
            done(xhr, status);
          } catch (error) {
          }
        }
        There.setNamedTimer('fetch-queue', 0, There.pumpFetchQueue);
      },
    }));
  }
  There.fetchQueueNote();
};

// the bar above the dock while the game is behind. The photo sync owns the
// bar while it runs, so the queue stays quiet then
There.fetchQueueNote = function() {
  const q = There.fetchQueue;
  const left = q.waiting.length;
  if (!left) {
    q.since = 0;
    if (q.noted) {
      q.noted = false;
      if (!There.data.sweep) {
        There.setSyncNote('');
      }
    }
    return;
  }
  if (There.data.sweep) {
    return;
  }
  if (Date.now() - q.since > 350 || q.noted) {
    q.noted = true;
    There.setSyncNote('Waiting for the There client to catch up\u2026');
  } else {
    There.setNamedTimer('fetch-note', 400, There.fetchQueueNote);
  }
};

$(document).ready(function() {
  // any select that turns up in the dock becomes one that can open in the HUD
  There.upgradeSelects(document);
  new MutationObserver(function() {
    There.setNamedTimer('upgrade-selects', 0, function() {
      There.upgradeSelects(document);
    });
  }).observe(document.body, { childList: true, subtree: true });
  $(document).on('click', function() {
    $('.dsel[data-open="1"]').attr('data-open', '');
  });

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

  // the GPS screen's own buttons: zoom and flat/tilted
  $('.gpsctlbtn').on('mousedown', function(event) {
    event.stopPropagation();
  }).on('click', function(event) {
    event.stopPropagation();
    const id = $(this).attr('data-id');
    if (id == 'zoomin' || id == 'zoomout') {
      There.gpsZoomStep(id == 'zoomin' ? 1 : -1);
      return;
    }
    const p = There.prefs();
    p.gpsFlat = !p.gpsFlat;
    There.savePrefs();
    There.playSound('control down');
    There.applyGpsView();
  });
  There.applyGpsView();

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
  // Settings > Updates: ask GitHub again, or run the whole update with the
  // release that is out now (a test of the process, same version or not)
  $('.button.updcheck').on('click', function() {
    if (typeof TmuiUpdate == 'undefined') {
      return;
    }
    There.playSound('menu item activate');
    $('.updnote').text('Asking GitHub\u2026');
    TmuiUpdate.check(true);
  });
  // shows the update strip for the release that's out, as if it were new:
  // installing is still the strip's own link
  $('.button.updforce').on('click', function() {
    if (typeof TmuiUpdate == 'undefined') {
      return;
    }
    There.playSound('menu item activate');
    There.data.updForce = true;
    if (TmuiUpdate.latest) {
      There.renderUpdateBar();
      $('.updnote').text(`Update strip up for ${TmuiUpdate.latest}`);
    } else {
      $('.updnote').text('Asking GitHub\u2026');
      TmuiUpdate.check(true);
    }
  });
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

  // About: open credit links in the client browser (There profiles open in
  // the dock's Profile panel)
  $('.aboutlink').on('click', function() {
    const url = $(this).attr('data-href');
    const doid = (/profiles\/profiles\?.*AvatarDoid=(\d+)/.exec(url || '') || [])[1];
    if (doid) {
      There.showProfile(doid, $(this).text().trim());
    } else if (url) {
      There.openUrl(url);
    }
  });

  // clicks in settings/about shouldn't start a window drag
  $('.settingspanel, .aboutpanel, .releasepanel').on('mousedown', function(event) {
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
    if (event.key == 'Enter' && There.data.panel == 'places' && There.data.placesTab == 'search') {
      There.playSound('control down');
      There.placeSearchRun($(this).val());
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

  // Auctions: your own bids and sales
  $('.aumine').on('click', function() {
    There.playSound('control down');
    There.loadMyAuctions();
  });

  // Events: search on Enter, refresh, host link
  $('.evsearch input').on('keydown', function(event) {
    if (event.key == 'Enter') {
      const q = $(this).val().trim();
      if (q) {
        There.playSound('control down');
        There.data.evQuery = q;
        There.data.evOpen = null;
        There.renderEvTabs();
        There.evShow();
      }
    }
  });
  $('.evrefresh').on('click', function() {
    There.playSound('control down');
    There.data.evOpen = null;
    There.evShow(true);
  });
  $('.evfoot .button[data-evurl]').on('click', function() {
    There.openUrl($(this).attr('data-evurl'));
  });

  // Profiles: your own, and the page on the site
  // Groups: search on Enter, refresh, the site
  $('.grsearch input').on('keydown', function(event) {
    event.stopPropagation();
    if (event.key == 'Enter') {
      const q = $(this).val().trim();
      if (q.length >= 3) {
        There.playSound('control down');
        There.showGroupList(There.SITE_BASE + There.GR_LIST + `&Fulltext=${encodeURIComponent(q)}`, `Groups matching "${q}"`);
      } else {
        $('.grcount').text('Type at least 3 letters');
      }
    }
  }).on('click', function() {
    There.fsCommand('getKeyboardFocus');
    $(this).focus();
  });
  $('.grrefresh').on('click', function() {
    There.playSound('control down');
    if (There.data.grList) {
      There.data.grList.items = [];
      There.data.grList.loaded = false;
      There.data.grList.page = 0;
    }
    if (There.data.grMembers) {
      There.data.grMembers.items = [];
      There.data.grMembers.loaded = false;
    }
    There.loadGroups(true);
  });
  $('.grsite').on('click', function() {
    There.openUrl('https://webapps.prod.there.com/clubs/clubs');
  });

  // There Central pages: back through the pages opened here, or the browser
  $('.webback').on('click', function() {
    const w = There.data.web;
    if (!w) {
      return;
    }
    There.playSound('control down');
    if (w.stack.length) {
      w.current = w.stack.pop();
      There.loadSitePage();
    } else if (w.from) {
      // back out to the panel the page was opened from
      There.togglePanel(w.from);
    }
  });
  $('.website').on('click', function() {
    const w = There.data.web;
    if (w && w.current) {
      There.openUrl(w.current.url);
    }
  });
  $('.profmine').on('click', function() {
    const me = There.variables.there_pilotdoid;
    if (me && me != 0) {
      There.playSound('control down');
      There.showProfile(me, '');
    }
  });
  $('.profsite').on('click', function() {
    if (There.data.profDoid) {
      There.openUrl(There.profUrl(There.data.profDoid));
    }
  });

  // Developer panel: search, refresh, the There Central links
  $('.devrefresh').on('click', function() {
    There.playSound('control down');
    There.loadDeveloper(true);
  });
  $('.devfoot .button[data-devurl]').on('click', function() {
    There.openUrl($(this).attr('data-devurl'));
  });

  // Peer Review panel: search, refresh, guidelines
  $('.revsearch input').on('click', function() {
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
      There.searchPanelRender(this);
    }
  }).on('input', function() {
    There.searchPanelRender(this);
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
  $('.revrefresh').on('click', function() {
    There.playSound('control down');
    There.loadReviews(true);
  });
  $('.revguide').on('click', function() {
    There.playSound('control down');
    There.showSitePage('https://webapps.prod.there.com/help/kb2002.xml', 'Peer Review guide');
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
  // a click on the map itself puts a place card away
  $('.mapframe').on('click', function() {
    There.hideMapCard();
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
    There.playSound('control down');
    There.data.placesTab = 'search';
    There.showPlacesTab();
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
  $(document).on('click', '.footdetail', function() {
    There.playSound('control down');
    if (There.data.photoResult) {
      There.setSyncNote(There.data.photoResult);
      There.setNamedTimer('photo-note', 60000, function() {
        if (!There.data.sweep) {
          There.setSyncNote('');
        }
      });
    }
  });
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
    // the Communicator asking for someone's profile
    if (event.key == 'tmui-profile-cmd') {
      let cmd = null;
      try {
        cmd = JSON.parse(event.newValue || 'null');
      } catch (error) {
      }
      if (cmd && cmd.doid) {
        There.showProfile(cmd.doid, cmd.name || '');
      }
      return;
    }
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
