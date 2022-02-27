import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import allReducers from '../utils/allReducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../utils/rootSaga';
import Meta from '../components/container/meta';
import Layout from '../components/container/layout';
import { ThemeProvider, } from '../components/theme/ThemeContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.scss';
import "swiper/css/bundle";
import { useRouter } from 'next/router';
import * as gtag from '../components/common/googleAd/gtag';
// import Script from 'next/script';
// import Config from '../config/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(...[sagaMiddleware]));

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Provider store={store}>
    {/* <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${Config.env.analytics}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${Config.env.analytics}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    /> */}
    <Meta {...pageProps.metaTags} />
    <ThemeProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </Provider>
}
sagaMiddleware.run(rootSaga);

export default MyApp
