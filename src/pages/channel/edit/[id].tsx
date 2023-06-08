import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import {useRouter} from "next/router";
import EditChannel from "@/components/EditChannel";

const drawerWidth = 240;

const EditChannelPage = () => {
    const router = useRouter();
    const channelId = router.query.id;

    const [channelName, setChannelName] = useState<string>("");

    useEffect(() => {
        if(channelId && !channelName) {
            fetch(`http://localhost:8080/channel/${channelId}`, {
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
                    setChannelName(data.channel.name);
                })
        }
    },[channelId])

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName={channelName}/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    position: 'relative'
                }}>
                <EditChannel channelId={channelId as string}/>
            </Box>
        </Box>
    ) ;
}

export default EditChannelPage;