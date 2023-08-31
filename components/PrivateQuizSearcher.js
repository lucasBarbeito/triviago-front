import React from 'react';
import styles from '../styles/PrivateQuizSearcher.module.css';
import Form from 'react-bootstrap/Form';
import Image from "next/image";
import {useRequestService} from "@/service/request.service";
import {router} from "next/client";

const PrivateQuizSearcher = () => {
    return (
        <div className={styles.privateQuizSearcherContainer}>
            <p className={styles.privateQuizSearcherTitle}>Código de invitación</p>
            <div className={styles.privateQuizSearcherSearchContainer}>
                <Form.Control
                    type="search"
                    className={styles.privateQuizSearcherSearchInput}
                />
                <Image
                    src="/assets/images/Search.png"
                    className={styles.privateQuizSearcherSearchButton}
                    width={37}
                    height={37}
                />
            </div>
        </div>
    );

    const service = useRequestService()
    service.findById({})
        .then( () => router.push("/home"))
        .catch((e) => {

        })
};

export default PrivateQuizSearcher;
