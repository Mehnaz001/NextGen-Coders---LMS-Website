import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice.js'
import courseSlice from './courseSlice.js'

export const store = configureStore({
    reducer: {
        user : userSlice,
        course : courseSlice
    }
})