import styles from './PhoneFrame.module.css';

/**
 * Phone Frame — 375x812 mobile preview wrapper with Dynamic Island
 *
 * Props:
 * - children: screen content
 * - label: optional label below the frame
 * - scale: number (default 1)
 * - dataTheme: 'light' | 'dark' (scopes theme to phone content)
 */
export default function PhoneFrame({ children, label, scale = 1, dataTheme }) {
  return (
    <div className={styles.wrapper}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      <div className={styles.frame}>
        <div className={styles.dynamicIsland} />
        <div className={styles.screen} data-theme={dataTheme}>
          {children}
        </div>
        <div className={styles.homeIndicator} />
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
}
