import { useState } from 'react';
import { ScreenShell, StatusBar, BottomNav, SearchField, Icon, BottomSheet, Button } from '../components';
import styles from './ChatList.module.css';

const MODE_OPTIONS = [
  { id: 'open', icon: 'forum', label: 'Open to all', desc: 'Anyone can message you' },
  { id: 'request', icon: 'lock', label: 'Request only', desc: 'People send 1 message. You approve to continue.' },
  { id: 'off', icon: 'do_not_disturb_on', label: 'Turn off', desc: 'No new conversations. Existing chats continue.' },
];

const MODE_LABELS = { open: 'Open to all', request: 'Request only', off: 'Turned off' };
const CHIP_LABELS = { open: 'Everyone', request: 'Requests', off: 'Off' };

const INITIAL_REQUESTS = [
  { name: 'Mohammed Basith', role: 'Product Designer', company: 'Pickyourtrail', avatarUrl: 'https://i.pravatar.cc/150?img=11', message: 'Hey! Loved your talk on design systems' },
  { name: 'Priya Menon', role: 'Product Manager', company: 'NexGen AI', avatarUrl: 'https://i.pravatar.cc/150?img=25', message: 'Would love to connect about AI product strategy' },
];

const INITIAL_CONVERSATIONS = [
  { name: 'Alice Johnson', role: 'UX Researcher', company: 'Stripe', avatarUrl: 'https://i.pravatar.cc/150?img=47', lastMessage: 'Perfect, see you there!', time: '2m' },
  { name: 'Ravi Shankar', role: 'Staff Engineer', company: 'Google', avatarUrl: 'https://i.pravatar.cc/150?img=52', lastMessage: 'Thanks for the recommendation', time: '1h' },
  { name: 'Emily Davis', role: 'Design Lead', company: 'Meta', avatarUrl: 'https://i.pravatar.cc/150?img=23', lastMessage: "Let's catch up at the after-party", time: '3h' },
];

export default function ChatList() {
  const [chatMode, setChatMode] = useState('open');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [messages, setMessages] = useState(INITIAL_CONVERSATIONS);
  const [fading, setFading] = useState(null);

  const filtered = messages.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleModeSelect = (id) => {
    setChatMode(id);
    setSheetOpen(false);
  };

  const handleAccept = (person) => {
    setFading(person.name);
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.name !== person.name));
      setMessages(prev => [{
        ...person,
        lastMessage: person.message,
        time: 'now',
      }, ...prev]);
      setFading(null);
    }, 300);
  };

  const handleDecline = (person) => {
    setFading(person.name);
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.name !== person.name));
      setFading(null);
    }, 300);
  };

  return (
    <ScreenShell bottomNav={<BottomNav active="chat" />}>
      <div className={styles.content}>
        <StatusBar />

        <div className={styles.headerRow}>
          <h1 className={styles.title}>Chats</h1>
          <button className={styles.statusChip} onClick={() => setSheetOpen(true)}>
            <span className={`${styles.statusDot} ${styles[chatMode]}`} />
            <span className={styles.statusChipLabel}>{CHIP_LABELS[chatMode]}</span>
            <Icon name="expand_more" size={16} color="var(--color-on-surface-variant)" />
          </button>
        </div>

        <div className={styles.searchWrap}>
          <SearchField
            placeholder="Search conversations..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className={styles.list}>
          {chatMode === 'request' && requests.length > 0 && (
            <>
              <div className={styles.sectionLabel}>REQUESTS ({requests.length})</div>
              {requests.map((req) => (
                <div key={req.name} className={`${styles.chatRow} ${fading === req.name ? styles.fading : ''}`}>
                  <img className={styles.chatAvatar} src={req.avatarUrl} alt={req.name} />
                  <div className={styles.chatContent}>
                    <div className={styles.chatName}>{req.name}</div>
                    <div className={styles.chatDesignation}>{req.role} · {req.company}</div>
                    <div className={`${styles.chatMessage} ${styles.request}`}>"{req.message}"</div>
                    <div className={styles.requestActions}>
                      <Button variant="filled" size="small" label="Accept" onClick={() => handleAccept(req)} />
                      <Button variant="outlined" size="small" label="Decline" onClick={() => handleDecline(req)} />
                    </div>
                  </div>
                </div>
              ))}
            </>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Message availability">
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
              <div className={styles.optionEnd}>
                <span className={`${styles.sheetDot} ${styles[opt.id]}`} />
                <Icon name={opt.icon} size={20} color="var(--color-on-surface-variant)" />
              </div>
            </button>
          );
        })}
      </BottomSheet>
    </ScreenShell>
  );
}
