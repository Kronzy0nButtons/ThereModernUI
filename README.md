# ThereModernUI

**[Showcase and live demo](https://kronzy0nbuttons.github.io/ThereModernUI/)** · **[Download the latest release](https://github.com/Kronzy0nButtons/ThereModernUI/releases/latest)**

A replacement addon for the There.com client's original Communicator,
Compass & Message Bar. The client serves its UI pages (HTML/CSS/JS rendered
in Edge WebView2) from an embedded local web server, and files placed in the
client's `Resources` folder shadow the packaged stock pages. The installer
also swaps in rebuilt BrowserProxy and FlashProxy DLLs (see below); the uninstaller restores
the original files and the stock UI.

## Included panels

| Panel | Files | Status |
|---|---|---|
| Communicator | `Resources/communicator/` | Done |
| Add Buddy | built into the communicator | Done |
| Organize view | built into the communicator | Done (server folder editing opens the stock Organizer) |
| Dock (compass slot) | `Resources/compass/` | Done |
| Inventory panel (real photos) | built into the dock | Done |
| Wardrobe panel (real photos) | built into the dock + forked BrowserProxy | Done |
| Message bar (toasts) | `Resources/messagebar/` | Done |
| GIFs (KLIPY) | built into the dock | Done (KLIPY key injected at build time, see below) |

### Chat codes

ModernUI docks talk to each other through ordinary chat lines, so nothing
extra runs anywhere. Everyone else just sees a short tagged line:

- `[TMUI] [GIF] [<KLIPY slug>]` - a shared GIF. Receiving docks look the
  slug up with KLIPY and load it only from KLIPY's CDN, then show it above
  the dock for a few seconds (no rating filter - There is 18+).
- `[TMUI] [DJ] [<YouTube id>]` - Party music sync (older docks sent
  `[TMUI] np:<id>`, which is still understood).
- `[TMUI] [SHADOW] ...` - Shadow mode started/stopped announcements.

### Communicator features

- Modern dark translucent design, rounded corners, soft shadow
- Resizable via bottom-right drag grip (size and state are remembered)
- Live "N online" counter in the titlebar
- Search box that filters the whole list, online-first
- Status dots (green/amber/red/hollow) and an "IM" badge for ThereIM users
- Folder section headers with online/total counts
- Redesigned context menu with destructive actions highlighted
- All stock behavior preserved: IM on double-click, Summon, Email,
  View Profile, Add/Remove Buddy, Ignore, Organize, help, minimize-to-bar,
  UI sounds, and the fade during teleports

### Add Buddy (replaces the stock Qt dialog)

- In-panel dialog with live avatar-name lookup (via the client's local
  `/AvPro/nametodoid` service) - shows "Found <name>" / "No avatar named..."
  as you type, Enter or Add sends the buddy request
- The stock Qt dialog is still reachable from the game's main menu

### Organize view (replaces the stock Organizer for people)

- Toggle with the Organize / Done buttons in the communicator footer
- Show/hide offline people, sort by Folders, A-Z, or Status
- Hover quick actions on every row: IM, and Remove (for buddies)

### Custom folders

- Create, rename, and delete your own folders ("+ Folder" in the Organize
  view; rename/delete via hover icons on the folder row)
- Move anyone with "Move to Folder..." in their context menu; members are
  sorted online-first and folders show online/total counts
- Folders are saved per avatar in the WebView2 profile's localStorage
  (the same mechanism community mods use for settings). They exist only in
  this mod's UI on this machine: the stock Organizer and ThereIM do not see
  them, and clearing the client's web cache resets them
- The game's own server-side folders still render below the custom ones;
  editing those has no scriptable API (native Qt code only), so the Move
  dialog's "Server..." button opens the stock Organizer
- One-way sync: the circular-arrow button in the Organize view copies every
  server folder and its people into your custom folders (merged by name,
  repeatable, never duplicates or deletes). Server folders whose people have
  all been imported are hidden from the list; writing back to server folders
  is not possible without the game's native UI

### Dock (occupies the compass HUD slot)

A compact dock pinned to the bottom of the screen, with panels that slide up
above it:

- **Buttons** you choose in Settings (Friends, Items, Wardrobe, Shop,
  Auctions, Places, Events, Emotes, GIFs, Music, Action Mode, camera views
  and more); hidden ones stay one click away in the **Library**.
- **Quick Bar** - 12 slots for items, outfits and scenes, fired by clicking
  or by **F1-F12** in-game.
- A small heading **compass**, your **Tbux** balance and a Client Bridge
  status light (each optional in Settings > Appearance).
- A mini **music player** (with decorative bars) while music plays.
- Panels: Inventory, Wardrobe, Emotes (favorites, routines, Shadow mode),
  GIFs, Music, Scenes, Settings, About, Library.

Why the compass slot: the client only creates its specific chromeless HUD
windows (compass, communicator, emotions, mediaHud...) - each hardwired to
one page in the compiled client. There is no "open arbitrary HTML as a HUD"
command and no spare slot, so a brand-new floating dock window is not
reachable from mod files. The compass is a HUD that renders at a predictable
spot, so this mod takes over that window and turns it into the dock, keeping
a small compass so navigation is not lost.

> **MiniMap users:** TheChaz's MiniMap also lives in this slot (it puts its
> page at `compass/compass2.html`, the file the engine loads here). The dock
> uses that same file, so it **replaces the MiniMap page** while installed.
> The installer backs the page up and the uninstaller puts it back; the
> MiniMap's other files are never touched.

