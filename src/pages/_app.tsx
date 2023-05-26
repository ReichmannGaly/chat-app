import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
}
