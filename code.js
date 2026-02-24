figma.showUI(__html__, { width: 400, height: 700 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === "close-plugin") {
        figma.closePlugin();
    }

    if (msg.type === "resize") {
        figma.ui.resize(msg.width, msg.height);
    }

    if (msg.type === "create-variables") {
        try {
            // Get or create a collection for color variables
            let collection = figma.variables.getLocalVariableCollections()[0];
            if (!collection) {
                collection = figma.variables.createVariableCollection("Colors");
            }

            // Rename first mode to Light if needed
            if (collection.modes[0].name !== "Light") {
                collection.renameMode(collection.modes[0].modeId, "Light");
            }

            // Create dark mode if it doesn't exist
            let lightModeId = collection.modes[0].modeId;
            let darkModeId;

            if (collection.modes.length === 1) {
                darkModeId = collection.addMode("Dark");
            } else {
                darkModeId = collection.modes[1].modeId;
            }

            const colors = msg.colors;
            const includeStatus = msg.includeStatus;
            const includeNeutral = msg.includeNeutral;

            // Helper function to convert hex to RGB
            function hexToRgb(hex) {
                // Remove # if present
                hex = hex.replace('#', '');

                // Handle 3-digit hex
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }

                // Validate hex
                if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
                    throw new Error(`Invalid hex color: ${hex}`);
                }

                const r = parseInt(hex.substring(0, 2), 16) / 255;
                const g = parseInt(hex.substring(2, 4), 16) / 255;
                const b = parseInt(hex.substring(4, 6), 16) / 255;

                return { r, g, b };
            }

            // Create variables for each color
            for (const color of colors) {
                const colorName = color.name;
                const shades = color.shades;

                // Create variables for each shade
                for (let i = 0; i < shades.length; i++) {
                    const shadeNumber = Math.round((i + 1) * (1000 / shades.length));
                    const variableName = `${colorName}/${shadeNumber}`;

                    try {
                        // Check if variable already exists
                        let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                        if (!variable) {
                            variable = figma.variables.createVariable(variableName, collection, "COLOR");
                        }

                        // Convert hex to RGB
                        const rgb = hexToRgb(shades[i]);

                        // Set the value for light mode
                        variable.setValueForMode(lightModeId, rgb);

                        // Set inverted value for dark mode (reverse the shade order)
                        const darkShadeIndex = shades.length - 1 - i;
                        const darkRgb = hexToRgb(shades[darkShadeIndex]);
                        variable.setValueForMode(darkModeId, darkRgb);
                    } catch (err) {
                        console.error(`Error creating variable ${variableName}:`, err);
                        throw new Error(`Failed to create ${variableName}: ${err.message}`);
                    }
                }
            }

            // Add status colors if toggle is on
            if (includeStatus) {
                const statusColors = {
                    'Success': ['#D1FAE5', '#6EE7B7', '#10B981', '#047857', '#064E3B'],
                    'Warning': ['#FEF3C7', '#FCD34D', '#F59E0B', '#B45309', '#78350F'],
                    'Error': ['#FEE2E2', '#FCA5A5', '#EF4444', '#B91C1C', '#7F1D1D'],
                    'Info': ['#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8', '#1E3A8A']
                };

                for (const [colorName, shades] of Object.entries(statusColors)) {
                    for (let i = 0; i < shades.length; i++) {
                        const shadeNumber = (i + 1) * 200;
                        const variableName = `Status/${colorName}/${shadeNumber}`;

                        let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                        if (!variable) {
                            variable = figma.variables.createVariable(variableName, collection, "COLOR");
                        }

                        const rgb = hexToRgb(shades[i]);
                        variable.setValueForMode(lightModeId, rgb);

                        // Set inverted value for dark mode
                        const darkShadeIndex = shades.length - 1 - i;
                        const darkRgb = hexToRgb(shades[darkShadeIndex]);
                        variable.setValueForMode(darkModeId, darkRgb);
                    }
                }
            }

            // Add neutral colors if toggle is on
            if (includeNeutral) {
                const neutralShades = [
                    '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF',
                    '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827'
                ];

                for (let i = 0; i < neutralShades.length; i++) {
                    const shadeNumber = (i + 1) * 100;
                    const variableName = `Neutral/${shadeNumber}`;

                    let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                    if (!variable) {
                        variable = figma.variables.createVariable(variableName, collection, "COLOR");
                    }

                    const rgb = hexToRgb(neutralShades[i]);
                    variable.setValueForMode(lightModeId, rgb);

                    // Set inverted value for dark mode
                    const darkShadeIndex = neutralShades.length - 1 - i;
                    const darkRgb = hexToRgb(neutralShades[darkShadeIndex]);
                    variable.setValueForMode(darkModeId, darkRgb);
                }
            }

            figma.ui.postMessage({ type: 'variables-created', success: true });
            figma.notify('Variables created successfully!');
        } catch (error) {
            figma.ui.postMessage({ type: 'variables-created', success: false, error: error.message });
            figma.notify('Error creating variables: ' + error.message);
        }
    }

    if (msg.type === "create-spacing-tokens") {
        try {
            const baseValue = msg.baseValue;
            const numberOfTokens = msg.numberOfTokens;

            // Get or create a collection for spacing variables
            let collection = figma.variables.getLocalVariableCollections().find(c => c.name === "Spacing");
            if (!collection) {
                collection = figma.variables.createVariableCollection("Spacing");
            }

            // Create Desktop, Tablet, and Mobile modes if they don't exist
            let desktopModeId, tabletModeId, mobileModeId;

            if (collection.modes.length === 1) {
                // Rename default mode to Desktop
                collection.renameMode(collection.modes[0].modeId, "Desktop");
                desktopModeId = collection.modes[0].modeId;
                // Add Tablet and Mobile modes
                tabletModeId = collection.addMode("Tablet");
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length === 2) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length >= 3) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.modes[2].modeId;
            }

            // Generate spacing tokens (all even numbers)
            for (let i = 0; i < numberOfTokens; i++) {
                const desktopValue = baseValue * i;
                // Tablet uses 75% of desktop value (rounded to even number)
                const tabletValue = Math.round((desktopValue * 0.75) / 2) * 2;
                // Mobile uses 50% of desktop value (rounded to even number)
                const mobileValue = Math.round((desktopValue * 0.5) / 2) * 2;

                const variableName = `spacing-${desktopValue}px`;

                // Check if variable already exists
                let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                if (!variable) {
                    variable = figma.variables.createVariable(variableName, collection, "FLOAT");
                }

                // Set different values for each mode
                variable.setValueForMode(desktopModeId, desktopValue);
                variable.setValueForMode(tabletModeId, tabletValue);
                variable.setValueForMode(mobileModeId, mobileValue);
            }

            figma.notify(`Created ${numberOfTokens} spacing tokens with base ${baseValue}px (Desktop: 100%, Tablet: 75%, Mobile: 50%)`);
        } catch (error) {
            figma.notify('Error creating spacing tokens: ' + error.message);
        }
    }

    if (msg.type === "create-padding-tokens") {
        try {
            const baseValue = msg.baseValue;
            const numberOfTokens = msg.numberOfTokens;

            // Get or create a collection for padding variables
            let collection = figma.variables.getLocalVariableCollections().find(c => c.name === "Padding");
            if (!collection) {
                collection = figma.variables.createVariableCollection("Padding");
            }

            // Create Desktop, Tablet, and Mobile modes if they don't exist
            let desktopModeId, tabletModeId, mobileModeId;

            if (collection.modes.length === 1) {
                // Rename default mode to Desktop
                collection.renameMode(collection.modes[0].modeId, "Desktop");
                desktopModeId = collection.modes[0].modeId;
                // Add Tablet and Mobile modes
                tabletModeId = collection.addMode("Tablet");
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length === 2) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length >= 3) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.modes[2].modeId;
            }

            // Generate padding tokens (all even numbers)
            for (let i = 0; i < numberOfTokens; i++) {
                const desktopValue = baseValue * i;
                // Tablet uses 75% of desktop value (rounded to even number)
                const tabletValue = Math.round((desktopValue * 0.75) / 2) * 2;
                // Mobile uses 50% of desktop value (rounded to even number)
                const mobileValue = Math.round((desktopValue * 0.5) / 2) * 2;

                const variableName = `padding-${desktopValue}px`;

                // Check if variable already exists
                let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                if (!variable) {
                    variable = figma.variables.createVariable(variableName, collection, "FLOAT");
                }

                // Set different values for each mode
                variable.setValueForMode(desktopModeId, desktopValue);
                variable.setValueForMode(tabletModeId, tabletValue);
                variable.setValueForMode(mobileModeId, mobileValue);
            }

            figma.notify(`Created ${numberOfTokens} padding tokens with base ${baseValue}px (Desktop: 100%, Tablet: 75%, Mobile: 50%)`);
        } catch (error) {
            figma.notify('Error creating padding tokens: ' + error.message);
        }
    }

    if (msg.type === "create-radius-tokens") {
        try {
            const baseValue = msg.baseValue;
            const numberOfTokens = msg.numberOfTokens;

            // Get or create a collection for radius variables
            let collection = figma.variables.getLocalVariableCollections().find(c => c.name === "Radius");
            if (!collection) {
                collection = figma.variables.createVariableCollection("Radius");
            }

            // Create Desktop, Tablet, and Mobile modes if they don't exist
            let desktopModeId, tabletModeId, mobileModeId;

            if (collection.modes.length === 1) {
                // Rename default mode to Desktop
                collection.renameMode(collection.modes[0].modeId, "Desktop");
                desktopModeId = collection.modes[0].modeId;
                // Add Tablet and Mobile modes
                tabletModeId = collection.addMode("Tablet");
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length === 2) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length >= 3) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.modes[2].modeId;
            }

            // Generate radius tokens (all even numbers)
            for (let i = 0; i < numberOfTokens; i++) {
                const desktopValue = baseValue * i;
                // Tablet uses 75% of desktop value (rounded to even number)
                const tabletValue = Math.round((desktopValue * 0.75) / 2) * 2;
                // Mobile uses 50% of desktop value (rounded to even number)
                const mobileValue = Math.round((desktopValue * 0.5) / 2) * 2;

                const variableName = `radius-${desktopValue}px`;

                // Check if variable already exists
                let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                if (!variable) {
                    variable = figma.variables.createVariable(variableName, collection, "FLOAT");
                }

                // Set different values for each mode
                variable.setValueForMode(desktopModeId, desktopValue);
                variable.setValueForMode(tabletModeId, tabletValue);
                variable.setValueForMode(mobileModeId, mobileValue);
            }

            figma.notify(`Created ${numberOfTokens} radius tokens with base ${baseValue}px (Desktop: 100%, Tablet: 75%, Mobile: 50%)`);
        } catch (error) {
            figma.notify('Error creating radius tokens: ' + error.message);
        }
    }

    if (msg.type === "create-stroke-tokens") {
        try {
            const baseValue = msg.baseValue;
            const numberOfTokens = msg.numberOfTokens;

            // Get or create a collection for stroke variables
            let collection = figma.variables.getLocalVariableCollections().find(c => c.name === "Stroke");
            if (!collection) {
                collection = figma.variables.createVariableCollection("Stroke");
            }

            // Create Desktop, Tablet, and Mobile modes if they don't exist
            let desktopModeId, tabletModeId, mobileModeId;

            if (collection.modes.length === 1) {
                // Rename default mode to Desktop
                collection.renameMode(collection.modes[0].modeId, "Desktop");
                desktopModeId = collection.modes[0].modeId;
                // Add Tablet and Mobile modes
                tabletModeId = collection.addMode("Tablet");
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length === 2) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.addMode("Mobile");
            } else if (collection.modes.length >= 3) {
                desktopModeId = collection.modes[0].modeId;
                tabletModeId = collection.modes[1].modeId;
                mobileModeId = collection.modes[2].modeId;
            }

            // Generate stroke tokens
            for (let i = 0; i < numberOfTokens; i++) {
                const desktopValue = baseValue * i;
                // Tablet uses 75% of desktop value
                const tabletValue = Math.round((desktopValue * 0.75) * 10) / 10;
                // Mobile uses 50% of desktop value
                const mobileValue = Math.round((desktopValue * 0.5) * 10) / 10;

                // Format the variable name to replace decimal point with underscore
                const formattedValue = desktopValue.toString().replace('.', '_');
                const variableName = `stroke-${formattedValue}px`;

                // Check if variable already exists
                let variable = figma.variables.getLocalVariables().find(v => v.name === variableName);

                if (!variable) {
                    variable = figma.variables.createVariable(variableName, collection, "FLOAT");
                }

                // Set different values for each mode
                variable.setValueForMode(desktopModeId, desktopValue);
                variable.setValueForMode(tabletModeId, tabletValue);
                variable.setValueForMode(mobileModeId, mobileValue);
            }

            figma.notify(`Created ${numberOfTokens} stroke tokens with base ${baseValue}px (Desktop: 100%, Tablet: 75%, Mobile: 50%)`);
        } catch (error) {
            figma.notify('Error creating stroke tokens: ' + error.message);
        }
    }

    if (msg.type === "create-shadow-styles") {
        try {
            // Define predefined shadow styles
            const shadows = [
                { name: 'shadow-xs', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-sm', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-base', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-md', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 6, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-lg', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 10 }, radius: 15, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-xl', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 20 }, radius: 25, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-2xl', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 25 }, radius: 50, spread: 0, visible: true, blendMode: 'NORMAL' } },
                { name: 'shadow-3xl', effect: { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 40 }, radius: 50, spread: 0, visible: true, blendMode: 'NORMAL' } }
            ];

            let createdCount = 0;

            for (const shadow of shadows) {
                // Check if style already exists
                let style = figma.getLocalEffectStyles().find(s => s.name === shadow.name);

                if (!style) {
                    style = figma.createEffectStyle();
                    style.name = shadow.name;
                }

                // Set the effect
                style.effects = [shadow.effect];
                createdCount++;
            }

            figma.notify(`Created ${createdCount} shadow styles successfully!`);
        } catch (error) {
            figma.notify('Error creating shadow styles: ' + error.message);
        }
    }

    if (msg.type === "create-grid-styles") {
        try {
            const grids = msg.grids;

            // Desktop Grid Style
            let desktopStyle = figma.getLocalGridStyles().find(s => s.name === "Desktop Grid");
            if (!desktopStyle) {
                desktopStyle = figma.createGridStyle();
                desktopStyle.name = "Desktop Grid";
            }
            desktopStyle.layoutGrids = [
                {
                    pattern: 'COLUMNS',
                    alignment: 'STRETCH',
                    gutterSize: grids.desktop.gutter,
                    count: grids.desktop.columns,
                    offset: grids.desktop.margin,
                    visible: true,
                    color: { r: 1, g: 0, b: 0, a: 0.1 }
                }
            ];

            // Tablet Grid Style
            let tabletStyle = figma.getLocalGridStyles().find(s => s.name === "Tablet Grid");
            if (!tabletStyle) {
                tabletStyle = figma.createGridStyle();
                tabletStyle.name = "Tablet Grid";
            }
            tabletStyle.layoutGrids = [
                {
                    pattern: 'COLUMNS',
                    alignment: 'STRETCH',
                    gutterSize: grids.tablet.gutter,
                    count: grids.tablet.columns,
                    offset: grids.tablet.margin,
                    visible: true,
                    color: { r: 1, g: 0, b: 0, a: 0.1 }
                }
            ];

            // Mobile Grid Style
            let mobileStyle = figma.getLocalGridStyles().find(s => s.name === "Mobile Grid");
            if (!mobileStyle) {
                mobileStyle = figma.createGridStyle();
                mobileStyle.name = "Mobile Grid";
            }
            mobileStyle.layoutGrids = [
                {
                    pattern: 'COLUMNS',
                    alignment: 'STRETCH',
                    gutterSize: grids.mobile.gutter,
                    count: grids.mobile.columns,
                    offset: grids.mobile.margin,
                    visible: true,
                    color: { r: 1, g: 0, b: 0, a: 0.1 }
                }
            ];

            figma.notify('Created Desktop, Tablet, and Mobile grid styles successfully!');
        } catch (error) {
            figma.notify('Error creating grid styles: ' + error.message);
        }
    }

    if (msg.type === "create-typography-styles") {
        try {
            const baseFontSize = msg.baseFontSize;
            const scale = msg.scale;
            const primaryFont = msg.primaryFont;

            const typographyLevels = [
                { name: 'H1', multiplier: Math.pow(scale, 5) },
                { name: 'H2', multiplier: Math.pow(scale, 4) },
                { name: 'H3', multiplier: Math.pow(scale, 3) },
                { name: 'H4', multiplier: Math.pow(scale, 2) },
                { name: 'H5', multiplier: scale },
                { name: 'H6', multiplier: 1 },
                { name: 'BODY1', multiplier: 1 },
                { name: 'BODY2', multiplier: 0.875 },
                { name: 'CAPTION', multiplier: 0.75 }
            ];

            let createdCount = 0;

            for (const level of typographyLevels) {
                const fontSize = Math.round(baseFontSize * level.multiplier);
                const styleName = `Typography/${level.name}`;

                // Check if style already exists
                let textStyle = figma.getLocalTextStyles().find(s => s.name === styleName);

                if (!textStyle) {
                    textStyle = figma.createTextStyle();
                    textStyle.name = styleName;
                }

                // Load font before setting it
                await figma.loadFontAsync({ family: primaryFont, style: "Regular" });

                // Set font properties
                textStyle.fontSize = fontSize;
                textStyle.fontName = { family: primaryFont, style: "Regular" };
                textStyle.lineHeight = { value: 150, unit: "PERCENT" };

                createdCount++;
            }

            figma.notify(`Created ${createdCount} typography styles successfully!`);
        } catch (error) {
            figma.notify('Error creating typography styles: ' + error.message);
        }
    }

    if (msg.type === "create-typography-tokens") {
        try {
            const typographyData = msg.typographyData;
            const fontWeights = msg.fontWeights;
            const primaryFont = msg.primaryFont;

            // Get or create Typography collection
            let collection = figma.variables.getLocalVariableCollections().find(c => c.name === "Typography");
            if (!collection) {
                collection = figma.variables.createVariableCollection("Typography");
            }

            const modeId = collection.modes[0].modeId;

            // Step 1: Create Font Family variable
            let fontFamilyVar = figma.variables.getLocalVariables().find(v => v.name === "font-family/primary");
            if (!fontFamilyVar) {
                fontFamilyVar = figma.variables.createVariable("font-family/primary", collection, "STRING");
            }
            fontFamilyVar.setValueForMode(modeId, primaryFont);
            fontFamilyVar.description = "Primary font family for typography system";

            // Step 2: Create Font Weight variables
            for (const weight of fontWeights) {
                const weightVarName = `font-weight/${weight.name.toLowerCase()}`;
                let weightVar = figma.variables.getLocalVariables().find(v => v.name === weightVarName);
                if (!weightVar) {
                    weightVar = figma.variables.createVariable(weightVarName, collection, "FLOAT");
                }
                weightVar.setValueForMode(modeId, weight.weight);
                weightVar.description = `Font weight value for ${weight.name} (${weight.weight})`;
            }

            // Step 3: Create Font Size, Line Height, and Letter Spacing varia
            // les for each level
            for (const typo of typographyData) {
                // Font Size
                const fontSizeVarName = `font-size/${typo.name.toLowerCase()}`;
                let fontSizeVar = figma.variables.getLocalVariables().find(v => v.name === fontSizeVarName);
                if (!fontSizeVar) {
                    fontSizeVar = figma.variables.createVariable(fontSizeVarName, collection, "FLOAT");
                }
                fontSizeVar.setValueForMode(modeId, typo.fontSize);
                fontSizeVar.description = `Font size for ${typo.name} (${typo.fontSize}px)`;

                // Line Height (in pixels, not percentage)
                const lineHeightVarName = `line-height/${typo.name.toLowerCase()}`;
                let lineHeightVar = figma.variables.getLocalVariables().find(v => v.name === lineHeightVarName);
                if (!lineHeightVar) {
                    lineHeightVar = figma.variables.createVariable(lineHeightVarName, collection, "FLOAT");
                }
                lineHeightVar.setValueForMode(modeId, typo.lineHeight);
                lineHeightVar.description = `Line height for ${typo.name} (${typo.lineHeight}px)`;

                // Letter Spacing
                const letterSpacingVarName = `letter-spacing/${typo.name.toLowerCase()}`;
                let letterSpacingVar = figma.variables.getLocalVariables().find(v => v.name === letterSpacingVarName);
                if (!letterSpacingVar) {
                    letterSpacingVar = figma.variables.createVariable(letterSpacingVarName, collection, "FLOAT");
                }
                letterSpacingVar.setValueForMode(modeId, typo.letterSpacing);
                letterSpacingVar.description = `Letter spacing for ${typo.name} (${typo.letterSpacing}px)`;
            }

            // Step 4: Create Text Styles for each typography level with all font weights
            let textStylesCreated = 0;

            // Font style mapping for different weights
            const fontStyleMap = {
                'Regular': ['Regular', 'Normal', 'Book', 'Roman'],
                'Medium': ['Medium', 'Regular'],
                'Semibold': ['SemiBold', 'Semibold', 'Semi Bold', 'Demi Bold', 'DemiBold', 'Medium'],
                'Bold': ['Bold', 'Heavy', 'Black']
            };

            for (const typo of typographyData) {
                // Get the variables for this typography level
                const fontSizeVar = figma.variables.getLocalVariables().find(v => v.name === `font-size/${typo.name.toLowerCase()}`);
                const lineHeightVar = figma.variables.getLocalVariables().find(v => v.name === `line-height/${typo.name.toLowerCase()}`);
                const letterSpacingVar = figma.variables.getLocalVariables().find(v => v.name === `letter-spacing/${typo.name.toLowerCase()}`);

                for (const weight of fontWeights) {
                    let fontLoaded = false;
                    let loadedStyle = weight.name;

                    // Try to load font with different style variations
                    const stylesToTry = fontStyleMap[weight.name] || [weight.name];

                    for (const style of stylesToTry) {
                        try {
                            await figma.loadFontAsync({ family: primaryFont, style: style });
                            loadedStyle = style;
                            fontLoaded = true;
                            break;
                        } catch (e) {
                            // Continue to next style
                            continue;
                        }
                    }

                    if (!fontLoaded) {
                        console.warn(`Could not load ${primaryFont} ${weight.name}, skipping...`);
                        continue;
                    }

                    // Create text style name like "H1-56px/Regular"
                    const styleName = `${typo.name}-${typo.fontSize}px/${weight.name}`;

                    let textStyle = figma.getLocalTextStyles().find(s => s.name === styleName);
                    if (!textStyle) {
                        textStyle = figma.createTextStyle();
                        textStyle.name = styleName;
                    }

                    // Set font properties using the loaded style
                    textStyle.fontName = { family: primaryFont, style: loadedStyle };

                    // Bind variables to text style properties
                    const fontFamilyVar = figma.variables.getLocalVariables().find(v => v.name === "font-family/primary");
                    const fontWeightVar = figma.variables.getLocalVariables().find(v => v.name === `font-weight/${weight.name.toLowerCase()}`);

                    if (fontFamilyVar) {
                        textStyle.setBoundVariable('fontFamily', fontFamilyVar);
                    }

                    if (fontWeightVar) {
                        textStyle.setBoundVariable('fontWeight', fontWeightVar);
                    }

                    if (fontSizeVar) {
                        textStyle.setBoundVariable('fontSize', fontSizeVar);
                    } else {
                        textStyle.fontSize = typo.fontSize;
                    }

                    if (lineHeightVar) {
                        textStyle.setBoundVariable('lineHeight', lineHeightVar);
                    } else {
                        textStyle.lineHeight = { value: typo.lineHeight, unit: "PIXELS" };
                    }

                    if (letterSpacingVar) {
                        textStyle.setBoundVariable('letterSpacing', letterSpacingVar);
                    } else {
                        textStyle.letterSpacing = { value: typo.letterSpacing, unit: "PIXELS" };
                    }

                    textStylesCreated++;
                }
            }

            figma.notify(`Created typography system: Font family & weight variables, ${typographyData.length * 3} property variables (size/line-height/spacing), and ${textStylesCreated} text styles with variable bindings!`);
        } catch (error) {
            figma.notify('Error creating typography tokens: ' + error.message);
            console.error(error);
        }
    }
};
