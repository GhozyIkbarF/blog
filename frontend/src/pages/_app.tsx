import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router';
import Layout from '@/components/layout/mainlayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.pathname === "/signup" || router.pathname === "/login")
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    )

  return (
    <ThemeProvider
      disableTransitionOnChange
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>

  )
}
