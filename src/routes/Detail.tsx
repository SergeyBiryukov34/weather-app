import {useParams} from 'react-router-dom';
import { useLazyGetWeatherByNameQuery} from '../store/weather/weather.api';
import {useEffect} from 'react';
import {Container, Loader,} from '@mantine/core';
import {AppTabs} from '../components/AppTabs/AppTabs';
import {Helmet} from 'react-helmet';


export function Detail() {
    const {name} = useParams()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    useEffect(() => {
        if (name) {
            getWeather(name)
        }
    }, [name])

    // const error = isError && <p>Something went wrong...</p>
    // const loading = (isLoading || isFetching) && <Loader/>
    // const content = (weather !== null) &&  <AppTabs current={weather.current} location={weather.location} forecast={weather.forecast}/>

    const renderContent = () => {

        if (isError) {
            return <p>Something went wrong...</p>
        }

        if (isLoading || isFetching) {
            return <Loader/>
        }

        if (weather !== null) {
            return <AppTabs forecast={weather.forecast} location={weather.location} current={weather.current}/>
        }

    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Helmet>
                <title>Weather in {name}</title>
            </Helmet>
            {renderContent()}
        </Container>
    )
}
