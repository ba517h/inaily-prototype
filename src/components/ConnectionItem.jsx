import Icon from './Icon';
import styles from './ConnectionItem.module.css';

export default function ConnectionItem({ name, role, company, avatarUrl, time }) {
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
      {time && <span className={styles.time}>{time}</span>}
      <Icon name="chevron_right" size={20} color="var(--color-on-surface-variant)" style={{ opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
}
