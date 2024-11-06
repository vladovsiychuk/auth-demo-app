"use client"; // Add this at the top of your file

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const App: React.FC = () => {
  const handleLoginSuccess = (response: any) => {
    const { credential } = response;

    if (credential) {
      // Decode the JWT to extract user info (optional)
      const decoded = jwtDecode(credential) as any;
      console.log('User info:', decoded);

      // Send the JWT to the backend for validation and further processing
      fetch('http://localhost:8080/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Backend response:', data);
          // Handle successful login response from backend (e.g., save JWT to state or localStorage)
        })
        .catch((err) => {
          console.error('Error communicating with backend:', err);
        });
    }
  };

  const handleLoginFailure = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Login with Google</h1>
        <div className="p-2 bg-white rounded shadow-lg">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            text="signin_with"
            shape="pill"
            size="large"
            logo_alignment="center"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;