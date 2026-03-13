import sharp from 'sharp';
import { writeFileSync } from 'fs';

// App icon SVG — 1024x1024
// Dark bg, "CS" in vibrant split-complementary colors matching the app
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0a2e"/>
      <stop offset="100%" style="stop-color:#0d1a2e"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b35"/>
      <stop offset="50%" style="stop-color:#f7c59f"/>
      <stop offset="100%" style="stop-color:#ff6b9d"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="url(#bg)"/>

  <!-- Decorative rings -->
  <circle cx="512" cy="512" r="400" fill="none" stroke="#ff6b35" stroke-width="3" opacity="0.3"/>
  <circle cx="512" cy="512" r="440" fill="none" stroke="#ff6b9d" stroke-width="1.5" opacity="0.2"/>

  <!-- "CS" text -->
  <text
    x="512"
    y="590"
    text-anchor="middle"
    font-family="Arial Black, sans-serif"
    font-weight="900"
    font-size="420"
    fill="url(#textGrad)"
    letter-spacing="-10"
  >CS</text>

  <!-- Subtitle -->
  <text
    x="512"
    y="720"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-weight="700"
    font-size="72"
    fill="#f7c59f"
    letter-spacing="12"
    opacity="0.85"
  >CODY SUCKS</text>
</svg>
`;

// Splash screen SVG — centered logo on dark bg, 1284x2778 (iPhone 14 Pro Max)
const splashSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1284" height="2778" viewBox="0 0 1284 2778">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0a2e"/>
      <stop offset="100%" style="stop-color:#0d1a2e"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b35"/>
      <stop offset="50%" style="stop-color:#f7c59f"/>
      <stop offset="100%" style="stop-color:#ff6b9d"/>
    </linearGradient>
  </defs>
  <rect width="1284" height="2778" fill="url(#bg)"/>
  <circle cx="642" cy="1389" r="380" fill="none" stroke="#ff6b35" stroke-width="3" opacity="0.3"/>
  <text
    x="642"
    y="1460"
    text-anchor="middle"
    font-family="Arial Black, sans-serif"
    font-weight="900"
    font-size="380"
    fill="url(#textGrad)"
    letter-spacing="-10"
  >CS</text>
</svg>
`;

// Android adaptive icon foreground — "CS" on transparent bg
const adaptiveFgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b35"/>
      <stop offset="50%" style="stop-color:#f7c59f"/>
      <stop offset="100%" style="stop-color:#ff6b9d"/>
    </linearGradient>
  </defs>
  <text
    x="512"
    y="620"
    text-anchor="middle"
    font-family="Arial Black, sans-serif"
    font-weight="900"
    font-size="420"
    fill="url(#textGrad)"
    letter-spacing="-10"
  >CS</text>
</svg>
`;

// Android adaptive icon background
const adaptiveBgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0a2e"/>
      <stop offset="100%" style="stop-color:#0d1a2e"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
</svg>
`;

async function generate(svgStr, outPath, width, height) {
  await sharp(Buffer.from(svgStr))
    .resize(width, height)
    .png()
    .toFile(outPath);
  console.log(`✓ ${outPath}`);
}

await generate(iconSvg,       'assets/icon.png',                        1024, 1024);
await generate(splashSvg,     'assets/splash-icon.png',                 1284, 2778);
await generate(adaptiveFgSvg, 'assets/android-icon-foreground.png',    1024, 1024);
await generate(adaptiveBgSvg, 'assets/android-icon-background.png',    1024, 1024);
await generate(adaptiveFgSvg, 'assets/android-icon-monochrome.png',    1024, 1024);
await generate(iconSvg,       'assets/favicon.png',                      48,   48);

console.log('\nAll assets generated.');