- Toggle it with the game's **Places -> Compass** menu item, since it now
  lives in that slot.
- The dock sizes its own window to just what's visible, so the transparent
  area around it does not block clicks to the world.

### Inventory & Wardrobe panels

Clean, searchable grids above the dock, read live from the client's local
web server:

- **Inventory** reads `inventoryManager/displayInventoryTable` - every
  possession with its icon, name and status. Item actions run through the
  item's own My Things menu entry, exactly like the game's menus.
- **Wardrobe** reads the `VersionedXmlSvc/*Contents` clothing feeds, with
  real catalog photos (see below).
- Your own folders (nested, per category, per avatar), drag and drop, and
  export/import of the folder setup.

## How clothing/inventory photos work

Inventory items expose a ProductId locally, so the dock resolves their photos
straight from the public catalog (`catalog/product?id=...`). Clothing items
only expose a `poid`, whose ProductId lives on the session-gated About page.

To read that without a login, server, or external process, the mod ships a
small fork of There Edge's **BrowserProxy** (`browserproxy/`). Its injected
`coupling.js` runs inside each About page (same origin - no CORS, no session
problem, it's the owner's own page), reads the Product ID + image, and rewrites
the page title to `TMUI|productId|poid|image|name`. The dock reads that title
back via `/client/windows/<id>/titleBarText`. Everything runs in-process; the
installer swaps the forked DLL in and the uninstaller restores the original.

## The rebuilt proxy DLLs (always from latest upstream)

We never ship a frozen, once-built DLL. Our changes to There Edge live as
small patches in `patches/there-edge/`:

