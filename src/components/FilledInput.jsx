import { useState, useRef } from 'react';
import styles from './FilledInput.module.css';

/**
 * M3 Expressive Filled Text Field
 * 
 * Props:
 * - label: string
 * - value: string
 * - onChange: function
 * - prefix: string (e.g., "+91" for phone)
 * - multiline: boolean
 * - rows: number (for multiline)
 * - helper: string (helper text below)
 * - error: string (error text, overrides helper)
 * - disabled: boolean
 * - maxLength: number
 */
export default function FilledInput({
  label,
  value = '',
  onChange,
  prefix,
  multiline = false,
  rows = 1,
  helper,
  error,
  disabled = false,
  maxLength,
  className = '',
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const hasValue = value && value.length > 0;
  const isActive = focused || hasValue;

  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className={className}>
      <div
        className={[
          styles.container,
          focused && styles.focused,
          error && styles.error,
          disabled && styles.disabled,
        ].filter(Boolean).join(' ')}
        onClick={handleContainerClick}
      >
        <label className={`${styles.label} ${isActive ? styles.labelActive : ''}`}>
          {label}
        </label>
        <div className={styles.inputRow}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <InputElement
            ref={inputRef}
            className={styles.input}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            maxLength={maxLength}
            rows={multiline ? rows : undefined}
          />
        </div>
        {maxLength && (
          <span className={styles.counter}>{value.length}/{maxLength}</span>
        )}
      </div>
      {(error || helper) && (
        <div className={`${styles.helper} ${error ? styles.helperError : ''}`}>
          {error || helper}
        </div>
      )}
    </div>
  );
}
