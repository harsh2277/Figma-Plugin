// Color utility functions

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color code (e.g., "#FF0000")
 * @returns {Object} RGB object with r, g, b values (0-1 range)
 */
function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
}

/**
 * Darken a color by a specified amount
 * @param {Object} rgb - RGB color object
 * @param {number} amount - Amount to darken (0-1)
 * @returns {Object} Darkened RGB color
 */
function darkenColor(rgb, amount) {
    return {
        r: Math.max(0, rgb.r - amount),
        g: Math.max(0, rgb.g - amount),
        b: Math.max(0, rgb.b - amount)
    };
}

/**
 * Lighten a color by a specified amount
 * @param {Object} rgb - RGB color object
 * @param {number} amount - Amount to lighten (0-1)
 * @returns {Object} Lightened RGB color
 */
function lightenColor(rgb, amount) {
    return {
        r: Math.min(1, rgb.r + amount),
        g: Math.min(1, rgb.g + amount),
        b: Math.min(1, rgb.b + amount)
    };
}

// Export for use in plugin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hexToRgb, darkenColor, lightenColor };
}
