import { base_url } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["User", "ImageProfile", "Location"
        /*"updateImageProfile", "updateLocatation"*/
    ],
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        patchImageProfile: builder.mutation({
            query: ({ localId, image }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { image }
            }),
            invalidatesTags: (result, error, {localId}) => [{type: "User", id: localId}, "ImageProfile" ]
        }),
        patchLocation: builder.mutation({
            query: ({ localId, address, location }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { address, location }
            }),
            invalidatesTags: (result, error, {localId}) => [{type: "User", id: localId}, "Location" ]
        }),
        getUser: builder.query({
            query: ({ localId }) => `users/${localId}.json`,
            providesTags: (result, error, {localId}) => [{type: "User", id: localId}, "ImageProfile", "Location" ]
        }),

    })
})

export const { usePatchImageProfileMutation, useGetUserQuery, usePatchLocationMutation } = userApi