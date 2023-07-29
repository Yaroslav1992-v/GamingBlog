import React from "react";
import { Container } from "..";
import { mode } from "../Container/container.props";
import { FooterAbout } from "./FooterAbout";
import { FooterLinks } from "./FooterLinks";
import { FooterBottom } from "./FooterBottom";

export const Footer = ({ mode }: { mode: mode }) => {
  return (
    <footer className="footer">
      <Container size="big" mode={mode}>
        <div className="footer__container">
          <div className="footer__top">
            <FooterAbout />
            <FooterLinks />
          </div>
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
};
