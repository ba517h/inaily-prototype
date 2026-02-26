import { Button, OutlinedField, ExampleCard, OnboardingShell } from '../components';
import styles from './NetworkingBio.module.css';

export default function NetworkingBio() {
  return (
    <OnboardingShell
      step={6}
      total={7}
      headline={<>Who do you want to <span className={styles.accent}>meet</span>?</>}
      subtext="Be specific — vague answers get random matches"
      bottom={<Button variant="filled" label="Continue" fullWidth disabled />}
    >
      <div className={styles.field}>
        <OutlinedField
          label="Your networking goal"
          value=""
          multiline
          rows={3}
          placeholder='e.g., "I want to meet ML engineers working on LLM infra at series B+ startups..."'
        />
      </div>

      <div className={styles.examples}>
        <div className={styles.examplesLabel}>EXAMPLES</div>
        <ExampleCard
          type="good"
          name="Arjun"
          role="ML Engineer"
          quote="I want to meet people working on LLMs and training infrastructure"
          result="Connected with 5 engineers"
        />
        <div className={styles.exampleGap} />
        <ExampleCard
          type="bad"
          name="Priya"
          role="Product Manager"
          quote="I want to network"
          result="Got random, irrelevant matches"
        />
      </div>
    </OnboardingShell>
  );
}
