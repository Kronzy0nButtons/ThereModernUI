// ThereModernUI - chatcommands.js
// Runs the player's /commands from chat, so they work every time and even with
// the Command Bar closed.
// Author: DANKIES
//
// The command list is TheChaz's: shortcutbar2.json from the Command Bar the
// player has installed. We only READ it from their client (nothing of his is
// shipped or changed); without it this module stays switched off.
//
// Why this exists: /commands typed in chat are run by whichever page reads the
// chat feed. When two pages read it, each line reaches only one of them, so a
// line the dock read was lost to the Command Bar. Now the dock runs the lines
// that reach it, the Command Bar runs the rest, and each runs exactly once.
// Values in the list can hold $1..$9, $+, $$ and $hint(...) fills, same
// meaning as in the Command Bar so every command behaves the way it documents.

const TmuiCommands = {
  config: null,        // { name: entry } with aliases expanded, null = off
  session: {},         // per-session values (puppeteer for emote mimic)
  doids: {},           // avatar name (lower case) -> doid

  init: function(tries) {
    tries = tries || 0;
    // the page is ready before the game's address arrives: wait for it, a
    // request sent without it goes nowhere
    if (!There.variables.there_resourceshost) {
      setTimeout(function() {
        TmuiCommands.init(tries);
      }, 500);
      return;
    }
    TmuiCommands.loadPilot();
    There.fetch({
      path: '/Resources/shortcutbar/shortcutbar2.json',
      dataType: 'json',
      success: function(json) {
        const commands = (json && json.commands) || null;
        if (!commands) {
          return;
        }
        const list = {};
        for (const name of Object.keys(commands)) {
          const entry = commands[name];
          list[name.toLowerCase()] = entry;
          for (const alias of entry.aliases || []) {
            list[String(alias).toLowerCase()] = entry;
          }
        }
        TmuiCommands.config = list;
        if (TmuiCommands.onReady) {
          TmuiCommands.onReady();
        }
      },
      error: function() {
        TmuiCommands.config = null;
        // the client's server can be busy at login: a few more goes
        if (tries < 5) {
          setTimeout(function() {
            TmuiCommands.init(tries + 1);
          }, 3000);
        }
      },
    });
  },

  // the game sends the dock the avatar's id but not its name, and commands
  // only run for lines the avatar typed: ask for it (again on avatar switch)
  loadPilot: function() {
    if (!There.variables.there_resourceshost) {
      return;
    }
    There.fetch({
      path: '/ClientLoginGui/pilotInfo',
      dataType: 'xml',
      success: function(xml) {
        const n = xml.getElementsByTagName('PilotName')[0];
        if (n && n.textContent) {
          There.variables.there_pilotname = n.textContent;
        }
      },
    });
  },

  ready: function() {
    return TmuiCommands.config != null;
  },

  storagePrefix: function() {
    const doid = There.variables.there_pilotdoid || There.data.pilotDoid;
    // same keys as the Command Bar, so /home and friends share one setting
    return doid ? `hmph.mods.commandbar.${doid}` : null;
  },

  // "/name a b c". true when it was one of the list's commands
  run: function(text) {
    if (!TmuiCommands.ready() || typeof text != 'string') {
      return false;
    }
    text = text.trim();
    if (!text.startsWith('/')) {
      return false;
    }
    const args = text.split(' ').filter(a => a.length > 0);
    const name = args.shift().slice(1).toLowerCase();
    if (!name || !TmuiCommands.config[name]) {
      return false;
    }
    TmuiCommands.execute(TmuiCommands.config[name], args).catch(function() {
    });
    return true;
  },

  // pick the variant for this many arguments, then do everything it lists
  execute: async function(entry, args) {
    const joined = args.join(' ');
    if (args.length > 0) {
      const variants = entry.arguments;
      if (!variants) {
        return;
      }
      let pick = variants[args.length] !== undefined ? variants[args.length] : variants['+'];
      if (pick === undefined) {
        return;
      }
      if (!Array.isArray(pick)) {
        pick = [pick];
      }
      entry = pick.find(v => v.match === undefined || joined.match(v.match) != null);
      if (!entry) {
        return;
      }
    }
    const fill = function(value) {
      return TmuiCommands.fillValue(value, args);
    };
    const pairs = function(value) {
      return Array.isArray(value) ? value : [value];
    };

    if (entry.storage !== undefined) {
      const prefix = TmuiCommands.storagePrefix();
      if (prefix) {
        for (const pair of pairs(entry.storage)) {
          const key = String(await fill(pair.key)).toLowerCase();
          try {
            localStorage.setItem(`${prefix}.${key}`, await fill(pair.value));
          } catch (error) {
          }
        }
      }
    }
    if (entry.session !== undefined) {
      for (const pair of pairs(entry.session)) {
        TmuiCommands.session[String(await fill(pair.key)).toLowerCase()] = await fill(pair.value);
      }
    }
    if (entry.environment !== undefined) {
      for (const pair of pairs(entry.environment)) {
        There.fetch({
          path: '/environment/top',
          query: { variable: await fill(pair.key), value: await fill(pair.value), modify: '0' },
          dataType: 'xml',
        });
      }
    }
    if (entry.fscommand !== undefined) {
      There.fsCommand(entry.fscommand.command, await fill(entry.fscommand.query));
    }
    if (entry.guicommand !== undefined) {
      TmuiCommands.guiCommand(await fill(entry.guicommand));
    }
    if (entry.scripthook !== undefined) {
      There.fetch({
        path: '/ScriptHook/Invoke',
        query: { Path: entry.scripthook },
        dataType: 'xml',
      });
    }
    if (entry.fetch !== undefined) {
      There.fetch({
        path: entry.fetch.path,
        query: await fill(entry.fetch.query || {}),
        dataType: 'xml',
      });
    }
    if (entry.browser !== undefined) {
      const opts = (typeof entry.browser == 'object') ? entry.browser : { url: entry.browser };
      const url = await fill(opts.url);
      if (opts.autoclose) {
        TmuiCommands.browseAndClose(url);
      } else {
        There.fsCommand('browser', url);
      }
    }
    if (entry.chat !== undefined) {
      const line = await fill(entry.chat);
      if (line) {
        There.sendChat(line);
      }
    }
  },

  // guiCommands posted from the dock's window are ignored by the client, its
  // local command service takes them (the dock's engineGuiCommand does the same)
  guiCommand: function(cmd) {
    const query = (typeof cmd == 'object' && cmd) ? cmd : { action: String(cmd) };
    There.fetch({
      path: '/GuiService/simulateGuiCommand',
      query: { action: query.action, GuiCommandArgs: new URLSearchParams(query).toString() },
      dataType: 'xml',
    });
  },

  // teleport links open a There Central window that only bounces the request
  // to the client. close whatever new window it left after a moment
  browseAndClose: function(url) {
    TmuiCommands.windowNames(function(before) {
      There.fsCommand('browser', url);
      setTimeout(function() {
        TmuiCommands.windowNames(function(after) {
          for (const name of after) {
            if (before.indexOf(name) >= 0) {
              continue;
            }
            There.fetch({
              path: '/ScriptHook/Get',
              query: { Path: `/client/windows/${name}/hasCloseButton` },
              dataType: 'xml',
              success: function(xml) {
                const v = xml.getElementsByTagName('Value')[0];
                if (v && v.textContent == '1') {
                  There.fetch({
                    path: '/ScriptHook/Invoke',
                    query: { Path: `/client/windows/${name}/close` },
                    dataType: 'xml',
                  });
                }
              },
            });
          }
        });
      }, 2000);
    });
  },

  windowNames: function(callback) {
    There.fetch({
      path: '/ScriptHook/Get',
      query: { Path: '/client/windows' },
      dataType: 'xml',
      success: function(xml) {
        const names = [];
        const children = xml.getElementsByTagName('Children')[0];
        for (const child of children ? children.getElementsByTagName('Child') : []) {
          const n = child.getElementsByTagName('Name')[0];
          if (n) {
            names.push(n.textContent);
          }
        }
        callback(names);
      },
      error: function() {
        callback([]);
      },
    });
  },

  /* ------- value fills ------- */

  fillValue: async function(value, args) {
    if (typeof value == 'string') {
      return TmuiCommands.fillText(value, args);
    }
    if (Array.isArray(value)) {
      const out = [];
      for (const v of value) {
        out.push(await TmuiCommands.fillValue(v, args));
      }
      return out;
    }
    if (value && typeof value == 'object') {
      const out = {};
      for (const k of Object.keys(value)) {
        out[k] = await TmuiCommands.fillValue(value[k], args);
      }
      return out;
    }
    return value;
  },

  // "$1" arg, "$+" all args, "$$" a literal $, "$hint(inner)" a lookup. the
  // inner part is filled first, so hints nest: $time($storage(time,%I:%0M%p))
  fillText: async function(text, args) {
    const at = text.indexOf('$');
    if (at < 0) {
      return text;
    }
    let out = text.slice(0, at);
    let tail = text.slice(at + 1);
    if (tail.length == 0) {
      return out;
    }
    const c = tail[0];
    if (c == '$') {
      return out + '$' + await TmuiCommands.fillText(tail.slice(1), args);
    }
    if (c == '+') {
      return out + args.join(' ') + await TmuiCommands.fillText(tail.slice(1), args);
    }
    if (c >= '1' && c <= '9') {
      const i = Number(c) - 1;
      return out + (i < args.length ? args[i] : '') + await TmuiCommands.fillText(tail.slice(1), args);
    }
    const open = tail.indexOf('(');
    if (open < 0) {
      return out;
    }
    const hint = tail.slice(0, open);
    const rest = await TmuiCommands.fillText(tail.slice(open + 1), args);
    const close = rest.indexOf(')');
    if (close < 0) {
      return out;
    }
    const inner = rest.slice(0, close);
    out += await TmuiCommands.hint(hint, inner);
    return out + rest.slice(close + 1);
  },

  // "key" or "key, fallback": a missing key with no fallback stops the command
  lookup: function(inner, read, what) {
    const comma = inner.indexOf(',');
    const key = (comma >= 0 ? inner.slice(0, comma) : inner).toLowerCase();
    const value = read(key);
    if (value !== undefined && value !== null) {
      return String(value);
    }
    if (comma < 0) {
      throw `${what} not found: ${key}`;
    }
    return inner.slice(comma + 1).trimStart();
  },

  hint: async function(hint, inner) {
    switch (hint) {
      case 'var':
        return TmuiCommands.lookup(inner, k => There.variables[k], 'Variable');
      case 'session':
        return TmuiCommands.lookup(inner, k => TmuiCommands.session[k], 'Session value');
      case 'storage': {
        const prefix = TmuiCommands.storagePrefix();
        if (!prefix) {
          throw 'No storage yet';
        }
        return TmuiCommands.lookup(inner, function(k) {
          try {
            return localStorage.getItem(`${prefix}.${k}`);
          } catch (error) {
            return null;
          }
        }, 'Stored value');
      }
      case 'encode':
        return encodeURIComponent(inner);
      case 'nametodoid':
        return String(await TmuiCommands.nameToDoid(inner));
      case 'time':
        return TmuiCommands.formatTime(inner, new Date());
      case 'random': {
        const parts = inner.split(',');
        let lo = Number(parts[0]);
        let hi = Number(parts[1]);
        if (isNaN(lo) || isNaN(hi)) {
          throw 'Not numbers';
        }
        if (lo > hi) {
          [lo, hi] = [hi, lo];
        }
        return String(lo + Math.floor(Math.random() * (hi - lo + 1)));
      }
      default:
        throw `Unknown fill: ${hint}`;
    }
  },

  nameToDoid: function(name) {
    name = String(name || '').toLowerCase();
    if (TmuiCommands.doids[name]) {
      return Promise.resolve(TmuiCommands.doids[name]);
    }
    return new Promise(function(resolve, reject) {
      There.fetch({
        path: '/AvPro/nametodoid',
        query: { avatarname: name, homedoid: There.variables.there_pilotdoid },
        dataType: 'xml',
        success: function(xml) {
          const d = xml.getElementsByTagName('AvatarDoid')[0];
          const n = xml.getElementsByTagName('AvatarName')[0];
          if (d && Number(d.textContent)) {
            TmuiCommands.doids[(n ? n.textContent : name).toLowerCase()] = Number(d.textContent);
            TmuiCommands.doids[name] = Number(d.textContent);
            resolve(Number(d.textContent));
          } else {
            reject(`Avatar not found: ${name}`);
          }
        },
        error: function() {
          reject(`Avatar not found: ${name}`);
        },
      });
    });
  },

  // strftime-style: %a %A %b %B %C %d %f %H %I %m %M %p %S %w %y %Y %%,
  // "%0x" pads with zeros
  formatTime: function(format, now) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const pad = (n, width, zero) => zero ? String(n).padStart(width, '0') : String(n);
    let out = '';
    for (let i = 0; i < format.length; i++) {
      if (format[i] != '%') {
        out += format[i];
        continue;
      }
      let c = format[++i];
      const zero = c == '0';
      if (zero) {
        c = format[++i];
      }
      switch (c) {
        case 'a': out += days[now.getDay()].slice(0, 3); break;
        case 'A': out += days[now.getDay()]; break;
        case 'b': out += months[now.getMonth()].slice(0, 3); break;
        case 'B': out += months[now.getMonth()]; break;
        case 'C': out += String(Math.floor(now.getFullYear() / 100)); break;
        case 'd': out += pad(now.getDate(), 2, zero); break;
        case 'f': out += pad(now.getMilliseconds(), 3, zero); break;
        case 'H': out += pad(now.getHours(), 2, zero); break;
        case 'I': out += pad(((now.getHours() + 11) % 12) + 1, 2, zero); break;
        case 'm': out += pad(now.getMonth() + 1, 2, zero); break;
        case 'M': out += pad(now.getMinutes(), 2, zero); break;
        case 'p': out += now.getHours() < 12 ? 'am' : 'pm'; break;
        case 'S': out += pad(now.getSeconds(), 2, zero); break;
        case 'w': out += String(now.getDay()); break;
        case 'y': out += pad(now.getFullYear() % 100, 2, zero); break;
        case 'Y': out += String(now.getFullYear()); break;
        case '%': out += '%'; break;
        default: throw `Unknown time format: %${c}`;
      }
    }
    return out;
  },
};
