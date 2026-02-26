import { ScreenShell, BottomNav, AttendeeCard, Icon } from '../components';
import styles from './Feed.module.css';

export default function Feed() {
  return (
    <ScreenShell
      bottomNav={<BottomNav active="explore" />}
    >
      <div className={styles.content}>
        {/* Status bar spacer */}
        <div className={styles.statusBar} />

        {/* Event Banner */}
        <div className={styles.banner}>
          {/* Decorative glow */}
          <div className={styles.bannerGlow} />
          <div className={styles.bannerDecor} />

          {/* Top row: avatar + notification */}
          <div className={styles.bannerTop}>
            <div className={styles.bannerAvatar}>N</div>
            <button className={styles.bannerBell}>
              <Icon name="notifications" size={20} color="rgba(255,255,255,0.9)" />
            </button>
          </div>

          {/* Event info */}
          <div className={styles.bannerInfo}>
            <h1 className={styles.bannerTitle}>Tech Summit 2026</h1>
            <div className={styles.bannerPills}>
              <span className={styles.pill}>
                <Icon name="calendar_today" size={14} fill color="rgba(255,255,255,0.8)" />
                Feb 24–27, 2026
              </span>
              <span className={styles.pill}>
                <Icon name="location_on" size={14} fill color="rgba(255,255,255,0.8)" />
                Bengaluru
              </span>
              <span className={styles.pill}>
                <Icon name="group" size={14} fill color="rgba(255,255,255,0.8)" />
                142 attendees
              </span>
            </div>
          </div>
        </div>

        {/* For You Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>For You</span>
            <button className={styles.seeAll}>
              See all <Icon name="arrow_forward" size={14} />
            </button>
          </div>
          <AttendeeCard
            recommended
            name="Mohammed Basith"
            role="Product Designer"
            company="Pickyourtrail"
            bio="Building Product Hunt Kerala community. Want to meet Kerala-based startup founders."
            tags={['Community', 'Product', 'Startups']}
          />
        </div>

        {/* Everyone Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Everyone</span>
          </div>
          <AttendeeCard
            name="Sarah Kurian"
            role="Product Manager"
            company="Razorpay"
            bio="Interested in fintech builders and design system leads."
          />
        </div>
      </div>
    </ScreenShell>
  );
}
