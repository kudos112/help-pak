import Head from "next/head";
import Layout from "../components/layout/layout";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.scss";
import { ReduxWrapper } from "../redux/store";
import { theme } from "~/theme";

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme} resetCSS={false}>
    <Head>
      <title>Help Pakistan</title>
      <meta name="description" content="Generated by HelpPak Team" />
      <link rel="icon" href="/pakistan.svg" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default ReduxWrapper.withRedux(MyApp);
