// ThereModernUI - demo.js
// Pretends to be the There client so the real dock runs in a normal browser
// for the showcase page. Loaded after jQuery and before framework.js.
// Author: DANKIES
//
// Two halves:
//   - a fake window.chrome.webview, which is how the game talks to its pages
//     (fsCommands come in here, game variables go out from here)
//   - a jQuery transport that answers the dock's requests to the local
//     service (ScriptHook, inventory table, chat feed...) from a small
//     made-up world, plus music and GIF search
// The dock's own code is the real thing, untouched.

(function() {
  const HOST = 'tmui.demo';
  const PILOT = 'You';
  const listeners = [];

  // ---------- talking to the showcase page around us ----------
  function toParent(msg) {
    try {
      window.parent.postMessage(Object.assign({ tmuiDemo: true }, msg), '*');
    } catch (error) {
    }
  }

  function sendVar(name, value) {
    const data = `setVariable?name=${encodeURIComponent(name)}&value=${encodeURIComponent(value)}`;
    for (const cb of listeners) {
      cb({ data: data });
    }
  }

  // ---------- the made-up world ----------
  const world = {
    balance: 95628,
    actionMode: false,
    keysAllowed: true,
    chat: false,
    typed: '',
    chatVer: 1,
    chatLines: [
      { ver: 1, author: 'Kronzy', text: 'yo whats good' },
      { ver: 1, author: 'Lil_Shell', text: "'wave" },
      { ver: 1, author: 'BeachBum', text: 'anyone up for paintball later?' },
    ],
    clothes: {
      501: { name: 'Camo Cap', type: 'hat', wearing: 1, art: 'cap' },
      502: { name: 'White Tee', type: 'upperbody', wearing: 1, art: 'tee' },
      503: { name: 'Denim Jeans', type: 'lowerbody', wearing: 1, art: 'jeans' },
      504: { name: 'Red Hi-Tops', type: 'shoes', wearing: 1, art: 'kicks' },
      505: { name: 'Purple Hoodie', type: 'upperbody', wearing: 0, art: 'hoodie' },
      506: { name: 'Board Shorts', type: 'lowerbody', wearing: 0, art: 'shorts' },
      507: { name: 'Aviator Shades', type: 'eyewear', wearing: 0, art: 'shades' },
      508: { name: 'Gold Chain', type: 'neckwear', wearing: 0, art: 'chain' },
      509: { name: 'Orange Beanie', type: 'hat', wearing: 0, art: 'beanie' },
      510: { name: 'Teal Jacket', type: 'upperbody', wearing: 0, art: 'jacket' },
      511: { name: 'Black Joggers', type: 'lowerbody', wearing: 0, art: 'joggers' },
      512: { name: 'White Sneakers', type: 'shoes', wearing: 0, art: 'sneakers' },
    },
    outfits: {
      601: { name: 'Beach Day', wearing: 0 },
      602: { name: 'Club Night', wearing: 0 },
    },
    looksets: {
      701: { name: 'Default Look', wearing: 1 },
    },
    // My Things menu: folder -> item -> state
    items: {
      Gear: {
        Paintgun: { doid: 9001, product: 'gun', out: false, gun: true },
        Camera: { doid: 9002, product: 'camera', out: false },
        Boombox: { doid: 9003, product: 'boombox', out: false },
      },
      Vehicles: {
        Buggy: { doid: 9101, product: 'buggy', out: false, verb: 'Drive' },
        Hoverboard: { doid: 9102, product: 'hoverboard', out: false, verb: 'Ride' },
      },
    },
  };

  function findItem(name) {
    for (const folder in world.items) {
      if (world.items[folder][name]) {
        return world.items[folder][name];
      }
    }
    return null;
  }

  function itemActions(it) {
    const take = it.verb || (it.gun ? 'Aim' : 'Take Out');
    const acts = it.out ? ['Put Away'] : [take];
    if (it.gun && it.out) {
      acts.push('Reload');
    }
    return acts.concat(['About', 'Give', 'Trade']);
  }

  function say(text) {
    world.chatLines.push({ ver: ++world.chatVer, author: PILOT, text: text });
    toParent({ say: text });
  }

  function setActionMode(on) {
    world.actionMode = on;
    world.chat = false;
    world.typed = '';
    sendVar('tmui_actionmode', on ? '1' : '0');
    sendVar('tmui_keymode', on && world.keysAllowed ? 'mapped' : 'off');
    toParent({ actionMode: on });
  }

  // ---------- fake ScriptHook ----------
  const xml = (inner) => `<?xml version="1.0"?><Answer><Result>1</Result>${inner}</Answer>`;
  const value = (v) => xml(`<Value>${String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</Value>`);
  const kids = (names) => xml(names.map(n => `<Child><Name>${String(n).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</Name></Child>`).join(''));
  const fail = () => '<?xml version="1.0"?><Answer><Result>0</Result></Answer>';

  function scriptGet(path) {
    const p = path.split('/').filter(Boolean);
    if (path == '/client') {
      return kids(['windows']);
    }
    if (path == '/pilotPobs/therebucks/balance') {
      return value(world.balance);
    }
    if (p[0] == 'pilotPobs' && ['accoutrements', 'outfits', 'looksets'].includes(p[1])) {
      const set = p[1] == 'accoutrements' ? world.clothes : world[p[1]];
      if (p.length == 2) {
        return kids(Object.keys(set));
      }
      const c = set[p[2]];
      if (!c) {
        return fail();
      }
      if (p[3] == 'name') {
        return value(c.name);
      }
      if (p[3] == 'type') {
        return value(c.type || '');
      }
      if (p[3] == 'wearing') {
        return value(c.wearing ? 1 : 0);
      }
      return kids(['About', 'Put on', 'Take off']);
    }
    if (path == '/mainMenu/There/Customize/World/Default to Action Mode/marked') {
      return value(world.actionMode ? 1 : 0);
    }
    if (p[0] == 'mainMenu' && p[1] == 'My Things') {
      if (p.length == 2) {
        return kids(Object.keys(world.items).concat(['ChangeMe', 'Organize...']));
      }
      const folder = world.items[p[2]];
      if (!folder) {
        return kids([]);
      }
      if (p.length == 3) {
        return kids(Object.keys(folder));
      }
      const it = folder[p[3]];
      return it ? kids(itemActions(it).concat(['activate'])) : fail();
    }
    return fail();
  }

  function scriptInvoke(path, args) {
    if (path == '/acc/addChatText') {
      const text = String(args || '').replace(/^text=/, '').replace(/\n$/, '');
      if (text) {
        say(text);
      }
      return xml('');
    }
    const p = path.split('/').filter(Boolean);
    if (path == '/mainMenu/There/Customize/World/Default to Action Mode/activate') {
      setTimeout(() => setActionMode(!world.actionMode), 350);
      return xml('');
    }
    if (p[0] == 'mainMenu' && p[1] == 'Views') {
      toParent({ camera: p[2] });
      return xml('');
    }
    if (p[0] == 'pilotPobs' && ['accoutrements', 'outfits', 'looksets'].includes(p[1])) {
      const set = p[1] == 'accoutrements' ? world.clothes : world[p[1]];
      const c = set[p[2]];
      if (!c) {
        return fail();
      }
      if (p[3] == 'Put on') {
        if (p[1] == 'accoutrements') {
          for (const k in set) {
            if (set[k].type == c.type) {
              set[k].wearing = 0;
            }
          }
        }
        c.wearing = 1;
        toParent({ say: `*puts on ${c.name}*` });
      } else if (p[3] == 'Take off') {
        c.wearing = 0;
        toParent({ say: `*takes off ${c.name}*` });
      } else if (p[3] == 'About') {
        toParent({ note: `In the game this opens the About page for ${c.name}.` });
      } else {
        toParent({ note: `In the game this would ${p[3].toLowerCase()} ${c.name}.` });
      }
      return xml('');
    }
    if (p[0] == 'mainMenu' && p[1] == 'My Things' && p.length >= 6) {
      const it = world.items[p[2]] && world.items[p[2]][p[3]];
      const act = p[4];
      if (!it) {
        return fail();
      }
      if (/^(aim|take out|drive|ride)$/i.test(act)) {
        it.out = true;
        toParent({ say: `*takes out the ${p[3]}*` });
        if (it.gun) {
          // the aim prompt is auto-accepted, then the game is in Action Mode
          setTimeout(() => setActionMode(true), 500);
        }
      } else if (/^put away$/i.test(act)) {
        it.out = false;
        toParent({ say: `*puts away the ${p[3]}*` });
      } else if (/^reload$/i.test(act)) {
        toParent({ say: '*reloads the Paintgun*' });
      } else {
        toParent({ note: `In the game this would open "${act}" for the ${p[3]}.` });
      }
      return xml('');
    }
    return xml('');
  }

  // ---------- fake inventory table ----------
  function inventoryTable() {
    let rows = '<table><tr><th>Type</th><th>Doid</th><th>Name</th><th>ProductId</th><th>Owner</th><th>Status</th><th>Interactions</th><th>Icon</th></tr>';
    for (const folder in world.items) {
      for (const name in world.items[folder]) {
        const it = world.items[folder][name];
        const acts = ['About', it.gun ? 'Aim' : (it.verb || 'Take Out'), 'Give', 'Trade', it.gun ? 'Reload' : 'Lend'];
        rows += `<tr><td>possession</td><td>${it.doid}</td><td>${name}</td><td>${it.product}</td><td>1</td><td>${it.out ? 'In use' : ''}</td>` +
          `<td>${acts.map((a, i) => `${i + 1}:${a}`).join(',')}</td><td></td></tr>`;
      }
    }
    return rows + '</table>';
  }

  // ---------- fake chat feed (version gated, like the real one) ----------
  // Like the real client: without lastVer it answers straight away with the recent
  // buffer (newest last); with lastVer it holds the request until something new.
  function chatFeed(lastVer, reply) {
    const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const send = function() {
      const lines = lastVer == null ? world.chatLines.slice(-40) : world.chatLines.filter(l => l.ver > Number(lastVer));
      const msgs = lines.map(l => `<msg><authorName>${esc(l.author)}</authorName><text>${esc(l.text)}</text></msg>`).join('');
      reply(`<?xml version="1.0"?><Answer><Result>1</Result><version>${world.chatVer}</version>${msgs}</Answer>`);
    };
    if (lastVer != null && !world.chatLines.some(l => l.ver > Number(lastVer))) {
      setTimeout(send, 1200);
    } else {
      setTimeout(send, 40);
    }
  }

  // ---------- music search (stands in for Piped) ----------
  const TRACKS = [
    ['jfKfPfyJRdk', 'lofi hip hop radio - beats to relax/study to', 'Lofi Girl', 0],
    ['K4DyBUG242c', 'Cartoon - On & On (feat. Daniel Levi)', 'NoCopyrightSounds', 208],
    ['bM7SZ5SBzyY', 'Alan Walker - Fade', 'NoCopyrightSounds', 264],
    ['60ItHLz5WEA', 'Alan Walker - Faded', 'Alan Walker', 212],
  ];
  function musicSearch() {
    return JSON.stringify({
      items: TRACKS.map(t => ({ url: `/watch?v=${t[0]}`, title: t[1], uploaderName: t[2], duration: t[3], thumbnail: `https://i.ytimg.com/vi/${t[0]}/mqdefault.jpg` })),
    });
  }

  // ---------- the jQuery transport that answers all of the above ----------
  $.ajaxTransport('+*', function(options) {
    let url;
    try {
      url = new URL(options.url, location.href);
    } catch (error) {
      return undefined;
    }
    const isGame = url.host == HOST || url.host == '127.0.0.1:9999';
    const isMusic = /\/search$/.test(url.pathname) && url.searchParams.get('filter') == 'videos';
    const isCatalog = /catalogcache\.json$/.test(url.pathname);
    if (!isGame && !isMusic && !isCatalog) {
      return undefined;
    }
    let aborted = false;
    return {
      send: function(headers, complete) {
        const reply = (text, status) => {
          if (!aborted) {
            complete(status || 200, 'OK', { text: text });
          }
        };
        const q = url.searchParams;
        if (isCatalog) {
          setTimeout(() => reply(JSON.stringify(window.TmuiDemoArt.catalog())), 10);
        } else if (isMusic) {
          setTimeout(() => reply(musicSearch()), 250);
        } else if (url.pathname == '/ScriptHook/Get') {
          setTimeout(() => reply(scriptGet(q.get('Path') || '')), 15);
        } else if (url.pathname == '/ScriptHook/Invoke') {
          setTimeout(() => reply(scriptInvoke(q.get('Path') || '', q.get('Args'))), 30);
        } else if (url.pathname == '/inventoryManager/displayInventoryTable') {
          setTimeout(() => reply(inventoryTable()), 60);
        } else if (url.pathname == '/VersionedXmlSvc/CommMessageData') {
          chatFeed(q.get('lastVer'), reply);
        } else if (url.pathname == '/GuiService/simulateGuiCommand') {
          const action = q.get('action') || q.get('Args') || 'that window';
          toParent({ note: `In the game this opens ${String(action).replace(/^action=/, '')}.` });
          setTimeout(() => reply(xml('')), 20);
        } else {
          setTimeout(() => reply(fail()), 20);
        }
      },
      abort: function() {
        aborted = true;
      },
    };
  });

  // ---------- the fake WebView2 bridge ----------
  function onCommand(msg) {
    const i = msg.indexOf('?');
    const cmd = i < 0 ? msg : msg.slice(0, i);
    const q = new URLSearchParams(i < 0 ? '' : msg.slice(i + 1));
    if (cmd == 'tmuiKeymap') {
      world.keysAllowed = q.get('on') == '1';
      sendVar('tmui_keymode', world.actionMode && world.keysAllowed ? 'mapped' : 'off');
    } else if (cmd == 'browser') {
      const url = q.get('url') || [...q.keys()][0] || '';
      if (/^https?:\/\//.test(url)) {
        window.open(url, '_blank', 'noopener');
      } else {
        toParent({ note: 'In the game this opens a browser window.' });
      }
    } else if (cmd == 'guiCommand') {
      toParent({ note: `In the game this opens ${q.get('action') || 'a window'}.` });
    }
  }

  window.chrome = window.chrome || {};
  window.chrome.webview = {
    addEventListener: function(type, cb) {
      if (type == 'message') {
        listeners.push(cb);
      }
    },
    postMessage: function(msg) {
      onCommand(String(msg));
    },
    hostObjects: { sync: { client: { onBeginDragWindow: function() {}, onKeyboardFocus: function() {} } } },
  };

  // ---------- keys the patched FlashProxy would handle in the game ----------
  let hotkeySeq = 0;
  document.addEventListener('keydown', function(e) {
    if (!world.actionMode || !world.keysAllowed || $(e.target).is('input, textarea')) {
      return;
    }
    if (world.chat) {
      e.preventDefault();
      e.stopPropagation();
      if (e.key == 'Enter') {
        if (world.typed) {
          say(world.typed);
        }
        world.chat = false;
        sendVar('tmui_keymode', 'mapped');
      } else if (e.key == 'Escape') {
        world.chat = false;
        sendVar('tmui_keymode', 'mapped');
      } else if (e.key == 'Backspace') {
        world.typed = world.typed.slice(0, -1);
      } else if (e.key.length == 1) {
        world.typed += e.key;
      }
      toParent({ typing: world.chat ? world.typed : null });
      return;
    }
    const k = e.key.toLowerCase();
    if (k == 'enter') {
      e.preventDefault();
      world.chat = true;
      world.typed = '';
      sendVar('tmui_keymode', 'chat');
      toParent({ typing: '' });
      return;
    }
    if (['w', 'a', 's', 'd'].includes(k)) {
      e.preventDefault();
      toParent({ walk: k });
    } else if (k == ' ') {
      e.preventDefault();
      toParent({ jump: true });
    } else if (k == 'r') {
      e.preventDefault();
      sendVar('tmui_hotkey', `R:${++hotkeySeq}`);
    } else if (e.key.length == 1 && !e.ctrlKey && !e.altKey) {
      e.preventDefault(); // letters don't type in Action Mode
    }
  }, true);

  window.TmuiDemo = {
    sendVar: sendVar,
    world: world,
    setActionMode: setActionMode,
    start: function() {
      // first visit: a filled Quick Bar so the F-keys do something straight away
      try {
        const doid = '1234567';
        if (!localStorage.getItem(`dock.quickbar.${doid}`)) {
          const inv = (name, doid2, product, verb) => ({ name: name, doid: doid2, productId: product, interactions: `1:About,2:${verb},3:Give,4:Trade` });
          localStorage.setItem(`dock.quickbar.${doid}`, JSON.stringify({ slots: [
            inv('Paintgun', 9001, 'gun', 'Aim'),
            inv('Buggy', 9101, 'buggy', 'Drive'),
            inv('Hoverboard', 9102, 'hoverboard', 'Ride'),
            { name: 'Purple Hoodie', poid: '505' },
            { name: 'Aviator Shades', poid: '507' },
          ] }));
        }
        if (!localStorage.getItem(`dock.viewprefs.${doid}`)) {
          localStorage.setItem(`dock.viewprefs.${doid}`, JSON.stringify({ quickOpen: true }));
        }
      } catch (error) {
      }
      sendVar('there_resourceshost', HOST);
      sendVar('there_webapps', 'webapps.prod.there.com');
      sendVar('there_pilotname', PILOT);
      sendVar('there_pilotdoid', '1234567');
      sendVar('there_ready', '1');
      sendVar('there_avheading', '0');
      sendVar('tmui_actionmode', '0');
      sendVar('tmui_keymode', 'off');
    },
  };

  // the showcase page can poke us (heading from the mouse, demo buttons)
  window.addEventListener('message', function(e) {
    const m = e.data || {};
    if (m.tmuiHeading != null) {
      sendVar('there_avheading', String(m.tmuiHeading));
    }
  });
})();
