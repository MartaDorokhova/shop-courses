import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalStyle from "theme/GlobalStyle";
import { Header } from "@modules/ui/Header";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { setupStore } from "@core/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Магазин курсов" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={setupStore}>
        <GlobalStyle />
        <Header />
        <Container maxWidth="sm">
          <Component {...pageProps} />
        </Container>
      </Provider>
    </>
  );
}

export default MyApp;
