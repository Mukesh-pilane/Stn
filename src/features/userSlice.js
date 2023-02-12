import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const verify = createAsyncThunk('user/verify', ()=>{
    return axios.get('http://localhost:5000/users/gSigin',{headers:{
        "Authorization": localStorage.getItem('tokenId').trim(' ')
    }
    })
    .then((response) => { 
        console.log(localStorage.getItem('tokenId').trim(' '))
      return {
              user: response.data.uinfo.name,
              profilePicture: response.data.uinfo.picture,
            };
    })
    .catch((error) => { console.log(error); });
})

export const userSlice = createSlice({
    name: 'user',
    initialState :{
        user:null,
        profilePicture:null,
        isLoading:null
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload.user;
            state.profilePicture = action.payload.profilePicture
        },
        logout: (state) => {
            state.user = null;
            state.profilePicture = null;
            state.isLoading = null
        }
    },
    extraReducers:{
        [verify.pending]: (state) => {
            state.isLoading = true;
        },
        [verify.fulfilled]: (state, action) => {
            state.isLoading = true;
            state.user = action.payload.user;
            state.profilePicture = action.payload.profilePicture
        },
        [verify.rejected]: (state) => {
            state.isLoading = false;
        }
    }
}) 

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user

export default userSlice.reducer