import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { frontBaseUrl } from "../../utils";


export const frontWidgetApi = createApi({
    reducerPath: 'widgets',
    baseQuery: fetchBaseQuery({ baseUrl: frontBaseUrl + '/widget' }),
    endpoints: (build) => ({
        getAllWidgets: build.query({
            query: (params: any) => ({
                url: `?location=${params}`,
                method: "GET"
            })
        })
    })
})

export const { useGetAllWidgetsQuery } = frontWidgetApi