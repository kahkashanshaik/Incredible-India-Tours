import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import favSlice from './favSlice';
import { apiSlice, authApiSlice } from './apiSlice';
import authSlice from './authSlice';

    const rootReducer = combineReducers({
    appConfig: appSlice,
    favConfig: favSlice,
    authConfig: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    
});
export default rootReducer;