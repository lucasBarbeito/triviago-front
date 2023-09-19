"use client"
import {useEffect, useState} from 'react';
import styles from '../styles/QuizComents.module.css';
import {useRequestService} from "@/service/request.service";
import CommentComponent from "@/components/CommentComponent";
import Cookies from "js-cookie";
const jwt = require('jsonwebtoken');
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const QuizComents = () => {

    const [comment, setComment] = useState("");
    const [openComment, setOpenComment] = useState(true);
    const [comments, setComments] = useState([])
    const service = useRequestService()
    const [quizId, setQuizId] = useState('0')

    const [refresh, setRefresh] = useState(false)
    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        const id = window.location.pathname.split('/')[2]
        setQuizId(id)
        service.fetchComments(id).then(commentsList => {
            setComments(commentsList)
        })
    }, [quizId, refresh]);

    function handleComment(event){
        setComment(event.target.value)
    }

    function cancelComment(){
        setComment("")
        document.getElementById("comment").value = ""
    }

    async function logComment() {
        if (comment !== "") {
            const data = jwt.decode( Cookies.get('jwt'))

            const com = await service.logComment({ content: comment, quizId: quizId, userId: data.id });
            setComments(prevState => {
                if (Array.isArray(prevState)) {
                    return [...prevState, com];
                } else {
                    return [com];
                }
            });
            cancelComment();
        }
    }



    function handleCommentBoxOpen(){
        console.log(openComment)
        setOpenComment(true)
    }

    function handleCommentBoxClose(){
        console.log(openComment)
        setOpenComment(false)
    }

    // ALERT
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
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
                    <button className={openComment ? styles.titleSelectedText : styles.titleNotSelected} onClick={handleCommentBoxOpen}>Comentarios</button>
                    <button className={openComment ? styles.titleNotSelected : styles.titleSelectedText} onClick={handleCommentBoxClose}>Clasificación</button>
                </div>
                <div className={styles.lineBox}>
                    <div className={openComment ? styles.dividerSelectedLine : styles.dividerNotSelectedLine}/>
                    <div className={openComment ? styles.dividerNotSelectedLine : styles.dividerSelectedLine}/>
                </div>
                {openComment ?
                    <div className={styles.comentBox} id="commentBox">
                        <p className={styles.numberTextComents}>{comments.length} Comentarios</p>
                        <input type="text" id="comment" name="comment" placeholder="Agrega un comentario..." className={styles.inputComment} onChange={handleComment}/>
                        <div className={styles.insertCommentLine}/>
                        <div className={styles.buttonsContainers}>
                            <button className={styles.whiteButton} onClick={cancelComment}>Cancelar</button>
                            <button className={styles.greenButton} onClick={logComment}>Comentar</button>
                        </div>
                        <div >
                            {
                                comments && comments.map((comment)=>{
                                    return <CommentComponent id={comment.id} content={comment.content} likes={comment.likes} authorEmail={comment.userId} refresh={handleRefresh} openAlert={()=>setOpen(true)} setAlertMessage={setMessage}/>
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
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default QuizComents;