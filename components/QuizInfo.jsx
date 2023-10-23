"use client";
import React, {useState} from 'react';
import {Slide, Snackbar, Stack} from '@mui/material';
import styles from '../styles/QuizInfo.module.css';
import RatingSection from './RatingSection';
import { Inter } from 'next/font/google';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRequestService} from "@/service/request.service";
import {Alert} from "@mui/lab";


const inter = Inter({ subsets: ['latin'] });

const QuizInfo = ({ id, title, tags, creationDate, description, rating, questionCount=10, author = "@example.com"}) => {

    const service = useRequestService()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const [saved, setSaved] = useState(false);


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

    function handleSaveQuiz(quizId) {
        if (quizId !== null) {
            service.saveQuiz(quizId)
                .then(() => {
                    setSaved(!saved)
                }).catch(error => {
                    console.error("Error saving quiz:", error);
                    setMessage("Error al guardar el quiz")
                    setOpen(true)
                })
        } else {
            setMessage("Error al cargar el quiz");
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                        <button className={saved ? styles.saveButton : styles.saveButtonSaved} onClick={()=>{handleSaveQuiz(id)}}>
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
                Creado el {formatDates(creationDate)} por {author?.email}
            </div>
            <div className={styles.divisor}/>        
            <div className={styles.rating}>
                <RatingSection ratings={rating} questions={questionCount} startButton={true}/>
            </div>
        </Stack>
    </div>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    </>
  );
};

export default QuizInfo;
