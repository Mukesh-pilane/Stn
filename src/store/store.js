
import {configureStore} from '@reduxjs/toolkit'

import userReducers from '../features/userSlice'
import summaryReducers from '../features/summarySlice'

// const store = createStore(rootReducer)

const store = configureStore({
    reducer: {
        user : userReducers,
        summary : summaryReducers
    }
})
export default store