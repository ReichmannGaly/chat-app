import styles from '@/styles/Home.module.css'
import {useEffect} from "react";
import {useRouter} from "next/router";

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
    <h1>Welcome!</h1>
  )
}
