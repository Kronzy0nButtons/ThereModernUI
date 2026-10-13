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
    if (name == 'tmui_rmb') {
      $('.speedo').attr('data-boost', value == '1' ? '1' : '0');
      return;
    }
    if (name == 'tmui_chatreader') {
      There.onChatReaderSeen();
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
        There.setSpeedo(false);
        There.data.speedoPrev = null;
        There.data.speedoEma = 0;
        There.data.speedoVeh = null;
        There.setNamedTimer('speedo', There.SPEEDO_IDLE_MS, There.speedoTick);
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
        const recheck = There.data.speedoChecks % 6 == 0;
        There.setNamedTimer('speedo', There.SPEEDO_FAST_MS, recheck ? There.speedoTick : There.speedoSample);
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
      There.data.speedoPrev = { p: pos, t: now };
    }
    // quick on the throttle, settles smoothly when coasting
    There.data.speedoEma = (There.data.speedoEma || 0) * 0.35 + kmh * 0.65;
    // seated = shown, even at 0. the seat check is the only gate
    There.setSpeedo(true);
    const shown = There.data.speedoEma < There.SPEEDO_DEAD_KMH ? 0 : There.data.speedoEma * There.SPEEDO_CAL;
    There.showSpeedo(shown);
  },

  setSpeedo: function(on) {
    if (on && $('.speedo').attr('data-active') != '1') {
      // show first so the position code can measure it
      $('.speedo').attr('data-active', '1');
      There.applySpeedoPos();
      return;
    }
    $('.speedo').attr('data-active', on ? '1' : '0');
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

  // pretend engine: each gear climbs from ~2.2k to ~6.8k across its speed band,
  // so accelerating sweeps the needle up and "shifts" drop it like a real box.
  // idle sits just under 1k, boost leans it toward the redline
  SPEEDO_GEARS: [[0, 8], [8, 16], [16, 26], [26, 38], [38, 50]],

  // which gear the pretend box is in for a given speed ('N' at a stop)
  speedoGear: function(mph) {
    if (mph < 0.4) {
      return 'N';
    }
    for (let i = 0; i < There.SPEEDO_GEARS.length; i++) {
      if (mph < There.SPEEDO_GEARS[i][1]) {
        return i + 1;
      }
    }
    return There.SPEEDO_GEARS.length;
  },

  speedoRpm: function(mph, boost) {
    if (mph < 0.4) {
      return 0.85 + (boost || 0) * 0.6;
    }
    let lo = 0;
    let hi = 8;
    for (const g of There.SPEEDO_GEARS) {
      lo = g[0];
      hi = g[1];
      if (mph < g[1]) {
        break;
      }
    }
    const f = Math.min(1, (mph - lo) / (hi - lo));
    const first = lo == 0;
    let rpm = (first ? 1.1 : 2.2) + f * (6.8 - (first ? 1.1 : 2.2));
    rpm += (boost || 0) * 1.1;
    return Math.min(rpm, 8.6);
  },

  speedoAnim: function() {
    if ($('.speedo').attr('data-active') != '1') {
      There.data.speedoAnimOn = false;
      There.data.speedoShown = 0;
      return;
    }
    const target = There.data.speedoTarget || 0;
    let shown = There.data.speedoShown || 0;
    shown += (target - shown) * 0.08;
    if (Math.abs(target - shown) < 0.05) {
      shown = target;
    }
    There.data.speedoShown = shown;
    const mph = shown * 0.621;
    // boost eases in and out rather than stepping
    const boostOn = $('.speedo').attr('data-boost') == '1' ? 1 : 0;
    There.data.speedoBoost = (There.data.speedoBoost || 0) + (boostOn - (There.data.speedoBoost || 0)) * 0.06;
    // the rev needle gets its own lerp so gear shifts sweep instead of jumping
    const rpmTarget = There.speedoRpm(mph, There.data.speedoBoost);
    let rpm = There.data.speedoRpmShown;
    rpm = rpm == undefined ? rpmTarget : rpm + (rpmTarget - rpm) * 0.055;
    There.data.speedoRpmShown = rpm;
    const frac = Math.min(1, rpm / There.SPEEDO_RPM_MAX);
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
    const need = There.data.shadowOn || There.prefs().party || There.prefs().gifs;
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
        There.handleChatXml(xml, There.data.shadowVer == undefined);
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
  // don't act on it.
  handleChatXml: function(xml, backlog) {
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
        There.onChatLine(line.author, line.text);
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
    if (!There.prefs().gifs && !There.prefs().party && !There.data.shadowOn) {
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

  onChatLine: function(author, text) {
    const target = (There.data.shadowTarget || '').toLowerCase();
    const me = (There.variables.there_pilotname || '').toLowerCase();
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
      thumb: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
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
        There.openUrl('https://webapps.prod.there.com/catalog/index.html');
        break;
      }
      case 'auctions': {
        There.openUrl('https://webapps.prod.there.com/items/home');
        break;
      }
      case 'places': {
        There.openUrl('https://webapps.prod.there.com/places/places?count=100');
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
    There.data.panel = id;
    There.data.search = '';
    $('.panelsearch input').val('');
    There.clearItemMenu();
    There.syncPanelWidth();
    $('.dockroot').attr('data-panel', id);
    if (id == 'inventory' || id == 'wardrobe') {
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
    }
    // About is static, nothing to load
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

  closePanel: function() {
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

  /* ------- custom item folders (nested, per scope, per avatar) -------
   * All local, in localStorage. Keyed by avatar (pilotDoid) so accounts never
   * share folders, and by scope:
   *   inventory         -> one tree for all possessions
   *   wardrobe:<catId>   -> a tree per clothing category (tops, bottoms, ...)
   * Items referenced by doid (possessions) or poid (clothing). Nesting via a
   * `parent` link, null = scope root. Nothing leaves the machine. */

  // stable id for an item within its scope
  itemKey: function(item) {
    return String(item.doid || item.poid || '');
  },

  // folder scope for the active panel. wardrobe is per category so "Summer"
  // under Tops isn't the same as under Shoes
  currentScope: function() {
    if (There.data.panel == 'wardrobe') {
      return 'wardrobe:' + (There.data.wardrobeTab || 'all');
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
    if (There.data.panel == 'inventory' || There.data.panel == 'wardrobe') {
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
  CHUNK: 60,

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
    if (!search && (There.data.panel == 'inventory' || There.data.panel == 'wardrobe')) {
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
    const frag = document.createDocumentFragment();
    const end = Math.min(pos + There.CHUNK, list.length);
    for (; pos < end; pos++) {
      frag.appendChild(There.buildCard(list[pos])[0]);
    }
    if (grid) {
      grid.appendChild(frag);
    }
    There.data.renderPos = pos;
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
        $(thumbEl).css('background-image', `url("${url}")`).text('');
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
    if (item.interactions) {
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
      if (There.data.panel == 'inventory' || There.data.panel == 'wardrobe') {
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

  invokeItemAction: function(item, action) {
    There.playSound('close menu');
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
      return;
    }
    // Inventory: go through the item's node in the native My Things menu tree
    // (ScriptHook exposes all of it):
    //   /mainMenu/My Things/<folders...>/<Item Name>/<Action>/activate
    // Same native path the Organizer uses (InventoryManagerPossession::executeNthInteraction), checked in the logs.
    There.invokeInventoryMenuAction(item, action.label);
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
    $('.syncstatus').text(`${inv} items · ${acc} clothing · ${map} action paths · updated ${hh}:${mm}${chatWay}${pinned}${spd}`);
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
    $('.appeartoggles, .controltoggles, .giftoggles').empty();
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
    prefRow('Speedometer when driving', 'speedo', '.appeartoggles');
    prefRow('Action Mode keys (WASD, Space, R)', 'keymap', '.controltoggles');
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
    if (There.data.panel == 'inventory' || There.data.panel == 'wardrobe') {
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
    $('.footcount').text(n + (n == 1 ? ' item' : ' items'));
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
