import React from "react";
// import { getCurrencyPrice } from "../libs/helper";
// import { Currencies } from "../libs/types";
import { useStyles } from "./styles";
import { Avatar, Button, Fade, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import BasicModal from "../modules/modals/modal.auth";
// interface Props {
//   currencies: Currencies;
// }

const Header = () => {
  const { classes, cx } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [openAuth, setOpenAuth] = React.useState(false);
  const handleOpen = () => {
    setOpenAuth(true);
    setOpen(false);
  };
  const handleClose = () => setOpenAuth(false);
  const [name, setName] = useState("Artem");

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
      console.log(open);
    };

  return (
    <div className={cx(classes.header)}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={5}>
            <Paper>
              <Typography sx={{ p: 2 }}>
                <Button onClick={handleOpen}>Login</Button>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button
        className={cx(classes.button)}
        onClick={handleClick("bottom-end")}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }} alt={name} src="#" />
      </Button>
      <BasicModal openAuth={openAuth} setOpenAuth={setOpenAuth} />
    </div>
  );
};

export default Header;
