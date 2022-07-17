import { createTheme } from '@mui/material/styles';
import { paletteColors } from './VariablesGlobal';
import { StyleButton } from './style/StyleButton';
import { StyleTypography } from './style/StyleTypography';
import "../../../App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: paletteColors.primary,
      dark: "#324C79",
      contrastText: '#fff',
    },
    secondary: {  
      main: paletteColors.secondary
    },
    third: {
      main: paletteColors.third
    },
    tonalOffset: 0.2,
  },
  typography: StyleTypography,
  components: {
    MuiButton: {
      variants: StyleButton,
    },
    MuiIconButton: {
      variants: StyleButton,
    },
  },
});

export { theme };
