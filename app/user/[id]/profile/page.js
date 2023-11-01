'use client'
import React, {useEffect, useState} from 'react';
import UserProfile from '@/components/UserProfile';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import style from '@/styles/UserPage.module.css';
import TabBar from "@/components/TabBar";
import QuizPreview from "@/components/QuizPreview";
import {useRequestService} from "@/service/request.service";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import TittleQuizzes from "@/components/TittleQuizzes";
import {useRouter} from "next/navigation";

const Page = () => {

    const service = useRequestService()
    const router = useRouter()
    const [userId, setUserId] = useState('0')
    const [quizzes, setQuizzes] = useState([]);
    const [tokenId, setTokenId] = useState('1')
    const [currentUser, setCurrentUser] = useState({email: 'usuario@mail.com',
                                                                   firstName: 'Nombre',
                                                                   lastName: 'Apellido',
                                                                   birthDate: '04/07/1999',
                                                                   createdDate: '05/06/2023'})

    useEffect(() => {
        const id = window.location.pathname.split('/')[2]
        const data = jwt.decode(Cookies.get('jwt'))
        const quizUserFilter = {
            userId : id
        }
        setUserId(id)
        setTokenId(data.id)

        service.getUserInformation(id).then(user => {
            setCurrentUser(user)
            }).catch(error => {
                if(error.response && (error.response.status === 404 || error.response.status === 500)) {
                    router.push("/not-found")
                }
                console.error("Error", error);
            })
    }, [userId]);

    if(currentUser === null) return (<div></div>)

    return (
        <div className={style.wrapper}>
            <ResponsiveAppBar/>
            { currentUser && <UserProfile
                                        email={currentUser.email}
                                        firstName={currentUser.firstName}
                                        lastName={currentUser.lastName}
                                        birthDate={currentUser.birthDate}
                                        createdAt={currentUser.createdDate??[2002,4,5]}
                                        isCurrentUser={tokenId.toString() === userId} />
            }

            { tokenId.toString() === userId ? (
                <>
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
                </>
                ) : (
                <TittleQuizzes/>
                )
            }

        </div>
    );
};

export default Page;
