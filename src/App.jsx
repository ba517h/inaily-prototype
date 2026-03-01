import { useState } from 'react';
import PhoneFrame from './layouts/PhoneFrame';
import Icon from './components/Icon';
import MyEvents from './screens/MyEvents';
import Feed from './screens/Feed';
import PhoneEntry from './screens/PhoneEntry';
import OTPScreen from './screens/OTPScreen';
import IndustrySelect from './screens/IndustrySelect';
import NetworkingBio from './screens/NetworkingBio';
import ChatList from './screens/ChatList';
import ChatConversation from './screens/ChatConversation';
import Profile from './screens/Profile';
import SpecsPage from './screens/SpecsPage/SpecsPage';
import styles from './App.module.css';

function ChatDetail() {
  return <ChatConversation mode="open" userName="Alice Johnson" userAvatar="https://i.pravatar.cc/150?img=47" />;
}

function RequestChat() {
  return <ChatConversation mode="request" userName="Ravi Shankar" userAvatar="https://i.pravatar.cc/150?img=52" />;
}

const SCREENS = [
  { id: 'myEvents', label: 'My Events', component: MyEvents },
  { id: 'attendees', label: 'Attendees', component: Feed },
  { id: 'phone', label: 'Phone Entry', component: PhoneEntry },
  { id: 'otp', label: 'OTP Verify', component: OTPScreen },
  { id: 'industry', label: 'Industry', component: IndustrySelect },
  { id: 'networking', label: 'Networking Bio', component: NetworkingBio },
  { id: 'chat', label: 'Chat', component: ChatList },
  { id: 'chatDetail', label: 'Chat Detail', component: ChatDetail },
  { id: 'requestChat', label: 'Request Chat', component: RequestChat },
  { id: 'profile', label: 'Profile', component: Profile },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [theme, setTheme] = useState('light');
  const [specsMode, setSpecsMode] = useState(false);
  const [feedKey, setFeedKey] = useState(0);
  const ActiveComponent = SCREENS[activeScreen].component;

  const handleScreenClick = (i) => {
    setSpecsMode(false);
    if (SCREENS[i].id === 'attendees') {
      setFeedKey(k => k + 1);
    }
    setActiveScreen(i);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <nav className={styles.sidebar}>
          <div className={styles.sidebarLogo}>
            <span className={styles.logoMark}>I</span>
            <span className={styles.logoText}>inaily</span>
            <div className={styles.badge}>M3 Expressive</div>
          </div>
          {SCREENS.map((screen, i) => (
            <button
              key={screen.id}
              className={`${styles.sidebarItem} ${!specsMode && activeScreen === i ? styles.sidebarItemActive : ''}`}
              onClick={() => handleScreenClick(i)}
            >
              {screen.label}
            </button>
          ))}
          <div className={styles.sidebarDivider} />
          <button
            className={`${styles.sidebarItem} ${styles.sidebarSpecsItem} ${specsMode ? styles.sidebarItemActive : ''}`}
            onClick={() => setSpecsMode(true)}
          >
            <Icon name="design_services" size={18} color="currentColor" />
            Specs
          </button>
          <div className={styles.sidebarSpacer} />
          <button
            className={styles.themeToggle}
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            <Icon
              name={theme === 'light' ? 'dark_mode' : 'light_mode'}
              size={18}
              color="rgba(224, 214, 240, 0.8)"
            />
          </button>
        </nav>

        <div className={styles.phoneArea}>
          {specsMode ? (
            <div className={styles.specsArea}>
              <SpecsPage />
            </div>
          ) : (
            <>
              <PhoneFrame scale={0.8} dataTheme={theme}>
                <div key={SCREENS[activeScreen].id} className={styles.screenEnter}>
                  {SCREENS[activeScreen].id === 'attendees'
                    ? <ActiveComponent key={feedKey} />
                    : <ActiveComponent />
                  }
                </div>
              </PhoneFrame>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
