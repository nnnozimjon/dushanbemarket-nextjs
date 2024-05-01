import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { frontBaseUrl } from '../../utils'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: frontBaseUrl + '/auth' }),
    endpoints: (build) => ({
        authLogin: build.mutation({
            query: (credentials: any) => ({
                url: '/sign-in',
                method: 'POST',
                body: credentials
            })
        }),
        authRegister: build.mutation({
            query: (credentials: any) => ({
                url: '/sign-up',
                method: 'POST',
                body: credentials
            })
        }),
        isUserAvailable: build.mutation({
            query: (credentials: any) => ({
                url: '/availability',
                method: "POST",
                body: credentials
            })
        }),
        sendOTP: build.mutation({
            query: (credentials: any) => ({
                url: '/otp',
                method: 'POST',
                body: credentials
            })
        })
    })
})

export const { useAuthLoginMutation, useAuthRegisterMutation, useSendOTPMutation, useIsUserAvailableMutation } = authApi