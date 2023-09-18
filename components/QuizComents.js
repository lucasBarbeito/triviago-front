"use client"
import { useEffect, useState } from 'react';
import Axios from 'axios'; // Asegúrate de importar Axios
import styles from '../styles/QuizComents.module.css';

const QuizComents = () => {
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(true);
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios

  // Función para manejar cambios en el input de comentario
  function handleComment(event) {
    setComment(event.target.value);
  }

  // Función para cancelar el comentario
  function cancelComment() {
    setComment("");
  }

  // Función para enviar el comentario al backend
  function logComment() {
    if (comment !== "") {
      const url = "http://localhost:8080/comment"; // URL del endpoint para enviar comentarios

      Axios.post(url, { content: comment }) // Realiza una solicitud POST para enviar el comentario
        .then((response) => {
          // Manejar la respuesta exitosa, si es necesario
          console.log("Comentario enviado con éxito:", response.data);

          // Actualizar la lista de comentarios si es necesario
          // Puedes hacerlo aquí o en otro useEffect
          setComments([...comments, { content: comment }]); // Agrega el nuevo comentario a la lista de comentarios
        })
        .catch((error) => {
          // Manejar errores, mostrar mensaje de error, etc.
          console.error('Error al enviar comentario:', error);
        });

      cancelComment(); // Limpiar el campo de comentario después de enviarlo
    }
  }

  // Función para abrir la sección de comentarios
  function handleCommentBoxOpen() {
    console.log(openComment);
    setOpenComment(true);
  }

  // Función para cerrar la sección de comentarios
  function handleCommentBoxClose() {
    console.log(openComment);
    setOpenComment(false);
  }

  // UseEffect para obtener comentarios del backend al cargar la página
  useEffect(() => {
    const url = "http://localhost:8080/comment"; // URL del endpoint para obtener comentarios

    Axios.get(url) // Utiliza la ruta adecuada en tu backend
      .then((response) => {
        // Manejar la respuesta exitosa
        setComments(response.data); // Actualizar el estado con los comentarios recibidos
      })
      .catch((error) => {
        // Manejar errores, mostrar mensaje de error, etc.
        console.error('Error al obtener comentarios:', error);
      });
  }, []);

  return (
    <div className={styles.backgroundBox}>
      <div className={styles.componentBox}>
        <div className={styles.dividerBox}>
          <button className={openComment ? styles.titleSelectedText : styles.titleNotSelected} onClick={handleCommentBoxOpen}>Comentarios</button>
          <button className={openComment ? styles.titleNotSelected : styles.titleSelectedText} onClick={handleCommentBoxClose}>Clasificación</button>
        </div>
        <div className={styles.lineBox}>
          <div className={openComment ? styles.dividerSelectedLine : styles.dividerNotSelectedLine} />
          <div className={openComment ? styles.dividerNotSelectedLine : styles.dividerSelectedLine} />
        </div>
        {openComment ?
          <div className={styles.comentBox} id="commentBox">
            <p className={styles.numberTextComents}>{comments.length} Comentarios</p>
            <input type="text" id="comment" name="comment" placeholder="Agrega un comentario..." className={styles.inputComment} onChange={handleComment} value={comment} />
            <div className={styles.insertCommentLine} />
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
