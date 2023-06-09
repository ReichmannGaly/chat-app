import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

export interface ChannelMessagesProps {
    channelId: string;
}

const ChannelMessages: React.FC<ChannelMessagesProps> = ({channelId}) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement>();
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<number>() ;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (channelId) {
            fetch(`http://localhost:8080/messages/channel/${channelId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error(`Unexpected response status: ${response.status}`)
                    }
                })
                .then(data => {
                    setMessages(data.messages);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                })
        }

        fetch("http://localhost:8080/user",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`)
                }
            })
            .then(data => setCurrentUserId(data.user.id))

        fetch("http://localhost:8080/users",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`)
                }
            })
            .then(data => setUsers(data.users))
    }, [channelId, messages])

    const sendMessage = (e) => {
        e.preventDefault()

        const newMessage = {
            channelId: channelId,
            content: inputMessage,
            recipientId: null,
        };

        fetch('http://localhost:8080/message', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`,
            },
            body: JSON.stringify(newMessage)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                }
                else {
                    throw new Error(`Unexpected response status: ${response.status}`)
                }
            })
            .then(data => {
                setMessages(prevMessages => [...prevMessages, data]);
                setInputMessage('');
            })
            .catch(error => console.log(error))
    }

    if (loading) {
        return (
            <Box
                height="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex="1" overflow="auto" p={2} ref={messagesContainerRef}>
                {messages.slice().reverse().map(message => {
                    const senderUser = users.find(user => user.id === message.senderId)

                    return (
                        <Box
                            key={message.id}
                            textAlign={message.senderId != currentUserId ? 'left' : 'right' }
                            mb={2}
                        >
                            <Box mb={1} textAlign="center">
                                <Typography variant="subtitle2" color={"gray"}>
                                    {
                                        new Date(message.createdAt)
                                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    }
                                </Typography>
                            </Box>
                            {senderUser && senderUser.id === message.senderId && (
                                <Box mb={1} textAlign="left">
                                    <Typography variant="subtitle2" color={"gray"}>
                                        {senderUser.name}
                                    </Typography>
                                </Box>
                            )}
                            <Box
                                display="inline-block"
                                p={1}
                                borderRadius={4}
                                bgcolor={message.senderId != currentUserId ? 'grey.200': 'primary.main' }
                                color={message.senderId != currentUserId ? 'inherit': 'primary.contrastText' }
                            >
                                {message.content}
                            </Box>
                        </Box>
                )})}
            </Box>
            <Box p={2}>
                <Box display="flex" alignItems="center">
                    <form style={{ width: "100%", display: "flex", alignItems: "center" }} onSubmit={sendMessage}>
                        <Box flexGrow={1}>
                            <TextField
                                name="message"
                                className="message"
                                label="Type a message"
                                variant="outlined"
                                fullWidth
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                                multiline
                                maxRows={2}
                            />
                        </Box>
                        <Button className="sendMessageButton" variant="contained" type="submit" style={{ height: '100%', marginLeft: "10px" }}>
                            <SendIcon />
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ChannelMessages;