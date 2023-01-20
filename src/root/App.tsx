import React, { useLayoutEffect, useReducer } from "react";
import Header1 from "../layout/Header1";
import { initialState } from "../libs/constants";
import { Actions } from "../libs/enums";
import { Action, InitialState } from "../libs/types";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import toast from "react-hot-toast";
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
        isUploaded: true,
      };
    case Actions.deleteItems:
      return {
        name: "",
        email: "",
        comments: [],
        isUploaded: true,
      };
    case Actions.setComments:
      return {
        name: state.name,
        email: state.email,
        comments: action.payload.comments,
        isUploaded: true,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const temp = () => {
    if (localStorage.getItem("token"))
      fetch(process.env.REACT_APP_API_URL + `/api/comments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
  }, []);

  console.log(state.comments);

  return (
    <div>
      <Header1 dispatch={dispatch} state={state} temp={temp} />
      <div>{state.email}</div>
      <div>{JSON.stringify(state.comments)}</div>
      <Comment.Group minimal>
        <Header as="h3" dividing>
          Comments
        </Header>

        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
          />
          <Comment.Content>
            <Comment.Author as="a">Matt</Comment.Author>
            <Comment.Metadata>
              <span>Today at 5:42PM</span>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
          />
          <Comment.Content>
            <Comment.Author as="a">Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <span>Yesterday at 12:30AM</span>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>

          <Comment.Group>
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
              />
              <Comment.Content>
                <Comment.Author as="a">Jenny Hess</Comment.Author>
                <Comment.Metadata>
                  <span>Just now</span>
                </Comment.Metadata>
                <Comment.Text>Elliot you are always so right :)</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment>

        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
          />
          <Comment.Content>
            <Comment.Author as="a">Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <span>5 days ago</span>
            </Comment.Metadata>
            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
      {/* {state.isUploaded && <CurrencyConverter currencies={state.currencies} />} */}
    </div>
  );
};

export default App;
