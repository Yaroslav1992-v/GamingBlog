import React from "react";
import { CommentFieldProps } from "./comments.props";

export const CommentsField = ({ onChange, value }: CommentFieldProps) => {
  return (
    <div className="comments__fieldBox">
      <textarea onChange={onChange} value={value} className="comments__field" />
    </div>
  );
};
