// ThereModernUI - gpsmaps.js
// Where am I? Turns a world position into a map picture and a spot on it.
// Author: DANKIES
//
// The pixel calibration comes from Myrmex GPS (gps.swf, 2007); the island
// maps in maps/ are ThereModernUI's own vector maps.
// The world is a sphere of radius 6,000,000 (the position feed's
// units): x/z gives east-west, y against the x-z distance gives north-south,
// each as an arc length on the surface. Height is distance from the centre
// minus the radius.

const TmuiMaps = {
  // where the map pictures come from; the dock points this at WebView2's
  // own folder mapping when the DLL has one
  base: '',
  RADIUS: 6000000,

  // first match wins, same order as the original. box: x and y ranges in
  // surface units; offset/scale: surface units -> picture pixels (200x150)
  REGIONS: [
    { id: 'burojo', name: 'Burojo', x: [-28175, -19851], y: [27023, 33550], ox: 28175, oy: 33550, sx: 41.625, sy: 41.625 },
    { id: 'motumotu', name: 'Motu Motu', x: [-21563, -6080], y: [19125, 30740], ox: 21563, oy: 30740, sx: 77.4, sy: 77.4 },
    { id: 'cangrejo', name: 'Cangrejo', x: [-20565, -4565], y: [5915, 17880], ox: 20565, oy: 17880, sx: 79.77, sy: 80 },
    { id: 'tiki', name: 'Tiki', x: [-8150, 10850], y: [-8990, 5150], ox: 8150, oy: 5150, sx: 95, sy: 94.07 },
    { id: 'saja', name: 'Saja', x: [-152200, -150600], y: [151000, 152440], ox: 152200, oy: 152440, sx: 8, sy: 9.6 },
    { id: 'tyr', name: 'Tyr', x: [-234020, -226715], y: [48340, 54185], ox: 234020, oy: 54185, sx: 39.025, sy: 38.97 },
    { id: 'egypt', name: 'Egypt', x: [20245, 23745], y: [20690, 23300], ox: -20245, oy: 23300, sx: 17.5, sy: 17.5 },
    { id: 'comet', name: 'Comet', x: [-199607, -160019], y: [-109605, -79895], ox: 199607, oy: -79895, sx: 198, sy: 198 },
    { id: 'kansas', name: 'Kansas', x: [-70237, -50542], y: [-118335, -103590], ox: 70237, oy: -103590, sx: 98.4, sy: 98.4 },
    { id: 'frosty', name: 'Frosty', x: [-116440, -106647], y: [2002901, 2009925], ox: 116440, oy: 2009925, sx: 47, sy: 46.82 },
    // the original measures this box from two raw corner positions
    { id: 'aurora', name: 'Aurora', raw: [[51622, -127750, 5998469], [80900, -106250, 5998469]], ox: -51622, oy: -106257, sx: 146, sy: 143 },
    { id: 'main', name: 'The world', x: [-309800, 107000], y: [-139500, 173100], ox: 309800, oy: 173100, sx: 2084, sy: 2084 },
  ],

  WIDTH: 200,
  HEIGHT: 150,

  // raw position -> surface coordinates and height
  surface: function(pos) {
    let [x, y, z] = pos;
    if (x == 0) {
      x = 0.01;
    }
    if (z == 0) {
      z = 0.01;
    }
    const R = TmuiMaps.RADIUS;
    return {
      x: Math.round(Math.atan(x / z) * R),
      y: Math.round(Math.atan(y / Math.sqrt(x * x + z * z)) * R),
      height: Math.sqrt(x * x + y * y + z * z) - R,
    };
  },

  box: function(region) {
    if (!region.raw) {
      return region;
    }
    if (!region.x) {
      const a = TmuiMaps.surface(region.raw[0]);
      const b = TmuiMaps.surface(region.raw[1]);
      region.x = [Math.min(a.x, b.x), Math.max(a.x, b.x)];
      region.y = [Math.min(a.y, b.y), Math.max(a.y, b.y)];
    }
    return region;
  },

  // the full-size world picture sits inside the 200x150 world frame here
  // (same placement gps.swf gives it), so it can be shown sharp
  WORLD_PLACE: { x: 37.55, y: 56.95, w: 922 * 0.16117, h: 544 * 0.16081 },

  region: function(id) {
    return TmuiMaps.REGIONS.find(r => r.id == id) || null;
  },

  // a picture-pixel spot for a position on one chosen map (browsing). inside
  // = whether the position is actually on that map
  locateOn: function(pos, id) {
    if (!pos || pos.length != 3) {
      return null;
    }
    const s = TmuiMaps.surface(pos);
    if (id == 'global') {
      return {
        id: 'global',
        name: 'Planet',
        src: TmuiMaps.base + 'maps/global.svg',
        px: Math.floor((pos[0] + TmuiMaps.RADIUS) / 80000) + 25,
        py: Math.floor((TmuiMaps.RADIUS - pos[1]) / 80000),
        inside: true,
        height: s.height,
        surface: s,
      };
    }
    const r = TmuiMaps.box(TmuiMaps.region(id));
    return {
      id: r.id,
      name: r.name,
      src: `${TmuiMaps.base}maps/${r.id}.svg`,
      px: Math.floor((s.x + r.ox) / r.sx),
      py: Math.floor((r.oy - s.y) / r.sy),
      inside: pos[2] > 0 && s.x >= r.x[0] && s.x <= r.x[1] && s.y >= r.y[0] && s.y <= r.y[1],
      height: s.height,
      surface: s,
    };
  },

  // where each island sits on the world map, in world-frame pixels: the
  // centre of its box run through the world calibration
  islandSpots: function() {
    const world = TmuiMaps.region('main');
    const spots = [];
    for (const r of TmuiMaps.REGIONS) {
      if (r.id == 'main') {
        continue;
      }
      const b = TmuiMaps.box(r);
      const cx = (b.x[0] + b.x[1]) / 2;
      const cy = (b.y[0] + b.y[1]) / 2;
      const px = (cx + world.ox) / world.sx;
      const py = (world.oy - cy) / world.sy;
      if (px >= 0 && px <= TmuiMaps.WIDTH && py >= 0 && py <= TmuiMaps.HEIGHT) {
        spots.push({ id: r.id, name: r.name, px: px, py: py });
      }
    }
    return spots;
  },

  // raw position -> { id, name, src, px, py, height, surface }. px/py are in
  // the 200x150 picture; outside every region it falls back to the globe view
  locate: function(pos) {
    if (!pos || pos.length != 3) {
      return null;
    }
    const s = TmuiMaps.surface(pos);
    if (pos[2] > 0) {
      for (const r of TmuiMaps.REGIONS) {
        const b = TmuiMaps.box(r);
        if (s.x >= b.x[0] && s.x <= b.x[1] && s.y >= b.y[0] && s.y <= b.y[1]) {
          return {
            id: r.id,
            name: r.name,
            src: `${TmuiMaps.base}maps/${r.id}.svg`,
            px: Math.floor((s.x + r.ox) / r.sx),
            py: Math.floor((r.oy - s.y) / r.sy),
            height: s.height,
            surface: s,
          };
        }
      }
    }
    // the whole planet: raw coordinates straight onto the globe picture
    return {
      id: 'global',
      name: 'Open sea',
      src: TmuiMaps.base + 'maps/global.svg',
      px: Math.floor((pos[0] + TmuiMaps.RADIUS) / 80000) + 25,
      py: Math.floor((TmuiMaps.RADIUS - pos[1]) / 80000),
      height: s.height,
      surface: s,
    };
  },
};
