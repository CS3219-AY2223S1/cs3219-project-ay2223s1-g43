import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#39e9bc',
      main: '#08e4ac',
      dark: '#059f78',
      contrastText: '#ffffff',
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