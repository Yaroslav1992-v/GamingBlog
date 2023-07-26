import React from "react";
import { buttonProps } from "./button.props";

export const Button = ({ text, size, type = "button" }: buttonProps) => {
  return (
    <div className="button">
      <button type={type} className={`button__btn button-${size}`}>
        {text}
      </button>
    </div>
  );
};
