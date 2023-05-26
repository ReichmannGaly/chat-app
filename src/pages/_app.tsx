import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unprotectedRoutes = ['/login', '/sign-up'];
    if (!sessionStorage.getItem('userToken') &&
        !unprotectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
}
