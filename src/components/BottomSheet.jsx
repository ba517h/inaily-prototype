import { useState } from 'react';
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
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  const open = isOpen && !isClosing;

  return (
    <div
      className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle} />
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
