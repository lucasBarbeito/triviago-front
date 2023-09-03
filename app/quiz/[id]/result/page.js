import React from 'react';
import LoginPage from "../../../login/page";
import QuizComents from "../../../../components/QuizComents";
import QuizInfo from "../../../../components/QuizInfo";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../../../styles/QuizComents.module.css';

const ResultPage = () => {
    const quizData = {
        title: 'Título del quiz',
        tags: ['Etiqueta 1', 'Etiqueta 2'],
        createdAt: '01 / 06 / 2023',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        rating: 4.98,
        questionCount: 20,
        commentCount: 120,
    };
    return (
        <div>
            <ResponsiveAppBar/>
            <br></br>
            <div className={styles.componentBox}>
                <QuizInfo {...quizData}/>

            </div>
            <br></br>
            <QuizComents/>

        </div>
    );
};
export default ResultPage;
