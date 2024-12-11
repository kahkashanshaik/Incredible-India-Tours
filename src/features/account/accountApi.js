import { authApiSlice } from "../../app/apiSlice";

const accountApi = authApiSlice.injectEndpoints({
     endpoints: (builder) => ({
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            transformResponse: (response, meta, arg) => response.result,
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.result.data
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/update-profile',
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response.result,
        }),
        getFavourites: builder.query({
            query: () => ({
                url: '/favourites',
                method: 'GET'
            }),
            providesTags: ['Favourites'],
            transformResponse: (response, meta, arg) => response.result
        }),
        addFavourite: builder.mutation({
            query: (data) => ({
                url: '/add-favourite',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Favourites'],
            transformResponse: (response, meta, arg) => response.result,
        }),
        removeFavourite: builder.mutation({
            query: (data) => ({
                url: '/remove-favourite',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Favourites'],
            transformResponse: (response, meta, arg) => response.result,
        })
    })
})
export const { useLogoutMutation, useGetProfileQuery, useUpdateProfileMutation, useGetFavouritesQuery, useAddFavouriteMutation, useRemoveFavouriteMutation } = accountApi;
