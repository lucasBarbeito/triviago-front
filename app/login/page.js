import React from 'react';
import LoginForm from '../../components/LoginForm';
import styles from '../../styles/LoginPage.module.css';
import LoginHeader from '../../components/LoginHeader';
import {Divider} from "@mui/material";
import LoginActions from "../../components/LoginActions";
import LoginTitle from "../../components/LoginTitle";


const LoginPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.wrapperLeft}>
                <LoginHeader/>
                <LoginForm/>
                <LoginActions/>
            </div>
            <div className={styles.wrapperRight}>
                <LoginTitle/>
            </div>
        </div>
    );
};

export default LoginPage;