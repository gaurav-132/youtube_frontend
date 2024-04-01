import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
    showVideoUploadModal: boolean,
    showLoginModal: boolean,
}

const initialState: AdminState = {
    showVideoUploadModal : false,
    showLoginModal : false,
}

const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        openModal: (state) =>{
            state.showVideoUploadModal = true;
        },

        closeModal: (state) => {
            state.showVideoUploadModal = false;
        },

        openLoginModal : (state) => {
            state.showLoginModal = true;
        },

        closeLoginModal: (state) => {
            state.showLoginModal = false;
        }
    }
});

export const { 
    openModal, 
    closeModal,
    openLoginModal,
    closeLoginModal 
} = adminSlice.actions;

export default adminSlice.reducer;