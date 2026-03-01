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
 * - variant: 'bio' (default) | 'relevance'
 * - reasons: Array<{ icon: string, text: string }> (for relevance variant)
 * - chatMode: 'open' | 'request' | 'off' (default 'open')
 * - onChat: function
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
  variant = 'bio',
  reasons = [],
  chatMode = 'open',
  onChat,
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
        {variant === 'bio' && (
          <>
            {bio && <div className={styles.bio}>{bio}</div>}
            {tags && tags.length > 0 && (
              <div className={styles.tags}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </>
        )}
        {variant === 'relevance' && reasons.length > 0 && (
          <div className={styles.reasons}>
            {reasons.map((r, i) => (
              <div key={i} className={styles.reasonRow}>
                <Icon name={r.icon} size={18} fill color="var(--color-primary)" />
                <span className={styles.reasonText}>{r.text}</span>
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
{chatMode === 'open' && (
            <Button
              variant="filled"
              label="Chat"
              size="small"
              icon={<Icon name="chat_bubble" size={18} fill />}
              onClick={onChat}
            />
          )}
          {chatMode === 'request' && (
            <Button
              variant="tonal"
              label="Request"
              size="small"
              icon={<Icon name="lock" size={18} />}
              onClick={onChat}
            />
          )}
          {chatMode === 'off' && (
            <Button
              variant="outlined"
              label="Unavailable"
              size="small"
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
}
