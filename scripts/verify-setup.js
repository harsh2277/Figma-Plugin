#!/usr/bin/env node

/**
 * Verification script to check if the icon feature is set up correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Icon Feature Setup...\n');

let allChecks = true;

// Check 1: Icon.js exists
console.log('1. Checking if Icon.js exists...');
const iconJsPath = path.join(__dirname, '..', 'Icon.js');
if (fs.existsSync(iconJsPath)) {
    const stats = fs.statSync(iconJsPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   ✅ Icon.js exists (${sizeMB}MB)`);
} else {
    console.log('   ❌ Icon.js not found! Run: node generate-icon-data.js');
    allChecks = false;
}

// Check 2: Icon.js has correct structure
console.log('\n2. Checking Icon.js structure...');
try {
    const iconJsContent = fs.readFileSync(iconJsPath, 'utf-8');
    
    if (iconJsContent.includes('const ICON_DATA')) {
        console.log('   ✅ ICON_DATA constant found');
    } else {
        console.log('   ❌ ICON_DATA constant not found');
        allChecks = false;
    }
    
    if (iconJsContent.includes('"vuesax"')) {
        console.log('   ✅ Vuesax data found');
    } else {
        console.log('   ❌ Vuesax data not found');
        allChecks = false;
    }
    
    if (iconJsContent.includes('"Bold"')) {
        console.log('   ✅ Bold category found');
    } else {
        console.log('   ❌ Bold category not found');
        allChecks = false;
    }
    
    // Count icons
    const iconMatches = iconJsContent.match(/"name":\s*"[^"]+\.svg"/g);
    if (iconMatches) {
        console.log(`   ✅ Found ${iconMatches.length} icons`);
    } else {
        console.log('   ❌ No icons found');
        allChecks = false;
    }
} catch (error) {
    console.log(`   ❌ Error reading Icon.js: ${error.message}`);
    allChecks = false;
}

// Check 3: ui.html has embedded Icon data
console.log('\n3. Checking if ui.html has embedded Icon data...');
const uiHtmlPath = path.join(__dirname, '..', 'ui.html');
if (fs.existsSync(uiHtmlPath)) {
    const uiHtmlContent = fs.readFileSync(uiHtmlPath, 'utf-8');
    
    if (uiHtmlContent.includes('const ICON_DATA = {')) {
        console.log('   ✅ ICON_DATA is embedded in ui.html');
        
        if (uiHtmlContent.includes('"vuesax"')) {
            console.log('   ✅ Vuesax data found in ui.html');
        } else {
            console.log('   ❌ Vuesax data not found in ui.html');
            console.log('      Run: node embed-icons.js');
            allChecks = false;
        }
    } else {
        console.log('   ❌ ICON_DATA not embedded in ui.html');
        console.log('      Run: node embed-icons.js');
        allChecks = false;
    }
    
    // Check for old script tag (should not exist)
    if (uiHtmlContent.includes('<script src="Icon.js"></script>')) {
        console.log('   ⚠️  Old script tag found (should be removed)');
        console.log('      Run: node embed-icons.js to fix');
    }
} else {
    console.log('   ❌ ui.html not found');
    allChecks = false;
}

// Check 4: code.js has add-icons handler
console.log('\n4. Checking if code.js has add-icons handler...');
const codeJsPath = path.join(__dirname, '..', 'code.js');
if (fs.existsSync(codeJsPath)) {
    const codeJsContent = fs.readFileSync(codeJsPath, 'utf-8');
    
    if (codeJsContent.includes("msg.type === 'add-icons'")) {
        console.log('   ✅ add-icons handler found in code.js');
    } else {
        console.log('   ❌ add-icons handler not found in code.js');
        allChecks = false;
    }
    
    if (codeJsContent.includes('figma.createNodeFromSvg')) {
        console.log('   ✅ SVG creation code found');
    } else {
        console.log('   ❌ SVG creation code not found');
        allChecks = false;
    }
} else {
    console.log('   ❌ code.js not found');
    allChecks = false;
}

// Check 5: Icons folder exists
console.log('\n5. Checking if Icons folder exists...');
const iconsFolderPath = path.join(__dirname, '..', 'assets', 'icons', 'vuesax', 'bold');
if (fs.existsSync(iconsFolderPath)) {
    const files = fs.readdirSync(iconsFolderPath);
    const svgFiles = files.filter(f => f.endsWith('.svg'));
    console.log(`   ✅ Icons folder exists with ${svgFiles.length} SVG files`);
} else {
    console.log('   ❌ Icons folder not found at: assets/icons/vuesax/bold/');
    allChecks = false;
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecks) {
    console.log('✅ All checks passed! Icon feature is ready to use.');
    console.log('\nNext steps:');
    console.log('1. Open your Figma file');
    console.log('2. Run the plugin');
    console.log('3. Go to Icons tab');
    console.log('4. Click "Add All Icons to Figma"');
} else {
    console.log('❌ Some checks failed. Please fix the issues above.');
    console.log('\nTo regenerate Icon.js:');
    console.log('  node generate-icon-data.js');
}
console.log('='.repeat(50) + '\n');
