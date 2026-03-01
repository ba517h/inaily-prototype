import styles from './StatusBar.module.css';

/**
 * StatusBar — iOS-style status bar with time, notch spacer, and indicators
 *
 * Props:
 * - variant: 'light' (default) | 'dark'
 */
export default function StatusBar({ variant = 'light' }) {
  return (
    <div className={`${styles.statusBar} ${variant === 'dark' ? styles.dark : styles.light}`}>
      <span className={styles.time}>9:41</span>
      <div className={styles.notchSpacer} />
      <div className={styles.indicators}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="currentColor" />
          <path d="M5.17 7.83a4 4 0 0 1 5.66 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2.64 5.29a7.07 7.07 0 0 1 10.72 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M.46 2.76a10 10 0 0 1 15.08 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
          <path d="M24 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
