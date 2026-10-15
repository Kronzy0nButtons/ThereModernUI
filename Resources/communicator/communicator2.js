// ThereModernUI - communicator2.js
// the modern communicator window
// Author: DANKIES
// Based on There Edge by hmphus (MIT licence, see licenses/LICENSE-ThereEdge.md)
There.init({
  minWidth: 200,
  minHeight: 220,
  maxWidth: 560,
  maxHeight: 1000,
  statusRank: {
    available: 0,
    away: 1,
    dnd: 2,
    offline: 3,
  },

  loadSettings: function() {
    let settings = {
      width: 230,
      height: 340,
      state: 'full',
      showOffline: true,
      sort: 'folders',
    };
    try {
      const stored = JSON.parse(localStorage.getItem('communicator2') ?? '{}');
      if (Number.isFinite(stored.width)) {
        settings.width = Math.min(Math.max(stored.width, There.minWidth), There.maxWidth);
      }
      if (Number.isFinite(stored.height)) {
        settings.height = Math.min(Math.max(stored.height, There.minHeight), There.maxHeight);
      }
      if (stored.state == 'bar' || stored.state == 'full') {
        settings.state = stored.state;
      }
      if (stored.showOffline != undefined) {
        settings.showOffline = stored.showOffline == true;
      }
      if (['folders', 'name', 'status'].includes(stored.sort)) {
        settings.sort = stored.sort;
      }
    } catch (error) {
    }
    return settings;
  },

  saveSettings: function() {
    try {
      localStorage.setItem('communicator2', JSON.stringify({
        width: There.data.size.width,
        height: There.data.size.height,
        state: $('.communicator').attr('data-state'),
        showOffline: There.data.showOffline,
        sort: There.data.sort,
      }));
    } catch (error) {
    }
  },

  /* ------- custom folders (stored per avatar) ------- */

  foldersKey: function() {
    return `communicator2.folders.${There.data.pilot?.doid ?? 0}`;
  },

  loadFolders: function() {
    There.data.customFolders = [];
    if (There.data.pilot == undefined) {
      return;
    }
    try {
      const stored = JSON.parse(localStorage.getItem(There.foldersKey()) ?? '{}');
      if (Array.isArray(stored.folders)) {
        There.data.customFolders = stored.folders.filter(f => typeof(f.name) == 'string').map(f => ({
          id: String(f.id),
          name: f.name,
          open: f.open != false,
          members: Array.isArray(f.members) ? f.members.map(String) : [],
        }));
      }
    } catch (error) {
    }
  },

  saveFolders: function() {
    if (There.data.pilot == undefined) {
      return;
    }
    try {
      localStorage.setItem(There.foldersKey(), JSON.stringify({
        folders: There.data.customFolders ?? [],
      }));
    } catch (error) {
    }
  },

  serverFolders: function(folder, results) {
    folder = folder ?? There.data.folder;
    results = results ?? [];
    if (folder == undefined) {
      return results;
    }
    for (let entry of folder.entries) {
      // Nearby changes as people come and go, it's never imported as a folder
      if (entry.type == 'drawer' && There.isNearby(entry)) {
        continue;
      }
      if (entry.type == 'drawer') {
        const members = entry.entries.filter(e => e.type == 'avatar').map(e => e.id);
        if (members.length > 0) {
          results.push({
            name: entry.name,
            members: members,
          });
        }
        There.serverFolders(entry, results);
      }
    }
    return results;
  },

  syncServerFolders: function() {
    if (There.data.pilot == undefined || There.data.folder == undefined) {
      There.showToast('Not ready yet. Try again in a moment.');
      return;
    }
    let foldersAdded = 0;
    let peopleAdded = 0;
    for (let server of There.serverFolders()) {
      let folder = (There.data.customFolders ?? []).find(f => f.name.toLowerCase() == server.name.toLowerCase());
      if (folder == undefined) {
        folder = {
          id: `f${Date.now()}${Math.floor(Math.random() * 1000)}`,
          name: server.name,
          open: false,
          members: [],
        };
        There.data.customFolders.push(folder);
        foldersAdded++;
      }
      for (let doid of server.members) {
        if (There.folderOf(doid) == undefined) {
          folder.members.push(String(doid));
          peopleAdded++;
        }
      }
    }
    if (foldersAdded == 0 && peopleAdded == 0) {
      There.showToast('Everything is already in sync.');
      return;
    }
    There.saveFolders();
    There.renderList();
    There.playSound('menu item activate');
    There.showToast(`Synced ${peopleAdded} ${peopleAdded == 1 ? 'person' : 'people'}, ${foldersAdded} new ${foldersAdded == 1 ? 'folder' : 'folders'}.`);
  },

  showToast: function(text) {
    $('.toast').text(text).attr('data-active', '1');
    There.setNamedTimer('toast', 2400, function() {
      $('.toast').attr('data-active', '0');
    });
  },

  movedDoids: function() {
    let moved = new Set();
    for (let folder of There.data.customFolders ?? []) {
      for (let doid of folder.members) {
        moved.add(doid);
      }
    }
    return moved;
  },

  folderOf: function(doid) {
    return (There.data.customFolders ?? []).find(f => f.members.includes(String(doid)));
  },

  moveToFolder: function(doid, folderId) {
    doid = String(doid);
    for (let folder of There.data.customFolders ?? []) {
      folder.members = folder.members.filter(m => m != doid);
    }
    if (folderId != undefined) {
      const folder = (There.data.customFolders ?? []).find(f => f.id == folderId);
      if (folder != undefined) {
        folder.members.push(doid);
        folder.open = true;
      }
    }
    There.saveFolders();
    There.renderList();
  },

  applySize: function() {
    const size = There.data.size;
    $('.communicator').css('--cc-width', `${size.width}px`);
    $('.communicator').css('--cc-height', `${size.height}px`);
  },

  setView: function(view) {
    $('.communicator').attr('data-view', view);
    $('.titlebar .title .name').text(view == 'organize' ? 'Organize' : 'People');
    There.clearContextMenu();
    There.renderList();
  },

  /* ------- intent router (lets other panels open this one to a view) ------- */
  // other pages (command bar etc) put {action, ts} JSON in localStorage 'communicator2.intent'
  // then open us with guiCommand. Picked up on load and on change.

  intentKey: 'communicator2.intent',

  readIntent: function() {
    try {
      const raw = localStorage.getItem(There.intentKey);
      if (raw == null) {
        return;
      }
      const intent = JSON.parse(raw);
      // only newer than the last one handled, or a leftover key from last session re-fires
      if (intent == undefined || intent.ts == undefined || intent.ts == There.data.lastIntentTs) {
        return;
      }
      There.data.lastIntentTs = intent.ts;
      There.runIntent(intent.action);
    } catch (error) {
    }
  },

  runIntent: function(action) {
    if (action == undefined) {
      return;
    }
    // un-collapse so the view actually shows
    if ($('.communicator').attr('data-state') == 'bar') {
      $('.communicator').attr('data-state', 'full');
      There.saveSettings();
    }
    switch (action) {
      case 'addbuddy': {
        There.openAddBuddy();
        break;
      }
      case 'organize': {
        There.setView('organize');
        break;
      }
      case 'removebuddy': {
        There.setView('organize');
        There.showToast('Remove mode: use the ✕ on any buddy row.');
        break;
      }
      case 'showbuddies':
      case 'people': {
        There.closeDialog();
        There.setView('people');
        break;
      }
    }
  },

  // follow the dock's theme (Settings > Appearance writes "tmui-theme"):
  // accent plus a matching tint on the dark surfaces
  applyTheme: function() {
    let t = null;
    try {
      t = JSON.parse(localStorage.getItem('tmui-theme') || 'null');
    } catch (error) {
    }
    const root = document.documentElement;
    const m = /^#?([0-9a-f]{6})$/i.exec(t && t.accent || '');
    if (m) {
      const n = parseInt(m[1], 16);
      const a = [n >> 16 & 255, n >> 8 & 255, n & 255];
      const mix = function(base, frac) {
        return base.map((b, i) => Math.round(b * (1 - frac) + a[i] * frac)).join(', ');
      };
      root.style.setProperty('--accent', t.accent);
      root.style.setProperty('--accent-rgb', a.join(', '));
      root.style.setProperty('--bg', `rgba(${mix([17, 21, 28], 0.16)}, 0.88)`);
      root.style.setProperty('--bg-menu', `rgb(${mix([28, 35, 45], 0.18)})`);
      root.style.setProperty('--bg-active', `rgba(${a.join(', ')}, 0.18)`);
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-rgb');
      root.style.removeProperty('--bg');
      root.style.removeProperty('--bg-menu');
      root.style.removeProperty('--bg-active');
    }
  },

  onReady: function() {
    // update gate (tmui/update.js), locks the window if there's a newer release
    if (typeof TmuiUpdate != 'undefined') {
      TmuiUpdate.start();
    }
    There.applyTheme();
    window.addEventListener('storage', function(event) {
      if (event.key == 'tmui-theme') {
        There.applyTheme();
      }
    });
    const settings = There.loadSettings();
    There.data.size = {
      width: settings.width,
      height: settings.height,
    };
    There.data.filter = '';
    There.data.showOffline = settings.showOffline;
    There.data.sort = settings.sort;
    There.data.customFolders = [];
    There.applySize();
    $('.communicator').attr('data-state', settings.state);
    $('.controls input[data-id="offline"]').prop('checked', settings.showOffline);
    $('.controls select[data-id="sort"]').val(settings.sort);

    There.fsCommand('setStageWidthHeight', {
      width: settings.width,
      height: settings.height,
    });

    There.fsCommand('setTextureBitDepth', {
      depth: 32,
    });

    new ResizeObserver(function(entries) {
      const rect = entries[0].contentRect;
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      There.fsCommand('setStageWidthHeight', {
        width: width,
        height: height,
      });
      There.fsCommand('setWidthHeight', {
        width: width,
        height: height,
      });
    }).observe($('.communicator')[0]);

    // intents from other panels while we're already open
    window.addEventListener('storage', function(event) {
      if (event.key == There.intentKey) {
        There.readIntent();
      }
    });
    // and one written just before we opened
    There.readIntent();

    // needs the There Cockpit local service. Try to switch it on, then poll and toggle the gate
    There.checkCockpit();
  },

  /* ------- There Cockpit dependency gate (mirrors the dock's) ------- */

  tryActivateCockpit: function() {
    try {
      const fire = function(type) {
        const ev = new KeyboardEvent(type, {
          key: 'L', code: 'KeyL', keyCode: 76, which: 76,
          ctrlKey: true, shiftKey: true, bubbles: true, cancelable: true,
        });
        window.dispatchEvent(ev);
        document.dispatchEvent(ev);
      };
      fire('keydown');
      fire('keyup');
    } catch (error) {
    }
  },

  checkCockpit: function() {
    const host = There.variables.there_resourceshost || '127.0.0.1:9999';
    $.ajax({
      url: `http://${host}/ScriptHook/Get`,
      data: { Path: '/client' },
      dataType: 'xml',
      timeout: 2500,
      success: function() {
        There.setCockpit(true);
      },
      error: function() {
        There.setCockpit(false);
      },
      complete: function() {
        const up = There.data.cockpitUp;
        There.setNamedTimer('cockpit-check', up ? 5000 : 1500, There.checkCockpit);
      },
    });
  },

  setCockpit: function(up) {
    const was = There.data.cockpitUp;
    There.data.cockpitUp = up;
    $('.communicator').attr('data-cockpit', up ? 'up' : 'down');
    if (up && was === false) {
      // service just came up, refetch whatever depends on it
      There.fetchPilotXml();
      There.fetchCommunicatorXml();
    }
  },

  onVariable: function(name, value) {
    if (name == 'there_teleporting') {
      $('.communicator').attr(name.replace('there_', 'data-'), value);
    }

    if (name == 'there_ready' && value == 1) {
      There.fetchPilotXml();
      There.fetchCommunicatorXml();
    }
  },

  fetchPilotXml: function() {
    There.fetch({
      path: '/ClientLoginGui/pilotInfo',
      dataType: 'xml',
      success: function(xml) {
        const xmlAnswer = xml.getElementsByTagName('Answer')[0];
        const doid = Number(xmlAnswer.getElementsByTagName('PilotDoid')[0].childNodes[0].nodeValue);
        const name = xmlAnswer.getElementsByTagName('PilotName')[0].childNodes[0].nodeValue;
        if (doid != 0) {
          There.data.pilot = {
            doid: doid,
            name: name,
          };
          There.loadFolders();
          There.renderList();
        }
      },
      error: function() {
        There.setNamedTimer('pilot', 2000, There.fetchPilotXml);
      },
    });
  },

  fetchCommunicatorXml: function() {
    There.data.ident = Math.random();
    let query = {
      Oid: 0,
      request: There.data.ident,
    };
    if (There.data.version != undefined) {
      query.LastVer = There.data.version;
    }
    There.fetch({
      path: '/VersionedXmlSvc/communicatorData',
      query: query,
      throttle: 60,
      dataType: 'xml',
      success: function(xml) {
        There.onCommunicatorXml(xml);
      },
      complete: function() {
        There.setNamedTimer('fetch', 1000, There.fetchCommunicatorXml);
      },
    });
  },

  onCommunicatorXml: function(xml) {
    let folder = {
      id: 'root',
      entries: [],
    };
    const xmlAnswer = xml.getElementsByTagName('Answer')[0];
    const xmlResult = xmlAnswer.getElementsByTagName('Result')[0];
    if (xmlResult.childNodes[0].nodeValue != 1) {
      return;
    }
    const xmlVersion = xmlAnswer.getElementsByTagName('version')[0];
    There.data.version = xmlVersion.childNodes[0].nodeValue;
    const xmlData = xmlAnswer.getElementsByTagName('CommunicatorData')[0];
    There.onCommunicatorFolderXml(xmlData, folder, There.data.folder?.entries ?? [], There.data.folder);
    There.data.folder = folder;
    There.renderList();
  },

  onCommunicatorFolderXml: function(xml, folder, previousEntries, previousFolder) {
    for (let xmlChild of xml.childNodes) {
      switch (xmlChild.nodeName.toLowerCase()) {
        case 'name': {
          folder.id = xmlChild.childNodes[0].nodeValue.toLowerCase();
          folder.name = xmlChild.childNodes[0].nodeValue;
          if (previousFolder == undefined) {
            previousFolder = previousEntries.find(e => e.type == 'drawer' && e.id == folder.id);
          }
          folder.open = previousFolder?.open ?? true;
          break;
        }
        case 'folder': {
          let entry = {
            type: 'drawer',
            entries: [],
          };
          There.onCommunicatorFolderXml(xmlChild, entry, previousFolder?.entries ?? []);
          folder.entries.push(entry);
          break;
        }
        case 'avatar': {
          let entry = {
            type: 'avatar',
            id: String(xmlChild.getElementsByTagName('Doid')[0].childNodes[0].nodeValue),
            name: xmlChild.getElementsByTagName('Name')[0].childNodes[0].nodeValue,
            group: xmlChild.getElementsByTagName('Group')[0].childNodes[0].nodeValue.toLowerCase(),
            status: xmlChild.getElementsByTagName('Avail')[0].childNodes[0].nodeValue.toLowerCase(),
            client: xmlChild.getElementsByTagName('ClientType')[0].childNodes[0].nodeValue.toLowerCase(),
          };
          switch (entry.group) {
            case 'buddy': {
              entry.menus = [{
                text: 'IM',
                action: 'im',
              }, {
                text: 'Summon',
                action: 'summon',
              }, {
                text: 'Email',
                action: 'email',
              }, {
                text: 'View Profile',
                action: 'profile',
              }, {
                text: 'Move to Folder…',
                local: 'move',
              }, {
                text: 'Remove Buddy',
                action: 'removeBuddy',
                danger: true,
              }];
              break;
            }
            case 'none': {
              entry.menus = [{
                text: 'IM',
                action: 'im',
              }, {
                text: 'Summon',
                action: 'summon',
              }, {
                text: 'Email',
                action: 'email',
              }, {
                text: 'Add Buddy',
                action: 'addBuddy',
              }, {
                text: 'View Profile',
                action: 'profile',
              }, {
                text: 'Move to Folder…',
                local: 'move',
              }, {
                text: 'Ignore',
                action: 'addIgnore',
                danger: true,
              }];
              break;
            }
            default: {
              entry.menus = [];
              break;
            }
          }
          folder.entries.push(entry);
          break;
        }
      }
    }
  },

  countAvatars: function(folder, excluded) {
    let online = 0;
    let total = 0;
    for (let entry of folder.entries) {
      if (entry.type == 'avatar') {
        if (excluded != undefined && excluded.has(entry.id)) {
          continue;
        }
        total++;
        if (entry.status != 'offline') {
          online++;
        }
      } else if (entry.type == 'drawer') {
        const counts = There.countAvatars(entry, excluded);
        online += counts.online;
        total += counts.total;
      }
    }
    return {
      online: online,
      total: total,
    };
  },

  collectAvatars: function(folder, results) {
    for (let entry of folder.entries) {
      if (entry.type == 'avatar') {
        results.push(entry);
      } else if (entry.type == 'drawer') {
        There.collectAvatars(entry, results);
      }
    }
    return results;
  },

  avatarMap: function() {
    let map = {};
    for (let entry of There.collectAvatars(There.data.folder, [])) {
      map[entry.id] = entry;
    }
    return map;
  },

  isVisible: function(entry) {
    const filter = There.data.filter.trim().toLowerCase();
    if (filter != '' && !entry.name.toLowerCase().includes(filter)) {
      return false;
    }
    const organize = $('.communicator').attr('data-view') == 'organize';
    if (organize && !There.data.showOffline && entry.status == 'offline') {
      return false;
    }
    return true;
  },

  renderList: function() {
    let divItems = $('.communicator .items');
    $(divItems).empty();
    if (There.data.folder == undefined) {
      return;
    }
    const organize = $('.communicator').attr('data-view') == 'organize';
    const filter = There.data.filter.trim().toLowerCase();
    const sort = organize ? There.data.sort : (filter != '' ? 'status' : 'folders');
    if (sort == 'folders') {
      const map = There.avatarMap();
      const moved = There.movedDoids();
      There.data.renderedIds = new Set();
      for (let folder of There.data.customFolders ?? []) {
        There.renderCustomFolder(divItems, folder, map);
      }
      for (let entry of There.data.folder.entries) {
        There.renderEntry(divItems, entry, 0, moved);
      }
      const nearby = There.findNearby(There.data.folder);
      if (nearby) {
        There.renderNearby(divItems, nearby);
      }
      if (There.data.folder.entries.length == 0 && (There.data.customFolders ?? []).length == 0) {
        $('<div class="empty"></div>').text('Your list is empty. Add a buddy to get started.').appendTo($(divItems));
      } else if ($(divItems).children().length == 0) {
        $('<div class="empty"></div>').text('No one matches.').appendTo($(divItems));
      }
    } else {
      let matches = There.collectAvatars(There.data.folder, []).filter(There.isVisible);
      if (sort == 'status') {
        matches.sort((a, b) => There.statusRank[a.status] - There.statusRank[b.status] || a.name.localeCompare(b.name));
      } else {
        matches.sort((a, b) => a.name.localeCompare(b.name));
      }
      for (let entry of matches) {
        There.renderAvatar(divItems, entry, 0);
      }
      if (matches.length == 0) {
        $('<div class="empty"></div>').text(filter != '' ? 'No one matches your search.' : 'No one to show.').appendTo($(divItems));
      }
    }
    There.updateCount();
  },

  renderEntry: function(divItems, entry, indent, moved) {
    if (entry.type == 'avatar') {
      if (!moved.has(entry.id) && There.isVisible(entry) && !There.data.renderedIds.has(entry.id)) {
        There.data.renderedIds.add(entry.id);
        There.renderAvatar(divItems, entry, indent);
      }
    } else if (entry.type == 'drawer') {
      // Nearby is the one server folder we keep: it's who is around you right
      // now, not a way to organize buddies. it gets its own section at the end
      if (There.isNearby(entry)) {
        return;
      }
      // other server side folders are ignored, their people join the flat
      // list. organize with your own folders instead
      for (let child of entry.entries) {
        There.renderEntry(divItems, child, 0, moved);
      }
    }
  },

  isNearby: function(entry) {
    return entry.type == 'drawer' && String(entry.name || entry.id || '').trim().toLowerCase() == 'nearby';
  },

  findNearby: function(folder) {
    for (let entry of (folder?.entries ?? [])) {
      if (There.isNearby(entry)) {
        return entry;
      }
      if (entry.type == 'drawer') {
        const inner = There.findNearby(entry);
        if (inner) {
          return inner;
        }
      }
    }
    return null;
  },

  // everyone near you, buddies included (it answers "who's here", so a buddy
  // shows both in your list and here)
  renderNearby: function(divItems, entry) {
    const people = There.collectAvatars(entry, []).filter(There.isVisible);
    const seen = new Set();
    const unique = people.filter(function(p) {
      if (seen.has(p.id)) {
        return false;
      }
      seen.add(p.id);
      return true;
    });
    if (unique.length == 0) {
      return;
    }
    let divItem = $('<div class="item"></div>');
    $(divItem).attr('data-type', 'drawer');
    $(divItem).attr('data-nearby', '1');
    $(divItem).attr('data-id', entry.id);
    $(divItem).attr('data-drawer', entry.open ? 'open' : 'closed');
    $(divItem).css('--indent', 0);
    $('<div class="chevron"></div>').text('▸').appendTo($(divItem));
    $('<div class="name"></div>').text(entry.name || 'Nearby').appendTo($(divItem));
    $('<div class="count"></div>').text(String(unique.length)).appendTo($(divItem));
    $(divItem).on('click', function() {
      There.clearContextMenu();
      There.playSound('control down');
      entry.open = !entry.open;
      There.renderList();
    });
    $(divItem).appendTo($(divItems));
    if (entry.open) {
      unique.sort((a, b) => There.statusRank[a.status] - There.statusRank[b.status] || a.name.localeCompare(b.name));
      for (let person of unique) {
        There.renderAvatar(divItems, person, 1);
      }
    }
  },

  renderDrawer: function(divItems, entry, indent, moved) {
    const counts = There.countAvatars(entry, moved);
    if (counts.total == 0 && There.countAvatars(entry).total > 0) {
      return;
    }
    let divItem = $('<div class="item"></div>');
    $(divItem).attr('data-type', 'drawer');
    $(divItem).attr('data-id', entry.id);
    $(divItem).attr('data-drawer', entry.open ? 'open' : 'closed');
    $(divItem).css('--indent', indent);
    $('<div class="chevron"></div>').text('▸').appendTo($(divItem));
    $('<div class="name"></div>').text(entry.name).appendTo($(divItem));
    $('<div class="count"></div>').text(`${counts.online}/${counts.total}`).appendTo($(divItem));
    $(divItem).on('click', function() {
      There.clearContextMenu();
      There.playSound('control down');
      entry.open = !entry.open;
      There.renderList();
    });
    $(divItem).appendTo($(divItems));
    if (entry.open) {
      for (let child of entry.entries) {
        There.renderEntry(divItems, child, indent + 1, moved);
      }
    }
  },

  renderCustomFolder: function(divItems, folder, map) {
    let members = folder.members.map(doid => map[doid]).filter(e => e != undefined);
    let online = members.filter(e => e.status != 'offline').length;
    let divItem = $('<div class="item"></div>');
    $(divItem).attr('data-type', 'drawer');
    $(divItem).attr('data-custom', '1');
    $(divItem).attr('data-id', folder.id);
    $(divItem).attr('data-drawer', folder.open ? 'open' : 'closed');
    $(divItem).css('--indent', 0);
    $('<div class="chevron"></div>').text('▸').appendTo($(divItem));
    $('<div class="name"></div>').text(folder.name).appendTo($(divItem));
    let divActions = $('<div class="actions"></div>');
    let divRename = $('<div class="action" title="Rename folder"></div>').text('✎');
    $(divRename).on('click', function(event) {
      event.stopPropagation();
      There.playSound('control down');
      There.openFolderDialog('rename', folder);
    }).on('mousedown', function(event) {
      event.stopPropagation();
    }).appendTo($(divActions));
    let divDelete = $('<div class="action danger" title="Delete folder (people return to the main list)"></div>').text('✕');
    $(divDelete).on('click', function(event) {
      event.stopPropagation();
      There.playSound('control down');
      There.data.customFolders = There.data.customFolders.filter(f => f.id != folder.id);
      There.saveFolders();
      There.renderList();
    }).on('mousedown', function(event) {
      event.stopPropagation();
    }).appendTo($(divActions));
    $(divActions).appendTo($(divItem));
    $('<div class="count"></div>').text(`${online}/${members.length}`).appendTo($(divItem));
    $(divItem).on('click', function() {
      There.clearContextMenu();
      There.playSound('control down');
      folder.open = !folder.open;
      There.saveFolders();
      There.renderList();
    });
    $(divItem).appendTo($(divItems));
    if (folder.open) {
      members.sort((a, b) => There.statusRank[a.status] - There.statusRank[b.status] || a.name.localeCompare(b.name));
      for (let entry of members) {
        if (There.isVisible(entry)) {
          There.renderAvatar(divItems, entry, 1);
        }
      }
    }
  },

  renderAvatar: function(divItems, entry, indent) {
    let divItem = $('<div class="item"></div>');
    $(divItem).attr('data-type', 'avatar');
    $(divItem).attr('data-id', entry.id);
    $(divItem).attr('data-status', entry.status);
    $(divItem).attr('data-client', entry.client);
    $(divItem).css('--indent', indent);
    if (There.data.menu?.id == entry.id) {
      $(divItem).attr('data-hover', '1');
    }
    $('<div class="dot"></div>').appendTo($(divItem));
    $('<div class="name"></div>').text(entry.name).on('click', function(event) {
      event.stopPropagation();
      There.playSound('control down');
      if (There.data.menu?.id == entry.id) {
        There.clearContextMenu();
      } else {
        There.setupContextMenu(divItem, entry);
      }
    }).appendTo($(divItem));
    if (entry.client == 'thereim') {
      $('<div class="badge"></div>').text('ThereIM').appendTo($(divItem));
    }
    $(divItem).on('mousemove', function(event) {
      event.stopPropagation();
    });
    $(divItem).appendTo($(divItems));
  },

  updateCount: function() {
    if (There.data.folder == undefined) {
      return;
    }
    // your people only: whoever happens to be nearby isn't "online" in your list
    const counts = There.countAvatars({
      entries: There.data.folder.entries.filter(e => !There.isNearby(e)),
    });
    $('.titlebar .title .count').text(counts.total > 0 ? `${counts.online} online` : '');
  },

  clearContextMenu: function() {
    There.clearNamedTimer('context-menu');
    $('.contextmenu').attr('data-active', '0');
    $('.communicator .items .item').attr('data-hover', '0');
    There.data.menu = {};
  },

  setupContextMenu: function(divItem, entry) {
    if (entry.menus.length == 0) {
      return;
    }
    let divContextMenu = $('.contextmenu');
    $(divContextMenu).empty();
    $('.communicator .items .item').attr('data-hover', '0');
    $('<div class="header"></div>').text(entry.name).appendTo($(divContextMenu));
    for (let menu of entry.menus) {
      let divMenuItem = $('<div class="item"></div>');
      $(divMenuItem).attr('data-enabled', '1');
      if (menu.danger) {
        $(divMenuItem).attr('data-danger', '1');
      }
      $(divMenuItem).text(menu.text);
      $(divMenuItem).on('mouseover', function() {
        There.playSound('enabled menu item rollover');
      }).on('mousedown', function(event) {
        event.stopPropagation();
      }).on('click', function() {
        There.playSound('menu item activate');
        There.clearContextMenu();
        if (menu.local == 'move') {
          There.openMoveDialog(entry);
          return;
        }
        let query = {
          av: entry.id,
          action: menu.action,
        };
        if (menu.action == 'email') {
          query.originCode = 7;
        }
        if (menu.action == 'addIgnore') {
          query.avName = entry.name;
        }
        There.guiCommand(query);
      });
      $(divMenuItem).appendTo($(divContextMenu));
    }
    const menuWidth = 130;
    const menuHeight = 34 + entry.menus.length * 22;
    const panelWidth = $('.communicator').width();
    const panelHeight = $('.communicator').height();
    const top = $(divItem).offset().top;
    const x = Math.max(8, panelWidth - menuWidth - 14);
    const y = Math.min(Math.max(top + 2, 32), panelHeight - menuHeight - 8);
    $(divContextMenu).css({
      left: x,
      top: y,
    }).attr('data-active', '1');
    $(divItem).attr('data-hover', '1');
    There.data.menu = {
      id: entry.id,
      top: top,
    };
  },

  /* ------- dialogs ------- */

  openDialog: function(name) {
    There.clearContextMenu();
    $('.overlay').attr('data-dialog', name).attr('data-active', '1');
    There.playSound('dialog appear');
  },

  closeDialog: function() {
    There.clearNamedTimer('buddy-lookup');
    There.clearNamedTimer('buddy-close');
    $('.overlay').attr('data-active', '0');
    delete There.data.addBuddy;
    delete There.data.folderDialog;
    delete There.data.moveDialog;
  },

  openAddBuddy: function() {
    There.data.addBuddy = {
      state: 'idle',
    };
    $('.dialog[data-id="addbuddy"] input').val('').prop('disabled', false);
    $('.dialog[data-id="addbuddy"] .status').attr('data-state', 'idle').text('');
    $('.dialog[data-id="addbuddy"] .button[data-id="add"]').attr('data-enabled', '0');
    There.openDialog('addbuddy');
    There.fsCommand('getKeyboardFocus');
    $('.dialog[data-id="addbuddy"] input').focus();
  },

  lookupBuddy: function() {
    const name = $('.dialog[data-id="addbuddy"] input').val().trim();
    let divStatus = $('.dialog[data-id="addbuddy"] .status');
    let divAdd = $('.dialog[data-id="addbuddy"] .button[data-id="add"]');
    $(divAdd).attr('data-enabled', '0');
    if (There.data.addBuddy == undefined || name == '') {
      $(divStatus).attr('data-state', 'idle').text('');
      return;
    }
    There.data.addBuddy = {
      state: 'searching',
      query: name,
    };
    $(divStatus).attr('data-state', 'idle').text('Searching…');
    There.fetch({
      path: '/AvPro/nametodoid',
      query: {
        avatarname: name.toLowerCase(),
        homedoid: There.data.pilot?.doid ?? 0,
      },
      dataType: 'xml',
      success: function(xml) {
        const addBuddy = There.data.addBuddy;
        if (addBuddy == undefined || addBuddy.query != name) {
          return;
        }
        let found = false;
        try {
          const xmlAnswer = xml.getElementsByTagName('Answer')[0];
          const xmlResult = xmlAnswer.getElementsByTagName('Result')[0];
          if (xmlResult.childNodes[0].nodeValue == 1) {
            const doid = Number(xmlAnswer.getElementsByTagName('AvatarDoid')[0].childNodes[0].nodeValue);
            const avName = xmlAnswer.getElementsByTagName('AvatarName')[0].childNodes[0].nodeValue;
            if (doid != 0) {
              found = true;
              There.data.addBuddy = {
                state: 'found',
                query: name,
                doid: doid,
                name: avName,
              };
              $(divStatus).attr('data-state', 'found').text(`Found ${avName}`);
              $(divAdd).attr('data-enabled', '1');
            }
          }
        } catch (error) {
        }
        if (!found) {
          There.data.addBuddy = {
            state: 'notfound',
            query: name,
          };
          $(divStatus).attr('data-state', 'notfound').text(`No avatar named “${name}”`);
        }
      },
      error: function() {
        const addBuddy = There.data.addBuddy;
        if (addBuddy == undefined || addBuddy.query != name) {
          return;
        }
        $(divStatus).attr('data-state', 'notfound').text('Lookup failed. Try again.');
      },
    });
  },

  sendAddBuddy: function() {
    const addBuddy = There.data.addBuddy;
    if (addBuddy == undefined || addBuddy.state != 'found') {
      return;
    }
    There.playSound('menu item activate');
    There.guiCommand({
      av: addBuddy.doid,
      action: 'addBuddy',
    });
    $('.dialog[data-id="addbuddy"] input').prop('disabled', true);
    $('.dialog[data-id="addbuddy"] .button[data-id="add"]').attr('data-enabled', '0');
    $('.dialog[data-id="addbuddy"] .status').attr('data-state', 'sent').text(`Buddy request sent to ${addBuddy.name}`);
    There.setNamedTimer('buddy-close', 1600, There.closeDialog);
  },

  openFolderDialog: function(mode, folder, moveDoid) {
    There.data.folderDialog = {
      mode: mode,
      folderId: folder?.id,
      moveDoid: moveDoid,
    };
    $('.dialog[data-id="folder"] .title').text(mode == 'rename' ? 'Rename Folder' : 'New Folder');
    $('.dialog[data-id="folder"] input').val(folder?.name ?? '');
    $('.dialog[data-id="folder"] .status').attr('data-state', 'idle').text('');
    $('.dialog[data-id="folder"] .button[data-id="ok"]').attr('data-enabled', folder?.name ? '1' : '0');
    There.openDialog('folder');
    There.fsCommand('getKeyboardFocus');
    $('.dialog[data-id="folder"] input').focus();
  },

  validateFolderName: function() {
    const dialog = There.data.folderDialog;
    const name = $('.dialog[data-id="folder"] input').val().trim();
    let divStatus = $('.dialog[data-id="folder"] .status');
    let ok = false;
    if (name == '') {
      $(divStatus).attr('data-state', 'idle').text('');
    } else if ((There.data.customFolders ?? []).some(f => f.name.toLowerCase() == name.toLowerCase() && f.id != dialog?.folderId)) {
      $(divStatus).attr('data-state', 'notfound').text('A folder with that name exists.');
    } else {
      $(divStatus).attr('data-state', 'idle').text('');
      ok = true;
    }
    $('.dialog[data-id="folder"] .button[data-id="ok"]').attr('data-enabled', ok ? '1' : '0');
    return ok ? name : undefined;
  },

  submitFolderDialog: function() {
    const dialog = There.data.folderDialog;
    const name = There.validateFolderName();
    if (dialog == undefined || name == undefined) {
      return;
    }
    There.playSound('menu item activate');
    if (dialog.mode == 'rename') {
      const folder = (There.data.customFolders ?? []).find(f => f.id == dialog.folderId);
      if (folder != undefined) {
        folder.name = name;
      }
      There.saveFolders();
      There.closeDialog();
      There.renderList();
    } else {
      const folder = {
        id: `f${Date.now()}${Math.floor(Math.random() * 1000)}`,
        name: name,
        open: true,
        members: [],
      };
      There.data.customFolders.push(folder);
      There.saveFolders();
      const moveDoid = dialog.moveDoid;
      There.closeDialog();
      if (moveDoid != undefined) {
        There.moveToFolder(moveDoid, folder.id);
      } else {
        There.renderList();
      }
    }
  },

  openMoveDialog: function(entry) {
    There.data.moveDialog = {
      doid: entry.id,
      name: entry.name,
    };
    $('.dialog[data-id="move"] .title').text(`Move ${entry.name} to…`);
    let divList = $('.dialog[data-id="move"] .list');
    $(divList).empty();
    const current = There.folderOf(entry.id);
    for (let folder of There.data.customFolders ?? []) {
      let divRow = $('<div class="row"></div>');
      if (folder.id == current?.id) {
        $(divRow).attr('data-current', '1');
      }
      $('<div class="glyph"></div>').text(folder.id == current?.id ? '●' : '▸').appendTo($(divRow));
      $('<div class="label"></div>').text(folder.name).appendTo($(divRow));
      $('<div class="count"></div>').text(folder.members.length).appendTo($(divRow));
      $(divRow).on('click', function() {
        There.playSound('menu item activate');
        There.closeDialog();
        There.moveToFolder(entry.id, folder.id);
      });
      $(divRow).appendTo($(divList));
    }
    if (current != undefined) {
      let divRow = $('<div class="row"></div>');
      $('<div class="glyph"></div>').text('←').appendTo($(divRow));
      $('<div class="label"></div>').text('Remove from folder').appendTo($(divRow));
      $(divRow).on('click', function() {
        There.playSound('menu item activate');
        There.closeDialog();
        There.moveToFolder(entry.id, undefined);
      });
      $(divRow).appendTo($(divList));
    }
    let divNew = $('<div class="row"></div>');
    $('<div class="glyph"></div>').text('+').appendTo($(divNew));
    $('<div class="label"></div>').text('New folder…').appendTo($(divNew));
    $(divNew).on('click', function() {
      There.playSound('control down');
      There.openFolderDialog('create', undefined, entry.id);
    });
    $(divNew).appendTo($(divList));
    There.openDialog('move');
  },
});

