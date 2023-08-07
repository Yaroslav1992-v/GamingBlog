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
  role: role;
  accessToken: string;
  refreshToken: string;
}
export type role = "admin" | "user";
export interface UserMinData {
  _id: string;
  image: string;
  username: string;
}
export interface Post extends PostData {
  _id?: string;
  user: string;
  content: formsProps[];
  tags: string[];
}
export interface Tags {
  _id: string;
  tagName: string;
  postsNumber: number;
}
export interface PostWithUser extends Omit<Post, "user"> {
  _id: string;
  createdAt: Date;
  user: UserMinData;
}
export interface PostMinData extends Omit<PostData, "content"> {
  _id: string;
  user: UserMinData;
  createdAt: Date;
  mainImage: string;
}
