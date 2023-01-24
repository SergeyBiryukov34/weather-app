import {useParams} from 'react-router-dom';
import { useLazyGetWeatherByNameQuery} from '../store/weather/weather.api';
import {useEffect, useState} from 'react';
import {
    Box,
    Container,
    createStyles,
    Loader,
    ScrollArea,
    Select,
    Table,
    Tabs,
    Title
} from '@mantine/core';
import {IWeather} from '../interface/IWeather';

const useStyles = createStyles(theme => ({
    header: {
        padding: `${theme.spacing.md}px 0`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))
export function Detail() {
    const {name} = useParams()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    useEffect(() => {
        if (name) {
            getWeather({name: name, day:1})
        }
    }, [name])


    const error = isError ? <p>Something went wrong...</p> : null
    const loading = isLoading || isFetching ? <Loader/> : null
    const content = weather !== null && !error && !loading ? <View forecast={weather.forecast} location={weather.location} current={weather.current}/> : <Loader/>

    return (
        <Container>
            {content}
        </Container>
    );


}

function View({location, forecast}: IWeather) {
    const [activeTab, setActiveTab] = useState<string | null>(forecast.forecastday[0].date);
    const {classes} = useStyles()

    const [value, setValue] = useState<string | null>(null);

    const days = forecast.forecastday;

    return (
        <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Box className={classes.header}>
                <Title order={5} >Weather in {location.name}, {location.country}</Title>
                <Select
                    value={value}
                    onChange={setValue}
                    label={<p>Get the weather forecast for</p>}
                    data={[]}
                />
            </Box>

            <Tabs.List>
                {days.map(day => <Tabs.Tab value={day.date} key={day.date} > {day.date} </Tabs.Tab>)}
            </Tabs.List>

            {
                days.map(day => {

                    const hours = day.hour.filter(hour => hour.time_epoch > location.localtime_epoch ? hour : null)

                    return (
                        <Tabs.Panel value={day.date} key={day.date}pt="xs">
                            <ScrollArea>
                                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                                    <thead>
                                        <tr>
                                            { hours.map(hour => <td>{hour.time.slice(-5)}</td>) }
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Temp: </td>
                                        {
                                            hours.map(hour => (

                                                <td>{hour.temp_c}</td>


                                            ))
                                        }
                                    </tr>
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Tabs.Panel>
                    )
                })
            }

        </Tabs>
    )
}