import React from "react";

export const CheckBoxField = () => {
  return (
    <div className="checkBox">
      <input className="checkBox__checkbox" type="checkbox" />
      <label className="checkBox__label" htmlFor="checkBox">
        Remember me
      </label>
    </div>
  );
};
