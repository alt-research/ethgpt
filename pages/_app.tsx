import '@/styles/globals.css'
import { Inter } from 'next/font/google';
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {theme} from '../theme';
import createEmotionCache from '../components/createEmotionCache';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T9ZN3PC6NM"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T9ZN3PC6NM');
        `}}>
        </script>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
