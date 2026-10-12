// ThereModernUI - demo-after.js
// Second half of the showcase demo, loaded after dock.js: sample pictures,
// fake GIF search, and pointing the real dock at the fake client in demo.js.
// Author: DANKIES

(function() {
  // ---------- sample pictures (drawn here, nothing is downloaded) ----------
  const ART = {
    cap: ['shirt', '#4d5d3a', '#232b19', 'CAP'],
    tee: ['shirt', '#f3f4f6', '#9ca3af', 'TEE'],
    jeans: ['shirt', '#3b5b8c', '#1e3557', 'JEANS'],
    kicks: ['shirt', '#ef4444', '#7f1d1d', 'KICKS'],
    hoodie: ['shirt', '#8b5cf6', '#4c1d95', 'HOODIE'],
    shorts: ['shirt', '#06b6d4', '#0e7490', 'SHORTS'],
    shades: ['shirt', '#374151', '#111827', 'SHADES'],
    chain: ['star', '#fbbf24', '#92400e', 'CHAIN'],
    beanie: ['shirt', '#f97316', '#9a3412', 'BEANIE'],
    jacket: ['shirt', '#14b8a6', '#115e59', 'JACKET'],
    joggers: ['shirt', '#1f2937', '#030712', 'JOGGERS'],
    sneakers: ['shirt', '#e5e7eb', '#6b7280', 'SNEAKS'],
    gun: ['bolt', '#38bdf8', '#1d4ed8', 'PAINTGUN'],
    camera: ['camera', '#64748b', '#1e293b', 'CAMERA'],
    boombox: ['music', '#f472b6', '#9d174d', 'BOOMBOX'],
    buggy: ['map-location-dot', '#22c55e', '#14532d', 'BUGGY'],
    hoverboard: ['wand-magic-sparkles', '#a855f7', '#581c87', 'HOVER'],
  };

  function iconPath(name) {
    const i = (typeof TMUI_ICONS != 'undefined') && TMUI_ICONS[name];
    return i ? i : null;
  }

  function art(key) {
    const a = ART[key];
    if (!a) {
      return '';
    }
    const ico = iconPath(a[0]);
    let glyph = '';
    if (ico) {
      const vb = ico[0].split(' ').map(Number);
      const s = 54 / Math.max(vb[2], vb[3]);
      glyph = `<g transform="translate(${100 - vb[2] * s / 2},${62 - vb[3] * s / 2}) scale(${s})"><path fill="rgba(255,255,255,0.92)" d="${ico[1]}"/></g>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a[1]}"/><stop offset="1" stop-color="${a[2]}"/></linearGradient></defs>` +
      `<rect width="200" height="150" fill="url(#g)"/>${glyph}<text x="100" y="128" text-anchor="middle" font-family="Segoe UI, Arial" font-weight="800" font-size="16" fill="rgba(255,255,255,0.85)" letter-spacing="2">${a[3]}</text></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  window.TmuiDemoArt = {
    catalog: function() {
      const products = {};
      for (const k of ['gun', 'camera', 'boombox', 'buggy', 'hoverboard']) {
        products[k] = { small: k, medium: k, large: k };
      }
      const poids = {};
      const clothes = window.TmuiDemo.world.clothes;
      for (const id in clothes) {
        poids[id] = clothes[id].art;
      }
      return { products: products, poids: poids };
    },
  };

  // the dock asks the catalog for photos by filename; hand back our drawings
  CatalogImages.mediaUrl = function(file) {
    return art(file);
  };

  // ---------- fake GIF search (stands in for KLIPY) ----------
  const GIFS = [
    ['lol', 'LOL', '#f472b6', '#8b5cf6'],
    ['wave-hi', 'HI!', '#22c55e', '#06b6d4'],
    ['party-time', 'PARTY', '#fbbf24', '#ef4444'],
    ['gg-wp', 'GG', '#38bdf8', '#1d4ed8'],
    ['omg-no', 'OMG', '#f97316', '#e11d48'],
    ['dance-off', 'DANCE', '#a855f7', '#6366f1'],
    ['thank-you', 'THX', '#14b8a6', '#0ea5e9'],
    ['brb', 'BRB', '#64748b', '#0f172a'],
    ['hype', 'HYPE', '#ef4444', '#f59e0b'],
  ];

  function gifSvg(text, c1, c2, still) {
    const anim = still ? '' :
      '<animateTransform attributeName="transform" type="scale" values="1;1.18;0.94;1" dur="0.9s" repeatCount="indefinite" additive="sum"/>';
    const spin = still ? '' :
      '<animate attributeName="x1" values="0;1;0" dur="2.4s" repeatCount="indefinite"/>';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="150" viewBox="0 0 220 150"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">${spin}<stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>` +
      `<rect width="220" height="150" fill="url(#g)"/><g transform="translate(110 88)"><text text-anchor="middle" font-family="Segoe UI, Arial" font-weight="900" font-size="46" fill="#fff" stroke="rgba(0,0,0,0.25)" stroke-width="2">${text}${anim}</text></g></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  function gifItem(g) {
    const moving = gifSvg(g[1], g[2], g[3], false);
    const still = gifSvg(g[1], g[2], g[3], true);
    const size = { webp: { url: moving }, gif: { url: moving }, jpg: { url: still } };
    return { id: g[0], slug: g[0], title: g[1], file: { sm: size, xs: size, md: size, hd: size } };
  }

  There.KLIPY_KEY = 'demo';
  There.isKlipyUrl = function(url) {
    return /^data:image\/svg\+xml,/.test(String(url || ''));
  };

  const realFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    const url = String(input && input.url ? input.url : input);
    if (!/api\.klipy\.com/.test(url)) {
      return realFetch(input, init);
    }
    const u = new URL(url);
    const last = u.pathname.split('/').pop();
    let body;
    if (last == 'trending' || last == 'search') {
      const q = (u.searchParams.get('q') || '').toLowerCase();
      const list = GIFS.filter(g => !q || g[0].includes(q) || g[1].toLowerCase().includes(q));
      body = { result: true, data: { data: (list.length ? list : GIFS).map(gifItem) } };
    } else {
      const g = GIFS.find(x => x[0] == decodeURIComponent(last));
      body = g ? { result: true, data: gifItem(g) } : { result: false };
    }
    return new Promise(resolve => setTimeout(() => resolve(new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })), 150));
  };

  // no update checks in the demo
  if (typeof TmuiUpdate != 'undefined') {
    TmuiUpdate.repo = '';
  }

  // framework.js declares There with let, so it isn't on window. the showcase
  // page needs it for its demo buttons
  window.There = There;

  // point the dock at the fake client and say hello
  There.variables.there_resourceshost = 'tmui.demo';
  window.TmuiDemo.start();
})();
