import { Routing } from '@/pages';
import { MuiThemeProvider, ReduxProvider } from './providers';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import appConfig from './configs/appConfig';
import { useLayoutEffect } from 'react';
import authConfig from './configs/authConfig';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from './providers/toaster';

appConfig();

const App = () => {
  useLayoutEffect(() => {
    authConfig(store);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider>
        <MuiThemeProvider>
          <Routing />
          <Toaster />
        </MuiThemeProvider>
      </ReduxProvider>
    </I18nextProvider>
  );
};

export default App;
