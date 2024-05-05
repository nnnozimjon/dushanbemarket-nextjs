import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { frontBaseUrl } from '../../utils'
import { usingBearerToken } from '@/hooks'

export const frontOrderApi = createApi({
    reducerPath: 'frontOrder',
    baseQuery: fetchBaseQuery({ baseUrl: frontBaseUrl + '/order' }),
    endpoints: build => ({
        orderProducts: build.mutation({
            query: params => ({
                url: ``,
                method: 'POST',
                body: params,
                headers: { Authorization: usingBearerToken() }
            }),
        }),
        getAllOrders: build.query({
            query: params => ({
                url: `${params}`,
                method: "GET",
                headers: { Authorization: usingBearerToken() }
            })
        })
    }),
})

export const { useOrderProductsMutation, useGetAllOrdersQuery } =
frontOrderApi
