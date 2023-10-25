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
                            <TableCell align="center" className={styles.tableHeadCell}><b>Usuario</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Puntaje</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Fecha</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Hora</b></TableCell>
                            <TableCell align="center" className={styles.tableHeadCell}><b>Posición</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className={styles.noBorderRow}>
                                <TableCell component="th" scope="row" align="center" className={styles.tableInfoCell}>
                                    {row.user}
                                </TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{row.rating}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{row.date}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{row.time}</TableCell>
                                <TableCell align="center" className={styles.tableInfoCell}>{row.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default QualificationTable;
