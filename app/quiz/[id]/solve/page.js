"use client";
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "@components/ResponsiveAppBar";
import axios from "axios";
import API_URL from '@root/config';
import { Button, Slide, Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";
import styles from '../../../../styles/QuizComents.module.css';
import modalStyles from '../../../../styles/QuizInfo.module.css';
import Cookies from "js-cookie";
import QuizPreview from "@/components/QuizPreview";
import QuizQuestionAnswer from "@/components/QuizQuestionAnswer";
import QuizResolutionModal from "@/components/QuizResolutionModal";
import {useParams} from "next/navigation";
import {useRouter} from "next/router";

const quizSolve = () => {
    const [quizData, setQuizData] = useState(null);
    const token = Cookies.get("jwt") ? Cookies.get("jwt") : undefined;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const params = useParams();
    const id = params.id;

    const [showResolutionModal, setShowResolutionModal] = useState(false); // Add state to control the modal

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

    const handleSendResolution = () => {
        // Display the QuizResolutionModal when the "Enviar" button is clicked
        setShowResolutionModal(true);
    };

    const handleCancelResolution = () => {
        setShowResolutionModal(false);
    }

    if (quizData === null) return (<div></div>);

    return (
        <div>
            <ResponsiveAppBar />
            <br></br>
            <div className={styles.componentBox}>
                <QuizPreview {...quizData} />
                <br></br>
                <QuizQuestionAnswer />
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#00CC66' }}
                    onClick={handleSendResolution} // Call the function to display the modal
                >
                    Enviar
                </Button>
            </div>
            <br></br>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

            {showResolutionModal && (
                <div className={modalStyles.modalBackdrop}>
                    <QuizResolutionModal handleClose={handleCancelResolution} quizId={id} />
                </div>
            )}
        </div>
    );
};

export default quizSolve;
