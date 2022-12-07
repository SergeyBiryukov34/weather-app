import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
    reducerPath: 'weather/api',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints: build => ({

    })
})