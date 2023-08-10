import React, { useState } from "react";
import { CommentsField } from "./CommentsField";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";
import { createCommentData, createNotificationData } from "../../store/types";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/createStore";
import { createComment, getCommentsIsLoading } from "../../store/comments";
import { ReplyComment } from "./comments.props";
import { Spinner } from "../spinner/Spinner";
import { createNotification } from "../../store/notification";

export const CommentForm = ({ reply }: { reply?: ReplyComment }) => {
  const userId = useSelector(getCurrentUserId());
  const [comment, setComment] = useState<string>("");
  const isLoading = useSelector(getCommentsIsLoading());
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const text = () => {
    return reply
      ? comment.includes(reply.name)
        ? comment
        : `${reply.name} ${comment}`
      : comment;
  };
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length > 3 && userId && postId) {
      if (reply) {
        const newComment: createCommentData = {
          user: userId,
          content: comment.replace(reply.name, ""),
          postId,
          reply: {
            name: reply.name.replace("@", ""),
            parentId: reply.commentId,
            to: reply.userId,
          },
        };
        const commentId = await dispatch(createComment(newComment));
        if (userId !== reply.userId && commentId) {
          const notification: createNotificationData = {
            postId,
            author: userId,
            reciever: reply.userId,
            content: comment.replace(reply.name, ""),
            commentId,
          };
          dispatch(createNotification(notification));
        }
      } else {
        const newComment: createCommentData = {
          user: userId,
          content: comment,
          postId,
        };
        dispatch(createComment(newComment));
      }
      setComment("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="comments-form">
      <CommentsField onChange={handleChange} value={text()} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Button
          disabled={
            reply ? comment.length - reply.name.length < 4 : comment.length < 3
          }
          type="submit"
          text="Post A Comment"
          size="l"
        />
      )}
    </form>
  );
};
