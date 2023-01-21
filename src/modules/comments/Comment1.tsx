import React from "react";
import { Comment, Form, Header } from "semantic-ui-react";
import { Button } from "@mui/material";

import "semantic-ui-css/semantic.min.css";
import { useStyles } from "./styles";

interface Props {
  comment: any;
  setOpen: any;
  setId: any;
}

const Comment1 = (props: any) => {
  const { classes, cx } = useStyles();

  const handleOpen = (id: number) => {
    props.setOpen(true);
    props.setId(id);
  };

  return (
    <Comment className="rrrr">
      <Comment.Avatar
        as="a"
        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
      />
      <Comment.Content>
        <Comment.Author as="a">{props.comment.user_name}</Comment.Author>
        <Comment.Metadata>
          <span>{props.comment.created_at}</span>
        </Comment.Metadata>
        <Comment.Text>{props.comment.text}</Comment.Text>
        <Comment.Actions>
          <Button onClick={() => handleOpen(props.comment.id)}>Reply</Button>
        </Comment.Actions>
      </Comment.Content>
      {props.children.props?.comments?.length && (
        <Comment.Group className={cx(classes.comment555555)}>
          {props.children}
        </Comment.Group>
      )}
    </Comment>
  );
};

export default Comment1;
