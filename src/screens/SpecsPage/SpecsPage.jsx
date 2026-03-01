import { useMemo } from 'react';
import {
  Button,
  SearchField,
  OutlinedField,
  AttendeeCard,
  IndustrySelector,
  ProfileRow,
  StatusBar,
} from '../../components';
import { colors, typography, spacing, radius } from '../../tokens/tokens';
import { parseSpecsFromCSS, SPEC_CARD_DEFS } from '../../utils/parseSpecsFromCSS';
import { ALL_CSS_SOURCES } from '../../utils/screenStyles';
import styles from './SpecsPage.module.css';

/* ── Helpers ── */

const COLOR_GROUPS = [
  { label: 'Primary', keys: ['primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer', 'primaryFixed', 'onPrimaryFixed', 'primaryFixedDim', 'inversePrimary'] },
  { label: 'Secondary', keys: ['secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer', 'secondaryFixed', 'onSecondaryFixed', 'secondaryFixedDim'] },
  { label: 'Tertiary', keys: ['tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer'] },
  { label: 'Error', keys: ['error', 'onError', 'errorContainer', 'onErrorContainer'] },
  { label: 'Success', keys: ['success', 'onSuccess', 'successContainer', 'onSuccessContainer'] },
  { label: 'Warning', keys: ['warning', 'onWarning', 'warningContainer', 'onWarningContainer'] },
  { label: 'Info', keys: ['info', 'onInfo', 'infoContainer', 'onInfoContainer'] },
  { label: 'Surface', keys: ['surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant', 'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest', 'surfaceDim', 'surfaceBright', 'surfaceTint'] },
  { label: 'Outline', keys: ['outline', 'outlineVariant'] },
  { label: 'Inverse', keys: ['inverseSurface', 'inverseOnSurface'] },
  { label: 'Utility', keys: ['shadow', 'scrim'] },
];

const TYPE_SCALES = Object.entries(typography);

const SPACING_ENTRIES = Object.entries(spacing);
const RADIUS_ENTRIES = Object.entries(radius);
const MAX_SPACING = Math.max(...Object.values(spacing));

