import Button from './Button';
import styles from './ProfileRow.module.css';

/**
 * M3 Expressive Profile Detail Row
 * 
 * Props:
 * - icon: string (emoji or ReactNode)
 * - label: string
 * - value: string
 * - empty: boolean (shows "Not Added" + Update button)
 * - onUpdate: function
 */
export default function ProfileRow({ icon, label, value, empty = false, onUpdate }) {
  return (
    <div className={styles.row}>
      <div className={styles.iconBox}>{icon}</div>
      <div className={styles.info}>
        <div className={styles.label}>{label}</div>
        <div className={`${styles.value} ${empty ? styles.valueEmpty : ''}`}>
          {empty ? 'Not Added' : value}
        </div>
      </div>
      {empty && (
        <Button variant="tonal" label="Update" size="small" onClick={onUpdate} />
      )}
    </div>
  );
}
