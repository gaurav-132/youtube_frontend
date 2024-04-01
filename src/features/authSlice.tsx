import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    avatar: string,
    createdAt: Date,
    email: string,
    fullName: string,
    userName: string,
    watchHistory: [],
    id: string
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
