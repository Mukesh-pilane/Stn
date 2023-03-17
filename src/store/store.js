
import {configureStore} from '@reduxjs/toolkit'

import userReducers from '../features/userSlice'
import dataReducers from '../features/dataSlice'


const store = configureStore({
    reducer: {
        user : userReducers,
        data : dataReducers
    }
})
export default store