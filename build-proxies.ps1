# ThereModernUI - build-proxies.ps1
# Builds BrowserProxy.dll and FlashProxy.dll from the latest There Edge
# (github.com/hmphus/there-edge) with our patches on top.
# Author: DANKIES
#
# Always starting from hmphus's newest code means players get his fixes too.
# If a patch stops applying the script bails out instead of shipping an old DLL.
#
#   powershell -ExecutionPolicy Bypass -File build-proxies.ps1 [-Toolset v142] [-Ref master]
#
# Needs git and VS Build Tools (C++ workload + ATL).

param(
  [string]$Toolset = 'v142',
  [string]$Ref = ''          # upstream branch/tag/commit; default = upstream's default branch
)
$ErrorActionPreference = 'Stop'

$root     = $PSScriptRoot
$work     = Join-Path $root 'build\there-edge'
$patches  = Join-Path $root 'patches\there-edge'
$upstream = 'https://github.com/hmphus/there-edge.git'

function Run($exe, [string[]]$argv) {
  & $exe @argv
  if ($LASTEXITCODE -ne 0) { throw "$exe $($argv -join ' ') failed ($LASTEXITCODE)" }
}

# ---------- 1. fresh upstream checkout ----------
if (-not (Test-Path (Join-Path $work '.git'))) {
  Write-Host "Cloning $upstream ..."
  New-Item -ItemType Directory -Force (Split-Path $work) | Out-Null
  Run git @('clone', '--quiet', $upstream, $work)
}
Push-Location $work
try {
  Run git @('fetch', '--quiet', '--tags', 'origin')
  if (-not $Ref) { $Ref = (git rev-parse --abbrev-ref origin/HEAD).Replace('origin/', '') }
  $target = if (git rev-parse --verify --quiet "origin/$Ref") { "origin/$Ref" } else { $Ref }
  Run git @('reset', '--quiet', '--hard', $target)
  Run git @('clean', '--quiet', '-fdx')
  $commit = (git rev-parse HEAD).Trim()
  Write-Host "Upstream There Edge: $Ref @ $commit"

  # ---------- 2. our patches ----------
  $patchFiles = Get-ChildItem $patches -Filter *.patch | Sort-Object Name
  foreach ($p in $patchFiles) {
    & git apply --check --whitespace=nowarn $p.FullName
    if ($LASTEXITCODE -ne 0) {
      throw @"
PATCH NO LONGER APPLIES: $($p.Name)
Upstream There Edge changed the code this patch touches (now at $commit).
Update the patch against the new upstream before releasing - nothing was built.
"@
    }
    Run git @('apply', '--whitespace=nowarn', $p.FullName)
    Write-Host "  applied $($p.Name)"
  }

  # ---------- 3. WebView2 SDK (whatever version upstream uses) ----------
  $cfg = [xml](Get-Content (Join-Path $work 'FlashProxy\packages.config'))
  $wv  = ($cfg.packages.package | Where-Object { $_.id -eq 'Microsoft.Web.WebView2' }).version
  $pkgDir = Join-Path $work "packages\Microsoft.Web.WebView2.$wv"
  if (-not (Test-Path $pkgDir)) {
    Write-Host "Fetching Microsoft.Web.WebView2 $wv ..."
    $zip = Join-Path $env:TEMP "webview2-$wv.zip"
    Invoke-WebRequest "https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2/$wv" -OutFile $zip -UseBasicParsing
    Expand-Archive $zip -DestinationPath $pkgDir -Force
    Remove-Item $zip
  }

  # ---------- 4. build ----------
  $vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
  $msbuild = $null
  if (Test-Path $vswhere) {
    $msbuild = & $vswhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 `
      -find 'MSBuild\**\Bin\MSBuild.exe' | Select-Object -First 1
  }
  if (-not $msbuild) { throw 'MSBuild with the C++ tools was not found (install VS Build Tools: C++ workload + ATL).' }

  foreach ($proj in @('BrowserProxy', 'FlashProxy')) {
    Write-Host "Building $proj ($Toolset, Release Win32) ..."
    Run $msbuild @("$proj\$proj.vcxproj", '/p:Configuration=Release', '/p:Platform=Win32',
      "/p:PlatformToolset=$Toolset", "/p:SolutionDir=$work\", '/m', '/v:minimal', '/nologo')
  }

  # ---------- 5. copy the DLLs where the installer wants them ----------
  $outs = @{
    'BrowserProxy' = Join-Path $root 'browserproxy\BrowserProxy.modui.dll'
    'FlashProxy'   = Join-Path $root 'flashproxy\FlashProxy.modui.dll'
  }
  foreach ($proj in $outs.Keys) {
    $built = Join-Path $work "$proj\Release\Win32\$proj.dll"
    if (-not (Test-Path $built)) { throw "Build output missing: $built" }
    New-Item -ItemType Directory -Force (Split-Path $outs[$proj]) | Out-Null
    Copy-Item $built $outs[$proj] -Force
    Write-Host ("  {0,-13} -> {1}" -f $proj, $outs[$proj])
  }
  Set-Content (Join-Path $root 'build\there-edge-commit.txt') "$Ref $commit" -Encoding ascii
  Write-Host "Done. Built from There Edge $commit."
}
finally {
  Pop-Location
}
