import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styles from '../styles/QualificationTable.module.css';

const QualificationTable = ({ data }) => {
    function createData(user, rating, date, time, position) {
        return { user, rating, date, time, position };
    }

    const rows = [
        createData('usuario1@mail.com', '11 de 11', '03/06/2023', '18:43', '#1'),
        createData('usuario2@mail.com', '9 de 11', '03/06/2023', '09:12', '#2'),
        createData('usuario3@mail.com', '8 de 11', '03/08/2023', '13:02', '#3'),
    ];

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Usuario</b></TableCell>
                            <TableCell align="right"><b>Puntaje</b></TableCell>
                            <TableCell align="right"><b>Fecha</b></TableCell>
                            <TableCell align="right"><b>Hora</b></TableCell>
                            <TableCell align="right"><b>Posición</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className={styles.noBorderRow}>
                                <TableCell component="th" scope="row">
                                    {row.user}
                                </TableCell>
                                <TableCell align="right">{row.rating}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default QualificationTable;
