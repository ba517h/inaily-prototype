import Button from './Button';
import styles from './ConnectionItem.module.css';

const GRADIENTS = [
  'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
  'linear-gradient(135deg, var(--color-primary), var(--color-tertiary))',
  'linear-gradient(135deg, var(--color-tertiary), var(--color-secondary))',
  'linear-gradient(135deg, var(--color-primary), #9B7FC4)',
  'linear-gradient(135deg, var(--color-tertiary), var(--color-primary))',
];

export default function ConnectionItem({ name, role, company, avatarUrl, gradientIndex = 0, onView }) {
  const initial = name ? name[0].toUpperCase() : '?';
  const gradient = GRADIENTS[gradientIndex % GRADIENTS.length];

  return (
    <div className={styles.item}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className={styles.avatarImg} />
      ) : (
        <div className={styles.avatar} style={{ background: gradient }}>{initial}</div>
      )}
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>{role} @ {company}</div>
      </div>
      <Button variant="tonal" label="View" size="small" onClick={onView} />
    </div>
  );
}
