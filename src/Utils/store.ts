import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./reducers/ticketsSlice";
import projectsReducer from "./reducers/projectsSlice";
import authReducer from "./reducers/authSlice";
import { api } from "./reducers/fireAuthReducer";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    projects: projectsReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
