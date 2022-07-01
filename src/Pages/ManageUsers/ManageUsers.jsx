import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import Form from "./Form/Form";
import TableComp from "../../Components/TableComp/TableComp";

const ManageUsers = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Manage Users
      </Typography>
      <Stack
        alignItems="flex-start"
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
      >
        <Form />
        <TableComp />
      </Stack>
    </>
  );
};

export default ManageUsers;
