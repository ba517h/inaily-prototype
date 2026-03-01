import styles from './BottomSheet.module.css';

/**
 * M3 Expressive Bottom Sheet — modal overlay with slide-up panel
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title: string (optional)
 * - children: ReactNode
 */
export default function BottomSheet({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
