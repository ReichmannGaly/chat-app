import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface NavigationComponentProps {
    container: () => HTMLElement;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawer: React.ReactNode;
    drawerWidth: number;
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({
    container,mobileOpen, handleDrawerToggle, drawer, drawerWidth
                                                                }) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
    );
};

export default NavigationComponent;