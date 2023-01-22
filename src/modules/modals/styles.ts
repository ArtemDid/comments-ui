import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()((theme: Theme) => ({
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
