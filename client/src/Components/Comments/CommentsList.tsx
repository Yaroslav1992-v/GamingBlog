import React from "react";
import { CommentData } from "../../store/types";
import { Comment } from "./Comment";

export const CommentsList = ({ comments }: { comments: CommentData[] }) => {
  const nestComments = () => {
    const notNestedComments: CommentData[] = [];
    const nestedComments: CommentData[] = [];
    comments.forEach((c) => {
      if (c.reply?.parentId) {
        nestedComments.unshift(c);
      } else notNestedComments.push(c);
    });

    return notNestedComments.map((c) => {
      return {
        ...c,
        replies: nestedComments.filter((n) => n.reply?.parentId === c._id),
      };
    });
  };
  const allComments = nestComments();

  return (
    <div className="comments__cotanier">
      <h4 className="comments__title">Comments</h4>
      <ul className="comments__list">
        {allComments.map((c) => (
          <li key={c._id} className="comments__item">
            <Comment comments={comments} {...c} />
            {c.replies.length > 0 && (
              <ul className="comments__list comments__children">
                {c.replies.map((r) => (
                  <li key={r._id} className="comments__item">
                    <Comment comments={comments} {...r} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
