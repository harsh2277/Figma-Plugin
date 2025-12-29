// Foundations Component - Colors, Spacing, Radius, Shadows, Borders

/**
 * Render all foundations sections
 */
function renderFoundations() {
  const container = document.getElementById('foundations-content');
  if (!container) return;
  
  container.innerHTML =
    renderColorsSection() +
    renderSpacingSection() +
    renderRadiusSection() +
    renderTypographySection() +
    renderShadowsSection();
}

/**
 * Render colors section
 */
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

/**
 * Render spacing section
 */
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

/**
 * Render radius section
 */
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

/**
 * Render typography section placeholder
 */
function renderTypographySection() {
  let html = '<div class="section collapsed"><div class="section-header" onclick="toggleSection(this)">';
  html += '<div class="section-title">🔤 Typography System</div>';
  html += '<div class="section-toggle">▼</div></div>';
  html += '<div class="section-content">';
  html += '<p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">Typography settings are managed in the Typography tab.</p>';
  html += '</div></div>';
  return html;
}

/**
 * Render shadows section
 */
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

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderFoundations,
    renderColorsSection,
    renderSpacingSection,
    renderRadiusSection,
    renderTypographySection,
    renderShadowsSection
  };
}
