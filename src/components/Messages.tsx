import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {CircularProgress} from "@mui/material";

interface MessagesProps {
    recipientId?: string;
}

const Messages: React.FC<MessagesProps> = ({recipientId}) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (recipientId) {
            fetch(`http://localhost:8080/messages/${recipientId}`, {
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
                    console.log(data)
                })
        }
    }, [recipientId]);

    const sendMessage = () => {
        const newMessage = {
            channelId: null,
            content: inputMessage,
            recipientId: recipientId,
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
    }

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

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
                        textAlign={message.recipientId == recipientId ? 'right' : 'left' }
                        mb={2}
                    >
                        <Box
                            display="inline-block"
                            p={1}
                            borderRadius={4}
                            bgcolor={message.recipientId == recipientId ? 'primary.main' : 'grey.200'}
                            color={message.recipientId == recipientId ?'primary.contrastText' : 'inherit'}
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

export default Messages;