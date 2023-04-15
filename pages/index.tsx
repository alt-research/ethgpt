import Head from 'next/head'
import '@/styles/Home.module.css';
import { Box } from '@mui/material';
import Aside from '@/components/Aside';
import Main from '@/components/Main';
import { AppProvider } from '@/contexts/AppContext';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ethereum ChatBot</title>
        <meta name="description" content="Ethereum Documentation ChatBot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        <Box sx={{
          display: 'flex',
          flex: 1
        }}>
          <Aside />
          <Main />
        </Box>
      </AppProvider>
     </>
  );
}