import "@/styles/globals.css"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <title>What The Hexle?</title>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
