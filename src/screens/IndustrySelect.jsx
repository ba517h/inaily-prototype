import { useState } from 'react';
import { Button, SearchField, IndustrySelector, OnboardingShell } from '../components';
import styles from './IndustrySelect.module.css';

const INDUSTRIES = ['Edutech', 'Exporting', 'Fintech', 'Health & Wellness', 'Media', 'SaaS'];

export default function IndustrySelect() {
  const [selected, setSelected] = useState('Fintech');
  const [query, setQuery] = useState('');

  const filtered = INDUSTRIES.filter((ind) =>
    ind.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <OnboardingShell
      step={5}
      total={7}
      headline={<>What's your <span className={styles.accent}>industry</span>?</>}
      subtext="This helps us match you with relevant people"
      bottom={<Button variant="filled" label="Continue" fullWidth />}
    >
      <div className={styles.search}>
        <SearchField
          placeholder="Search industries"
          value={query}
          onChange={setQuery}
        />
      </div>

      <IndustrySelector
        options={filtered}
        selected={selected}
        onSelect={setSelected}
      />
    </OnboardingShell>
  );
}
