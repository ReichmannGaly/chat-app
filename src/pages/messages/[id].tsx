import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/router";
import Messages from "@/components/Messages";

const drawerWidth = 240;

const UserMessage = () => {
    const router = useRouter();
    const id = router.query.id;

    const [recipientUser,setRecipientUser] = useState({
        id: null,
        name: "",
        email: "",
        bio: ""
    })

    const idRef = useRef(recipientUser.id);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/users`, {
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
                    setRecipientUser(data.users.find(user => user.id == id));
                    idRef.current = recipientUser.id;
                })
        }
    }, [id]);


    return(
        <Box sx={{ display: 'flex' , height: "90vh"}}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName={recipientUser.name}/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Grid container sx={{marginTop: 2, height: "100%"}}>
                    <Box sx={{ height: "100%", width: "100%" }}>
                        <Messages recipientId={id as string} />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default UserMessage;