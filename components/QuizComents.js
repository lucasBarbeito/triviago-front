"use client"
import React, {useEffect, useState} from 'react';
import styles from '../styles/QuizComents.module.css';
import {useRequestService} from "@/service/request.service";
import CommentComponent from "@/components/CommentComponent";
import Cookies from "js-cookie";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const jwt = require('jsonwebtoken');

const QuizComents = () => {

    const [comment, setComment] = useState("");
    const [openComment, setOpenComment] = useState(true);
    const [comments, setComments] = useState([])
    const service = useRequestService()
    const [quizId, setQuizId] = useState('0')
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("ERROR");

    useEffect(() => {
        const id = window.location.pathname.split('/')[2]
        setQuizId(id)
        service.fetchComments(id).then(commentsList => {
            setComments(commentsList)
        }).catch(error => {
            console.error("Error fetching comments:", error);
            setComments([])
        })
    }, [quizId]);

    function handleComment(event) {
        setComment(event.target.value)
        event.target.style.height = '22px'
        event.target.style.height = (event.target.scrollHeight + 1) + 'px'
    }

    function cancelComment() {
        setComment("")
        document.getElementById("comment").style.height = '22px'
        document.getElementById("comment").value = ""
    }

    async function logComment() {
        const trimmedComment = comment.trim();
        if (trimmedComment !== "") {
            if (trimmedComment.length <= 255) {
                const data = jwt.decode(Cookies.get('jwt'));
                const comData = {
                    content: trimmedComment,
                    quizId: quizId,
                    userId: data.id,
                    parentCommentId: replyToCommentId || null, // Asigna el ID del comentario al que se responde o null si es un comentario principal
                };

                const com = await service.logComment(comData);
                setComments((prevState) => {
                    if (Array.isArray(prevState)) {
                        return [...prevState, com];
                    } else {
                        return [com];
                    }
                });
                cancelComment();
                setReplyToCommentId(null); // Reinicia el ID del comentario al que se responde
            } else {
                setMessage("El comentario no puede tener mas de 255 caracteres");
                setOpen(true);
            }
        }
    }

    function handleDeleteComment(index) {
        const selectedComment = comments[index]
        if (selectedComment) {
            service.deleteComment(selectedComment.id).then(() => {
                const updatedList = [...comments.slice(0, index), ...comments.slice(index + 1)];
                setComments(updatedList);
            })
        }
    }


    function handleCommentBoxOpen() {
        console.log(openComment)
        setOpenComment(true)
    }

    function handleCommentBoxClose() {
        console.log(openComment)
        setOpenComment(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={styles.backgroundBox}>
            <div className={styles.componentBox}>
                <div className={styles.dividerBox}>
                    <button className={openComment ? styles.titleSelectedText : styles.titleNotSelected}
                            onClick={handleCommentBoxOpen}>Comentarios
                    </button>
                    <button className={openComment ? styles.titleNotSelected : styles.titleSelectedText}
                            onClick={handleCommentBoxClose}>Clasificación
                    </button>
                </div>
                <div className={styles.lineBox}>
                    <div className={openComment ? styles.dividerSelectedLine : styles.dividerNotSelectedLine}/>
                    <div className={openComment ? styles.dividerNotSelectedLine : styles.dividerSelectedLine}/>
                </div>
                {openComment ?
                    <div className={styles.comentBox} id="commentBox">
                        <p className={styles.numberTextComents}>{comments.length} Comentarios</p>
                        <textarea type="text" id="comment" name="comment" placeholder="Agrega un comentario..."
                                  className={styles.inputComment} onChange={handleComment}/>
                        <div className={styles.insertCommentLine}/>
                        <div className={styles.buttonsContainers}>
                            <button className={styles.whiteButton} onClick={cancelComment}>Cancelar</button>
                            <button className={styles.greenButton} onClick={logComment}>Comentar</button>
                        </div>
                        <div>
                            {
                                comments && comments.map((comment, index) => {
                                    return <CommentComponent handleDeleteComment={() => handleDeleteComment(index)}
                                                             id={comment.id} content={comment.content} likes={comment.likes}
                                                             authorEmail={comment.author?.email}
                                                             creationDateTime={comment.creationDate} quizId={quizId}
                                                             key={comment.id} replyToComment={comment.id}
                                                             replies={comment.responses}/>
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className={styles.comentBox} id="classificationtBox">
                        <p className={styles.numberTextComents}>Clasificación</p>
                    </div>
                }
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default QuizComents;