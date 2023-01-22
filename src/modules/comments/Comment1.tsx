import { Comment } from "semantic-ui-react";
import { Button } from "@mui/material";

import "semantic-ui-css/semantic.min.css";
import { useStyles } from "./styles";

interface CommentProp {
  id: number;
  user_name: string;
  created_at: string;
  text: string;
}

interface Props {
  comment: CommentProp;
  children: any;
  setOpen: (setOpen: boolean) => void;
  setId: (id: number) => void;
}

const Comment1 = ({ comment, children, setOpen, setId }: Props) => {
  const { classes, cx } = useStyles();

  const handleOpen = (id: number) => {
    setOpen(true);
    setId(id);
  };

  return (
    <Comment className="rrrr">
      <Comment.Avatar
        as="a"
        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
      />
      <Comment.Content>
        <Comment.Author as="a">{comment.user_name}</Comment.Author>
        <Comment.Metadata>
          <span>{comment.created_at}</span>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
        <Comment.Actions>
          <Button onClick={() => handleOpen(comment.id)}>Reply</Button>
        </Comment.Actions>
      </Comment.Content>
      {children.props?.comments?.length && (
        <Comment.Group className={cx(classes.commentCont)}>
          {children}
        </Comment.Group>
      )}
    </Comment>
  );
};

export default Comment1;
