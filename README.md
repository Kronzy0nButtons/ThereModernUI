# ThereModernUI

**[Showcase and live demo](https://kronzy0nbuttons.github.io/ThereModernUI/)** · **[Download the latest release](https://github.com/Kronzy0nButtons/ThereModernUI/releases/latest)**

A replacement UI for the There.com client: the Communicator, the compass slot
(now a full dock with Inventory, Wardrobe, Places, Shop, Auctions and more)
and the Message Bar. Everything it does, with pictures and a live demo, is on
the **[showcase site](https://kronzy0nbuttons.github.io/ThereModernUI/)**.
This README covers installing it and building it yourself.

## Install

1. Download `ThereModernUI-Setup-<version>.exe` from the
   [Releases](../../releases) page.
2. **Close There completely.**
3. Run the setup and pick your There client folder (the one containing
   `There.exe` - common locations are detected automatically).

Before overwriting anything, setup backs up the original files (stock pages,
the community MiniMap page, and the original `BrowserProxy.dll` /
`FlashProxy.dll`).

### Updating

Run the newer setup over your existing install - that's the patch. Your
folders, Quick Bar, routines, scenes, playlists and settings live in the
client's WebView storage, so updating never wipes them. Installed copies
check the latest GitHub release (at most every 15 minutes); when a newer one
exists, the UI locks behind an overlay whose only button opens the download.

### Uninstall

**Settings > Apps > ThereModernUI > Uninstall** (close There first). It
removes the mod's files and restores every original it backed up, so the
stock UI and the original proxy DLLs come back exactly as they were.

## How it works

The client serves its UI pages (HTML/CSS/JS rendered in Edge WebView2) from
an embedded local web server. The local `Resources` directory is part of that
server's webroot and takes precedence over the client's packaged files, so a
file like `Resources\communicator\communicator.html` replaces the stock
communicator the moment the window opens. The replacement pages use the
client's own `There.fsCommand` / `There.fetch` JavaScript bridge
(`Resources/js/framework.js`, shipped with the client), so every game action
works exactly as stock.

Two of the client's DLLs are rebuilt from
[There Edge](https://github.com/hmphus/there-edge) with this repo's patches
on top (`patches/there-edge/`):

- `0001-browserproxy-coupling-injection.patch` - resolves real catalog photos
  for clothing from the owner's own About pages, in-process, no login or
  external service.
- `0002-flashproxy-ingame-keys.patch` - in-game F1-F12 and Action Mode keys
  (WASD, Space, R, Action Chat), the chat feed relay, the pinned dock window
  with click-through shaping, the right-click boost signal for the driving
  cluster, and the same-origin bridge that lets the Shop and Auctions panels
  read the public There webapps.

We never ship a frozen, once-built DLL: every release rebuilds both from
hmphus's newest commit with the patches applied. If upstream changed code a
patch touches, the build **stops** instead of shipping something stale.

## Fork it and build your own

What you need:

- git
- [Inno Setup 6](https://jrsoftware.org/isinfo.php)
  (`winget install --id JRSoftware.InnoSetup -e`)
- Visual Studio Build Tools with the C++ workload + ATL (for the proxy DLLs)
- The GitHub CLI (`gh auth login` once) if you want the release pipeline

### Edit the UI

The whole UI is plain HTML/CSS/JS under `Resources/`. The fastest loop:

1. Edit a file (say `Resources/compass/dock.js`).
2. Copy it into your There client's `Resources` folder.
3. Reload the affected window in-game - no client restart needed for page
   files. DLL changes do need a client restart (run the installer or copy
   the built DLLs with There closed).

Heads up: the client's WebView is Chromium 107. Newer CSS (like
`color-mix()`) fails silently, so test in the game, not just a browser.

### Build the proxies

```
powershell -ExecutionPolicy Bypass -File build-proxies.ps1
```

Clones/updates There Edge to its newest commit, applies the patches, fetches
the WebView2 SDK version upstream pins, and builds both DLLs. To change the
DLLs: edit the working tree under `build/there-edge/`, then regenerate the
patch (`git diff -- FlashProxy > patches/there-edge/0002-...patch`) so the
next clean build applies your change.

### Build the installer

```
powershell -ExecutionPolicy Bypass -File build-installer.ps1
```

Runs the proxy build first, then produces
`dist\ThereModernUI-Setup-<version>.exe` plus its SHA-256. The version number
comes from `Resources/tmui/update.js` - the one version number everywhere.

### The KLIPY key (GIFs)

The GIF search key is never committed. Put yours in `secrets/klipy.key`
(git-ignored); `make-keyfile.ps1` turns it into a scrambled
`Resources/compass/klipykey.js` that the installer ships. Scrambling only
stops casual grepping - a key shipped in a client can always be extracted,
so if it's abused, revoke it in the KLIPY dashboard and release with a new
one. `release.ps1` refuses to run without the key and refuses to commit if
the key shows up anywhere staged.

### Release your fork

1. Point `repo` in `Resources/tmui/update.js` at your `owner/repo` (empty
   disables the update check) and bump `version`.
2. Run:

   ```
   powershell -ExecutionPolicy Bypass -File release.ps1 -Notes "What changed"
   ```

   It refuses if that version is already tagged or isn't newer than the
   latest release, builds fresh proxies and the installer, refreshes the demo
   site, commits and pushes to `production`, tags `v<version>`, and publishes
   the GitHub Release with the setup `.exe` and its SHA-256. Add `-DryRun`
   to preview without publishing.

## Credits

- **BrowserProxy & FlashProxy** - part of
  [There Edge](https://github.com/hmphus/there-edge) by hmphus (MIT; see
  `licenses/`). Rebuilt from his latest source with our patches each release.
- **Icons** - Font Awesome Free (CC BY 4.0).
- **Notification sound** - Universfield.
- **GIFs** - Powered by KLIPY (KLIPY API terms apply).
- **Music** - Search and audio streams via [Piped](https://github.com/TeamPiped/Piped),
  the open source YouTube front end (nothing from it is bundled).
- **Maps** - Map calibration from Myrmex GPS (2007); the island maps are
  ThereModernUI's own vector maps.
- **Slash commands** - The command list is TheChaz's Command Bar
  (`shortcutbar2.json`), read from the player's own install at runtime. None
  of the Command Bar's files are shipped or changed.
- **Testers** - erick758, Edith, bubblegumgirl.
