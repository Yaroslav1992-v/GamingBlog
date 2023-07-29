import React from "react";
import { Container, Header } from "../../Components";
import { AuthNav, LoginForm, RegisterForm } from ".";
import { useLocation } from "react-router-dom";
import { useApp } from "../../Hoc/AppLoader";

export const Auth = () => {
  const { pathname } = useLocation();
  const isLogin: boolean = pathname.includes("login");
  const { mode } = useApp();
  return (
    <main className="auth">
      <Container mode={mode} size="big">
        <Header />
      </Container>
      <Container mode={mode}>
        <div className="auth__container">
          <AuthNav
            mode={mode}
            authName={isLogin ? "Welcome Back" : "Register"}
          />
          <div className="auth__form">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>{" "}
        </div>
      </Container>
    </main>
  );
};
