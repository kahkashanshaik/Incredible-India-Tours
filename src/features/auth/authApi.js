import { apiSlice } from "../../app/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response.result,
            
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
        }),
    })
});

export const { useRegisterMutation, useLoginMutation } = authApi