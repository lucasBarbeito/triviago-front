"use client";

import React, {useEffect, useState} from 'react';
import LoginPage from "../../../login/page";
import QuizComents from "../../../../components/QuizComents";
import QuizInfo from "../../../../components/QuizInfo";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import {useParams } from "next/navigation";
import axios from "axios";
import API_URL from '@root/config';
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";


import styles from '../../../../styles/QuizComents.module.css';

const ResultPage = () => {
    const [quizData, setQuizData] = useState(null);

    const token = localStorage.getItem("token");

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const params = useParams ();

    // Obtén el valor del parámetro 'id' de los parámetros de búsqueda
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
                        Authorization: `Bearer ${token}` // Token en el header
                    },
                    // body: {
                    //   mail: email // Nombre de usuario en el body
                    // }
                };
                const response = await axios.get(API_URL + "/quiz/" + id, config);

                if (response.status === 200) {
                    setQuizData(response.data);
                }
            } catch (error) {
                setMessage('Hubo un error al buscar la información del quiz')
                setOpen(true)
            }
        };

        // Llamar a la función de carga de datos después de que la página se haya montado
        fetchData();
    }, [id]);

    return (
        <div>
            <ResponsiveAppBar/>
            <br></br>
            <div className={styles.componentBox}>
                <QuizInfo {...quizData}/>

            </div>
            <br></br>
            <QuizComents/>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default ResultPage;
