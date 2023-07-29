import React from "react";
import { InputProps } from "./Field.props";

export const TextField = ({
  type,
  value = "",
  error,
  inputRef,
  onChange,
  placeholder,
  name,
}: InputProps) => {
  return (
    <div className="text-field">
      {value ? (
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          className={
            "text-field__input" + (error ? " text-field__input-error" : "")
          }
        />
      ) : (
        <input
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          name={name}
          className={
            "text-field__input" + (error ? " text-field__input-error" : "")
          }
        />
      )}
      {error && <p className="text-field__error">{error}</p>}
    </div>
  );
};
