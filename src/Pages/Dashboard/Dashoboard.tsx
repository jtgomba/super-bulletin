import { Typography, Stack, Box } from "@mui/material";

import React from "react";
import BarChartComp from "../../Components/BarChart/BarChartComp";
import { useGetUserQuery } from "../../Utils/apis/authApi";
import { useAppSelector } from "../../Utils/hooks";
import { selectUid } from "../../Utils/slices/authSlice";

const Dashoboard = () => {
  const id = useAppSelector(selectUid);
  const { data, isLoading } = useGetUserQuery(id);
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Welcome, {!isLoading && data?.name}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{ flexWrap: "wrap" }}>
        <BarChartComp />
      </Stack>
    </>
  );
};

export default Dashoboard;
