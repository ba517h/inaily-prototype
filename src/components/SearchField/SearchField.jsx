import Icon from '../Icon';
import styles from './SearchField.module.css';

/**
 * SearchField — pill-shaped search input with icon and clear button
 *
 * Props:
 * - placeholder: string
 * - value: string
 * - onChange: (value: string) => void
 */
export default function SearchField({ placeholder = 'Search...', value = '', onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <Icon name="search" size={20} />
      </span>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {value && (
        <button
          className={styles.clearBtn}
          onClick={() => onChange?.('')}
          aria-label="Clear search"
          type="button"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
}
