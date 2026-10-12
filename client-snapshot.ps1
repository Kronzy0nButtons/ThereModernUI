# ThereModernUI - client-snapshot.ps1
# Snapshot a There client folder and diff it against an older snapshot, so we
# can see exactly what a game patch changed.
# Author: DANKIES
#
#   powershell -ExecutionPolicy Bypass -File client-snapshot.ps1                 take a snapshot
#   powershell -ExecutionPolicy Bypass -File client-snapshot.ps1 -Compare        compare the newest two
#   ... -Client "D:\There\ThereClient"   if the client lives somewhere else
#
# Snapshots go in build\client-snapshots\<date-time>\ (not in git):
#   manifest.csv   every file: path, size, modified time, SHA-256, file version
#   text\          copies of the small text files (html, js, css, xml, ini...)
#                  so changed ones can be diffed line by line
# UserData (personal data and caches), crash dumps and logs are skipped.

param(
  [string]$Client = 'C:\Makena2\There\ThereClient',
  [switch]$Compare
)
$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot 'build\client-snapshots'
$textExt = '.html', '.htm', '.js', '.css', '.json', '.xml', '.ini', '.txt', '.cfg', '.manifest', '.isl', '.config'
$skip = '^(UserData|ThereModernUI\\backup)\\|\.(dmp|dmt|log)$'

function Load($dir) {
  $m = @{}
  foreach ($r in Import-Csv (Join-Path $dir 'manifest.csv')) { $m[$r.Path] = $r }
  return $m
}

if ($Compare) {
  $snaps = Get-ChildItem $root -Directory | Sort-Object Name
  if ($snaps.Count -lt 2) { throw 'Need two snapshots to compare. Take another one after the patch.' }
  $old = $snaps[-2]; $new = $snaps[-1]
  Write-Host "Comparing $($old.Name) -> $($new.Name)"
  $a = Load $old.FullName; $b = Load $new.FullName
  $added = $b.Keys | Where-Object { -not $a.ContainsKey($_) } | Sort-Object
  $removed = $a.Keys | Where-Object { -not $b.ContainsKey($_) } | Sort-Object
  $changed = $b.Keys | Where-Object { $a.ContainsKey($_) -and $a[$_].Sha256 -ne $b[$_].Sha256 } | Sort-Object
  $report = @("Client patch diff: $($old.Name) -> $($new.Name)", '')
  $report += "ADDED ($(@($added).Count))";   $added   | ForEach-Object { $report += "  + $_  ($($b[$_].Size) bytes $($b[$_].Version))" }
  $report += ''; $report += "REMOVED ($(@($removed).Count))"; $removed | ForEach-Object { $report += "  - $_" }
  $report += ''; $report += "CHANGED ($(@($changed).Count))"
  foreach ($p in $changed) {
    $va = $a[$p].Version; $vb = $b[$p].Version
    $report += "  * $p  ($($a[$p].Size) -> $($b[$p].Size) bytes$(if ($va -ne $vb) { ", version $va -> $vb" }))"
  }
  $out = Join-Path $new.FullName 'diff.txt'
  $report | Set-Content $out -Encoding utf8
  $report | Select-Object -First 200
  Write-Host "`nFull report: $out"
  return
}

if (-not (Test-Path (Join-Path $Client 'There.exe'))) { throw "No There.exe in $Client" }
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$dir = Join-Path $root $stamp
New-Item -ItemType Directory -Force (Join-Path $dir 'text') | Out-Null
$base = (Resolve-Path $Client).Path.TrimEnd('\') + '\'

$rows = New-Object System.Collections.Generic.List[object]
$n = 0
foreach ($f in Get-ChildItem $Client -Recurse -File -Force) {
  $rel = $f.FullName.Substring($base.Length)
  if ($rel -match $skip) { continue }
  $hash = ''
  try { $hash = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash } catch { $hash = 'LOCKED' }
  $ver = ''
  if ($f.Extension -in '.dll', '.exe') { $ver = $f.VersionInfo.FileVersion }
  $rows.Add([pscustomobject]@{ Path = $rel; Size = $f.Length; Modified = $f.LastWriteTime.ToString('s'); Sha256 = $hash; Version = $ver })
  if ($textExt -contains $f.Extension.ToLower() -and $f.Length -lt 2MB) {
    $dest = Join-Path (Join-Path $dir 'text') $rel
    New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
    Copy-Item -LiteralPath $f.FullName $dest
  }
  $n++
  if ($n % 5000 -eq 0) { Write-Host "  $n files..." }
}
$rows | Export-Csv (Join-Path $dir 'manifest.csv') -NoTypeInformation -Encoding utf8
Write-Host "Snapshot $stamp : $n files hashed, saved to $dir"
