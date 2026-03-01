/**
 * CSS → React Native StyleSheet converter
 *
 * Takes raw CSS text, emits a formatted StyleSheet.create({...}) string.
 */

import { colors, typography, spacing, radius, fonts } from '../tokens/tokens';

/* ── Token resolution maps ── */

const COLOR_MAP = (() => {
  const map = {};
  for (const [key, hex] of Object.entries(colors.light)) {
    map[key] = hex;
  }
  return map;
})();

// Build a reverse lookup from CSS var name to theme path
// e.g. '--color-primary' → { path: 'theme.colors.primary', hex: '#68548E' }
function resolveColorVar(varName) {
  // --color-on-primary-container → onPrimaryContainer
  const raw = varName.replace('--color-', '');
  const camel = raw.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const hex = COLOR_MAP[camel];
  if (hex) return { path: `theme.colors.${camel}`, hex };
  return null;
}

function resolveSpacingVar(varName) {
  const key = varName.replace('--spacing-', '');
  // Handle numeric spacing names like '2xl', '3xl'
  const mappedKey = key.replace(/-/g, '');
  const val = spacing[mappedKey] || spacing[key];
  if (val !== undefined) return { path: `theme.spacing.${mappedKey || key}`, val };
  return null;
}

function resolveShapeVar(varName) {
  const raw = varName.replace('--shape-', '');
  const camel = raw.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const val = radius[camel];
  if (val !== undefined) return { path: `theme.radius.${camel}`, val };
  return null;
}

function resolveTypeVar(varName) {
  // --type-body-large-size → bodyLarge.fontSize
  const raw = varName.replace('--type-', '');
  const parts = raw.split('-');

  // Find the type scale name (e.g. bodyLarge, headlineMedium)
  // Pattern: scale-name-property
  // e.g. body-large-size, headline-medium-line-height, label-large-weight-emphasized
  const scaleNames = Object.keys(typography);

  for (const scaleName of scaleNames) {
    const kebab = scaleName.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (raw.startsWith(kebab + '-')) {
      const prop = raw.slice(kebab.length + 1);
      const scale = typography[scaleName];

      if (prop === 'size') return { val: scale.fontSize, comment: `${scaleName}.fontSize` };
      if (prop === 'line-height') return { val: scale.lineHeight, comment: `${scaleName}.lineHeight` };
      if (prop === 'weight') return { val: scale.fontWeight, comment: `${scaleName}.fontWeight` };
      if (prop === 'weight-emphasized') return { val: scale.fontWeightEmphasized || scale.fontWeight, comment: `${scaleName}.fontWeightEmphasized` };
      if (prop === 'weight-semi-emphasized') return { val: scale.fontWeightSemiEmphasized || scale.fontWeight, comment: `${scaleName}.fontWeightSemiEmphasized` };
      if (prop === 'tracking') return { val: scale.letterSpacing, comment: `${scaleName}.letterSpacing` };
      if (prop === 'family') {
        const fam = scale.fontFamily === fonts.brand ? 'brand' : 'plain';
        return { val: `theme.fonts.${fam}`, comment: scale.fontFamily, isString: true };
      }
    }
  }
  return null;
}

/* ── CSS property → RN property mapping ── */