- `0001-browserproxy-coupling-injection.patch` - the photo resolver above.
- `0002-flashproxy-ingame-keys.patch` - two in-game keyboard features:
  - **F1-F12 Quick Bar**: a timer inside the client checks F1-F12 only while a
    There window is in the foreground (keys are observed, never swallowed).
  - **Action Mode keys**: when the game is really in Action Mode (or aiming
    a gun) - detected from the game itself: the cursor is hidden and clipped
    inside the There window, however Action Mode was switched - WASD moves,
    Space jumps (right-click), R reloads the held gun (its Reload action) and
    other letters don't type. Enter opens *Action Chat* (banner on the dock)
    until Enter sends or Esc cancels. A keyboard hook on the game window's
    thread does this, inside There's own process only; Ctrl/Alt combos,
    F-keys and arrows always pass. The dock's Action Mode button follows the
    detected state, and a Settings switch turns the whole mapper off.
  - **UI peek**: Action Mode hides the game's UI, so item actions (Quick Bar,
    R reload) can't be used. For that moment the dock asks FlashProxy to
    hold Ctrl - the game's own "show the cursor" key - and let go right
    after (2s failsafe).
  - **Autoplay**: HUD pages (message bar toasts, dock music) may play sound
    without a click first (`--autoplay-policy=no-user-gesture-required` on
    FlashProxy's HUD-only browser profile).
  Only pages that opt in (`fsCommand('tmuiHotkeys')` / `tmuiKeymap`) use them.

`build-proxies.ps1` clones/updates hmphus's repo to its newest commit, applies
the patches, fetches the WebView2 SDK version upstream pins, builds both DLLs
and records the upstream commit in `build/there-edge-commit.txt`. If upstream
changed the code a patch touches, it **stops** rather than shipping a stale
build - refresh the patch and rerun. `build-installer.ps1` runs it first.

## Install

1. Download `ThereModernUI-Setup-<version>.exe` from the
   [Releases](../../releases) page.
2. **Close There completely.**
3. Run the setup and pick your There client folder (the one containing
   `There.exe` - common locations are detected automatically).

Before overwriting anything, setup backs up the original file (stock pages,
the community MiniMap page, and the original `BrowserProxy.dll` / `FlashProxy.dll`).

## Updating

Run the newer setup over your existing install - that's the patch. Your
folders, Quick Bar, routines, scenes, playlists and settings live in the
client's WebView storage, so updating never wipes them. Originals backed up
by the first install are kept; the mod's own files are never mistaken for
originals.

## Uninstall

Use **Settings > Apps > ThereModernUI > Uninstall** (close There first). It
removes the mod's files and restores every original it backed up, so the
stock UI and the original proxy DLLs come back exactly as they were.

## Building the installer

Requires [Inno Setup 6](https://jrsoftware.org/isinfo.php)
(`winget install --id JRSoftware.InnoSetup -e`), git, and Visual Studio Build
Tools with the C++ workload + ATL (for the proxy rebuild), then:

```
powershell -ExecutionPolicy Bypass -File build-installer.ps1
```

Output: `dist\ThereModernUI-Setup-<version>.exe` plus its SHA-256 (publish
the hash alongside each release).

### The KLIPY key (GIFs)

The key is never committed. Put it in `secrets/klipy.key` (git-ignored) on the
machine that builds releases; `make-keyfile.ps1` turns it into a scrambled
`Resources/compass/klipykey.js` (also git-ignored) that the installer ships.
Scrambling only stops casual grepping: a key used by a client can always be
extracted, so if it's ever abused, revoke it in the KLIPY dashboard, put the
new one in `secrets/klipy.key` and release. `release.ps1` refuses to run
without the key, and refuses to commit if the key shows up anywhere staged.

### Releasing an update

1. Bump `version` in `Resources/tmui/update.js` - the one version number
   (the installer reads it from there).
2. Run the release pipeline:

   ```
   powershell -ExecutionPolicy Bypass -File release.ps1 -Notes "What changed"
   ```

   It refuses if that version is already tagged or isn't newer than the
   latest release, builds (fresh upstream proxies + installer), commits and
   pushes the source to `production`, tags `v<version>`, and publishes the
   GitHub Release with the setup `.exe` and its SHA-256. Add `-DryRun` to
   build and preview without publishing anything. Needs the GitHub CLI,
   signed in once with `gh auth login`.

Every installed copy checks the repo's latest release (once every 6 hours,
GitHub's public API, no key). If it is newer, the dock and the communicator
lock behind an overlay whose only button opens the release page in the game
browser; players close There, run the new setup over the top and restart.
Failed checks never lock anything - only a confirmed newer release does.
Set `repo` in `update.js` to your `owner/repo`; empty disables the check.

## Credits

- **BrowserProxy & FlashProxy** - part of
  [There Edge](https://github.com/hmphus/there-edge) by hmphus (MIT; see
  `licenses/`). Rebuilt from his latest source with our patches each release.
- **Icons** - Font Awesome Free (CC BY 4.0).
- **Notification sound** - Universfield.
- **GIFs** - Powered by KLIPY (KLIPY API terms apply).

## How it works

The client's UI pages live at `/resources/...` on an embedded local HTTP
server and are rendered in WebView2. The local `Resources` directory is part
of that server's webroot and takes precedence over the client's packaged
files, so `Resources\communicator\communicator.html` replaces the stock
communicator at the moment the window opens. The replacement pages use the
client's own `There.fsCommand` / `There.fetch` JavaScript bridge
(`Resources/js/framework.js`, shipped with the client), so every game action
works exactly as stock.
