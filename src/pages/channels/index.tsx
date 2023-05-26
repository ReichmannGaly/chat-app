import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const Channels = () => {
    const channelsArray = ['Channel1', "Channel2", "Channel3", "Channel4", "Channel5"];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName="Channels"/>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {channelsArray.map((channel, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {channel}
                            </ListItemIcon>
                            <ListItemText/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
        </Box>
    );
}

export default Channels;