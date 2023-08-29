import React from 'react';
import '../styles/PrivateQuizSearcher.module.css';
import Form from 'react-bootstrap/Form';
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
                        src="../images/Search.jpg"
                        className="privateQuizSearcherSearchButton"
                        width={37}
                        height={37}
                    />
            </div>
        </div>
    );
};

export default PrivateQuizSearcher;
