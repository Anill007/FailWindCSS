# FailWind

FailWind is a tiny Node.js utility that scans an HTML file for utility-style class names and generates a small CSS file (`fail-style.css`) with matching rules. It is an experimental, lightweight mimic of Tailwind-like utilities for demo and learning purposes.

## Contents
- `fail-wind.js` — main script that extracts classes and generates `fail-style.css`.
- `fail-config.js` — simple configuration (colors, base size).
- `fail-style.css` — generated stylesheet (output of running the script).
- `index.html` — example/demo HTML that the script reads.

## Features
- Scans `index.html` for `class="..."` attributes and collects utility-like class names.
- Generates CSS rules for class patterns: `color-*`, `bg-*`, `padding-*`, `fs-*`, `margin-*`, `corner-*`, `border-*`.
- Uses values from `fail-config.js` (for named colors and `baseSize`) when available.
- Automatically inserts a `<link rel="stylesheet" href="fail-style.css">` into `index.html` if not present.

## Installation
Requires Node.js. No external dependencies.

1. Clone or copy the project files.
2. From the project root, run:

```powershell
node fail-wind.js
```

This will create/update `fail-style.css` and attempt to link it into `index.html`.

## Configuration
Edit `fail-config.js` to change named colors and `baseSize` (used for size multipliers). Example:

```javascript
// fail-config.js
module.exports = {
  colors: {
    primary: '#4C1D95',
    secondary: '#FFE8D6'
  },
  baseSize: 1
}
```

## Class Utilities (supported patterns)

- `color-<name|value>` → sets `color:` (text color). Uses `fail-config.js` for named colors.
  - Examples:
    - `color-primary` → `color: #4C1D95` (from `fail-config.js`).
    - `color-red` → `color: red` (direct value).

- `bg-<name|value>` → sets `background-color:`.
  - Examples:
    - `bg-secondary` → `background-color: #FFE8D6` (from `fail-config.js`).
    - `bg-purple` → `background-color: purple` (direct value).

- `padding-<n>` → sets `padding: <baseSize * n>px`.
  - Examples:
    - `padding-8` → `padding: 8px` (when `baseSize` is `1`).
    - `padding-24` → `padding: 24px`.

- `fs-<n>` → sets `font-size` and `line-height` to `<baseSize * n>px`.
  - Examples:
    - `fs-24` → `font-size: 24px; line-height: 24px;`.
    - `fs-54` → `font-size: 54px; line-height: 54px;`.

- `margin-<n>` → sets `margin: <baseSize * n>px`.
  - Examples:
    - `margin-16` → `margin: 16px`.
    - `margin-20` → `margin: 20px`.

- `corner-<n>` → sets `border-radius: <baseSize * n>px`.
  - Examples:
    - `corner-8` → `border-radius: 8px`.
    - `corner-24` → `border-radius: 24px`.

- `border-<name|value>` → sets `border: 1px solid <color>` (named colors from config apply).
  - Examples:
    - `border-primary` → `border: 1px solid #4C1D95` (named color).
    - `border-20` → `border: 1px solid 20` 

## License
This repository is provided as-is for learning and experimentation.