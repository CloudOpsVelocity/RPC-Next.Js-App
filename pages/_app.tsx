import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "@/app/globals.css";
import SessionProvider from "@/app/context/session";
import ReactQueryProvider from "@/app/context/rquery";
import { Provider } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <MantineProvider>
        <ReactQueryProvider>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </ReactQueryProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
