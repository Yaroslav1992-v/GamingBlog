import React from "react";
import { AvatarProps } from "./avatar.props";
import { Link } from "react-router-dom";

export const Avatar = ({ image = "", size, to }: AvatarProps) => {
  return (
    <Link to={`/account/${to}`} className={`avatar avatar-${size}`}>
      {image && <img src={image} alt="user avatar" />}
    </Link>
  );
};
