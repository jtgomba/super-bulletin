import React from "react";
import { Container, Box, Toolbar } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard, Board, ManageUsers, Projects } from "./Pages/";
import { Navbar, ProjectBoard } from "./Components/";

const App = () => {
  return (
    <Container maxWidth={false}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/manage" element={<ManageUsers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectBoard />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
