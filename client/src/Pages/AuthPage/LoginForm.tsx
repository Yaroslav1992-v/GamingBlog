import React, { useRef } from "react";
import { Button, CheckBoxField, TextField } from "../../Components";
import { Link } from "react-router-dom";

export const LoginForm = ({}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="form">
      <h1 className="form__title">Login</h1>
      <form className="form">
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
        <Button type="submit" size={"l"} text={"Login"} />
      </form>
      ;
    </div>
  );
};
