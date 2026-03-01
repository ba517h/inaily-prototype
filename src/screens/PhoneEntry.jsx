import { useState, useEffect } from 'react';
import { Button, OutlinedField, OnboardingShell, Icon, BottomSheet, SearchField } from '../components';
import styles from './PhoneEntry.module.css';

const COUNTRIES = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'UAE', code: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Israel', code: '+972', flag: '🇮🇱' },
];

export default function PhoneEntry() {
  const [phone, setPhone] = useState('');
  const [showNumber, setShowNumber] = useState(true);
  const [isdOpen, setIsdOpen] = useState(false);
  const [isdSearch, setIsdSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  useEffect(() => {
    if (!isdOpen) setIsdSearch('');
  }, [isdOpen]);

  const filteredCountries = COUNTRIES.filter(
    (c) => {
      const q = isdSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.code.includes(q);
    }
  );

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
        <button className={styles.isdPicker} onClick={() => setIsdOpen(true)}>
          <span className={styles.isdFlag}>{selectedCountry.flag}</span>
          <span className={styles.isdCode}>{selectedCountry.code}</span>
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

      <BottomSheet isOpen={isdOpen} onClose={() => setIsdOpen(false)} title="Select country">
        <div className={styles.isdSheetContent}>
          <SearchField
            placeholder="Search country or code..."
            value={isdSearch}
            onChange={setIsdSearch}
          />
          <div className={styles.isdList}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.name}
                  className={`${styles.isdItem} ${selectedCountry.name === c.name ? styles.isdItemSelected : ''}`}
                  onClick={() => { setSelectedCountry(c); setIsdOpen(false); }}
                >
                  <span className={styles.isdItemFlag}>{c.flag}</span>
                  <span className={styles.isdItemName}>{c.name}</span>
                  <span className={styles.isdItemCode}>{c.code}</span>
                  {selectedCountry.name === c.name && (
                    <Icon name="check" size={18} color="var(--color-primary)" />
                  )}
                </button>
              ))
            ) : (
              <div className={styles.isdEmpty}>No countries found</div>
            )}
          </div>
        </div>
      </BottomSheet>
    </OnboardingShell>
  );
}
