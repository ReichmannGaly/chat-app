import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {useRouter} from "next/router";
import {ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const Messages = () => {
    const [users,setUsers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/users", {
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
                setUsers(data.users);
            })
    },[])

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
                {users.map((user, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => router.push(`/messages/${user.id}`)}>
                            <ListItemAvatar>
                                <Avatar>
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>{user.name}</Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
        </Box>
    );
}

export default Messages;