// Design System JSON Maker - Main Application Logic

// State Management
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
    'spacing-0': { value: 0, description: 'No spacing' },
    'spacing-1': { value: 4, description: 'Extra small' },
    'spacing-2': { value: 8, description: 'Small' },
    'spacing-3': { value: 12, description: '' },
    'spacing-4': { value: 16, description: 'Medium' },
    'spacing-5': { value: 20, description: '' },
    'spacing-6': { value: 24, description: 'Large' },
    'spacing-7': { value: 32, description: '' },
    'spacing-8': { value: 40, description: 'Extra large' },
    'spacing-9': { value: 48, description: '' },
    'spacing-10': { value: 64, description: 'XXL' }
  },
  radius: {
    none: { value: 0, description: 'No radius' },
    sm: { value: 4, description: 'Small radius' },
    md: { value: 6, description: 'Medium radius' },
    lg: { value: 8, description: 'Large radius' },
    xl: { value: 12, description: 'Extra large radius' },
    full: { value: 9999, description: 'Fully rounded' }
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
      thin: { value: 1, description: 'Thin border' },
      medium: { value: 2, description: 'Medium border' },
      thick: { value: 4, description: 'Thick border' }
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
  themes: { default: { colors: {}, components: {} } },
  currentTheme: 'default',
  exportFormat: 'pretty',
  namingConvention: 'camelCase'
};

// Initialize default button configs
Object.keys(state.components.button.variants).forEach(variant => {
  Object.keys(state.components.button.variants[variant].sizes).forEach(size => {
    state.components.button.variants[variant].sizes[size] = {
      default: { bg: 'primary', text: 'neutral-0', border: 'primary', shadow: 'shadow-sm', paddingX: 'spacing-4', paddingY: 'spacing-2', radius: 'md', font: 'body' },
      hover: { bg: 'primary', text: 'neutral-0' },
      pressed: { bg: 'primary', text: 'neutral-0' },
      disabled: { bg: 'neutral-200', text: 'neutral-400' }
    };
  });
});

// Tab Navigation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Render Functions
function renderFoundations() {
  const container = document.getElementById('foundations-content');
  container.innerHTML =
    renderColorsSection() +
    renderSpacingSection() +
    renderRadiusSection() +
    renderTypographySection() +
    renderShadowsSection();
}

function renderColorsSection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">🎨 Colors System</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content"><table class="token-table"><thead><tr>';
  html += '<th>Token Name</th><th>Color</th><th>HEX Value</th><th>Description</th>';
  html += '<th>Enabled</th><th>Actions</th></tr></thead><tbody>';

  Object.entries(state.colors).forEach(([key, data]) => {
    const isSecondary = key === 'secondary';
    html += '<tr><td><input class="form-input" value="' + key + '" data-color-key="' + key + '" onchange="updateColorKey(this)"/></td>';
    html += '<td><div class="color-picker"><input type="color" value="' + data.value + '" data-color="' + key + '" onchange="updateColor(this)"/></div></td>';
    html += '<td><input class="form-input" value="' + data.value + '" data-color-hex="' + key + '" onchange="updateColorHex(this)"/></td>';
    html += '<td><input class="form-input" placeholder="Description" value="' + (data.description || '') + '" data-color-desc="' + key + '" onchange="updateColorDesc(this)"/></td>';
    html += '<td>';
    if (isSecondary) {
      html += '<label class="toggle-switch"><input type="checkbox" ' + (data.enabled ? 'checked' : '') + ' data-color-toggle="' + key + '" onchange="toggleColor(this)"/><span class="toggle-slider"></span></label>';
    } else {
      html += '<span class="text-muted">—</span>';
    }
    html += '</td>';
    html += '<td><button class="btn btn-sm btn-danger" onclick="deleteColor(\'' + key + '\')">Delete</button></td></tr>';
  });

  html += '</tbody></table>';
  html += '<button class="btn btn-secondary mt-16" onclick="addColor()">+ Add Color</button>';
  html += '</div></div>';
  return html;
}

function renderSpacingSection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">📏 Spacing System</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content"><table class="token-table"><thead><tr>';
  html += '<th>Token Name</th><th>Value (px)</th><th>Description</th><th>Actions</th>';
  html += '</tr></thead><tbody>';

  Object.entries(state.spacing).forEach(([key, data]) => {
    html += '<tr><td><input class="form-input" value="' + key + '" data-spacing-key="' + key + '" onchange="updateSpacingKey(this)"/></td>';
    html += '<td><input type="number" class="form-input" value="' + data.value + '" data-spacing="' + key + '" onchange="updateSpacing(this)"/></td>';
    html += '<td><input class="form-input" placeholder="Description" value="' + (data.description || '') + '" data-spacing-desc="' + key + '" onchange="updateSpacingDesc(this)"/></td>';
    html += '<td><button class="btn btn-sm btn-danger" onclick="deleteSpacing(\'' + key + '\')">Delete</button></td></tr>';
  });

  html += '</tbody></table>';
  html += '<button class="btn btn-secondary mt-16" onclick="addSpacing()">+ Add Spacing</button>';
  html += '</div></div>';
  return html;
}

function renderRadiusSection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">⭕ Radius System</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content"><table class="token-table"><thead><tr>';
  html += '<th>Token Name</th><th>Value (px)</th><th>Description</th></tr></thead><tbody>';

  Object.entries(state.radius).forEach(([key, data]) => {
    html += '<tr><td>' + key + '</td>';
    html += '<td><input type="number" class="form-input" value="' + data.value + '" data-radius="' + key + '" onchange="updateRadius(this)"/></td>';
    html += '<td><input class="form-input" placeholder="Description" value="' + (data.description || '') + '" data-radius-desc="' + key + '" onchange="updateRadiusDesc(this)"/></td></tr>';
  });

  html += '</tbody></table></div></div>';
  return html;
}

function renderTypographySection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">🔤 Typography System</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content">';
  html += '<p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">Typography settings are managed in the Typography tab.</p>';
  html += '</div></div>';
  return html;
}

function renderShadowsSection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">💫 Shadows & Borders</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content">';
  html += '<h4 class="form-label mb-16" style="font-size: 13px; font-weight: 600;">Shadows</h4>';

  Object.entries(state.shadows).forEach(([key, shadow]) => {
    html += '<div class="form-group"><label class="form-label">' + key + '</label><div class="form-row">';
    html += '<div><label class="form-label text-sm">X</label><input type="number" class="form-input" value="' + shadow.x + '" data-shadow-x="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '<div><label class="form-label text-sm">Y</label><input type="number" class="form-input" value="' + shadow.y + '" data-shadow-y="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '<div><label class="form-label text-sm">Blur</label><input type="number" class="form-input" value="' + shadow.blur + '" data-shadow-blur="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '<div><label class="form-label text-sm">Spread</label><input type="number" class="form-input" value="' + shadow.spread + '" data-shadow-spread="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '<div><label class="form-label text-sm">Color (RGBA)</label><input class="form-input" value="' + shadow.color + '" data-shadow-color="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '<div><label class="form-label text-sm">Description</label><input class="form-input" placeholder="Description" value="' + (shadow.description || '') + '" data-shadow-desc="' + key + '" onchange="updateShadow(this)"/></div>';
    html += '</div></div>';
  });

  html += '<h4 class="form-label mb-16 mt-16" style="font-size: 13px; font-weight: 600;">Border Widths</h4>';
  Object.entries(state.borders.widths).forEach(([key, data]) => {
    html += '<div class="form-group"><div class="form-row">';
    html += '<div><label class="form-label">' + key + '</label><input type="number" class="form-input" value="' + data.value + '" data-border-width="' + key + '" onchange="updateBorderWidth(this)"/></div>';
    html += '<div><label class="form-label">Description</label><input class="form-input" placeholder="Description" value="' + (data.description || '') + '" data-border-width-desc="' + key + '" onchange="updateBorderWidthDesc(this)"/></div>';
    html += '</div></div>';
  });

  html += '<h4 class="form-label mb-16 mt-16" style="font-size: 13px; font-weight: 600;">Border Styles</h4>';
  html += '<p class="text-muted text-sm">' + state.borders.styles.join(', ') + '</p>';
  html += '</div></div>';
  return html;
}

