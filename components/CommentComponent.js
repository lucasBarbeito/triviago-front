"use client";
import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useRequestService} from "@/service/request.service";
import styles from '../styles/CommentComponent.module.css';


const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString(); //hora actual, cambiar a la hora que realizo el comentario

const CommentComponent = ({ id, content, authorEmail, likes, refresh, openAlert, setAlertMessage}) => {

    const service = useRequestService()
    const [likeCount, setLikeCount] = useState(likes); // Estado para realizar un seguimiento de los likes

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleEditComment = () => {setIsEditing(true)};

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

    const editComment = async (newContent) => {
        try {
            await service.editComment(id, newContent)
            refresh();
        }
        catch (error) {
            setAlertMessage('Hubo un error al editar el comentario, por favor intenta más tarde')
            openAlert();
        }
    }



    return (
        <Card variant="outlined" style={{
          border: '1px',
          borderColor: '#667085',
          color: '#FFFFFF',
          width: '769px',
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
                    {authorEmail}
                </Typography>
                <Typography variant="date" color="#667085" style={{ fontSize: '14px', marginLeft: '8px' }}>
                   {formattedDateTime}
                </Typography>
              </Box>

              <Box>
                <IconButton aria-label="Editar comentario" color="#667085;" sx={{ position: 'relative', zIndex: 0 }} onClick={handleEditComment}>
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
                {!isEditing ?
                    (
                        <div>{content}</div>
                    ): (
                        <div>
                            <input
                                type="text"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className={styles.editInput}
                            />
                            <button
                                onClick={()=> {setIsEditing(false); setEditedContent(content);}}
                                className={styles.cancelButton}
                            >
                                Cancelar
                            </button>
                            <button
                                className={styles.editButton}
                                onClick={()=> editComment(editedContent)}
                            >
                                Editar
                            </button>
                        </div>
                    )
                }
            </Typography>
            <Box display="flex" alignItems="center" marginTop={1}>

                <IconButton aria-label="Me gusta" onClick={handleLikeClick}>
                    <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2" style={{ margin: '0 8px', color: '#667085' }}>
                    {likeCount}
                </Typography>
                <IconButton aria-label="No me gusta" onClick={handleDislikeClick}>
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
            //  background= "#FFFFFF"
            />
          </CardActions>
              <Box display="flex" justifyContent="flex-end">
                <Box sx={{marginTop: '8px'}}>
                <Button variant="outlined" sx={{ width: '96px', height: '32px', marginRight: '8px' }}>
                  Cancelar
                </Button>
                <Button variant="contained" sx={{ width: '98px', height: '32px', background: '#00CC66', marginRight: '8px' }}>
                  Responder
                </Button>
                </Box>
                 </Box>
        </Card>
    )

};

export default CommentComponent;
