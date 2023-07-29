import { ValidationConfig } from "./validator.props";

export const registerValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required For Registration " },
    isEmail: { message: "Invalid Email " },
  },
  username: {
    isRequired: { message: "Username is Required For Registration " },
    min: {
      message: "Username name must contain  at least 5 symbols",
      value: 5,
    },
  },
  password: {
    isRequired: { message: "Password is Required For Registration " },
    isCapitalSymbol: {
      message: "Password Must Have One Capital Symbol",
    },

    isContainDigit: {
      message: "Password Must At Least One Digit",
    },
    min: {
      message: "Password Must Contain At Least 8 Symbols",
      value: 8,
    },
  },
  passwordMatch: {
    isRequired: { message: "Repeat Your Password " },
    match: {
      message: "Passwords don't match!",
    },
  },
};
export const editValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required  " },
    isEmail: { message: "Invalid Email " },
  },
  username: {
    isRequired: { message: "Name is Required" },
    min: {
      message: "account name must contain  at least 5 symbols",
      value: 5,
    },
  },
};
