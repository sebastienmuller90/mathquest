# Finot Académie — génère les icônes d'installation de la PWA à partir du premier plan Finot VALIDÉ de l'icône Android
# (android/.../mipmap-xxxhdpi/ic_launcher_foreground.png, détouré) posé sur le même fond blanc que l'icône Android.
# Reproductible : mêmes sources -> mêmes icônes. Ne touche à AUCUNE ressource Android.
#   icon.png               512x512, usage « any »      : Finot recadré, grande taille, marge blanche (aussi apple-touch-icon)
#   icon-192.png           192x192, usage « any »      : même rendu, réduit
#   icon-maskable-512.png  512x512, usage « maskable » : cadrage de l'icône adaptative Android, Finot dans la zone de sécurité (cercle de 80 %)
# Usage : powershell -NoProfile -File tools\make-pwa-icons.ps1 [-Root .]
param([string]$Root = (Join-Path $PSScriptRoot '..'))
Add-Type -AssemblyName System.Drawing
$fgFile = (Resolve-Path (Join-Path $Root 'android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png')).Path
$fg = New-Object Drawing.Bitmap($fgFile)

function New-Canvas([int]$size) {
  $bmp = New-Object Drawing.Bitmap($size, $size, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'HighQuality'; $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'; $g.CompositingQuality = 'HighQuality'
  $g.Clear([Drawing.Color]::White)
  return @($bmp, $g)
}
function Save-Png($bmp, [string]$name) { $bmp.Save((Join-Path $Root $name), [Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose() }

# Boîte englobante des pixels visibles du premier plan (alpha > 24), pour le cadrage « any ».
$minX = $fg.Width; $minY = $fg.Height; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $fg.Height; $y++) { for ($x = 0; $x -lt $fg.Width; $x++) {
  if ($fg.GetPixel($x, $y).A -gt 24) { if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }; if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y } } } }
$bw = $maxX - $minX + 1; $bh = $maxY - $minY + 1

# « any » 512 : Finot recadré, 84 % du côté, centré.
$c = New-Canvas 512; $bmp = $c[0]; $g = $c[1]
$k = 0.84 * 512 / [Math]::Max($bw, $bh); $dw = $bw * $k; $dh = $bh * $k
$g.DrawImage($fg, (New-Object Drawing.RectangleF(((512 - $dw) / 2), ((512 - $dh) / 2), $dw, $dh)), (New-Object Drawing.RectangleF($minX, $minY, $bw, $bh)), [Drawing.GraphicsUnit]::Pixel)
$g.Dispose(); $any512 = $bmp.Clone(); Save-Png $bmp 'icon.png'

# « any » 192 : réduction de l'icône 512.
$c = New-Canvas 192; $bmp = $c[0]; $g = $c[1]
$g.DrawImage($any512, 0, 0, 192, 192); $g.Dispose(); $any512.Dispose(); Save-Png $bmp 'icon-192.png'

# « maskable » 512 : cadrage de l'icône adaptative (le premier plan de 108 dp occupe tout le carré), légèrement resserré
# pour que toutes les oreilles et le pouce restent dans le cercle de sécurité de 80 %.
$c = New-Canvas 512; $bmp = $c[0]; $g = $c[1]
$s = 512 * 0.84; $o = (512 - $s) / 2
$g.DrawImage($fg, (New-Object Drawing.RectangleF($o, $o, $s, $s)), (New-Object Drawing.RectangleF(0, 0, $fg.Width, $fg.Height)), [Drawing.GraphicsUnit]::Pixel)
$g.Dispose(); Save-Png $bmp 'icon-maskable-512.png'
$fg.Dispose()
Write-Host 'OK : icon.png (512), icon-192.png, icon-maskable-512.png'
