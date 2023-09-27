"use client";
import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useRequestService} from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';

const CommentComponent = ({id, content, authorEmail, likes, handleDeleteComment, creationDateTime}) => {

    const service = useRequestService()
    const [likeCount, setLikeCount] = useState(likes); // Estado para realizar un seguimiento de los likes

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

    function handleComment(event) {
        event.target.style.height = '22px'
        event.target.style.height = (event.target.scrollHeight + 1) + 'px'
    }


    return (
        <Card variant="outlined" className={styles.componentBox}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="username" className={styles.userNameText}>
                            {authorEmail}
                        </Typography>
                        <Typography variant="date" className={styles.dateText}>
                            {new Date(creationDateTime).toLocaleDateString("en-US")}
                        </Typography>
                    </Box>

                    <Box>
                        <IconButton aria-label="Editar comentario" color="#667085;"
                                    sx={{position: 'relative', zIndex: 0}}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="Eliminar comentario" color="error"
                                    sx={{position: 'relative', zIndex: 0}} onClick={handleDeleteComment}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <textarea readOnly={true} className={styles.text}>
                {content}
            </textarea>
                <div className={`${styles.likesContainer} ${likeCount.length > 2 ? styles.expanded : ''}`}>
                    <IconButton aria-label="Me gusta" onClick={handleLikeClick}>
                        <ThumbUpIcon/>
                    </IconButton>
                    <Typography variant="body2" className={styles.likeCount}>
                        {likeCount}
                    </Typography>
                    <IconButton aria-label="No me gusta" onClick={handleDislikeClick}>
                        <ThumbDownIcon/>
                    </IconButton>
                </div>
            </CardContent>
            <div className={styles.commentBox}>
                <textarea type="text" id="comment" name="comment" placeholder="Agrega un comentario..."
                          className={styles.inputComment} onChange={handleComment}/>
                <div className={styles.line}/>
            </div>
            <Box className={styles.buttonsContainers}>
                <button className={styles.cancelButton}>
                    Cancelar
                </button>
                <button className={styles.answerButton}>
                    Responder
                </button>
            </Box>
        </Card>
    )

};

export default CommentComponent;
