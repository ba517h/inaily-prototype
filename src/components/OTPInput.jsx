import { useState, useRef, useEffect } from 'react';
import styles from './OTPInput.module.css';

/**
 * M3 Expressive OTP Input
 * 
 * Props:
 * - length: number (default 6)
 * - value: string
 * - onChange: (value: string) => void
 */
export default function OTPInput({ length = 6, value = '', onChange }) {
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRefs = useRef([]);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  const handleInput = (index, char) => {
    if (!/^\d?$/.test(char)) return;
    const newValue = digits.slice();
    newValue[index] = char;
    const joined = newValue.join('').slice(0, length);
    onChange?.(joined);
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputRefs.current[i] = el)}
          className={`${styles.box} ${focusIndex === i ? styles.active : ''} ${digits[i] ? styles.filled : ''}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i]}
          onChange={e => handleInput(i, e.target.value)}
          onFocus={() => setFocusIndex(i)}
          onBlur={() => setFocusIndex(-1)}
          onKeyDown={e => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
