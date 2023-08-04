import { ReactNode } from "react";

export interface buttonProps {
  size: "l" | "m";
  text: string;
  type?: "submit" | "button";
}
export interface ActionBtnProps {
  type: "link" | "button" | "fileField";
  to?: string;
  Icon: ReactNode;
  text: string;
  onClick?: ({ ...props }) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: number;
  name?: string;
}
