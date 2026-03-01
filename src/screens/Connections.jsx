import { useState } from 'react';
import { ScreenShell, ConnectionItem, StatusBar, SearchField, BottomNav } from '../components';
import styles from './Connections.module.css';

const CONNECTIONS = [
  { name: 'Alice Johnson', role: 'UX Researcher', company: 'Meta', time: 'yesterday', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Ravi Shankar Krishnamurthy', role: 'Staff Engineer', company: 'Google DeepMind', time: '2d ago', avatarUrl: 'https://i.pravatar.cc/150?img=52' },
  { name: 'Emily Davis', role: 'Senior PM', company: 'Microsoft', time: '3d ago', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Mohammed Basith Kamaludeen', role: 'Sr. Product Designer', company: 'Pickyourtrail', time: '5d ago', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Priya Menon', role: 'Founder', company: 'NexGen AI', time: '1w ago', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
];

export default function ConnectionsScreen() {
  const [query, setQuery] = useState('');

  const filtered = CONNECTIONS.filter((conn) => {
    const q = query.toLowerCase();
    return (
      conn.name.toLowerCase().includes(q) ||
      conn.role.toLowerCase().includes(q) ||
      conn.company.toLowerCase().includes(q)
    );
  });

  return (
    <ScreenShell bottomNav={<BottomNav active="people" />}>
      <div className={styles.content}>
        <StatusBar />

        <div className={styles.header}>
          <h1 className={styles.title}>Connections</h1>
          <p className={styles.subtitle}>{filtered.length} people you've connected with</p>
        </div>

        <div className={styles.searchWrap}>
          <SearchField
            placeholder="Search connections..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className={styles.list}>
          {filtered.map((conn, i) => (
            <div key={conn.name} className={styles.connectionItem} style={{ animationDelay: `${120 + i * 50}ms` }}>
              <ConnectionItem
                name={conn.name}
                role={conn.role}
                company={conn.company}
                avatarUrl={conn.avatarUrl}
                time={conn.time}
              />
              {i < filtered.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
