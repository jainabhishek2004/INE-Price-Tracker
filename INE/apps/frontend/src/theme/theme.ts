import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme } from '@mui/material/styles';

const light = {
  background: { default: '#F3F4F6', paper: '#FFFFFF' },
  text: { primary: '#111111', secondary: '#5F6368' },
  divider: '#E5E7EB',
  primary: { main: '#111111' },
  secondary: { main: '#374151' },
  success: { main: '#16A34A' },
  warning: { main: '#D97706' },
  error: { main: '#DC2626' },
};

const dark = {
  background: { default: '#111111', paper: '#1A1A1A' },
  text: { primary: '#F5F5F5', secondary: '#B3B3B3' },
  divider: '#2D2D2D',
  primary: { main: '#FFFFFF' },
  secondary: { main: '#D4D4D4' },
  success: { main: '#4ADE80' },
  warning: { main: '#FBBF24' },
  error: { main: '#F87171' },
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-color-scheme' },
  colorSchemes: { light: { palette: light }, dark: { palette: dark } },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", sans-serif',
    fontSize: 14,
    h1: { fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.2 },
    h2: { fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontSize: '1.0625rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontSize: '0.9375rem', fontWeight: 700 },
    subtitle1: { fontSize: '0.9375rem', lineHeight: 1.5, fontWeight: 500 },
    subtitle2: { fontSize: '0.8125rem', fontWeight: 600 },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
          fontFeatureSettings: '"cv11", "ss01"',
          background: '#F5F5F4',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: 'none', borderColor: '#E5E7EB' } },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundColor: '#F5F5F4', borderColor: '#E5E7EB' } },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 14, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingInline: 14, boxShadow: 'none' } },
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiListItemButton: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 10, backgroundColor: '#FFFFFF' } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: { tooltip: { fontSize: '0.75rem' } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, borderColor: '#E5E7EB' } },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600, minHeight: 44 } },
    },
  },
});

export const monospace = { fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: '0.75rem' };
