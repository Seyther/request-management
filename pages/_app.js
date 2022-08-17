import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
