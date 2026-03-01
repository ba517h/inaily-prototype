import { useState } from 'react';
import { ScreenShell, AttendeeCard, Icon, StatusBar, BottomNav } from '../components';
import FeedLoading from './FeedLoading';
import styles from './Feed.module.css';

export default function Feed() {
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
              <AttendeeCard
                bestMatch
                variant="bio"
                name="Mohammed Basith"
                role="Product Designer"
                company="Pickyourtrail"
                bio="Building Product Hunt Kerala community. Want to meet Kerala-based startup founders."
                tags={['Community', 'Product']}
                avatarUrl="https://i.pravatar.cc/300?img=11"
                chatMode="open"
              />
              <AttendeeCard
                variant="relevance"
                name="Priya Menon"
                role="Founder"
                company="NexGen AI"
                avatarUrl="https://i.pravatar.cc/300?img=25"
                chatMode="open"
                reasons={[
                  { icon: 'interests', text: 'Shared interest in AI & startups' },
                  { icon: 'apartment', text: 'Same industry' },
                  { icon: 'translate', text: 'Speaks Tamil & English' },
                ]}
              />
              <AttendeeCard
                variant="bio"
                name="Ravi Shankar"
                role="Staff Engineer"
                company="Google"
                bio="ML infrastructure at scale. Looking for infra and platform engineers."
                tags={['ML', 'Infrastructure']}
                avatarUrl="https://i.pravatar.cc/300?img=52"
                chatMode="request"
              />
              <AttendeeCard
                variant="relevance"
                name="Alice Johnson"
                role="UX Researcher"
                company="Meta"
                avatarUrl="https://i.pravatar.cc/300?img=47"
                chatMode="open"
                reasons={[
                  { icon: 'interests', text: 'Interested in design research' },
                  { icon: 'school', text: 'Same alma mater' },
                  { icon: 'location_on', text: 'Based in Bengaluru' },
                ]}
              />
              <AttendeeCard
                variant="bio"
                name="Akash Patel"
                role="Design Lead"
                company="Swiggy"
                bio="Scaling design systems for millions. Always happy to nerd out on tokens."
                tags={['Design Systems', 'Scale']}
                avatarUrl="https://i.pravatar.cc/300?img=14"
                chatMode="off"
              />
              <AttendeeCard
                variant="relevance"
                name="Emily Davis"
                role="Senior PM"
                company="Microsoft"
                avatarUrl="https://i.pravatar.cc/300?img=23"
                chatMode="request"
                reasons={[
                  { icon: 'work', text: 'Works in product management' },
                  { icon: 'interests', text: 'Into productivity tools' },
                  { icon: 'translate', text: 'Speaks English & Hindi' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  );
}
