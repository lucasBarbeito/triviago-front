import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
