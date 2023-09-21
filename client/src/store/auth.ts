import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

import localStorageService, { Token } from "../service/localStorageService";
import { LoginData, RegisterData, role, UserData } from "./types";
import authService from "../service/authService";
import userService from "../service/userService";
import { AppDispatch } from "./createStore";
import fileService from "../service/fileService";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  auth: { userId: string | null } | null;
  currentUser: UserData | null;
  dataLoaded: boolean;
  isLoggedIn: boolean;
}
const initialState: AuthState = localStorageService.getAccessToken()
  ? {
      isLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      currentUser: null,
      dataLoaded: false,
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      dataLoaded: false,
      currentUser: null,
      isLoggedIn: false,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequested: (state: AuthState) => {
      state.isLoading = true;
    },
    userReceived: (state: AuthState, action: PayloadAction<UserData>) => {
      state.dataLoaded = true;
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (
      state: AuthState,
      action: PayloadAction<{ userId: string }>
    ) => {
      state.auth = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userEditRequested: (state: AuthState) => {
      state.isLoading = true;
    },
    userEdited: (state: AuthState, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loggedOut: (state: AuthState) => {
      state.isLoggedIn = false;
    },
  },
});

export const signUp = (payload: RegisterData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.register(payload);
    localStorageService.setTokens({ ...data, expiresIn: 90000 });
    dispatch(authRequestSuccess({ userId: data._id }));
    dispatch(userReceived(data));
    return true;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";

    dispatch(authRequestFailed(message));
  }
};
const userRequsted = createAction("current user requestd");
export const signIn = (payload: LoginData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.login(payload);
    localStorageService.setTokens({ ...data, expiresIn: 90000 });
    dispatch(authRequestSuccess({ userId: data._id }));
    return true;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(authRequestFailed(message));
  }
};
export const editUser =
  (user: UserData, file?: File) => async (dispatch: AppDispatch) => {
    let image;
    try {
      dispatch(userEditRequested());
      if (file) {
        image = await fileService.uploadFile(file);
        if (user.image) {
          await fileService.deleteFile(user.image);
        }
        user = { ...user, image: image };
      }
      const editedUser = await userService.editUser({
        ...user,
      });
      dispatch(userEdited(editedUser));
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(authRequestFailed(message));
    }
  };
export const loadCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(userRequsted());
    const data = await userService.getUserById(
      localStorageService.getUserId()!
    );
    dispatch(userReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(authRequestFailed(message));
  }
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(loggedOut());
  localStorageService.removeAuthData();
};
export const getAuthError =
  () =>
  (state: { auth: AuthState }): string | null => {
    return state.auth.error;
  };
export const getIsLoggedIn =
  () =>
  (state: { auth: AuthState }): boolean => {
    return state.auth.isLoggedIn;
  };
export const getAuthLoading =
  () =>
  (state: { auth: AuthState }): boolean =>
    state.auth.isLoading;
export const getCurrentUser =
  () =>
  (state: { auth: AuthState }): UserData | null =>
    state.auth.currentUser;
export const getCurrentUserRole =
  () =>
  (state: { auth: AuthState }): role | undefined =>
    state.auth.currentUser?.role;
export const getCurrentUserId =
  () =>
  (state: { auth: AuthState }): string | null | undefined =>
    state.auth.auth?.userId;
export const getCurrentUserImage =
  () =>
  (state: { auth: AuthState }): string | null | undefined =>
    state.auth.currentUser?.image;

const { reducer: authReducer, actions } = authSlice;
const {
  authRequestSuccess,
  loggedOut,
  authRequested,
  authRequestFailed,
  userEditRequested,
  userReceived,
  userEdited,
} = actions;

export default authReducer;
