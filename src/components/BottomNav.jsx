import Icon from './Icon';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { id: 'attendees', icon: 'person_search', label: 'Attendees' },
  { id: 'chat', icon: 'chat_bubble', label: 'Chat' },
  { id: 'profile', icon: 'person', label: 'Profile' },
];

/**
 * M3 Expressive Bottom Navigation
 *
 * Props:
 * - active: 'attendees' | 'chat' | 'profile'
 * - onChange: (id: string) => void
 */
export default function BottomNav({ active = 'attendees', onChange }) {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => onChange?.(item.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={styles.pill}>
              <Icon
                name={item.icon}
                size={24}
                fill={isActive}
                color={isActive ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)'}
              />
            </div>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
