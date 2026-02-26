import { useState } from 'react';
import styles from './Button.module.css';

/**
 * M3 Expressive Button
 * 
 * Variants:
 * - filled:    Primary CTA (1 per screen section max)
 * - tonal:     Secondary actions (View, Update)
 * - outlined:  Alternative actions (View Profile alongside Connect)
 * - text:      Tertiary/low-emphasis (Skip, Resend OTP)
 * 
 * Props:
 * - variant: 'filled' | 'tonal' | 'outlined' | 'text'
 * - label: string
 * - icon: ReactNode (optional, renders before label)
 * - disabled: boolean
 * - fullWidth: boolean
 * - onClick: function
 * - size: 'default' | 'small'
 */
export default function Button({
  variant = 'filled',
  label,
  icon,
  disabled = false,
  fullWidth = false,
  onClick,
  size = 'default',
  className = '',
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className={[
        styles.button,
        styles[variant],
        size === 'small' && styles.small,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
}
