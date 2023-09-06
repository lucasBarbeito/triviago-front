"use client";

import React, {useEffect, useState} from 'react';
import LoginPage from "../../../login/page";
import QuizComents from "../../../../components/QuizComents";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { useRouter } from 'next/router';
import axios from "axios";
import API_URL from '@root/config';


const ResultPage = () => {
    const [quizData, setQuizData] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { id } = router.query; // Obtener el valor del parámetro id de la URL

            try {
                const response = await axios.get(API_URL + "/quiz/" + id);

                if (response.status === 200) {
                    setQuizData(response.data);
                }
            } catch (error) {
                alert(error);
            }
        };

        // Llamar a la función de carga de datos después de que la página se haya montado
        fetchData();
    }, [router.query]);

    return (
        <div>
            <ResponsiveAppBar />
            <QuizComents />
        </div>
    );
};
export default ResultPage;
