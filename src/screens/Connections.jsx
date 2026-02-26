import { ScreenShell, BottomNav, ConnectionItem, Icon } from '../components';
import styles from './Connections.module.css';

const CONNECTIONS = [
  { name: 'Alice Johnson', role: 'UX Researcher', company: 'Meta', time: 'Connected yesterday' },
  { name: 'Ravi Shankar', role: 'Staff Engineer', company: 'Google', time: 'Connected 2d ago' },
  { name: 'Emily Davis', role: 'Senior PM', company: 'Microsoft', time: 'Connected 3d ago' },
  { name: 'Akash Patel', role: 'Design Lead', company: 'Swiggy', time: 'Connected 5d ago' },
  { name: 'Priya Menon', role: 'Founder', company: 'NexGen AI', time: 'Connected 1w ago' },
];

export default function ConnectionsScreen() {
  return (
    <ScreenShell
      bottomNav={<BottomNav active="people" />}
    >
      <div className={styles.content}>
        {/* Status bar spacer */}
        <div className={styles.statusBar} />

        <div className={styles.header}>
          <h1 className={styles.title}>Connections</h1>
          <p className={styles.subtitle}>5 people you've connected with</p>
        </div>

        {/* Search bar */}
        <div className={styles.searchWrap}>
          <div className={styles.searchBar}>
            <Icon name="search" size={20} color="var(--color-on-surface-variant)" />
            <span className={styles.searchPlaceholder}>Search connections...</span>
          </div>
        </div>

        {/* Connection list */}
        <div className={styles.list}>
          {CONNECTIONS.map((conn, i) => (
            <div key={conn.name} className={styles.connectionWrap}>
              <ConnectionItem
                name={conn.name}
                role={conn.role}
                company={conn.company}
                gradientIndex={i}
              />
              <span className={styles.time}>{conn.time}</span>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
