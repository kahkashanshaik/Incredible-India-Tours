import { createSlice } from '@reduxjs/toolkit';
const defaultState = {
    sidebar: false,
};
const initialState = {
    sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
    priceType: 'price_deluxe',
};
const appSlice = createSlice({
    name: 'appConfig',
    initialState: initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        setPageTitle(_, { payload }) {
            document.title = `${payload} | Tourista`;
        },
        setPriceType: (state, {payload}) => {
            state.priceType = payload;
        }
    },
});

export const { toggleSidebar, setPageTitle, setPriceType } = appSlice.actions;

export default appSlice.reducer;
