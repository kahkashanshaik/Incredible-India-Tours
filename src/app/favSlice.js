import { createSlice } from "@reduxjs/toolkit";
const favSlice = createSlice({
    name: 'favConfig',
    initialState: {
        favItems: [],
    },
    reducers: {
        addFavItem: (state, action) => {
            const slug = action.payload;
            state.favItems.push(slug);
        },
        removeFavItem: (state, action) => {
            const slug = action.payload;
            const index = slug.indexOf(slug);
            state.favItems.splice(index, 1);
        }
    }
})

export const { addFavItem, removeFavItem } = favSlice.actions;
export default favSlice.reducer;