import React from "react";

export const PostQuote = ({ quote }: { quote: string }) => {
  return (
    <div className="post-page__quote">
      <blockquote>{quote}</blockquote>{" "}
    </div>
  );
};
