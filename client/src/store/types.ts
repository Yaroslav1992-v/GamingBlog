import { PostData, formsProps } from "../Hoc/hooks/usePost.types";

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  role?: "user" | "admin";
}
export interface LoginData extends Omit<RegisterData, "username"> {}
export interface UserData extends Omit<RegisterData, "password"> {
  _id: string;
  image?: string;
  info?: string;
  accessToken: string;
  refreshToken: string;
}
export interface Post extends PostData {
  _id?: string;
  userId: string;
  content: formsProps[];
}
