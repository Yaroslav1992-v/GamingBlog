import { Route, Routes } from "react-router-dom";
import { Auth, EditUser, Home, PostPage, UserPage } from "../Pages";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn, loadCurrentUser } from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import { PostsProvider } from "./hooks/usePost";
import { getPosts } from "../store/post";

export interface AppContextValue {
  mode: "dark" | "light";
  handleMode: () => void;
}
const AppContext = React.createContext<AppContextValue>({
  mode: "light",
  handleMode: () => {},
});
export const useApp = (): AppContextValue => {
  return useContext(AppContext);
};
const AppLoader = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const [mode, setMode] = useState<"dark" | "light">(
    localStorageService.getMode() || "light"
  );
  const handleMode = () => {
    localStorageService.setMode({ mode: mode === "dark" ? "light" : "dark" });
    setMode((prevState) => (prevState === "dark" ? "light" : "dark"));
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCurrentUser());
      dispatch(getPosts());
    }
  }, [isLoggedIn]);
  const contextValue: AppContextValue = {
    mode,
    handleMode,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/*" element={<Auth />} />
        <Route path="post/*" element={<PostsProvider />} />
        <Route path="account/:id" element={<UserPage />} />
        <Route path="p/:postId" element={<PostPage />} />
        <Route path="account/:id/edit" element={<EditUser />} />
      </Routes>
    </AppContext.Provider>
  );
};
export default AppLoader;
