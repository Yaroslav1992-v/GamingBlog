import React from "react";
import { ContainerProps } from "./container.props";

export const Container = ({ children, size = "normal" }: ContainerProps) => {
  return (
    <div className={"container" + (size === "big" ? " container-big" : "")}>
      {children}
    </div>
  );
};
