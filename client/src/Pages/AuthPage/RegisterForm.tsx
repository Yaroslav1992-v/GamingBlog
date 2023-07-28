import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, CheckBoxField, Button, Spinner } from "../../Components";
import { Errors } from "./Auth.props";
import { validator } from "../../Utils/validator";
import { registerValidator } from "../../Utils/validatorConfig";
import { useAppDispatch } from "../../store/createStore";
import { getAuthError, getAuthLoading, signUp } from "../../store/auth";
import { useSelector } from "react-redux";
import { RegisterData } from "../../store/types";

export const RegisterForm = () => {
  const [errors, setErrors] = useState<Errors>();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const isLoading = useSelector(getAuthLoading());
  const authError = useSelector(getAuthError());

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      role: "user",
      passwordMatch: passwordRepeatRef.current!.value,
    };
    const errors = validator(userData, registerValidator, userData.password);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const check = await dispatch(signUp(userData as RegisterData));
    if (check) {
      navigate("/");
    }
  };
  return (
    <div className="form">
      <h1 className="form__title">Create an account</h1>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          type="text"
          placeholder="Username"
          error={errors?.username}
          inputRef={usernameRef}
        />
        <TextField
          type="text"
          placeholder="Email"
          inputRef={emailRef}
          error={errors?.email}
        />
        <TextField
          type="password"
          placeholder="Passowrd"
          inputRef={passwordRef}
          error={
            errors?.passwordMatch ? errors.passwordMatch : errors?.password
          }
        />
        <TextField
          type="password"
          placeholder="Confirm Password"
          inputRef={passwordRepeatRef}
          error={errors?.passwordMatch}
        />
        <div className="form__bottom">
          <CheckBoxField />
          <Link className="form__link" to={"/forgot"}>
            Forgot your password?
          </Link>
        </div>{" "}
        {authError && <p className="form__error">{authError}</p>}
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit" size={"l"} text={"Register"} />
        )}
      </form>
      ;
    </div>
  );
};
