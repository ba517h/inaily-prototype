import Button from './Button';
import Icon from './Icon';
import styles from './AttendeeCard.module.css';

/**
 * M3 Expressive Attendee Card — Tall Photo Variants
 *
 * Props:
 * - variant: 'hero' (default) | 'relevance'
 * - name: string
 * - role: string (combined "Title @ Company")
 * - photoUrl: string
 * - relevance: Array<{ icon: string, text: string }>
 * - onChat: function
 * - onViewProfile: function
 */
export default function AttendeeCard({
  variant = 'hero',
  name,
  role,
  photoUrl,
  relevance = [],
  onChat,
  onViewProfile,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.photoWrapper}>
        <div className={styles.photoSection}>
          {photoUrl && (
            <img src={photoUrl} alt={name} className={styles.photo} />
          )}
          {variant === 'hero' && (
            <>
              <div className={styles.photoGradient} />
              <div className={styles.photoInfo}>
                <div className={styles.photoName}>{name}</div>
                <div className={styles.photoRole}>{role}</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.infoSection}>
        {variant === 'relevance' && (
          <div className={styles.nameBlock}>
            <div className={styles.cardName}>{name}</div>
            <div className={styles.cardRole}>{role}</div>
          </div>
        )}

        {relevance.length > 0 && (
          <div className={styles.relevanceList}>
            {relevance.map((r, i) => (
              <div key={i} className={styles.relevanceRow}>
                <span className={styles.relevanceIcon}>
                  <Icon name={r.icon} size={18} />
                </span>
                <span className={styles.relevanceText}>{r.text}</span>
              </div>
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
            label="Chat"
            size="small"
            icon={<Icon name="chat_bubble" size={18} fill />}
            onClick={onChat}
          />
        </div>
      </div>
    </div>
  );
}
