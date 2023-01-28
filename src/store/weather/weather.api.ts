// Core
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interface
import { ISearch } from '../../interface/ISearch';
import { IWeather } from '../../interface/IWeather';

// ApiKey
const API_KEY = 'e2ed94edcea24f60a9f163255221103';

export const weatherApi = createApi({
    reducerPath: 'weather/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.weatherapi.com/v1/'
    }),
    endpoints: build => ({
        searchByName: build.query<ISearch[], string>({
            query: (name) => ({
                url: `search.json?key=${API_KEY}`,
                params: {
                    q: name
                }
            })
        }),

        getWeatherByName: build.query<IWeather, string>({
            query: (name) => ({
                url: `forecast.json?key=${API_KEY}`,
                params: {
                    q: name,
                    days: 3,
                    aqi: 'no',
                    alerts: 'no',
                }
            }),
        }),
    })
})

export const {useSearchByNameQuery, useLazyGetWeatherByNameQuery} = weatherApi;