import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
