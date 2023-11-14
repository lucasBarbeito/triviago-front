'use client'
import React, {useEffect, useState} from 'react';
import styles from '../styles/UserProfile.module.css';
import Image from "next/image";
import {useRequestService} from "@/service/request.service";

const UserProfile = ({
                         myId,
                         firstName,
                         lastName,
                         email,
                         birthDate,
                         createdAt,
                         isCurrentUser
                     }) => {

    const [isFollowing, setIsFollowing] = useState(false);
    const service = useRequestService()
    const id = window.location.pathname.split('/').slice(-2, -1)[0];


    useEffect(() => {
        service.isFollowing(id)
            .then(user => {
                setIsFollowing(user.isFollowing);
            })
            .catch(error => {
                console.error("Error al verificar si el usuario sigue a otro usuario:", error);
            });
    }, [myId, id]);



    const onDeleteClick = () => {

    }

    const onFollowClick = () => {
        service.followUser(id)
            .then(response => {
                setIsFollowing(true);
            })
            .catch(error => {
                console.error(`Error al seguir al usuario con ID ${id}: ${error.message}`);
            });
    }

    const onUnfollowClick = () => {
        service.unFollowUser(id)
            .then(response => {
                setIsFollowing(false);
            })
            .catch(error => {
                console.error(`Error al dejar de seguir al usuario con ID ${id}: ${error.message}`);
            });
    }

    const parseDate = (date) => {

        const day = date[2];
        const month = date[1];
        const year = date[0];

        // Convierte el día a un número entero
        const dayNumber = parseInt(day, 10);

        const parsedDate = new Date(`${year}-${month}-${dayNumber}`);

        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const monthName = monthNames[parsedDate.getMonth()];

        return dayNumber + " de " + monthName + " del " + year; // Devuelve un arreglo en lugar de una cadena
    }


    return (
        <div className={styles.userInfoContainer}>
            <div className={styles.userBoxes}>
                <div className={styles.userAvatar}>
                    <Image
                        src="/assets/images/UserIconGray.png"
                        alt="usericon"
                        width={128}
                        height={128}
                    />

                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userInfoTitle}>{email}</p>
                    <div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{firstName + ' ' + lastName} </p>
                        {isCurrentUser && <Image
                            src="/assets/images/EditComment.png"
                            alt="editicon"
                            width={24}
                            height={24}
                        />
                        }
                    </div>
                    <div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{`${birthDate[2]}/${birthDate[1]}/${birthDate[0]}`}</p>
                        {isCurrentUser && <Image
                            src="/assets/images/EditComment.png"
                            alt="editicon"
                            width={24}
                            height={24}
                        />
                        }
                    </div>
                    <p className={styles.userInfoSubtitle}>{`Miembro desde el ${parseDate(createdAt)}`}</p>

                </div>
            </div>
            <div className={styles.userActions}>
                {isCurrentUser ? (
                    <button onClick={onDeleteClick} className={styles.userActionDeleteButton}>Eliminar cuenta</button>
                ) : (
                    isFollowing ? (
                        <button onClick={onUnfollowClick} className={styles.userActionFollowButton}>Dejar de
                            seguir</button>
                    ) : (
                        <button onClick={onFollowClick} className={styles.userActionFollowButton}>Seguir</button>
                    )
                )}
            </div>
        </div>
    );
};

export default UserProfile;
