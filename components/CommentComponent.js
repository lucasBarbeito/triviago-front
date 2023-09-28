"use client";
import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, IconButton, TextField, Slide, Snackbar, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useRequestService} from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';
import {Alert} from "@mui/lab";

const CommentComponent = ({id, content, authorEmail, likes, handleDeleteComment, creationDateTime, replyToComment, quizId, replies}) => {

    const service = useRequestService()
    const [likeCount, setLikeCount] = useState(likes); // Estado para realizar un seguimiento de los likes
    const [replyText, setReplyText] = useState('');
    const [responses, setResponses] = useState(replies);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("ERROR");

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
        document.getElementById(`comment_${id}`).style.height = '22px'
    };


    const handleReply = async () => {
        const trimmedReplyText = replyText.trim();
        if (trimmedReplyText !== '') {
            if (trimmedReplyText.length <= 255) {
                try {
                    const aux = await service.logComment({parentCommentId: id, content: replyText, quizId: quizId})
                    setResponses([...responses, aux]);
                    setReplyText('');
                    document.getElementById(`comment_${id}`).style.height = '22px'
                } catch (e) {
                    console.error(e)
                }
            } else {
                setMessage("La respuesta no puede tener mas de 255 caracteres");
                setOpen(true);
            }
        }
    };

    function handleAnswer(event) {
        setReplyText(event.target.value)
        event.target.style.height = '22px'
        event.target.style.height = (event.target.scrollHeight + 1) + 'px'
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <>
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
                <textarea type="text" id={`comment_${id}`} name={`comment_${id}`} placeholder="Agrega un comentario..."
                          className={styles.inputComment} onChange={handleAnswer} value={replyText}/>
                    <div className={styles.line}/>
                </div>
                <Box className={styles.buttonsContainers}>
                    <button className={styles.cancelButton} onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button className={styles.answerButton}  onClick={handleReply}>
                        Responder
                    </button>
                </Box>
                {responses?.map((response, index) => (
                    <div key={index}>
                        {replyToComment && (
                            <div className={styles.replyToCommentContainer}>
                                <span className={styles.userNameResponseField}>{response?.author?.email} </span>
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
                            <textarea readOnly={true} className={styles.textAnswer}>
                                {response.content}
                            </textarea>
                            <div className={styles.likesContainer}>
                                <IconButton aria-label="Me gusta">
                                    <ThumbUpIcon/>
                                </IconButton>
                                <Typography variant="Numero de likes" className={styles.likeCount}>
                                    {response.likes}
                                </Typography>
                                <IconButton aria-label="No me gusta">
                                    <ThumbDownIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </>
    );

};

export default CommentComponent;
