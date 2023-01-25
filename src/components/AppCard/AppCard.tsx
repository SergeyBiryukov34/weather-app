// Core
import React, { useState } from 'react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, Stack } from '@mantine/core';
// Interface
import { IWeather } from '../../interface/IWeather';
// Icons
import { IconMapPin, IconTemperatureCelsius, IconTemperatureFahrenheit, IconWind, IconCloud } from '@tabler/icons';
import {NavLink} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export const AppCard = ({location, current}: IWeather) => {

    const { classes, theme } = useStyles();

    const { name, country, localtime } = location;
    const { condition: {text, icon}, temp_c, temp_f, wind_kph, wind_mph, cloud } = current;

    const [ temperature, setTemperature ] = useState<boolean>(true);
    const [ wind, setWind ] = useState<boolean>(true);


    return (
        <Card withBorder radius="md" p="md" className={classes.card}>

            <Card.Section withBorder inheritPadding py="xs" className={classes.section}>
                <Group spacing="xs" position="apart">
                    <Group spacing="xs">
                        <IconMapPin size="20"/>

                        <Text size="sm" weight={500}>
                            {name}, {country}
                        </Text>
                    </Group>
                    <Badge size="md">{localtime}</Badge>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
               <Group position="center">
                   <Stack align="center">
                       <Image src={icon} alt={text}  height={80} width={80}/>
                       <Text size="md" weight={500}>
                           {text}
                       </Text>

                       <Group>
                           <ActionIcon size={60} title="Switch degree type" onClick={() => setTemperature(!temperature)} >
                               {temperature ? <><Text fz="lg" fw={700}>{temp_f}</Text><IconTemperatureFahrenheit size="20"/></> : <><Text fz="lg" fw={700}>{temp_c}</Text><IconTemperatureCelsius size="20"/></>}
                           </ActionIcon>
                       </Group>
                   </Stack>

               </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group position="apart" spacing="xs">
                    <Group spacing="xs" mt="md">
                        <IconWind size="20"/>
                        <Text fz="sm">Wind:</Text>
                        <ActionIcon title="Switch speed type" onClick={() => setWind(!wind)} size={60} >
                            {wind ? <Text fz="sm">{wind_mph}mp/h</Text> : <Text fz="sm">{wind_kph}kp/h</Text>}
                        </ActionIcon>
                    </Group>

                    <Group spacing="xs" mt="md">
                        <IconCloud size="20"/>
                        <Text fz="sm">Cloud:</Text>
                        <Text fz="sm">{cloud}</Text>
                    </Group>
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    <NavLink className={classes.link} to={`detail/${name}`}>
                        Show details
                    </NavLink>
                </Button>
            </Group>

        </Card>
    );
}