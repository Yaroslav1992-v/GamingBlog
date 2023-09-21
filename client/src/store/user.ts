import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./types";
import userService from "../service/userService";

interface UserState {
  isLoading: boolean;
  error: string | null;
  admins: UserData[] | null;
  user: UserData | null;
}
const initialState: UserState = {
  isLoading: false,
  error: null,
  admins: null,
  user: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    adminsRequested: (state: UserState) => {
      state.isLoading = true;
    },

    adminsReceived: (state: UserState, action: PayloadAction<UserData[]>) => {
      state.admins = action.payload;
      state.isLoading = false;
    },
    userRecieved: (state: UserState, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userRequested: (state: UserState) => {
      state.user = null;
      state.isLoading = true;
    },
    userRequestFailed: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const loadUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userRequested());
    const data = await userService.getUserById(id);
    dispatch(userRecieved(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(userRequestFailed(message));
  }
};
export const loadAdmins = () => async (dispatch: Dispatch) => {
  try {
    dispatch(adminsRequested());
    const data = await userService.loadAdmins();
    dispatch(adminsReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(userRequestFailed(message));
  }
};
export const getAdmins = () => (state: { user: UserState }) =>
  state.user.admins;

export const getUser =
  () =>
  (state: { user: UserState }): UserData | null =>
    state.user.user;

const { reducer: userReducer, actions } = userSlice;
const {
  userRecieved,
  userRequestFailed,
  userRequested,
  adminsReceived,
  adminsRequested,
} = actions;

export default userReducer;
