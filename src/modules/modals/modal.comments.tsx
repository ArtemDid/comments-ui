import * as React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./styles";
import toast from "react-hot-toast";
import { initialState } from "../../libs/constants";
import { InitialState, Action } from "../../libs/types";
import { Actions } from "../../libs/enums";
import SendIcon from "@mui/icons-material/Send";

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
  id: number | null;
};

export default function BasicModal({
  openAuth,
  setOpenAuth,
  dispatch,
  id,
}: Props) {
  const [auth, setAuth] = React.useState(true);
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const { classes, cx } = useStyles();
  const [text, setText] = React.useState<string>("");

  console.log(id);
  const handleClose = () => {
    setOpenAuth(false);
  };

  const handleClick = () => {
    setAuth(!auth);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(text);

    const response = await fetch(
      process.env.REACT_APP_API_URL +
        `/api/comments/?text=${text}${id ? `&parent_id=${id}` : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    // if (!data.status || data.status !== 200) {
    //   toast.error(data.message);
    //   return;
    // }

    dispatch({
      type: Actions.setComments,
      payload: data,
    });

    // localStorage.setItem("token", data.token);

    // toast.success("Success!");
    // temp();

    console.log(data);
    handleClose();

    setText("");
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
              Add Comment
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Text"
              onChange={handleChange}
              name="text"
              value={text}
              multiline
              maxRows={4}
            />
            <Button
              color="success"
              size="large"
              type="submit"
              endIcon={<SendIcon />}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
