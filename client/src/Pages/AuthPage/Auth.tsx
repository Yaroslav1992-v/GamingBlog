import React from "react";
import { Container, Header } from "../../Components";
import { AuthNav, LoginForm, RegisterForm } from ".";
import { useLocation } from "react-router-dom";

export const Auth = () => {
  const { pathname } = useLocation();
  const isLogin: boolean = pathname.includes("login");
  return (
    <main className="auth">
      <Container size="big">
        <Header />
      </Container>
      <Container>
        <div className="auth__container">
          <AuthNav authName={isLogin ? "Welcome Back" : "Register"} />
          <div className="auth__form">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>{" "}
        </div>
      </Container>
    </main>
  );
};
