import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, CheckBoxField, Button } from "../../Components";
import { Errors } from "./Auth.props";
import { validator } from "../../Utils/validator";
import { registerValidator } from "../../Utils/validatorConfig";

export const RegisterForm = () => {
  const [errors, setErrors] = useState<Errors>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      passwordMatch: passwordRepeatRef.current!.value,
    };
    const errors = validator(userData, registerValidator, userData.password);
    setErrors(errors);
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
        </div>
        <Button type="submit" size={"l"} text={"Register"} />
      </form>
      ;
    </div>
  );
};
