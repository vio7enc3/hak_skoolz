import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './app/styles/index.sass';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
