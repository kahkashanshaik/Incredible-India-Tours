import { authApiSlice } from "../../app/apiSlice";


const ordersApi = authApiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getOrder: builder.query({
            query: (params) => ({
                url: `/order/${params.order_id}`,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => response.result
       }),
        getOrders: builder.query({
            query: (params) => ({
                url: '/orders',
                method: 'GET',
            }),
            transformResponse: (response, meta, arg) => response.result.data
       })
    })
})

export const { useGetOrderQuery, useGetOrdersQuery } = ordersApi;