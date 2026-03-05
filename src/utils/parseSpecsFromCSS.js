/**
 * CSS parser for SpecsPage — auto-reads from CSS modules.
 * Parses raw CSS for specific class names, categorizes into dimensions/tokens/states.
 */

import { colors } from '../tokens/tokens';

// Reverse lookup: CSS var name → friendly token name + hex
const COLOR_LOOKUP = (() => {
  const map = {};
  for (const [key, hex] of Object.entries(colors.light)) {
    // camelCase → kebab-case CSS var
    const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    map[`--color-${kebab}`] = { name: key, hex };
  }
  return map;
})();

const DIMENSION_PROPS = new Set([
  'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'gap', 'row-gap', 'column-gap',
  'border-radius', 'border-top-left-radius', 'border-top-right-radius',
  'border-bottom-left-radius', 'border-bottom-right-radius',
  'border-width', 'top', 'right', 'bottom', 'left',
]);

const TOKEN_PROPS = new Set([
  'background-color', 'background', 'color', 'border-color',
  'border-top-color', 'border-bottom-color',
  'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
  'opacity',
]);

const STATE_SELECTORS = /:hover|:active|:disabled|:focus|::placeholder/;
const STATE_PROPS = new Set(['transition', 'animation', 'transform']);

function resolveVarDisplay(val) {
  // var(--color-primary) → "primary (#68548E)"
  const varMatch = val.match(/var\((--[^)]+)\)/);
  if (!varMatch) return val;

  const varName = varMatch[1];

  if (varName.startsWith('--color-')) {
    const info = COLOR_LOOKUP[varName];
    if (info) return `${info.name} (${info.hex})`;
    return varName.replace('--color-', '');
  }

  if (varName.startsWith('--spacing-')) return varName.replace('--spacing-', 'spacing.');
  if (varName.startsWith('--shape-')) return varName.replace('--shape-', 'shape.');
  if (varName.startsWith('--type-')) return varName.replace('--type-', 'type.');

  return varName;
}

function formatLine(prop, val) {
  const resolved = resolveVarDisplay(val);
  // Shorten common patterns
  const shortProp = prop
    .replace('background-color', 'bg')
    .replace('background', 'bg')
    .replace('border-radius', 'radius')
    .replace('font-family', 'font')
    .replace('font-size', 'size')
    .replace('font-weight', 'weight')
    .replace('line-height', 'lh')
    .replace('letter-spacing', 'ls');

  return `${shortProp}: ${resolved}`;
}

function parseRules(rawCSS) {
  // Remove @keyframes blocks
  let css = rawCSS.replace(/@keyframes\s+[\w-]+\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/g, '');
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  const rules = [];
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = ruleRegex.exec(css)) !== null) {
    rules.push({ selector: m[1].trim(), body: m[2].trim() });
  }
  return rules;
}

function selectorMatchesClass(selector, className) {
  // Check if selector contains .className (exact class match)
  return new RegExp(`\\.${className}(?=[^\\w-]|$)`).test(selector);
}

/**
 * Parse raw CSS for specific class names.
 * @param {string} rawCSS — full CSS file content
 * @param {string[]} classNames — array of class names to match
 * @returns {{ dimensions: string[], tokens: string[], states: string[] }}
 */
