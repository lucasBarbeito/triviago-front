"use client";
import React from 'react';
import {Stack} from '@mui/material';
import styles from '../styles/QuizInfo.module.css';
import RatingSection from './RatingSection';
import {Inter} from 'next/font/google';
import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const inter = Inter({ subsets: ['latin'] });

const QuizInfo = (props) => {
    const { id, title, description, creationDate, rating, invitationCode, isPrivate, questions, labels, authorEmail } = props;
    const formattedDate = creationDate ? formatDateString(creationDate[0], creationDate[1], creationDate[2]) : null;
    function formatDateString(year, month, day) {
        // Create a Date instance with the provided values
        const date = new Date(year, month - 1, day);

        // Get the name of the month
        const monthName = date.toLocaleString('en-US', { month: 'long' });

        // Format the day with leading zero if it's less than 10
        const formattedDay = day < 10 ? `0${day}` : day;

        // Get the year
        const yearNumber = date.getFullYear();

        // Build the formatted date string
        return `${formattedDay} of ${monthName} ${yearNumber}`;
    }

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
                    {labels &&(<div className={styles.tags}>
                        {labels.join(', ')}
                    </div>)}
                <div className={styles.description}>
                    {description}
                </div>
                </Stack>
            </div>
            <div className={styles.divisor}/>
            <div className={styles.ownerData}>
                Creado el {formattedDate} por {authorEmail}.
            </div>
            <div className={styles.divisor}/>        
            <div className={styles.rating}>
                <RatingSection ratings={rating} questions={questions? questions.length : 0} startButton={true}/>
            </div>
        </Stack>
    </div>
    </>
  );
};

export default QuizInfo;
