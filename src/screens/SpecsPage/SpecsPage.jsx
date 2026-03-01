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
  return (
    <div className={styles.specGroup}>
      <div className={styles.specGroupTitle}>{title}</div>
      {lines.map((line, i) => (
        <div key={i} className={styles.specLine}>{line}</div>
      ))}
    </div>
  );
}

/* ── Main Component ── */

export default function SpecsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>Design Specs</div>
      <div className={styles.pageSubtitle}>
        Inaily Design System — M3 Expressive token reference & component specs for React Native handoff
      </div>

      {/* ────── Section 1: Color Palette ────── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Color Palette</div>
        <div className={styles.colorColumns}>
          <ColorColumn title="Light Mode" palette={colors.light} />
          <ColorColumn title="Dark Mode" palette={colors.dark} />
        </div>
      </div>

      {/* ────── Section 2: Typography Scale ────── */}
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

      {/* ────── Section 3: Spacing & Radius ────── */}
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

      {/* ────── Section 4: Component Specs ────── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Component Specs</div>
        <div className={styles.specCards}>

          {/* 1. Buttons */}
          <SpecCard title="Button">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button variant="filled" label="Filled" />
                <Button variant="tonal" label="Tonal" />
                <Button variant="outlined" label="Outlined" />
                <Button variant="text" label="Text" />
                <Button variant="filled" label="Disabled" disabled />
                <Button variant="filled" label="Small" size="small" />
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Default height: 56px (CTA), Small: 40px',
                'Horizontal padding: 24px (default), 16px (small)',
                'Border radius: shape-full (999px)',
                'Min-width: none (intrinsic)',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Filled bg: primary → text: onPrimary',
                'Tonal bg: secondaryContainer → text: onSecondaryContainer',
                'Outlined: 1.5px outlineVariant border → text: primary',
                'Text: transparent → text: primary',
                'Disabled: onSurface @ 12% bg, 38% text',
              ]} />
              <SpecGroup title="States" lines={[
                'Press: scale(0.97) with 150ms spring ease',
                'Font: label-large (14px, weight 600 label-large-weight-emphasized)',
                'fullWidth: width: 100%',
              ]} />
            </div>
          </SpecCard>

          {/* 2. SearchField */}
          <SpecCard title="SearchField">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 280 }}>
                <SearchField placeholder="Search attendees..." value="" />
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Height: 44px',
                'Border radius: shape-full (999px)',
                'Padding: 0 16px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Background: surfaceContainerHigh',
                'Text: onSurface',
                'Placeholder: onSurfaceVariant',
                'Icon: onSurfaceVariant (20px)',
              ]} />
              <SpecGroup title="States" lines={[
                'Clear button appears when value is non-empty',
                'Focus shadow: 0 2px 12px primary@15%',
              ]} />
            </div>
          </SpecCard>

          {/* 3. Outlined Text Field */}
          <SpecCard title="Outlined Text Field">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <OutlinedField label="Full Name" value="" />
                <OutlinedField label="Full Name" value="Mohammed" />
                {/* Phone entry layout — ISD picker + field row */}
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
                    🇮🇳 +91 ▾
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <OutlinedField label="Phone Number" value="98765" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Min-height: 56px',
                'Border radius: shape-md (12px)',
                'Input padding: 16px horizontal, 20px top, 12px bottom',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Background: surfaceContainerLowest',
                'Border idle: outlineVariant (1px)',
                'Border focused: primary (2px)',
                'Label resting: bodyLarge, onSurfaceVariant',
                'Label floating: bodySmall, primary — scale transition',
                'Input text: bodyLarge, onSurface',
              ]} />
              <SpecGroup title="States" lines={[
                'Idle: label centered, 1px outlineVariant border',
                'Hover: border changes to onSurface',
                'Focused: 2px primary border, label floats + becomes primary',
                'Disabled: 0.38 opacity, cursor not-allowed',
                'Prefix: rendered left with expand_more icon + divider',
              ]} />
              <SpecGroup title="Phone Layout" lines={[
                'Row: display flex, gap 10px, align-items stretch',
                'ISD picker: 88×56px, shape-md radius, surfaceContainerLowest bg, outlineVariant border',
                'Phone field: flex 1, OutlinedField with label "Phone Number"',
              ]} />
            </div>
          </SpecCard>

          {/* 4. AttendeeCard — Bio */}
          <SpecCard title="AttendeeCard — Bio Variant">
            <div className={styles.specPreview}>
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
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Card radius: shape-lg (16px)',
                'Photo area: full width, 180px height',
                'Content padding: 16px',
                'Action buttons: small size (40px height)',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Card bg: surfaceContainerLowest',
                'Card border: 1px outlineVariant',
                'Best Match badge: tertiaryContainer bg, onTertiaryContainer text',
                'Name: titleMedium emphasized (700)',
                'Role: 13px, onSurfaceVariant',
                'Bio: 13px, onSurface',
                'Tags: labelSmall, primary@8% bg, onSurfaceVariant text',
              ]} />
              <SpecGroup title="Actions (by chatMode)" lines={[
                'Profile: outlined small button (always)',
                'open: filled small "Chat" with chat_bubble icon',
                'request: tonal small "Request" with lock icon',
                'off: outlined small "Unavailable" disabled',
              ]} />
            </div>
          </SpecCard>

          {/* 5. AttendeeCard — Relevance */}
          <SpecCard title="AttendeeCard — Relevance Variant">
            <div className={styles.specPreview}>
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
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Layout" lines={[
                'Same card structure as bio variant',
                'Replaces bio+tags with reason rows',
                'Each reason: 18px filled icon (primary) + 13px text',
                'Reason row gap: 8px vertical',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Reason icon: primary color, filled',
                'Reason text: 13px, onSurface',
              ]} />
            </div>
          </SpecCard>

          {/* 6. ChatRow */}
          <SpecCard title="ChatRow">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* Message row */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 20px',
                }}>
                  <img src="https://i.pravatar.cc/150?img=52" alt="" style={{
                    width: 44, height: 44, borderRadius: 'var(--shape-full)',
                    objectFit: 'cover', flexShrink: 0, marginTop: 2,
                  }} />
                  <div style={{
                    flex: 1, minWidth: 0,
                    borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent)',
                    paddingBottom: 14,
                  }}>
                    <div style={{
                      fontFamily: 'var(--type-title-medium-family)', fontSize: 15,
                      fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.3,
                    }}>Ravi Shankar</div>
                    <div style={{
                      fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
                      color: 'var(--color-on-surface-variant)', lineHeight: 1.3, marginTop: 2,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>Staff Engineer · Google</div>
                    <div style={{
                      fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
                      color: 'var(--color-on-surface-variant)', opacity: 0.75,
                      lineHeight: 1.4, marginTop: 8,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>Thanks for the recommendation</div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, marginTop: 2 }}>
                    <span style={{
                      fontFamily: 'var(--type-label-small-family)', fontSize: 'var(--type-label-small-size)',
                      color: 'var(--color-on-surface-variant)', whiteSpace: 'nowrap',
                    }}>1h</span>
                    <span style={{ fontSize: 18, color: 'var(--color-on-surface-variant)', opacity: 0.4 }}>›</span>
                  </div>
                </div>
                {/* Request row */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 20px',
                }}>
                  <img src="https://i.pravatar.cc/150?img=11" alt="" style={{
                    width: 44, height: 44, borderRadius: 'var(--shape-full)',
                    objectFit: 'cover', flexShrink: 0, marginTop: 2,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--type-title-medium-family)', fontSize: 15,
                      fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.3,
                    }}>Mohammed Basith</div>
                    <div style={{
                      fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
                      color: 'var(--color-on-surface-variant)', lineHeight: 1.3, marginTop: 2,
                    }}>Product Designer · Pickyourtrail</div>
                    <div style={{
                      fontFamily: 'var(--type-body-medium-family)', fontSize: 13,
                      color: 'var(--color-on-surface-variant)', opacity: 0.75,
                      lineHeight: 1.4, marginTop: 8,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>"Hey! Loved your talk on design systems"</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button style={{
                        padding: '8px 24px', borderRadius: 20,
                        backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)',
                        border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--type-label-large-family)', fontSize: 'var(--type-label-medium-size)',
                        fontWeight: 600,
                      }}>Accept</button>
                      <button style={{
                        padding: '8px 24px', borderRadius: 20,
                        background: 'transparent', color: 'var(--color-on-surface-variant)',
                        border: '1px solid var(--color-outline-variant)', cursor: 'pointer',
                        fontFamily: 'var(--type-label-large-family)', fontSize: 'var(--type-label-medium-size)',
                        fontWeight: 500,
                      }}>Decline</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Row padding: 14px 20px',
                'Avatar: 44px circle',
                'Gap: 12px',
                'Border-bottom: 1px outlineVariant @ 50%, starts at text column (not full width)',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Background: transparent (hover: surfaceContainerLow)',
                'Name: title-medium family, 15px, weight 600',
                'Designation: body-medium family, 13px, onSurfaceVariant',
                'Message: 13px, onSurfaceVariant @ 75% opacity, margin-top 8px',
                'Time: label-small, onSurfaceVariant',
                'Chevron: 18px, onSurfaceVariant @ 40% opacity',
              ]} />
              <SpecGroup title="Request variant" lines={[
                'Message: 2-line clamp (no single-line truncation)',
                'Accept btn: 8px 24px, 20px radius, primary bg, weight 600',
                'Decline btn: 8px 24px, 20px radius, outlined, weight 500',
                'Button press: scale(0.95)',
              ]} />
            </div>
          </SpecCard>

          {/* 7. IndustrySelector */}
          <SpecCard title="IndustrySelector">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 280 }}>
                <IndustrySelector
                  options={['Edutech', 'Fintech', 'SaaS']}
                  selected="Fintech"
                />
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Item height: auto (padding 16px 20px)',
                'Item radius: shape-lg-increased (20px)',
                'Radio dot: 22px outer, 10px inner',
                'Gap between items: 8px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Unselected: surfaceContainerLowest bg, outlineVariant border',
                'Selected: primary bg, transparent border, shadow',
                'Press: scale(0.98)',
                'Radio unselected: 2px outline border',
                'Radio selected: transparent border, onPrimary bg',
                'Radio inner: primary dot (scale 0→1 on select)',
                'Label: bodyLarge (16px, 400), selected: emphasized (600), onPrimary text',
              ]} />
            </div>
          </SpecCard>

          {/* 8. Chat Bubble */}
          <SpecCard title="Chat Bubble">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 20px 4px',
                  backgroundColor: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface)',
                  fontFamily: 'var(--font-plain)',
                  fontSize: 14,
                  lineHeight: '20px',
                }}>
                  Hey! Great connecting 👋
                </div>
                <div style={{
                  alignSelf: 'flex-end',
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 4px 20px',
                  backgroundColor: 'var(--color-primary-container)',
                  color: 'var(--color-on-primary-container)',
                  fontFamily: 'var(--font-plain)',
                  fontSize: 14,
                  lineHeight: '20px',
                }}>
                  Absolutely! That was great
                </div>
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Max width: 75% of container',
                'Padding: 12px 16px',
                'Gap between bubbles: 8px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Incoming: surfaceContainer bg, onSurface text',
                'Incoming radius: 20px 20px 20px 4px (sharp bottom-left)',
                'Outgoing: primaryContainer bg, onPrimaryContainer text',
                'Outgoing radius: 20px 20px 4px 20px (sharp bottom-right)',
                'Font: bodyMedium (14px, 400)',
              ]} />
            </div>
          </SpecCard>

          {/* 9. ProfileRow */}
          <SpecCard title="ProfileRow">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 0 }}>
                <ProfileRow icon="📍" label="Current City" value="Chennai" showDivider />
                <ProfileRow icon="🔗" label="Company URL" empty />
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Row padding: 12px 0',
                'Icon box: 36px, bg: primaryContainer, radius: shape-sm (8px)',
                'Gap: 12px',
                'Divider: 1px outlineVariant @ 40%, margin-left: 52px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Label: labelLarge family, labelMedium size (12px), weight 600, onSurfaceVariant',
                'Value: bodyLarge family, bodyMedium size, onSurface',
                'Empty: "Not Added" in onSurfaceVariant',
                'Add button: tonal small',
              ]} />
            </div>
          </SpecCard>

          {/* 10. Tag/Chip */}
          <SpecCard title="Tag / Chip">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ display: 'flex', gap: 8 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  minHeight: 28,
                  borderRadius: 'var(--shape-sm)',
                  backgroundColor: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-container)',
                  fontFamily: 'var(--font-plain)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}>Community</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  minHeight: 28,
                  borderRadius: 'var(--shape-sm)',
                  backgroundColor: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-container)',
                  fontFamily: 'var(--font-plain)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}>Product</span>
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Padding: 6px 14px',
                'Border radius: shape-sm (8px)',
                'Min-height: 28px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Background: secondaryContainer',
                'Text: onSecondaryContainer',
                'Font: labelSmall (11px, weight 500)',
                'Letter spacing: 0.5px',
              ]} />
            </div>
          </SpecCard>

          {/* 11. StatusBar */}
          <SpecCard title="StatusBar">
            <div className={styles.specPreview}>
              <div className={styles.previewLight} style={{ width: 375 }}>
                <StatusBar />
              </div>
            </div>
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Height: 50px (with Dynamic Island safe area)',
                'Padding: 14px 24px 0',
                'Full width, fixed top',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Light variant: onSurface text',
                'Dark variant: white text',
                'Time: 15px, semibold',
                'Icons: signal bars, wifi, battery (SVG)',
              ]} />
            </div>
          </SpecCard>

          {/* 12. BottomSheet */}
          <SpecCard title="BottomSheet">
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Sheet radius: 28px 28px 0 0',
                'Handle: 32×4px centered',
                'Body padding: 12px 24px 32px',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Sheet bg: surfaceContainerLow',
                'Handle: outlineVariant',
                'Overlay: rgba(0, 0, 0, 0.32)',
                'Title: 18px / 700 weight',
              ]} />
              <SpecGroup title="Animation" lines={[
                'Slide up: 250ms cubic-bezier(0.2, 0, 0, 1)',
              ]} />
            </div>
          </SpecCard>

          {/* 13. BottomNav */}
          <SpecCard title="BottomNav">
            <div className={styles.specDetails}>
              <SpecGroup title="Dimensions" lines={[
                'Nav height: 76px',
                'Active pill: 56×30px',
                'Tabs: 3 (Explore, People, Chat)',
              ]} />
              <SpecGroup title="Tokens" lines={[
                'Nav bg: surfaceContainer',
                'Inactive icon: onSurfaceVariant',
                'Active icon: onPrimaryContainer',
                'Active pill: primaryContainer bg',
                'Label: labelMedium',
              ]} />
              <SpecGroup title="States" lines={[
                'Active: fills pill + bolds label',
                'Press: scale(0.95)',
              ]} />
            </div>
          </SpecCard>

        </div>
      </div>
    </div>
  );
}
