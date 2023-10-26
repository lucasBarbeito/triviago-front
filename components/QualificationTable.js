import React, {useEffect, useState} from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styles from '../styles/QualificationTable.module.css';
import {useRequestService} from "@/service/request.service";
import {useParams} from "next/navigation";

const QualificationTable = ({ data }) => {
    const service = useRequestService()
    const { id } = useParams();
    const [quizQualifications, setQuizQualifications] = useState([])

    const getQualification = () => {
        service.getQualification(id)
            .then(quizQualifications => {
                // Mapear las calificaciones y aplicar createData a cada una
                const processedQualifications = quizQualifications.map((qualification, index) => {
                    const position = index + 1;
                    return createData(
                        qualification.userMail,
                        qualification.correctAnswers,
                        qualification.resolutionDateTime[0],
                        qualification.resolutionDateTime[1],
                        qualification.resolutionDateTime[2],
                        qualification.resolutionDateTime[3],
                        qualification.resolutionDateTime[4],
                        position
                    );
                });

                // Establecer las calificaciones procesadas en setQuizQualifications
                setQuizQualifications(processedQualifications);
            })
            .catch(error => {
                console.error("Error getting quiz qualifications:", error);
                throw error; // Re-lanzar el error para que se maneje en el useEffect.
            });
    }

    useEffect(() => {
        getQualification();
    }, [id]);


    function createData(user, rating, year, month, day, hour, minutes, position) {
        // Función auxiliar para agregar un "0" si el valor es menor que 10
        const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

        return {
            user: `${user}`,
            rating: `${rating}`,
            date: `${addLeadingZero(month)}/${addLeadingZero(day)}/${year}`,
            time: `${addLeadingZero(hour)}:${addLeadingZero(minutes)}`,
            position: `#${position}`
        };
    }


    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Usuario</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Puntaje</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Fecha</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Hora</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Posición</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizQualifications?.map((qualification, index) => (
                            <TableRow key={index} className={styles.noBorderRow}>
                                <TableCell component="th" scope="row" align="center" className={styles.tableInfoCell}>
                                    {qualification.user}
                                </TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{qualification.rating}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{qualification.date}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{qualification.time}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{qualification.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default QualificationTable;
