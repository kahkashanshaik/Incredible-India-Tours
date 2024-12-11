import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { baseQueryWithReauth } from "./apiQueryConfigs";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: () => ({}),
})

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Favourites']
})