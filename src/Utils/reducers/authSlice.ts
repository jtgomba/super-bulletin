import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthInterface } from "../../Types/types";

const initialState: AuthInterface = {
  displayName: "",
  email: "",
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthInterface>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    logoutUser: (state) => {
      state.displayName = "";
      state.email = "";
      state.uid = "";
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