const PROP_MAP = {
  'background-color': 'backgroundColor',
  'background': 'backgroundColor',
  'color': 'color',
  'border-color': 'borderColor',
  'border-top-color': 'borderTopColor',
  'border-bottom-color': 'borderBottomColor',
  'border-left-color': 'borderLeftColor',
  'border-right-color': 'borderRightColor',
  'border-width': 'borderWidth',
  'border-top-width': 'borderTopWidth',
  'border-bottom-width': 'borderBottomWidth',
  'border-left-width': 'borderLeftWidth',
  'border-right-width': 'borderRightWidth',
  'border-style': 'borderStyle',
  'border-radius': 'borderRadius',
  'border-top-left-radius': 'borderTopLeftRadius',
  'border-top-right-radius': 'borderTopRightRadius',
  'border-bottom-left-radius': 'borderBottomLeftRadius',
  'border-bottom-right-radius': 'borderBottomRightRadius',
  'width': 'width',
  'height': 'height',
  'min-width': 'minWidth',
  'min-height': 'minHeight',
  'max-width': 'maxWidth',
  'max-height': 'maxHeight',
  'margin': 'margin',
  'margin-top': 'marginTop',
  'margin-right': 'marginRight',
  'margin-bottom': 'marginBottom',
  'margin-left': 'marginLeft',
  'padding': 'padding',
  'padding-top': 'paddingTop',
  'padding-right': 'paddingRight',
  'padding-bottom': 'paddingBottom',
  'padding-left': 'paddingLeft',
  'top': 'top',
  'right': 'right',
  'bottom': 'bottom',
  'left': 'left',
  'flex': 'flex',
  'flex-grow': 'flexGrow',
  'flex-shrink': 'flexShrink',
  'flex-direction': 'flexDirection',
  'flex-wrap': 'flexWrap',
  'align-items': 'alignItems',
  'align-self': 'alignSelf',
  'justify-content': 'justifyContent',
  'display': 'display',
  'position': 'position',
  'overflow': 'overflow',
  'opacity': 'opacity',
  'gap': 'gap',
  'row-gap': 'rowGap',
  'column-gap': 'columnGap',
  'z-index': 'zIndex',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'line-height': 'lineHeight',
  'letter-spacing': 'letterSpacing',
  'text-align': 'textAlign',
  'text-transform': 'textTransform',
  'text-decoration': 'textDecorationLine',
  'text-decoration-line': 'textDecorationLine',
  'object-fit': null, // Skip — use resizeMode on Image
  'caret-color': null,
};

// Properties to skip entirely (output as comments)
const COMMENT_PROPS = new Set([
  'cursor', 'transition', 'animation', 'backdrop-filter', '-webkit-backdrop-filter',
  'box-shadow', 'text-overflow', 'white-space', '-webkit-tap-highlight-color',
  '-webkit-line-clamp', '-webkit-box-orient', 'user-select', 'pointer-events',
  'scrollbar-width', 'scrollbar-color', 'transform-origin', 'outline',
  'outline-offset', 'resize',
]);

/* ── Helpers ── */

function stripPx(val) {
  if (typeof val === 'string' && val.endsWith('px')) {
    const num = parseFloat(val);
    return isNaN(num) ? val : num;
  }
  return val;
}

function parseNumeric(val) {
  const num = parseFloat(val);
  return isNaN(num) ? val : num;
}

function resolveVar(varExpr) {
  // var(--color-primary) → resolve to theme reference
  const match = varExpr.match(/var\((--[^)]+)\)/);
  if (!match) return null;
  const varName = match[1];

  if (varName.startsWith('--color-')) {
    const resolved = resolveColorVar(varName);
    if (resolved) return { display: `${resolved.path}`, comment: resolved.hex };
  }
  if (varName.startsWith('--spacing-')) {
    const resolved = resolveSpacingVar(varName);
    if (resolved) return { display: resolved.val, comment: resolved.path };
  }
  if (varName.startsWith('--shape-')) {
    const resolved = resolveShapeVar(varName);
    if (resolved) return { display: resolved.val, comment: resolved.path };
  }
  if (varName.startsWith('--type-')) {
    const resolved = resolveTypeVar(varName);
    if (resolved) {
      if (resolved.isString) return { display: `'${resolved.val}'`, comment: resolved.comment };
      return { display: resolved.val, comment: resolved.comment };
    }
  }
  // Fallback — unresolvable var
  return { display: `'${varExpr}'`, comment: 'unresolved' };
}

