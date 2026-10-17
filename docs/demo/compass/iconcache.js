// ThereModernUI - iconcache.js
// looks up real catalog product photos by ProductId
// Author: DANKIES
//
// The catalog XML API is CORS-blocked in the WebView but the images aren't.
// catalogcache.js (Node) pulls the XML server side and writes catalogcache.json
// (ProductId -> filename) which we read same-origin. Image is catalog/media/<filename>
//
//   CatalogImages.init(host);                         // host = there_webapps
//   CatalogImages.imageForProduct(productId, size, cb);  // cb(url | null)

const CatalogImages = {
  webappsHost: null,
  map: {},            // productId -> {small, medium, large}
  poids: {},          // poid -> image filename (clothing, harvested)
  loaded: false,
  waiting: [],        // callbacks queued until the map loads

  init: function(webappsHost, pilotDoid) {
    CatalogImages.webappsHost = webappsHost || 'webapps.prod.there.com';
    CatalogImages.pilotDoid = pilotDoid || 0;
    CatalogImages.loadMap();
  },

  loadMap: function() {
    // local resources server, same origin so no CORS
    $.ajax({
      url: 'catalogcache.json',
      dataType: 'json',
      cache: true,
      success: function(data) {
        CatalogImages.map = (data && data.products) ? data.products : (data || {});
        CatalogImages.poids = Object.assign({}, (data && data.poids) ? data.poids : {}, CatalogImages.loadPoids());
        CatalogImages.ready();
      },
      error: function() {
        // no cache file yet, still use whatever clothing poids we saved locally
        CatalogImages.map = {};
        CatalogImages.poids = CatalogImages.loadPoids();
        CatalogImages.ready();
      },
    });
  },

  // clothing poid -> image pairs, saved per avatar in localStorage so we don't re-query after a restart
  poidsKey: function() {
    return `catalogimages.poids.${CatalogImages.pilotDoid || 0}`;
  },

  loadPoids: function() {
    try {
      return JSON.parse(localStorage.getItem(CatalogImages.poidsKey()) || '{}') || {};
    } catch (error) {
      return {};
    }
  },

  savePoids: function() {
    try {
      localStorage.setItem(CatalogImages.poidsKey(), JSON.stringify(CatalogImages.poids || {}));
    } catch (error) {
    }
  },

  ready: function() {
    CatalogImages.loaded = true;
    // the picture store may have been waiting on this table
    if (typeof There.prefetchPhotos == 'function') {
      There.prefetchPhotos();
    }
    const waiting = CatalogImages.waiting;
    CatalogImages.waiting = [];
    for (let w of waiting) {
      if (w.poid) {
        CatalogImages.imageForPoid(w.poid, w.cb);
      } else {
        CatalogImages.imageForProduct(w.productId, w.size, w.cb);
      }
    }
  },

  // the FlashProxy picture store (tmui_imgcache): photos come off disk,
  // downloaded once ever. off until the DLL says it's there
  localLane: false,

  mediaUrl: function(filename) {
    if (CatalogImages.localLane && /^[A-Za-z0-9._-]+$/.test(filename)) {
      // served by WebView2 itself when the DLL maps the store folder
      if (There.data.vhost) {
        return `https://tmui.img/${filename}`;
      }
      const host = There.data.host || There.variables.there_resourceshost || '127.0.0.1:9999';
      return `http://${host}/tmui-img/${filename}`;
    }
    return CatalogImages.directUrl(filename);
  },

  // a photo the store didn't have: the DLL fetches it for next time (the
  // old lane did that on the miss itself)
  pending: [],
  pendingTimer: null,
  wantStore: function(url) {
    const m = String(url || '').match(/tmui\.img\/([A-Za-z0-9._-]+)$/);
    if (!m) {
      return;
    }
    CatalogImages.pending.push(m[1]);
    if (!CatalogImages.pendingTimer) {
      CatalogImages.pendingTimer = setTimeout(function() {
        CatalogImages.pendingTimer = null;
        const files = CatalogImages.pending.splice(0, 80);
        if (files.length) {
          There.fsCommand('tmuiPrefetch', { files: files.join('|') });
        }
      }, 400);
    }
  },

  directUrl: function(filename) {
    return `https://${CatalogImages.webappsHost}/catalog/media/${filename}`;
  },

  // a store url that failed -> the same photo straight from There
  fallbackUrl: function(url) {
    const m = String(url || '').match(/(?:\/tmui-img\/|tmui\.img\/)([A-Za-z0-9._-]+)$/);
    return m ? CatalogImages.directUrl(m[1]) : null;
  },

  // every photo filename these items would show, for the store to fetch ahead
  filesFor: function(items) {
    const files = [];
    for (const it of items || []) {
      let file = null;
      if (it.productId) {
        const e = CatalogImages.map[String(it.productId)];
        file = e ? (e.medium || e.small || e.large) : null;
      }
      if (!file && it.poid) {
        file = CatalogImages.poids[String(it.poid)] || null;
      }
      if (file) {
        files.push(file);
      }
    }
    return files;
  },

  pickSize: function(entry, size) {
    if (entry == null) {
      return null;
    }
    const file = size == 'small' ? (entry.small || entry.medium)
      : size == 'large' ? (entry.large || entry.medium)
      : (entry.medium || entry.small || entry.large);
    return file ? CatalogImages.mediaUrl(file) : null;
  },

  imageForProduct: function(productId, size, callback) {
    productId = String(productId || '').trim();
    if (!productId || productId == '0') {
      callback(null);
      return;
    }
    if (!CatalogImages.loaded) {
      CatalogImages.waiting.push({ productId: productId, size: size, cb: callback });
      return;
    }
    callback(CatalogImages.pickSize(CatalogImages.map[productId], size));
  },

  // clothing is keyed by poid (scraped from the About page cache), value is just a filename under "poids"
  imageForPoid: function(poid, callback) {
    poid = String(poid || '').trim();
    if (!poid) {
      callback(null);
      return;
    }
    if (!CatalogImages.loaded) {
      CatalogImages.waiting.push({ poid: poid, cb: callback });
      return;
    }
    const file = CatalogImages.poids[poid];
    callback(file ? CatalogImages.mediaUrl(file) : null);
  },
};
