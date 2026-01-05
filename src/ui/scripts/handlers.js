// Handler functions for Foundations - Spacing, Padding, Radius, and Border Width updates

// Spacing handlers
function updateSpacing(input) {
  const key = input.dataset.spacing;
  const value = parseInt(input.value);
  if (state.spacing[key]) {
    state.spacing[key].value = value;
  }
}

function updateSpacingTablet(input) {
  const key = input.dataset.spacingTablet;
  const value = parseInt(input.value);
  if (state.spacing[key]) {
    state.spacing[key].tablet = value;
  }
}

function updateSpacingMobile(input) {
  const key = input.dataset.spacingMobile;
  const value = parseInt(input.value);
  if (state.spacing[key]) {
    state.spacing[key].mobile = value;
  }
}

function updateSpacingKey(input) {
  const oldKey = input.dataset.spacingKey;
  const newKey = input.value;
  if (oldKey !== newKey && state.spacing[oldKey]) {
    state.spacing[newKey] = state.spacing[oldKey];
    delete state.spacing[oldKey];
    input.dataset.spacingKey = newKey;
  }
}

function updateSpacingDesc(input) {
  const key = input.dataset.spacingDesc;
  if (state.spacing[key]) {
    state.spacing[key].description = input.value;
  }
}

function addSpacing() {
  const count = Object.keys(state.spacing).length;
  const newKey = `spacing-${count}`;
  state.spacing[newKey] = { value: 0, mobile: 0, tablet: 0, description: '' };
  renderFoundations();
}

function deleteSpacing(key) {
  if (confirm(`Delete spacing token "${key}"?`)) {
    delete state.spacing[key];
    renderFoundations();
  }
}

// Padding handlers
function updatePadding(input) {
  const key = input.dataset.padding;
  const value = parseInt(input.value);
  if (state.padding[key]) {
    state.padding[key].value = value;
  }
}

function updatePaddingTablet(input) {
  const key = input.dataset.paddingTablet;
  const value = parseInt(input.value);
  if (state.padding[key]) {
    state.padding[key].tablet = value;
  }
}

function updatePaddingMobile(input) {
  const key = input.dataset.paddingMobile;
  const value = parseInt(input.value);
  if (state.padding[key]) {
    state.padding[key].mobile = value;
  }
}

function updatePaddingKey(input) {
  const oldKey = input.dataset.paddingKey;
  const newKey = input.value;
  if (oldKey !== newKey && state.padding[oldKey]) {
    state.padding[newKey] = state.padding[oldKey];
    delete state.padding[oldKey];
    input.dataset.paddingKey = newKey;
  }
}

function updatePaddingDesc(input) {
  const key = input.dataset.paddingDesc;
  if (state.padding[key]) {
    state.padding[key].description = input.value;
  }
}

function addPadding() {
  const count = Object.keys(state.padding).length;
  const newKey = `padding-${count}`;
  state.padding[newKey] = { value: 0, mobile: 0, tablet: 0, description: '' };
  renderFoundations();
}

function deletePadding(key) {
  if (confirm(`Delete padding token "${key}"?`)) {
    delete state.padding[key];
    renderFoundations();
  }
}

// Radius handlers
function updateRadius(input) {
  const key = input.dataset.radius;
  const value = parseInt(input.value);
  if (state.radius[key]) {
    state.radius[key].value = value;
  }
}

function updateRadiusTablet(input) {
  const key = input.dataset.radiusTablet;
  const value = parseInt(input.value);
  if (state.radius[key]) {
    state.radius[key].tablet = value;
  }
}

function updateRadiusMobile(input) {
  const key = input.dataset.radiusMobile;
  const value = parseInt(input.value);
  if (state.radius[key]) {
    state.radius[key].mobile = value;
  }
}

function updateRadiusDesc(input) {
  const key = input.dataset.radiusDesc;
  if (state.radius[key]) {
    state.radius[key].description = input.value;
  }
}

// Border width handlers
function updateBorderWidth(input) {
  const key = input.dataset.borderWidth;
  const value = parseInt(input.value);
  if (state.borders.widths[key]) {
    state.borders.widths[key].value = value;
  }
}

function updateBorderWidthTablet(input) {
  const key = input.dataset.borderWidthTablet;
  const value = parseInt(input.value);
  if (state.borders.widths[key]) {
    state.borders.widths[key].tablet = value;
  }
}

function updateBorderWidthMobile(input) {
  const key = input.dataset.borderWidthMobile;
  const value = parseInt(input.value);
  if (state.borders.widths[key]) {
    state.borders.widths[key].mobile = value;
  }
}

function updateBorderWidthDesc(input) {
  const key = input.dataset.borderWidthDesc;
  if (state.borders.widths[key]) {
    state.borders.widths[key].description = input.value;
  }
}
