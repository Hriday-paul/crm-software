import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/satoshi.css';
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import Rout from './routs/Rout.tsx';
import Store, { Persistor } from './Redux/Store.ts';
import 'flatpickr/dist/flatpickr.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import '../i18n.ts'
import "flatpickr/dist/themes/material_green.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="dark"
    />
    <React.Suspense fallback="loading....">
      <Provider store={Store}>
        <PersistGate loading={<h3 className='text-7xl'>Loading......</h3>} persistor={Persistor}>
          <RouterProvider router={Rout} />
        </PersistGate>
      </Provider>
    </React.Suspense>
  </React.StrictMode>
)
