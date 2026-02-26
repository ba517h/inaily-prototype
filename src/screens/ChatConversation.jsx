import { ScreenShell, BottomNav, Icon } from '../components';
import styles from './ChatConversation.module.css';

const MESSAGES = [
  { type: 'timestamp', text: 'Yesterday' },
  { type: 'incoming', text: 'Hey! Great connecting at Tech Summit yesterday \ud83d\udc4b' },
  { type: 'incoming', text: 'Would love to chat more about the design systems talk' },
  { type: 'outgoing', text: 'Absolutely! That was such a good session' },
  { type: 'outgoing', text: 'Are you free for a quick coffee chat tomorrow?' },
  { type: 'timestamp', text: 'Today' },
  { type: 'incoming', text: 'Sounds great! Let\u2019s connect after the keynote \ud83d\ude0a' },
  { type: 'outgoing', text: 'Perfect, see you there!' },
];

export default function ChatConversation() {
  return (
    <ScreenShell
      bottomNav={<BottomNav active="chat" />}
    >
      <div className={styles.content}>
        {/* Status bar spacer */}
        <div className={styles.statusBar} />

        {/* Chat header */}
        <div className={styles.chatHeader}>
          <button className={styles.backBtn}>
            <Icon name="arrow_back" size={22} color="var(--color-on-surface)" />
          </button>
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Alice Johnson"
            className={styles.headerAvatar}
          />
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>Alice Johnson</span>
            <div className={styles.headerStatus}>
              <span className={styles.onlineDot} />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {MESSAGES.map((msg, i) => {
            if (msg.type === 'timestamp') {
              return (
                <div key={i} className={styles.timestamp}>{msg.text}</div>
              );
            }
            return (
              <div
                key={i}
                className={`${styles.bubble} ${msg.type === 'incoming' ? styles.incoming : styles.outgoing}`}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {/* Input area */}
        <div className={styles.inputArea}>
          <div className={styles.inputField}>
            <span className={styles.inputPlaceholder}>Type a message...</span>
          </div>
          <button className={styles.sendBtn}>
            <Icon name="arrow_upward" size={20} color="var(--color-on-primary)" />
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
