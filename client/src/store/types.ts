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
  tags: Tags[];
}
export interface PostBlogData {
  _id: string;
  user: UserMinData;
  createdAt: Date;
  mainImage: string;
  mainTitle: string;
  content: { value: string }[];
}
export interface createCommentData {
  user: string;
  postId: string;
  content: string;
  reply?: Reply;
}
export interface createNotificationData {
  author: string;
  reciever: string;
  postId: string;
  commentId: string;
  content: string;
  isRead?: boolean;
}
export interface Notification {
  _id: string;
  author: UserMinData;
  reciever: UserMinData;
  postId: { _id: string; mainTitle: string };
  commentId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
export interface Reply {
  to?: string;
  parentId?: string;
  name?: string;
}
export interface CommentData {
  _id: string;
  content: string;
  createdAt: Date;
  user: { _id: string; image?: string; username: string };
  reply?: Reply;
}
export interface User {
  _id: string;
  username: string;
  image: string;
}
