import React from 'react';
import styles from '../styles/PrivateQuizSearcher.module.css';
import Form from 'react-bootstrap/Form';
import Image from "next/image";

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
};

export default PrivateQuizSearcher;
