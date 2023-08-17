import React from 'react';
import ResponsiveAppBar from '../components/navbar.js';

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
