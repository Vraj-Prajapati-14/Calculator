/**
 * Script to generate icon files from SVG
 * Run from frontend directory: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const svgPath = path.join(publicDir, 'logo.svg');

if (!fs.existsSync(svgPath)) {
  console.error('logo.svg not found at:', svgPath);
  process.exit(1);
}

async function generateIcons() {
  try {
    console.log('Generating icon files from logo.svg...');
    
    // Read SVG
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate favicon.png (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    console.log('✓ Generated favicon.png (32x32)');
    
    // Generate logo192.png
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'logo192.png'));
    console.log('✓ Generated logo192.png (192x192)');
    
    // Generate logo512.png
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'logo512.png'));
    console.log('✓ Generated logo512.png (512x512)');
    
    // Generate favicon.ico (32x32 PNG as ICO)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico (32x32 PNG format)');
    
    console.log('\n✅ All icon files generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();

