// Core
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interface
import { ISearch } from '../../interface/ISearch';
import { IWeather } from '../../interface/IWeather';

// ApiKey
const API_KEY = 'e2ed94edcea24f60a9f163255221103';

export interface IGetWeather {
    name: string,
    day?: number
}

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

        getWeatherByName: build.query<IWeather, IGetWeather>({
            query: ({name = '', day = 1}) => ({
                url: `forecast.json?key=${API_KEY}`,
                params: {
                    q: name,
                    days: day,
                    aqi: 'no',
                    alerts: 'no',
                }
            }),
        }),
    })
})

export const {useSearchByNameQuery, useLazyGetWeatherByNameQuery} = weatherApi;