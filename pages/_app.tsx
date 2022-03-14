import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import StoreProvider from '@store/.';
import Preload from '@containers/Preload';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Preload>
        <Component {...pageProps} />
      </Preload>
    </StoreProvider>
  );
}

export default MyApp;
