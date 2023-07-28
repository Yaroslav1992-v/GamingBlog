import { Route, Routes } from "react-router-dom";
import { Auth, Home } from "../Pages";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, getIsLoggedIn, loadCurrentUser } from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import localStorageService from "../service/localStorageService";

const AppLoader = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCurrentUser());
    }
  }, [isLoggedIn]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/*" element={<Auth />} />
    </Routes>
  );
};
export default AppLoader;
