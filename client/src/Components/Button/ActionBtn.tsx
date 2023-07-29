import React from "react";
import { ActionBtnProps } from "./button.props";
import { Link } from "react-router-dom";

export const ActionBtn = ({
  onClick = () => {},
  type,
  to = "",
  Icon,
  text,
}: ActionBtnProps) => {
  return (
    <div className="action-button">
      {type === "button" ? (
        <button onClick={onClick} className="action-button-btn">
          {Icon}
        </button>
      ) : (
        <Link className="action-button-btn" to={to}>
          {Icon}
        </Link>
      )}
      <span className="action-button__desc">{text}</span>
    </div>
  );
};
