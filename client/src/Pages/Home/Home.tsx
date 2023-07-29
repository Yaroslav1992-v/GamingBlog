import React from "react";
import { Header, Container, Footer } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";

export const Home = () => {
  const { mode } = useApp();
  return (
    <Container size="big" mode={mode}>
      <Header />
      <Footer mode={mode} />
    </Container>
  );
};
