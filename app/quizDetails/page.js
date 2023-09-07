import React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import QuizDetails from '@/components/QuizDetails';

const MyQuizComponent = () => {
  const question1 = "Pregunta 1";
  const answers1 = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
  ];

  const question2 = "Pregunta 2";
  const answers2 = [
    "Lionel ",
    "Andrés",
    "Messi",
    "Cuccittini"
  ];

  const multipleCorrectAnswers = true; // true = multiple, false = 1 sola respuesta correcta

  return (
    <div>
      <ResponsiveAppBar />
      <QuizDetails question={question1} answers={answers1} multipleCorrectAnswers={false} />
      <QuizDetails question={question2} answers={answers2} multipleCorrectAnswers={multipleCorrectAnswers} />
    </div>
  );
};

export default MyQuizComponent;
