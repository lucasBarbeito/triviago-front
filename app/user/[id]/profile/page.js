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
import FollowedUser from "@/components/FollowedUser";

const Page = () => {

    const service = useRequestService()
    const router = useRouter()
    const [userId, setUserId] = useState('0')
    const [quizzes, setQuizzes] = useState([]);
    const [followUsers, setFollowUsers] = useState([]);
    const [tokenId, setTokenId] = useState('1')
    const [currentUser, setCurrentUser] = useState(null)

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

        service.getUserFollowers(id).then(response => {
            console.log(response.followingList)
            setFollowUsers(response.followingList)
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
                                        myId ={tokenId}
                                        email={currentUser.email}
                                        firstName={currentUser.firstName}
                                        lastName={currentUser.lastName}
                                        birthDate={currentUser.birthDate}
                                        createdAt={currentUser.createdDate?? [2023, 9, 10]}
                                        isCurrentUser={tokenId.toString() === userId}
                                        userId={userId}
            />
            }

            { tokenId.toString() === userId ? (
                <>
                    <TabBar/>
                    {/*<div className={style.quizzesContainer}>*/}
                    {/*    {quizzes.map((quiz) => (*/}
                    {/*        <QuizPreview id={quiz.id}*/}
                    {/*                     title={quiz.title}*/}
                    {/*                     labels={quiz.labels}*/}
                    {/*                     creationDate={quiz.creationDate}*/}
                    {/*                     description={quiz.description}*/}
                    {/*                     rating={quiz.rating}*/}
                    {/*                     author={quiz.author}*/}
                    {/*                     questions={quiz.questions}/>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div className={style.quizzesContainer}>
                        {followUsers.map((user) => (
                            <FollowedUser email={user.email} lastname={user.lastName} name={user.firstName}/>//AGREGAR ACA UN ID DE USUARIO PARA REDIRECCION
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
