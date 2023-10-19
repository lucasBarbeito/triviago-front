"use client"
import React, {useEffect, useState} from 'react';
import styles from '../styles/QuizComents.module.css';
import {useRequestService} from "@/service/request.service";
import CommentComponent from "@/components/CommentComponent";
import Cookies from "js-cookie";
import {Button, Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import QualificationTable from "@/components/QualificationTable";

const jwt = require('jsonwebtoken');

const QuizComents = (props) => {
    const [comment, setComment] = useState("");
    const [openComment, setOpenComment] = useState(true);
    const [comments, setComments] = useState([]);
    const service = useRequestService();
    const [quizId, setQuizId] = useState('0');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        const id = window.location.pathname.split('/')[2];
        setQuizId(id);
        service.fetchComments(id).then(commentsList => {
            setComments(commentsList);
        }).catch(error => {
            console.error("Error fetching comments:", error);
            setComments([]);
        });
    }, [quizId]);

    function handleComment(event) {
        setComment(event.target.value);
        event.target.style.height = '22px';
        event.target.style.height = (event.target.scrollHeight + 1) + 'px';
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
        } else {
            setMessage("El comentario no puede estar vacío");
            setOpen(true);
        }
    }

    function handleEditComment(id, newContent) {
        const newContentTrimmed = newContent.trim();
        if (newContentTrimmed !== "") {
            if (newContentTrimmed.length <= 255) {
                service.editComment(id, newContentTrimmed).then(() => {
                    service.fetchComments(quizId).then(commentsList => {
                        setComments(commentsList);
                    }).catch(error => {
                        console.error("Error editing comment:", error);
                        setComments(comments)
                        setMessage("Error al editar el comentario")
                        setOpen(true)
                    })
                })
            } else {
                setMessage("El comentario no puede tener mas de 255 caracteres");
                setOpen(true);
            }
        } else {
            setMessage("El comentario no puede estar vacío");
            setOpen(true);
        }
    }

    function handleDeleteComment(id) {
        service.deleteComment(id).then(() => {
            service.fetchComments(quizId).then(commentsList => {
                setComments(commentsList)
            }).catch(error => {
                console.error("Error fetching comments:", error);
                setComments(comments)
                setMessage("Error al borrar el comentario")
                setOpen(true)
            })
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleCommentBoxOpen() {
        console.log(openComment)
        setOpenComment(true);
        setShowTable(false);
    }

    function handleCommentBoxClose() {
        console.log(openComment)
        setOpenComment(false);
        setShowTable(true);
    }

    return (
        <div className={styles.backgroundBox}>
            <div className={styles.componentBox}>
                <div className={styles.dividerBox}>
                    <button className={openComment ? styles.titleSelectedText : styles.titleNotSelected}
                            onClick={handleCommentBoxOpen}>Comentarios
                    </button>
                    <button
                        className={openComment ? styles.titleNotSelected : styles.titleSelectedText}
                        onClick={() => {
                            handleCommentBoxClose();
                            setShowTable(true);
                        }}
                    >
                        Clasificación
                    </button>
                </div>
                <div className={styles.lineBox}>
                    <div className={openComment ? styles.dividerSelectedLine : styles.dividerNotSelectedLine} />
                    <div className={openComment ? styles.dividerNotSelectedLine : styles.dividerSelectedLine} />
                </div>
                <div className={styles.whiteBox}>
                    {showTable ? (
                        <>
                            <h2 className={styles.titleClasificacion}>Clasificación</h2>
                            <QualificationTable />
                        </>
                    ) : (
                        <div className={styles.comentBox} id="commentBox">
                            <p className={styles.numberTextComents}>{comments.length} Comentarios</p>
                            <textarea
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder="Agrega un comentario..."
                                className={styles.inputComment}
                                onChange={handleComment}
                            />
                            <div className={styles.insertCommentLine} />
                            <div className={styles.buttonsContainers}>
                                <Button variant="outlined" style={{ color: '#000000', borderColor: '#000000' }} onClick={cancelComment}>Cancelar</Button>
                                <Button variant="contained" style={{ backgroundColor: '#00CC66' }} onClick={logComment}>Comentar</Button>
                            </div>
                            <div>
                                {comments && comments.map((comment, index) => (
                                    <CommentComponent
                                        key={comment.id}
                                        comment={comment}
                                        handleDeleteComment={(commentId) => handleDeleteComment(commentId)}
                                        handleEditComment={(id, newContent) => handleEditComment(id, newContent)}
                                        quizId={quizId}
                                        showReplyInput={true}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );

};
export default QuizComents;