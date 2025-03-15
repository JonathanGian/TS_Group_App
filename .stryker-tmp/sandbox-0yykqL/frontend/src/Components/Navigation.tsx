// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import React, { useState } from "react";
import { Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  if (stryMutAct_9fa48("147")) {
    {}
  } else {
    stryCov_9fa48("147");
    const [openDrawer, setOpenDrawer] = useState(stryMutAct_9fa48("148") ? true : (stryCov_9fa48("148"), false));
    const navigate = useNavigate();
    const toggleDrawer = stryMutAct_9fa48("149") ? () => undefined : (stryCov_9fa48("149"), (() => {
      const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (stryMutAct_9fa48("150")) {
          {}
        } else {
          stryCov_9fa48("150");
          if (stryMutAct_9fa48("153") ? event.type === "keydown" || (event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift" : stryMutAct_9fa48("152") ? false : stryMutAct_9fa48("151") ? true : (stryCov_9fa48("151", "152", "153"), (stryMutAct_9fa48("155") ? event.type !== "keydown" : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155"), event.type === (stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "keydown")))) && (stryMutAct_9fa48("158") ? (event as React.KeyboardEvent).key === "Tab" && (event as React.KeyboardEvent).key === "Shift" : stryMutAct_9fa48("157") ? true : (stryCov_9fa48("157", "158"), (stryMutAct_9fa48("160") ? (event as React.KeyboardEvent).key !== "Tab" : stryMutAct_9fa48("159") ? false : (stryCov_9fa48("159", "160"), (event as React.KeyboardEvent).key === (stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), "Tab")))) || (stryMutAct_9fa48("163") ? (event as React.KeyboardEvent).key !== "Shift" : stryMutAct_9fa48("162") ? false : (stryCov_9fa48("162", "163"), (event as React.KeyboardEvent).key === (stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "Shift")))))))) {
            if (stryMutAct_9fa48("165")) {
              {}
            } else {
              stryCov_9fa48("165");
              return;
            }
          }
          setOpenDrawer(isOpen);
        }
      };
      return toggleDrawer;
    })());
    const handleNavigation = (path: string) => {
      if (stryMutAct_9fa48("166")) {
        {}
      } else {
        stryCov_9fa48("166");
        navigate(path);
        setOpenDrawer(stryMutAct_9fa48("167") ? true : (stryCov_9fa48("167"), false));
      }
    };
    return <>
      <Toolbar sx={stryMutAct_9fa48("168") ? {} : (stryCov_9fa48("168"), {
        position: stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), "fixed"),
        top: 0,
        left: 0,
        right: 0,
        zIndex: stryMutAct_9fa48("170") ? () => undefined : (stryCov_9fa48("170"), theme => stryMutAct_9fa48("171") ? theme.zIndex.drawer - 1 : (stryCov_9fa48("171"), theme.zIndex.drawer + 1)),
        background: stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), "linear-gradient(135deg, #ADD8E6, #FF69B4)"),
        borderRadius: 2,
        padding: stryMutAct_9fa48("173") ? "" : (stryCov_9fa48("173"), "0 20px"),
        boxShadow: stryMutAct_9fa48("174") ? "" : (stryCov_9fa48("174"), "none"),
        width: stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), "100vw")
      })}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={stryMutAct_9fa48("176") ? {} : (stryCov_9fa48("176"), {
          mr: 2
        })} onClick={toggleDrawer(stryMutAct_9fa48("177") ? false : (stryCov_9fa48("177"), true))}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={stryMutAct_9fa48("178") ? {} : (stryCov_9fa48("178"), {
          flexGrow: 1
        })}>
          Nice Toolbar??
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(stryMutAct_9fa48("179") ? true : (stryCov_9fa48("179"), false))} PaperProps={stryMutAct_9fa48("180") ? {} : (stryCov_9fa48("180"), {
        sx: stryMutAct_9fa48("181") ? {} : (stryCov_9fa48("181"), {
          background: stryMutAct_9fa48("182") ? "" : (stryCov_9fa48("182"), "linear-gradient(135deg, #ADD8E6, #FF69B4)")
        })
      })}>
        {/* Spacer to push content below the fixed toolbar */}
        <Toolbar />
        <List sx={stryMutAct_9fa48("183") ? {} : (stryCov_9fa48("183"), {
          width: 250
        })}>
          <ListItem disablePadding>
            <ListItemButton onClick={stryMutAct_9fa48("184") ? () => undefined : (stryCov_9fa48("184"), () => handleNavigation(stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), "/")))}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={stryMutAct_9fa48("186") ? () => undefined : (stryCov_9fa48("186"), () => handleNavigation(stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), "/upload-emails")))}>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Emails" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={stryMutAct_9fa48("188") ? () => undefined : (stryCov_9fa48("188"), () => handleNavigation(stryMutAct_9fa48("189") ? "" : (stryCov_9fa48("189"), "/status")))}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="EmailStatus" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>;
  }
};
export default Navigation;