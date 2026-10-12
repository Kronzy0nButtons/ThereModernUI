# ThereModernUI - make-demo.ps1
# Copies the real dock into docs\demo so the showcase site runs the actual
# thing (with docs\demo\compass\demo.js standing in for the There client).
# Author: DANKIES
#
# release.ps1 runs this, so the demo always matches the shipped dock.
#   powershell -ExecutionPolicy Bypass -File make-demo.ps1

$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot 'Resources'
$out = Join-Path $PSScriptRoot 'docs\demo'

foreach ($f in 'dock.js', 'dock.css', 'icons.js', 'iconcache.js', 'ytmusic.js', 'tmui-logo.png') {
  Copy-Item (Join-Path $src "compass\$f") (Join-Path $out "compass\$f") -Force
}
Copy-Item (Join-Path $src 'tmui\update.js') (Join-Path $out 'tmui\update.js') -Force
# the showcase page uses the same icon set
Copy-Item (Join-Path $src 'compass\icons.js') (Join-Path $PSScriptRoot 'docs\assets\icons.js') -Force

# dock.html = the real compass2.html, minus the KLIPY key file, plus the demo shims
$html = Get-Content (Join-Path $src 'compass\compass2.html') -Raw
$html = $html -replace '<script src="klipykey.js"></script>\r?\n?', ''
$html = $html -replace '(<script src="\.\./js/jquery-3\.5\.1\.min\.js"></script>)', "`$1`n<script src=`"demo.js`"></script>"
$html = $html -replace '(<script src="dock\.js"></script>)', "`$1`n<script src=`"demo-after.js`"></script>"
# in the game the window is sized to the dock; here it sits bottom centre of the scene
$html = $html -replace '</head>', "<style>.dockroot { left:50% !important; transform:translateX(-50%); }</style>`n</head>"
if ($html -notmatch 'demo\.js' -or $html -notmatch 'demo-after\.js') { throw 'Could not wire the demo scripts into dock.html' }
Set-Content (Join-Path $out 'compass\dock.html') $html -Encoding utf8 -NoNewline
Write-Host 'docs\demo refreshed from Resources.'
