import styles from '@/styles/Home.module.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const latestUser = storedUsers[storedUsers.length - 1];

    if (latestUser) {
      router.push('/global-chat');
    } else {
      router.push('/sign-in');
    }
  }, []);
  return (
      <div className={styles.container}>
        <Typography variant="h3" align="center">Welcome To Chat App</Typography>
      </div>
  )
}
