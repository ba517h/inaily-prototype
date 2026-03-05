import { useState } from 'react';
import { ScreenShell, AttendeeCard, Icon, StatusBar, BottomNav } from '../components';
import FeedLoading from './FeedLoading';
import styles from './Feed.module.css';

const ATTENDEES = [
  {
    name: 'Narendran K',
    role: 'Product Designer · Pickyourtrail',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    relevance: [
      { icon: 'interests', text: 'Shared interest in design & community' },
      { icon: 'location_on', text: 'Based in Chennai' },
      { icon: 'group', text: 'Mutual connection: Arjun' },
    ],
  },
  {
    name: 'Priya Sharma',
    role: 'Founder · NexGen AI',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    relevance: [
      { icon: 'interests', text: 'Shared interest in AI & startups' },
      { icon: 'apartment', text: 'Same industry' },
      { icon: 'translate', text: 'Speaks Tamil & English' },
    ],
  },
  {
    name: 'Arjun Mehta',
    role: 'Staff Engineer · Google',
    photoUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    relevance: [
      { icon: 'work', text: 'Both in engineering' },
      { icon: 'school', text: 'Same alma mater' },
      { icon: 'interests', text: 'Into ML & infrastructure' },
    ],
  },
  {
    name: 'Fatima Zahra',
    role: 'UX Researcher · Swiggy',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    relevance: [
      { icon: 'interests', text: 'Interested in design research' },
      { icon: 'school', text: 'Same alma mater' },
      { icon: 'location_on', text: 'Based in Bengaluru' },
    ],
  },
  {
    name: 'Rahul Verma',
    role: 'Design Lead · Razorpay',
    photoUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    relevance: [
      { icon: 'palette', text: 'Both in design' },
      { icon: 'interests', text: 'Into design systems & tokens' },
      { icon: 'apartment', text: 'Same industry vertical' },
    ],
  },
  {
    name: 'Sneha Iyer',
    role: 'Senior PM · Microsoft',
    photoUrl: 'https://randomuser.me/api/portraits/women/85.jpg',
    relevance: [
      { icon: 'work', text: 'Works in product management' },
      { icon: 'interests', text: 'Into productivity tools' },
      { icon: 'translate', text: 'Speaks English & Hindi' },
    ],
  },
];

export default function Feed({ variant = 'hero' }) {
  const [loading, setLoading] = useState(true);

  return (
    <ScreenShell bottomNav={<BottomNav active="attendees" />}>
      <div className={styles.content}>
        <div className={styles.statusBarArea}>
          <StatusBar />
        </div>

        {/* Compact Event Card — always visible */}
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

        {loading ? (
          <FeedLoading onComplete={() => setLoading(false)} />
        ) : (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>People at this event</span>
            <div className={styles.cardList}>
              {ATTENDEES.map((a) => (
                <AttendeeCard
                  key={a.name}
                  variant={variant}
                  name={a.name}
                  role={a.role}
                  photoUrl={a.photoUrl}
                  relevance={a.relevance}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  );
}
