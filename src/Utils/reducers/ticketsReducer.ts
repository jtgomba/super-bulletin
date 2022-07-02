import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Ticket } from "../../Types/types";

// Define a type for the slice state
interface TicketsState {
  value: Ticket[];
}

// Define the initial state using that type
const initialState: TicketsState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "tickets",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addTicket } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTickets = (state: RootState) => state.tickets.value;

export default counterSlice.reducer;
