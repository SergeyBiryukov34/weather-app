import {Forecastday, Hour} from '../../interface/IWeather';
import {Box, createStyles, Group, ScrollArea, Stack, Table, Tabs, Text} from '@mantine/core';

import { IconTemperatureCelsius as Celsius, IconTemperatureFahrenheit as Fahrenheit } from '@tabler/icons';
import {log} from 'util';


interface IWeatherProps extends Forecastday {
    degree: boolean,
    speed: boolean,
    timeEpoch: number
}


const useStyles = createStyles(theme => ({
    cell: {
        textAlign: 'center'
    },
    prevHour: {
        opacity: '.4',
        textAlign: 'center'
    },
    img: {
        width: '3rem',
        height: '3rem'
    },
    speed: {
        textTransform: 'uppercase',
        fontSize: '.8rem',
        color: theme.colors.gray[5]
    }
}))


export const AppTable = ({date, astro, day, hour, speed, degree, timeEpoch}: IWeatherProps ) => {

    const {classes, theme} = useStyles();

    const hours = hour.filter(hour => +hour.time.slice(-5, -3) % 2 === 0)
    const {sunrise, sunset, moonset, moonrise, moon_phase, moon_illumination} = astro
    const {maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, totalprecip_mm, avghumidity, uv} = day

    const localTime = timeEpoch - 7200;

    // render cell

    // const Cell = (arr: Hour) => {
    //
    // }

    return (
        <Tabs.Panel value={date} key={date} pt="xs">

            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0 2rem 0'}}>

                <Stack>
                    <Group>
                        <Text fz='md'>Maximum temperature for the day:</Text>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Text fz='md' fw={300}>{degree ? maxtemp_f : maxtemp_c}</Text>
                            <Box sx={{paddingLeft: '.5rem', display: 'flex', alignItems: 'center'}}>
                                {degree ? <Fahrenheit color={theme.colors.gray[5]} size='18'/> : <Celsius color={theme.colors.gray[5]} size='18' />}
                            </Box>
                        </Box>
                    </Group>

                    <Group>
                        <Text fz='md'>Minimum temperature for the day:</Text>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Text fz='md' fw={300}>{degree ? mintemp_f : mintemp_c}</Text>
                            <Box sx={{paddingLeft: '.5rem', display: 'flex', alignItems: 'center'}}>
                                {degree ? <Fahrenheit color={theme.colors.gray[5]} size='18'/> : <Celsius color={theme.colors.gray[5]} size='18' />}
                            </Box>
                        </Box>
                    </Group>

                    <Group>
                        <Text fz='md'>Total precipitation:</Text>
                        <Text fz='md' fw={300}>{totalprecip_mm} mm</Text>
                    </Group>

                    <Group>
                        <Text fz='md'>Average humidity:</Text>
                        <Text fz='md' fw={300}>{avghumidity} %</Text>
                    </Group>
                </Stack>

                <Stack>
                    <Group>
                        <Text fz='md' >Sunrise:</Text><Text fz='md' fw={300} >{sunrise}</Text>
                        <Text fz='md' >Sunset:</Text> <Text fz='md' fw={300} >{sunset}</Text>
                    </Group>
                    <Stack>

                        <Group>
                            <Text fz='md' >Moonrise:</Text> <Text fz='md' fw={300} >{moonrise}</Text>
                            <Text fz='md' >Moonset:</Text> <Text fz='md' fw={300} >{moonset}</Text>
                        </Group>
                        <Group>
                            <Text fz='md' >Moon Phase:</Text> <Text fz='md' fw={300} >{moon_phase}</Text>
                        </Group>

                        <Group>
                            <Group>
                                <Text fz='md'>UV Index:</Text>
                                <Text fz='md' fw={300}>{uv}</Text>
                            </Group>
                            <Group>
                                <Text fz='md'>Moon illumination:</Text>
                                <Text fz='md' fw={300}>{moon_illumination} %</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Stack>
            </Box>

            <ScrollArea type="auto">

                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    
                    <thead>
                        <tr>
                            <td>Local time:</td>{ hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.time.slice(-5)}</td>) }
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td> <Text fw={600}>Condition:</Text> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}><img className={classes.img} src={hour.condition.icon} alt={hour.condition.text} /></td>)}
                        </tr>
                        <tr>
                            <td> <Group><Text fw={600}>Temp:</Text> {degree ? <Fahrenheit color={theme.colors.gray[5]} size='16'/> : <Celsius color={theme.colors.gray[5]} size='16' />}</Group> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{degree ? hour.temp_f : hour.temp_c}</td>)}
                        </tr>
                        <tr>
                            <td> <Group> <Text fw={600}>Wind:</Text> {speed ? <Text className={classes.speed}>mp/h</Text> : <Text className={classes.speed} >km/h</Text>}</Group> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{speed ? hour.wind_mph : hour.wind_kph} </td>)}
                        </tr>
                        <tr>
                            <td> <Text fw={600}>Cloud:</Text> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.cloud}</td>)}
                        </tr>
                        <tr>
                            <td> <Text fw={600}>Gust:</Text> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.gust_kph}</td>)}
                        </tr>

                        <tr>
                            <td> <Group><Text fw={600}>Rain:</Text> <Text c={theme.colors.gray[5]} >%</Text> </Group></td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.chance_of_rain}</td>)}
                        </tr>

                        <tr>
                            <td> <Group><Text fw={600}>Snow:</Text> <Text c={theme.colors.gray[5]} >%</Text> </Group></td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.chance_of_snow}</td>)}
                        </tr>

                        <tr>
                            <td> <Group><Text fw={600}>Precip:</Text> <Text c={theme.colors.gray[5]} >MM</Text> </Group> </td>{hours.map(hour => <td className={localTime > hour.time_epoch ? classes.prevHour : classes.cell} key={hour.time_epoch}>{hour.precip_mm}</td>)}
                        </tr>
                    </tbody>
                </Table>
            </ScrollArea>
        </Tabs.Panel>
    )
}