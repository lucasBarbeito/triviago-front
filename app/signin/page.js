'use client'
import React from 'react';
import SigninForm from '../../components/SigninForm';
import styles from '../../styles/SigninPage.module.css';
import LoginHeader from '../../components/LoginHeader';
import LoginTitle from "../../components/LoginTitle";

const SigninPage = () => {

    return (
        <div className={styles.pageContainer}>
            <div className={styles.wrapperLeft}>
                <LoginHeader/>
                <SigninForm/>
            </div>
            <div className={styles.wrapperRight}>
                <LoginTitle/>
            </div>
        </div>
    );
};
export default SigninPage;