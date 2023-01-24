import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, ColorSchemeProvider, MantineProvider, ColorScheme} from "@mantine/core";
import {useHotkeys, useLocalStorage} from '@mantine/hooks';

import {links} from "./routes";

import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";

export const Root = () => {

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <AppShell
                    padding="sm"
                    header={<AppHeader links={links}/>}
                    footer={<AppFooter/>}
                    styles={(theme) => ({
                        main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
                    })}
                >
                    <Outlet/>
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};
