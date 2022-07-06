import React from "react";
import { Box, Toolbar, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppSelector } from "../../../Utils/hooks";
import { selectProjects } from "../../../Utils/slices/projectsSlice";

interface BoardNavInterface {
  id: string | undefined;
}

const BoardNav = ({ id }: BoardNavInterface) => {
  /*   const project = useAppSelector(selectProjects).filter(
    (project) => project.id === id
  )[0]; */

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <Toolbar
        sx={{
          boxShadow: "0px 0px 1px 1px  rgba(0, 0, 0, 0.2)",
          borderRadius: "3px",
        }}>
        <DashboardIcon color="disabled" sx={{ mr: 2 }} fontSize="large" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/*           {project.projectName} */}
        </Typography>
        <Button
          color="inherit"
          endIcon={<MoreVertIcon />}
          sx={{ display: { xs: "none", sm: "flex" } }}>
          Show Menu
        </Button>
        <Button
          color="inherit"
          endIcon={<MoreVertIcon />}
          sx={{ display: { xs: "inline", sm: "none" } }}
        />
      </Toolbar>
    </Box>
  );
};

export default BoardNav;
