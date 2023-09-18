"use client";

import React, {useEffect, useState} from 'react';
import QuizComents from "@components/QuizComents";
import QuizInfo from "@components/QuizInfo";
import ResponsiveAppBar from "@components/ResponsiveAppBar";
import {useParams } from "next/navigation";
import axios from "axios";
import API_URL from '@root/config';
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {useRequestService} from "@/service/request.service";


import styles from '../../../../styles/QuizComents.module.css';

const ResultPage = () => {
    const [quizData, setQuizData] = useState(null);

    const token = localStorage.getItem("token");

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const service = useRequestService()
    const params = useParams ();

    // obtiene el id de los parámetros de búsqueda (url)
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
                };
                const response = await axios.get(API_URL + "/quiz/" + id, config);

                if (response.status === 200) {
                    const data = response.data;
                    // Copiar todos los datos excepto 'author' en newData
                    const newData = { ...data };
                    delete newData.author; // Eliminar la propiedad 'author' de newData
                    setQuizData(newData);
                    newData.authorEmail = data.author.email;
                }
            } catch (error) {
                setMessage('Hubo un error al buscar la información del quiz')
                setOpen(true)
            }
        };

        // service.getQuizData()
        //     .then(()=>{
        //         setQuizData(response.data);
        //     })
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
