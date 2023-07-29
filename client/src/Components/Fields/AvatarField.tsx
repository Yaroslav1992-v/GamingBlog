import React from "react";
import { AvatarFieldProps } from "./Field.props";
import { PlusIcon } from "../icons";

export const AvatarField = ({
  onChange,
  id,
  url,
  inputRef,
  error,
}: AvatarFieldProps) => {
  return (
    <div className="avatar-field">
      <div className="avatar-field__avatar">
        {url && <img src={url} alt="user avatar" />}
        <label htmlFor={id} className="avatar-field-label">
          <PlusIcon />
        </label>
      </div>
      <input
        onChange={onChange}
        ref={inputRef}
        className="visually-hidden"
        type="file"
        id={id}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
