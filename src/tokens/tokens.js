/**
 * Inaily Design System — React Native Token Export
 *
 * All values extracted verbatim from the CSS token files.
 * Numeric values only (no "px"), camelCase keys, actual hex values.
 */

export const fonts = {
  brand: 'Bricolage Grotesque',
  plain: 'Inter',
};

export const colors = {
  light: {
    // Primary
    primary: '#68548E',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EBDDFF',
    onPrimaryContainer: '#231047',
    primaryFixed: '#EBDDFF',
    onPrimaryFixed: '#231047',
    primaryFixedDim: '#D3BCFD',
    inversePrimary: '#D3BCFD',

    // Secondary
    secondary: '#635B70',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E9DEF8',
    onSecondaryContainer: '#1F182B',
    secondaryFixed: '#E9DEF8',
    onSecondaryFixed: '#1F182B',
    secondaryFixedDim: '#CDC2DB',

    // Tertiary
    tertiary: '#7E525E',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFDAD0',
    onTertiaryContainer: '#31101B',

    // Error
    error: '#C62857',
    onError: '#FFFFFF',
    errorContainer: '#FFD9E2',
    onErrorContainer: '#3B0A1A',

    // Success
    success: '#00796B',
    onSuccess: '#FFFFFF',
    successContainer: '#B2DFDB',
    onSuccessContainer: '#004D40',

    // Warning
    warning: '#7C5800',
    onWarning: '#FFFFFF',
    warningContainer: '#FFDEA6',
    onWarningContainer: '#271900',

    // Info
    info: '#005FAF',
    onInfo: '#FFFFFF',
    infoContainer: '#D4E3FF',
    onInfoContainer: '#001B3D',

    // Surfaces
    surface: '#FEF7FF',
    onSurface: '#1D1B20',
    surfaceVariant: '#E7E0EB',
    onSurfaceVariant: '#49454E',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F5EDF7',
    surfaceContainer: '#EDE5F0',
    surfaceContainerHigh: '#E4DCE8',
    surfaceContainerHighest: '#DBD3E0',
    surfaceDim: '#DED8E0',
    surfaceBright: '#FEF7FF',
    surfaceTint: '#68548E',

    // Outline
    outline: '#7A757F',
    outlineVariant: '#CBC4CF',

    // Inverse
    inverseSurface: '#322F35',
    inverseOnSurface: '#F5EFF7',

    // Utility
    shadow: '#000000',
    scrim: '#000000',
  },

  dark: {
    // Primary
    primary: '#D3BCFD',
    onPrimary: '#381E72',
    primaryContainer: '#4F378A',
    onPrimaryContainer: '#EBDDFF',
    primaryFixed: '#EBDDFF',
    onPrimaryFixed: '#231047',
    primaryFixedDim: '#D3BCFD',
    inversePrimary: '#68548E',

    // Secondary
    secondary: '#CCC2DB',
    onSecondary: '#332D41',
    secondaryContainer: '#4A4458',
    onSecondaryContainer: '#E9DEF8',
    secondaryFixed: '#E9DEF8',
    onSecondaryFixed: '#1F182B',
    secondaryFixedDim: '#CDC2DB',

    // Tertiary
    tertiary: '#EFB8C8',
    onTertiary: '#4A2531',
    tertiaryContainer: '#633B48',
    onTertiaryContainer: '#FFD8E4',

    // Error
    error: '#FFB1C8',
    onError: '#601410',
    errorContainer: '#5D1133',
    onErrorContainer: '#FFD9E2',

    // Success
    success: '#4DB6AC',
    onSuccess: '#0B3900',
    successContainer: '#1A3A36',
    onSuccessContainer: '#B2DFDB',

    // Warning
    warning: '#F5BF48',
    onWarning: '#422C00',
    warningContainer: '#5E4100',
    onWarningContainer: '#FFDEA6',

    // Info
    info: '#A5C8FF',
    onInfo: '#003063',
    infoContainer: '#00468C',
    onInfoContainer: '#D4E3FF',

    // Surfaces
    surface: '#141218',
    onSurface: '#E6E0E9',
    surfaceVariant: '#49454F',
    onSurfaceVariant: '#CAC4D0',
    surfaceContainerLowest: '#0F0D13',
    surfaceContainerLow: '#1D1B20',
    surfaceContainer: '#211F26',
    surfaceContainerHigh: '#2B2930',
    surfaceContainerHighest: '#36343B',
    surfaceDim: '#141218',
    surfaceBright: '#3B383E',
    surfaceTint: '#D3BCFD',

    // Outline
    outline: '#948F99',
    outlineVariant: '#49454F',

    // Inverse
    inverseSurface: '#E6E0E9',
    inverseOnSurface: '#322F35',

    // Utility
    shadow: '#000000',
    scrim: '#000000',
  },
};

export const typography = {
  displayLarge: {
    fontFamily: fonts.brand,
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    fontWeightEmphasized: '800',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: fonts.brand,
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    fontWeightEmphasized: '800',
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: fonts.brand,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    fontWeightEmphasized: '700',
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: fonts.brand,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    fontWeightEmphasized: '700',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: fonts.brand,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    fontWeightEmphasized: '700',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: fonts.brand,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    fontWeightEmphasized: '700',
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: fonts.brand,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    fontWeightEmphasized: '700',
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fonts.brand,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontWeightSemiEmphasized: '600',
    fontWeightEmphasized: '700',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: fonts.plain,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontWeightEmphasized: '700',
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontFamily: fonts.plain,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontWeightEmphasized: '600',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: fonts.plain,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    fontWeightEmphasized: '700',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: fonts.plain,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    fontWeightEmphasized: '700',
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontFamily: fonts.plain,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontWeightEmphasized: '500',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: fonts.plain,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontWeightEmphasized: '500',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: fonts.plain,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    fontWeightEmphasized: '500',
    letterSpacing: 0.4,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
  xxxxxl: 64,
};

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  lgIncreased: 20,
  xl: 28,
  xlIncreased: 32,
  xxl: 48,
  full: 999,
};

export const motion = {
  duration: {
    short1: 50,
    short2: 100,
    short3: 150,
    short4: 200,
    medium1: 250,
    medium2: 300,
    medium3: 350,
    medium4: 400,
    long1: 450,
    long2: 500,
    extraLong1: 700,
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
    standardDecel: 'cubic-bezier(0, 0, 0, 1)',
    standardAccel: 'cubic-bezier(0.3, 0, 1, 1)',
    emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
    emphasizedDecel: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
    emphasizedAccel: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
    expressiveSpatialFast: 'cubic-bezier(0.42, 1.85, 0.21, 0.90)',
    expressiveSpatial: 'cubic-bezier(0.38, 1.21, 0.22, 1.00)',
    expressiveEffects: 'cubic-bezier(0.31, 0.94, 0.34, 1.00)',
  },
};

export const elevation = {
  level0: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  level3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const opacity = {
  disabledBg: 0.12,
  disabledText: 0.38,
  hover: 0.08,
  pressed: 0.12,
  focus: 0.12,
};
