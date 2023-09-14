"use client"

import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import React, {useState} from "react";
import QuizQuestion from "@/components/QuizQuestion";
import styles from '../../styles/QuizCreatorPage.module.css';
import QuizCreatorInfo from "@/components/QuizCreatorInfo";
import Image from "next/image";
import axios from "axios";
import API_URL from "@/config";
import { useRouter } from "next/navigation";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";


const CreationPage = () => {
    const token = localStorage.getItem("token");
    const router = useRouter();
    const [id, setId] = useState();

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [questions, setQuestions] = useState([]);
    const [counter, setCounter] = useState(0)

    function addQuestion(question) {
        const updatedArray = [...questions,{id:counter, question:question}]
        setCounter(counter+1)
        setQuestions(updatedArray)
    }

    function removeQuestion(pos) {
        const updatedArray = questions.filter((question)=> {
            return question.id !== pos;
        })
        setQuestions(updatedArray);
    }

    const mappedQuestions = questions.map((question, index) =>
        {return (
            <div key={question.id} className={styles.answerField}>
                          <QuizQuestion deleteFunction={removeQuestion} index={question.id}/>
            </div>
        )}

    )

    const createQuiz = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Token en el header
                },
                body: {
                    "title": "'Quiz 1'",
                    "description": "primer ejemplo de quiz",
                    "userId": "1",
                    "isPrivate": false,
                    "labels": [],
                    "questions": []
                }
            };
            const response = await axios.get(API_URL + "/quiz", config);

            if (response.status === 200) {
                setId(response.data.id);
                router.push(`/${id}/details`)            }
        } catch (error) {
            setMessage('Hubo un error al buscar la información del quiz')
            setOpen(true)
        }
    };
    return (
        <div>
            <ResponsiveAppBar/>
            <br/>
            <div className={styles.quizQuestionContainer}>
                <QuizCreatorInfo/>
                {questions.length !== 0 ?
                    mappedQuestions
                    : null}
                <div className={styles.addAnswerContainer} onClick={addQuestion}>
                    <Image src="/assets/images/addQuestionLogo.png" alt={""} width={"24"} height={"24"}/>
                    <p className={styles.addAnswerText}>Agregar pregunta</p>
                </div>
                <button className={styles.buttonCreate}>Crear quiz</button>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default CreationPage;