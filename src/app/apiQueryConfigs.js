import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setAccessToken } from "./authSlice";


/**
 * This function is used to create a base query that will be used by all endpoints.
 */
const baseQuery = fetchBaseQuery(
    {
        baseUrl: import.meta.env.VITE_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const {token: accessToken} = getState().authConfig
            if (accessToken) {
                headers.set("authorization", `Bearer ${accessToken}`);
            }
            // headers.set("Content-Type", "application/json");
            // return headers;
        },
        credentials: "include",
    },
);
/**
 * 
 * @param {*} args 
 * @param {*} api 
 * @param {*} extraOptions 
 * @returns  
 */
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
        console.log(refreshResult);
        if (refreshResult.data) {
            api.dispatch(setAccessToken(refreshResult.data.access_token));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
}

export default baseQuery;