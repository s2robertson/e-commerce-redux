import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        entries: [],
        cartOpen: false
    },
    reducers: {
        addToCart(state, action) {
            state.entries.push(action.payload);
            state.cartOpen = true;
        },
        addMultipleToCart(state, action) {
            state.entries.push(...action.payload);
        },
        updateCartQuantity(state, action) {
            state.entries.forEach(entry => {
                if (entry._id === action.payload._id) {
                    entry.purchaseQuantity = action.payload.purchaseQuantity;
                }
            });
            state.cartOpen = true;
        },
        removeFromCart(state, action) {
            state.entries = state.entries.filter(entry => entry._id !== action.payload);
            state.cartOpen = state.entries.length > 0;
        },
        clearCart(state) {
            state.entries = [];
            state.cartOpen = false;
        },
        toggleCart(state) {
            state.cartOpen = !state.cartOpen;
        }
    }
});

export const { 
    addToCart,
    addMultipleToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleCart
} = cartSlice.actions;

export const cartEntriesSelector = (state) => state.cart.entries;
export const cartOpenSelector = (state) => state.cart.cartOpen;
export default cartSlice.reducer;