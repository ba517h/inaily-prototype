import { useState, useRef } from 'react';
import Icon from '../Icon';
import styles from './OutlinedField.module.css';

/**
 * M3 Expressive Outlined Text Field
 *
 * Props:
 * - label: string
 * - value: string
 * - onChange: (value: string) => void
 * - prefix: string (e.g. "+91")
 * - suffix: ReactNode (e.g. an Icon)
 * - placeholder: string
 * - focused: boolean (controlled focus state for demos)
 * - multiline: boolean
 * - rows: number
 * - disabled: boolean
 */
export default function OutlinedField({
  label,
  value = '',
  onChange,
  prefix,
  suffix,
  placeholder,
  focused: controlledFocus,
  multiline = false,
  rows = 4,
  disabled = false,
}) {
  const [internalFocus, setInternalFocus] = useState(false);
  const inputRef = useRef(null);
  const isFocused = controlledFocus !== undefined ? controlledFocus : internalFocus;
  const hasValue = value && value.length > 0;
  const isFloating = isFocused || hasValue;

  const handleContainerClick = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div
      className={`${styles.container} ${isFocused ? styles.focused : ''} ${disabled ? styles.disabled : ''}`}
      onClick={handleContainerClick}
    >
      {prefix && (
        <>
          <div className={styles.prefix}>
            <span className={styles.prefixText}>{prefix}</span>
            <Icon name="expand_more" size={18} color="var(--color-on-surface-variant)" />
          </div>
          <div className={styles.divider} />
        </>
      )}
      <div className={styles.fieldWrap}>
        <label className={`${styles.label} ${isFloating ? styles.labelFloating : ''}`}>
          {label}
        </label>
        <InputTag
          ref={inputRef}
          className={`${styles.input} ${multiline ? styles.inputMultiline : ''}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setInternalFocus(true)}
          onBlur={() => setInternalFocus(false)}
          placeholder={isFloating ? placeholder : ''}
          disabled={disabled}
          {...(multiline ? { rows } : {})}
        />
      </div>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
}
