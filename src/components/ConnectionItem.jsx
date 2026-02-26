import Button from './Button';
import styles from './ConnectionItem.module.css';

export default function ConnectionItem({ name, role, company, avatarUrl, onView }) {
  const initial = name ? name[0].toUpperCase() : '?';

  return (
    <div className={styles.item}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className={styles.avatarImg} />
      ) : (
        <div className={styles.avatar}>{initial}</div>
      )}
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>{role} @ {company}</div>
      </div>
      <Button variant="tonal" label="View" size="small" onClick={onView} />
    </div>
  );
}
