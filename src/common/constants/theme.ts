import { createTheme } from "@mui/material";
import { background, paper, primary, primaryLight } from "./colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      light: primaryLight,
    },
    background: {
      default: background,
      paper,
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
  components: { MuiTextField: { styleOverrides: {} } },
});
