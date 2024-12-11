import { apiSlice } from "../../app/apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response.result.data;
            }
        })
    })
});

export const { useGetCategoriesQuery } = categoriesApi;