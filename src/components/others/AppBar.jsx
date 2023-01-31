import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import { useSelector } from 'react-redux';

const Appbar = ({drawerWidth, handleDrawerToggle})=>{
  const {profilePicture} = useSelector((state) => state.user);
  return( 
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
                    <div
          style={{ flexGrow: 1}}
          >
          <Typography 
          variant="h6" 
          noWrap 
          component="div"
          color="white"
          >

          static
          </Typography>
          </div>
                    <Avatar
                    src={profilePicture}
          ></Avatar>
        </Toolbar>
      </AppBar>)
}

export default Appbar;