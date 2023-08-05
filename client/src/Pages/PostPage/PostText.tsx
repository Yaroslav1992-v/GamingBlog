import React from "react";

export const PostText = ({ text }: { text: string }) => {
  return (
    <div className="post-page__text">
      <p>{text}</p>
    </div>
  );
};
