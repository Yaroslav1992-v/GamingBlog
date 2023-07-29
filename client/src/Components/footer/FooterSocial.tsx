import React from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoGithub } from "react-icons/bi";
export const FooterSocial = () => {
  const social = [
    {
      logo: <BiLogoFacebook />,
      to: "https://www.facebook.com/profile.php?id=100010509000968",
    },
    {
      logo: <BiLogoInstagram />,
      to: "https://www.instagram.com/yaroslav_zhilstov/",
    },
    {
      logo: <BiLogoGithub />,
      to: "https://github.com/Yaroslav1992-v",
    },
  ];
  return (
    <ul className="footer__social">
      {social.map((s, i) => (
        <li key={i} className="footer__social-item">
          <a href={s.to}>{s.logo}</a>
        </li>
      ))}
    </ul>
  );
};
