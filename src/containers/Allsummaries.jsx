import React, {useState,useEffect} from 'react'
import axios from 'axios'

import {Container, Grid, } from '@mui/material'
import Card from '../components/Card'
import { allsummary } from "../features/summarySlice";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';



export default function Allsummaries() {
    const [allsummary, setAllSummary] = useState([])
    useEffect(() => {
        
        const getsummaries = () => {axios.get('http://localhost:5000/summary',{headers:{
            "Authorization": localStorage.getItem('tokenId')
        }
        })
        .then((response) => { 
          setAllSummary(response.data);
        })
        .catch((error) => { console.log(error); });
    } 
    getsummaries()
    }, [])
    return (
        <Container>
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                allsummary.map((summary, i) =>{
                    return (
                        <Grid item xs={12} sm={8} md={4} key={i}>
              <Card summary={summary}
              />
              </Grid>
                    );
                })
            }
              
            </Grid>
        </Container>
    )
}