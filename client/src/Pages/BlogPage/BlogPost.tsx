import React from "react";
import { PostBlogData } from "../../store/types";
import { BlogPostHeader } from "./BlogPostHeader";
import { Link } from "react-router-dom";
import { cutString } from "../../Utils/helpers";

export const BlogPost = ({ post }: { post: PostBlogData }) => {
  const { image, username, _id } = post.user;
  return (
    <div className="blog__post">
      <BlogPostHeader
        image={image}
        username={username}
        date={post.createdAt}
        userId={_id}
      />
      <Link to={`/p/${post._id}`} className="blog__title">
        {post.mainTitle}
      </Link>
      <div className="blog__content">
        <p>{cutString(post.content[0].value, 300)}</p>
      </div>
      <Link to={`/p/${post._id}`} className="blog__mainImage">
        <img src={post.mainImage} alt="post main" />
      </Link>
    </div>
  );
};
