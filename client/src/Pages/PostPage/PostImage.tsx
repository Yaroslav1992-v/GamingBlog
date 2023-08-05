import React from "react";

export const PostImage = ({
  className,
  image,
}: {
  className: string;
  image: string;
}) => {
  return (
    <div className={`post-page__${className}`}>
      <img src={image} alt="postImage" />
    </div>
  );
};
