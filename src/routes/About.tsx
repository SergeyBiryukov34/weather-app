// Core
import { ActionIcon, Anchor, Container, createStyles, Group, Image, Stack, Text } from "@mantine/core"
// Icons
import { IconBrandGithub, IconBrandReact, IconBrandRedux, IconBrandTypescript, IconBrandMantine } from '@tabler/icons'
// React Helmet
import {Helmet} from 'react-helmet'

const useStyles = createStyles(
    ()=> ({
    inner: {
       display: 'flex',
       justifyContent: 'center',
        padding: '2rem 0'
    }
}))

const About = () => {

    const {classes, theme} = useStyles()

    return (
        <>
            <Helmet>
                <title>About</title>
            </Helmet>

            <Container className={classes.inner}>

                <Stack sx={{width: '100%', alignItems: 'center'}}>

                    <Group sx={{width: '100%', justifyContent: 'space-around'}}>
                        <Stack>
                            <Text fw={300} fz='xl'>Weather forecast app</Text>
                            <Group>
                                <Text fw={300} fz='lg' >Created by </Text>
                                <Text fz='xl'>"Sergey Biryukov"</Text>
                            </Group>
                        </Stack>

                        <Stack align='center'>
                            <Text fw={300} fz='xl'>Source code App</Text>
                            <ActionIcon size={36}>
                                <Anchor title='GitHub' href='https://github.com/SergeyBiryukov34/weather-app' target='_blank' color='white'>
                                    <IconBrandGithub width='100%' height='100%' color={theme.colors.gray[7]} />
                                </Anchor>
                            </ActionIcon>
                        </Stack>
                    </Group>

                    <Stack sx={{marginTop: '10rem', width: '100%'}} align='center'>
                        <Text fz='xl' fw={400} sx={{letterSpacing: '.1rem'}}>Developed with technologies:</Text>

                        <Group sx={{width: '100%', justifyContent: 'space-around', paddingTop: '1rem'}}>
                            <Group>
                                <Stack align='center'>
                                    <Text fz='lg' fw={300} >Frontend</Text>

                                    <Group grow>
                                        <ActionIcon size={64}>
                                            <Anchor href='https://reactjs.org/' target='_blank' title='React JS'>
                                                <IconBrandReact width='100%' height='100%' color={theme.colors.gray[7]}/>
                                            </Anchor>
                                        </ActionIcon>

                                        <ActionIcon size={64}>
                                            <Anchor href='https://redux.js.org/' target='_blank' title='Redux'>
                                                <IconBrandRedux width='100%' height='100%' color={theme.colors.gray[7]}/>
                                            </Anchor>
                                        </ActionIcon>

                                        <ActionIcon size={64}>
                                            <Anchor href='https://www.typescriptlang.org/' target='_blank' title='TypeScript'>
                                                <IconBrandTypescript width='100%' height='100%' color={theme.colors.gray[7]}/>
                                            </Anchor>
                                        </ActionIcon>

                                        <ActionIcon size={64}>
                                            <Anchor href='https://mantine.dev/' target='_blank' title='Mantine.dev'>
                                                <IconBrandMantine width='100%' height='100%' color={theme.colors.gray[7]}/>
                                            </Anchor>
                                        </ActionIcon>
                                    </Group>

                                </Stack>
                            </Group>

                            <Group>
                                <Stack align='center'>
                                    <Text fz='lg' fw={300} >Backend</Text>

                                    <Anchor href="https://www.weatherapi.com" target="_blank">
                                        <Image src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" />
                                    </Anchor>
                                </Stack>
                            </Group>
                        </Group>

                    </Stack>
                </Stack>

            </Container>
        </>
    );
};

export default About
