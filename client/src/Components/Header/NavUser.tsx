import React, { useState } from "react";
import { BellIcon } from "../icons";
import { Avatar, Notifications } from "..";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";
import { NavUserProps } from "./header.props";
import {
  getAllNotifications,
  notficationsCount,
} from "../../store/notification";

export const NavUser = ({ url = "" }: NavUserProps) => {
  const id = useSelector(getCurrentUserId());
  const notCount = useSelector(notficationsCount());
  const notifications = useSelector(getAllNotifications());
  const [openNots, setOpenNots] = useState<boolean>(false);
  const handleOpenNots = () => {
    setOpenNots((prevState) => !prevState);
  };
  return (
    <div className="navigation__user">
      <div className="navigation__nots">
        <button onClick={handleOpenNots} className="navigation__button">
          {<BellIcon />}
        </button>
        {notCount !== 0 && (
          <span className="navigation__count">{notCount}</span>
        )}
        {openNots && (
          <Notifications
            setState={handleOpenNots}
            notifications={notifications}
          />
        )}
      </div>{" "}
      <Avatar image={url} size="s" to={id || ""} />
    </div>
  );
};
