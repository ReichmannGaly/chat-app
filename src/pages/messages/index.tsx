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

const Messages = () => {
    const messagesArray = ['Message1', "Message2", "Message3", "Message4", "Message5"];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName="Messages"/>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {messagesArray.map((message, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {message}
                            </ListItemIcon>
                            <ListItemText/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
        </Box>
    );
}

export default Messages;