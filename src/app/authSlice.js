import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null ,
    token: localStorage.getItem('access_token') || null
};
const authSlice = createSlice({
    name: 'authConfig',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            localStorage.setItem('access_token', action.payload);
            state.token = action.payload;
        },
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            state.token = null;
            state.user = null;
        },
        syncUserSession: (state) => {
            // Syncing user state
            const user = localStorage.getItem('user');
            state.user = user ? JSON.parse(user) : null;
            // Syncing user token
            const accessToken = localStorage.getItem('access_token');
            state.token = accessToken ? accessToken : null;
        }
    },
});
export const { setAccessToken, logout, setUser, syncUserSession } = authSlice.actions;
export default authSlice.reducer;