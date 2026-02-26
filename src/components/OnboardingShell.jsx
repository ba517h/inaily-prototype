import { ScreenShell, PBar, Icon } from './';
import styles from './OnboardingShell.module.css';

/**
 * OnboardingShell — shared wrapper for onboarding screens (steps 1–7)
 *
 * Props:
 * - step: current step number
 * - total: total steps (default 7)
 * - headline: ReactNode (the question heading)
 * - subtext: string (supporting text below headline)
 * - children: screen-specific form content
 * - bottom: ReactNode (CTA button area)
 */
export default function OnboardingShell({ step, total = 7, headline, subtext, children, bottom }) {
  return (
    <ScreenShell
      topBar={
        <div className={styles.topRow}>
          <button className={styles.backBtn} aria-label="Go back">
            <Icon name="arrow_back" size={24} color="var(--color-on-surface)" />
          </button>
          <div className={styles.progressWrap}>
            <PBar current={step} total={total} />
          </div>
          <div className={styles.spacer} />
        </div>
      }
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subtext}>{subtext}</p>
          <div className={styles.body}>{children}</div>
        </div>
        <div className={styles.bottom}>{bottom}</div>
      </div>
    </ScreenShell>
  );
}
