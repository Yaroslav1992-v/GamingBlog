export interface AuthNavProps {
  authName: "Register" | "Welcome Back";
  mode: "dark" | "light";
}

export interface Errors {
  email?: string;
  password?: string;
  username?: string;
  passwordMatch?: string;
  image?: string;
}