function renderComponents() {
  document.getElementById('components-content').innerHTML = '<div class="component-builder"><div><h3 class="mb-16">Button Component</h3><div class="variant-selector">' + Object.keys(state.components.button.variants).map(v => '<button class="variant-btn ' + (v === 'primary' ? 'active' : '') + '" onclick="selectVariant(\'' + v + '\')">' + v + '</button>').join('') + '</div><div id="button-config"></div></div><div class="component-preview"><div class="preview-title">Live Preview</div><div id="button-preview"></div></div></div>';
}

function renderTypography() {
  console.log('renderTypography called');
  const container = document.getElementById('typography-content');
  console.log('Container found:', container);
  if (!container) {
    console.error('Typography content container not found');
    return;
  }
  
  console.log('Typography state:', state.typography);
  let html = '<div style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 24px;">';
  
  // Font Family Selection Card
  html += '<div class="card">';
  html += '<div class="card-header" onclick="toggleCard(this)">';
  html += '<div class="card-title">🔤 Font Families</div>';
  html += '<svg class="collapse-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  html += '</div>';
  html += '<div class="card-body">';
  
  // Primary Font
  html += '<div style="margin-bottom: 16px;">';
  html += '<label style="font-size: 11px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; display: block;">Primary Font</label>';
  html += '<input type="text" id="primaryFont" value="' + state.typography.primaryFont + '" placeholder="Enter font name" onchange="updatePrimaryFont(this.value)" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;">';
  html += '</div>';
  
  // Secondary Font (Optional)
  html += '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">';
  html += '<label class="toggle-switch"><input type="checkbox" id="secondaryToggle" ' + (state.typography.secondaryEnabled ? 'checked' : '') + ' onchange="toggleSecondaryFont(this.checked)"><span class="toggle-slider"></span></label>';
  html += '<label style="font-size: 11px; font-weight: 600; color: var(--text-primary);">Secondary Font (Optional)</label>';
  html += '</div>';
  html += '<input type="text" id="secondaryFont" value="' + state.typography.secondaryFont + '" placeholder="Enter secondary font name" onchange="updateSecondaryFont(this.value)" ' + (state.typography.secondaryEnabled ? '' : 'disabled') + ' style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; opacity: ' + (state.typography.secondaryEnabled ? '1' : '0.5') + ';">';
  
  html += '</div></div>';
  
  // Typography Styles Card
  html += '<div class="card">';
  html += '<div class="card-header" onclick="toggleCard(this)">';
  html += '<div class="card-title">📝 Typography Styles</div>';
  html += '<svg class="collapse-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  html += '</div>';
  html += '<div class="card-body">';
  
  Object.entries(state.typography.styles).forEach(([key, style]) => {
    const fontFamily = style.family === 'primary' ? state.typography.primaryFont : state.typography.secondaryFont;
    html += '<div class="typography-item">';
    html += '<div class="typography-preview" style="font-family: ' + fontFamily + '; font-size: ' + style.size + 'px; font-weight: ' + style.weight + '; line-height: ' + style.lineHeight + '; letter-spacing: ' + style.letterSpacing + 'px;">The quick brown fox jumps over the lazy dog</div>';
    html += '<div class="typography-details">';
    html += '<div class="typography-name">' + key.toUpperCase() + '</div>';
    html += '<div class="typography-specs">' + fontFamily + ' • ' + style.size + 'px • ' + style.weight + '</div>';
    html += '</div>';
    html += '<div class="typography-controls">';
    html += '<select onchange="updateTypographyFamily(\'' + key + '\', this.value)" style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 11px; margin-right: 8px;">';
    html += '<option value="primary" ' + (style.family === 'primary' ? 'selected' : '') + '>Primary</option>';
    if (state.typography.secondaryEnabled) {
      html += '<option value="secondary" ' + (style.family === 'secondary' ? 'selected' : '') + '>Secondary</option>';
    }
    html += '</select>';
    html += '<input type="number" value="' + style.size + '" onchange="updateTypographySize(\'' + key + '\', this.value)" style="width: 60px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 11px; margin-right: 8px;" placeholder="Size">';
    html += '<input type="number" value="' + style.weight + '" onchange="updateTypographyWeight(\'' + key + '\', this.value)" style="width: 60px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 11px;" placeholder="Weight">';
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div></div>';
  
  // Create Styles Button
  html += '<button class="btn btn-primary" onclick="createTextStyles()" style="width: 100%; padding: 12px; font-size: 13px; font-weight: 600; margin-top: 16px;">';
  html += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>';
  html += 'Create Text Styles in Figma';
  html += '</button>';
  
  html += '</div>';
  container.innerHTML = html;
}

function updatePrimaryFont(value) {
  state.typography.primaryFont = value;
  renderTypography();
}

function updateSecondaryFont(value) {
  state.typography.secondaryFont = value;
  renderTypography();
}

function toggleSecondaryFont(enabled) {
  state.typography.secondaryEnabled = enabled;
  renderTypography();
}

function updateTypographyFamily(key, family) {
  state.typography.styles[key].family = family;
  renderTypography();
}

function updateTypographySize(key, size) {
  state.typography.styles[key].size = parseInt(size);
  renderTypography();
}

function updateTypographyWeight(key, weight) {
  state.typography.styles[key].weight = parseInt(weight);
  renderTypography();
}

function createTextStyles() {
  parent.postMessage({ 
    pluginMessage: { 
      type: 'create-text-styles',
      typography: state.typography
    } 
  }, '*');
}

function renderExport() {
  const json = generateJSON();
  let html = '<div class="export-options">';
  html += '<div class="option-card"><div class="option-card-title">Format</div>';
  html += '<select class="form-select" onchange="state.exportFormat = this.value; renderExport()">';
  html += '<option value="pretty" ' + (state.exportFormat === 'pretty' ? 'selected' : '') + '>Pretty JSON</option>';
  html += '<option value="minified" ' + (state.exportFormat === 'minified' ? 'selected' : '') + '>Minified JSON</option>';
  html += '</select></div>';
  html += '<div class="option-card"><div class="option-card-title">Naming Convention</div>';
  html += '<select class="form-select" onchange="state.namingConvention = this.value; renderExport()">';
  html += '<option value="camelCase" ' + (state.namingConvention === 'camelCase' ? 'selected' : '') + '>camelCase</option>';
  html += '<option value="kebab-case" ' + (state.namingConvention === 'kebab-case' ? 'selected' : '') + '>kebab-case</option>';
  html += '<option value="snake_case" ' + (state.namingConvention === 'snake_case' ? 'selected' : '') + '>snake_case</option>';
  html += '</select></div></div>';
  html += '<div class="json-preview">' + (state.exportFormat === 'pretty' ? JSON.stringify(json, null, 2) : JSON.stringify(json)) + '</div>';
  html += '<div class="flex flex-gap-12 mt-16">';
  html += '<button class="btn btn-primary" onclick="copyJSON()">📋 Copy JSON</button>';
  html += '<button class="btn btn-secondary" onclick="downloadJSON()">⬇️ Download JSON</button>';
  html += '</div>';
  document.getElementById('export-content').innerHTML = html;
}

// Helper Functions
function toggleSection(header) {
  header.parentElement.classList.toggle('collapsed');
}

function updateColor(input) {
  const key = input.dataset.color;
  state.colors[key].value = input.value;
}

function updateColorHex(input) {
  const key = input.dataset.colorHex;
  state.colors[key].value = input.value;
  renderFoundations();
}

function updateColorKey(input) {
  const oldKey = input.dataset.colorKey;
  const newKey = input.value;
  if (oldKey !== newKey && newKey) {
    state.colors[newKey] = state.colors[oldKey];
    delete state.colors[oldKey];
    renderFoundations();
  }
}

function updateColorDesc(input) {
  const key = input.dataset.colorDesc;
  state.colors[key].description = input.value;
}

function toggleColor(input) {
  const key = input.dataset.colorToggle;
  state.colors[key].enabled = input.checked;
}

function addColor() {
  const key = prompt('Enter color token name:') || 'color-' + (Object.keys(state.colors).length + 1);
  state.colors[key] = { value: '#000000', description: '', enabled: true };
  renderFoundations();
}

function deleteColor(key) {
  if (confirm('Delete color "' + key + '"?')) {
    delete state.colors[key];
    renderFoundations();
  }
}

function updateSpacing(input) {
  const key = input.dataset.spacing;
  state.spacing[key].value = parseInt(input.value);
}

function updateSpacingKey(input) {
  const oldKey = input.dataset.spacingKey;
  const newKey = input.value;
  if (oldKey !== newKey && newKey) {
    state.spacing[newKey] = state.spacing[oldKey];
    delete state.spacing[oldKey];
    renderFoundations();
  }
}

function updateSpacingDesc(input) {
  const key = input.dataset.spacingDesc;
  state.spacing[key].description = input.value;
}

function addSpacing() {
  const key = 'spacing-' + Object.keys(state.spacing).length;
  state.spacing[key] = { value: 0, description: '' };
  renderFoundations();
}

function deleteSpacing(key) {
  if (confirm('Delete spacing "' + key + '"?')) {
    delete state.spacing[key];
    renderFoundations();
  }
}

function updateRadius(input) {
  const key = input.dataset.radius;
  state.radius[key].value = parseInt(input.value);
}

function updateRadiusDesc(input) {
  const key = input.dataset.radiusDesc;
  state.radius[key].description = input.value;
}

// Typography functions moved to renderTypography()

function updateShadow(input) {
  const key = input.dataset.shadowX || input.dataset.shadowY || input.dataset.shadowBlur || input.dataset.shadowSpread || input.dataset.shadowColor || input.dataset.shadowDesc;
  if (input.dataset.shadowX) state.shadows[key].x = parseInt(input.value);
  if (input.dataset.shadowY) state.shadows[key].y = parseInt(input.value);
  if (input.dataset.shadowBlur) state.shadows[key].blur = parseInt(input.value);
  if (input.dataset.shadowSpread) state.shadows[key].spread = parseInt(input.value);
  if (input.dataset.shadowColor) state.shadows[key].color = input.value;
  if (input.dataset.shadowDesc) state.shadows[key].description = input.value;
}

function updateBorderWidth(input) {
  const key = input.dataset.borderWidth;
  state.borders.widths[key].value = parseInt(input.value);
}

function updateBorderWidthDesc(input) {
  const key = input.dataset.borderWidthDesc;
  state.borders.widths[key].description = input.value;
}

function selectVariant(variant) {
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// Typography functions are handled in renderTypography()

function generateJSON() {
  const colors = {};
  Object.entries(state.colors).forEach(([key, data]) => {
    if (data.enabled) {
      colors[key] = data.value;
    }
  });

  const spacing = {};
  Object.entries(state.spacing).forEach(([key, data]) => {
    spacing[key] = data.value;
  });

  const radius = {};
  Object.entries(state.radius).forEach(([key, data]) => {
    radius[key] = data.value;
  });

  const typography = {
    fonts: {
      primary: state.typography.primaryFont,
      secondary: state.typography.secondaryEnabled ? state.typography.secondaryFont : null
    },
    styles: {}
  };
  Object.entries(state.typography.styles).forEach(([key, style]) => {
    const fontFamily = style.family === 'primary' ? state.typography.primaryFont : state.typography.secondaryFont;
    typography.styles[key] = {
      fontFamily: fontFamily,
      fontSize: style.size,
      fontWeight: style.weight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing
    };
  });

  const shadows = {};
  Object.entries(state.shadows).forEach(([key, shadow]) => {
    shadows[key] = shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px ' + shadow.spread + 'px ' + shadow.color;
  });

  const borders = {
    widths: {},
    styles: state.borders.styles
  };
  Object.entries(state.borders.widths).forEach(([key, data]) => {
    borders.widths[key] = data.value;
  });

  return {
    meta: {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      generatedBy: 'Design System JSON Maker'
    },
    colors: colors,
    spacing: spacing,
    radius: radius,
    typography: typography,
    shadows: shadows,
    borders: borders,
    components: state.components,
    themes: state.themes
  };
}

function copyJSON() {
  const json = JSON.stringify(generateJSON(), null, state.exportFormat === 'pretty' ? 2 : 0);
  navigator.clipboard.writeText(json).then(() => {
    parent.postMessage({ pluginMessage: { type: 'notify', message: 'JSON copied to clipboard!' } }, '*');
  });
}

function downloadJSON() {
  const json = JSON.stringify(generateJSON(), null, state.exportFormat === 'pretty' ? 2 : 0);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'design-system.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Event Listeners
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset all settings to defaults?')) {
    location.reload();
  }
});

document.getElementById('generate-json-btn').addEventListener('click', () => {
  document.querySelector('[data-tab="export"]').click();
  renderExport();
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  console.log('Initializing app...');
  renderFoundations();
  renderComponents();
  renderTypography();
  renderExport();
  console.log('App initialized');
}
