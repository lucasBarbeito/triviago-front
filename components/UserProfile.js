'use client'
import React, {useEffect, useState} from 'react';
import styles from '../styles/UserProfile.module.css';
import Image from "next/image";
import {useRequestService} from "@/service/request.service";

const UserProfile = ({firstName, lastName, email, birthDate, createdAt, isCurrentUser}) => { 
    
    const service = useRequestService();
                            
    const onDeleteClick = () => {

    }

    const onFollowClick = () => {

    }

    const formattedBirthDate = `${birthDate[2]}/${birthDate[1]}/${birthDate[0]}`;

    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
   
    const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
    const [editedBirthDate, setEditedBirthDate] = useState("");


    const currentDate = new Date();
    currentDate.setFullYear(2017);
    const formattedDate = currentDate.toISOString().split('T')[0];

    const handleEditName = () => {
        setIsEditingName(true);
        setEditedName(firstName);
        setEditedLastName(lastName);
    };

    const handleEditLastName = () => {
    setIsEditingName(true);
    setEditedName(firstName);
    setEditedLastName(lastName);
    };

const handleEditBirthDate = ({/*event*/}) => {
        setIsEditingBirthDate(true);
        setEditedBirthDate(birthDate);
        // setEditingBirthDate(event.target.value);
    }

      // Función para formatear la fecha para el backend
      const formatBirthDateForBackend = (date) => {
        return date.replace(/-/g, ''); // Quita guiones para el formato "2010/04/10"
      };

    const parseDate = (date) => {

        const day = date[2];
        const month = date[1];
        const year = date[0];

        const dayNumber = parseInt(day, 10);

        const parsedDate = new Date(`${year}-${month}-${dayNumber}`);

        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const monthName = monthNames[parsedDate.getMonth()];

        return dayNumber + " de " + monthName + " del " + year;
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
                    {isEditingName ? (
                    <div>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className={styles.editInput}
                        style={{ maxWidth: "200px", width: "100%" }}
                        placeholder="Introducir nombre:"
                    />
                    <input
                        type="text"
                        value={editedLastName}
                        onChange={(e) => {
                            setEditedLastName(e.target.value)
                        }}
                        className={styles.editInput}
                        style={{ maxWidth: "200px", width: "100%" }}
                        placeholder="Introducir apellido:"
                    />
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() => {
                                setIsEditingName(false);
                                setEditedName('');
                                setEditedLastName('');
                            }}
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button
                            className={styles.saveButton}
                            onClick={() => {
                                if (editedName.trim() === '' || editedLastName.trim() === '') { // Check if editedContent is not empty or only spaces
                                    handleEditComment(currentComment.id, editedContent);
                                    setCurrentComment((prevState) => ({
                                        ...prevState,
                                        content: editedContent,
                                    }));
                                    setIsEditing(false);
                                }
                            }}
                            disabled={editedName.trim() === '' || editedLastName.trim() === '' } // Disable the button if content is empty or only spaces
                            >
                                    Guardar
                                </button>
                        </div>
                     </div>) : (<div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{firstName + ' ' + lastName } </p>
                        {isCurrentUser && <Image
                                                src="/assets/images/EditComment.png"
                                                alt="editicon"
                                                onClick={isEditingName ? onSaveClick : handleEditName}
                                                width={24}
                                                height={24}
                                                />
                        }
                    </div>)}
                    
                    {isEditingBirthDate ? (
                        <div className={styles.labelContainer}>
                            <input
                                id="date"
                                type="date"
                                value={editedBirthDate}
                                className={styles.inputCalendar}
                                max={formattedDate}
                                onChange={(e) => setEditedBirthDate(e.target.value)}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                            <div className={styles.buttonContainer}>
                                <button
                                    onClick={() => {
                                        setIsEditingBirthDate(false);
                                        setEditedBirthDate('');
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditingBirthDate(false);
                                        setEditedBirthDate('');
                                    }}
                                    className={styles.saveButton}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.userInfoEditableContainer}>
                            <p className={styles.userInfoSubtitle}>{formattedBirthDate}</p>
                            {isCurrentUser && <Image
                                src="/assets/images/EditComment.png"
                                alt="editicon"
                                onClick={isEditingBirthDate ? onSaveClick : handleEditBirthDate}
                                width={24}
                                height={24}
                            />}
                        </div>
                    )}
                    
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