import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0A4ABF" },
    secondary: { main: "#F6EB16" },
  },
  typography: {
    fontFamily: [
      'Nunito Sans', 'sans-serif'
    ].join(','),
  },
});

export default theme;