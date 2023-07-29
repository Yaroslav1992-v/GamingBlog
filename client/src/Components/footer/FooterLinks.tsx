import React from "react";
import { FooterLinksList } from "./footer.props";
import { Link } from "react-router-dom";

export const FooterLinks = () => {
  const footerLink: FooterLinksList[] = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "About",
      to: "about",
    },
    {
      name: "Contact",
      to: "contact",
    },
  ];
  return (
    <div className="footer__links">
      <h3 className="footer__title">Quick Links</h3>
      <ul className="footer__list">
        {footerLink.map((l, i) => (
          <li key={i} className="footer__item">
            <Link to={l.to} className="footer__link">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
