/**
 * Raw CSS imports registry — single source of truth for all CSS modules.
 * Uses Vite ?raw suffix to import CSS as strings (built-in, zero config).
 */

// ── Screen CSS ──
import myEventsCSS from '../screens/MyEvents.module.css?raw';
import feedCSS from '../screens/Feed.module.css?raw';
import phoneEntryCSS from '../screens/PhoneEntry.module.css?raw';
import otpScreenCSS from '../screens/OTPScreen.module.css?raw';
import industrySelectCSS from '../screens/IndustrySelect.module.css?raw';
import networkingBioCSS from '../screens/NetworkingBio.module.css?raw';
import chatListCSS from '../screens/ChatList.module.css?raw';
import chatConversationCSS from '../screens/ChatConversation.module.css?raw';
import profileCSS from '../screens/Profile.module.css?raw';

// ── Component CSS ──
import buttonCSS from '../components/Button.module.css?raw';
import searchFieldCSS from '../components/SearchField/SearchField.module.css?raw';
import outlinedFieldCSS from '../components/OutlinedField/OutlinedField.module.css?raw';
import attendeeCardCSS from '../components/AttendeeCard.module.css?raw';
import industrySelectorCSS from '../components/IndustrySelector.module.css?raw';
import profileRowCSS from '../components/ProfileRow.module.css?raw';
import statusBarCSS from '../components/StatusBar.module.css?raw';
import bottomSheetCSS from '../components/BottomSheet.module.css?raw';
import bottomNavCSS from '../components/BottomNav.module.css?raw';
import otpInputCSS from '../components/OTPInput.module.css?raw';
import exampleCardCSS from '../components/ExampleCard.module.css?raw';
import filledInputCSS from '../components/FilledInput.module.css?raw';
import connectionItemCSS from '../components/ConnectionItem.module.css?raw';
import topAppBarCSS from '../components/TopAppBar.module.css?raw';
import screenShellCSS from '../components/ScreenShell.module.css?raw';
import onboardingShellCSS from '../components/OnboardingShell.module.css?raw';
import stepProgressCSS from '../components/StepProgress.module.css?raw';
import pBarCSS from '../components/PBar/PBar.module.css?raw';

// Screen CSS map — used by CodePanel "Screen" tab
export const SCREEN_CSS_MAP = {
  myEvents:     { label: 'MyEvents',         css: myEventsCSS,         components: ['button', 'bottomSheet', 'outlinedField', 'bottomNav', 'statusBar'] },
  attendees:    { label: 'Feed',             css: feedCSS,             components: ['attendeeCard', 'searchField', 'bottomNav', 'statusBar'] },
  phone:        { label: 'PhoneEntry',       css: phoneEntryCSS,       components: ['outlinedField', 'button', 'statusBar', 'stepProgress'] },
  otp:          { label: 'OTPScreen',        css: otpScreenCSS,        components: ['otpInput', 'button', 'statusBar', 'stepProgress'] },
  industry:     { label: 'IndustrySelect',   css: industrySelectCSS,   components: ['industrySelector', 'button', 'searchField', 'statusBar', 'stepProgress'] },
  networking:   { label: 'NetworkingBio',    css: networkingBioCSS,    components: ['outlinedField', 'exampleCard', 'button', 'statusBar', 'stepProgress'] },
  chat:         { label: 'ChatList',         css: chatListCSS,         components: ['searchField', 'button', 'bottomSheet', 'bottomNav', 'statusBar'] },
  chatDetail:   { label: 'ChatConversation', css: chatConversationCSS, components: ['statusBar'] },
  requestChat:  { label: 'ChatConversation', css: chatConversationCSS, components: ['statusBar'] },
  requestSent:  { label: 'ChatConversation', css: chatConversationCSS, components: ['statusBar'] },
  acceptedChat: { label: 'ChatConversation', css: chatConversationCSS, components: ['statusBar'] },
  profile:      { label: 'Profile',          css: profileCSS,          components: ['profileRow', 'button', 'bottomNav', 'statusBar'] },
};

// Component CSS map — used by CodePanel "Components" tab + SpecsPage
export const COMPONENT_CSS_MAP = {
  button:           { label: 'Button',           css: buttonCSS },
  searchField:      { label: 'SearchField',      css: searchFieldCSS },
  outlinedField:    { label: 'OutlinedField',    css: outlinedFieldCSS },
  attendeeCard:     { label: 'AttendeeCard',     css: attendeeCardCSS },
  industrySelector: { label: 'IndustrySelector', css: industrySelectorCSS },
  profileRow:       { label: 'ProfileRow',       css: profileRowCSS },
  statusBar:        { label: 'StatusBar',        css: statusBarCSS },
  bottomSheet:      { label: 'BottomSheet',      css: bottomSheetCSS },
  bottomNav:        { label: 'BottomNav',        css: bottomNavCSS },
  otpInput:         { label: 'OTPInput',         css: otpInputCSS },
  exampleCard:      { label: 'ExampleCard',      css: exampleCardCSS },
  filledInput:      { label: 'FilledInput',      css: filledInputCSS },
  connectionItem:   { label: 'ConnectionItem',   css: connectionItemCSS },
  topAppBar:        { label: 'TopAppBar',        css: topAppBarCSS },
  screenShell:      { label: 'ScreenShell',      css: screenShellCSS },
  onboardingShell:  { label: 'OnboardingShell',  css: onboardingShellCSS },
  stepProgress:     { label: 'StepProgress',     css: stepProgressCSS },
  pBar:             { label: 'PBar',             css: pBarCSS },
};

// Unified map for SpecsPage (component CSS + screen CSS that contains component-level specs)
export const ALL_CSS_SOURCES = {
  ...COMPONENT_CSS_MAP,
  chatList:         { label: 'ChatList',         css: chatListCSS },
  chatConversation: { label: 'ChatConversation', css: chatConversationCSS },
};
