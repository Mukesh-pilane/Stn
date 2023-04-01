import React, {useEffect} from 'react';
import Auth from "./pages/Auth/Auth"
import Home from "./pages/Home/Home"
import { createTheme, ThemeProvider } from '@mui/material';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'

import DetailedSummary from './pages/DetailedSummary/DetailedSummary';
import Allsummaries from './containers/Allsummaries'
import Uploader from './containers/CreateSummary'
import { useDispatch, useSelector } from "react-redux";
import { verify } from "./features/userSlice";
import Verification from './pages/verification/verification';


const theme = createTheme({
  palette:{
    primary:{
      main: "#424874"
    },
    secondary:{
        main:"#A6B1E1"
    },
    background:{
      paper:"#424874"
    }
  }
})

function App() {
const dispatch = useDispatch();
const location = useLocation();
const navigate = useNavigate();
useEffect(() => {

    if (location.pathname!=='/auth'){
    dispatch(verify(localStorage.getItem('tokenId')));
    if(!localStorage.getItem('tokenId')){
      // navigate('/auth');
    }
   }
}
  , [location])

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Routes>
                <Route path="/" element={<Home />} >
                  <Route path="/" element={<Allsummaries />} />
                  <Route path="/upload" element={<Uploader />} />  
                </Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="/verifylog" element={<Verification />} />
                <Route path="/detailed/:id" element={<DetailedSummary />} />  
        </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
