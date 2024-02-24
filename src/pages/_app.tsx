import "~/assets/styles/tailwind.css";
import "~/assets/styles/globals.css";

import { AppProps } from "next/app";

import { AuthProvider } from "~/presentation/contexts";
import { Layout } from "~/presentation/organisms/layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
