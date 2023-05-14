import React from 'react';
import styles from '@/styles/GlobalChat.module.css';
import Typography from "@mui/material/Typography";

const GlobalChat = () => {
    return (
        <div className={styles.container}>
            <Typography variant="h3" align="center">Global chat</Typography>
        </div>
    );
}

export default GlobalChat;