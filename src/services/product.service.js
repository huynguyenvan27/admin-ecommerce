import { createApi } from "@reduxjs/toolkit/query/react";
import { productStoreBaseQuery } from "./baseUrl.service";
const productApi = createApi({
  reducerPath : "productsApi",
  baseQuery : productStoreBaseQuery,
  endpoints: (builder)=>({
    getAllProducts : builder.query({
      query:()=>{return 'products'}
    }),
    getProductById: builder.query({
      query: ( id ) => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (data
        ) => {
          return {
              url: "products",
              method: "POST",
              body: data,
          };
      },
    }),
    deteleProduct: builder.mutation({
      query: ( id ) => {
          return {
              url: `products/${id}`,
              method: "DETELE"
          };
      },
    }),
    updateProduct : builder.mutation({
      query:(id) =>{
        return{
          url: `products/${id}`,
          method: "PUT"
        }
      }
    })
  })
})



export default productApi;
export const {useUpdateProductMutation,useGetAllProductsQuery,useGetProductByIdQuery,useCreateProductMutation,useDeteleProductMutation} = productApi;