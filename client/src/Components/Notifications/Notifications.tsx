import React, { useEffect } from "react";
import { Notification } from "../../store/types";
import { Notif } from "./Notification";
import { ActionBtn } from "../Button/ActionBtn";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { useAppDispatch } from "../../store/createStore";
import { useSelector } from "react-redux";
import {
  changeNotsToRead,
  getUnreadIds,
  removeNotifications,
} from "../../store/notification";
export const Notifications = ({
  notifications,
  setState,
}: {
  notifications: Notification[];
  setState: () => void;
}) => {
  const dispatch = useAppDispatch();
  const unreadIds = useSelector(getUnreadIds());
  useEffect(() => {
    setTimeout(() => {
      dispatch(changeNotsToRead(unreadIds));
    }, 2000);
  }, []);
  const clearAll = () => {
    const notsIds = notifications.map((n) => n._id);
    dispatch(removeNotifications(notsIds));
  };
  return (
    <div className="notifications">
      <div className="notifications__inner">
        <h4 className="notifications__title">
          {notifications.length > 0
            ? "Notifications"
            : "You have No Notifications"}
        </h4>
        <div className="notifications__actions">
          {notifications.length > 0 && (
            <ActionBtn
              type="button"
              text="Clear All"
              onClick={clearAll}
              Icon={<AiOutlineCheckCircle />}
            />
          )}
          <ActionBtn
            type="button"
            text="Close"
            onClick={setState}
            Icon={<AiOutlineClose />}
          />
        </div>
      </div>
      {
        <ul className="notifications__list">
          {notifications.map((n) => (
            <li
              className={
                "notifications__item" +
                (!n.isRead ? " notifications__item-unread" : "")
              }
              key={n._id}
            >
              {<Notif not={n} />}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
