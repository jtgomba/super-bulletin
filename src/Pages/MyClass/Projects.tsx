import React from "react";
import { Typography } from "@mui/material";
import TableComp from "../../Components/TableComp/TableComp";

const Projects = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        My Projects
      </Typography>
      <TableComp />
    </>
  );
};

export default Projects;
