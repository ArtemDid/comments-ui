import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: "flex",
    padding: theme.spacing(1),
    fontSize: 27,
    fontWeight: 700,
    alignItems: "center",
    justifyContent: "flex-end",
    background: "#00000060",
    color: "white",
    height: 40,
    [theme.breakpoints.down(600)]: {
      fontSize: 18,
      height: 40,
    },
  },
  button: {
    border: "none",
    padding: 0,
    borderRadius: "50%",
  },
}));
