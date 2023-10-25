"use client"
import React, {useEffect, useState} from 'react';
import LoginPage from "../../../login/page";
import QuizComents from "../../../../components/QuizComents";
import QuizInfo from "../../../../components/QuizInfo";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../../../styles/QuizComents.module.css';
import axios from "axios";
import {useParams, useRouter} from 'next/navigation';
import {useRequestService} from "@/service/request.service";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";


const ResultPage = () => {
    const [quiz, setQuiz] = useState({});
    const router = useRouter();
    const { id } = useParams();

    const service = useRequestService()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const [saved, setSaved] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const fetchQuiz = () => {
        const apiUrl = `http://localhost:8080/quiz/${id}`;
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(apiUrl, axiosConfig)
            .then((response) => {
                return response.data
                // setQuiz(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const getSavedQuizzes = () => {
        service.getSavedQuizzes()
            .then(savedQuizzes => {
                setSaved(savedQuizzes.some(quiz => quiz.id === id))
                console.log(savedQuizzes)
                console.log(quiz.id)
                console.log(savedQuizzes.some(quiz => quiz.id === id))
            }).catch(error => {
            console.error("Error getting saved quizzes:", error);
            setMessage("Error al cargar el quiz")
            setOpen(true)
        })
    }

    useEffect(() => {
        fetchQuiz()
            .then(quiz => {
                setQuiz(quiz)
                getSavedQuizzes()
            }).catch(error => {
            console.error("Error getting quiz:", error);
            })

    }, []);

    return (
        <div>
            <ResponsiveAppBar/>
            <br></br>
            <div className={styles.componentBox}>
                <QuizInfo {...quiz} saved={saved} setSaved={setSaved}/>

            </div>
            <br></br>
            <QuizComents/>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

        </div>
    );
};
export default ResultPage;