function convertValue(cssProp, cssVal) {
  const trimmed = cssVal.trim();

  // color-mix() → comment
  if (trimmed.includes('color-mix(')) {
    return { comment: `// ${cssProp}: ${trimmed}` };
  }
  // linear-gradient() → comment
  if (trimmed.includes('linear-gradient(')) {
    return { comment: `// ${cssProp}: ${trimmed}` };
  }

  // var() references
  if (trimmed.includes('var(')) {
    const resolved = resolveVar(trimmed);
    if (resolved) {
      if (typeof resolved.display === 'number') {
        return { value: resolved.display, comment: resolved.comment };
      }
      return { value: resolved.display, comment: resolved.comment, raw: true };
    }
  }

  // px values
  const stripped = stripPx(trimmed);
  if (typeof stripped === 'number') return { value: stripped };

  // Percentage strings
  if (trimmed.endsWith('%')) return { value: `'${trimmed}'` };

  // Numeric without unit
  const num = parseFloat(trimmed);
  if (!isNaN(num) && String(num) === trimmed) return { value: num };

  // Named values (flex-start, center, etc.)
  if (/^[a-z-]+$/.test(trimmed)) return { value: `'${trimmed}'` };

  // rgba() values
  if (trimmed.startsWith('rgba(') || trimmed.startsWith('rgb(')) return { value: `'${trimmed}'` };

  // Hex colors
  if (trimmed.startsWith('#')) return { value: `'${trimmed}'` };

  // none / transparent
  if (trimmed === 'none' || trimmed === 'transparent') return { value: `'${trimmed}'` };

  return { value: `'${trimmed}'` };
}

/* ── Parse & Convert ── */

function parseCSS(rawCSS) {
  const blocks = [];
  // Remove @keyframes blocks
  let css = rawCSS.replace(/@keyframes\s+[\w-]+\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/g, '');
  // Remove @media blocks
  css = css.replace(/@media\s+[^{]*\{[\s\S]*?\}\s*\}/g, '');
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = ruleRegex.exec(css)) !== null) {
    const selector = m[1].trim();
    const body = m[2].trim();
    if (!body) continue;
    blocks.push({ selector, body });
  }
  return blocks;
}

function selectorToName(selector) {
  // .button → button
  // .filled:hover:not(:disabled) → filledHover (comment)
  const base = selector
    .replace(/\./g, '')
    .replace(/::[\w-]+/g, '')
    .split(/[\s>+~,]/)
    .filter(Boolean)[0] || selector;

  const clean = base
    .replace(/:[a-z-]+(\([^)]*\))?/g, '')
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  return clean;
}

function hasPseudoState(selector) {
  return /:hover|:focus|:active|:disabled|::before|::after|::placeholder/.test(selector);
}

function getPseudoHint(selector) {
  if (/:active/.test(selector)) return '// :active \u2192 use Pressable onPressIn';
  if (/:hover/.test(selector)) return '// :hover \u2192 web only (no RN equivalent)';
  if (/:focus/.test(selector)) return '// :focus \u2192 use onFocus prop';
  if (/:disabled/.test(selector)) return '// :disabled \u2192 conditional style';
  if (/::placeholder/.test(selector)) return '// ::placeholder \u2192 use placeholderTextColor prop';
  if (/::before|::after/.test(selector)) return '// pseudo-element \u2192 add a View in JSX';
  return null;
}

