import React from "react";
import { Typography } from "@mui/material";
import TableComp from "../../Components/TableComp/TableComp";

const MyClass = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        My Classes
      </Typography>
      <TableComp />
    </>
  );
};

export default MyClass;