function ColorColumn({ title, palette }) {
  return (
    <div className={styles.colorColumn}>
      <div className={styles.colorColumnTitle}>{title}</div>
      {COLOR_GROUPS.map(group => (
        <div key={group.label} className={styles.colorGroup}>
          <div className={styles.colorGroupLabel}>{group.label}</div>
          {group.keys.map(key => {
            const hex = palette[key];
            if (!hex) return null;
            return (
              <div key={key} className={styles.colorRow}>
                <div className={styles.colorSwatch} style={{ backgroundColor: hex }} />
                <span className={styles.colorName}>{key}</span>
                <span className={styles.colorHex}>{hex}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Spec Cards ── */

function SpecCard({ title, children }) {
  return (
    <div className={styles.specCard}>
      <div className={styles.specCardTitle}>{title}</div>
      <div className={styles.specContent}>{children}</div>
    </div>
  );
}

function SpecGroup({ title, lines }) {
  if (!lines || lines.length === 0) return null;
  return (
    <div className={styles.specGroup}>
      <div className={styles.specGroupTitle}>{title}</div>
      {lines.map((line, i) => (
        <div key={i} className={styles.specLine}>{line}</div>
      ))}
    </div>
  );
}

/* ── Live component previews (kept as JSX) ── */

const SPEC_PREVIEWS = {
  'Button': (
    <div className={styles.previewLight} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button variant="filled" label="Filled" />
      <Button variant="tonal" label="Tonal" />
      <Button variant="outlined" label="Outlined" />
      <Button variant="text" label="Text" />
      <Button variant="filled" label="Disabled" disabled />
      <Button variant="filled" label="Small" size="small" />
    </div>
  ),
  'SearchField': (
    <div className={styles.previewLight} style={{ width: 280 }}>
      <SearchField placeholder="Search attendees..." value="" />
    </div>
  ),
  'Outlined Text Field': (
    <div className={styles.previewLight} style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <OutlinedField label="Full Name" value="" />
      <OutlinedField label="Full Name" value="Mohammed" />
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
        <button style={{
          width: 88, height: 56,
          backgroundColor: 'var(--color-surface-container-lowest)',
          border: '1px solid var(--color-outline-variant)',
          borderRadius: 'var(--shape-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 6, cursor: 'pointer', padding: 0, flexShrink: 0,
          fontFamily: 'var(--type-body-medium-family)', fontSize: 15, fontWeight: 500,
          color: 'var(--color-on-surface)',
        }}>
          {'🇮🇳'} +91 ▾
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <OutlinedField label="Phone Number" value="98765" />
        </div>
      </div>
    </div>
  ),
  'AttendeeCard \u2014 Bio Variant': (
    <div className={styles.previewLight} style={{ width: 320 }}>
      <AttendeeCard
        variant="bio"
        bestMatch
        name="Mohammed Basith"
        role="Product Designer"
        company="Pickyourtrail"
        bio="Building Product Hunt Kerala community."
        tags={['Community', 'Product']}
        avatarUrl="https://i.pravatar.cc/300?img=11"
      />
    </div>
  ),
  'AttendeeCard \u2014 Relevance': (
    <div className={styles.previewLight} style={{ width: 320 }}>
      <AttendeeCard
        variant="relevance"
        name="Priya Menon"
        role="Founder"
        company="NexGen AI"
        avatarUrl="https://i.pravatar.cc/300?img=25"
        reasons={[
          { icon: 'interests', text: 'Shared interest in AI' },
          { icon: 'apartment', text: 'Same industry' },
        ]}
      />
    </div>
  ),
  'ChatRow': (
    <div className={styles.previewLight} style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 20px',
      }}>
        <img src="https://i.pravatar.cc/150?img=52" alt="" style={{
          width: 44, height: 44, borderRadius: 'var(--shape-full)',
          objectFit: 'cover', flexShrink: 0, marginTop: 2,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--type-title-medium-family)', fontSize: 15,
            fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.3,
          }}>Ravi Shankar</div>
          <div style={{
            fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
            color: 'var(--color-on-surface-variant)', lineHeight: 1.3, marginTop: 2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{'Staff Engineer · Google'}</div>
          <div style={{
            fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
            color: 'var(--color-on-surface-variant)', opacity: 0.75,
            lineHeight: 1.4, marginTop: 8,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>Thanks for the recommendation</div>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, marginTop: 2 }}>
          <span style={{
            fontFamily: 'var(--type-label-small-family)', fontSize: 13,
            fontWeight: 500, color: 'var(--color-on-surface-variant)', whiteSpace: 'nowrap',
          }}>1h</span>
        </div>
      </div>
    </div>
  ),
  'IndustrySelector': (
    <div className={styles.previewLight} style={{ width: 280 }}>
      <IndustrySelector
        options={['Edutech', 'Fintech', 'SaaS']}
        selected="Fintech"
      />
    </div>
  ),
  'Chat Bubble': (
    <div className={styles.previewLight} style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        alignSelf: 'flex-start', maxWidth: '75%',
        padding: '12px 16px', borderRadius: '20px 20px 20px 4px',
        backgroundColor: 'var(--color-surface-container)',
        color: 'var(--color-on-surface)',
        fontFamily: 'var(--font-plain)', fontSize: 14, lineHeight: '20px',
      }}>
        {'Hey! Great connecting 👋'}
      </div>
      <div style={{
        alignSelf: 'flex-end', maxWidth: '75%',
        padding: '12px 16px', borderRadius: '20px 20px 4px 20px',
        backgroundColor: 'var(--color-primary-container)',
        color: 'var(--color-on-primary-container)',
        fontFamily: 'var(--font-plain)', fontSize: 14, lineHeight: '20px',
      }}>
        Absolutely! That was great
      </div>
    </div>
  ),
  'ProfileRow': (
    <div className={styles.previewLight} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <ProfileRow icon="📍" label="Current City" value="Chennai" showDivider />
      <ProfileRow icon="🔗" label="Company URL" empty />
    </div>
  ),
  'Tag / Chip': (
    <div className={styles.previewLight} style={{ display: 'flex', gap: 8 }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '6px 14px', minHeight: 28,
        borderRadius: 'var(--shape-sm)',
        backgroundColor: 'var(--color-secondary-container)',
        color: 'var(--color-on-secondary-container)',
        fontFamily: 'var(--font-plain)', fontSize: 11, fontWeight: 500, letterSpacing: 0.5,
      }}>Community</span>
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '6px 14px', minHeight: 28,
        borderRadius: 'var(--shape-sm)',
        backgroundColor: 'var(--color-secondary-container)',
        color: 'var(--color-on-secondary-container)',
        fontFamily: 'var(--font-plain)', fontSize: 11, fontWeight: 500, letterSpacing: 0.5,
      }}>Product</span>
    </div>
  ),
  'StatusBar': (
    <div className={styles.previewLight} style={{ width: 375 }}>
      <StatusBar />
    </div>
  ),
  // BottomSheet and BottomNav have no preview (spec-only)
};

/* ── Main Component ── */

export default function SpecsPage() {
  // Pre-parse all spec card data from CSS
  const parsedSpecs = useMemo(() => {
    return SPEC_CARD_DEFS.map(def => {
      const source = ALL_CSS_SOURCES[def.source];
      if (!source) return { ...def, dimensions: [], tokens: [], states: [] };
      const parsed = parseSpecsFromCSS(source.css, def.classes);
      return { ...def, ...parsed };
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>Design Specs</div>
      <div className={styles.pageSubtitle}>
        Inaily Design System — M3 Expressive token reference & component specs for React Native handoff
      </div>

      {/* Section 1: Color Palette */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Color Palette</div>
        <div className={styles.colorColumns}>
          <ColorColumn title="Light Mode" palette={colors.light} />
          <ColorColumn title="Dark Mode" palette={colors.dark} />
        </div>
      </div>

      {/* Section 2: Typography Scale */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Typography Scale</div>
        <div className={styles.typeScale}>
          {TYPE_SCALES.map(([name, t]) => (
            <div key={name} className={styles.typeRow}>
              <div
                className={styles.typeSample}
                style={{
                  fontFamily: `var(--font-${t.fontFamily === 'Bricolage Grotesque' ? 'brand' : 'plain'})`,
                  fontSize: t.fontSize,
                  lineHeight: `${t.lineHeight}px`,
                  fontWeight: t.fontWeightEmphasized || t.fontWeight,
                  letterSpacing: t.letterSpacing,
                }}
              >
                {name} — The quick brown fox
              </div>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaLine}>
                  <span className={styles.typeMetaLabel}>size</span>{t.fontSize}
                  <span className={styles.typeMetaLabel}> / lh</span>{t.lineHeight}
                  <span className={styles.typeMetaLabel}> / wt</span>{t.fontWeight}
                </span>
                <span className={styles.typeMetaLine}>
                  <span className={styles.typeMetaLabel}>ls</span>{t.letterSpacing}
                  <span className={styles.typeMetaLabel}> family</span>{t.fontFamily === 'Bricolage Grotesque' ? 'brand' : 'plain'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Spacing & Radius */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Spacing & Radius</div>
        <div className={styles.spacingRadiusGrid}>
          <div className={styles.subSection}>
            <div className={styles.subSectionTitle}>Spacing</div>
            {SPACING_ENTRIES.map(([name, value]) => (
              <div key={name} className={styles.spacingRow}>
                <span className={styles.spacingLabel}>{name}</span>
                <div
                  className={styles.spacingBar}
                  style={{ width: `${(value / MAX_SPACING) * 100}%` }}
                />
                <span className={styles.spacingValue}>{value}</span>
              </div>
            ))}
          </div>
          <div className={styles.subSection}>
            <div className={styles.subSectionTitle}>Border Radius</div>
            <div className={styles.radiusGrid}>
              {RADIUS_ENTRIES.map(([name, value]) => (
                <div key={name} className={styles.radiusItem}>
                  <div
                    className={styles.radiusBox}
                    style={{ borderRadius: Math.min(value, 20) }}
                  />
                  <span className={styles.radiusLabel}>{name}<br />{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Component Specs — Auto-parsed from CSS */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Component Specs</div>
        <div className={styles.specCards}>
          {parsedSpecs.map((spec, i) => {
            const preview = SPEC_PREVIEWS[spec.title];
            return (
              <SpecCard key={i} title={spec.title}>
                {preview && (
                  <div className={styles.specPreview}>
                    {preview}
                  </div>
                )}
                <div className={styles.specDetails}>
                  <SpecGroup title="Dimensions" lines={spec.dimensions} />
                  <SpecGroup title="Tokens" lines={spec.tokens} />
                  <SpecGroup title="States" lines={spec.states} />
                </div>
              </SpecCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
