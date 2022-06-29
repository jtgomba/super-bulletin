import React from "react";
import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "./Pages/";
import { Navbar, MyDrawer } from "./Components/";

const App = () => {
  return (
    <Container maxWidth={false}>
      <Navbar />
      <MyDrawer />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Container>
  );
};

export default App;
