/**
 * Auto-generated theme string from tokens.js.
 * True single source of truth — never hardcoded.
 */

import { fonts, colors, typography, spacing, radius, motion, elevation, opacity } from '../tokens/tokens';

function indent(str, level = 1) {
  return str.split('\n').map(l => '  '.repeat(level) + l).join('\n');
}

function objToString(obj, level = 1) {
  const entries = Object.entries(obj);
  const lines = entries.map(([key, val]) => {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return `${key}: {\n${objToString(val, level + 1)}\n${'  '.repeat(level)}},`;
    }
    if (typeof val === 'string') {
      return `${key}: '${val}',`;
    }
    return `${key}: ${val},`;
  });
  return lines.map(l => '  '.repeat(level) + l).join('\n');
}

export function generateThemeString() {
  const lines = [];

  lines.push(`/**`);
  lines.push(` * Inaily Design System — React Native Theme`);
  lines.push(` * Auto-generated from CSS tokens. Do not edit manually.`);
  lines.push(` */`);
  lines.push('');

  // Fonts
  lines.push(`export const fonts = {`);
  for (const [k, v] of Object.entries(fonts)) {
    lines.push(`  ${k}: '${v}',`);
  }
  lines.push(`};`);
  lines.push('');

  // Colors
  lines.push(`export const colors = {`);
  lines.push(`  light: {`);
  for (const [k, v] of Object.entries(colors.light)) {
    lines.push(`    ${k}: '${v}',`);
  }
  lines.push(`  },`);
  lines.push(`  dark: {`);
  for (const [k, v] of Object.entries(colors.dark)) {
    lines.push(`    ${k}: '${v}',`);
  }
  lines.push(`  },`);
  lines.push(`};`);
  lines.push('');

  // Typography
  lines.push(`export const typography = {`);
  for (const [name, scale] of Object.entries(typography)) {
    lines.push(`  ${name}: {`);
    for (const [prop, val] of Object.entries(scale)) {
      if (typeof val === 'string') {
        lines.push(`    ${prop}: '${val}',`);
      } else {
        lines.push(`    ${prop}: ${val},`);
      }
    }
    lines.push(`  },`);
  }
  lines.push(`};`);
  lines.push('');

  // Spacing
  lines.push(`export const spacing = {`);
  for (const [k, v] of Object.entries(spacing)) {
    lines.push(`  ${k}: ${v},`);
  }
  lines.push(`};`);
  lines.push('');

  // Radius
  lines.push(`export const radius = {`);
  for (const [k, v] of Object.entries(radius)) {
    lines.push(`  ${k}: ${v},`);
  }
  lines.push(`};`);
  lines.push('');

  // Motion
  lines.push(`export const motion = {`);
  lines.push(`  duration: {`);
  for (const [k, v] of Object.entries(motion.duration)) {
    lines.push(`    ${k}: ${v},`);
  }
  lines.push(`  },`);
  lines.push(`  easing: {`);
  for (const [k, v] of Object.entries(motion.easing)) {
    lines.push(`    ${k}: '${v}',`);
  }
  lines.push(`  },`);
  lines.push(`};`);
  lines.push('');

  // Elevation
  lines.push(`export const elevation = {`);
  for (const [name, shadow] of Object.entries(elevation)) {
    lines.push(`  ${name}: {`);
    for (const [prop, val] of Object.entries(shadow)) {
      if (val && typeof val === 'object') {
        lines.push(`    ${prop}: { width: ${val.width}, height: ${val.height} },`);
      } else if (typeof val === 'string') {
        lines.push(`    ${prop}: '${val}',`);
      } else {
        lines.push(`    ${prop}: ${val},`);
      }
    }
    lines.push(`  },`);
  }
  lines.push(`};`);
  lines.push('');

  // Opacity
  lines.push(`export const opacity = {`);
  for (const [k, v] of Object.entries(opacity)) {
    lines.push(`  ${k}: ${v},`);
  }
  lines.push(`};`);

  return lines.join('\n');
}
