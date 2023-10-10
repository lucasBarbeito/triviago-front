'use client'
import React, {useState} from 'react';
import UserProfile from '@/components/UserProfile';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import style from '@/styles/UserPage.module.css';
import TabBar from "@/components/TabBar";
import QuizPreview from "@/components/QuizPreview";
import QuizInfo from "@/components/QuizInfo";

const Page = () => {

    const currentUser = {
        email: 'usuario@mail.com',
        firstName: 'Nombre',
        lastName: 'Apellido',
        birthDate: '04/07/1999',
        createdAt: '05/06/2023'
    };

    const [quizzes, setQuizzes] = useState([{id:1, title: 'Quiz', labels: [], creationDate:'04/04/2002', description:'lalala', rating:10, author: 'yo', questions:[]}]);

    return (
            <div className={style.wrapper}>
                <ResponsiveAppBar/>

                <UserProfile
                    email={currentUser.email}
                    firstName={currentUser.firstName}
                    lastName={currentUser.lastName}
                    birthDate={currentUser.birthDate}
                    createdAt={currentUser.createdAt}
                    isCurrentUser={true}
                />

                <TabBar/>

                <div className={style.quizzesContainer}>
                    {quizzes.map((quiz) => (
                        <QuizPreview id={quiz.id}
                                     title={quiz.title}
                                     labels={quiz.labels}
                                     creationDate={quiz.creationDate}
                                     description={quiz.description}
                                     rating={quiz.rating}
                                     author={quiz.author}
                                     questions={quiz.questions}/>
                    ))}
                </div>
            </div>
    );
};

export default Page;
