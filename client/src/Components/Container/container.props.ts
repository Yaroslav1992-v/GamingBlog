import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  size?: "big" | "normal";
  mode?: mode;
}
export interface BoxProps {
  children: ReactNode;
  className: string;
  mode?: mode;
}
export type mode = "dark" | "light";
