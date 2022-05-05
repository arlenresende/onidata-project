import { createTheme } from '@mui/material';

export const GlobalTheme = createTheme({
  typography: {
    fontFamily: ['Poppins'].join(','),
    fontSize: 12,
  },

  palette: {
    primary: {
      light: '#5582A1',
      main: '#5582A1',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#f4f4f4',
      contrastText: '#000',
    },
    background: {
      default: '#5582A1',
    },
  },
});
