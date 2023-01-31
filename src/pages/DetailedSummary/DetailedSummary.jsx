import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Container, Box} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AudioFileIcon from '@mui/icons-material/AudioFile';

const DetailedSummary = () => {
    const print = () => {
    	let objFra = document.getElementById('printed');
        objFra.contentWindow.focus();
        objFra.contentWindow.print();
        console.log('works')
    }
  return (
    <> 
    <AppBar
    position="fixed"
    >
      <Toolbar >
      <Typography 
          variant="h6" 
          noWrap 
          component="div"
          color="white"
          sx={{
            flexGrow:1
          }}
          >

          static
          </Typography>
          <FormControl 
            sx={{ mr: 3,color:"#fff", minWidth: 120 }}
            >
  <InputLabel id="demo-simple-select-label" sx={{ color:"#fff"}}>Language</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    sx={{ color:"#fff"}}
  >
    <MenuItem sx={{color:"#fff"}}  value={10}>Ten</MenuItem>
  </Select>
</FormControl>
      <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2,color:"#fff" }}
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2,color:"#fff" }}
          >
            <AudioFileIcon />
          </IconButton>
      </Toolbar>
      </AppBar> 
      <Container>
        <Typography>
          kfbm
          lfsllm;
          ;lmls.svs
          skm
        </Typography>
      </Container>
    </>    
  )
}

export default DetailedSummary