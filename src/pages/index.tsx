import styles from '@/styles/Home.module.css'
import React from "react";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
      <div className={styles.container}>
        <Typography variant="h3" align="center">Chat App</Typography>
      </div>
  )
}
