import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Fab, ListItemAvatar} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/router";

const drawerWidth = 240;

const Channels = () => {
    const [channels,setChannels] = useState([]);

    const  router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            }
        })
            .then(response => {
                if(response.status === 200){
                    return response.json()
                }
                else {
                    throw new Error(`Unexpected response status: ${response.status}`)
                }
            })
            .then(data => {
                setChannels(data.channels);
            })
    },[])

    const handleCreateClick = () => {
        router.push("/channel/create");
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName="Channels"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    position: 'relative'
                }}
            >
                <Toolbar />
                {channels.map((channel) => (
                    <ListItem
                        key={channel.id}
                        disablePadding>
                        <ListItemButton onClick={() => router.push(`/channels/${channel.id}`)}>
                            <ListItemAvatar>
                                <Avatar>
                                    {channel.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>{channel.name}</Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
                <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
                    <Fab color="primary" onClick={handleCreateClick}>
                        <AddIcon />
                    </Fab>
                </div>
            </Box>
        </Box>
    );
}

export default Channels;