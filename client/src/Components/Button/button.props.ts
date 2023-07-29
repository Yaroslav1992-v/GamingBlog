import { ReactNode } from "react";

export interface buttonProps {
  size: "l" | "m";
  text: string;
  type?: "submit" | "button";
}
export interface ActionBtnProps {
  type: "link" | "button";
  to?: string;
  Icon: ReactNode;
  text: string;
  onClick?: () => void;
}
