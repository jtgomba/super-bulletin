import { Typography, Stack, Box } from "@mui/material";

import React from "react";
import BarChartComp from "../../Components/BarChart/BarChartComp";

const Dashoboard = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Welcome, User
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{ flexWrap: "wrap" }}
      >
        <BarChartComp />
        <BarChartComp />
        <BarChartComp />
        <BarChartComp />
      </Stack>
    </>
  );
};

export default Dashoboard;
