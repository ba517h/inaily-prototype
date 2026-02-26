import Icon from './Icon';
import styles from './ExampleCard.module.css';

/**
 * M3 Expressive Example Card (Good/Bad testimonials)
 * 
 * Props:
 * - type: 'good' | 'bad'
 * - name: string
 * - role: string
 * - quote: string
 * - result: string
 */
export default function ExampleCard({ type = 'good', name, role, quote, result }) {
  const isGood = type === 'good';

  return (
    <div className={`${styles.card} ${isGood ? styles.good : styles.bad}`}>
      <div className={styles.accent} />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.icon}><Icon name={isGood ? 'check' : 'close'} size={18} /></div>
          <div className={styles.author}>{name}, {role}</div>
        </div>
        <div className={styles.quote}>"{quote}"</div>
        <div className={styles.result}>{result}</div>
      </div>
    </div>
  );
}
