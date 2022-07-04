import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./reducers/ticketsReducer";
import projectsReducer from "./reducers/projectsReducer";
import authReducer from "./reducers/authReducer";
import { api } from "./reducers/fireAuthReducer";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    projects: projectsReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
