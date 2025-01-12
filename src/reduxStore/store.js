import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlices/cartSlice';
import productReducer from './productSlices/productSlice';
const store = configureStore({
    reducer: {
        cart: cartReducer,
        products:productReducer
    },
});

export default store;
