#!/usr/bin/env node

/**
 * Script to generate Icon.js with all Vuesax icons from the Icons folder
 * Run this script with: node generate-icon-data.js
 */

const fs = require('fs');
const path = require('path');

// Path to the Vuesax icons folder
const VUESAX_BOLD_PATH = path.join(__dirname, 'Icons', 'Vuesax Icon', 'bold');
const OUTPUT_FILE = path.join(__dirname, 'Icon.js');

console.log('🔍 Reading Vuesax icons from:', VUESAX_BOLD_PATH);

// Read all SVG files from the bold folder
function readVuesaxIcons() {
    const icons = [];
    
    try {
        const files = fs.readdirSync(VUESAX_BOLD_PATH);
        
        for (const file of files) {
            if (file.endsWith('.svg')) {
                const filePath = path.join(VUESAX_BOLD_PATH, file);
                const content = fs.readFileSync(filePath, 'utf-8');
                const name = file.replace('.svg', '');
                
                icons.push({
                    name: file,
                    content: content
                });
            }
        }
        
        console.log(`✅ Found ${icons.length} Vuesax icons`);
        return icons;
    } catch (error) {
        console.error('❌ Error reading Vuesax icons:', error.message);
        return [];
    }
}

// Generate the Icon.js file
function generateIconData() {
    const vuesaxIcons = readVuesaxIcons();
    
    if (vuesaxIcons.length === 0) {
        console.error('❌ No icons found. Make sure the Icons/Vuesax Icon/bold/ folder exists.');
        process.exit(1);
    }
    
    // Create the data structure
    const iconData = {
        vuesax: {
            name: "Vuesax",
            categories: {
                "Bold": vuesaxIcons
            }
        }
    };
    
    // Generate the JavaScript file content
    const fileContent = `// Auto-generated icon data - DO NOT EDIT MANUALLY
// Generated on ${new Date().toISOString()}

const ICON_DATA = ${JSON.stringify(iconData, null, 2)};

// Export for use in Figma plugin UI
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ICON_DATA;
}
`;
    
    // Write to Icon.js
    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
    console.log(`✅ Generated ${OUTPUT_FILE} with ${vuesaxIcons.length} icons`);
    console.log('📦 Icon.js is ready to use in your Figma plugin!');
}

// Run the script
generateIconData();
