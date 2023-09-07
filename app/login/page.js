'use client'

import React, {useEffect, useState} from 'react';
import LoginForm from '../../components/LoginForm';
import styles from '../../styles/LoginPage.module.css';
import LoginHeader from '../../components/LoginHeader';
import LoginTitle from "../../components/LoginTitle";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const LoginPage = () => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        //para esconder el popup
        setOpen(false)
    }

    // es la funcion que se corre cuadno se renderiza el componente o cuando cambia el valor del arreglo de dependencia
    useEffect(() => {
        if (localStorage.getItem('logout') ){
            setOpen(true)
            localStorage.removeItem('logout')
        }
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.wrapperLeft}>
                <LoginHeader/>
                <LoginForm/>
            </div>
            <div className={styles.wrapperRight}>
                <LoginTitle/>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity='success'>
                    {'Sesión cerrada exitosamente. '}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default LoginPage;