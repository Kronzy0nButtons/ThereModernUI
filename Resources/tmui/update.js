// ThereModernUI - update.js
// Version number + update check, used by the dock and the communicator.
// Author: DANKIES
//
// This is the only place the version lives, build-installer.ps1 reads it too.
// If GitHub has a newer release the page gets locked behind an overlay that
// just links to the download. A failed check never locks anything.

const TmuiUpdate = {
  version: '1.0.0',
  // owner/repo on GitHub, empty turns the check off
  repo: 'Kronzy0nButtons/ThereModernUI',

  CHECK_EVERY_MS: 6 * 60 * 60 * 1000,
  STORE_KEY: 'tmui.update',
  blocked: false,
  latest: null,
  url: '',

  // true if a > b, e.g. v1.2.10 > 1.2.9
  newer: function(a, b) {
    const pa = String(a || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    const pb = String(b || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      if ((pa[i] || 0) != (pb[i] || 0)) {
        return (pa[i] || 0) > (pb[i] || 0);
      }
    }
    return false;
  },

  load: function() {
    try {
      return JSON.parse(localStorage.getItem(TmuiUpdate.STORE_KEY) || '{}') || {};
    } catch (error) {
      return {};
    }
  },

  save: function(data) {
    try {
      localStorage.setItem(TmuiUpdate.STORE_KEY, JSON.stringify(data));
    } catch (error) {
    }
  },

  // lock or unlock based on the latest version we know about
  apply: function(latest, url) {
    TmuiUpdate.latest = latest;
    TmuiUpdate.url = url || `https://github.com/${TmuiUpdate.repo}/releases/latest`;
    const block = !!latest && TmuiUpdate.newer(latest, TmuiUpdate.version);
    if (block != TmuiUpdate.blocked) {
      TmuiUpdate.blocked = block;
      TmuiUpdate.render();
      if (typeof TmuiUpdate.onChange == 'function') {
        TmuiUpdate.onChange(block);
      }
    }
  },

  check: function() {
    if (!TmuiUpdate.repo) {
      return;
    }
    const cached = TmuiUpdate.load();
    // use the cached answer first so a known update locks right away
    if (cached.latest) {
      TmuiUpdate.apply(cached.latest, cached.url);
    }
    if (cached.at && Date.now() - cached.at < TmuiUpdate.CHECK_EVERY_MS && !TmuiUpdate.blocked) {
      return;
    }
    fetch(`https://api.github.com/repos/${TmuiUpdate.repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    }).then(function(r) {
      return r.ok ? r.json() : null;
    }).then(function(rel) {
      if (!rel || !rel.tag_name) {
        return;
      }
      const data = { at: Date.now(), latest: rel.tag_name, url: rel.html_url || '' };
      TmuiUpdate.save(data);
      TmuiUpdate.apply(data.latest, data.url);
    }).catch(function() {
    });
  },

  openRelease: function() {
    try {
      There.playSound('menu item activate');
      There.fsCommand('browser', TmuiUpdate.url);
    } catch (error) {
    }
  },

  // full page overlay
  render: function() {
    let el = document.querySelector('.tmui-update');
    if (!TmuiUpdate.blocked) {
      if (el) {
        el.remove();
      }
      return;
    }
    if (!el) {
      if (!document.querySelector('#tmui-update-style')) {
        const style = document.createElement('style');
        style.id = 'tmui-update-style';
        style.textContent = `
.tmui-update {
  position:fixed; inset:0; z-index:100000;
  display:flex; align-items:center; justify-content:center; flex-wrap:wrap;
  gap:6px 12px; padding:8px 14px; box-sizing:border-box;
  background:rgba(12, 15, 20, 0.94); border-radius:14px;
  font:12px 'Segoe UI', system-ui, sans-serif; color:#e8edf2; text-align:center;
  pointer-events:auto; user-select:none;
}
.tmui-update .tu-dot {
  width:9px; height:9px; border-radius:50%;
  background:var(--accent, #38bdf8); box-shadow:0 0 8px var(--accent, #38bdf8);
}
.tmui-update .tu-text b { color:var(--accent, #38bdf8); }
.tmui-update .tu-hint { color:#93a1ae; font-size:11px; }
.tmui-update .tu-btn {
  padding:5px 14px; border-radius:12px; cursor:pointer; font-weight:700;
  background:var(--accent, #38bdf8); color:#0b1620;
}
.tmui-update .tu-btn:hover { filter:brightness(1.12); }`;
        document.head.appendChild(style);
      }
      el = document.createElement('div');
      el.className = 'tmui-update';
      el.innerHTML = '<span class="tu-dot"></span>' +
        '<span class="tu-text">ThereModernUI <b class="tu-ver"></b> is out. Please update.</span>' +
        '<span class="tu-btn">Download update</span>' +
        '<span class="tu-hint">Close There, run the new setup, then start There again.</span>';
      // eat all mouse input so nothing behind it works
      ['mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu', 'wheel'].forEach(function(type) {
        el.addEventListener(type, function(event) {
          event.stopPropagation();
          if (type != 'click') {
            event.preventDefault();
          }
        });
      });
      el.querySelector('.tu-btn').addEventListener('click', TmuiUpdate.openRelease);
      document.body.appendChild(el);
    }
    el.querySelector('.tu-ver').textContent = TmuiUpdate.latest;
  },

  // called from each page's onReady
  start: function(onChange) {
    TmuiUpdate.onChange = onChange || null;
    setTimeout(TmuiUpdate.check, 4000);
  },
};
