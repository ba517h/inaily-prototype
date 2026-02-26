import { ScreenShell, BottomNav, ProfileRow, Button, Icon } from '../components';
import styles from './Profile.module.css';

export default function Profile() {
  return (
    <ScreenShell
      bottomNav={<BottomNav active="profile" />}
    >
      <div className={styles.content}>
        {/* Status bar spacer */}
        <div className={styles.statusBar} />

        {/* Hero Card */}
        <div className={styles.heroCard}>
          <div className={styles.avatar}>
            <span className={styles.avatarLetter}>N</span>
          </div>
          <div className={styles.heroInfo}>
            <h1 className={styles.name}>Narendran P.</h1>
            <p className={styles.role}>CEO & Founder &middot; Inaily</p>
          </div>
          <div className={styles.completion}>
            <div className={styles.completionHeader}>
              <span className={styles.completionLabel}>Profile completion</span>
              <span className={styles.completionValue}>40%</span>
            </div>
            <div className={styles.completionTrack}>
              <div className={styles.completionFill} style={{ '--fill-target': '40%' }} />
            </div>
          </div>
        </div>

        {/* Work Details */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Details</h2>
          <div className={styles.rows}>
            <ProfileRow
              icon={<Icon name="business" size={18} fill color="var(--color-primary)" />}
              label="Industry"
              value="Edutech"
            />
            <ProfileRow
              icon={<Icon name="location_on" size={18} fill color="var(--color-primary)" />}
              label="Current City"
              value="Chennai"
            />
            <ProfileRow
              icon={<Icon name="link" size={18} fill color="var(--color-primary)" />}
              label="Company URL"
              empty
            />
            <ProfileRow
              icon={<Icon name="work" size={18} fill color="var(--color-primary)" />}
              label="LinkedIn"
              empty
            />
          </div>
        </div>

        {/* Personal */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal</h2>
          <div className={styles.rows}>
            <ProfileRow
              icon={<Icon name="translate" size={18} fill color="var(--color-primary)" />}
              label="Languages"
              value="English, Tamil"
            />
            <ProfileRow
              icon={<Icon name="person" size={18} color="var(--color-primary)" />}
              label="Gender"
              empty
            />
            <ProfileRow
              icon={<Icon name="cake" size={18} fill color="var(--color-primary)" />}
              label="Age"
              empty
            />
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
