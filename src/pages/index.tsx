import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';
import { MainPage } from './main';
import { LoginPage } from './login';
import { RegistrationPage } from './registration';
import { EntryPage } from './entry';

import ScrollToTop from '@/shared/ScrollToTop/ScrollToTop';

const routes: RouteProps[] = [
  { path: '/cabinet', element: <MainPage /> },
  { path: '/', element: <EntryPage /> },
  {
    path: '/login/:type',
    element: <LoginPage />,
  },
  {
    path: '/registration/:type',
    element: <RegistrationPage />,
  },
];

const Routing = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ScrollToTop />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
