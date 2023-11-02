'use client'
import React, {useEffect, useState} from 'react';
import styles from '../styles/UserProfile.module.css';
import Image from "next/image";
import {useRequestService} from "@/service/request.service";
import { Birthstone } from 'next/font/google';

const UserProfile = ({firstName, lastName, email, birthDate, createdAt, isCurrentUser}) => { 
    
    const service = useRequestService();
                            
    const onDeleteClick = () => {

    }

    const onFollowClick = () => {

    }

    const currentDate = new Date();
    currentDate.setFullYear(2017);
    const formattedDate = currentDate.toISOString().split('T')[0];

    const formattedBirthDate = `${birthDate[0]}/${birthDate[1]}/${birthDate[2]}`;

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(firstName);
    console.log(firstName);

    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [lastEditName, setLastEditName] = useState(lastName);

    const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
    const [EditBirthDate, setEditBirthDate] = useState(formattedBirthDate);

    const [message, setMessage] = useState("ERROR");
     
     const handleEditName = (event) => {
        setIsEditingName(true);
        setName(event.target.value);
     }

     const handleEditLastName = (event) => {
        setIsEditingLastName(true);
        setLastEditName(event.target.value);
     }

     const handleEditBirthDate = (event) => {
        setIsEditingBirthDate(true);
        setEditBirthDate(event.target.value);
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

    function cancelName() {
        setName("");
    }

    async function logName() {
        const trimmedName = name.trim();
        if (trimmedName !== "") {
            if (trimmedName.length <= 25) {
                const data = jwt.decode(Cookies.get('jwt'));
                const nameData = {
                    content: trimmedName,
                    userId: data.id,
                };

                const nam = await service.logName(nameData);
                setName((prevState) => {
                    if (Array.isArray(prevState)) {
                        return [...prevState, nam];
                    } else {
                        return [nam];
                    }
                });
                cancelName();
            } else {
                setMessage("El nombre no puede tener más de 25 caracteres");
                setIsEditingName(true);
            }
        } else {
            setMessage("El nombre no puede estar vacío");
            setIsEditingName(true);
        }
    }

    // function handleEditName(id, newName) {
    //     if (newName !== null) {
    //         if (newName <= 25) {
    //             service.editName(id, newName).then(() => {
    //                     setName(editedName);
    //                 });
    //             } else {
    //                 setMessage("El nombre no puede tener más de 25 caracteres");
    //                 setIsEditingName(true);
    //             }
    //         } else {
    //             setMessage("El nombre no puede estar vacío");
    //             setIsEditingName(true);
    //     }
    // }


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
                        id="name"
                        // value={firstName}
                        onChange={handleEditName}
                        className={styles.editInput}
                        style={{ maxWidth: "200px", width: "100%" }}
                        placeholder="Introducir nombre:"
                    />
                    <input
                        type="text"
                        id="lastname"
                        // value={lastEditName}
                        onChange={handleEditLastName}
                        className={styles.editInput}
                        style={{ maxWidth: "200px", width: "100%" }}
                        placeholder="Introducir apellido:"
                    />
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() => {
                                setIsEditingName(false);
                                setIsEditingLastName(false);
                                setName(firstName);
                                setLastEditName(lastName);
                            }}
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button
                            className={styles.saveButton}
                            onClick={() => {
                                handleEditName;
                                handleEditLastName;
                                setIsEditingName(false);
                                setIsEditingLastName(false);
                            }}
                            >
                            Guardar
                            </button>
                        </div>
                     </div>) : (<div className={styles.userInfoEditableContainer}>
                        <p className={styles.userInfoSubtitle}>{name + ' ' + lastEditName } </p>
                        {isCurrentUser && <Image
                                                src="/assets/images/EditComment.png"
                                                alt="editicon"
                                                onClick={handleEditName}
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
                                value={EditBirthDate}
                                defaultValue={EditBirthDate}
                                className={styles.inputCalendar}
                                max={formattedDate}
                                onChange={handleEditBirthDate}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                            <div className={styles.buttonContainer}>
                                <button
                                    onClick={() => {
                                        setIsEditingBirthDate(false);
                                        setEditBirthDate(formattedBirthDate);
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={() => {
                                        handleEditBirthDate;
                                        setIsEditingBirthDate(false);
                                    }}
                                    className={styles.saveButton}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.userInfoEditableContainer}>
                            <p className={styles.userInfoSubtitle}>{EditBirthDate}</p>
                            {isCurrentUser && <Image
                                src="/assets/images/EditComment.png"
                                alt="editicon"
                                onClick={handleEditBirthDate}
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