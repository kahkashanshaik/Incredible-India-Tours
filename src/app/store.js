import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { apiSlice, authApiSlice } from './apiSlice';

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware).concat(authApiSlice.middleware),
});
