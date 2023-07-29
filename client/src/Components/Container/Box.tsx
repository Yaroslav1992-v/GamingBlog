import React from "react";
import { BoxProps } from "./container.props";
import { Header } from "../Header/Header";
import { Footer } from "../footer/Footer";
import { Container } from "./Container";

export const Box = ({ mode, className, children }: BoxProps) => {
  return (
    <Container size="big" mode={mode}>
      <Header />
      <Container mode={mode}>
        <section className={className}>{children}</section>
      </Container>
      <Footer mode={mode || "light"} />
    </Container>
  );
};
