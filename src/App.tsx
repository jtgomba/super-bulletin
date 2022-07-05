import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard, Board, ManageUsers, Projects, Auth } from "./Pages/";
import { ProjectBoard } from "./Components/";
import { HomeLayout, ProtectedLayout } from "./Layouts";
import { onAuthStateChanged } from "firebase/auth";
import { AuthInterface } from "./Types/types";
import { auth } from "./Utils/firebaseConfig";
import { setUser, logoutUser } from "./Utils/reducers/authSlice";
import { useAppDispatch } from "./Utils/hooks";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            authenticated: "authenticated",
          } as AuthInterface)
        );
      } else {
        dispatch(logoutUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Auth />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="manage" element={<ManageUsers />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectBoard />} />
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
