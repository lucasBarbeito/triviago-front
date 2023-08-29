import React, { useState } from 'react';
import '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the DatePicker CSS

const QuizFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div className="quizFilterContainer">
            <p className="quizFilterTitle">Título</p>
            <div className="quizFilterSearchContainer">
                <Form.Control
                    type="search"
                    className="quizFilterSearchInput"
                />
            </div>
            <p className="quizFilterTitle">Etiquetas</p>
            <div className="quizFilterSearchContainer">
                <Form.Control
                    type="search"
                    className="quizFilterSearchInput"
                />
            </div>
            <p className="quizFilterTitle">Fecha</p>
            <div className="quizFilterInputPlaceholder">
                <div className="quizFilterDoubleInput">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        placeholderText="Desde"
                    />
                </div>
                <div className="quizFilterDoubleInput">
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholderText="Hasta"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizFilter;
