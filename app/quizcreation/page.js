import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import React from "react";
import QuizQuestion from "@/components/QuizQuestion";
import Image from "next/image";
import styles from '../../styles/QuizCreatorPage.module.css';


const CreationPage = () => {
    return (
        <div>
            <ResponsiveAppBar/>
            <br/>
            <div className={styles.quizQuestionContainer}>
                <QuizQuestion/>
            </div>
        </div>
    )
}
export default CreationPage;