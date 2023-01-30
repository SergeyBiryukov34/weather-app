// Core
import {Container, createStyles, Grid, Loader} from "@mantine/core"
// Components
import { AppSearch } from "../components/AppSearch/AppSearch"
import { AppCard } from '../components/AppCard/AppCard'
// Api
import { useLazyGetWeatherByNameQuery } from '../store/weather/weather.api'
// Interface
import { IWeather } from '../interface/IWeather'
import {Helmet} from "react-helmet"

//  Custom Styles
const useStyles = createStyles(() => ({
    hFull: {
        height: '100%'
    }
}))

const Home = () => {
    const {classes} = useStyles()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery()


    return (
        <>
            <Helmet>
                <title>Weather App</title>
            </Helmet>
            <Container className={classes.hFull}>

                <Grid>
                    <Grid.Col>
                        <AppSearch getWeather={getWeather}/>
                    </Grid.Col>
                </Grid>

                <Grid className={classes.hFull} gutter='md' align="center" justify="center">

                    {
                        isError
                            ? <p>Something went wrong...</p>
                            : (isLoading || isFetching)
                                ? <Loader/>
                                : (weather !== null)
                                    ? <View forecast={weather.forecast} location={weather.location} current={weather.current}/>
                                    : <p>Enter the name of the city in the query string.</p>
                    }

                </Grid>
            </Container>
        </>


    )
}

function View ({location, forecast, current}: IWeather) {

    return (
        <Grid.Col span={12} xs={7} sm={6} md={4}>
            <AppCard forecast={forecast} current={current} location={location} />
        </Grid.Col>
    )
}

export default Home