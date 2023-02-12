import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Typography } from "@mui/material";
import axios from "axios"


const fileTypes = ["VTT",'TXT'];

function DragDrop() {
  const [transcript, setTranscript] = useState('');
  const handleFile = (e) => {
    const content = e.target.result;
    setTranscript(content);
    axios.post('http://localhost:5000/summary',{
      transcript:content
    },{headers:{
            "Authorization": localStorage.getItem('tokenId')
        }
        })
        .then((response) => { 
            console.log(response.data);
        })
        .catch((error) => { console.log(error); });
  }
  const handleChange = (file) => {
      let fileData = new FileReader(file)
      fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };
  return (
    <>
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    <Typography>
      {transcript}
    </Typography>
    </>
  );
}

export default DragDrop;