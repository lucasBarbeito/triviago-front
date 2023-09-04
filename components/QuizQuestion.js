"use client";

import React, {useState} from 'react';
import styles from '../styles/QuizQuestion.module.css';
import Image from "next/image";

const QuizQuestion = ({deleteFunction}) => {
    const [multplCorrect, setMultplCorrect] = useState(false);
    const [answers, setAnswers] = useState([{ text: '', type: 'radio', isCorrect: false }]);
    const [currAnswer, setCurrAnswer] = useState("");
    const [isCorrectCurr, setIsCorrectCurr] = useState(false)

    function changeMultplCorrect(){
        setMultplCorrect(!multplCorrect)
    }

    function addAnswer() {
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

    function handleAnswerTextChange(newText) {
        setCurrAnswer(newText)
    }

    function correctHandler (){
        setIsCorrectCurr(!isCorrectCurr)
    }

    function correctAmount() {
        return answers.filter((answer) => answer.isCorrect).length;
    }

    function indexCorrectHandler(index) {
        const updatedAnswers = [...answers];
        const answerToUpdate = updatedAnswers[index];

        if (answerToUpdate) {
            answerToUpdate.isCorrect = !answerToUpdate.isCorrect;
            setAnswers(updatedAnswers);
        }
    }

    return(
        <div className={styles.containerQuestion}>
            <div className={styles.questionBox}>
                <div className={styles.interiorBox}>
                    <p className={styles.title}>Pregunta</p>
                    <input className={styles.questionInput} placeholder={"Pregunta..."}></input>
                    <div className={styles.columnAnswer}>
                        <p className={styles.titleAnsw}>Respuestas</p>
                        <div className={styles.interiorColumn}>
                            <p className={styles.text}>Múltiples respuestas correctas</p>
                            {multplCorrect || correctAmount()>1 ? <Image src="/assets/images/activeSwitch.png" alt={""} width={"34"} height={"18"} onClick={changeMultplCorrect}/>
                                : <Image src="/assets/images/notActiveSwitch.png" alt={""} width={"34"} height={"18"} onClick={changeMultplCorrect}/>}
                        </div>
                    </div>
                    <div className={styles.answerContainer}>
                        {answers.map((answer, index) => (
                            <div>
                                {(index > 0) && (<div key={index} className={styles.answerField}>
                                    <div className={styles.bulletPointContainer}>
                                        {answer.isCorrect ?
                                            <Image src="/assets/images/correct.png" alt={""} width={"24"} height={"24"} onClick={()=>indexCorrectHandler(index)}/> :
                                            <Image src="/assets/images/notCorrect.png" alt={""} width={"24"} height={"24"} onClick={() => indexCorrectHandler(index)}/>
                                        }
                                        <p className={styles.text}>{answer.text}</p>
                                    </div>
                                    <Image src="/assets/images/DeleteQuestion.png" alt={""} width={"28"} height={"28"} onClick={() => removeAnswer(index)} />
                                </div>)}
                            </div>
                        ))}
                        <div className={styles.newAnswer}>
                            <div className={styles.bulletPointContainer}>
                                {isCorrectCurr ?
                                    <Image src="/assets/images/correct.png" alt={""} width={"24"} height={"24"} onClick={correctHandler}/> :
                                    <Image src="/assets/images/notCorrect.png" alt={""} width={"24"} height={"24"} onClick={correctHandler}/>
                                }
                                <input
                                    className={styles.answerInput}
                                    placeholder="Respuesta..."
                                    value = {currAnswer}
                                    onChange={(e) => handleAnswerTextChange(e.target.value)}
                                />
                            </div>
                            <Image src="/assets/images/CheckCircle.png" alt={""} width={"24"} height={"24"} onClick={addAnswer}/>
                        </div>
                        <div className={styles.line}/>
                    </div>
                </div>
            </div>
            <div className={styles.deleteQuestion}>
                <Image src="/assets/images/DeleteQuestion.png" alt={""} width={"36"} height={"36"} onClick={deleteFunction}/>
            </div>
        </div>
    )


}
export default QuizQuestion;