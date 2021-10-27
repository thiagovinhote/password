import '~/assets/styles/tailwind.css'
import '~/assets/styles/globals.css'
import { Layout } from '~/presentation/components/Layout'
import { AuthProvider } from '~/presentation/contexts'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
