import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(isOpen);
    };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpenDrawer(false);
  };

  return (
    <>
      <Toolbar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #ADD8E6, #FF69B4)",
          borderRadius: 2,
          padding: "0 20px",
          boxShadow: "none",
          width: "100vw",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nice Toolbar??
        </Typography>
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #ADD8E6, #FF69B4)",
          },
        }}
      >
        {/* Spacer to push content below the fixed toolbar */}
        <Toolbar />
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/upload-emails")}>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Emails" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/status")}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="EmailStatus" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
