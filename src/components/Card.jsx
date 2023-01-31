import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {Typography, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Cardy = ()=>{
  return(
    <div
    >
    <Card elevation={1} 
    sx={{
        backgroundColor: '#A6B1E1'
    }}
    >
    <CardHeader 
    color='primary'
    action={
    <>
        <IconButton
      aria-label="settings">
            <EditOutlinedIcon
            />
          </IconButton>
      <IconButton
      aria-label="settings">
            <DeleteIcon />
          </IconButton>
          </>
    }
    title={<Typography
        color="primary"
        >
            Title
        </Typography>}
    subheader={'11:16 /Sat aug 2014'}
    />
    <CardContent>
    <Typography
    variant='body2'
    color='primary'
    sx={{
        marginBottom:'20px'
    }}
    >
    {("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    .substring(100)}
    </Typography>
    <Button
    color='primary'
    variant='contained'
    >
    <Typography
    color="white"
    >
        View
    </Typography>
    </Button>
    </CardContent>
    </Card>
    </div>
    )
}

export default Cardy;