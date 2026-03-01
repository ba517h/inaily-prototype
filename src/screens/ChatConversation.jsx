import { useState, useRef, useEffect } from 'react';
import { ScreenShell, Icon, StatusBar } from '../components';
import styles from './ChatConversation.module.css';

const INITIAL_MESSAGES = [
  { type: 'timestamp', text: 'Yesterday' },
  { type: 'incoming', text: 'Hey! Great connecting at Tech Summit yesterday \u{1F44B}' },
  { type: 'incoming', text: 'Would love to chat more about the design systems talk' },
  { type: 'outgoing', text: 'Absolutely! That was such a good session' },
  { type: 'outgoing', text: 'Are you free for a quick coffee chat tomorrow?' },
  { type: 'timestamp', text: 'Today' },
  { type: 'incoming', text: 'Sounds great! Let\u2019s connect after the keynote \u{1F60A}' },
  { type: 'outgoing', text: 'Perfect, see you there!' },
];

export default function ChatConversation({
  mode = 'open',
  userName = 'Alice Johnson',
  userAvatar = 'https://i.pravatar.cc/150?img=47',
}) {
  const [messages, setMessages] = useState(mode === 'open' ? INITIAL_MESSAGES : []);
  const [message, setMessage] = useState('');
  const [conversationMode, setConversationMode] = useState(mode);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const firstName = userName.split(' ')[0];

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { type: 'outgoing', text: trimmed }]);
    setMessage('');
    if (conversationMode === 'request') {
      setConversationMode('request-sent');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled = conversationMode === 'request-sent';

  return (
    <ScreenShell scrollable={false}>
      <div className={styles.content}>
        <StatusBar />

        {/* Chat header */}
        <div className={styles.chatHeader}>
          <button className={styles.backBtn}>
            <Icon name="arrow_back" size={22} color="var(--color-on-surface)" />
          </button>
          <img
            src={userAvatar}
            alt={userName}
            className={styles.headerAvatar}
          />
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>{userName}</span>
            {mode === 'open' ? (
              <div className={styles.headerStatus}>
                <span className={styles.onlineDot} />
                Online
              </div>
            ) : (
              <div className={styles.requestBadge}>
                <Icon name="lock" size={14} color="var(--color-on-secondary-container)" />
                Request
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {conversationMode === 'request' && messages.length === 0 && (
            <div className={styles.infoCard}>
              <Icon name="lock" size={32} color="var(--color-primary)" />
              <div className={styles.infoText}>
                <strong>{firstName}</strong> accepts new chats by request. Send a message to introduce yourself.
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
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

          {conversationMode === 'request-sent' && (
            <div className={styles.waitingCard}>
              <Icon name="hourglass_top" size={22} color="var(--color-on-primary-container)" />
              <span>Waiting for {firstName} to accept your request</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className={`${styles.inputArea} ${isInputDisabled ? styles.inputDisabled : ''}`}>
          <input
            type="text"
            className={styles.inputField}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isInputDisabled}
          />
          <button className={styles.sendBtn} onClick={handleSend} disabled={isInputDisabled}>
            <Icon name="send" size={20} color="var(--color-on-primary)" />
          </button>
        </div>
        {conversationMode === 'request' && (
          <div className={styles.helperText}>You can send 1 message</div>
        )}
      </div>
    </ScreenShell>
  );
}
