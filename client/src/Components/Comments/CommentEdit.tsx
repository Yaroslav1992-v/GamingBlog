import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { CommentEditProps } from "./comments.props";
import { ActionBtn } from "../Button/ActionBtn";
import { CommentsField } from "./CommentsField";
import { useAppDispatch } from "../../store/createStore";
import { editComment } from "../../store/comments";
export const CommentEdit = ({
  data,
  handleEdit,
  commentId,
}: CommentEditProps) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<string>(data);
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(target.value);
  };
  const saveData = () => {
    dispatch(editComment(commentId, content));
    handleEdit();
  };
  return (
    <div className="comments__edit">
      <CommentsField onChange={handleChange} value={content} />
      <div className="comments__edit-actions">
        <ActionBtn
          type="button"
          onClick={handleEdit}
          Icon={<AiOutlineClose />}
          text="Cancel"
        />
        <ActionBtn
          Icon={<AiOutlineSave />}
          type="button"
          onClick={saveData}
          text="Save Changes"
        />
      </div>
    </div>
  );
};
