import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "firebase/auth";

interface AuthInterface {
  value: {
    email?: string;
    password?: string;
  };
}
const initialState: AuthInterface = {
  value: {
    email: "",
    password: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthInterface>) => {
      state.value.email = action.payload.value.email;
      state.value.password = action.payload.value.password;
    },
    logout: (state) => {
      state.value.email = "";
      state.value.password = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.value;

export default authSlice.reducer;
