"use client";

import React from 'react';
import { Box, Container, Grid, Stack, Item } from '@mui/material';
import QuizPreview from '@/components/QuizPreview';
import styles from '@/styles/HomeScreen.module.css';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import QuizFilter from "@/components/QuizFilter";
import PrivateQuizSearcher from "@/components/PrivateQuizSearcher";


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
            title: 'Título del quiz',
            tags: ['Etiqueta 1', 'Etiqueta 2'],
            createdAt: '01 / 06 / 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            rating: 4.98,
            questionCount: 20,
            commentCount: 120,
        },
        {
            title: 'Geografía del Mundo',
            tags: ['Geografía', 'Educación'],
            createdAt: '06 / 02 / 2023',
            description: 'Descubre los continentes, países y capitales...',
            rating: 4.92,
            questionCount: 30,
            commentCount: 110,
        },
        {
            title: 'Cine y Películas',
            tags: ['Cine', 'Entretenimiento'],
            createdAt: '03 / 15 / 2023',
            description: 'Pon a prueba tus conocimientos sobre el séptimo arte...',
            rating: 4.67,
            questionCount: 18,
            commentCount: 70,
        },
        {
            title: 'Ciencia en el Siglo XXI',
            tags: ['Ciencia', 'Tecnología'],
            createdAt: '07 / 22 / 2023',
            description: 'Descubre los avances científicos más recientes...',
            rating: 4.85,
            questionCount: 22,
            commentCount: 95,
        },
        {
            title: 'Literatura Clásica',
            tags: ['Literatura', 'Cultura'],
            createdAt: '04 / 10 / 2023',
            description: 'Sumérgete en las obras literarias más influyentes...',
            rating: 4.78,
            questionCount: 28,
            commentCount: 120,
        },
        {
            title: 'Deportes del Mundo',
            tags: ['Deportes', 'Entretenimiento'],
            createdAt: '08 / 05 / 2023',
            description: 'Demuestra cuánto sabes sobre diferentes deportes...',
            rating: 4.60,
            questionCount: 15,
            commentCount: 60,
        },
        {
            title: 'Música en la Historia',
            tags: ['Música', 'Cultura'],
            createdAt: '09 / 18 / 2023',
            description: 'Explora la evolución de la música a lo largo de los años...',
            rating: 4.90,
            questionCount: 20,
            commentCount: 100,
        },
        {
            title: 'Gastronomía Global',
            tags: ['Gastronomía', 'Cultura'],
            createdAt: '10 / 30 / 2023',
            description: 'Descubre platos deliciosos de todo el mundo...',
            rating: 4.95,
            questionCount: 24,
            commentCount: 80,
        },
        {
            title: 'Aventuras Naturales',
            tags: ['Naturaleza', 'Viajes'],
            createdAt: '11 / 08 / 2023',
            description: 'Explora los destinos naturales más asombrosos...',
            rating: 4.88,
            questionCount: 16,
            commentCount: 75,
        },
        {
            title: 'Tecnología Innovadora',
            tags: ['Tecnología', 'Ciencia'],
            createdAt: '12 / 14 / 2023',
            description: 'Descubre las últimas tendencias tecnológicas...',
            rating: 4.82,
            questionCount: 26,
            commentCount: 105,
        }
    ];


    return (
    <div>
        <ResponsiveAppBar />
        <Box>
            <br></br>
            <PrivateQuizSearcher/>
            <br></br>
            <QuizFilter/>
            <Container>
                <QuizPreview {...quizData}/>
            </Container>
        </Box>
    </div>
    );
};

export default HomeScreen;