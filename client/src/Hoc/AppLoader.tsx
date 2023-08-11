import { Route, Routes } from "react-router-dom";
import { Auth, EditUser, Home, PostPage, SearchPage, UserPage } from "../Pages";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentUserId,
  getIsLoggedIn,
  loadCurrentUser,
} from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import { PostsProvider } from "./hooks/usePost";
import { getPosts } from "../store/post";
import { loadNotifications } from "../store/notification";

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
  const userId = useSelector(getCurrentUserId());
  const handleMode = () => {
    localStorageService.setMode({ mode: mode === "dark" ? "light" : "dark" });
    setMode((prevState) => (prevState === "dark" ? "light" : "dark"));
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCurrentUser());

      if (userId) {
        dispatch(loadNotifications(userId));
      }
    }
    dispatch(getPosts());
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
        <Route path="p/:postId/:commentId" element={<PostPage />} />
        <Route path="account/:id/edit" element={<EditUser />} />
        <Route path="tags/:tagName/:tagId" element={<SearchPage />} />
        <Route path="search/:value" element={<SearchPage />} />
      </Routes>
    </AppContext.Provider>
  );
};
export default AppLoader;
