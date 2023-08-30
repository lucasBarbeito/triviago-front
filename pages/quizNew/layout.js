import React from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import '../app/globals.css';

const QuizNewLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  );
};

export default QuizNewLayout;
