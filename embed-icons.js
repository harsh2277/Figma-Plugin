#!/usr/bin/env node

/**
 * Script to embed Icon.js content directly into ui.html
 * This is necessary because Figma plugins cannot load external JS files
 */

const fs = require('fs');
const path = require('path');

const ICON_JS_PATH = path.join(__dirname, 'Icon.js');
const UI_HTML_PATH = path.join(__dirname, 'ui.html');
const UI_HTML_BACKUP = path.join(__dirname, 'ui.html.backup');

console.log('🔄 Embedding Icon.js into ui.html...\n');

// Read Icon.js content
console.log('1. Reading Icon.js...');
if (!fs.existsSync(ICON_JS_PATH)) {
    console.error('❌ Icon.js not found! Run: node generate-icon-data.js');
    process.exit(1);
}

const iconJsContent = fs.readFileSync(ICON_JS_PATH, 'utf-8');
console.log(`   ✅ Read Icon.js (${(iconJsContent.length / 1024).toFixed(2)}KB)`);

// Read ui.html
console.log('\n2. Reading ui.html...');
if (!fs.existsSync(UI_HTML_PATH)) {
    console.error('❌ ui.html not found!');
    process.exit(1);
}

const uiHtmlContent = fs.readFileSync(UI_HTML_PATH, 'utf-8');
console.log('   ✅ Read ui.html');

// Create backup
console.log('\n3. Creating backup...');
fs.writeFileSync(UI_HTML_BACKUP, uiHtmlContent, 'utf-8');
console.log('   ✅ Backup created: ui.html.backup');

// Replace the script tag
console.log('\n4. Embedding Icon.js content...');
let newHtmlContent;

// Check if there's already an embedded ICON_DATA
if (uiHtmlContent.includes('const ICON_DATA = {')) {
    console.log('   ℹ️  Found existing embedded ICON_DATA, replacing...');
    // Replace existing embedded content
    newHtmlContent = uiHtmlContent.replace(
        /<script>\s*\/\/ Auto-generated icon data[\s\S]*?<\/script>\s*<script>/,
        `<script>\n${iconJsContent}\n    </script>\n    <script>`
    );
} else if (uiHtmlContent.includes('<script src="Icon.js"></script>')) {
    console.log('   ℹ️  Found script tag, replacing with embedded content...');
    // Replace script tag with embedded content
    newHtmlContent = uiHtmlContent.replace(
        '<script src="Icon.js"></script>',
        `<script>\n${iconJsContent}\n    </script>`
    );
} else {
    console.log('   ℹ️  No existing reference found, adding before first script tag...');
    // Add before the first script tag
    newHtmlContent = uiHtmlContent.replace(
        '<script>',
        `<script>\n${iconJsContent}\n    </script>\n    <script>`
    );
}

// Write updated ui.html
console.log('\n5. Writing updated ui.html...');
fs.writeFileSync(UI_HTML_PATH, newHtmlContent, 'utf-8');
console.log('   ✅ ui.html updated');

// Verify
console.log('\n6. Verifying...');
const verifyContent = fs.readFileSync(UI_HTML_PATH, 'utf-8');
if (verifyContent.includes('const ICON_DATA = {') && verifyContent.includes('"vuesax"')) {
    console.log('   ✅ Verification passed - ICON_DATA is embedded');
} else {
    console.log('   ❌ Verification failed - ICON_DATA not found');
    console.log('   Restoring backup...');
    fs.writeFileSync(UI_HTML_PATH, uiHtmlContent, 'utf-8');
    process.exit(1);
}

console.log('\n' + '='.repeat(50));
console.log('✅ Icon.js successfully embedded into ui.html!');
console.log('\nNext steps:');
console.log('1. Reload the plugin in Figma');
console.log('2. Go to Icons tab');
console.log('3. Click "Add All Icons to Figma"');
console.log('='.repeat(50) + '\n');
