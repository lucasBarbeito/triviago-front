import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';
import '../styles/CommentComponent.module.css';

const CommentComponent = () => {
  const [newComment, setNewComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const url = "http://localhost:8080";

  useEffect(() => {
    const currentDate = new Date();
    setFormattedDateTime(currentDate.toLocaleString());
  }, []);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCommentSubmit = async () => {
    setIsButtonDisabled(true);

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    const newCommentData = {
      content: newComment,
      date: formattedDateTime,
    };

    try {
      const response = await axios.post(`${url}/comment`, { content: newComment });
      if (response.status === 200) {
        setNewComment("");
        setIsButtonDisabled(false);
        setComments([...comments, newCommentData]);
      } else {
        setIsButtonDisabled(false);
        setSnackbarMessage("Hubo un error en la creación del comentario, por favor intenta más tarde.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsButtonDisabled(false);
      setSnackbarMessage("Hubo un error en la creación del comentario, por favor intenta más tarde.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Card className="componentBox">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="userNameText">
              usuario1@mail.com
            </Typography>
            <Typography variant="dateText">
               {formattedDateTime}
            </Typography>
          </Box>

          <Box>
            <IconButton aria-label="Editar comentario">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Eliminar comentario" className="cancelButton">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Box className="likeCount">
          <IconButton aria-label="Me gusta">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="text">
            12
          </Typography>
          <IconButton aria-label="No me gusta">
            <ThumbDownIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions className="buttonsContainers">
        <TextField 
          variant="standard" 
          id="standard-multiline-flexible"
          label="Agrega un comentario..."
          multiline
          maxRows={7}
          fullWidth
          background="#FFFFFF"
          value={newComment}
          onChange={handleCommentChange}
          className="inputComment"
        />
        <Button variant="outlined" className="cancelButton">
          Cancelar
        </Button>
        <Button
          variant="contained"
          className="answerButton"
          onClick={handleCommentSubmit}
          disabled={isButtonDisabled}
        >
          Comentar
        </Button>
      </CardActions>
      <CardContent>
        {comments.map((comment, index) => (
          <Box key={index} className="commentBox">
            <Typography variant="userNameText">
              usuario{index + 1}@mail.com
            </Typography>
            <Typography variant="dateText">
               {comment.date}
            </Typography>
            <Typography variant="text">
              {comment.content}
            </Typography>
            <Box className="likeCount">
              <IconButton aria-label="Me gusta">
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="text">
                0
              </Typography>
              <IconButton aria-label="No me gusta">
                <ThumbDownIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Card>
  )
};

export default CommentComponent;
