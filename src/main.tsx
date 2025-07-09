import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/FirebaseConfig.ts';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore } from 'firebase/firestore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
