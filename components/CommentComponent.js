"use client";
import React, { useEffect, useState } from 'react';
import {Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useRequestService } from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';

const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString(); 

const CommentComponent = ({ id, content, authorEmail, likes, handleDeleteComment, replyToComment, quizId, replies }) => {
  const service = useRequestService();
  const [likeCount, setLikeCount] = useState(likes);
  const [replyText, setReplyText] = useState('');
  const [responses, setResponses] = useState(replies);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);

  const handleLikeClick = async () => {
    if (!liked) {
      try {
        await service.likeComment(id);
        setLikeCount(likeCount + 1);
        setLiked(true);
        if (disliked) {
          setDisliked(false);
        }
      } catch (error) {
        console.error('Hubo un error, por favor intenta más tarde', error);
      }
    } else {
      try {
        await service.removeLikeComment(id);
        setLikeCount(likeCount - 1);
        setLiked(false);
      } catch (error) {
        console.error('Hubo un error, por favor intenta más tarde', error);
      }
    }
  };

  const handleDislikeClick = async () => {
    if (!disliked) {
      try {
        await service.dislikeComment(id);
        setLikeCount(likeCount - 1);
        setDisliked(true);
        if (liked) {
          setLiked(false);
        }
      } catch (error) {
        console.error('Hubo un error, por favor intenta más tarde', error);
      }
    } else {
      try {
        await service.removeDislikeComment(id);
        setLikeCount(likeCount + 1);
        setDisliked(false);
      } catch (error) {
        console.error('Hubo un error, por favor intenta más tarde', error);
      }
    }
  };

  const handleCancel = () => {
    setReplyText('');
  };

  const handleReply = async () => {
    if (replyText !== '') {
      const aux = await service.logComment({parentCommentId:id, content:replyText, quizId: quizId})
      setResponses([...responses, aux]);
      setReplyText('');
    }
  };

  useEffect(()=> {
    console.log(likeCount)
  },[])

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
          <IconButton aria-label="Me gusta" onClick={handleLikeClick} color={liked ? 'primary' : 'default'} disabled={liked} >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" className={styles.likeCount}>
            {likeCount}
          </Typography>
          <IconButton aria-label="No me gusta" onClick={handleDislikeClick} color={disliked ? 'primary' : 'default'} disabled={disliked} >
          <ThumbDownIcon color={disliked ? 'primary' : 'default'} />
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
              <Typography variant="date2">
                {response.dateTime}
              </Typography>
            </div>

          )}
    <div className={styles.responseUserInfo}>
      <Typography variant="username2">
        {response.authorEmail}
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


