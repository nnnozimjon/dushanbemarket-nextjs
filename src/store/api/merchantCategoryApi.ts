import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { merchantBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const merchantCategoryApi = createApi({
  reducerPath: "merchantCategory",
  baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl + "/category" }),
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery } = merchantCategoryApi;
