import React, {useEffect, useState} from 'react';
import { Stack } from '@mui/material';
import styles from '../styles/QuizPreview.module.css';
import RatingSection from './RatingSection';
import { Inter } from 'next/font/google';
import {useRouter} from "next/navigation";
import {useRequestService} from "@/service/request.service";

const inter = Inter({ subsets: ['latin'] });

const QuizPreview = ({ id, title, labels, creationDate, description, rating, questionCount=10, questions, commentCount=10 }) => {
    const router = useRouter()
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

    const handleQuizClick = (quizId) => {
        router.push(`/quiz/${quizId}/details`)
    }
    return (
        <div className={`${styles.container} ${inter.className}`} onClick={() => {handleQuizClick(id)}}>
            <Stack spacing={0.75} sx={{height: '100%'}}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.date}>
                        {creationDate.toString().replace(/,/g, '/')}
                    </div>
                </div>
                <div className={styles.tags}>
                    {labels?.join(', ')}
                </div>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.rating}>
                    <RatingSection ratings={rating} comments={comments.length} questions={questions?.length} id={id} showButton={false}/>
                </div>

            </Stack>
        </div>
    );
};

export default QuizPreview;
