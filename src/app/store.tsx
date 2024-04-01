import { configureStore } from '@reduxjs/toolkit';
import videoSlice from '../features/videoUploadSlice';
import authSlice from '../features/authSlice';
import adminSlice from '../features/adminSlice';

// Combine reducers
const rootReducer = {
  video: videoSlice,
  auth: authSlice,
  admin: adminSlice,
};

// Configure store with combined reducers
export const store = configureStore({
  reducer: rootReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
