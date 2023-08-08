import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth";
import postReducer from "./post";
import tagsReducer from "./tags";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  tags: tagsReducer,
  comment: commentsReducer,
});
function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
