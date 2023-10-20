"use client";

import React, { useEffect, useState } from 'react';
import QuizInfo from "@components/QuizInfo"; // Asegúrate de que quizInfo no utilice useRouter
import ResponsiveAppBar from "@components/ResponsiveAppBar";
import { useParams, useRouter } from "next/navigation"; // Importa useRouter aquí
import axios from "axios";
import API_URL from '@root/config';
import { Slide, Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";
import styles from '../../../../styles/QuizComents.module.css';
import Cookies from "js-cookie";

const quizSolve = () => {
    const [quizData, setQuizData] = useState(null);
    const router = useRouter(); // Utiliza useRouter aquí
    const token = Cookies.get("jwt") ? Cookies.get("jwt") : undefined;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const params = useParams();
    const id = params.id;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const response = await axios.get(API_URL + "/quiz/" + id, config);

                if (response.status === 200) {
                    setQuizData(response.data);
                }
            } catch (error) {
                setMessage('Hubo un error al buscar la información del quiz');
                setOpen(true);
            }
        };

        fetchData();
    }, [id]);

    if (quizData === null) return (<div></div>);

    return (
        <div>
            <ResponsiveAppBar />
            <br></br>
            <div className={styles.componentBox}>
                <QuizInfo {...quizData} shouldShowStartButton={router.pathname === "/quiz/5/details"} /> {/* Pasa la condición shouldShowStartButton */}
            </div>
            <br></br>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default quizSolve;
