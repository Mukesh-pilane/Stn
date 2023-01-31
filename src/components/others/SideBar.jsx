import {Toolbar, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Box, Drawer, IconButton} from '@mui/material';
import {makeStyles} from '@mui/styles'
import {useNavigate, useLocation} from 'react-router-dom';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGoogleLogout } from 'react-google-login';

const drawerWidth =240;

const useStyles = makeStyles((theme) => {
  return{
  page:{
    width: '100%',
    
  },
  drawer:{
    width: drawerWidth
  },
  drawerPaper:{
    width: drawerWidth
  },
  root:{
    display:'flex'
  },
  active:{
    background: '#DCD6F7'
  }
  }
})

const clientId = "1044924794976-n418rqsvep3iiaiecfsqlkf1jf5895is.apps.googleusercontent.com";

const SideBar = ({ mobileOpen ,handleDrawerToggle}, props:Props)=>{
  const onFailure = () =>{
    console.log('failure')
  }

  const onLogoutSuccess = () =>{
    navigate('/auth')
    console.log('success')
  }
  const {signOut} = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure
  }) 
  
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  
  
  
  const drawer=(
    <>
      <Toolbar 
      variant='dense'
      className={classes.height}
      sx={{
        minHeight:64,
      backgroundColor:'#A6B1E1'
      }}
      >
      <Typography
          color="white"
      >
            Menu
      </Typography>
      </Toolbar>
      <List>
          <div
         className={
            location.pathname==='/' ? classes.active : null
          }
          >
         <ListItem
          button
          onClick={()=>{
          navigate('/');
          }}
        >
        <ListItemIcon>
        {<SubjectOutlinedIcon sx={{color:'#fff'}}/>}
        </ListItemIcon>
         <ListItemText 
         primary={<Typography color="white">Summaries</Typography>}       
        />
        </ListItem>
        </div>
                  <div
         className={
            location.pathname==='/upload' ? classes.active : null
          }
          >
         <ListItem
          button
          onClick={()=>{
          navigate('/upload');
          }}

        >
        <ListItemIcon>
        {<AddBoxOutlinedIcon sx={{color:'#fff'}} />}
        </ListItemIcon>
         <ListItemText 
         primary={<Typography color="white">Generate summary</Typography>}       
         />
        </ListItem>
        </div>
                          
       <ListItem
          button
          onClick={()=>{
          localStorage.clear();
          signOut()
          }}
        >
        <ListItemIcon >
        <LogoutIcon sx={{color:'#fff'}} />
        </ListItemIcon>
         <ListItemText 
         primary={<Typography color="white">logout</Typography>}       
         />
        </ListItem>
      </List>
      </>
      )
  
  const container = window !== undefined ? () => window().document.body : undefined;
  return(
          <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }
        
      }
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    )
}

export default SideBar;