// import { makeStyles } from "@material-ui/core";
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

// export const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     "&:hover": {
//       backgroundColor: theme.palette.primary.main,
//     },
//   },
//   header: {
//     display: "flex",
//     padding: theme.spacing(2),
//     fontSize: 27,
//     fontWeight: 700,
//     alignItems: "center",
//     justifyContent: "space-around",
//     background: "#00000060",
//     color: "white",
//     height: 60,
//     [theme.breakpoints.down(600)]: {
//       fontSize: 18,
//       height: 40,
//     },
//   },
// }));

// makeStyles((theme: Theme) => ({
//   header: {
//     display: "flex",
//     padding: theme.spacing(2),
//     fontSize: 27,
//     fontWeight: 700,
//     alignItems: "center",
//     justifyContent: "space-around",
//     background: "#00000060",
//     color: "white",
//     height: 60,
//     [theme.breakpoints.down(600)]: {
//       fontSize: 18,
//       height: 40,
//     },
//   },
// }));
