import React from "react";
import { ActionBtnProps } from "./button.props";
import { Link } from "react-router-dom";

export const ActionBtn = ({
  onClick = () => {},
  type,
  to = "",
  Icon,
  text,
  name = "",
  id = 0,
  onChange = () => {},
}: ActionBtnProps) => {
  const renderButton = () => {
    switch (type) {
      case "button":
        return (
          <button onClick={onClick} className="action-button-btn">
            {Icon}
          </button>
        );
      case "link":
        return (
          <Link className="action-button-btn" to={to}>
            {Icon}
          </Link>
        );
      case "fileField":
        return (
          <>
            <label
              id={name}
              onClick={onClick}
              htmlFor={id.toString()}
              className="action-button-btn"
            >
              {Icon}
            </label>
            <input
              name={name}
              id={id.toString()}
              onChange={onChange}
              className="action-button__input"
              type="file"
            />
          </>
        );
    }
  };
  return (
    <div className="action-button">
      {renderButton()}
      <span className="action-button__desc">{text}</span>
    </div>
  );
};
