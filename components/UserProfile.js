'use client'
import React from 'react';
import styles from '../styles/UserProfile.module.css';
import UserAvatarIcon from "@/components/UserAvatarIcon";
import EditIcon from "@/components/EditIcon";

const UserProfile = ({
                         firstName,
                         lastName,
                         email,
                         birthDate,
                         createdAt,
                         isCurrentUser
                         }) => {



    const onDeleteClick = () => {

    }

    const onFollowClick = () => {

    }

    const parseDate = (date) => {
        const dateParts = date.split('/');
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        const parsedDate = new Date(`${year}-${month}-${day}`);

        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const monthName = monthNames[parsedDate.getMonth()];

        return  `${day} de ${monthName} de ${year}`;
    }

    return (
        <div className={styles.userInfoContainer}>
            <div className={styles.userBoxes}>
                <div className={styles.userAvatar}>
                    <UserAvatarIcon />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userInfoTitle}>{email}</p>
                    <div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{firstName + ' ' + lastName } </p>
                        {isCurrentUser && <EditIcon/> }
                    </div>
                    <div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{birthDate}</p>
                        {isCurrentUser && <EditIcon/> }
                    </div>
                    <p className={styles.userInfoSubtitle}>{ `Miembro desde el ${parseDate(createdAt)}`}</p>

                </div>
            </div>
            <div className={styles.userActions}>
                {isCurrentUser ? (
                    <button onClick={onDeleteClick} className={styles.userActionDeleteButton}>Eliminar cuenta</button>
                ) : (
                    <button onClick={onFollowClick} className={styles.userActionFollowButton}>Seguir</button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
