"use client";
import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useRequestService } from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';

const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString(); // Hora actual, cambiar a la hora que realizó el comentario

const CommentComponent = ({ id, content, authorEmail, likes, handleDeleteComment }) => {
  const service = useRequestService();
  const [likeCount, setLikeCount] = useState(likes); // Estado para realizar un seguimiento de los likes
  const [replyText, setReplyText] = useState(''); // Estado para el texto de la respuesta
  const [responses, setResponses] = useState([]); // Estado para almacenar las respuestas

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
  };

  const handleReply = () => {
    // Agregar la respuesta al estado de respuestas
    setResponses([...responses, { content: replyText, likes: 0 }]);
    // Limpiar el campo de respuesta
    setReplyText('');
  };

  return (
    <Card variant="outlined" className={styles.componentBox}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="username" className={styles.userNameText}>
              PEPE@gmail.com
            </Typography>
            <Typography variant="date" className={styles.dateText}>
              {formattedDateTime}
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="Editar comentario" color="#667085;" sx={{ position: 'relative', zIndex: 0 }}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Eliminar comentario" color="error" sx={{ position: 'relative', zIndex: 0 }} onClick={handleDeleteComment}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <textarea readOnly={true} className={styles.text}>
          {content}
        </textarea>
        <div className={`${styles.likesContainer} ${likeCount.length > 2 ? styles.expanded : ''}`}>
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

        {/* Botón y campo de respuesta */}
        <div className={styles.commentBox}>
          <textarea
            type="text"
            id="comment"
            name="comment"
            placeholder="Agrega un comentario..."
            className={styles.inputComment}
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
          />
          <div className={styles.line} />
          <Box className={styles.buttonsContainers}>
            <button className={styles.cancelButton}>
              Cancelar
            </button>
            <button className={styles.answerButton} onClick={handleReply}>
              Responder
            </button>
          </Box>
        </div>

        {/* Respuestas */}
        {responses.map((response, index) => (
          <div key={index}>
            {/* Aquí muestra la respuesta */}
            <Typography variant="body2">
              {response.content}
            </Typography>
            <div className={styles.likesContainer}>
              <IconButton aria-label="Me gusta">
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="body2">
                {response.likes}
              </Typography>
              <IconButton aria-label="No me gusta">
                <ThumbDownIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentComponent;