import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  size?: "big" | "normal";
  mode?: mode;
}
export type mode = "dark" | "light";
