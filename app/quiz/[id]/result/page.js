"use client"

import QuizResults from "@/components/QuizResults";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../../../styles/QuizResultPage.module.css';
import React, {useEffect, useState} from "react";


const QuizResultPage = () => {

    const [id, setId] = useState(0)
    useEffect(() => {
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        const lastSegment = parts[parts.length - 2]; // Accede al penúltimo segmento
        const auxId = parseInt(lastSegment, 10);
        console.log('Valor de auxId:', auxId);
        setId(auxId);
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <br></br>
            <div className={styles.componentBox}>
                <QuizResults quizId={id} />
            </div>
        </div>

    );
};
export default QuizResultPage;