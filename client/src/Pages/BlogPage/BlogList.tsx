import React from "react";
import { PostBlogData } from "../../store/types";
import { BlogPost } from "./BlogPost";

export const BlogList = ({ posts }: { posts: PostBlogData[] }) => {
  return (
    <ul className="blog__list">
      {posts.map((p) => (
        <li key={p._id} className="blog__item">
          <BlogPost post={p} />
        </li>
      ))}
    </ul>
  );
};
