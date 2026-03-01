import { useState } from 'react';
import { ScreenShell, StatusBar, BottomNav, SearchField, Icon, BottomSheet } from '../components';
import styles from './ChatList.module.css';

const MODE_OPTIONS = [
  { id: 'open', label: 'Open to all', desc: 'Anyone can message you' },
  { id: 'request', label: 'Request only', desc: 'People send 1 message. You approve to continue.' },
  { id: 'off', label: 'Turn off', desc: 'No new conversations. Existing chats continue.' },
];

const MODE_LABELS = { open: 'Open to all', request: 'Request only', off: 'Turned off' };

const REQUESTS = [
  { name: 'Mohammed Basith', role: 'Product Designer', company: 'Pickyourtrail', avatarUrl: 'https://i.pravatar.cc/150?img=11', message: 'Hey! Loved your talk on design systems' },
  { name: 'Priya Menon', role: 'Product Manager', company: 'NexGen AI', avatarUrl: 'https://i.pravatar.cc/150?img=25', message: 'Would love to connect about AI product strategy' },
];

const CONVERSATIONS = [
  { name: 'Alice Johnson', role: 'UX Researcher', company: 'Stripe', avatarUrl: 'https://i.pravatar.cc/150?img=47', lastMessage: 'Perfect, see you there!', time: '2m' },
  { name: 'Ravi Shankar', role: 'Staff Engineer', company: 'Google', avatarUrl: 'https://i.pravatar.cc/150?img=52', lastMessage: 'Thanks for the recommendation', time: '1h' },
  { name: 'Emily Davis', role: 'Design Lead', company: 'Meta', avatarUrl: 'https://i.pravatar.cc/150?img=23', lastMessage: "Let's catch up at the after-party", time: '3h' },
];

export default function ChatList() {
  const [chatMode, setChatMode] = useState('open');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleModeSelect = (id) => {
    setChatMode(id);
    setSheetOpen(false);
  };

  return (
    <ScreenShell bottomNav={<BottomNav active="chat" />}>
      <div className={styles.content}>
        <StatusBar />

        <div className={styles.header}>
          <h1 className={styles.title}>Chats</h1>
        </div>

        <button className={styles.statusSelector} onClick={() => setSheetOpen(true)}>
          <span className={styles.statusLabel}>Your chat:</span>
          <span className={styles.statusValue}>{MODE_LABELS[chatMode]}</span>
          <Icon name="expand_more" size={20} color="var(--color-primary)" />
        </button>

        <div className={styles.searchWrap}>
          <SearchField
            placeholder="Search conversations..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className={styles.list}>
          {chatMode === 'request' && REQUESTS.length > 0 && (
            <>
              <div className={styles.sectionLabel}>REQUESTS ({REQUESTS.length})</div>
              {REQUESTS.map((req) => (
                <div key={req.name} className={styles.chatRow}>
                  <img className={styles.chatAvatar} src={req.avatarUrl} alt={req.name} />
                  <div className={styles.chatContent}>
                    <div className={styles.chatName}>{req.name}</div>
                    <div className={styles.chatDesignation}>{req.role} · {req.company}</div>
                    <div className={`${styles.chatMessage} ${styles.request}`}>"{req.message}"</div>
                    <div className={styles.requestActions}>
                      <button className={styles.acceptBtn}>Accept</button>
                      <button className={styles.declineBtn}>Decline</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {chatMode === 'off' && (
            <div className={styles.offBanner}>
              <Icon name="chat_bubble_outline" size={20} color="var(--color-on-surface-variant)" />
              <span>You've turned off new messages. Existing chats continue.</span>
            </div>
          )}

          <div className={styles.sectionLabel}>MESSAGES</div>
          {filtered.map((conv) => (
            <div key={conv.name} className={styles.chatRow}>
              <img className={styles.chatAvatar} src={conv.avatarUrl} alt={conv.name} />
              <div className={styles.chatContent}>
                <div className={styles.chatName}>{conv.name}</div>
                <div className={styles.chatDesignation}>{conv.role} · {conv.company}</div>
                <div className={styles.chatMessage}>{conv.lastMessage}</div>
              </div>
              <div className={styles.chatMeta}>
                <span className={styles.chatTime}>{conv.time}</span>
                <Icon name="chevron_right" size={18} color="var(--color-on-surface-variant)" style={{ opacity: 0.4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Chat availability">
        {MODE_OPTIONS.map((opt) => {
          const selected = chatMode === opt.id;
          return (
            <button
              key={opt.id}
              className={`${styles.optionCard} ${selected ? styles.optionSelected : ''}`}
              onClick={() => handleModeSelect(opt.id)}
            >
              <div className={styles.optionRadio}>
                {selected && <div className={styles.optionDot} />}
              </div>
              <div className={styles.optionText}>
                <div className={styles.optionLabel}>{opt.label}</div>
                <div className={styles.optionDesc}>{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </BottomSheet>
    </ScreenShell>
  );
}
