import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { Notification } from "../../store/types";
import { formatDate } from "../../Utils/date";
import { Link } from "react-router-dom";
import { cutString } from "../../Utils/helpers";

export const Notif = ({ not }: { not: Notification }) => {
  return (
    <Link
      to={`/p/${not.postId._id}/${not.commentId}`}
      className={"notifications__notification"}
    >
      <div className="notifications__avatar">
        <Avatar size="m" image={not.author.image} to={not.author._id} />
      </div>
      <div className="notifications__container">
        <div className="notifications__head">
          <span className="notifications__info">
            {not.author.username + " "}
          </span>
          In
          <span className="notifications__info">
            {" " + cutString(not.postId.mainTitle, 26)}
          </span>
        </div>
        <div className="notifications__content">
          <p>{cutString(not.content, 100)}</p>
        </div>
        <div className="notifications__date">{formatDate(not.createdAt)}</div>
      </div>
    </Link>
  );
};
