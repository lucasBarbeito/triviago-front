"use client"
import React, {useEffect, useState} from 'react';
import QuizComents from "@/components/QuizComents";
import QuizResults from "@/components/QuizResults";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from '@/styles/QuizComents.module.css';
import axios from "axios";
import {useParams, useRouter} from 'next/navigation';

const ResultPage = () => {
    const data = [
        {
            Usuario: 'usuario1@mail.com',
            Puntaje: '11 de 11',
            Fecha: '03/06/2023',
            Hora: '18:43',
            Posicion: '#1',
        },
        {
            Usuario: 'usuario2@mail.com',
            Puntaje: '9 de 11',
            Fecha: '03/06/2023',
            Hora: '09:12',
            Posicion: '#2',
        },
        {
            Usuario: 'usuario3@mail.com',
            Puntaje: '8 de 11',
            Fecha: '03/08/2023',
            Hora: '13:02',
            Posicion: '#3',
        }
    ];

    const [quiz, setQuiz] = useState({});
    const router = useRouter();
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
            <ResponsiveAppBar/>
            <br></br>
            <div className={styles.componentBox}>
            <QuizResults />
            </div>
            <br></br>
            <QuizComents />
        </div>
    );
};
export default ResultPage;