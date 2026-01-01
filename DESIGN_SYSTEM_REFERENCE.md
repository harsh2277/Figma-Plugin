# Quick Reference Guide - Design System

## 🎨 Color Palette

### Primary Colors
```css
--primary: #3B82F6;           /* Blue 500 - Main brand color */
--primary-hover: #2563EB;     /* Blue 600 - Hover states */
--primary-light: rgba(59, 130, 246, 0.1);  /* 10% opacity - Backgrounds */
--primary-dark: #1E40AF;      /* Blue 800 - Accents */
--primary-focus: rgba(59, 130, 246, 0.2);  /* 20% opacity - Focus rings */
```

### Background Colors
```css
--bg-app: #F9FAFB;            /* Gray 50 - App background */
--bg-card: #FFFFFF;           /* White - Card backgrounds */
--bg-secondary: #F3F4F6;      /* Gray 100 - Secondary backgrounds */
--bg-hover: #E5E7EB;          /* Gray 200 - Hover states */
--bg-accent: #EFF6FF;         /* Blue 50 - Accent backgrounds */
```

### Border Colors
```css
--border: #E5E7EB;            /* Gray 200 - Default borders */
--border-light: #F3F4F6;      /* Gray 100 - Light borders */
--border-medium: #D1D5DB;     /* Gray 300 - Medium borders */
--border-dark: #9CA3AF;       /* Gray 400 - Dark borders */
--border-focus: #3B82F6;      /* Blue 500 - Focus borders */
```

### Text Colors
```css
--text-primary: #111827;      /* Gray 900 - Primary text (16.1:1 contrast) */
--text-secondary: #4B5563;    /* Gray 600 - Secondary text (7.5:1 contrast) */
--text-tertiary: #6B7280;     /* Gray 500 - Tertiary text (4.6:1 contrast) */
--text-muted: #9CA3AF;        /* Gray 400 - Muted text (2.8:1 contrast) */
--text-inverse: #FFFFFF;      /* White - Inverse text */
```

### Status Colors
```css
/* Success */
--success: #10B981;           /* Green 500 */
--success-light: #D1FAE5;     /* Green 100 */
--success-dark: #059669;      /* Green 600 */

/* Error */
--error: #EF4444;             /* Red 500 */
--error-light: #FEE2E2;       /* Red 100 */
--error-dark: #DC2626;        /* Red 600 */

/* Warning */
--warning: #F59E0B;           /* Amber 500 */
--warning-light: #FEF3C7;     /* Amber 100 */
--warning-dark: #D97706;      /* Amber 600 */

/* Info */
--info: #3B82F6;              /* Blue 500 */
--info-light: #DBEAFE;        /* Blue 100 */
--info-dark: #2563EB;         /* Blue 600 */
```

---

## 📏 Spacing Scale

```css
--space-1: 4px;    /* 0.25rem - Tiny gaps */
--space-2: 8px;    /* 0.5rem  - Small gaps */
--space-3: 12px;   /* 0.75rem - Medium gaps */
--space-4: 16px;   /* 1rem    - Default gaps */
--space-5: 20px;   /* 1.25rem - Large gaps */
--space-6: 24px;   /* 1.5rem  - Extra large gaps */
--space-8: 32px;   /* 2rem    - Section spacing */
--space-10: 40px;  /* 2.5rem  - Large sections */
--space-12: 48px;  /* 3rem    - Page padding */
```

**Usage:**
- `--space-1` to `--space-3`: Internal component spacing
- `--space-4` to `--space-6`: Component padding and gaps
- `--space-8` to `--space-12`: Layout and section spacing

---

## 🔘 Border Radius

```css
--radius-xs: 4px;      /* Extra small - Tags, badges */
--radius-sm: 6px;      /* Small - Inputs, selects */
--radius-md: 8px;      /* Medium - Buttons, cards */
--radius-lg: 12px;     /* Large - Modals, panels */
--radius-xl: 16px;     /* Extra large - Hero sections */
--radius-full: 9999px; /* Full - Pills, toggles */
```

---

## 🌑 Shadows

```css
/* Extra Small - Subtle depth */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Small - Default elevation */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
             0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Medium - Hover states */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Large - Elevated elements */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Extra Large - Modals, popovers */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Focus - Accessibility */
--shadow-focus: 0 0 0 3px var(--primary-focus);
```

---

## ⏱️ Animation Timing

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**
- `--transition-fast`: Quick feedback (hover, active)
- `--transition-base`: Standard transitions (most interactions)
- `--transition-slow`: Smooth, deliberate animations (expand/collapse)

**Easing Function:** `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design standard

---

## 🎯 Component Patterns

### Buttons

```css
/* Primary Button */
.btn-primary {
    background: var(--primary);
    color: var(--text-inverse);
    border: none;
    padding: 10px 20px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-base);
}

.btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-primary:focus-visible {
    box-shadow: var(--shadow-focus), var(--shadow-sm);
}

/* Secondary Button */
.btn-secondary {
    background: var(--bg-card);
    color: var(--text-primary);
    border: 1.5px solid var(--border);
    padding: 10px 20px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xs);
    transition: var(--transition-base);
}

.btn-secondary:hover {
    background: var(--bg-secondary);
    border-color: var(--border-medium);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}
```

### Cards

```css
.card {
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xs);
    transition: var(--transition-base);
    position: relative;
}

.card:hover {
    border-color: var(--border-medium);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.card-header {
    padding: var(--space-5) var(--space-6);
    border-bottom: 1.5px solid var(--border);
    background: var(--bg-card);
}

.card-body {
    padding: var(--space-6);
}
```

### Inputs

```css
input, select {
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 6px 10px;
    font-size: 12px;
    color: var(--text-primary);
    transition: var(--transition-base);
    outline: none;
}

input:hover, select:hover {
    border-color: var(--border-medium);
    background: var(--bg-secondary);
}

input:focus, select:focus {
    border-color: var(--primary);
    box-shadow: var(--shadow-focus);
}
```

---

## ♿ Accessibility Checklist

### Focus States
- ✅ All interactive elements have `:focus-visible` styles
- ✅ Focus ring: `box-shadow: var(--shadow-focus)` (3px blue ring)
- ✅ Focus ring visible against all backgrounds
- ✅ No `outline: none` without alternative focus indicator

### Color Contrast
- ✅ Primary text: 16.1:1 (AAA) - `#111827` on `#FFFFFF`
- ✅ Secondary text: 7.5:1 (AA) - `#4B5563` on `#FFFFFF`
- ✅ Tertiary text: 4.6:1 (AA) - `#6B7280` on `#FFFFFF`
- ✅ Interactive elements: Minimum 3:1 contrast

### Keyboard Navigation
- ✅ All interactive elements are keyboard accessible
- ✅ Logical tab order
- ✅ Visible focus indicators
- ✅ No keyboard traps

### Interactive States
- ✅ Hover states for all clickable elements
- ✅ Active states for buttons and links
- ✅ Disabled states clearly indicated
- ✅ Loading states with visual feedback

---

## 🚀 Performance Tips

### GPU Acceleration
Use `will-change` for frequently animated properties:
```css
.animated-element {
    will-change: transform;  /* Only for transform animations */
}
```

⚠️ **Warning:** Don't overuse `will-change` - it consumes GPU memory!

### Optimized Animations
- ✅ Use `transform` instead of `top/left/width/height`
- ✅ Use `opacity` for fade effects
- ✅ Avoid animating `box-shadow` (use pseudo-elements instead)
- ✅ Keep animations under 300ms for responsiveness

### Best Practices
```css
/* ✅ Good - GPU accelerated */
.element {
    transform: translateY(-2px);
    transition: transform 200ms;
}

/* ❌ Bad - Causes reflow */
.element {
    top: -2px;
    transition: top 200ms;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: 0-639px (mobile) */

@media (min-width: 640px) {
    /* Tablet: 640px+ */
}

@media (min-width: 1024px) {
    /* Desktop: 1024px+ */
}

@media (min-width: 1280px) {
    /* Large Desktop: 1280px+ */
}
```

---

## 🎨 Usage Examples

### Creating a New Button
```html
<button class="btn btn-primary">
    <svg><!-- icon --></svg>
    Create Variables
</button>
```

### Creating a Card
```html
<div class="card">
    <div class="card-header">
        <div class="card-title">
            <svg><!-- icon --></svg>
            Primary Color
        </div>
    </div>
    <div class="card-body">
        <!-- Content -->
    </div>
</div>
```

### Creating a Form Input
```html
<input 
    type="text" 
    placeholder="Enter value..."
    style="
        background: var(--bg-card);
        border: 1.5px solid var(--border);
        border-radius: var(--radius-sm);
        padding: var(--space-2) var(--space-3);
    "
/>
```

---

## 🔍 Common Patterns

### Hover Effect Pattern
```css
.element {
    transition: var(--transition-base);
    will-change: transform;
}

.element:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
```

### Focus Pattern
```css
.element {
    outline: none;
}

.element:focus-visible {
    box-shadow: var(--shadow-focus);
}
```

### Disabled Pattern
```css
.element:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
```

---

## 📚 Resources

- **Color Tool**: [Tailwind CSS Color Generator](https://tailwindcss.com/docs/customizing-colors)
- **Contrast Checker**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Animation Easing**: [Cubic Bezier Generator](https://cubic-bezier.com/)
- **Accessibility**: [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Version**: 2.0.0  
**Last Updated**: January 1, 2026
