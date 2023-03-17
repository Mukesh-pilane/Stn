import { Co2Sharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchSummaries = createAsyncThunk('data/fetchSummaries',()=>{
    return axios.get(`${process.env.REACT_APP_BASE_URL}/summary`,{headers:{
        "Authorization": localStorage.getItem('tokenId')
    }
    })
    .then((response) => { 
        let data = response.data
      return {
        summaries: data
      }
    })
    .catch((error) => { console.log(error); });
})


export const fetchSummarryById = createAsyncThunk('data/fetchSummaryById', (id)=>{
    return  axios.get(`${process.env.REACT_APP_BASE_URL}/summarydetail?id=${id}`,{headers:{
        "Authorization": localStorage.getItem('tokenId')
    }
    })
    .then((response) => { 
      return {
        summaryDetailed:{
            transcript:response.data.transcript,
            summary:response.data.summary
        }
      }
    })
    .catch((error) => { console.log(error); });
})

export const fetchTranslate = createAsyncThunk('data/fetchTranslate', ({transcript, summaryText, src, dest}) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/summary/translateText`,{
      transcript:transcript,
      summary:summaryText,
      src:src,
      dest:dest
    },{headers:{
          "Authorization": localStorage.getItem('tokenId')
      }
      })
      .then((response) => { 
          return {
            summaryDetailed:{
                transcript:response.data.transcript,
                summary:response.data.summary
            }
          }
      })
      .catch((error) => { console.log(error); });
  })

const initialState ={
    summaries:[],
    summaryDetailed:{},
    isLoading : false,
    error:null
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSummaries.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchSummaries.fulfilled, (state, action)=>{
            state.isLoading = true
            state.summaries = action.payload.summaries
        })
        .addCase(fetchSummaries.rejected, (state)=>{
            state.isLoading = false
        })
        .addCase(fetchSummarryById.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchSummarryById.fulfilled, (state, action)=>{
            state.isLoading = true
            state.summaryDetailed = action.payload.summaryDetailed
        })
        .addCase(fetchSummarryById.rejected, (state)=>{
            state.isLoading = false
        })
        .addCase(fetchTranslate.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchTranslate.fulfilled, (state, action)=>{
            state.isLoading = true
            state.summaryDetailed = action.payload.summaryDetailed
        })
        .addCase(fetchTranslate.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export const selectData = (state) => state.data.data

export default dataSlice.reducer