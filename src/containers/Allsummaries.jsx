import React, {useState, useEffect} from 'react'


import {Container, Grid, } from '@mui/material'
import Card from '../components/Card'
import Masonry from 'react-masonry-css'
import {makeStyles} from '@mui/styles'
import {useLocation, useParams} from 'react-router-dom';



export default function Allsummaries() {
    return (
        <Container>
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            
              <Grid item xs={12} sm={8} md={4}>
              <Card
              />
              </Grid>
              <Grid item xs={12} sm={8} md={4} >
              <Card
              />
              </Grid>
              <Grid item xs={12} sm={8} md={4} >
              <Card
              />
              </Grid>
              
             </Grid>
        </Container>
    )
}