import React from "react";
import { AddImageProps } from "./addPostProps";

export const PostFormImage = ({
  onChange,
  image,
  error = "",
}: AddImageProps) => {
  return (
    <div
      className={
        "post-form__imageFieldBox " +
        (error ? "post-form__imageFieldBox-error" : "")
      }
    >
      <label htmlFor="mainImage" className="post-form__image-label">
        {image && <img src={image} alt="preview" />}
        <span>
          {!image ? "Upload Main Image" : "Chose diffrent main image"}{" "}
        </span>
      </label>
      {}
      <input
        id="mainImage"
        onChange={onChange}
        className="post-form__imageField"
        type="file"
      />
      {error && <p className="post-form__error">{error}</p>}
    </div>
  );
};
