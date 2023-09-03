"use client";

import React, { useState } from 'react';
import { Pagination, Box, Container, Grid, Stack, Item } from '@mui/material';
import QuizPreview from '@/components/QuizPreview';
import styles from '@/styles/HomeScreen.module.css';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import QuizFilter from "@/components/QuizFilter";
import PrivateQuizSearcher from "@/components/PrivateQuizSearcher";
import {useRequestService} from "@/service/request.service";
import {router, useRouter} from "next/client";

const HomeScreen = () => {
    const quizData = {
        title: 'Título del quiz',
        tags: ['Etiqueta 1', 'Etiqueta 2'],
        createdAt: '01 / 06 / 2023',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        rating: 4.98,
        questionCount: 20,
        commentCount: 120,
    };

    const quizArray = [
        {
            id: 1,
            title: 'Título del quiz',
            tags: ['Etiqueta 1', 'Etiqueta 2'],
            createdAt: '01 / 06 / 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            rating: 4.98,
            questionCount: 20,
            commentCount: 120,
        },
        {
            id: 2,
            title: 'Geografía del Mundo',
            tags: ['Geografía', 'Educación'],
            createdAt: '06 / 02 / 2023',
            description: 'Descubre los continentes, países y capitales...',
            rating: 4.92,
            questionCount: 30,
            commentCount: 110,
        },
        {
            id: 3,
            title: 'Cine y Películas',
            tags: ['Cine', 'Entretenimiento'],
            createdAt: '03 / 15 / 2023',
            description: 'Pon a prueba tus conocimientos sobre el séptimo arte...',
            rating: 4.67,
            questionCount: 18,
            commentCount: 70,
        },
        {
            id: 4,
            title: 'Ciencia en el Siglo XXI',
            tags: ['Ciencia', 'Tecnología'],
            createdAt: '07 / 22 / 2023',
            description: 'Descubre los avances científicos más recientes...',
            rating: 4.85,
            questionCount: 22,
            commentCount: 95,
        },
        {
            id: 5,
            title: 'Literatura Clásica',
            tags: ['Literatura', 'Cultura'],
            createdAt: '04 / 10 / 2023',
            description: 'Sumérgete en las obras literarias más influyentes...',
            rating: 4.78,
            questionCount: 28,
            commentCount: 120,
        },
        {
            id: 6,
            title: 'Deportes del Mundo',
            tags: ['Deportes', 'Entretenimiento'],
            createdAt: '08 / 05 / 2023',
            description: 'Demuestra cuánto sabes sobre diferentes deportes...',
            rating: 4.60,
            questionCount: 15,
            commentCount: 60,
        },
        {
            id: 7,
            title: 'Música en la Historia',
            tags: ['Música', 'Cultura'],
            createdAt: '09 / 18 / 2023',
            description: 'Explora la evolución de la música a lo largo de los años...',
            rating: 4.90,
            questionCount: 20,
            commentCount: 100,
        },
        {
            id: 8,
            title: 'Gastronomía Global',
            tags: ['Gastronomía', 'Cultura'],
            createdAt: '10 / 30 / 2023',
            description: 'Descubre platos deliciosos de todo el mundo...',
            rating: 4.95,
            questionCount: 24,
            commentCount: 80,
        },
        {
            id: 9,
            title: 'Aventuras Naturales',
            tags: ['Naturaleza', 'Viajes'],
            createdAt: '11 / 08 / 2023',
            description: 'Explora los destinos naturales más asombrosos...',
            rating: 4.88,
            questionCount: 16,
            commentCount: 75,
        },
        {
            id: 10,
            title: 'Tecnología Innovadora',
            tags: ['Tecnología', 'Ciencia'],
            createdAt: '12 / 14 / 2023',
            description: 'Descubre las últimas tendencias tecnológicas...',
            rating: 4.82,
            questionCount: 26,
            commentCount: 105,
        },
        {
            id: 11,
            title: 'Aventuras en las Profundidades Marinas',
            tags: ['Naturaleza', 'Exploración'],
            createdAt: '01 / 10 / 2023',
            description: 'Explora los misterios y maravillas que aguardan en los océanos...',
            rating: 4.75,
            questionCount: 25,
            commentCount: 85,
        },
        {
            id: 12,
            title: 'Maravillas Arquitectónicas del Mundo',
            tags: ['Arquitectura', 'Historia'],
            createdAt: '02 / 18 / 2023',
            description: 'Descubre las estructuras más impresionantes creadas por la humanidad...',
            rating: 4.88,
            questionCount: 32,
            commentCount: 120,
        },
        {
            id: 13,
            title: 'Gastronomía Étnica: Sabores del Mundo',
            tags: ['Gastronomía', 'Cultura'],
            createdAt: '03 / 05 / 2023',
            description: 'Deléitate con los platos tradicionales de diferentes culturas...',
            rating: 4.95,
            questionCount: 18,
            commentCount: 70,
        },
        {
            id: 14,
            title: 'Grandes Pintores y sus Obras Maestras',
            tags: ['Arte', 'Historia'],
            createdAt: '04 / 15 / 2023',
            description: 'Admira las creaciones artísticas más icónicas de la historia...',
            rating: 4.82,
            questionCount: 24,
            commentCount: 110,
        },
        {
            id: 15,
            title: 'Misterios de la Civilización Maya',
            tags: ['Historia', 'Arqueología'],
            createdAt: '05 / 22 / 2023',
            description: 'Descubre los enigmas y logros de esta antigua cultura...',
            rating: 4.70,
            questionCount: 20,
            commentCount: 90,
        },
        {
            id: 16,
            title: 'Viaje a la Época de los Dinosaurios',
            tags: ['Paleontología', 'Educación'],
            createdAt: '06 / 01 / 2023',
            description: 'Explora la vida prehistórica y las criaturas que la habitaron...',
            rating: 4.90,
            questionCount: 28,
            commentCount: 150,
        },
        {
            id: 17,
            title: 'Música y Culturas: Un Viaje Sonoro',
            tags: ['Música', 'Cultura'],
            createdAt: '07 / 10 / 2023',
            description: 'Descubre la diversidad musical de distintas partes del mundo...',
            rating: 4.75,
            questionCount: 25,
            commentCount: 85,
        },
        {
            id: 18,
            title: 'Deportes Extremos en Lugares Insólitos',
            tags: ['Deportes', 'Aventura'],
            createdAt: '08 / 18 / 2023',
            description: 'Adéntrate en las competiciones y desafíos más extremos...',
            rating: 4.88,
            questionCount: 32,
            commentCount: 120,
        },
        {
            id: 19,
            title: 'Descubrimientos Científicos ',
            tags: ['Ciencia', 'Tecnología'],
            createdAt: '09 / 05 / 2023',
            description: 'Explora los avances que han transformado nuestra comprensión del mundo...',
            rating: 4.95,
            questionCount: 18,
            commentCount: 70,
        },
        {
            id: 20,
            title: 'Cine de Ciencia Ficción: Más Allá de la Realidad',
            tags: ['Cine', 'Ciencia Ficción'],
            createdAt: '10 / 15 / 2023',
            description: 'Analiza las películas que han explorado futuros alternativos...',
            rating: 4.82,
            questionCount: 24,
            commentCount: 110,
        },
        {
            id: 21,
            title: 'Viaje por Rutas Legendarias',
            tags: ['Viajes', 'Aventura'],
            createdAt: '11 / 22 / 2023',
            description: 'Recorre las rutas que han dejado huella en la historia y la imaginación...',
            rating: 4.70,
            questionCount: 20,
            commentCount: 90,
        },
        {
            id: 22,
            title: 'Mitos y Leyendas del Antiguo Egipto',
            tags: ['Historia', 'Mitología'],
            createdAt: '12 / 01 / 2023',
            description: 'Sumérgete en las historias que han perdurado a lo largo de los siglos...',
            rating: 4.90,
            questionCount: 28,
            commentCount: 150,
        },
        {
            id: 23,
            title: 'Exploración Espacial: Más Allá de la Luna',
            tags: ['Astronomía', 'Exploración'],
            createdAt: '01 / 10 / 2024',
            description: 'Descubre los logros y desafíos de la exploración espacial...',
            rating: 4.75,
            questionCount: 25,
            commentCount: 85,
        },
        {
            id: 24,
            title: 'Tesoros Arqueológicos del Mundo',
            tags: ['Arqueología', 'Historia'],
            createdAt: '02 / 18 / 2024',
            description: 'Explora los descubrimientos que nos conectan con el pasado...',
            rating: 4.88,
            questionCount: 32,
            commentCount: 120,
        },
        {
            id: 25,
            title: 'Sabores del Medio Oriente',
            tags: ['Gastronomía', 'Cultura'],
            createdAt: '03 / 05 / 2024',
            description: 'Degusta los platillos tradicionales y especias exquisitas...',
            rating: 4.95,
            questionCount: 18,
            commentCount: 70,
        },
        {
            id: 26,
            title: 'Grandes Esculturas de la Historia',
            tags: ['Arte', 'Historia'],
            createdAt: '04 / 15 / 2024',
            description: 'Admira las creaciones escultóricas que han perdurado en el tiempo...',
            rating: 4.82,
            questionCount: 24,
            commentCount: 110,
        },
        {
            id: 27,
            title: 'Misterios de la Atlántida',
            tags: ['Historia', 'Mitología'],
            createdAt: '05 / 22 / 2024',
            description: 'Explora los mitos y teorías que rodean a la legendaria Atlántida...',
            rating: 4.70,
            questionCount: 20,
            commentCount: 90,
        },
        {
            id: 28,
            title: 'Inventos Innovadores: Cambiando el Futuro',
            tags: ['Ciencia', 'Tecnología'],
            createdAt: '06 / 01 / 2024',
            description: 'Conoce las invenciones que han revolucionado nuestra manera de vivir...',
            rating: 4.90,
            questionCount: 28,
            commentCount: 150,
        },
        {
            id: 29,
            title: 'Cine Clásico: Joyas del Séptimo Arte',
            tags: ['Cine', 'Entretenimiento'],
            createdAt: '07 / 10 / 2024',
            description: 'Explora las películas que han dejado huella en la historia del cine...',
            rating: 4.75,
            questionCount: 25,
            commentCount: 85,
        },
        {
            id: 30,
            title: 'Maravillas Naturales del Mundo',
            tags: ['Naturaleza', 'Viajes'],
            createdAt: '08 / 18 / 2024',
            description: 'Descubre los paisajes naturales más impresionantes y cautivadores...',
            rating: 4.88,
            questionCount: 32,
            commentCount: 120,
        },
        {
            id: 31,
            title: 'Arte Contemporáneo: Expresiones Actuales',
            tags: ['Arte', 'Cultura'],
            createdAt: '09 / 05 / 2024',
            description: 'Explora las corrientes artísticas que definen nuestra época...',
            rating: 4.95,
            questionCount: 18,
            commentCount: 70,
        }
    ];

    const [value,setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onSubmit = () => {
        //const service = useRequestService()
        //service.findById(value).then(r => )
    }
    const [currentPage, setCurrentPage] = useState(1);
    const quizzesPerPage = 10; // Cambiar el número de parkings por página según tus necesidades
    const {quizzesQuantity, setQuizzesQuantity} = useState(quizArray.length)
    const lastIndex = currentPage * quizzesPerPage;
    const firstIndex = lastIndex - quizzesPerPage;
    const currentQuizzes = quizArray.slice(firstIndex, lastIndex);

    return (
    <div className={styles.wrapper}>
        <ResponsiveAppBar/>
        <div className={styles.content}>
            <button className={styles.button} onClick={()=>{alert('Add a new Quiz')}}>+</button>
        <div className={styles.columns}>
            <div className={styles.left}>
                <PrivateQuizSearcher/>
                <br/>
                <QuizFilter/>
            </div>
            <div className={styles.center}>
                <div className={styles.quizzes}>
                    {currentQuizzes.map((quiz, index) => (
                        <div key={`${index}-${quiz.title}`} className={styles.quizItem}>
                            <QuizPreview {...quiz} />
                        </div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        count={Math.ceil(quizArray.length / quizzesPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        variant="outlined"
                    />
                </div>
            </div>
            {/*<div className={styles.right}>Right</div>*/}
        </div>
        </div>

    </div>
    );
};

export default HomeScreen;