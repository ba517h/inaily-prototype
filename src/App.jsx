import { useState } from 'react';
import PhoneFrame from './layouts/PhoneFrame';
import Feed from './screens/Feed';
import PhoneEntry from './screens/PhoneEntry';
import OTPScreen from './screens/OTPScreen';
import IndustrySelect from './screens/IndustrySelect';
import NetworkingBio from './screens/NetworkingBio';
import ConnectionsScreen from './screens/Connections';
import Profile from './screens/Profile';
import styles from './App.module.css';

const SCREENS = [
  { id: 'feed', label: 'Feed', component: Feed },
  { id: 'phone', label: 'Phone', component: PhoneEntry },
  { id: 'otp', label: 'OTP', component: OTPScreen },
  { id: 'industry', label: 'Industry', component: IndustrySelect },
  { id: 'networking', label: 'Bio', component: NetworkingBio },
  { id: 'connections', label: 'People', component: ConnectionsScreen },
  { id: 'profile', label: 'Profile', component: Profile },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const ActiveComponent = SCREENS[activeScreen].component;

  return (
    <div className={styles.gallery}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>I</span>
          <span className={styles.logoText}>inaily</span>
        </div>
        <div className={styles.badge}>M3 Expressive</div>
      </div>

      {/* Tab Bar */}
      <div className={styles.tabs}>
        {SCREENS.map((screen, i) => (
          <button
            key={screen.id}
            className={`${styles.tab} ${activeScreen === i ? styles.tabActive : ''}`}
            onClick={() => setActiveScreen(i)}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Phone Frame — key triggers remount + entrance animation */}
      <PhoneFrame label={SCREENS[activeScreen].label}>
        <div key={SCREENS[activeScreen].id} className={styles.screenEnter}>
          <ActiveComponent />
        </div>
      </PhoneFrame>
    </div>
  );
}
