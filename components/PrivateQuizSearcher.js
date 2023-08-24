import React from 'react';
import '../styles/PrivateQuizSearcher.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from "next/image";

const PrivateQuizSearcher = () => {
    return (
        <div className="privateQuizSearcherContainer">
            <p className="privateQuizSearcherTitle">Código de invitación</p>
            <div className="privateQuizSearcherSearchContainer">
                <Form.Control
                    type="search"
                    className="privateQuizSearcherSearchInput"
                />

                    <Image
                        src="/images/Search.png"
                        className="privateQuizSearcherSearchButton"
                        width={37}
                        height={37}
                    />
            </div>
        </div>
    );
};

export default PrivateQuizSearcher;
