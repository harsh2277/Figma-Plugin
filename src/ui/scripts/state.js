// State Management for Design System Maker

const state = {
  colors: {
    primary: { value: '#6366f1', description: 'Primary brand color', enabled: true },
    secondary: { value: '#8b5cf6', description: 'Secondary brand color', enabled: true },
    success: { value: '#10b981', description: 'Success state color', enabled: true },
    error: { value: '#ef4444', description: 'Error state color', enabled: true },
    warning: { value: '#f59e0b', description: 'Warning/Process color', enabled: true },
    'neutral-1000': { value: '#000000', description: 'Black', enabled: true },
    'neutral-900': { value: '#111827', description: 'Darkest gray', enabled: true },
    'neutral-800': { value: '#1f2937', description: '', enabled: true },
    'neutral-700': { value: '#374151', description: '', enabled: true },
    'neutral-600': { value: '#4b5563', description: '', enabled: true },
    'neutral-500': { value: '#6b7280', description: 'Mid gray', enabled: true },
    'neutral-400': { value: '#9ca3af', description: '', enabled: true },
    'neutral-300': { value: '#d1d5db', description: '', enabled: true },
    'neutral-200': { value: '#e5e7eb', description: '', enabled: true },
    'neutral-100': { value: '#f3f4f6', description: '', enabled: true },
    'neutral-50': { value: '#f9fafb', description: 'Lightest gray', enabled: true },
    'neutral-0': { value: '#ffffff', description: 'White', enabled: true }
  },
  
  spacing: {
    'spacing-0': { value: 0, mobile: 0, tablet: 0, description: 'No spacing' },
    'spacing-1': { value: 4, mobile: 4, tablet: 4, description: 'Extra small' },
    'spacing-2': { value: 8, mobile: 6, tablet: 8, description: 'Small' },
    'spacing-3': { value: 12, mobile: 10, tablet: 12, description: '' },
    'spacing-4': { value: 16, mobile: 12, tablet: 16, description: 'Medium' },
    'spacing-5': { value: 20, mobile: 16, tablet: 20, description: '' },
    'spacing-6': { value: 24, mobile: 20, tablet: 24, description: 'Large' },
    'spacing-7': { value: 32, mobile: 24, tablet: 32, description: '' },
    'spacing-8': { value: 40, mobile: 32, tablet: 40, description: 'Extra large' },
    'spacing-9': { value: 48, mobile: 40, tablet: 48, description: '' },
    'spacing-10': { value: 64, mobile: 48, tablet: 64, description: 'XXL' }
  },
  
  padding: {
    'padding-0': { value: 0, mobile: 0, tablet: 0, description: 'No padding' },
    'padding-1': { value: 4, mobile: 4, tablet: 4, description: 'Extra small' },
    'padding-2': { value: 8, mobile: 6, tablet: 8, description: 'Small' },
    'padding-3': { value: 12, mobile: 10, tablet: 12, description: '' },
    'padding-4': { value: 16, mobile: 12, tablet: 16, description: 'Medium' },
    'padding-5': { value: 20, mobile: 16, tablet: 20, description: '' },
    'padding-6': { value: 24, mobile: 20, tablet: 24, description: 'Large' },
    'padding-7': { value: 32, mobile: 24, tablet: 32, description: '' },
    'padding-8': { value: 40, mobile: 32, tablet: 40, description: 'Extra large' },
    'padding-9': { value: 48, mobile: 40, tablet: 48, description: '' },
    'padding-10': { value: 64, mobile: 48, tablet: 64, description: 'XXL' }
  },
  
  radius: {
    none: { value: 0, mobile: 0, tablet: 0, description: 'No radius' },
    sm: { value: 4, mobile: 4, tablet: 4, description: 'Small radius' },
    md: { value: 6, mobile: 6, tablet: 6, description: 'Medium radius' },
    lg: { value: 8, mobile: 8, tablet: 8, description: 'Large radius' },
    xl: { value: 12, mobile: 10, tablet: 12, description: 'Extra large radius' },
    full: { value: 9999, mobile: 9999, tablet: 9999, description: 'Fully rounded' }
  },
  
  typography: {
    primaryFont: 'Inter',
    secondaryFont: '',
    secondaryEnabled: false,
    styles: {
      h1: { family: 'primary', size: 48, weight: 700, lineHeight: 1.2, letterSpacing: -0.5 },
      h2: { family: 'primary', size: 40, weight: 700, lineHeight: 1.3, letterSpacing: -0.3 },
      h3: { family: 'primary', size: 32, weight: 600, lineHeight: 1.3, letterSpacing: 0 },
      h4: { family: 'primary', size: 24, weight: 600, lineHeight: 1.4, letterSpacing: 0 },
      h5: { family: 'primary', size: 20, weight: 600, lineHeight: 1.4, letterSpacing: 0 },
      h6: { family: 'primary', size: 16, weight: 600, lineHeight: 1.5, letterSpacing: 0 },
      body1: { family: 'primary', size: 16, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
      body2: { family: 'primary', size: 14, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
      body3: { family: 'primary', size: 12, weight: 400, lineHeight: 1.4, letterSpacing: 0 },
      body4: { family: 'primary', size: 10, weight: 400, lineHeight: 1.4, letterSpacing: 0 }
    }
  },
  
  shadows: {
    'shadow-xs': { x: 0, y: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)', description: 'Extra small shadow' },
    'shadow-sm': { x: 0, y: 1, blur: 3, spread: 0, color: 'rgba(0,0,0,0.1)', description: 'Small shadow' },
    'shadow-md': { x: 0, y: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,0.1)', description: 'Medium shadow' },
    'shadow-lg': { x: 0, y: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)', description: 'Large shadow' },
    'shadow-xl': { x: 0, y: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)', description: 'Extra large shadow' }
  },
  
  borders: {
    widths: {
      thin: { value: 1, mobile: 1, tablet: 1, description: 'Thin border' },
      medium: { value: 2, mobile: 2, tablet: 2, description: 'Medium border' },
      thick: { value: 4, mobile: 3, tablet: 4, description: 'Thick border' }
    },
    styles: ['solid', 'dashed', 'dotted']
  },
  
  components: {
    button: {
      variants: {
        primary: { sizes: { small: {}, medium: {}, large: {} } },
        secondary: { sizes: { small: {}, medium: {}, large: {} } },
        tertiary: { sizes: { small: {}, medium: {}, large: {} } },
        ghost: { sizes: { small: {}, medium: {}, large: {} } },
        destructive: { sizes: { small: {}, medium: {}, large: {} } }
      }
    },
    input: { types: { text: {}, password: {}, textarea: {}, select: {} } }
  },
  
  themes: { 
    default: { colors: {}, components: {} } 
  },
  
  currentTheme: 'default',
  exportFormat: 'pretty',
  namingConvention: 'camelCase'
};

// Initialize default button configs
Object.keys(state.components.button.variants).forEach(variant => {
  Object.keys(state.components.button.variants[variant].sizes).forEach(size => {
    state.components.button.variants[variant].sizes[size] = {
      default: { 
        bg: 'primary', 
        text: 'neutral-0', 
        border: 'primary', 
        shadow: 'shadow-sm', 
        paddingX: 'spacing-4', 
        paddingY: 'spacing-2', 
        radius: 'md', 
        font: 'body' 
      },
      hover: { bg: 'primary', text: 'neutral-0' },
      pressed: { bg: 'primary', text: 'neutral-0' },
      disabled: { bg: 'neutral-200', text: 'neutral-400' }
    };
  });
});

// Export state
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { state };
}
