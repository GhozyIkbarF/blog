import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store";
import Layout from "@/components/layout/mainlayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/signup" || router.pathname === "/login")
    return (
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );

  return (
    <Provider store={store}>
      <ThemeProvider disableTransitionOnChange>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
