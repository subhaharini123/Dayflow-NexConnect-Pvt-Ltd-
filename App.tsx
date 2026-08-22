import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { SignInPage } from './components/SignInPage';

export default function App() {
  return (
    <AuthProvider>
      <SignInPage />
    </AuthProvider>
  );
}
