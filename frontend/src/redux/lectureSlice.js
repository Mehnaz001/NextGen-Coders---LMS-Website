import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name: 'lecture',
    initialState: {
        lectureData: null 
    },
    reducers: {
        setLectureData: (state, action) => {
            state.lectureData = action.payload;
        }
    }
})

export const { setLectureData } = lectureSlice.actions;
export default lectureSlice.reducer;