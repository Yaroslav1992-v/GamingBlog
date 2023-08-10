import React, { useEffect } from "react";
import { CommentForm } from "./CommentForm";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/createStore";
import { getComments, loadComments } from "../../store/comments";
import { useSelector } from "react-redux";
import { CommentsList } from "./CommentsList";

export const Comments = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const comments = useSelector(getComments());
  useEffect(() => {
    if (postId) {
      dispatch(loadComments(postId));
    }
  }, []);
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="comments">
      <h4 className="comments__title">Leave a comment</h4>
      <CommentForm />
      {comments.length > 0 && <CommentsList comments={comments} />}
    </div>
  );
};
