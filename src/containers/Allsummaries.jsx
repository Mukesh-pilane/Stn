import React, {useState,useEffect} from 'react'
import axios from 'axios'

import {Container, Grid, } from '@mui/material'
import Card from '../components/Card'
import { fetchSummaries } from "../features/dataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';



export default function Allsummaries() {
    const dispatch = useDispatch()
    const {summaries} = useSelector((state) => state.data);

    useEffect(() => {
    dispatch(fetchSummaries())      
    }, [dispatch])

    return (
        <Container>
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                summaries.map((summary, i) =>{
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