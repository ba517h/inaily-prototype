/**
 * Lightweight regex-based syntax highlighter for JS/TS code.
 * Returns HTML string with <span class="hl*"> wrappers.
 * No external dependencies.
 */

const RULES = [
  // Multi-line comments — not needed for single-line output
  // Single-line comments
  { type: 'hlComment', regex: /\/\/.*$/gm },
  // Strings (single and double quotes)
  { type: 'hlString', regex: /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g },
  // Template literals
  { type: 'hlString', regex: /`(?:[^`\\]|\\.)*`/g },
  // Keywords
  { type: 'hlKeyword', regex: /\b(import|export|from|const|let|var|function|return|default|if|else|new|typeof|instanceof)\b/g },
  // Builtins / types
  { type: 'hlBuiltin', regex: /\b(StyleSheet|theme|Platform|Dimensions|PixelRatio|Animated|Easing)\b/g },
  // Numbers (including decimals and negatives)
  { type: 'hlNumber', regex: /\b-?\d+\.?\d*\b/g },
  // Properties (word before colon, but not inside strings)
  { type: 'hlProp', regex: /\b[\w]+(?=\s*:)/g },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function highlightCode(code) {
  // Tokenize: walk through code, find earliest match, emit tokens
  const tokens = [];
  let remaining = code;
  let offset = 0;

  // Build a flat list of all matches with positions
  const allMatches = [];
  for (const rule of RULES) {
    const regex = new RegExp(rule.regex.source, rule.regex.flags);
    let m;
    while ((m = regex.exec(code)) !== null) {
      allMatches.push({
        type: rule.type,
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
      });
    }
  }

  // Sort by start position, longer matches first for ties
  allMatches.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping matches (keep earliest/longest)
  const filtered = [];
  let lastEnd = 0;
  for (const match of allMatches) {
    if (match.start >= lastEnd) {
      filtered.push(match);
      lastEnd = match.end;
    }
  }

  // Build output
  const parts = [];
  let pos = 0;
  for (const match of filtered) {
    if (match.start > pos) {
      parts.push(escapeHtml(code.slice(pos, match.start)));
    }
    parts.push(`<span class="${match.type}">${escapeHtml(match.text)}</span>`);
    pos = match.end;
  }
  if (pos < code.length) {
    parts.push(escapeHtml(code.slice(pos)));
  }

  return parts.join('');
}
