import React from "react";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
export const Logo = () => {
  return (
    <Link to={"/"} className="logo">
      <img src={logo} alt="logo" />
    </Link>
  );
};
