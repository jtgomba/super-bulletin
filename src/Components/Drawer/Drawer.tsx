import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

const DrawerLinks = [
  { linkName: "Dashboard", linkIcon: <HomeIcon />, destination: "/" },
  {
    linkName: "Manage Users",
    linkIcon: <SupervisorAccountIcon />,
    destination: "/manage",
  },
  { linkName: "My Class", linkIcon: <SchoolIcon />, destination: "/class" },
  { linkName: "My Board", linkIcon: <DashboardIcon />, destination: "/board" },
];

const drawer = (
  <Box>
    <Toolbar />
    <List>
      {DrawerLinks.map(({ linkName, linkIcon, destination }) => (
        <ListItem key={linkName} disablePadding>
          <ListItemButton component={Link} to={destination}>
            <ListItemIcon>{linkIcon}</ListItemIcon>
            <ListItemText primary={linkName} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

const MyDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default MyDrawer;
