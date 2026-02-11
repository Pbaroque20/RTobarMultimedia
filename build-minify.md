# Minification Setup Guide

This guide explains how to minify CSS and JavaScript files for production deployment.

**Current state:** The site loads **non-minified** CSS and JS from `index.html`. No `.min.css` or project `.min.js` files are referenced. Generated minified files were removed as unused; follow this guide to regenerate them and then update `index.html` to reference the `.min.css` / `.min.js` assets if you want to use them in production.

## Cache invalidation (newer content)

The site uses **cache busting** so updated assets are used after a deploy. In `index.html`: `<meta name="asset-version" content="1.0.0" />` and every CSS/JS URL has `?v=1.0.0`. The `data.json` fetch uses the same version from that meta. **When you deploy:** bump the version (e.g. `1.0.0` → `1.0.1`) in the meta and in every `?v=1.0.0` (find-replace). Browsers then request fresh CSS, JS, and data. The `.htaccess` sets long cache for assets and revalidation for HTML/JSON.

## Tools Needed

### Option 1: Online Tools (Quick & Easy)
- **CSS Minifier**: https://www.minifier.org/ or https://cssminifier.com/
- **JavaScript Minifier**: https://www.minifier.org/ or https://javascript-minifier.com/

### Option 2: Command Line Tools (Recommended for Automation)

#### For CSS:
```bash
# Install cssnano-cli
npm install -g cssnano-cli

# Minify a CSS file
cssnano input.css output.min.css
```

#### For JavaScript:
```bash
# Install terser
npm install -g terser

# Minify a JS file
terser input.js -o output.min.js -c -m
```

## Files to Minify

### CSS Files:
- `css/meyer_reset.css` → `css/meyer_reset.min.css`
- `css/index.css` → `css/index.min.css`
- `css/fontloader.css` → `css/fontloader.min.css`
- `css/genesis.css` → `css/genesis.min.css`
- `css/session.css` → `css/session.min.css`
- `css/narrative.css` → `css/narrative.min.css`
- `css/connect.css` → `css/connect.min.css`
- `css/genoma.css` → `css/genoma.min.css`

### JavaScript Files:
- `js/jquery-2.1.1.min.js` (already minified, vendor)
- `js/site-common.js` → `js/site-common.min.js`
- `js/ajaxLoader.js` → `js/ajaxLoader.min.js`

## Build Script (Optional)

Create a `build.js` file for automated minification:

```javascript
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const cssnano = require('cssnano');
const postcss = require('postcss');

// CSS files to minify
const cssFiles = [
    'css/meyer_reset.css',
    'css/index.css',
    'css/fontloader.css',
    'css/genesis.css',
    'css/session.css',
    'css/narrative.css',
    'css/connect.css',
    'css/genoma.css'
];

// JS files to minify (excluding jquery, which is already minified)
const jsFiles = [
    'js/site-common.js',
    'js/ajaxLoader.js'
];

async function minifyCSS(inputPath) {
    const css = fs.readFileSync(inputPath, 'utf8');
    const result = await postcss([cssnano]).process(css, { from: inputPath });
    const outputPath = inputPath.replace('.css', '.min.css');
    fs.writeFileSync(outputPath, result.css);
    console.log(`Minified: ${inputPath} → ${outputPath}`);
}

async function minifyJS(inputPath) {
    const js = fs.readFileSync(inputPath, 'utf8');
    const result = await minify(js);
    const outputPath = inputPath.replace('.js', '.min.js');
    fs.writeFileSync(outputPath, result.code);
    console.log(`Minified: ${inputPath} → ${outputPath}`);
}

async function build() {
    console.log('Starting minification...');
    
    for (const file of cssFiles) {
        if (fs.existsSync(file)) {
            await minifyCSS(file);
        }
    }
    
    for (const file of jsFiles) {
        if (fs.existsSync(file)) {
            await minifyJS(file);
        }
    }
    
    console.log('Minification complete!');
}

build().catch(console.error);
```

## Update HTML References

After minifying, update `index.html` to reference `.min.css` and `.min.js` files:

```html
<!-- Replace -->
<link href="css/index.css" rel="stylesheet" type="text/css" />
<!-- With -->
<link href="css/index.min.css" rel="stylesheet" type="text/css" />
```

## Expected Size Reductions

- CSS files: Typically 30-50% size reduction
- JavaScript files: Typically 40-60% size reduction

## Notes

- Keep original files for development
- Use minified versions only in production
- Test thoroughly after minification
- Some minifiers may break code - always test!
