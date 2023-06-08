import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface ChannelMessagesProps {
    channelId: string;
}

const ChannelMessages: React.FC<ChannelMessagesProps> = ({channelId}) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement>();
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                })
        }
    }, [channelId, messages])

    const sendMessage = () => {
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
        <Box display="flex" flexDirection="column">
            <Box height="100vh" flex="1" overflow="auto" p={2} ref={messagesContainerRef}>
                {messages.slice().reverse().map(message => (
                    <Box
                        key={message.id}
                        textAlign={message.senderId != JSON.stringify(sessionStorage.getItem("userId")) ? 'left' : 'right' }
                        mb={2}
                    >
                        <Box
                            display="inline-block"
                            p={1}
                            borderRadius={4}
                            bgcolor={message.senderId != JSON.stringify(sessionStorage.getItem("userId")) ? 'grey.200': 'primary.main' }
                            color={message.senderId != JSON.stringify(sessionStorage.getItem("userId")) ? 'inherit': 'primary.contrastText' }
                        >
                            {message.content}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box
                display="flex"
                alignItems="center"
            >
                <Box flexGrow={1}>
                    <TextField
                        label="Type a message"
                        variant="outlined"
                        fullWidth
                        value={inputMessage}
                        onChange={e => setInputMessage(e.target.value)}
                    />
                </Box>
                <Button variant="contained" onClick={sendMessage} style={{ height: '100%' }}>Send</Button>
            </Box>
        </Box>
    );
}

export default ChannelMessages;