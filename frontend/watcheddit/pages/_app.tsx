import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation';

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <CssBaseline />
      <Navigation />
      <Component {...pageProps} />
    </div>  
  );
}

export default MyApp
