import {useState} from 'react';

import {Box, Group, Switch, Tabs, Text, Title} from '@mantine/core';
import {IWeather} from '../../interface/IWeather';

import {AppTable} from '../AppTable/AppTable';

export const AppTabs = ({location, forecast}: IWeather) => {

    const [activeTab, setActiveTab] = useState<string | null>(forecast.forecastday[0].date);

    const [degree, setDegree] = useState<boolean>(true)
    const [speed, setSpeed] = useState<boolean>(true)

    const days = forecast.forecastday;

    return (
        <Tabs value={activeTab} onTabChange={setActiveTab}>

            <Box sx={{padding: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
                days.map(item => {

                    return (
                        <AppTable key={item.date_epoch} {...item} speed={speed} degree={degree} timeEpoch={location.localtime_epoch} />
                    )
                })
            }
        </Tabs>
    );
}