import React from "react";
import { buttonProps } from "./button.props";

export const Button = ({
  text,
  size,
  type = "button",
  disabled = false,
}: buttonProps) => {
  return (
    <div className="button">
      <button
        disabled={disabled}
        type={type}
        className={`button__btn button-${size}`}
      >
        {text}
      </button>
    </div>
  );
};