function convertBlock(selector, body) {
  const lines = [];
  const isPseudo = hasPseudoState(selector);
  const hint = getPseudoHint(selector);

  if (hint) lines.push(hint);

  const declarations = body.split(';').map(d => d.trim()).filter(Boolean);

  for (const decl of declarations) {
    const colonIdx = decl.indexOf(':');
    if (colonIdx === -1) continue;

    const prop = decl.slice(0, colonIdx).trim();
    const val = decl.slice(colonIdx + 1).trim();

    // Skip entirely
    if (COMMENT_PROPS.has(prop)) {
      lines.push(`// ${prop}: ${val}`);
      continue;
    }

    // Skip vendor prefixes
    if (prop.startsWith('-webkit-') || prop.startsWith('-moz-')) {
      lines.push(`// ${prop}: ${val}`);
      continue;
    }

    // Border shorthand: "1.5px solid var(--color-outline-variant)"
    if (prop === 'border' || prop === 'border-top' || prop === 'border-bottom' || prop === 'border-left' || prop === 'border-right') {
      const bMatch = val.match(/^([\d.]+(?:px)?)\s+(solid|dashed|dotted)\s+(.+)$/);
      if (bMatch) {
        const suffix = prop === 'border' ? '' : prop.replace('border-', '').replace(/^(.)/, c => c.toUpperCase());
        const bw = stripPx(bMatch[1]);
        const bs = bMatch[2];
        const bc = bMatch[3];
        lines.push(`border${suffix}Width: ${typeof bw === 'number' ? bw : `'${bw}'`},`);
        lines.push(`border${suffix}Style: '${bs}',`);
        const bcResolved = convertValue(`border${suffix}Color`, bc);
        if (bcResolved.comment && !bcResolved.value) {
          lines.push(bcResolved.comment);
        } else {
          const cmt = bcResolved.comment ? ` // ${bcResolved.comment}` : '';
          lines.push(`border${suffix}Color: ${bcResolved.value},${cmt}`);
        }
        continue;
      }
      // "none"
      if (val === 'none') {
        lines.push(`borderWidth: 0,`);
        continue;
      }
    }

    // Padding/margin shorthand
    if ((prop === 'padding' || prop === 'margin') && val.includes(' ')) {
      const parts = val.split(/\s+/);
      const prefix = prop === 'padding' ? 'padding' : 'margin';
      if (parts.length === 2) {
        const vert = convertValue(prop, parts[0]);
        const horiz = convertValue(prop, parts[1]);
        const vCmt = vert.comment ? ` // ${vert.comment}` : '';
        const hCmt = horiz.comment ? ` // ${horiz.comment}` : '';
        lines.push(`${prefix}Vertical: ${vert.value},${vCmt}`);
        lines.push(`${prefix}Horizontal: ${horiz.value},${hCmt}`);
        continue;
      }
      if (parts.length === 4) {
        const dirs = ['Top', 'Right', 'Bottom', 'Left'];
        for (let i = 0; i < 4; i++) {
          const r = convertValue(prop, parts[i]);
          const c = r.comment ? ` // ${r.comment}` : '';
          lines.push(`${prefix}${dirs[i]}: ${r.value},${c}`);
        }
        continue;
      }
    }

    // border-radius with multiple values
    if (prop === 'border-radius' && val.includes(' ')) {
      const parts = val.split(/\s+/);
      if (parts.length === 4) {
        const corners = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
        for (let i = 0; i < 4; i++) {
          const r = convertValue(prop, parts[i]);
          const c = r.comment ? ` // ${r.comment}` : '';
          lines.push(`${corners[i]}: ${r.value},${c}`);
        }
        continue;
      }
    }

    // Standard property mapping
    const rnProp = PROP_MAP[prop];
    if (rnProp === null) {
      // Explicitly skipped
      lines.push(`// ${prop}: ${val}`);
      continue;
    }

    const rnName = rnProp || prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const result = convertValue(prop, val);

    if (result.comment && result.value === undefined) {
      lines.push(result.comment);
    } else {
      const cmt = result.comment ? ` // ${result.comment}` : '';
      lines.push(`${rnName}: ${result.value},${cmt}`);
    }
  }

  return lines;
}

/* ── Main export ── */

export function cssToRN(rawCSS, componentName = 'Component') {
  const blocks = parseCSS(rawCSS);
  if (blocks.length === 0) return `// No styles found for ${componentName}`;

  const output = [];
  output.push(`import { StyleSheet } from 'react-native';`);
  output.push(`import { theme } from './theme';`);
  output.push('');
  output.push(`const styles = StyleSheet.create({`);

  const seen = new Set();

  for (const { selector, body } of blocks) {
    const name = selectorToName(selector);
    const lines = convertBlock(selector, body);
    if (lines.length === 0) continue;

    // Deduplicate names
    let finalName = name;
    if (seen.has(name)) {
      // Append pseudo hint
      if (/:hover/.test(selector)) finalName = name + '_hover';
      else if (/:active/.test(selector)) finalName = name + '_active';
      else if (/:disabled/.test(selector)) finalName = name + '_disabled';
      else if (/:focus/.test(selector)) finalName = name + '_focus';
      else if (/::placeholder/.test(selector)) finalName = name + '_placeholder';
      else finalName = name + '_' + seen.size;
    }
    seen.add(finalName);

    output.push(`  ${finalName}: {`);
    for (const line of lines) {
      output.push(`    ${line}`);
    }
    output.push(`  },`);
  }

  output.push(`});`);
  output.push('');
  output.push(`export default styles;`);

  return output.join('\n');
}
