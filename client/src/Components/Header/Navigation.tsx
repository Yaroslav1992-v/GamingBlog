import React, { useState } from "react";
import { Logo } from "..";
import { MenuProps } from "./header.props";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/auth";
import { NavUser } from "./NavUser";

export const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  const isLoggedIn = useSelector(getIsLoggedIn());
  const menu: MenuProps[] = [
    {
      name: "Home",
      to: "/",
      active: true,
    },
    {
      name: "about",
      to: "about",
      active: false,
    },
    {
      name: "blog",
      to: "blog",
      active: false,
    },
    {
      name: "shop",
      to: "shop",
      active: false,
    },
    {
      name: "contact",
      to: "contact",
      active: false,
    },
    {
      name: "Sign In",
      to: "auth/login",
      active: false,
    },
  ];
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__left">
          {" "}
          <Logo />
          <div className="navigation__burger">
            <button
              onClick={handleMenu}
              className={
                "navigation__btn" + (open ? " navigation__btn-active" : "")
              }
            />
          </div>
          <ul
            className={
              "navigation__menu" + (open ? " navigation__menu-active" : "")
            }
          >
            {menu.map((m, i) => (
              <li key={i} className="navigation__item">
                <Link
                  to={m.to}
                  className={
                    "navigation__link" +
                    (m.active ? " navigation__link-active" : "")
                  }
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={
            "navigation__right" + (open ? " navigation__right-active" : "")
          }
        >
          <Search />
          {isLoggedIn && <NavUser />}
        </div>
      </div>
    </nav>
  );
};
