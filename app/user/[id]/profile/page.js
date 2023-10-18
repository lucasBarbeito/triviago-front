'use client'
import React, {useEffect, useState} from 'react';
import UserProfile from '@/components/UserProfile';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import style from '@/styles/UserPage.module.css';
import TabBar from "@/components/TabBar";
import QuizPreview from "@/components/QuizPreview";
import QuizInfo from "@/components/QuizInfo";
import {useRequestService} from "@/service/request.service";

const Page = () => {

    const service = useRequestService()
    const [userId, setUserId] = useState('0')
    const [quizzes, setQuizzes] = useState([{id:1, title: 'Quiz', labels: [], creationDate:'04/04/2002', description:'lalala', rating:10, author: 'yo', questions:[]}]);

    const [currentUser, setCurrentUser] = useState({email: 'usuario@mail.com',
                                                                        firstName: 'Nombre',
                                                                        lastName: 'Apellido',
                                                                        birthDate: '04/07/1999',
                                                                        createdDate: '05/06/2023'})


    useEffect(() => {
        const id = window.location.pathname.split('/')[2]
        setUserId(id)
        service.getUserInformation(id).then(commentsList => {
        setCurrentUser(commentsList)
        }).catch(error => {
            console.error("Error", error);

        })
    }, [userId]);


    return (
            <div className={style.wrapper}>
                <ResponsiveAppBar/>
                { currentUser &&
                <UserProfile
                    email={currentUser.email}
                    firstName={currentUser.firstName}
                    lastName={currentUser.lastName}
                    birthDate={currentUser.birthDate}
                    createdAt={currentUser.createdDate??[2002,4,5]}
                    isCurrentUser={true}
                />
                }
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
