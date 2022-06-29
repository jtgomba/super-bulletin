import React, { useState } from "react";
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

const drawerWidth = 240;

const DrawerLinks = [
  { linkName: "Dashboard", linkIcon: <HomeIcon /> },
  { linkName: "Manage Users", linkIcon: <SupervisorAccountIcon /> },
];

const drawer = (
  <Box>
    <Toolbar />
    <Divider />
    <List>
      {DrawerLinks.map(({ linkName, linkIcon }, index) => (
        <ListItem key={linkName} disablePadding>
          <ListItemButton>
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
