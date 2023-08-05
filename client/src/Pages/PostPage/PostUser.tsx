import React from "react";
import { UserMinData } from "../../store/types";
import { ActionBtn, Avatar } from "../../Components";
import { formatDate } from "../../Utils/date";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserRole } from "../../store/auth";
import { FcSettings } from "react-icons/fc";
export const PostUser = ({
  user,
  createdAt,
  postId,
}: {
  createdAt: Date;
  user: UserMinData;
  postId: string;
}) => {
  const { _id, image, username } = user;
  const role = useSelector(getCurrentUserRole());
  return (
    <div className="post-page__user">
      <div className="post-page__user-box">
        <Avatar size="m" image={image} to={_id} />
        <div className="post-page__user-data">
          <Link to={`/account/${_id}`} className="post-page__user-link">
            {username}
          </Link>
          <span className="post-page__user-content">
            {formatDate(createdAt)}
          </span>
        </div>{" "}
      </div>
      {role === "admin" && (
        <ActionBtn
          to={`/post/${postId}/edit`}
          text="Edit Post"
          type="link"
          Icon={<FcSettings />}
        />
      )}
    </div>
  );
};
