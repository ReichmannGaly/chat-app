import React from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import CreateChannelForm from "@/components/CreateChannelForm";

const drawerWidth = 240;



const CreateChannel = () => {

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
                    width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
                <Toolbar />
                <Grid container sx={{marginTop: 2}}>
                    <CreateChannelForm/>
                </Grid>
            </Box>
        </Box>
    );
}

export default CreateChannel;