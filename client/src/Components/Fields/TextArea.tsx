import React from "react";
import { TextAreaProps } from "./Field.props";

export const TextArea = ({ value, onChange, name }: TextAreaProps) => {
  return (
    <div className="textArea">
      <textarea
        value={value}
        onChange={onChange}
        className="textArea__textArea"
        name={name}
      />
    </div>
  );
};