export function parseSpecsFromCSS(rawCSS, classNames) {
  const dimensions = [];
  const tokens = [];
  const states = [];

  const rules = parseRules(rawCSS);

  for (const { selector, body } of rules) {
    // Check if this rule matches any of our target classes
    const matches = classNames.some(cn => selectorMatchesClass(selector, cn));
    if (!matches) continue;

    const isState = STATE_SELECTORS.test(selector);
    const declarations = body.split(';').map(d => d.trim()).filter(Boolean);

    // Get the pseudo hint for state selectors
    let statePrefix = '';
    if (/:active/.test(selector)) statePrefix = ':active \u2192 ';
    else if (/:hover/.test(selector)) statePrefix = ':hover \u2192 ';
    else if (/:disabled/.test(selector)) statePrefix = ':disabled \u2192 ';
    else if (/:focus/.test(selector)) statePrefix = ':focus \u2192 ';

    for (const decl of declarations) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) continue;

      const prop = decl.slice(0, colonIdx).trim();
      const val = decl.slice(colonIdx + 1).trim();

      // Skip vendor prefixes and purely structural props
      if (prop.startsWith('-webkit-') || prop.startsWith('-moz-')) continue;
      if (['display', 'flex-direction', 'align-items', 'justify-content', 'position',
           'flex', 'flex-shrink', 'flex-grow', 'flex-wrap', 'overflow',
           'align-self', 'cursor', 'pointer-events', 'user-select',
           'text-align', 'white-space', 'text-overflow', 'z-index',
           'scrollbar-width', 'scrollbar-color', 'object-fit',
           'content', 'inset'].includes(prop)) continue;

      if (isState || STATE_PROPS.has(prop)) {
        const line = statePrefix + formatLine(prop, val);
        if (!states.includes(line)) states.push(line);
      } else if (DIMENSION_PROPS.has(prop)) {
        const line = formatLine(prop, val);
        if (!dimensions.includes(line)) dimensions.push(line);
      } else if (TOKEN_PROPS.has(prop)) {
        const line = formatLine(prop, val);
        if (!tokens.includes(line)) tokens.push(line);
      } else if (prop === 'border' || prop === 'border-top' || prop === 'border-bottom') {
        // Border shorthand — split into dimension + token parts
        const bMatch = val.match(/^([\d.]+(?:px)?)\s+\w+\s+(.+)$/);
        if (bMatch) {
          dimensions.push(`${prop}-width: ${bMatch[1]}`);
          tokens.push(`${prop}-color: ${resolveVarDisplay(bMatch[2])}`);
        } else {
          dimensions.push(formatLine(prop, val));
        }
      } else if (prop === 'box-shadow') {
        states.push(formatLine(prop, val));
      }
    }
  }

  return { dimensions, tokens, states };
}

/**
 * Spec card definitions — data-only, no JSX.
 * Each entry maps to a SpecCard in the SpecsPage.
 */
export const SPEC_CARD_DEFS = [
  {
    title: 'Button',
    source: 'button',
    classes: ['button', 'filled', 'tonal', 'outlined', 'text', 'small', 'fullWidth'],
  },
  {
    title: 'SearchField',
    source: 'searchField',
    classes: ['wrapper', 'icon', 'input', 'clearBtn'],
  },
  {
    title: 'Outlined Text Field',
    source: 'outlinedField',
    classes: ['container', 'prefix', 'prefixText', 'divider', 'fieldWrap', 'label', 'labelFloating', 'input', 'inputMultiline', 'suffix'],
  },
  {
    title: 'AttendeeCard \u2014 Hero',
    source: 'attendeeCard',
    classes: ['card', 'photoWrapper', 'photoSection', 'photo', 'photoGradient', 'photoInfo', 'photoName', 'photoRole', 'infoSection', 'relevanceList', 'relevanceRow', 'relevanceIcon', 'relevanceText', 'actions'],
  },
  {
    title: 'AttendeeCard \u2014 Relevance',
    source: 'attendeeCard',
    classes: ['card', 'photoWrapper', 'photoSection', 'photo', 'cardName', 'cardRole', 'infoSection', 'relevanceList', 'relevanceRow', 'relevanceText', 'actions'],
  },
  {
    title: 'ChatRow',
    source: 'chatList',
    classes: ['chatRow', 'chatAvatar', 'chatContent', 'chatName', 'chatDesignation', 'chatMessage', 'chatMeta', 'chatTime', 'requestActions', 'offBanner'],
  },
  {
    title: 'IndustrySelector',
    source: 'industrySelector',
    classes: ['list', 'item', 'selected', 'radio', 'radioDot', 'label'],
  },
  {
    title: 'Chat Bubble',
    source: 'chatConversation',
    classes: ['bubble', 'incoming', 'outgoing'],
  },
  {
    title: 'ProfileRow',
    source: 'profileRow',
    classes: ['row', 'iconBox', 'info', 'label', 'value', 'valueEmpty', 'divider'],
  },
  {
    title: 'StatusBar',
    source: 'statusBar',
    classes: ['statusBar', 'light', 'dark', 'time', 'notchSpacer', 'indicators'],
  },
  {
    title: 'BottomSheet',
    source: 'bottomSheet',
    classes: ['overlay', 'sheet', 'handle', 'title', 'body'],
  },
  {
    title: 'BottomNav',
    source: 'bottomNav',
    classes: ['nav', 'item', 'pill', 'label', 'active'],
  },
];
