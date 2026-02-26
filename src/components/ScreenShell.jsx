import styles from './ScreenShell.module.css';

/**
 * Screen Shell — wraps every screen with TopAppBar + optional BottomNav
 * 
 * Props:
 * - topBar: ReactNode (TopAppBar)
 * - bottomNav: ReactNode (BottomNav) — omit for onboarding
 * - children: screen content
 * - className: optional additional class
 */
export default function ScreenShell({ topBar, bottomNav, children, className = '' }) {
  return (
    <div className={styles.shell}>
      {topBar}
      <main className={`${styles.content} ${className}`}>
        {children}
      </main>
      {bottomNav}
    </div>
  );
}
