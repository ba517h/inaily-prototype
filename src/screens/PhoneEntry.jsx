import { useState } from 'react';
import { Button, OutlinedField, OnboardingShell, Icon } from '../components';
import styles from './PhoneEntry.module.css';

export default function PhoneEntry() {
  const [phone, setPhone] = useState('7012044388');
  const [showNumber, setShowNumber] = useState(true);

  return (
    <OnboardingShell
      step={1}
      total={7}
      headline={<>What's your <span className={styles.accent}>phone number</span>?</>}
      subtext="We'll send a verification code"
      bottom={
        <Button
          variant="filled"
          label="Get OTP"
          icon={<Icon name="arrow_forward" size={20} />}
          fullWidth
        />
      }
    >
      <div className={styles.field}>
        <OutlinedField
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          prefix="+91"
          focused
        />
      </div>

      {/* Toggle */}
      <div className={styles.toggle}>
        <span className={styles.toggleLabel}>Show number to attendees?</span>
        <button
          className={`${styles.switch} ${showNumber ? styles.switchOn : ''}`}
          onClick={() => setShowNumber(!showNumber)}
          role="switch"
          aria-checked={showNumber}
        >
          <div className={styles.switchThumb} />
        </button>
      </div>
    </OnboardingShell>
  );
}
