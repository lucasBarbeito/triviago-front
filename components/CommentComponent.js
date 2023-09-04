import React from 'react';
import { Box, Button, Card, CardActions, CardContent, DatePicker, TimePicker, IconButton, TextField, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const CommentComponent = () => {
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
              size: '18',
              weight: '700',
              height: '22px',
              align: 'justified',
              }}>
              usuario1@mail.com
            </Typography>
            <DatePicker
             value={new Date()}
             format="dd/MM/yyyy"
              style={{ color: '#667085', font: 'Inter', fontWeight: '400', fontSize: '16px', marginLeft: '6px' }}
            />
            <TimePicker
            value={new Date()}
            format="hh:mm a"
            style={{ color: '#667085', font: 'Inter', fontWeight: '400', fontSize: '16px', marginLeft: '6px' }}
            />
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
          (Contenido del comentario) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
         height: '66px'
         }}
      >
     <TextField
       variant="outlined"
       placeholder="Agrega un comentario..."
       fullWidth
       multiline
       minRows={1}
       maxRows={6}
       InputProps={{ style: { height: 'auto' } }}
       sx={{ overflow: 'hidden' }}
     />
      </CardActions>
          <Box display="flex" justifyContent="flex-end" marginTop={1}>
            <Button variant="outlined" sx={{
              width: '96px',
              height: '32px',
              marginRight: '16px',
             }}
            >
             Cancelar
            </Button>
            <Button variant="contained" sx={{
             width: '98px',
             height: '32px',
             background: '#00CC66',
             marginRight: '14px',
             }}
            >
            Responder
               </Button>
             </Box>
             <CardContent>
          <Box marginLeft={3}>
              <div>
             <Typography variant="username2" style={{ 
              color: '#000000',
              font: 'Inter',
              fontSize: '18px',
              size: '18',
              weight: '700',
              height: '22px',
              align: 'justified',
              }}>
              usuario2@mail.com
            </Typography>
            <DatePicker
             value={new Date()}
             format="dd/MM/yyyy"
              style={{ color: '#667085', font: 'Inter', fontWeight: '400', fontSize: '16px', marginLeft: '6px' }}
            />
            <TimePicker
            value={new Date()}
            format="hh:mm a"
            style={{ color: '#667085', font: 'Inter', fontWeight: '400', fontSize: '16px', marginLeft: '6px' }}
            />
          <Typography variant="body2" style={{ 
              color: '#000000',
              marginTop: '8px', 
              width: '730px',
              height: '44px',
              top: '208px',
              left: '18px',
              }}>
              Respuesta al comentario Lorem ipsum dolor sit amet...
            </Typography>
          <Box display="flex" alignItems="center" marginTop={1}>
            <IconButton aria-label="Me gusta">
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" style={{ margin: '0 8px', color: '#667085'}}>
              -3
            </Typography>
            <IconButton aria-label="No me gusta">
              <ThumbDownIcon />
            </IconButton>
          </Box>
         </div>
    </Box>
    </CardContent>
    </Card>
  )
};

export default CommentComponent;
