import './globals.css';

import type { AppProps } from 'next/app';
import Providers from './providers';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { env } from '@/config/environment'
//import { getDeployments } from '@/deployments/deployments'

// NOTE: This may cause CORS errors during the development
// const poppins = Poppins({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RejuvenateAI</title>
      </Head>
      <Providers>
        <ToastContainer />
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
