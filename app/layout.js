import React from 'react';
import ResponsiveAppBar from './path-to-your-navBar';

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
