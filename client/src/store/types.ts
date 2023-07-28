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
  accessToken: string;
  refreshToken: string;
}
