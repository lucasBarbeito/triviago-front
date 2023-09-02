import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const CommentComponent = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="username" style={{ 
              color: 'black',
              fontWeight: 900,
              width: '181.76364135742188px', 
              height: '51.91666793823242px',
              top: '156.5416717529297px',
              left: '17.9765625px'
              }}>
              usuario1@mail.comㅤ
            </Typography>
            <Typography variant="caption" style={{ fontSize: '12px' }}>
              Fecha del Comentarioㅤ
            </Typography>
            <Typography variant="hour" style={{ fontSize: '12px' }}>
              Hora
            </Typography>
          </Box>
          <IconButton aria-label="Eliminar" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" style={{ marginTop: '8px', color: 'green' }}>
          Contenido del comentario Lorem ipsum dolor sit amet...
        </Typography>
        <Box display="flex" alignItems="center" marginTop={1}>
          <IconButton aria-label="Me gusta">
          <Image
              src="/Vector.png"
              alt="Vector"
              width={24}
              height={24}
              top={268}
              left={18}
            />
          </IconButton>
          <IconButton aria-label="No me gusta">
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            3
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <TextField
          variant="outlined"
          placeholder="Responder al comentario..."
          fullWidth
        />
        <Button variant="contained" color="primary">
          Responder
        </Button>
      </CardActions>
      <CardContent>
        <Box marginLeft={3}>
          {/* Respuestas */}
          <div>
            <Typography variant="subtitle2" style={{ color: 'purple' }}>
              Nombre de Usuario
            </Typography>
            <Typography variant="body2" style={{ color: 'gray' }}>
              Respuesta al comentario Lorem ipsum dolor sit amet...
            </Typography>
          </div>
          {/* Otras respuestas aquí */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentComponent;