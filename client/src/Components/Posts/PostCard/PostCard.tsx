import React from "react";
import { PostMinData } from "../../../store/types";
import { formatDate } from "../../../Utils/date";
import { Link } from "react-router-dom";
import { Avatar } from "../..";

export const PostCard = ({ post }: { post: PostMinData }) => {
  const { mainImage, mainTitle, user, createdAt, _id } = post;
  return (
    <article className="postCard">
      <Link className="postCard__link" to={`p/${_id}`}>
        <div className="postCard__image">
          <img src={mainImage} alt="post main" />
        </div>
        <div className="postCard__content">
          <div className="postCard__date">{formatDate(createdAt)}</div>
          <h3 className="postCard__title">{mainTitle}</h3>
        </div>{" "}
      </Link>
      <div className="postCard__user">
        <Avatar image={user.image} to={user._id} size="s" />
        <Link to={`/account${user._id}`}></Link>
        <Link className="postCard__username" to={`/account/${user._id}`}>
          {user.username}
        </Link>
      </div>
    </article>
  );
};
