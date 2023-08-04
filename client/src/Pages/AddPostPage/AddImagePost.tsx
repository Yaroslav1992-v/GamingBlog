import React from "react";
import { AddImageProps } from "./addPostProps";

export const AddImagePost = ({
  onChange,
  image,
  error = "",
}: AddImageProps) => {
  return (
    <div
      className={
        "addPost-page__imageFieldBox " +
        (error ? "addPost-page__imageFieldBox-error" : "")
      }
    >
      <label htmlFor="mainImage" className="addPost-page__image-label">
        {image && <img src={image} alt="preview" />}
        <span>
          {!image ? "Upload Main Image" : "Chose diffrent main image"}{" "}
        </span>
      </label>
      {}
      <input
        id="mainImage"
        onChange={onChange}
        className="addPost-page__imageField"
        type="file"
      />
      {error && <p className="addPost-page__error">{error}</p>}
    </div>
  );
};
