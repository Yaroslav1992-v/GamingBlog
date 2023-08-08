import React, { useState } from "react";
import { CommentData } from "../../store/types";
import { Avatar } from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { formatDate } from "../../Utils/date";
import { CommentForm } from "./CommentForm";
import { ReplyComment } from "./comments.props";
import { useSelector } from "react-redux";
import {
  getCurrentUserId,
  getCurrentUserRole,
  getIsLoggedIn,
} from "../../store/auth";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiTwotoneDelete, AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch } from "../../store/createStore";
import { removeComment } from "../../store/comments";
import { ActionBtn } from "../Button/ActionBtn";
import { CommentEdit } from "./CommentEdit";

export const Comment = ({
  user,
  createdAt,
  content,
  _id,
  comments,
}: CommentData & { comments: CommentData[] }) => {
  const { _id: userId, image, username } = user;
  const [reply, setReply] = useState<boolean>(false);
  const [response, setResponse] = useState<ReplyComment | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };
  const isLoggedIn = useSelector(getIsLoggedIn());
  const role = useSelector(getCurrentUserRole());
  const dispatch = useAppDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  let parent: any;
  const findParent = (commentId: string) => {
    parent = comments.find((c) => c._id === commentId);
    if (parent && parent.reply?.parentId) {
      findParent(parent.reply.parentId);
    }
  };
  const handleReply = () => {
    findParent(_id);
    setReply((prevState) => !prevState);
    setResponse({
      name: `@${username}`,
      commentId: parent._id,
      userId: user._id,
    });
  };
  const handleRemove = () => {
    dispatch(removeComment(_id));
  };
  return (
    <div className="comments__comment">
      <div className="comments__data">
        <div className="comments__avatar">
          <Avatar size="l" image={image} to={userId} />
        </div>
        {!edit ? (
          <div className="comments__box">
            <div className="comments__content">
              <p>{content}</p>
            </div>
            <div className="comments__bottom">
              <div className="comments__bottom-left">
                <Link className="comments__user" to={`/account/${userId}`}>
                  {username}
                </Link>
                <div className="comments__date">{formatDate(createdAt)}</div>
              </div>
              <div className="comments__bottom-right">
                {isLoggedIn && (
                  <>
                    <ActionBtn
                      onClick={handleReply}
                      text="Reply To This Comment"
                      Icon={<BsFillReplyAllFill />}
                      type="button"
                    />
                    {(role === "admin" || currentUserId === user._id) && (
                      <>
                        <ActionBtn
                          onClick={handleRemove}
                          text="Delete This Comment"
                          Icon={<AiTwotoneDelete />}
                          type="button"
                        />
                        <ActionBtn
                          onClick={handleEdit}
                          text="Edit This Comment"
                          Icon={<AiOutlineEdit />}
                          type="button"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CommentEdit commentId={_id} data={content} handleEdit={handleEdit} />
        )}
      </div>
      {reply && <CommentForm reply={response} />}
    </div>
  );
};
