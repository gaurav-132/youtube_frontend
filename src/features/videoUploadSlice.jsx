import { createSlice, nanoid } from '@reduxjs/toolkit';


const initialState = {
    videos: [
        {
            "videoFile": "asd",
            "title": "New"
        }
    ]
}

export const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        uploadVideo: (state, action) => {
            const videoData = {
                id: nanoid(),
                title: action.payload.title
            }

            state.videos.push(videoData);
        },
        removeVideo: (state, action) => {
            state.todos = state.videos.filter((video)=> video.id !== action.payload.id)
        },
    }
});

export const { uploadVideo, removeVideo } = videoSlice.actions;

export default videoSlice.reducer;