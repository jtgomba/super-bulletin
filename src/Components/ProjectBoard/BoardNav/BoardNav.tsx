import React from "react";
import { Box, Toolbar, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BoardNavInterface {
  projectName: string | undefined;
}

const BoardNav = ({ projectName }: BoardNavInterface) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: 3,
        display: "flex",
        flexWrap: "wrap",
      }}>
      <Toolbar
        sx={{
          boxShadow: "0px 0px 1px 1px  rgba(0, 0, 0, 0.2)",
          borderRadius: "3px",
          width: "100%",
        }}>
        <DashboardIcon color="disabled" sx={{ mr: 2 }} fontSize="large" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {projectName}
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
