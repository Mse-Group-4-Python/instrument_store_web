import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx'
import { CacheProvider } from '@rest-hooks/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <CacheProvider>
    <App />
    <ToastContainer />
  </CacheProvider>,
)
