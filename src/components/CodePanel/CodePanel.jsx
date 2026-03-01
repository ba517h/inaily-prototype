/**
 * CodePanel — Three-tab RN code preview panel.
 * Tab 1: Screen (screen CSS → RN StyleSheet)
 * Tab 2: Components (component CSS → RN, chip picker)
 * Tab 3: Theme (auto-generated token export)
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import Icon from '../Icon';
import { cssToRN } from '../../utils/cssToRN';
import { SCREEN_CSS_MAP, COMPONENT_CSS_MAP } from '../../utils/screenStyles';
import { generateThemeString } from '../../utils/themeExport';
import { highlightCode } from '../../utils/highlightCode';
import styles from './CodePanel.module.css';

const TABS = [
  { id: 'screen', label: 'Screen' },
  { id: 'components', label: 'Components' },
  { id: 'theme', label: 'Theme' },
];

export default function CodePanel({ screenId, specsMode }) {
  const [activeTab, setActiveTab] = useState('screen');
  const [activeComponent, setActiveComponent] = useState(null);
  const [copied, setCopied] = useState(false);

  // Screen data
  const screenData = SCREEN_CSS_MAP[screenId];
  const componentKeys = screenData?.components || Object.keys(COMPONENT_CSS_MAP);

  // Auto-switch to Components tab when in specs mode (no screen data)
  useEffect(() => {
    if (specsMode && activeTab === 'screen') {
      setActiveTab('components');
    }
  }, [specsMode, activeTab]);

  // Memoized code generation
  const screenCode = useMemo(() => {
    if (!screenData) return '// No CSS found for this screen';
    return cssToRN(screenData.css, screenData.label);
  }, [screenData]);

  const componentCode = useMemo(() => {
    const key = activeComponent || componentKeys[0];
    if (!key) return '// No components for this screen';
    const comp = COMPONENT_CSS_MAP[key];
    if (!comp) return `// Component "${key}" not found`;
    return cssToRN(comp.css, comp.label);
  }, [activeComponent, componentKeys]);

  const themeCode = useMemo(() => generateThemeString(), []);

  // Select the right code for the active tab
  const currentCode = activeTab === 'screen' ? screenCode
    : activeTab === 'components' ? componentCode
    : themeCode;

  const currentFileName = activeTab === 'screen' ? `${screenData?.label || 'Screen'}Styles.ts`
    : activeTab === 'components' ? `${COMPONENT_CSS_MAP[activeComponent || componentKeys[0]]?.label || 'Component'}Styles.ts`
    : 'theme.ts';

  // Highlighted HTML
  const highlightedHTML = useMemo(() => highlightCode(currentCode), [currentCode]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [currentCode]);

  // Reset component selection when screen changes
  const effectiveComponent = activeComponent && componentKeys.includes(activeComponent)
    ? activeComponent
    : componentKeys[0] || null;

  return (
    <div className={styles.panel}>
      {/* Tab bar */}
      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Component chip picker (only on Components tab) */}
      {activeTab === 'components' && componentKeys.length > 0 && (
        <div className={styles.chips}>
          {componentKeys.map(key => {
            const comp = COMPONENT_CSS_MAP[key];
            if (!comp) return null;
            const isActive = key === (effectiveComponent);
            return (
              <button
                key={key}
                className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
                onClick={() => setActiveComponent(key)}
              >
                {comp.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Code area */}
      <div className={styles.codeArea}>
        <div
          className={styles.codeBlock}
          dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        />
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.fileName}>{currentFileName}</span>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          <Icon name={copied ? 'check' : 'content_copy'} size={14} color="currentColor" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
