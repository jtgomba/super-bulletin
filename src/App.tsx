import React from "react";
import { Container, Box, Toolbar } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard, Board, ManageUsers, MyClass } from "./Pages/";
import { Navbar, MyDrawer } from "./Components/";

const App = () => {
  return (
    <Container maxWidth={false}>
      <Navbar />
      <MyDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: "230px" },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/manage" element={<ManageUsers />} />
          <Route path="/class" element={<MyClass />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
