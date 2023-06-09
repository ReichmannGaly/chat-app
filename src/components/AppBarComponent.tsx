import React from 'react';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import DrawerComponent from "@/components/DrawerComponent";
import LogoutIcon from '@mui/icons-material/Logout';
import {useRouter} from "next/router";

interface AppBarComponentProps {
  drawerWidth: number;
  window?: () => Window;
  componentName: string;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({drawerWidth,window,componentName}) => {
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = typeof window !== 'undefined' ? () => window?.().document.body : undefined;

    const handleChannelsClick = () => {
        handleDrawerToggle();
        router.push("/channel");
    };

    const handleMessagesClick = () => {
        handleDrawerToggle();
        router.push("/messages");
    }

    const handleProfileClick = () => {
        handleDrawerToggle();
        router.push("/profile")
    }

    const handleLogoutClick = () => {
        router.push("/login");
        sessionStorage.clear();
    }

    const drawer = (
        <DrawerComponent
            handleDrawerToggle={handleDrawerToggle}
            handleChannelsClick={handleChannelsClick}
            handleMessagesClick={handleMessagesClick}
            handleProfileClick={handleProfileClick}
            mobileOpen={mobileOpen}
        />
    );

    return (
      <React.Fragment>
          <CssBaseline />
          <AppBar
              position="fixed"
              sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
              }}
          >
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                      {componentName}
                  </Typography>
                  <IconButton
                      color="inherit"
                      aria-label="logout"
                      edge="end"
                      onClick={handleLogoutClick}
                      className="logoutButton"
                  >
                      <LogoutIcon />
                  </IconButton>
              </Toolbar>
          </AppBar>

              <Box
                  component="nav"
                  sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                  aria-label="mailbox folders"
              >
                  <Drawer
                      container={container}
                      variant="temporary"
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      ModalProps={{
                          keepMounted: true, // Better open performance on mobile.
                      }}
                      sx={{
                          display: { xs: 'block', sm: 'none' },
                          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                      }}
                  >
                      {drawer}
                  </Drawer>
                  <Drawer
                      variant="permanent"
                      sx={{
                          display: { xs: 'none', sm: 'block' },
                          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                      }}
                      open
                  >
                      {drawer}
                  </Drawer>
              </Box>
      </React.Fragment>
  );
}

export default AppBarComponent;