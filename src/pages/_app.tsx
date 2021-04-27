import '~/assets/styles/tailwind.css'
import '~/assets/styles/globals.css'
import { Layout } from '~/presentation/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
