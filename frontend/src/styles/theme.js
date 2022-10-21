import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#39e9bc',
      main: '#08e4ac',
      dark: '#065c46',
      contrastText: '#000000',
    },
    secondary: {
      light: '#b2a852',
      main: '#fff176',
      dark: '#b2a852',
      contrastText: '#ffffff',
    },
    background: {
      default: "#171717",
    }
  },
  typography: {
    fontFamily: ["Rubik, sans-serif"]
  }
});

export default theme;