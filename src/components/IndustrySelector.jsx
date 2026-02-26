import styles from './IndustrySelector.module.css';

/**
 * M3 Expressive Industry/Single-Select List
 * 
 * Props:
 * - options: string[]
 * - selected: string | null
 * - onSelect: (value: string) => void
 */
export default function IndustrySelector({ options = [], selected, onSelect }) {
  return (
    <div className={styles.list}>
      {options.map(option => {
        const isSelected = selected === option;
        return (
          <div
            key={option}
            className={`${styles.item} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect?.(option)}
            role="radio"
            aria-checked={isSelected}
          >
            <div className={styles.radio}>
              {isSelected && <div className={styles.radioDot} />}
            </div>
            <span className={styles.label}>{option}</span>
          </div>
        );
      })}
    </div>
  );
}
