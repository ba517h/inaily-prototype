import Button from './Button';
import Icon from './Icon';
import styles from './AttendeeCard.module.css';

/**
 * M3 Expressive Attendee Card — Photo-First
 *
 * Props:
 * - name: string
 * - role: string
 * - company: string
 * - bio: string
 * - tags: string[] (optional chips)
 * - avatarUrl: string (photo URL)
 * - bestMatch: boolean (shows "Best Match" badge)
 * - onConnect: function
 * - onViewProfile: function
 */
export default function AttendeeCard({
  name,
  role,
  company,
  bio,
  tags,
  avatarUrl,
  bestMatch = false,
  onConnect,
  onViewProfile,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        {avatarUrl && (
          <img src={avatarUrl} alt={name} className={styles.photoImg} />
        )}
        {bestMatch && (
          <div className={styles.badge}>
            <Icon name="star" size={14} fill /> Best Match
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>
          {role}{company ? ` \u00B7 ${company}` : ''}
        </div>
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
            label="Profile"
            size="small"
            onClick={onViewProfile}
          />
          <Button
            variant="filled"
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
