import React from 'react';
import ResponsiveAppBar from '../components/navbar';
import '../styles/navbarStyles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  );
}
