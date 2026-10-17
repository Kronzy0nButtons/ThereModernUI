// ThereModernUI - update.js
// Version number + update check, used by the dock and the communicator.
// Author: DANKIES
//
// This is the only place the version lives, build-installer.ps1 reads it too.
// If GitHub has a newer release, `available` goes true and the page's
// onChange runs (the dock shows a strip at the top of its pill). Nothing is
// locked, and a failed check changes nothing.

const TmuiUpdate = {
  version: '1.0.7',
  // owner/repo on GitHub, empty turns the check off
  repo: 'Kronzy0nButtons/ThereModernUI',

  CHECK_EVERY_MS: 15 * 60 * 1000,
  STORE_KEY: 'tmui.update',
  available: false,
  latest: null,
  // the release page, and the setup exe on it when the release has one
  url: '',
  download: '',

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

  // settle `available` from the latest version we know about; the page hears
  // about it when the answer (or the version on offer) changes
  apply: function(latest, url, download) {
    TmuiUpdate.latest = latest;
    TmuiUpdate.url = url || `https://github.com/${TmuiUpdate.repo}/releases/latest`;
    TmuiUpdate.download = download || '';
    TmuiUpdate.available = !!latest && TmuiUpdate.newer(latest, TmuiUpdate.version);
    const key = `${TmuiUpdate.available}:${TmuiUpdate.available ? latest : ''}`;
    if (key != TmuiUpdate.shownKey) {
      TmuiUpdate.shownKey = key;
      if (typeof TmuiUpdate.onChange == 'function') {
        TmuiUpdate.onChange(TmuiUpdate.available);
      }
    }
  },

  // the setup exe among the release's files, only from our own repo's downloads
  setupAsset: function(rel) {
    const base = `https://github.com/${TmuiUpdate.repo}/releases/download/`;
    const asset = (rel.assets || []).find(a => /^ThereModernUI-Setup-.*\.exe$/i.test(a.name || '') && String(a.browser_download_url || '').startsWith(base));
    return asset ? asset.browser_download_url : '';
  },

  // force skips the cached answer (Settings > Updates > Check now). onChecked,
  // when a page sets it, hears whether GitHub answered
  check: function(force) {
    if (!TmuiUpdate.repo) {
      return;
    }
    const cached = TmuiUpdate.load();
    // use the cached answer first so a known update shows right away
    if (cached.latest) {
      TmuiUpdate.apply(cached.latest, cached.url, cached.download);
    }
    if (!force && cached.at && Date.now() - cached.at < TmuiUpdate.CHECK_EVERY_MS && !TmuiUpdate.available) {
      return;
    }
    const told = function(ok) {
      if (typeof TmuiUpdate.onChecked == 'function') {
        TmuiUpdate.onChecked(ok);
      }
    };
    fetch(`https://api.github.com/repos/${TmuiUpdate.repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    }).then(function(r) {
      return r.ok ? r.json() : null;
    }).then(function(rel) {
      if (!rel || !rel.tag_name) {
        told(false);
        return;
      }
      const data = {
        at: Date.now(), latest: rel.tag_name, url: rel.html_url || '', download: TmuiUpdate.setupAsset(rel),
        // the release notes, for the dock's What's new panel
        name: rel.name || '', published: rel.published_at || '', notes: String(rel.body || '').slice(0, 60000),
      };
      TmuiUpdate.save(data);
      TmuiUpdate.apply(data.latest, data.url, data.download);
      told(true);
    }).catch(function() {
      told(false);
    });
  },

  // the release page (notes) in the browser
  openRelease: function() {
    try {
      There.playSound('menu item activate');
      There.fsCommand('browser', TmuiUpdate.url);
    } catch (error) {
    }
  },

  // the setup exe itself, or the release page when there isn't one
  openDownload: function() {
    try {
      There.playSound('menu item activate');
      There.fsCommand('browser', TmuiUpdate.download || TmuiUpdate.url);
    } catch (error) {
    }
  },

  // called from each page's onReady
  start: function(onChange) {
    TmuiUpdate.onChange = onChange || null;
    setTimeout(TmuiUpdate.check, 4000);
  },
};
