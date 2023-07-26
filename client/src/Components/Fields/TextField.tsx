import React from "react";
import { InputProps } from "./Field.props";

export const TextField = ({
  type,
  value = "",
  error,
  inputRef,
  placeholder,
}: InputProps) => {
  return (
    <div className="text-field">
      <input
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        className={
          "text-field__input" + (error ? " text-field__input-error" : "")
        }
      />
      {error && <p className="text-field__error">{error}</p>}
    </div>
  );
};
