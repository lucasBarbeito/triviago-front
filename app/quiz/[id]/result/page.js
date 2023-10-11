"use client"

import QuizResults from "@/components/QuizResults";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../../../styles/QuizResultPage.module.css';
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";

const QuizResultPage = () => {

    const params = useParams ();
    // obtiene el id de los parámetros de búsqueda (url)
    const id = params.id;

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