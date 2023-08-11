import React from "react";
import { BlogPostHeadProps } from "./blog.props";
import { Avatar } from "../../Components";
import { Link } from "react-router-dom";
import { formatDate } from "../../Utils/date";

export const BlogPostHeader = ({
  image,
  username,
  date,
  userId,
}: BlogPostHeadProps) => {
  return (
    <div className="blog__post-head">
      <Avatar image={image} size="s" to={userId} />
      <Link className="blog__username" to={`/account/${userId}`}>
        {username}
      </Link>
      <div className="blog__date">{formatDate(date)}</div>
    </div>
  );
};
