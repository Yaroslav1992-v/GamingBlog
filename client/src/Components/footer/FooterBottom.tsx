import React from "react";
import { FooterSocial } from "./FooterSocial";

export const FooterBottom = () => {
  return (
    <div className="footer__bottom">
      <div className="footer__rights">
        @ 2023 Israel Kiryat Ata, Yaroslav Zhiltsov. All rights reserverd
      </div>
      <FooterSocial />
    </div>
  );
};
