import '~/assets/styles/tailwind.css'
import '~/assets/styles/globals.css'
import { Layout } from '~/presentation/molecules/Layout'
import { AuthProvider } from '~/presentation/contexts'
import { AppProps } from 'next/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
