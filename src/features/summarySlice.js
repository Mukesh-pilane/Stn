import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getsummary = createAsyncThunk('summary/getsummary', ()=>{
    return axios.get('http://localhost:5000/summary',{headers:{
        "Authorization": localStorage.getItem('tokenId')
    }
    })
    .then((response) => { 
        console.log('called');
      return {
        summary: response.data[0]
      }
    })
    .catch((error) => { console.log(error); });
})

export const summarySlice = createSlice({
    name: 'summary',
    initialState :{
        summary:[],
        isLoading:null
    },
    reducers:{
        allsummary: (state, action) => {
            state.summary=action.summary
        }
    },
    extraReducers:{
        [getsummary.pending]: (state) => {
            state.isLoading = true;
        },
        [getsummary.fulfilled]: (state, action) => {
            state.isLoading = true;
            state.summary = action.payload.summary
        },
        [getsummary.rejected]: (state) => {
            state.isLoading = false;
        }
    }
}) 

export const { allsummary } = summarySlice.actions;

export const selectSummary = (state) => state.summary.summary

export default summarySlice.reducer