import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import fakeProject from "../fakeData";

const project = fakeProject();
const initialState = {
  value: [project],
};

export const counterSlice = createSlice({
  name: "projects",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

//export const {  } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects.value;

export default counterSlice.reducer;
