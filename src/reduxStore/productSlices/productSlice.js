import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllProducts} from "@/services/getAllProducts.js";

const initialState = {
    products:[],
    isLoading: false,
   isError: false,
    error:null
}
export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>{
const products = await getAllProducts();
return products;
} )
const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
       .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default productSlice.reducer;