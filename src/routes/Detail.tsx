import {useParams} from 'react-router-dom';
import { useLazyGetWeatherByNameQuery} from '../store/weather/weather.api';
import {useEffect, useState} from 'react';
import {
    Box,
    Container,
    createStyles,
    Loader,
    ScrollArea, Switch,
    Table,
    Tabs,
    Title,
    Text, Group, Stack
} from '@mantine/core';
import {IWeather} from '../interface/IWeather';
import { IconMapPin, IconTemperatureCelsius as Celsius, IconTemperatureFahrenheit as Fahrenheit, IconWind, IconCloud } from '@tabler/icons';

const useStyles = createStyles(theme => ({
    header: {
        padding: `${theme.spacing.md}px 0`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    cell: {
        textAlign: 'center',
        'svg': {
            marginLeft: '.2rem'
        }

    },
    offDay: {
        opacity: '.4'
    }
}))
export function Detail() {
    const {name} = useParams()

    const [getWeather, {data: weather = null, isLoading, isFetching, isError}] = useLazyGetWeatherByNameQuery();

    useEffect(() => {
        if (name) {
            getWeather({name: name, day:2})
        }
    }, [name])


    const error = isError ? <p>Something went wrong...</p> : null
    const loading = isLoading || isFetching ? <Loader/> : null
    const content = weather !== null && !error && !loading ? <View forecast={weather.forecast} location={weather.location} current={weather.current}/> : <Loader/>

    return (
        <Container>
            {content}
        </Container>
    )
}

function View({location, forecast}: IWeather) {
    const [activeTab, setActiveTab] = useState<string | null>(forecast.forecastday[0].date);
    const {classes} = useStyles()

    const [degree, setDegree] = useState<boolean>(true)
    const [speed, setSpeed] = useState<boolean>(true)

    const days = forecast.forecastday;

    return (
        <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Box className={classes.header}>
                <Title order={3} >Weather in <Text fw={300} >{location.name}, {location.country}</Text></Title>

                <Group>
                    <Switch size='lg' onLabel="F" offLabel="C" checked={degree} labelPosition="left" title='Toggle to change degree' onChange={(event) => setDegree(event.currentTarget.checked)} />
                    <Switch size='lg' onLabel="MP/H" offLabel="KM/H" checked={speed} labelPosition="left" title='Toggle to change speed' onChange={(event) => setSpeed(event.currentTarget.checked)} />
                </Group>
            </Box>

            <Tabs.List>
                {days.map(day => <Tabs.Tab value={day.date} key={day.date} > {day.date} </Tabs.Tab>)}
            </Tabs.List>

            {
                days.map(day => {

                    const hours = day.hour.filter(hour => +hour.time.slice(-5, -3) % 2 === 0)
                    const {sunrise, sunset, moonset, moonrise, moon_phase} = day.astro

                    const currentHour = day.hour.filter(hour => hour.time_epoch > location.localtime_epoch)

                    return (
                        <Tabs.Panel value={day.date} key={day.date}pt="xs">

                            <Stack sx={{padding: '1rem 0 2rem 0'}}>
                                <Group>
                                    <Text>Sunrise:</Text> <Text fw={300} >{sunrise}</Text>
                                    <Text>Sunset:</Text> <Text fw={300} >{sunset}</Text>
                                </Group>
                                <Group>
                                    <Text>Moonrise:</Text> <Text fw={300} >{moonrise}</Text>
                                    <Text>Moonset:</Text> <Text fw={300} >{moonset}</Text>
                                    <Text>Moon Phase:</Text> <Text fw={300} >{moon_phase}</Text>
                                </Group>
                            </Stack>

                            <ScrollArea>
                                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                                    <thead>
                                        <tr><td>Time: </td>{ hours.map(hour => <td className={classes.cell} key={hour.time_epoch}>{hour.time.slice(-5)}</td>) }</tr>
                                    </thead>
                                    <tbody>

                                    <tr><td>Temp: </td>{hours.map(hour => <td className={classes.cell} key={hour.time_epoch}><div className={classes.inner}>{degree ? hour.temp_f : hour.temp_c} {degree ? <Fahrenheit size='18'/> : <Celsius size='18' />}</div></td>)}</tr>
                                    <tr><td>Wind: </td>{hours.map(hour => <td className={classes.cell} key={hour.time_epoch}><div className={classes.inner}>{speed ? hour.wind_mph : hour.wind_kph} {speed ? <Text sx={{paddingLeft: '.2rem'}}>mp/h</Text> : <Text sx={{paddingLeft: '.2rem'}}>km/h</Text>}</div></td>)}</tr>
                                    <tr><td>Cloud: </td>{hours.map(hour => <td className={classes.cell} key={hour.time_epoch}>{hour.cloud}</td>)}</tr>
                                    <tr><td>Gust: </td>{hours.map(hour => <td className={classes.cell} key={hour.time_epoch}>{hour.gust_kph}</td>)}</tr>
                                    <tr><td>Condition: </td>{hours.map(hour => <td className={classes.cell} key={hour.time_epoch}><img src={hour.condition.icon} alt={hour.condition.text} /></td>)}</tr>
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