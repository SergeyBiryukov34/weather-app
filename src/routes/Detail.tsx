import {useParams} from 'react-router-dom';
import { useLazyGetWeatherByNameQuery} from '../store/weather/weather.api';
import {useEffect} from 'react';
import {Container, Loader,} from '@mantine/core';
import {AppTabs} from '../components/AppTabs/AppTabs';

export function Detail() {
    const {name} = useParams()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    useEffect(() => {
        if (name) {
            getWeather({name: name, day:3})
        }
    }, [name])


    const error = isError ? <p>Something went wrong...</p> : null
    const loading = isLoading || isFetching ? <Loader/> : null
    const content = weather !== null && !error && !loading ? <AppTabs current={weather.current} location={weather.location} forecast={weather.forecast}/> : <Loader/>

    return (
        <Container>
            {content}
        </Container>
    )
}
