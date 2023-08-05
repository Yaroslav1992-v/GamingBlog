import React from "react";

export const PostTitle = ({
  title,
  className,
}: {
  title: string;
  className: string;
}) => {
  if (className === "main-title") {
    return <h1 className={`post-page__${className}`}>{title}</h1>;
  } else return <h3 className={`post-page__${className}`}>{title}</h3>;
};
