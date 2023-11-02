"use client"

import LoginPage from "@/app/login/page";
import styles from "@/styles/LoginPage.module.css";
import LoginHeader from "@/components/LoginHeader";
import LoginForm from "@/components/LoginForm";
import LoginTitle from "@/components/LoginTitle";
import React from "react";
import RecoverPasswordComponent from "@/components/RecoverPasswordComponent";
import RecoverTitle from "@/components/RecoverTitle";


const RecoverPassword = () => {

    return (
        <div className={styles.pageContainer}>
            <div className={styles.wrapperLeft}>
                <RecoverTitle/>
                <RecoverPasswordComponent/>
            </div>
            <div className={styles.wrapperRight}>
                <LoginTitle/>
            </div>
        </div>
    )

}

export default RecoverPassword;