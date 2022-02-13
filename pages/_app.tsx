import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import allReducers from '../utils/allReducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../utils/rootSaga';
import Meta from '../components/container/meta';
import Layout from '../components/container/layout';
import { ThemeProvider, } from '@mui/material/styles';
import themeMui from '../components/theme/theme';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(...[sagaMiddleware]));

function MyApp({ Component, pageProps }: AppProps) {


  return <Provider store={store}>
    <Meta {...pageProps.metaTags} />
    <ThemeProvider theme={themeMui}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </Provider>
}
sagaMiddleware.run(rootSaga);

export default MyApp
