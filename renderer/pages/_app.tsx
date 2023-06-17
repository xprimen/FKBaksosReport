import moment from "moment";
import type { AppProps } from "next/app";
moment.locale("id-ID");

import { AppProvider } from "../context/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
