import "~/assets/styles/tailwind.css";
import "~/assets/styles/globals.css";

import { AppProps } from "next/app";

import { Layout } from "~/presentation/organisms/layout";
import { AuthProvider } from "~/presentation/providers/auth-provider";

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
