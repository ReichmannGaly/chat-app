import styles from '@/styles/Home.module.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";

export default function Home() {
  const router = useRouter();

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      router.push('/global-chat');
    } else {
      router.push('/login');
    }
  }, []);
  return (
      <div className={styles.container}>
        <Typography variant="h3" align="center">Chat App</Typography>
      </div>
  )
}
