import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

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
    <Card variant="outlined" style={{
      border: '1px',
      borderColor: '#667085',
      color: '#FFFFFF',
      width: '769px',
      height: '605px',
      margin: '0 auto',
      top: '446px',
      left: '336px',
      boxShadow: '0px 3.872286558151245px 3.872286558151245px 0px #00000040'
     }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="username" style={{ 
              color: '#000000',
              font: 'Inter',
              fontSize: '18px',
              fontWeight: 'bold',
              size: '18',
              weight: '700',
              height: '22px',
              align: 'justified',
              }}>
              usuario1@mail.com
            </Typography>
            <Typography variant="date" color="#667085" style={{ fontSize: '14px', marginLeft: '8px' }}>
               {formattedDateTime}
            </Typography>
          </Box>

          <Box>
            <IconButton aria-label="Editar comentario" color="#667085;" sx={{ position: 'relative', zIndex: 0 }}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Eliminar comentario" color="error" sx={{ position: 'relative', zIndex: 0 }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" style={{ 
          color: '#000000',
          marginTop: '8px', 
          width: '730px',
          height: '44px',
          top: '208px',
          left: '18px',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Box display="flex" alignItems="center" marginTop={1}>
          <IconButton aria-label="Me gusta">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" style={{ margin: '0 8px', color: '#667085'}}>
            12
          </Typography>
          <IconButton aria-label="No me gusta">
            <ThumbDownIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions sx={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         height: 'auto'
         }}>
         <TextField 
            variant="standard" 
            id="standard-multiline-flexible"
            label="Agrega un comentario..."
            multiline
            maxRows={7}
            fullWidth
            background= "#FFFFFF"
            value={newComment}
            onChange={handleCommentChange}
          />
        </CardActions>
        <Box display="flex" justifyContent="flex-end">
          <Box sx={{marginTop: '8px'}}>
            <Button variant="outlined" sx={{ width: '96px', height: '32px', marginRight: '8px' }}>
              Cancelar
            </Button>
            <Button
            variant="contained"
            sx={{ width: '98px', height: '32px', background: '#00CC66', marginRight: '8px' }}
            onClick={handleCommentSubmit}
            disabled={isButtonDisabled}
          >
            Comentar
          </Button>
          </Box>
        </Box>
        <CardContent>
          {comments.map((comment, index) => (
            <Box key={index} marginLeft={3}>
              <Typography variant="username2" style={{ 
                color: '#000000',
                font: 'Inter',
                fontSize: '18px',
                fontWeight: 'bold',
                size: '18',
                weight: '700',
                height: '22px',
                align: 'justified',
                }}>
                usuario{index + 1}@mail.com
              </Typography>
              <Typography variant="date2" color="#667085" style={{ fontSize: '14px', marginLeft: '8px' }}>
                 {comment.date}
              </Typography>
              <Typography variant="body2" style={{ 
                color: '#000000',
                marginTop: '8px', 
                width: '730px',
                height: '44px',
                top: '208px',
                left: '18px',
                }}>
                {comment.content}
              </Typography>
              <Box display="flex" alignItems="center" marginTop={1}>
                <IconButton aria-label="Me gusta">
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2" style={{ margin: '0 8px', color: '#667085'}}>
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
