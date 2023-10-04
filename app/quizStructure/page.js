import React, { useEffect, useState } from 'react';
import QuizResults from "@/components/QuizResults";
import QuizComents from "../../../../components/QuizComents";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '../../styles/QuizResultPage.module.css';
import axios from "axios";
import { useParams } from 'next/router';

const QuizStructurePage = () => {
    const [quiz, setQuiz] = useState({});
    const { id } = useParams();

    const fetchQuizz = () => {
        const apiUrl = `http://localhost:8080/quiz/${id}`;
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(apiUrl, axiosConfig)
            .then((response) => {
                setQuiz(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchQuizz();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <br></br>
            <div className={styles.componentBox}>
                <QuizResults />
            </div>
            <br></br>
            <div className={styles.componentBox}>
                <QuizComents />
            </div>
        </div>
    );
};

export default QuizStructurePage;
