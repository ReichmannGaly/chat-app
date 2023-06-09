import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/router";
import ChannelMessages from "@/components/ChannelMessages";

const drawerWidth = 240;

const ChannelMessage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [componentName,setComponentName] = useState<string>('');

    useEffect(() => {
        if (id && !componentName){
            fetch(`http://localhost:8080/channel/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
                }
            })
                .then(response => {
                    if (response.status === 200){
                        return response.json();
                    }
                    else {
                        throw new Error(`Unexpected response status: ${response.status}`)
                    }
                })
                .then(data => {
                    setComponentName(data.channel.name);
                })
        }
    },[id])

    return(
        <Box sx={{ display: 'flex', height: "90vh" }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName={componentName}/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Grid container sx={{marginTop: 2, height: "100%"}}>
                    <Box sx={{ height: "100%", width: "100%" }}>
                        <ChannelMessages channelId={id as string}/>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default ChannelMessage;