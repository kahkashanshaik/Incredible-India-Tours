import { apiSlice } from "../../app/apiSlice";

const filtersApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPackages: build.mutation({
            query: (data) => ({
                url: '/packages',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Package'],
            transformResponse: (response) => {
                return response.result;
            }
        }),
        getPackage: build.query({
            query: (slug) => ({
                url: `/package/${slug}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response.result.data[0];
            }
        })
    })
});

export const { useGetPackagesMutation, useGetPackageQuery } = filtersApi;