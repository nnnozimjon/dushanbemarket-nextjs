import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { frontBaseUrl } from '../../utils'

export const frontProductApi = createApi({
    reducerPath: 'frontProduct',
    baseQuery: fetchBaseQuery({ baseUrl: frontBaseUrl + '/product' }),
    endpoints: build => ({
        getAllFrontProductsByPagination: build.query({
            query: params => ({
                url: `?${params}`,
                method: 'GET',
            }),
        }),
        getProductById: build.query({
            query: (id: any) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetProductByIdQuery, useGetAllFrontProductsByPaginationQuery } =
    frontProductApi
