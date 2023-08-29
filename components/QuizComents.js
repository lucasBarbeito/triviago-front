"use client"
import {useState} from 'react';
import styles from '../styles/QuizComents.module.css';

const QuizComents = () => {

    const [comment, setComment] = useState("");
    const [openClasificación, setOpenClasificación] = useState(false);

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

    function handleClasificaciónOpen(){
        setOpenClasificación(true)
    }

    function handleClasificaciónClose(){
        setOpenClasificación(false)
    }

    return (
        <div className={styles.backgroundBox}>
            <div className={styles.componentBox}>
                <div className={styles.dividerBox}>
                    <button className={styles.titleComentsText} onClick={handleClasificaciónClose}>Comentarios</button>
                    <button className={styles.titleRateText} onClick={handleClasificaciónOpen}>Clasificación</button>
                </div>
                <div className={styles.lineBox}>
                    <div className={styles.dividerComentLine}></div>
                    <div className={styles.dividerClasificationLine}></div>
                </div>
                <div className={styles.comentBox}>
                    <p className={styles.numberTextComents}>8 Comentarios</p>
                    <input type="text" id="comment" name="comment" placeholder="Agrega un comentario..." className={styles.inputComment} onChange={handleComment}></input>
                    <div className={styles.insertCommentLine}></div>
                    <div className={styles.buttonsContainers}>
                        <button className={styles.whiteButton} onClick={cancelComment}>Cancelar</button>
                        <button className={styles.greenButton} onClick={logComment}>Comentar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QuizComents;