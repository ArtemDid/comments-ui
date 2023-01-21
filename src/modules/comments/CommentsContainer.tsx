import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Comment1 from "./Comment1";
import { useStyles } from "./styles";

interface Props {
  comments: any;
  setOpen: any;
  setId: any;
}

const CommentsContainer = ({ comments, setOpen, setId }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Comment.Group minimal className={cx(classes.comment555555)}>
      {comments?.map((item: any, index: number) => (
        <Comment1 key={index} comment={item} setOpen={setOpen} setId={setId}>
          {item.childrens.length && (
            <CommentsContainer
              comments={item.childrens}
              setOpen={setOpen}
              setId={setId}
            />
          )}
        </Comment1>
      ))}
    </Comment.Group>
  );
};

export default CommentsContainer;
