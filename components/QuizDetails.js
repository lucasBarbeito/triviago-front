"use client";
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const QuizDetails = ({ question, answers, multipleCorrectAnswers }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(answers.length).fill(false));

  const handleAnswerSelection = (index) => {
    if (multipleCorrectAnswers) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = !updatedAnswers[index];
      setSelectedAnswers(updatedAnswers);
    } else {
      const updatedAnswers = Array(answers.length).fill(false);
      updatedAnswers[index] = true;
      setSelectedAnswers(updatedAnswers);
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
          width: '204px',
          height: '46.29518127441406px',
          top: '10px',
          left: '17px',
          marginBottom: '16px',
          fontFamily: 'Inter',
          fontSize: '28px',
          fontWeight: 'bold',
          lineHeight: '33.89px',
          letterSpacing: '0em',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      >
        {question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup>
          {answers.map((answer, index) => (
            <FormControlLabel
              key={`${answer}_${index}`}
              control={
                multipleCorrectAnswers ? (
                  <Checkbox
                    checked={selectedAnswers[index]}
                    onChange={() => handleAnswerSelection(index)}
                  />
                ) : (
                  <Radio
                    checked={selectedAnswers[index]}
                    onChange={() => handleAnswerSelection(index)}
                  />
                )
              }
              label={
                <Typography style={{
                       top: '72px',
                       left: '12px',
                       fontFamily: 'Inter',
                       fontSize: '18px',
                       fontWeight: '400',
                       lineHeight: '22px',
                       letterSpacing: '0em',
                       textAlign: 'justified',
                       maxHeight: '70px', //limitado para que no choque con la pregunta
                       overflow: 'auto', //scroll para que no se superponga con nada
                       maxWidth: '100%',
                       whiteSpace: 'normal',
                       wordBreak: 'break-word',
                    }}
                >
                 {answer}
               </Typography> 
                    }
              style={{ justifyContent: 'flex-start', maxWidth: '100%' }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default QuizDetails;
