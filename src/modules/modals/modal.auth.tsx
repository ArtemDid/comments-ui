import * as React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./styles";
import toast from "react-hot-toast";
import { Actions } from "../../libs/enums";

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
  getComments: any;
};

export default function BasicModal({
  openAuth,
  setOpenAuth,
  dispatch,
  getComments,
}: Props) {
  const [auth, setAuth] = React.useState(true);
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
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (selectedImage) {
      setImageUrl(selectedImage);
    }
  }, [selectedImage]);

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

    const reader = new FileReader();

    var uint8Array = null;

    reader.readAsArrayBuffer(selectedImage || new Blob([]));

    reader.onloadend = async () => {
      //@ts-ignore
      uint8Array = new Uint8Array(reader.result);

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
          body: JSON.stringify({ mas: [...uint8Array] }),
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
      getComments();

      console.log(data);
      handleClose();

      setInputs({ user_name: "", email: "", home_page: "" });
    };
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
              <>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Home page"
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                  name="home_page"
                  value={inputs.home_page}
                />
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    //@ts-ignore
                    setSelectedImage(e.target?.files[0]);
                  }}
                />
                <label htmlFor="select-image">
                  <Button variant="contained" color="primary" component="span">
                    Upload Image
                  </Button>
                </label>
              </>
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
