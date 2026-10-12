# ThereModernUI - build-installer.ps1
# Builds dist\ThereModernUI-Setup-<version>.exe with Inno Setup 6.
# Author: DANKIES
#
# Get the compiler with: winget install --id JRSoftware.InnoSetup -e
# -SkipProxies reuses the last proxy build instead of rebuilding them.
param([switch]$SkipProxies)
$ErrorActionPreference = 'Stop'
if (-not $SkipProxies) {
  & (Join-Path $PSScriptRoot 'build-proxies.ps1')
}
$candidates = @(
  "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe",
  "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
  "$env:ProgramFiles\Inno Setup 6\ISCC.exe"
)
$iscc = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $iscc) { throw 'Inno Setup 6 (ISCC.exe) not found - install it with winget first.' }
# scrambled KLIPY key for the installer (no key file = no GIFs, just a warning)
& (Join-Path $PSScriptRoot 'make-keyfile.ps1')
# version comes from Resources\tmui\update.js so it always matches the mod
$updateJs = Get-Content (Join-Path $PSScriptRoot 'Resources\tmui\update.js') -Raw
if ($updateJs -notmatch "version:\s*'([0-9][0-9A-Za-z.\-]*)'") { throw 'Version not found in Resources\tmui\update.js' }
$version = $Matches[1]
Write-Host "ThereModernUI version $version"
& $iscc "/DAppVersion=$version" (Join-Path $PSScriptRoot 'installer\ThereModernUI.iss')
if ($LASTEXITCODE -ne 0) { throw "Build failed ($LASTEXITCODE)" }
Get-ChildItem (Join-Path $PSScriptRoot 'dist') -Filter *.exe | ForEach-Object {
  $hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash
  "{0}`nSHA-256: {1}" -f $_.FullName, $hash
}
