import React from 'react';
import { Stack } from '@mui/material';
import styles from '../styles/QuizPreview.module.css';
import RatingSection from './RatingSection';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const QuizPreview = ({ title, tags, createdAt, description, rating, questionCount, commentCount }) => {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Stack spacing={0.75} sx={{height: '100%'}}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.date}>
          {createdAt}
        </div>
      </div>
      <div className={styles.tags}>
        {tags.join(', ')}
      </div>
      <div className={styles.description}>
          {description}
      </div>
      <div className={styles.rating}>
        <RatingSection ratings={rating} comments={commentCount} questions={questionCount}/>
      </div>

      </Stack>
    </div>
  );
};

export default QuizPreview;
