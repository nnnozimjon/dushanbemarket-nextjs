import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { merchantBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const merchantProductApi = createApi({
  reducerPath: "merchantProduct",
  baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl + "/product" }),
  endpoints: (build) => ({
    getById: build.query({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    getAllProduct: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    createProduct: build.mutation({
      query: (payload) => ({
        url: "",
        method: "POST",
        body: payload,
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    deleteProductById: build.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetByIdQuery,
  useDeleteProductByIdMutation,
} = merchantProductApi;
