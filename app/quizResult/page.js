import QuizResults from "@/components/QuizResults";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../styles/QuizResultPage.module.css';
import React from "react";


const QuizResultPage = () => {

    return (
        <div>
            <ResponsiveAppBar />
            <br></br>
            <div className={styles.componentBox}>
                <QuizResults />
            </div>
        </div>

    );
};
export default QuizResultPage;