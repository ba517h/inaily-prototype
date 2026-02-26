import Button from './Button';
import Icon from './Icon';
import styles from './AttendeeCard.module.css';

/**
 * M3 Expressive Attendee Card
 *
 * Props:
 * - recommended: boolean (uses primary-container bg + filled Connect)
 * - name: string
 * - role: string
 * - company: string
 * - bio: string
 * - tags: string[] (optional chips)
 * - avatarUrl: string (optional, falls back to initial)
 * - onConnect: function
 * - onViewProfile: function
 */
export default function AttendeeCard({
  recommended = false,
  name,
  role,
  company,
  bio,
  tags,
  avatarUrl,
  onConnect,
  onViewProfile,
}) {
  const initial = name ? name[0].toUpperCase() : '?';

  return (
    <div className={`${styles.card} ${recommended ? styles.recommended : styles.regular}`}>
      <div className={`${styles.hero} ${recommended ? styles.heroTall : ''}`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className={styles.avatarImg} />
        ) : (
          <div className={`${styles.avatar} ${recommended ? styles.avatarLarge : ''}`}>{initial}</div>
        )}
        {recommended && (
          <div className={styles.badge}><Icon name="star" size={14} fill /> Best Match</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>{role} {company ? `\u00B7 ${company}` : ''}</div>
        {bio && <div className={styles.bio}>{bio}</div>}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <Button
            variant="outlined"
            label={recommended ? 'Profile' : 'View'}
            size="small"
            onClick={onViewProfile}
          />
          <Button
            variant={recommended ? 'filled' : 'tonal'}
            label="Connect"
            size="small"
            icon={<Icon name="person_add" size={18} fill />}
            onClick={onConnect}
          />
        </div>
      </div>
    </div>
  );
}
