import React from "react";
import { contentData, formsProps } from "../../Hoc/hooks/usePost.types";
import { PostImage } from "./PostImage";
import { PostQuote } from "./PostQuote";
import { PostText } from "./PostText";
import { PostTitle } from "./PostTitle";

export const PostContent = ({ content }: { content: formsProps[] }) => {
  const renderContent = (content: contentData, num: number) => {
    switch (content.contentName) {
      case "image":
        return (
          <PostImage
            className="content-image"
            image={content.value}
            key={`post=${num}`}
          />
        );
      case "quote":
        return <PostQuote quote={content.value} key={`post=${num}`} />;
      case "title":
        return (
          <PostTitle
            key={`post=${num}`}
            title={content.value}
            className="content-title"
          />
        );
      case "text":
        return <PostText text={content.value} key={`post=${num}`} />;
    }
  };
  return (
    <div className="post-page__content">
      {content.map((c, i) => renderContent(c as contentData, i))}
    </div>
  );
};
