import React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import QuizDetails from '@/components/QuizDetails';

const MyQuizComponent = () => {
    const question1 = "¿Cuál es la capital de Francia?";
    const answers1 = ["París", "Londres", "Madrid", "Berlín"];
    const question2 = "¿Cuál es el nombre de Messi?";
    const answers2 = ["Lionel", "Andrés", "Pedro", "Raul"];
    const multipleCorrectAnswers = true; // true = multiple, false = 1 sola respuesta correcta

    return (
        <div>
            <ResponsiveAppBar/>
            <QuizDetails question={question1} answers={answers1} multipleCorrectAnswers={false} />
            <QuizDetails question={question2} answers={answers2} multipleCorrectAnswers={multipleCorrectAnswers} />
        </div>
    );
};

export default MyQuizComponent;
