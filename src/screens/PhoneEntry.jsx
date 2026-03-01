import { useState } from 'react';
import { Button, OutlinedField, OnboardingShell, Icon } from '../components';
import styles from './PhoneEntry.module.css';

export default function PhoneEntry() {
  const [phone, setPhone] = useState('');
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
      <div className={styles.phoneRow}>
        <button className={styles.isdPicker}>
          <span className={styles.isdFlag}>🇮🇳</span>
          <span className={styles.isdCode}>+91</span>
          <Icon name="expand_more" size={18} color="var(--color-on-surface-variant)" />
        </button>
        <div className={styles.phoneField}>
          <OutlinedField
            label="Phone Number"
            value={phone}
            onChange={setPhone}
          />
        </div>
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
