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
  userRole = '',
  userCompany = '',
  startSent = false,
  prefilledMessage = '',
  initialIncomingMessage = '',
}) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const isOnline = mode === 'open';

  const [messages, setMessages] = useState(
    startSent
      ? [{ type: 'outgoing', text: prefilledMessage }]
      : mode === 'open'
        ? INITIAL_MESSAGES
        : []
  );
  const [message, setMessage] = useState('');
  const [conversationMode, setConversationMode] = useState(
    startSent ? 'request-sent' : mode
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOnline) return;
    const durations = [3000, 5000];
    const timer = setTimeout(() => {
      setSubtitleIndex(prev => prev + 1);
    }, durations[subtitleIndex % 2]);
    return () => clearTimeout(timer);
  }, [subtitleIndex, isOnline]);

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
  const showLock = conversationMode === 'request' || conversationMode === 'request-sent';

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
            <div className={styles.headerNameRow}>
              <span className={styles.headerName}>{userName}</span>
              {showLock && (
                <Icon name="lock" size={16} color="var(--color-on-surface-variant)" />
              )}
            </div>
            {isOnline ? (
              <span className={styles.headerSubtitle} key={subtitleIndex}>
                {subtitleIndex % 2 === 0 && <span className={styles.onlineDot} />}
                {subtitleIndex % 2 === 0 ? 'Online' : `${userRole} \u00B7 ${userCompany}`}
              </span>
            ) : userRole ? (
              <span className={styles.headerSubtitle}>
                {userRole}{userCompany ? ` \u00B7 ${userCompany}` : ''}
              </span>
            ) : null}
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {conversationMode === 'request' && messages.length === 0 && (
            <div className={styles.infoCard}>
              <span className={styles.waveEmoji}>{'\u{1F44B}'}</span>
              <div className={styles.infoText}>
                <strong>{firstName}</strong> accepts chats by request.
                <br />
                Introduce yourself to start a conversation.
              </div>
            </div>
          )}

          {mode === 'accepted' && (
            <>
              <div className={`${styles.bubble} ${styles.incoming}`}>
                {initialIncomingMessage}
              </div>
              <div className={styles.systemMessage}>You accepted this request {'\u2014'} say hello!</div>
            </>
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
            <div className={styles.sentConfirm}>
              Your message has been sent.<br />
              {firstName} will see it next time they check.
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
        {(conversationMode === 'request' || conversationMode === 'request-sent') && (
          <div className={`${styles.messageCounter} ${conversationMode === 'request-sent' ? styles.counterZero : ''}`}>
            {conversationMode === 'request' ? '1' : '0'}
          </div>
        )}
      </div>
    </ScreenShell>
  );
}
