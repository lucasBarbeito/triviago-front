"use client"
import React, { useState } from 'react';
import { Typography, FormControl, Radio, RadioGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

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
        <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            width="770px"
            height="281px"
            top="416px"
            left="335px"
            bgcolor="#FFFFFF"
            boxShadow="0px 3.872286558151245px 3.872286558151245px 0px #00000040"
            margin="0 auto"
            marginTop="40px"
            textAlign="left"
            padding="16px"
        >
            <Typography
                variant="h6"
                style={{
                    color: '#000000',
                    marginBottom: '16px',
                    fontFamily: 'Inter',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    lineHeight: '33.89px',
                    letterSpacing: '0em',
                }}
            >
                {question}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup>
                    {answers.map((answer, index) => (
                        <FormControlLabel
                            key={index}
                            value={answer}
                            control={
                                multipleCorrectAnswers ? (
                                    <Checkbox
                                        checked={selectedAnswers.includes(answer)}
                                    />
                                ) : (
                                    <Radio />
                                )
                            }
                            label={
                                <Typography
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        lineHeight: '22px',
                                        letterSpacing: '0em',
                                        textAlign: 'justified',
                                    }}
                                >
                                    {answer}
                                </Typography>
                            }
                            onChange={handleAnswerSelection}
                            style={{ justifyContent: 'flex-start' }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default QuizDetails;
