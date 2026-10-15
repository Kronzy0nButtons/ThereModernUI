// ThereModernUI - theme.js
// Applies the dock's picked theme (Settings > Appearance) to any page that
// includes this file, and follows changes live. The dock writes "tmui-theme"
// to localStorage; every page shares that origin.
// Author: DANKIES

(function() {
  function apply() {
    let theme = null;
    try {
      theme = JSON.parse(localStorage.getItem('tmui-theme') || 'null');
    } catch (error) {
    }
    const root = document.documentElement;
    const props = ['--accent', '--accent-bright', '--accent-rgb', '--tint', '--tint-deep', '--tint-raised'];
    const match = /^#?([0-9a-f]{6})$/i.exec(theme && theme.accent || '');
    if (!match) {
      for (const p of props) {
        root.style.removeProperty(p);
      }
      return;
    }
    const n = parseInt(match[1], 16);
    const a = [n >> 16 & 255, n >> 8 & 255, n & 255];
    const mix = function(base, f) {
      return base.map((b, i) => Math.round(b * (1 - f) + a[i] * f)).join(', ');
    };
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-bright', theme.bright || theme.accent);
    root.style.setProperty('--accent-rgb', a.join(', '));
    root.style.setProperty('--tint', mix([17, 21, 28], 0.16));
    root.style.setProperty('--tint-deep', mix([12, 16, 22], 0.13));
    root.style.setProperty('--tint-raised', mix([28, 35, 45], 0.18));
  }

  window.addEventListener('storage', function(event) {
    if (event.key == 'tmui-theme') {
      apply();
    }
  });
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
