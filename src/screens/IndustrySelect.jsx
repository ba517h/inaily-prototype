import { useState } from 'react';
import { Button, OutlinedField, IndustrySelector, OnboardingShell, Icon } from '../components';
import styles from './IndustrySelect.module.css';

const INDUSTRIES = ['Edutech', 'Exporting', 'Fintech', 'Health & Wellness', 'Media', 'SaaS'];

export default function IndustrySelect() {
  const [selected, setSelected] = useState('Fintech');

  return (
    <OnboardingShell
      step={5}
      total={7}
      headline={<>What's your <span className={styles.accent}>industry</span>?</>}
      subtext="This helps us match you with relevant people"
      bottom={<Button variant="filled" label="Continue" fullWidth />}
    >
      <div className={styles.search}>
        <OutlinedField
          label="Search industries"
          value=""
          suffix={<Icon name="search" size={20} color="var(--color-on-surface-variant)" />}
        />
      </div>

      <div className={styles.list}>
        <IndustrySelector
          options={INDUSTRIES}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </OnboardingShell>
  );
}
