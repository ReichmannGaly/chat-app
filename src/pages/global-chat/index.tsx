import React, {useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerComponent from "@/components/DrawerComponent";
import AppBarComponent from "@/components/AppBarComponent";
import NavigationComponent from "@/components/NavigationComponent";
import MainContent from "@/components/MainContent";
import {useRouter} from "next/router";

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

const GlobalChat = (props: Props) => {
    const router = useRouter();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedButton, setSelectedButton] = React.useState('channels');
    const [showList, setShowList] = useState(true);

    const handleProfileClick = () => {
        handleDrawerToggle();
        router.push("/profile")
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChannelsClick = () => {
        setShowList(true)
        setSelectedButton('channels');
        handleDrawerToggle();
    };

    const handleMessagesClick = () => {
        setShowList(true)
        setSelectedButton('messages');
        handleDrawerToggle();
    };

    const drawer = (
        <DrawerComponent
            handleProfileClick={handleProfileClick}
            handleDrawerToggle={handleDrawerToggle}
            handleChannelsClick={handleChannelsClick}
            handleMessagesClick={handleMessagesClick}
            mobileOpen={mobileOpen}
        />
    );

    const channelsArray = ['Channel1', "Channel2", "Channel3", "Channel4", "Channel5"];
    const messagesArray = ['Message1', "Message2", "Message3", "Message4", "Message5"];

    const container = typeof window !== 'undefined' ? () => window?.().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                componentName="global-chat"
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
            />
            <NavigationComponent
                container={container as () => HTMLElement}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawer={drawer}
                drawerWidth={drawerWidth}
            />
            <MainContent
                selectedButton={selectedButton}
                channelsArray={channelsArray}
                messagesArray={messagesArray}
                drawerWidth={drawerWidth}
                showList={showList}
                setShowList={setShowList}
            />
        </Box>
    );
}

export default GlobalChat;