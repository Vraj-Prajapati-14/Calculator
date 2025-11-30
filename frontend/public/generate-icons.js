/**
 * Script to generate icon files from SVG
 * 
 * To use this script, you need to install sharp:
 * npm install --save-dev sharp
 * 
 * Then run: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp not found. Installing...');
  console.log('Please run: npm install --save-dev sharp');
  console.log('\nAlternatively, you can use an online tool:');
  console.log('1. Visit https://realfavicongenerator.net/');
  console.log('2. Upload frontend/public/logo.svg');
  console.log('3. Download the generated favicon files');
  console.log('4. Place them in frontend/public/');
  process.exit(1);
}

// Get the directory where this script is located
const publicDir = path.resolve(__dirname);
const svgPath = path.join(publicDir, 'logo.svg');

if (!fs.existsSync(svgPath)) {
  console.error('logo.svg not found!');
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
    
    // Generate favicon.ico (multi-size ICO)
    // Note: sharp doesn't support ICO directly, so we'll create a 32x32 PNG as favicon.ico
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico (32x32 PNG format)');
    
    console.log('\n✅ All icon files generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();

