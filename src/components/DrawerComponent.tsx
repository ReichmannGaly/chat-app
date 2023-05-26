import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import PeopleIcon from '@mui/icons-material/People';
import PersonPinIcon from '@mui/icons-material/PersonPin';

interface DrawerComponentProps {
    handleChannelsClick: () => void;
    handleMessagesClick: () => void;
    handleProfileClick: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
     handleChannelsClick,
     handleMessagesClick,
     handleProfileClick
                                                        }) => {
    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleProfileClick}
                    >
                        <ListItemIcon>
                            <PersonPinIcon/>
                        </ListItemIcon>
                        <ListItemText  primary="Profile"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleChannelsClick}
                    >
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText  primary="Channels"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleMessagesClick}
                    >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText  primary="Messages"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </div>
    );
}

export default DrawerComponent;
