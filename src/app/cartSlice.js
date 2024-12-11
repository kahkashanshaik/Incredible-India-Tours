import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cartConfig',
    initialState: {
        cartItems: [],
        cartLoader: false
    },
    reducers: {
        addItemToCart: (state, action) => {
            const itemSlug = action.payload;
            const existingCartItem = state.cartItems.find((cartItem) => cartItem.slug == itemSlug);
            if (existingCartItem) {
                existingCartItem.count += 1;
            } else {
                state.cartItems.push({
                    slug: itemSlug,
                    count: 1
                });
            }
        },
        showCartLoader: (state, action) => {
            state.cartLoader = true;
        },
        hideCartLoader: (state, action) => {
            state.cartLoader = false
        },
        removeItemFromCart: (state, action) => {
            // remove item from cart
        },
    }
})
export const { addItemToCart, removeItemFromCart,  showCartLoader, hideCartLoader } = cartSlice.actions;
export default cartSlice.reducer;