import * as React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./styles";
import toast from "react-hot-toast";
import { initialState } from "../../libs/constants";
import { InitialState, Action } from "../../libs/types";
import { Actions } from "../../libs/enums";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 14,
  p: 4,
  "& .MuiTextField-root": { m: 1, width: "25ch" },
};
type Props = {
  openAuth: boolean;
  setOpenAuth: (openAuth: boolean) => void;
  dispatch: any;
  temp: any;
};

export default function BasicModal({
  openAuth,
  setOpenAuth,
  dispatch,
  temp,
}: Props) {
  const [auth, setAuth] = React.useState(true);
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const { classes, cx } = useStyles();
  const [inputs, setInputs] = React.useState<{
    user_name: string;
    email: string;
    home_page?: string;
  }>({
    user_name: "",
    email: "",
    home_page: "",
  });
  const handleClose = () => {
    setOpenAuth(false);
  };

  const handleClick = () => {
    setAuth(!auth);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(inputs);
    if (!inputs.home_page) {
      delete inputs.home_page;
    }

    const response = await fetch(
      process.env.REACT_APP_API_URL +
        `/api/users/${auth ? "login" : "registration"}?` +
        new URLSearchParams(inputs),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!data.status || data.status !== 200) {
      toast.error(data.message);
      return;
    }

    dispatch({
      type: Actions.setItems,
      payload: data,
    });

    localStorage.setItem("token", data.token);

    toast.success("Success!");
    temp();

    console.log(data);
    handleClose();

    setInputs({ user_name: "", email: "", home_page: "" });
  };

  return (
    <div>
      <Modal
        open={openAuth}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}

          <div className={cx(classes.modalContent)}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              alignItems={"center"}
            >
              {auth ? "Authorization" : "Registration"}
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Name"
              onChange={handleChange}
              name="user_name"
              value={inputs.user_name}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              onChange={handleChange}
              name="email"
              value={inputs.email}
            />
            {!auth && (
              <TextField
                id="outlined-multiline-flexible"
                label="Home page"
                multiline
                maxRows={4}
                onChange={handleChange}
                name="home_page"
                value={inputs.home_page}
              />
            )}
            <Button color="success" size="large" type="submit">
              Send
            </Button>
            <Button variant="text" size="small" onClick={handleClick}>
              {!auth ? "Authorization" : "Registration"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
