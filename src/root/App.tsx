import React, { useLayoutEffect, useReducer } from "react";
import Header from "../layout/Header";
import { initialState } from "../libs/constants";
import { Actions } from "../libs/enums";
import { Action, InitialState } from "../libs/types";
import toast from "react-hot-toast";
import CommentsContainer from "../modules/comments/CommentsContainer";
import { Button, TablePagination } from "@mui/material";
import CommentModal from "../modules/modals/modal.comments";

// import { initialState } from "../libs/constants";
// import { Actions } from "../libs/enums";
// import { parseCurrencies } from "../libs/helper";
// import { Action, InitialState } from "../libs/types";
// import { CurrencyConverter } from "../pages/main/CurrencyConverter";
// import { useStyles } from "./styles";

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Actions.setItems:
      return {
        name: action.payload?.name,
        email: action.payload?.email,
        comments: state.comments,
        total_count: state.total_count,
        isUploaded: true,
      };
    case Actions.deleteItems:
      return {
        name: "",
        email: "",
        comments: [],
        total_count: state.total_count,
        isUploaded: true,
      };
    case Actions.setComments:
      return {
        name: state.name,
        email: state.email,
        comments: action.payload.comments,
        total_count: action.payload.total_count,
        isUploaded: true,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const temp = () => {
    if (localStorage.getItem("token"))
      fetch(
        process.env.REACT_APP_API_URL +
          `/api/comments?` +
          new URLSearchParams({
            limit: rowsPerPage.toString(),
            offset: (page * rowsPerPage).toString(),
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.comments);
          dispatch({
            type: Actions.setComments,
            payload: data,
          });
          dispatch({
            type: Actions.setItems,
            payload: data.user,
          });
        });
  };

  useLayoutEffect(() => {
    // if (state.comments) return;
    temp();
  }, [rowsPerPage, page]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = () => {
    setOpen(true);
    setId(null);
  };
  const handleClose = () => setOpen(false);

  console.log(state.comments);

  return (
    <div>
      <Header dispatch={dispatch} state={state} temp={temp} />
      <h1>Comments</h1>
      {state.isUploaded && (
        <>
          {state.name && <Button onClick={handleOpen}>Add Commment</Button>}
          <CommentsContainer
            comments={state.comments}
            setOpen={setOpen}
            setId={setId}
          />
          <CommentModal
            id={id}
            openAuth={open}
            setOpenAuth={setOpen}
            dispatch={dispatch}
            // temp={temp}
          />
          {state.name && (
            <TablePagination
              component="div"
              count={state.total_count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
