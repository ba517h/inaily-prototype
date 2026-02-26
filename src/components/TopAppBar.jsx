import Icon from './Icon';
import styles from './TopAppBar.module.css';

/**
 * M3 Expressive Top App Bar
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - showBack: boolean
 * - onBack: function
 * - avatar: string (single character for avatar)
 * - trailing: ReactNode (optional trailing action)
 */
export default function TopAppBar({
  title,
  subtitle,
  showBack = false,
  onBack,
  avatar,
  trailing,
}) {
  return (
    <header className={styles.bar}>
      <div className={styles.leading}>
        {showBack && (
          <button className={styles.backButton} onClick={onBack} aria-label="Go back">
            <Icon name="arrow_back" size={24} />
          </button>
        )}
      </div>
      <div className={styles.center}>
        {title && <div className={styles.title}>{title}</div>}
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.trailing}>
        {avatar && (
          <div className={styles.avatar}>{avatar}</div>
        )}
        {trailing}
      </div>
    </header>
  );
}
