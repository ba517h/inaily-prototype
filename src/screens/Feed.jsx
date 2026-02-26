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

        {/* Compact Event Card */}
        <div className={styles.eventCard}>
          <div className={styles.eventIcon}>
            <Icon name="calendar_today" size={22} fill color="var(--color-on-primary-container)" />
          </div>
          <div className={styles.eventInfo}>
            <div className={styles.eventName}>Tech Summit 2026</div>
            <div className={styles.eventMeta}>Feb 24–27 · Bengaluru</div>
            <div className={styles.eventAttendees}>
              <Icon name="group" size={14} fill color="var(--color-primary)" />
              142 attendees
            </div>
          </div>
          <Icon name="chevron_right" size={20} color="var(--color-on-surface-variant)" />
        </div>

        {/* People at this event */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>People at this event</span>
          <div className={styles.cardList}>
            <AttendeeCard
              bestMatch
              name="Mohammed Basith"
              role="Product Designer"
              company="Pickyourtrail"
              bio="Building Product Hunt Kerala community. Want to meet Kerala-based startup founders."
              tags={['Community', 'Product', 'Startups']}
              avatarUrl="https://i.pravatar.cc/300?img=11"
            />
            <AttendeeCard
              name="Sarah Kurian"
              role="Product Manager"
              company="Razorpay"
              bio="Interested in fintech builders and design system leads."
              avatarUrl="https://i.pravatar.cc/300?img=32"
            />
            <AttendeeCard
              name="Arjun Mehta"
              role="ML Engineer"
              company="Google"
              bio="Looking for collaborators on open-source ML tooling projects."
              tags={['ML', 'Open Source']}
              avatarUrl="https://i.pravatar.cc/300?img=59"
            />
            <AttendeeCard
              name="Priya Nair"
              role="Founder"
              company="NexGen AI"
              bio="Building AI tools for small businesses. Love connecting with other founders."
              avatarUrl="https://i.pravatar.cc/300?img=25"
            />
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
