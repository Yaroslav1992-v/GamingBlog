import React from "react";
import { tagsInputProps } from "./addPostProps";

export const PostTagsInput = ({
  error = "",
  value,
  onChange,
}: tagsInputProps) => {
  return (
    <div className="post-form__search">
      <input
        type="search"
        value={value.trim()}
        className="post-form__search-input"
        onChange={onChange}
        placeholder="Add a Tag"
      />
      {error && <p className="post-form__error">{error}</p>}
    </div>
  );
};
