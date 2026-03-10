import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
    showVideoUploadModal: boolean,
    showLoginModal: boolean,
    isSidebarOpen: boolean,
}

const initialState: AdminState = {
    showVideoUploadModal: false,
    showLoginModal: false,
    isSidebarOpen: true,
}

const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        openModal: (state) => {
            state.showVideoUploadModal = true;
        },

        closeModal: (state) => {
            state.showVideoUploadModal = false;
        },

        openLoginModal: (state) => {
            state.showLoginModal = true;
        },

        closeLoginModal: (state) => {
            state.showLoginModal = false;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        }
    }
});

export const {
    openModal,
    closeModal,
    openLoginModal,
    closeLoginModal,
    toggleSidebar
} = adminSlice.actions;

export default adminSlice.reducer;