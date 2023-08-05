import React from "react";
import { PostMinData } from "../../store/types";
import { PostCard } from "./PostCard/PostCard";

export const PostsMinList = ({ posts }: { posts: PostMinData[] }) => {
  return (
    <div className="posts">
      {
        <ul className="posts__list">
          {posts.map((p) => (
            <li key={p._id} className="posts__item">
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
