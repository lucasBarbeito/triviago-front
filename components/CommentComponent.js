"use client";
import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useRequestService } from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';

const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString(); 

const CommentComponent = ({ id, content, authorEmail, likes, handleDeleteComment, replyToComment }) => {
  const service = useRequestService();
  const [likeCount, setLikeCount] = useState(likes);
  const [replyText, setReplyText] = useState('');
  const [responses, setResponses] = useState([]);
  const [replyTextToComments, setReplyTextToComments] = useState(Array(responses.length).fill(''));

  const handleLikeClick = async () => {
    try {
      await service.likeComment(id);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error('Hubo un error, por favor intenta más tarde', error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      await service.dislikeComment(id);
      setLikeCount(likeCount - 1);
    } catch (error) {
      console.error('Hubo un error, por favor intenta más tarde', error);
    }
  };

  const handleComment = (event) => {
    event.target.style.height = '22px';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  const handleCancel = () => {
    setReplyText('');
  };

  const handleReply = () => {
    if (replyText !== '') {
      const newReply = { content: replyText, likes: 0, dateTime: formattedDateTime };
      setResponses([...responses, newReply]);
      setReplyText('');
      
    }
  };

  // const handleReply = async () => {
  //   if (replyText !== '') {
  //     try {
  //       const response = await service.logComment({
  //         content: replyText,
  //         quizId: null, // Opcional: Si es necesario, puedes establecer el ID del quiz aquí
  //         userId: null, // Opcional: Si es necesario, puedes establecer el ID del usuario aquí
  //         parentCommentId: replyToComment !== null ? replyToComment : null, // Asigna el ID del comentario al que se responde o null si es un comentario principal
  //       });

  //       const newReply = {
  //         id: response.id, // Asigna el ID del comentario que se acaba de crear
  //         content: replyText,
  //         likes: 0,
  //         dateTime: formattedDateTime,
  //         authorEmail: authorEmail, // Agregar el autor del comentario
  //       };

  //       setResponses([...responses, newReply]);
  //       setReplyText('');
  //     } catch (error) {
  //       console.error('Hubo un error al responder al comentario', error);
  //     }
  //   }
  // };

  return (
    <Card variant="outlined" className={styles.componentBox}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="username" className={styles.userNameText}>
              {authorEmail}
            </Typography>
            <Typography variant="date" className={styles.dateText}>
              {formattedDateTime}
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="Eliminar comentario" color="error" sx={{ position: 'relative', zIndex: 0 }} onClick={handleDeleteComment}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <textarea readOnly={true} className={styles.text}>
          {content}
        </textarea>
        <div className={styles.likesContainer}>
          <IconButton aria-label="Me gusta" onClick={handleLikeClick}>
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" className={styles.likeCount}>
            {likeCount}
          </Typography>
          <IconButton aria-label="No me gusta" onClick={handleDislikeClick}>
            <ThumbDownIcon />
          </IconButton>
        </div>
        <div className={styles.commentBox}>
          <textarea
            type="text"
            id={`comment_${id}`}
            name={`comment_${id}`}
            placeholder="Agrega una respuesta al comentario..."
            className={styles.inputComment}
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
          />
          <div className={styles.line} />
          <Box className={styles.buttonsContainers}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancelar
            </button>
            <button className={styles.answerButton} onClick={handleReply}>
              Responder
            </button>
          </Box>
        </div>

        {/*Seccion de Respuesta a comentario */}

        {responses.map((response, index) => (
        <div key={index}>
          {replyToComment && (
            <div className={styles.replyToCommentContainer}>
              <span className={styles.userNameResponseField}>pepito@mail.com </span>
              <span>Respondiendo a: </span>
              <span className={styles.userNameResponseField}>{authorEmail}</span>
            </div>
          )}
    <div className={styles.responseUserInfo}>
      <Typography variant="username2">
        {response.authorEmail}
      </Typography>
      <Typography variant="date2">
        {response.dateTime}
      </Typography>
    </div>
    <div className={styles.responseCommentBox}>
              <Typography variant="body2" className={styles.text}>
                {response.content}
              </Typography>
      <div className={styles.likesContainer}>
        <IconButton aria-label="Me gusta">
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="Numero de likes" className={styles.likeCount}>
          {response.likes}
        </Typography>
        <IconButton aria-label="No me gusta">
          <ThumbDownIcon />
        </IconButton>
      </div>
    </div>
  </div>
))}
      </CardContent>
    </Card>
  );
};

export default CommentComponent;
