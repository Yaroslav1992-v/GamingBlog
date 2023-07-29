import React from "react";
import { ContainerProps } from "./container.props";

export const Container = ({
  children,
  size = "normal",
  mode = "light",
}: ContainerProps) => {
  return (
    <div
      className={
        "container" +
        (size === "big" ? " container-big" : "") +
        (mode === "dark" ? " container-dark" : "")
      }
    >
      {children}
    </div>
  );
};
