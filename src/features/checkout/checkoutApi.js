import { authApiSlice } from "../../app/apiSlice";

const checkoutApi = authApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        paymentIntent: builder.mutation({
             query: (data) => ({
                url: '/checkout/payment-intent',
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response.result.data
        })
    })
})
export const { usePaymentIntentMutation } = checkoutApi;