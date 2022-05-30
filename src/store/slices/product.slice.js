import { createSlice } from "@reduxjs/toolkit";
import productApi from "../../services/product.service";

const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        removeProduct :(state,{payload}) =>{
            const index = state.findIndex(item => item.productId == payload) ;
            state.splice(index,1)
        },

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productApi.endpoints.getAllProducts.matchFulfilled,
            (state, {payload}) => {
                return payload;
            }
        );
        builder.addMatcher(
            productApi.endpoints.createProduct.matchFulfilled,
            (state, action) => {
                state.push(action.payload)
            }
        );
        builder.addMatcher(
            productApi.endpoints.updateProduct.matchFulfilled,
            (state, action) => {
                const product = state.products.find((item) => item.id == action.payload.id);
                product = action.payload
            }
        );

    },
});

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products;
export const selectProductById = (id) => (state) =>
    state.products.find((item) => item.id == id)

    
export const {removeProduct} = productSlice.actions