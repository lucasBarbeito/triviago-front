"use client";
import React from 'react';
import { Stack } from '@mui/material';
import styles from '../styles/QuizInfo.module.css';
import RatingSection from './RatingSection';
import { Inter } from 'next/font/google';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const inter = Inter({ subsets: ['latin'] });

const QuizInfo = ({ id, title, tags, createdAt, description, rating, questionCount, owner }) => {
  return (
    <>
    <div className={`${styles.container} ${inter.className}`} >
        <Stack spacing={1.75} sx={{ height: '100%' }}>
            <div className={styles.info} >
                <Stack spacing={0.75} sx={{ height: '100%' }}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.date}>
                        <button className={styles.saveButton} onClick={()=>{alert('click')}}>
                        <FontAwesomeIcon icon={faBookmark} style={{height: '1.1rem', marginTop: 8}}/>
                        </button>
                    </div>
                </div>
                    {tags&&(<div className={styles.tags}>
                        {tags.join(', ')}
                    </div>)}
                <div className={styles.description}>
                    {description}
                </div>
                </Stack>
            </div>
            <div className={styles.divisor}/>
            <div className={styles.ownerData}>
                Creado el {createdAt} por {owner}.
            </div>
            <div className={styles.divisor}/>        
            <div className={styles.rating}>
                <RatingSection ratings={rating} questions={questionCount} startButton={true}/>
            </div>
        </Stack>
    </div>
    </>
  );
};

export default QuizInfo;
