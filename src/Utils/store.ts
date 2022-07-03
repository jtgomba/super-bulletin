import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./reducers/ticketsReducer";
import projectsReducer from "./reducers/projectsReducer";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
