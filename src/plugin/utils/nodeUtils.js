// Node utility functions for Figma

/**
 * Apply color to all vector nodes in a tree
 * @param {SceneNode} node - Figma node to process
 * @param {Object} color - RGB color object
 */
function applyColorToNode(node, color) {
    if (node.type === 'VECTOR') {
        // Apply fill color if the node has fills
        if (node.fills && node.fills !== figma.mixed && node.fills.length > 0) {
            node.fills = [{ type: 'SOLID', color: color }];
        }
        // Apply stroke color if the node has strokes (for line icons)
        if (node.strokes && node.strokes !== figma.mixed && node.strokes.length > 0) {
            node.strokes = [{ type: 'SOLID', color: color }];
        }
    }
    if ('children' in node) {
        node.children.forEach(child => applyColorToNode(child, color));
    }
}

/**
 * Apply color to icon instance
 * @param {InstanceNode} iconInstance - Icon instance node
 * @param {Object} color - RGB color object
 */
function applyColorToIconInstance(iconInstance, color) {
    iconInstance.children.forEach(child => {
        if (child.type === 'VECTOR') {
            // Apply fill color if exists
            if (child.fills && child.fills !== figma.mixed && child.fills.length > 0) {
                child.fills = [{ type: 'SOLID', color: color }];
            }
            // Apply stroke color if exists (for line icons)
            if (child.strokes && child.strokes !== figma.mixed && child.strokes.length > 0) {
                child.strokes = [{ type: 'SOLID', color: color }];
            }
        }
    });
}

/**
 * Create icon component from SVG string
 * @param {string} svgString - SVG content
 * @param {string} name - Component name
 * @param {Object} color - RGB color object
 * @param {number} size - Icon size in pixels
 * @returns {ComponentNode} Created icon component
 */
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
    applyColorToNode(svgNode, color);
    
    // Flatten the SVG node - move all vector children directly to component
    if (svgNode.type === 'FRAME' || svgNode.type === 'GROUP') {
        const children = [...svgNode.children];
        children.forEach(child => {
            // Adjust child position relative to component
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

// Export for use in plugin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        applyColorToNode, 
        applyColorToIconInstance, 
        createIconComponent 
    };
}
