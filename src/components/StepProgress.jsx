import styles from './StepProgress.module.css';

/**
 * M3 Expressive Onboarding Step Progress
 * 
 * Props:
 * - current: number (0-indexed)
 * - total: number
 */
export default function StepProgress({ current = 0, total = 7 }) {
  return (
    <div className={styles.container} role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={styles.step}>
          <div
            className={[
              styles.dot,
              i < current && styles.completed,
              i === current && styles.current,
              i > current && styles.upcoming,
            ].filter(Boolean).join(' ')}
          />
          {i < total - 1 && (
            <div
              className={[
                styles.connector,
                i < current ? styles.connectorDone : styles.connectorPending,
              ].filter(Boolean).join(' ')}
            />
          )}
        </div>
      ))}
    </div>
  );
}
