import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  )
}