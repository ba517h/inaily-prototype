import { Button, OTPInput, OnboardingShell } from '../components';
import styles from './OTPScreen.module.css';

export default function OTPScreen() {
  return (
    <OnboardingShell
      step={2}
      total={7}
      headline={<>Enter your <span className={styles.accent}>OTP code</span></>}
      subtext="Sent to +91 70120 44388"
      bottom={
        <Button variant="filled" label="Confirm OTP" fullWidth disabled />
      }
    >
      <div className={styles.otpWrap}>
        <OTPInput length={6} value="4827" />
      </div>

      <p className={styles.resend}>
        Resend code in <strong>0:28</strong>
      </p>
    </OnboardingShell>
  );
}
