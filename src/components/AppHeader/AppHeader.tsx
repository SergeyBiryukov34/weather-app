
import {createStyles, Header, Container, Group, Burger, Paper, Transition, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from "react-router-dom";
import AppColorSchemeToggle from "../AppColorSchemeToggle/AppColorSchemeToggle";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    logo: {
        textDecoration: "none",
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        textTransform: 'uppercase'
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },

}));

interface HeaderResponsiveProps {
    links: { link: string; label: string }[];
}

const AppHeader = ({ links }: HeaderResponsiveProps) => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes } = useStyles();


    const items = links.map((link) => (
        <NavLink
            key={link.label}
            to={link.link}
            className={({ isActive }) =>
                [
                    classes.link,
                    isActive ? classes.linkActive : null,
                ]
                    .filter(Boolean)
                    .join(" ")
            }
            onClick={() => close()}
        >
            {link.label}
        </NavLink>
    ));

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header}>

                <NavLink className={classes.logo} onClick={() => close()} to='/'>
                   <Text fw={700} fz='lg' variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Weather-App</Text>
                </NavLink>

                <Group spacing={5} className={classes.links}>
                    {items}
                    <AppColorSchemeToggle/>
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                            <AppColorSchemeToggle/>
                        </Paper>

                    )}
                </Transition>

            </Container>
        </Header>
    );
}

export default AppHeader;