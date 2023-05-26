import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface MainContentProps {
  selectedButton: string;
  channelsArray: string[];
  messagesArray: string[];
  drawerWidth: number;
  showList: boolean;
  setShowList: (boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedButton,
  channelsArray,
  messagesArray,
  drawerWidth,
  showList,
  setShowList
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleListItemClick = () => {
    setShowList(false);
    setChatOpen(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setChatMessages([...chatMessages, newMessage]);
      setNewMessage("");
    }
  };

  return (
      <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {showList ? (
            <List>
              {selectedButton === 'channels' ? (
                  channelsArray.map((channel, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton onClick={handleListItemClick}>
                          <ListItemIcon>
                            {channel}
                          </ListItemIcon>
                          <ListItemText />
                        </ListItemButton>
                      </ListItem>
                  ))
              ) : (
                  messagesArray.map((message, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton onClick={handleListItemClick}>
                          <ListItemIcon>
                            {message}
                          </ListItemIcon>
                          <ListItemText />
                        </ListItemButton>
                      </ListItem>
                  ))
              )}
            </List>
        ) : (
            <Box sx={{ mt: 2 }}>
              <TextField
                  label="Type a message"
                  variant="outlined"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{ mr: 1 }}
                  multiline
              />
              <Button variant="contained" onClick={handleSendMessage}>
                Send
              </Button>
              <Box sx={{ mt: 2 }}>
                {chatMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
              </Box>
            </Box>
        )}
      </Box>
  );
}

export default MainContent;