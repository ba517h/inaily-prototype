/**
 * Material Symbols Rounded Icon
 *
 * Props:
 * - name: string (Material Symbols icon name, e.g. 'arrow_back')
 * - size: number (default 24)
 * - fill: boolean (filled variant)
 * - weight: number (100–700, default 400)
 * - color: string (CSS color)
 * - className: string
 * - style: object
 */
export default function Icon({
  name,
  size = 24,
  fill = false,
  weight = 400,
  color,
  className = '',
  style,
}) {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        color: color || 'inherit',
        lineHeight: 1,
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {name}
    </span>
  );
}
