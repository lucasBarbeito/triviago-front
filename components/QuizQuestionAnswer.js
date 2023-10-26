import React, { useState } from "react";
import styles from '../styles/QuizQuestionAnswer.module.css';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

const QuizQuestionAnswer = ({ question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(""); // Track the selected answer

    const textStyle = {
        color: '#000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 400,
        flexShrink: 0,
        overflowY: 'hidden',
        resize: 'none',
        border: 'none',
        lineHeight: 'normal',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        maxWidth: '100%',
        width: '100%',
    };

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedAnswer(selectedValue);
    };

    const handleCheckboxChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedAnswer === selectedValue) {
            setSelectedAnswer(""); // Unselect if it was already selected
        } else {
            setSelectedAnswer(selectedValue);
        }
    };

    return (
        <div className={styles.componentBox}>
            <Typography className={styles.questionTitle}>{question?.content}</Typography>
            <div className={styles.answerBox}>
                {question?.multipleCorrectAnswers ?
                    (question?.answers.map((answer) => {
                            return (
                                <div key={answer.id} className={styles.answerRow}>
                                    <Checkbox
                                        id={answer.id}
                                        value={answer.content}
                                        onChange={handleCheckboxChange}
                                    />
                                    <p className={styles.answerOptionText}>{answer.content}</p>
                                </div>
                            );
                        })
                    ) : (
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={selectedAnswer}
                                onChange={handleRadioChange}
                            >
                                {question?.answers.map((answer) => (
                                    <FormControlLabel
                                        key={answer.id}
                                        value={answer.content}
                                        control={<Radio />}
                                        label={answer.content}
                                        slotProps={{ typography: textStyle }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
            </div>
        </div>
    );
};

export default QuizQuestionAnswer;
