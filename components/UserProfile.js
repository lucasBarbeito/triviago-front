'use client'
import React, { useState, useEffect } from 'react';
import styles from '../styles/UserProfile.module.css';
import Image from 'next/image';
import DeleteAccountModal from './DeleteAccountModal';
import {useRequestService} from "@/service/request.service";
import EditIcon from "@mui/icons-material/Edit";
import {Button, Card, IconButton, Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import 'dayjs/locale/en-gb';

const UserProfile = ({
                         firstName,
                         lastName,
                         email,
                         birthDate,
                         createdAt,
                         isCurrentUser,
                         userId,
                     }) => {

    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const service = useRequestService();

    const onDeleteClick = () => {
        setShowDeleteAccountModal(true);
    };

    const handleDeleteAccount = async () => {
        try {
            await service.deleteUser(userId);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const onFollowClick = () => {
        // Implementar
    };

    const [isEditingName, setIsEditingName] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({firstName: "", lastName: "", birthDate: ""});
    const [info, setInfo] = useState({firstName: firstName, lastName: lastName, birthDate: birthDate.join('-')});

    const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);

    // Snackbar related variables
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        setInfo({
            firstName: firstName,
            lastName: lastName,
            birthDate: formatBirthDate(birthDate)
        })
    }, [])

    const parseCreatedAccountDate = (date) => {
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

    const formatBirthDate = (dateArray) => {
        const year = dateArray[0].toString();
        const month = dateArray[1].toString().padStart(2, '0');
        const day = dateArray[2].toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const showDate = (birthDate) => {
        const dateArray = birthDate.split('-')

        const year = dateArray[0]
        const month = dateArray[1]
        const day = dateArray[2]

        return `${month}/${day}/${year}`;
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Card className={styles.userInfoContainer}>
            <div  >
                <Image
                    src="/assets/images/UserIconGray.png"
                    alt="usericon"
                    width={128}
                    height={128}
                />

            </div>
            <div  >
                <Typography
                    className={styles.userInfoTitle}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {email}
                </Typography>
                {   isEditingName
                    ?   <div>
                            <div style={{display: 'flex'}}>
                                <input
                                    type="text"
                                    value={updatedInfo.firstName}
                                    onChange={(e) => setUpdatedInfo({...updatedInfo, firstName: e.target.value})}
                                    className={styles.editInput}
                                    style={{ maxWidth: "200px", width: "100%" }}
                                    placeholder="Introducir nombre:"
                                />
                                <Box width={8}/>
                                <input
                                    type="text"
                                    value={updatedInfo.lastName}
                                    onChange={(e) => setUpdatedInfo({...updatedInfo, lastName: e.target.value})}
                                    className={styles.editInput}
                                    style={{ maxWidth: "200px", width: "100%" }}
                                    placeholder="Introducir apellido:"
                                />
                            </div>
                            <div style={{height: '32px', display: 'flex', flexDirection: 'row', marginTop: '8px'}}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setIsEditingName(false)}
                                    className={styles.cancelButton}
                                    style={{color: '#000', borderColor: '#000'}}
                                >
                                    Cancelar
                                </Button>
                                <Box width={8}/>
                                <Button
                                    variant="contained"
                                    className={styles.saveButton}
                                    // disabled={updatedInfo.firstName.trim() === '' || updatedInfo.lastName.trim() === '' }
                                    onClick={() => {
                                        if (updatedInfo.firstName.trim() === '') {
                                            setMessage("No se puede dejar el nombre vacío");
                                            setSeverity("error");
                                            setOpen(true);
                                            return;
                                        }
                                        if (updatedInfo.lastName.trim() === '') {
                                            setMessage("No se puede dejar el apellido vacío");
                                            setSeverity("error");
                                            setOpen(true);
                                            return;
                                        }
                                        if (updatedInfo.firstName.length >= 255) {
                                            setMessage("No se puede agregar un nombre con más de 255 caracteres");
                                            setSeverity("error");
                                            setOpen(true);
                                            return;
                                        }
                                        if (updatedInfo.lastName.length >= 255) {
                                            setMessage("No se puede agregar un apellido con más de 255 caracteres");
                                            setSeverity("error");
                                            setOpen(true);
                                            return;
                                        }

                                        const userId = window.location.pathname.split('/')[2]
                                        service.editUserInformation(userId, updatedInfo).then(() => {
                                            setInfo(updatedInfo)
                                            setIsEditingName(false)
                                            setMessage("Se modifico el nombre correctamente");
                                            setSeverity("success");
                                            setOpen(true);
                                        }).catch(error => {
                                            setIsEditingName(false)
                                            setMessage("Error modificando el nombre");
                                            setSeverity("error");
                                            setOpen(true);
                                            console.error("Error editing info:", error);
                                        });
                                    }}
                                    style={{color: '#FFF', backgroundColor: '#00CC66'}}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    :   <div className={styles.userInfoEditableContainer} style={{maxWidth: '400px'}}>
                        <Typography
                            className={styles.userInfoSubtitle}
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {info.firstName + ' ' + info.lastName}
                        </Typography>
                        {   isCurrentUser &&
                            <IconButton
                                aria-label="Editar nombre"
                                color="#667085;"
                                // sx={{position: 'relative', zIndex: 0}}
                                onClick={() => {
                                    setIsEditingName(true)
                                    setUpdatedInfo({firstName: info.firstName, lastName: info.lastName, birthDate: info.birthDate})
                                }}
                            >
                                <EditIcon/>
                            </IconButton>
                        }
                    </div>
                }

                {isEditingBirthDate ? (
                    <div className={styles.labelContainer}>
                        <input
                            id="date"
                            type="date"
                            value={updatedInfo.birthDate}
                            className={styles.inputCalendar}
                            max={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setUpdatedInfo({...updatedInfo, birthDate: e.target.value})}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                        {/*    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>*/}
                        {/*        <DemoContainer components={['DatePicker']}>*/}
                        {/*            <div style={{height: '56px'}}>*/}
                        {/*            <DatePicker*/}
                        {/*                label="Fecha de nacimiento"*/}
                        {/*                value={updatedInfo.birthDate ? dayjs(updatedInfo.birthDate) : null}*/}
                        {/*                className={styles.inputCalendar}*/}
                        {/*                max={dayjs().format()} // Make sure to use Dayjs for max as well*/}
                        {/*                onChange={(date) => setUpdatedInfo({ ...updatedInfo, birthDate: date })}*/}
                        {/*            />*/}
                        {/*            </div>*/}
                        {/*        </DemoContainer>*/}
                        {/*    </LocalizationProvider>*/}
                        <div style={{height: '32px', display: 'flex', flexDirection: 'row', marginTop: '8px'}}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setIsEditingBirthDate(false);
                                }}
                                className={styles.cancelButton}
                                style={{color: '#000', borderColor: '#000'}}
                            >
                                Cancelar
                            </Button>
                            <Box width={8}/>
                            <Button
                                variant="contained"
                                className={styles.saveButton}
                                disabled={updatedInfo.birthDate.toString().trim() === ''}
                                onClick={() => {
                                    const currentDate = new Date();
                                    const userBirthDate = new Date(updatedInfo.birthDate);
                                    let age = currentDate.getFullYear() - userBirthDate.getFullYear();
                                    const monthDiff = currentDate.getMonth() - userBirthDate.getMonth();
                                    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < userBirthDate.getDate())) {
                                        age--;
                                    }
                                    if (age < 6) {
                                        setMessage("Debes tener 6 años o más para ser un usuario de esta página");
                                        setSeverity("error");
                                        setOpen(true);
                                        return;
                                    }

                                    const userId = window.location.pathname.split('/')[2]
                                    service.editUserInformation(userId, updatedInfo).then((response) => {
                                        setInfo(updatedInfo)
                                        setIsEditingBirthDate(false)
                                        setMessage("Se actualizó exitosamente la fecha de nacimiento");
                                        setSeverity("success");
                                        setOpen(true);
                                    }).catch(error => {
                                        setIsEditingBirthDate(false)
                                        setMessage("Hubo un error al actualizar la fecha de nacimienot");
                                        setSeverity("error");
                                        setOpen(true);
                                        console.error("Error editing info:", error);
                                    });
                                }}
                                style={{color: '#FFF', backgroundColor: '#00CC66'}}
                            >
                                Guardar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.userInfoEditableContainer}>
                        {/*<Typography className={styles.userInfoSubtitle}>{info.birthDate.split('-').reverse().join('/')}</Typography>*/}
                        <Typography className={styles.userInfoSubtitle}>{showDate(info.birthDate)}</Typography>
                        {   isCurrentUser &&
                            <IconButton
                                aria-label="Editar fecha de nacimiento"
                                color="#667085;"
                                // sx={{position: 'relative', zIndEex: 0}}
                                onClick={() => {
                                    setIsEditingBirthDate(true);
                                    setUpdatedInfo({firstName: info.firstName, lastName: info.lastName, birthDate: info.birthDate});
                                }}
                            >
                                <EditIcon/>
                            </IconButton>
                        }
                    </div>
                )}
                <Typography className={styles.userInfoSubtitle} style={{marginTop: '8px'}}>{ `Miembro desde el ${parseCreatedAccountDate(createdAt)}`}</Typography>
            </div>
            <div >
                {isCurrentUser ? (
                    <>
                      <Button
                          variant="contained"
                          onClick={onDeleteClick}
                          className={styles.userActionDeleteButton}
                          style={{color: '#FFF', backgroundColor: '#EA0E0E', width: '175px'}}
                          // style={{width: '150px'}}
                          // color={'error'}
                      >
                          Eliminar cuenta
                      </Button>
                      {
                        showDeleteAccountModal &&
                        <div className={styles.modalBackdrop}>
                            <DeleteAccountModal
                                onClose={() => setShowDeleteAccountModal(false)}
                                handleDeleteAccount={handleDeleteAccount}
                            />
                        </div>
                      }
                    </>
                ) : (
                    <Button
                        onClick={onFollowClick}
                        className={styles.userActionFollowButton}
                    >
                        Seguir
                    </Button>
                )}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                TransitionComponent={Slide}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default UserProfile;