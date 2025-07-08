import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/FirebaseConfig.ts';
import 'react-toastify/dist/ReactToastify.css';
export const appFirebase = initializeApp(firebaseConfig);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
