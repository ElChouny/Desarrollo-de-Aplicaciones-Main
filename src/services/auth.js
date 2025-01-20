import { base_auth_url, api_key } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_auth_url }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: "POST",
                body: credentials,
                returnSecureToken: true
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: "POST",
                body: credentials,
                returnSecureToken: true
            })
        }),
    })
})

export const { useSignUpMutation, useLoginMutation } = authApi