"use client"

import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import React, {useState} from "react";
import QuizQuestion from "@/components/QuizQuestion";
import styles from '../../styles/QuizCreatorPage.module.css';
import QuizCreatorInfo from "@/components/QuizCreatorInfo";
import Image from "next/image";

const CreationPage = () => {
    const [questions, setQuestions] = useState([{ text: '', type: 'radio'}]);

    function addQuestion() {
        if(currAnswer.length > 0){
            setAnswers([...answers, { text: currAnswer, type: multplCorrect ? 'checkbox' : 'radio' , isCorrect: isCorrectCurr}]);
            setCurrAnswer("")
            setIsCorrectCurr(false)
        }
    }

    function removeAnswer(index) {
        const updatedAnswers = [...answers];
        updatedAnswers.splice(index, 1);
        setAnswers(updatedAnswers);
    }
    return (
        <div>
            <ResponsiveAppBar/>
            <br/>
            <div className={styles.quizQuestionContainer}>
                <QuizCreatorInfo/>
                <QuizQuestion/>
                {questions.map((question, index) => (
                    <div>
                        {(index > 0) && (<div key={index} className={styles.answerField}>
                            <QuizQuestion/>
                        </div>)}
                    </div>
                ))}

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