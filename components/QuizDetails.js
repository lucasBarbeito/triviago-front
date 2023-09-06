"use client"
import React, { useState } from 'react';
import { Typography, FormControl, Radio, RadioGroup, FormControlLabel, Checkbox } from '@mui/material';

const QuizDetails = ({ question, answers, multipleCorrectAnswers }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleAnswerSelection = (event) => {
        const selectedAnswer = event.target.value;
        if (multipleCorrectAnswers) {
            if (selectedAnswers.includes(selectedAnswer)) {
                setSelectedAnswers(selectedAnswers.filter(answer => answer !== selectedAnswer));
            } else {
                setSelectedAnswers([...selectedAnswers, selectedAnswer]);
            }
        } else {
            setSelectedAnswers([selectedAnswer]);
        }
    };

    return (
        <div>
            <Typography variant="h6">{question}</Typography>
            <FormControl component="fieldset">
                <RadioGroup>
                    {answers.map((answer, index) => (
                        <FormControlLabel
                            key={index}
                            value={answer}
                            control={multipleCorrectAnswers ? <Checkbox checked={selectedAnswers.includes(answer)} /> : <Radio />}
                            label={answer}
                            onChange={handleAnswerSelection}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default QuizDetails;
