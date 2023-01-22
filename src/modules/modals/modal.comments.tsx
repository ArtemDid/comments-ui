import * as React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./styles";
import toast from "react-hot-toast";
import { Actions } from "../../libs/enums";
import SendIcon from "@mui/icons-material/Send";
import ReCAPTCHA from "react-google-recaptcha";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 14,
  p: 4,
  "& .MuiTextField-root": { m: 1, width: "25ch" },
};
type Props = {
  openAuth: boolean;
  setOpenAuth: (openAuth: boolean) => void;
  dispatch: any;
  id: number | null;
  limit: number;
  offset: number;
};

export default function BasicModal({
  openAuth,
  setOpenAuth,
  dispatch,
  id,
  limit,
  offset,
}: Props) {
  const { classes, cx } = useStyles();
  const [text, setText] = React.useState<string>("");
  const [captcha, setCaptcha] = React.useState<string>("");

  const handleClose = () => {
    setOpenAuth(false);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch(
      process.env.REACT_APP_API_URL +
        `/api/comments/?text=${text}${
          id ? `&parent_id=${id}` : ""
        }&limit=${limit}&offset=${offset}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    if (data.message) {
      toast.error(data.message);
      return;
    }

    dispatch({
      type: Actions.setComments,
      payload: data,
    });

    handleClose();

    setText("");
    setCaptcha("");
  };
  function onChange(value: any) {
    setCaptcha(value);
  }
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
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA as string}
              onChange={onChange}
            />
            <Button
              color="success"
              size="large"
              type="submit"
              endIcon={<SendIcon />}
              disabled={!captcha}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
