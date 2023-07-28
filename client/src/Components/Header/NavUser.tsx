import React from "react";
import { BellIcon } from "../icons";
import { Avatar } from "..";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";

export const NavUser = () => {
  const id = useSelector(getCurrentUserId());
  return (
    <div className="navigation__user">
      <div className="navigation__nots">
        <button className="navigation__button">{<BellIcon />}</button>
      </div>{" "}
      <Avatar size="s" to={id || ""} />
    </div>
  );
};
