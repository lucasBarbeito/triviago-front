"use client"
import {useState} from 'react';
import styles from '../styles/QuizComents.module.css';

const QuizComents = () => {

    const [comment, setComment] = useState("");
    const [openComment, setOpenComment] = useState(true);

    function handleComment(event){
        setComment(event.target.value)
    }

    function cancelComment(){
        setComment("")
        document.getElementById("comment").value = ""
    }

    function logComment(){
        if(comment != "") {
            cancelComment()
            console.log(comment)
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
                        <p className={styles.numberTextComents}>8 Comentarios</p>
                        <input type="text" id="comment" name="comment" placeholder="Agrega un comentario..." className={styles.inputComment} onChange={handleComment}/>
                        <div className={styles.insertCommentLine}/>
                        <div className={styles.buttonsContainers}>
                            <button className={styles.whiteButton} onClick={cancelComment}>Cancelar</button>
                            <button className={styles.greenButton} onClick={logComment}>Comentar</button>
                        </div>
                    </div>
                    :
                    <div className={styles.comentBox} id="classificationtBox">
                        <p className={styles.numberTextComents}>Clasificación</p>
                    </div>
                }
            </div>
        </div>
    );
};
export default QuizComents;