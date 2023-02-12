import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Container} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import axios from 'axios'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color:"#fff",
      scrollbarWidth: 'none'
    },
  },
};

const DetailedSummary = () => {
    const {id} = useParams()
    const [summary, setSummary] = useState({
      transcript:"",
      summary: ""      })
    const [lang, setLang] = useState('ENGLISH')
    const Menu = [, 'HINDI','ENGLISH', 'MARATHI', 'ARABIC', 'BENGALI', 'CHINESE', 'FRENCH', 'GUJARATI', 'JAPANESE', 'KANNADA', 'MALAYALAM', 'NEPALI', 'ORIYA', 'PORTUGUESE', 'PUNJABI', 'RUSSIAN', 'SPANISH', 'TAMIL', 'TELUGU', 'URDU']
    useEffect(() => {
        
        const getsummaries = () => {axios.get(`http://localhost:5000/summary?id=${id}`,{headers:{
            "Authorization": localStorage.getItem('tokenId')
        }
        })
        .then((response) => { 
          setSummary({
            transcript:response.data[0].transcript,
            summary:response.data[0].summary
          });

        })
        .catch((error) => { console.log(error); });
    } 
    getsummaries()
    }, [])

    const translateLanguages = (transcript, summaryText, src, dest) => {
      axios.post(`http://localhost:5000/summary/translateText`,{
        transcript:transcript,
        summary:summaryText,
        src:src,
        dest:dest
      },{headers:{
            "Authorization": localStorage.getItem('tokenId')
        }
        })
        .then((response) => { 
            console.log(response.data);
            setSummary(response.data)
        })
        .catch((error) => { console.log(error); });
    }

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      translateLanguages(summary.transcript,summary.summary,typeof lang === 'string' ? lang: lang[0],value)
      console.log(lang,value);
      setLang(typeof value === 'string' ? value.split(',') : value);
    };
  
    const print = () => {
    	let objFra = document.getElementById('printed');
        objFra.contentWindow.focus();
        objFra.contentWindow.print();
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

          summary
          </Typography>
          <FormControl 
            sx={{ mr: 3,color:"#fff", minWidth: 120, }}
            >
  <InputLabel id="demo-simple-select-label" sx={{ color:"#fff"}}>Language</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Language"
    sx={{ 
      color:"#fff"
  }}
  value={lang}
  onChange={handleChange}
  MenuProps={MenuProps}
  >
    {Menu.map((lang, i)=>{
      return (
    <MenuItem sx={{color:"#fff"}} key={i} value={lang}>{lang}</MenuItem>
      )
    })}
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
      <Container
      component='main'
      sx={{
        marginTop: '100px'
      }}
      >
        <Typography 
        color= 'primary'
        >
          <b>Transecript: </b>
        </Typography>
        <Typography>
          {summary.transcript}
        </Typography>
        <Typography 
        color= 'primary'
        >
          <b>summary: </b>
        </Typography>
        <Typography>
        {summary.summary}
        </Typography>
      </Container>
    </>    
  )
}

export default DetailedSummary