$(document).ready(function() {
  $('.titlebar').on('mousedown', function(event) {
    if (event.which == 1) {
      There.fsCommand('beginDragWindow');
    }
    There.clearContextMenu();
    event.preventDefault();
    event.stopPropagation();
  });

  $('.titlebar .button').on('mouseover', function() {
    There.playSound('control rollover');
  }).on('mousedown', function(event) {
    There.playSound('control down');
    event.stopPropagation();
    There.clearContextMenu();
  }).on('mouseup', function() {
    There.playSound('control up');
  });

  $('.titlebar .buttons .button[data-id="bar"]').on('click', function() {
    $('.communicator').attr('data-state', 'bar');
    There.saveSettings();
  });

  $('.titlebar .buttons .button[data-id="full"]').on('click', function() {
    $('.communicator').attr('data-state', 'full');
    There.saveSettings();
  });

  $('.titlebar .buttons .button[data-id="help"]').on('click', function() {
    There.fsCommand('browser', {
      target: 'There_Help',
      urlGen: 'HelpCommunicatorUrl',
    });
  });

  $('.titlebar .buttons .button[data-id="close"]').on('click', function() {
    There.fsCommand('closeWindow');
  });

  $('.footer .button').on('mouseover', function() {
    There.playSound('control rollover');
  }).on('mousedown', function(event) {
    There.playSound('control down');
    event.stopPropagation();
  }).on('mouseup', function() {
    There.playSound('control up');
  });

  $('.footer .button[data-id="buddy"], .footer .button[data-id="buddy2"]').on('click', function() {
    There.openAddBuddy();
  });

  $('.footer .button[data-id="organize"]').on('click', function() {
    There.setView('organize');
  });

  $('.footer .button[data-id="done"]').on('click', function() {
    There.setView('people');
  });

  $('.footer .button[data-id="newfolder"]').on('click', function() {
    There.openFolderDialog('create');
  });

  $('.controls input[data-id="offline"]').on('change', function() {
    There.data.showOffline = $(this).prop('checked');
    There.saveSettings();
    There.renderList();
  });

  $('.controls select[data-id="sort"]').on('change', function() {
    There.data.sort = $(this).val();
    There.saveSettings();
    There.renderList();
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });

  $('.search input').on('click', function() {
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
      There.data.filter = '';
      $('.search').attr('data-filled', '0');
      There.renderList();
    }
  }).on('input', function() {
    There.clearContextMenu();
    There.data.filter = $(this).val();
    $('.search').attr('data-filled', There.data.filter.length > 0 ? '1' : '0');
    There.renderList();
  });

  $('.search .clear').on('click', function() {
    $('.search input').val('');
    There.data.filter = '';
    $('.search').attr('data-filled', '0');
    There.renderList();
  });

  $('.overlay').on('mousedown', function(event) {
    if (event.target == this) {
      There.closeDialog();
    }
    event.stopPropagation();
  });

  $('.dialog[data-id="addbuddy"] input').on('click', function() {
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
      There.closeDialog();
    }
    if (event.key == 'Enter') {
      There.sendAddBuddy();
    }
  }).on('input', function() {
    There.setNamedTimer('buddy-lookup', 350, There.lookupBuddy);
  });

  $('.dialog[data-id="addbuddy"] .button[data-id="cancel"]').on('click', function() {
    There.playSound('control up');
    There.closeDialog();
  });

  $('.dialog[data-id="addbuddy"] .button[data-id="add"]').on('click', function() {
    There.sendAddBuddy();
  });

  $('.dialog[data-id="folder"] input').on('click', function() {
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
      There.closeDialog();
    }
    if (event.key == 'Enter') {
      There.submitFolderDialog();
    }
  }).on('input', function() {
    There.validateFolderName();
  });

  $('.dialog[data-id="folder"] .button[data-id="cancel"]').on('click', function() {
    There.playSound('control up');
    There.closeDialog();
  });

  $('.dialog[data-id="folder"] .button[data-id="ok"]').on('click', function() {
    There.submitFolderDialog();
  });

  $('.dialog[data-id="move"] .button[data-id="cancel"]').on('click', function() {
    There.playSound('control up');
    There.closeDialog();
  });

  $('.dialog[data-id="move"] .button[data-id="stockorg"]').on('click', function() {
    There.playSound('menu item activate');
    There.closeDialog();
    There.fetch({
      path: '/ScriptHook/Invoke',
      query: {
        Path: '/mainMenu/My Things/Organize.../activate',
      },
      dataType: 'xml',
    });
  });

  $('.contextmenu').on('mousemove', function(event) {
    There.clearNamedTimer('context-menu');
    event.stopPropagation();
  });

  $('.communicator').on('mouseleave', function(event) {
    There.setNamedTimer('context-menu', 500, function() {
      There.clearContextMenu();
    });
  }).on('mousemove', function() {
    There.setNamedTimer('context-menu', 350, function() {
      There.clearContextMenu();
    });
  });

  $('.communicator .items').on('scroll', function() {
    There.clearContextMenu();
  });

  $('.communicator .grip').on('pointerdown', function(event) {
    if (event.which != 1) {
      return;
    }
    There.clearContextMenu();
    this.setPointerCapture(event.pointerId);
    There.data.resizing = {
      startX: event.clientX,
      startY: event.clientY,
      width: There.data.size.width,
      height: There.data.size.height,
    };
    event.preventDefault();
    event.stopPropagation();
  }).on('pointermove', function(event) {
    const resizing = There.data.resizing;
    if (resizing == undefined) {
      return;
    }
    const width = resizing.width + event.clientX - resizing.startX;
    const height = resizing.height + event.clientY - resizing.startY;
    There.data.size = {
      width: Math.min(Math.max(Math.round(width), There.minWidth), There.maxWidth),
      height: Math.min(Math.max(Math.round(height), There.minHeight), There.maxHeight),
    };
    There.applySize();
    event.preventDefault();
    event.stopPropagation();
  }).on('pointerup pointercancel', function(event) {
    if (There.data.resizing == undefined) {
      return;
    }
    delete There.data.resizing;
    There.saveSettings();
    event.preventDefault();
    event.stopPropagation();
  }).on('mousedown', function(event) {
    event.stopPropagation();
  });
});
