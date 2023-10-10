"use client"

import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import React, {useState} from "react";
import QuizQuestion from "@/components/QuizQuestion";
import styles from '../../styles/QuizCreatorPage.module.css';
import QuizCreatorInfo from "@/components/QuizCreatorInfo";
import Image from "next/image";

const CreationPage = () => {
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
        </div>
    )
}
export default CreationPage;