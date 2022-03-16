import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import StoreProvider from '@store/.';
import Preload from '@containers/Preload';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <StoreProvider>
      {router.pathname === '/admin' ? (
        <Preload>
          <Component {...pageProps} />
        </Preload>
      ) : (
        <Component {...pageProps} />
      )}
    </StoreProvider>
  );
}

export default MyApp;
