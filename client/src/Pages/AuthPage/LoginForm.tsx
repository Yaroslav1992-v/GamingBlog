import React, { useRef, useState } from "react";
import { Button, CheckBoxField, Spinner, TextField } from "../../Components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthError, getAuthLoading, signIn } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";

export const LoginForm = ({}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const passwordRef = useRef<HTMLInputElement>(null);
  const isLoading = useSelector(getAuthLoading());
  const authError = useSelector(getAuthError());
  const [errors, setErrors] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current!.value || !passwordRef.current!.value) {
      setErrors(true);
      return;
    }
    const userData = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    const check = await dispatch(signIn(userData));
    if (check) {
      navigate("/");
    }
  };
  console.log(authError);
  return (
    <div className="form">
      <h1 className="form__title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <TextField type="text" placeholder="Email" inputRef={emailRef} />
        <TextField
          type="password"
          placeholder="Passowrd"
          inputRef={passwordRef}
        />
        <div className="form__bottom">
          <CheckBoxField />
          <Link className="form__link" to={"/forgot"}>
            Forgot your password?
          </Link>
        </div>
        {authError && <p className="form__error">{authError}</p>}
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit" size={"l"} text={"Login"} />
        )}
      </form>
    </div>
  );
};
