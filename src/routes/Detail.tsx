// Core
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Loader } from '@mantine/core';
// React Helmet
import { Helmet } from 'react-helmet';
// Hook from API
import { useLazyGetWeatherByNameQuery} from '../store/weather/weather.api';
// Components
import { AppTabs } from '../components/AppTabs/AppTabs';


export function Detail() {
    const {name} = useParams()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    useEffect(() => {
        if (name) {
            getWeather(name, true)
        }
    }, [name])

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
        <>
            <Helmet>
                <title>Weather in {name}</title>
            </Helmet>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                {renderContent()}
            </Container>

        </>

    )
}
