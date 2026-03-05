import { useState } from 'react';
import { ScreenShell, StatusBar, BottomNav, Icon } from '../components';
import styles from './ChatSetup.module.css';

const OPTIONS = [
  { id: 'open', icon: 'forum', title: 'Open to everyone', desc: 'Anyone can message you directly' },
  { id: 'request', icon: 'lock', title: 'By request only', desc: 'You approve who can message you' },
  { id: 'off', icon: 'do_not_disturb_on', title: 'Messages off', desc: 'Focus on the event, chat later' },
];

export default function ChatSetup() {
  const [selected, setSelected] = useState(null);

  return (
    <ScreenShell bottomNav={<BottomNav active="chat" />}>
      <div className={styles.content}>
        <StatusBar />

        <div className={styles.body}>
          <div className={styles.emoji}>💬</div>
          <h1 className={styles.headline}>How do you want to receive messages?</h1>

          <div className={styles.options}>
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.optionCard} ${selected === opt.id ? styles.optionSelected : ''}`}
                onClick={() => setSelected(opt.id)}
              >
                <div className={styles.optionRadio}>
                  <div className={styles.radioDot} />
                </div>
                <div className={styles.optionText}>
                  <div className={styles.optionTitle}>{opt.title}</div>
                  <div className={styles.optionDesc}>{opt.desc}</div>
                </div>
                <div className={styles.optionEnd}>
                  <span className={`${styles.statusDot} ${styles[opt.id]}`} />
                  <Icon name={opt.icon} size={20} color="var(--color-on-surface-variant)" />
                </div>
              </button>
            ))}
          </div>

          <p className={styles.helper}>You can change this anytime from your chat settings</p>
        </div>
      </div>
    </ScreenShell>
  );
}
