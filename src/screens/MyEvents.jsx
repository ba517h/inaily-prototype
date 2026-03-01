import { useState } from 'react';
import { ScreenShell, StatusBar, Icon, Button, BottomSheet, OutlinedField } from '../components';
import styles from './MyEvents.module.css';

export default function MyEvents() {
  const [showJoin, setShowJoin] = useState(false);
  const [code, setCode] = useState('');

  return (
    <ScreenShell>
      <div className={styles.content}>
        <StatusBar />

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>My events</span>
          <div className={styles.avatar}>N</div>
        </div>

        {/* Section label */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>All events</div>
          <div className={styles.sectionSub}>Check in to start networking</div>
        </div>

        {/* Event card */}
        <div className={styles.eventCard}>
          <div className={styles.photoWrap}>
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
              alt="Conference venue"
            />
            <div className={styles.hostChip}>
              <div className={styles.hostLogo}>CR</div>
              <span className={styles.hostName}>Chennai React</span>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.titleRow}>
              <span className={styles.eventTitle}>Chennai React Meetup</span>
              <span className={styles.codeTag}>#CRMEET</span>
            </div>
            <div className={styles.detailRow}>
              <Icon name="calendar_today" size={18} color="var(--color-on-surface-variant)" />
              Sat Feb 21 2026
            </div>
            <div className={styles.detailRow}>
              <Icon name="location_on" size={18} color="var(--color-on-surface-variant)" />
              Comcast, Chennai One SEZ
            </div>
            <div className={styles.actionRow}>
              <Button variant="filled" label="Network" size="small" />
            </div>
          </div>
        </div>

        <div className={styles.spacer} />

        {/* Join new event button */}
        <div className={styles.bottomBar}>
          <button className={styles.joinBtn} onClick={() => setShowJoin(true)}>
            <Icon name="add" size={20} />
            Join new event
          </button>
        </div>
      </div>

      {/* Join Event Bottom Sheet */}
      <BottomSheet isOpen={showJoin} onClose={() => setShowJoin(false)} title="Join an event">
        <p className={styles.sheetDesc}>
          Enter the code shared by the host to join the event instantly.
        </p>
        <div className={styles.fieldWrap}>
          <OutlinedField label="Event code" value={code} onChange={setCode} />
        </div>
        <div className={styles.sheetActions}>
          <Button variant="text" label="Cancel" size="small" onClick={() => setShowJoin(false)} />
          <Button variant="filled" label="Join" size="small" />
        </div>
      </BottomSheet>
    </ScreenShell>
  );
}
