// Button Component Handler
// Creates button component sets with variants, states, and properties

/**
 * Create button component set with all variants
 * @param {string} buttonText - Button text content
 * @param {string} bgColor - Background color (hex)
 * @param {string} textColor - Text color (hex)
 * @param {number} radius - Border radius
 */
async function createButtonComponentSet(buttonText, bgColor, textColor, radius) {
    // Load fonts
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    
    // Helper to convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 0, g: 0, b: 0 };
    }

    // Helper to darken color
    function darkenColor(rgb, amount) {
        return {
            r: Math.max(0, rgb.r - amount),
            g: Math.max(0, rgb.g - amount),
            b: Math.max(0, rgb.b - amount)
        };
    }

    // Helper to lighten color
    function lightenColor(rgb, amount) {
        return {
            r: Math.min(1, rgb.r + amount),
            g: Math.min(1, rgb.g + amount),
            b: Math.min(1, rgb.b + amount)
        };
    }

    // Helper to create icon component from SVG
    function createIconComponent(svgString, name, color, size = 16) {
        const iconComponent = figma.createComponent();
        iconComponent.name = name;
        iconComponent.resize(size, size);
        iconComponent.fills = [];
        
        const svgNode = figma.createNodeFromSvg(svgString);
        
        // Resize to fit
        const scaleX = size / svgNode.width;
        const scaleY = size / svgNode.height;
        const scale = Math.min(scaleX, scaleY);
        svgNode.resize(svgNode.width * scale, svgNode.height * scale);
        
        // Center the SVG
        svgNode.x = (size - svgNode.width) / 2;
        svgNode.y = (size - svgNode.height) / 2;
        
        // Apply color to all vector paths
        function applyColorToNode(node) {
            if (node.type === 'VECTOR') {
                if (node.fills && node.fills !== figma.mixed && node.fills.length > 0) {
                    node.fills = [{ type: 'SOLID', color: color }];
                }
                if (node.strokes && node.strokes !== figma.mixed && node.strokes.length > 0) {
                    node.strokes = [{ type: 'SOLID', color: color }];
                }
            }
            if ('children' in node) {
                node.children.forEach(child => applyColorToNode(child));
            }
        }
        applyColorToNode(svgNode);
        
        // Flatten the SVG node
        if (svgNode.type === 'FRAME' || svgNode.type === 'GROUP') {
            const children = [...svgNode.children];
            children.forEach(child => {
                child.x += svgNode.x;
                child.y += svgNode.y;
                iconComponent.appendChild(child);
            });
            svgNode.remove();
        } else {
            iconComponent.appendChild(svgNode);
        }
        
        return iconComponent;
    }
    
    // Vuesax arrow icons SVG strings
    const arrowLeftSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5 12H3.67" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    
    const arrowRightSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.43 5.92993L20.5 11.9999L14.43 18.0699" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 12H20.33" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    
    // Create icon components
    const baseRgb = hexToRgb(bgColor);
    const textRgb = hexToRgb(textColor);
    
    const leftIconComponent = createIconComponent(arrowLeftSVG, "Icon/arrow-left", textRgb, 16);
    const rightIconComponent = createIconComponent(arrowRightSVG, "Icon/arrow-right", textRgb, 16);
    
    // Add icon components to page
    figma.currentPage.appendChild(leftIconComponent);
    figma.currentPage.appendChild(rightIconComponent);
    
    const spacing = 20;
    
    // Button size configurations
    const sizes = [
        { name: 'Small', height: 32, paddingX: 12, paddingY: 6, fontSize: 12, iconSize: 14 },
        { name: 'Medium', height: 40, paddingX: 16, paddingY: 10, fontSize: 14, iconSize: 16 },
        { name: 'Large', height: 48, paddingX: 20, paddingY: 12, fontSize: 16, iconSize: 18 }
    ];
    
    // Button variants with their configurations
    const variants = [
        {
            name: 'Primary',
            states: [
                { name: 'Default', bgColor: baseRgb, textColor: textRgb, borderColor: null, borderWidth: 0 },
                { name: 'Hover', bgColor: darkenColor(baseRgb, 0.08), textColor: textRgb, borderColor: null, borderWidth: 0 },
                { name: 'Click', bgColor: darkenColor(baseRgb, 0.15), textColor: textRgb, borderColor: null, borderWidth: 0 },
                { name: 'Disabled', bgColor: { r: 0.88, g: 0.88, b: 0.88 }, textColor: { r: 0.6, g: 0.6, b: 0.6 }, borderColor: null, borderWidth: 0 }
            ]
        },
        {
            name: 'Secondary',
            states: [
                { name: 'Default', bgColor: { r: 1, g: 1, b: 1 }, textColor: baseRgb, borderColor: baseRgb, borderWidth: 1 },
                { name: 'Hover', bgColor: lightenColor(baseRgb, 0.85), textColor: baseRgb, borderColor: baseRgb, borderWidth: 1 },
                { name: 'Click', bgColor: lightenColor(baseRgb, 0.75), textColor: baseRgb, borderColor: baseRgb, borderWidth: 1 },
                { name: 'Disabled', bgColor: { r: 0.98, g: 0.98, b: 0.98 }, textColor: { r: 0.7, g: 0.7, b: 0.7 }, borderColor: { r: 0.85, g: 0.85, b: 0.85 }, borderWidth: 1 }
            ]
        },
        {
            name: 'Link',
            states: [
                { name: 'Default', bgColor: { r: 0, g: 0, b: 0, a: 0 }, textColor: baseRgb, borderColor: null, borderWidth: 0, textDecoration: 'UNDERLINE' },
                { name: 'Hover', bgColor: { r: 0, g: 0, b: 0, a: 0 }, textColor: darkenColor(baseRgb, 0.1), borderColor: null, borderWidth: 0, textDecoration: 'UNDERLINE' },
                { name: 'Click', bgColor: { r: 0, g: 0, b: 0, a: 0 }, textColor: darkenColor(baseRgb, 0.15), borderColor: null, borderWidth: 0, textDecoration: 'UNDERLINE' },
                { name: 'Disabled', bgColor: { r: 0, g: 0, b: 0, a: 0 }, textColor: { r: 0.7, g: 0.7, b: 0.7 }, borderColor: null, borderWidth: 0, textDecoration: 'UNDERLINE' }
            ]
        }
    ];
    
    // Icon configurations
    const iconConfigs = [
        { leftIcon: false, rightIcon: false }
    ];
    
    // Manual positioning variables
    const buttonWidth = 120;
    const buttonSpacing = 20;
    let xOffset = 0;
    let yOffset = 0;
    
    // Array to store all components
    const components = [];
    
    // Helper to apply color to icon instances
    function applyColorToIconInstance(iconInstance, color) {
        iconInstance.children.forEach(child => {
            if (child.type === 'VECTOR') {
                if (child.fills && child.fills !== figma.mixed && child.fills.length > 0) {
                    child.fills = [{ type: 'SOLID', color: color }];
                }
                if (child.strokes && child.strokes !== figma.mixed && child.strokes.length > 0) {
                    child.strokes = [{ type: 'SOLID', color: color }];
                }
            }
        });
    }
    
    // Create variants organized by size, then variant type in rows
    for (const size of sizes) {
        for (const variant of variants) {
            xOffset = 0; // Reset x for each row
            
            for (const state of variant.states) {
                for (const iconConfig of iconConfigs) {
                    // Create button component
                    const button = figma.createComponent();
                    button.name = `Size=${size.name}, Variant=${variant.name}, State=${state.name}`;
                    button.resize(120, size.height);
                    button.x = xOffset;
                    button.y = yOffset;
                    
                    // Background
                    if (state.bgColor.a !== undefined && state.bgColor.a === 0) {
                        button.fills = [];
                    } else {
                        button.fills = [{ type: 'SOLID', color: state.bgColor }];
                    }
                    
                    button.cornerRadius = radius;
                    
                    // Border for secondary buttons
                    if (state.borderColor && state.borderWidth > 0) {
                        button.strokes = [{ type: 'SOLID', color: state.borderColor }];
                        button.strokeWeight = state.borderWidth;
                    }
                    
                    // Create auto-layout for content
                    button.layoutMode = 'HORIZONTAL';
                    button.primaryAxisAlignItems = 'CENTER';
                    button.counterAxisAlignItems = 'CENTER';
                    button.primaryAxisSizingMode = 'AUTO';
                    button.paddingLeft = size.paddingX;
                    button.paddingRight = size.paddingX;
                    button.paddingTop = size.paddingY;
                    button.paddingBottom = size.paddingY;
                    button.itemSpacing = 8;
                    
                    // Add left icon
                    const leftIcon = leftIconComponent.createInstance();
                    leftIcon.name = "LeftIcon";
                    leftIcon.resize(size.iconSize, size.iconSize);
                    leftIcon.visible = false;
                    applyColorToIconInstance(leftIcon, state.textColor);
                    button.appendChild(leftIcon);
                    
                    // Add text
                    const text = figma.createText();
                    text.fontName = { family: "Inter", style: "Medium" };
                    text.fontSize = size.fontSize;
                    text.characters = buttonText;
                    text.fills = [{ type: 'SOLID', color: state.textColor }];
                    
                    if (state.textDecoration === 'UNDERLINE') {
                        text.textDecoration = 'UNDERLINE';
                    }
                    
                    button.appendChild(text);
                    
                    // Add right icon
                    const rightIcon = rightIconComponent.createInstance();
                    rightIcon.name = "RightIcon";
                    rightIcon.resize(size.iconSize, size.iconSize);
                    rightIcon.visible = false;
                    applyColorToIconInstance(rightIcon, state.textColor);
                    button.appendChild(rightIcon);
                    
                    // Add to current page and components array
                    figma.currentPage.appendChild(button);
                    components.push(button);
                    
                    // Move to next button position
                    xOffset += buttonWidth + buttonSpacing;
                }
            }
            
            // Move to next row
            yOffset += size.height + buttonSpacing;
        }
    }
    
    // Combine all components into a component set
    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Button";
    
    // Remove auto-layout and set manual positioning
    componentSet.layoutMode = 'NONE';
    componentSet.fills = [];
    
    // Position icon components near the button component set
    leftIconComponent.x = componentSet.x + componentSet.width + 100;
    leftIconComponent.y = componentSet.y;
    rightIconComponent.x = leftIconComponent.x + leftIconComponent.width + 20;
    rightIconComponent.y = componentSet.y;
    
    // Add boolean properties for LeftIcon and RightIcon
    const leftIconPropKey = componentSet.addComponentProperty("LeftIcon", "BOOLEAN", false);
    const rightIconPropKey = componentSet.addComponentProperty("RightIcon", "BOOLEAN", false);
    
    // Bind boolean properties to icon visibility
    componentSet.children.forEach(component => {
        const leftIconLayer = component.findOne(node => node.name === "LeftIcon");
        const rightIconLayer = component.findOne(node => node.name === "RightIcon");
        
        if (leftIconLayer) {
            leftIconLayer.componentPropertyReferences = { visible: leftIconPropKey };
        }
        
        if (rightIconLayer) {
            rightIconLayer.componentPropertyReferences = { visible: rightIconPropKey };
        }
    });
    
    // Center in viewport
    figma.viewport.scrollAndZoomIntoView([componentSet, leftIconComponent, rightIconComponent]);
    
    const totalVariants = sizes.length * variants.length * variants[0].states.length * iconConfigs.length;
    figma.notify(`✅ Button component set created with 3 sizes, 3 variants, 4 states! Total: ${totalVariants} components`);
}

// Export for use in plugin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createButtonComponentSet };
}
