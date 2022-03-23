import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation';
import { ThemeProvider, createTheme } from '@mui/material';
import { Container } from "@mui/material";

import { Provider } from "react-redux";
import { store } from "../app/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  }
});

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navigation />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp
