# Finot Académie — génère la couche monochrome (icône thématique Android 13+) à partir des premiers plans couleur versionnés.
# Reproductible : mêmes ic_launcher_foreground.png -> mêmes ic_launcher_monochrome.png. Ne modifie JAMAIS la couche couleur.
# Principe : encre noire dont l'alpha suit l'obscurité du pixel (contours, yeux, nez, sweat = encre dense ; pelage orange = demi-teinte ;
# crème/blanc = très léger) pour conserver l'identité de Finot ; le système teinte ensuite l'encre avec la couleur du thème.
# Usage : powershell -NoProfile -File tools\make-monochrome-icon.ps1 [-Res android\app\src\main\res]
param([string]$Res = (Join-Path $PSScriptRoot '..\android\app\src\main\res'))
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies ([Drawing.Bitmap].Assembly.Location) -TypeDefinition @"
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class FinotMono {
  public static Bitmap From(Bitmap fg){
    int W=fg.Width,H=fg.Height; var o=new Bitmap(W,H,PixelFormat.Format32bppArgb);
    var rs=fg.LockBits(new Rectangle(0,0,W,H),ImageLockMode.ReadOnly,PixelFormat.Format32bppArgb);
    var ws=o.LockBits(new Rectangle(0,0,W,H),ImageLockMode.WriteOnly,PixelFormat.Format32bppArgb);
    int n=Math.Abs(rs.Stride)*H; var a=new byte[n]; var b=new byte[n]; Marshal.Copy(rs.Scan0,a,0,n);
    for(int y=0;y<H;y++)for(int x=0;x<W;x++){int i=y*rs.Stride+x*4; double al=a[i+3]/255.0;
      if(al<=0){b[i]=0;b[i+1]=0;b[i+2]=0;b[i+3]=0;continue;}
      double lum=(0.299*a[i+2]+0.587*a[i+1]+0.114*a[i])/255.0;           // BGRA
      double ink=Math.Min(1.0,1.18*Math.Pow(1.0-lum,0.8)+0.08);          // sombre = dense, clair = léger
      int alpha=(int)Math.Round(255*al*Math.Max(0.0,Math.Min(1.0,ink)));
      b[i]=0;b[i+1]=0;b[i+2]=0;b[i+3]=(byte)alpha; }
    Marshal.Copy(b,0,ws.Scan0,n); fg.UnlockBits(rs); o.UnlockBits(ws); return o; }
}
"@
$dens = @('mdpi','hdpi','xhdpi','xxhdpi','xxxhdpi')
foreach ($d in $dens) {
  $in  = Join-Path $Res "mipmap-$d\ic_launcher_foreground.png"
  $out = Join-Path $Res "mipmap-$d\ic_launcher_monochrome.png"
  $fg = New-Object Drawing.Bitmap($in)
  $m = [FinotMono]::From($fg)
  $m.Save($out, [Drawing.Imaging.ImageFormat]::Png)
  $m.Dispose(); $fg.Dispose()
  Write-Host "monochrome $d : $out"
}
