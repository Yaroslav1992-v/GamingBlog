import React from "react";
import { AuthNavProps } from "./Auth.props";
import letter from "../../Images/letter.png";
import lock from "../../Images/lock.png";
import whiteletter from "../../Images/white-letter.png";
import whitelock from "../../Images/white-lock.png";
import plane from "../../Images/plane.png";
import whitePlane from "../../Images/planeWhite.png";
import { Link } from "react-router-dom";
export const AuthNav = ({ authName, mode }: AuthNavProps) => {
  const check: boolean = authName === "Register";
  const checkMode = mode === "dark";
  return (
    <div className="auth__nav">
      <div className="auth__logo">
        <img
          src={
            check
              ? checkMode
                ? whiteletter
                : letter
              : checkMode
              ? whitelock
              : lock
          }
          alt="auth logo"
        />
      </div>
      <h2 className="auth__title">{authName}</h2>
      <div className="auth__question">
        <p>{check ? "Already " : "If you don't "}have an account?</p>
        <Link
          to={check ? "/auth/login" : "/auth/register"}
          className="auth__link"
        >
          {check ? "Sign In" : "Sign Up"}
        </Link>
        <p>now, or</p>
        <div className="auth__plane">
          <img src={checkMode ? whitePlane : plane} alt="paper plane" />
        </div>
      </div>
    </div>
  );
};
