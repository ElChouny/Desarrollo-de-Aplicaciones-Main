import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_key } from '../database'; // Asegúrate de que este archivo contenga tu api_key

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://identitytoolkit.googleapis.com/v1/' }), // URL base para Firebase Authentication
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signInWithPassword?key=${api_key}`, // Ruta para iniciar sesión en Firebase
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password,
                    returnSecureToken: true,
                },
            }),
        }),
        signUp: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signUp?key=${api_key}`, // Ruta para registrarse en Firebase
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password,
                    returnSecureToken: true,
                },
            }),
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
export default authApi;