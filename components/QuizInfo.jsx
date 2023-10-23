"use client";
import React, {useEffect, useState} from 'react';
import { Stack } from '@mui/material';
import styles from '../styles/QuizInfo.module.css';
import RatingSection from './RatingSection';
import { Inter } from 'next/font/google';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRequestService} from "@/service/request.service";

const inter = Inter({ subsets: ['latin'] });

const QuizInfo = ({ id, title, labels, creationDate, description, rating, questions, author = "@example.com"}) => {

    const [comments, setComments] = useState([]);
    const service = useRequestService();

    useEffect(() => {
        service.fetchComments(id).then((commentsList) => {
            setComments(commentsList);
        }).catch((error) => {
            console.error('Error fetching comments:', error);
            setComments([]);
        });
    }, [id]);

    function formatDates(date) {
        const monthNames = [
            "enero", "febrero", "marzo", "abril",
            "mayo", "junio", "julio", "agosto",
            "septiembre", "octubre", "noviembre", "diciembre"
        ];
        if (date && date.length <= 3){
            const day = date[2].toString().padStart(2, '0');
            const month = monthNames[date[1] - 1];
            const year = date[0];
            return `${day} de ${month} de ${year}`;
        }
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
                    {labels&&(<div className={styles.tags}>
                        {labels?.join(', ')}
                    </div>)}
                <div className={styles.description}>
                    {description}
                </div>
                </Stack>
            </div>
            <div className={styles.divisor}/>
            <div className={styles.ownerData}>
                Creado el {formatDates(creationDate)} por {author?.email}
            </div>
            <div className={styles.divisor}/>        
            <div className={styles.rating}>
                <RatingSection ratings={rating} questions={questions.length} comments={comments.length} id={id} showButton={true}/>
            </div>
        </Stack>
    </div>
    </>
  );
};

export default QuizInfo;
