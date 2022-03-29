import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation';
import { Container } from "@mui/material";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from "react-redux";
import { store } from "../app/store";

let persistor = persistStore(store);

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <Navigation />
        <div style={{ backgroundColor: '#EEEEEE', minHeight: "100vh" }}>
          <Container sx={{ paddingTop: 3 }}>
            <Component {...pageProps} />
          </Container>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp
