import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);
            const productPrice = Number(product.priceAfterDiscount);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += Number(productPrice);
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                    totalPrice: productPrice,
                });
            }
            state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);

            if (existingItem) {
                state.items = state.items.filter((item) => item.id !== productId);
                state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
            }
        },
        decrementQuantity(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                existingItem.totalPrice -= existingItem.priceAfterDiscount;
                state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
            } else if (existingItem && existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== productId);
                state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
            }
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
