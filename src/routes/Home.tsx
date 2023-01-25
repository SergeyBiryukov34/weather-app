// Core
import {Container, createStyles, Grid, Loader, Skeleton} from "@mantine/core";
// Components
import { AppSearch } from "../components/AppSearch/AppSearch";
import { AppCard } from '../components/AppCard/AppCard';
// Api
import { useLazyGetWeatherByNameQuery } from '../store/weather/weather.api';
// Interface
import { IWeather } from '../interface/IWeather';
import React from 'react';

const useStyles = createStyles((theme) => ({
    hFull: {
        height: '100%'
    }
}))

export const Home = () => {
    const {classes} = useStyles();

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    const error = isError ? <p>Something went wrong...</p> : null
    const loading = isLoading || isFetching ? <Loader/> : null
    const content = weather !== null && !error && !loading ? <View forecast={weather.forecast} location={weather.location} current={weather.current}/> : <p>Enter the name of the city in the query string.</p>

    return (
        <Container className={classes.hFull}>
            <Grid>
                <Grid.Col span={12}>
                    <AppSearch getWeather={getWeather}/>
                </Grid.Col>
            </Grid>

            <Grid className={classes.hFull} gutter='md' align="center" justify="center">
                { content }
            </Grid>
        </Container>
    );
};

    function View ({location, forecast, current}: IWeather) {

        return (
            <Grid.Col span={4}>
                <AppCard forecast={forecast} current={current} location={location} />
            </Grid.Col>
        )
    }

