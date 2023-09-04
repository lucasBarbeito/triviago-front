import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import React from "react";
import QuizQuestion from "@/components/QuizQuestion";
import Image from "next/image";
import styles from '../../styles/QuizCreatorPage.module.css';


const CreationPage = () => {
import QuizCreatorInfo from "@/components/QuizCreatorInfo";
import React from "react";

const CreationPage = () => {

    return (
        <div>
            <ResponsiveAppBar/>
            <br/>
            <div className={styles.quizQuestionContainer}>
                <QuizQuestion/>
            </div>
            <QuizCreatorInfo/>
        </div>
    )
}
export default CreationPage;