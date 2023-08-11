import React, { useState } from "react";
import { ActionBtn, Logo } from "..";
import { MenuProps } from "./header.props";
import { Link, useLocation } from "react-router-dom";
import { Search } from "./Search";
import { useSelector } from "react-redux";
import { getCurrentUser, getIsLoggedIn } from "../../store/auth";
import { NavUser } from "./NavUser";
import { BsSun, BsMoon } from "react-icons/bs";
import { useApp } from "../../Hoc/AppLoader";

export const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const user = useSelector(getCurrentUser());
  const { mode, handleMode } = useApp();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const { pathname } = useLocation();
  console.log(pathname);
  const menu: MenuProps[] = [
    {
      name: "Home",
      to: "/",
      active: pathname === "/",
    },
    {
      name: "about",
      to: "about",
      active: pathname.includes("about"),
    },
    {
      name: "blog",
      to: "/blog",
      active: pathname.includes("blog"),
    },
    {
      name: "shop",
      to: "shop",
      active: pathname.includes("shop"),
    },
    {
      name: "contact",
      to: "contact",
      active: pathname.includes("contact"),
    },
    {
      name: "Sign In",
      to: "auth/login",
      active: pathname.includes("auth/login"),
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
            {menu.map((m, i) =>
              m.name === "Sign In" && isLoggedIn ? (
                ""
              ) : (
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
              )
            )}
          </ul>
        </div>
        <div
          className={
            "navigation__right" + (open ? " navigation__right-active" : "")
          }
        >
          <Search />
          <ActionBtn
            text="Light Mode"
            type="button"
            onClick={handleMode}
            Icon={mode === "dark" ? <BsSun /> : <BsMoon />}
          />

          {isLoggedIn && <NavUser url={user?.image || ""} />}
        </div>
      </div>
    </nav>
  );
};
