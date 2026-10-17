# ThereModernUI - release.ps1
# Builds a release, pushes the code and publishes it on GitHub.
# Author: DANKIES
#
#   powershell -ExecutionPolicy Bypass -File release.ps1             full release
#   powershell -ExecutionPolicy Bypass -File release.ps1 -DryRun     build and show, publish nothing
#   add -Notes "what changed" for the release notes, or -NotesFile <path.md>
#   (a notes file that has its own "**Install / update:**" line keeps it)
#
# Bump the version in Resources\tmui\update.js first, it won't re-release an
# existing tag or anything older than what's already out.
# Once it's published, installed copies pick it up on their next update check.
#
# Needs git and the GitHub CLI (sign in once with: gh auth login)

param(
  [switch]$DryRun,
  [string]$Notes = '',
  [string]$NotesFile = ''
)
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$repo = 'Kronzy0nButtons/ThereModernUI'
$branch = 'production'

function Run($exe, [string[]]$argv) {
  & $exe @argv
  if ($LASTEXITCODE -ne 0) { throw "$exe $($argv -join ' ') failed ($LASTEXITCODE)" }
}

function Newer([string]$a, [string]$b) {
  $pa = ($a -replace '^v', '').Split('.') | ForEach-Object { [int]($_ -replace '\D.*$', '0') }
  $pb = ($b -replace '^v', '').Split('.') | ForEach-Object { [int]($_ -replace '\D.*$', '0') }
  for ($i = 0; $i -lt [Math]::Max($pa.Count, $pb.Count); $i++) {
    $x = if ($i -lt $pa.Count) { $pa[$i] } else { 0 }
    $y = if ($i -lt $pb.Count) { $pb[$i] } else { 0 }
    if ($x -ne $y) { return $x -gt $y }
  }
  return $false
}

Push-Location $root
try {
  # ---------- 1. version ----------
  $updateJs = Get-Content (Join-Path $root 'Resources\tmui\update.js') -Raw
  if ($updateJs -notmatch "version:\s*'([0-9][0-9A-Za-z.\-]*)'") { throw 'Version not found in Resources\tmui\update.js' }
  $version = $Matches[1]
  $tag = "v$version"
  Write-Host "== ThereModernUI $tag $(if ($DryRun) { '(dry run)' })"

  # ---------- 2. preflight ----------
  if (-not (Test-Path (Join-Path $root '.git'))) { throw 'This folder is not a git repository.' }
  $current = (git rev-parse --abbrev-ref HEAD).Trim()
  if ($current -ne $branch) { throw "On branch '$current'; releases go from '$branch'." }
  $gh = Get-Command gh -ErrorAction SilentlyContinue
  if (-not $gh) {
    $guess = "$env:ProgramFiles\GitHub CLI\gh.exe"
    if (Test-Path $guess) { $gh = $guess } else { throw 'GitHub CLI not found: winget install --id GitHub.cli -e' }
  } else { $gh = $gh.Source }
  if (-not $DryRun) {
    & $gh auth status *> $null
    if ($LASTEXITCODE -ne 0) { throw 'GitHub CLI is not signed in. Run once:  gh auth login' }
  }
  Run git @('fetch', '--quiet', '--tags', 'origin', $branch)
  if (git tag --list $tag) { throw "Tag $tag already exists. Bump version in Resources\tmui\update.js first." }
  $behind = (git rev-list --count "HEAD..origin/$branch").Trim()
  if ($behind -ne '0') { throw "GitHub has $behind commit(s) you don't have. Pull/merge them first." }
  $latest = $null
  try {
    $rel = Invoke-RestMethod "https://api.github.com/repos/$repo/releases/latest" -Headers @{ Accept = 'application/vnd.github+json' } -TimeoutSec 20
    $latest = $rel.tag_name
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -ne 404) { throw "Couldn't read the latest release from GitHub: $($_.Exception.Message)" }
  }
  if ($latest -and -not (Newer $version $latest)) {
    throw "$tag is not newer than the published $latest. Bump version in Resources\tmui\update.js."
  }
  Write-Host "Latest published release: $(if ($latest) { $latest } else { 'none' })"

  # ---------- 3. build ----------
  # releases have to include GIFs, so the key file must be here
  & (Join-Path $root 'make-keyfile.ps1') -Required
  & (Join-Path $root 'build-installer.ps1')
  # the showcase demo runs the real dock, keep it in step with this release
  & (Join-Path $root 'make-demo.ps1')
  $setup = Join-Path $root "dist\ThereModernUI-Setup-$version.exe"
  if (-not (Test-Path $setup)) { throw "Installer not found: $setup" }
  $sha = (Get-FileHash $setup -Algorithm SHA256).Hash
  $upstream = ''
  $commitFile = Join-Path $root 'build\there-edge-commit.txt'
  if (Test-Path $commitFile) { $upstream = (Get-Content $commitFile -Raw).Trim() }

  # ---------- 4. commit + tag + push ----------
  Run git @('add', '-A')
  # never let the KLIPY key get committed
  $plainKey = (Get-Content (Join-Path $root 'secrets\klipy.key') -Raw).Trim()
  $leaks = git grep --cached -l -F $plainKey
  if ($leaks -or (git diff --cached --name-only | Select-String -SimpleMatch -Pattern 'secrets/', 'klipykey.js')) {
    Run git @('reset', '--quiet')
    throw "The KLIPY key (or its files) is staged for commit: $leaks. Fix .gitignore / remove it from the source."
  }
  $pending = git status --porcelain
  Write-Host "Changes to commit: $(@($pending).Count)"
  if ($DryRun) {
    $pending | Select-Object -First 40 | ForEach-Object { "   $_" }
    Write-Host "DRY RUN: would commit 'Release $tag', tag $tag, push to origin/$branch,"
    Write-Host "         and publish $tag with $(Split-Path $setup -Leaf) (SHA-256 $sha)."
    Run git @('reset', '--quiet')
    return
  }
  if ($pending) {
    Run git @('commit', '--quiet', '-m', "Release $tag")
  }
  Run git @('tag', '-a', $tag, '-m', "ThereModernUI $tag")
  Run git @('push', 'origin', $branch)
  Run git @('push', 'origin', $tag)

  # ---------- 5. GitHub Release ----------
  $body = @()
  if ($NotesFile) { $Notes = ([IO.File]::ReadAllText((Resolve-Path $NotesFile))).TrimEnd() }
  if ($Notes) { $body += $Notes; $body += '' }
  if ($Notes -notmatch '\*\*Install / update:\*\*') {
    $body += '**Install / update:** close There completely, run the setup, pick your There folder (the one with `There.exe`), then start There again. Running it over an existing install is the update.'
    $body += ''
  }
  $body += "SHA-256 of ``$(Split-Path $setup -Leaf)``:"
  $body += '```'
  $body += $sha
  $body += '```'
  if ($upstream) { $body += ''; $body += "Proxy DLLs built from There Edge $upstream." }
  $notesFile = Join-Path $env:TEMP "tmui-release-$version.md"
  # no BOM, it shows up as junk at the start of the release notes
  [IO.File]::WriteAllText($notesFile, ($body -join "`n"), (New-Object Text.UTF8Encoding($false)))
  Run $gh @('release', 'create', $tag, $setup, '--repo', $repo, '--title', "ThereModernUI $tag", '--notes-file', $notesFile, '--verify-tag')
  Remove-Item $notesFile -ErrorAction SilentlyContinue
  Write-Host "Published https://github.com/$repo/releases/tag/$tag"
}
finally {
  Pop-Location
}
