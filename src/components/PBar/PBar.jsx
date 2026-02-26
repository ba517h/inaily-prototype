import styles from './PBar.module.css';

/**
 * M3 Expressive Segmented Progress Bar
 *
 * Props:
 * - current: number (1-indexed, how many steps completed)
 * - total: number
 */
export default function PBar({ current = 1, total = 7 }) {
  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`${styles.segment} ${i < current ? styles.filled : styles.empty}`}
        />
      ))}
    </div>
  );
}
