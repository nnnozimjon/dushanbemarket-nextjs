import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { frontBaseUrl } from "../../utils";


export const categoryApi = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({ baseUrl: frontBaseUrl + '/category' }),
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: (params: any) => ({
                url: ``,
                method: "GET"
            })
        })
    })
})

export const { useGetAllCategoriesQuery } = categoryApi