import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {Typography, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Cardy = ({summary})=>{
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
    subheader={summary.Date.$date}
    />
    <CardContent>
    <Typography
    variant='body2'
    color='primary'
    sx={{
        marginBottom:'20px'
    }}
    >
    {summary.summary}...
    </Typography>
    <Button
    component={Link}
    to={'/detailed/'+ summary._id.$oid}
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