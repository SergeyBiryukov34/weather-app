import {createStyles, Footer, Container, Group, ActionIcon, Box, Text, Anchor, Image} from '@mantine/core';
import {IconBrandInstagram, IconBrandTwitter, IconBrandYoutube} from "@tabler/icons";


const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

}));

const AppFooter = () => {
    const { classes } = useStyles();

    const currentYear = new Date().getFullYear();

    return (
        <Footer className={classes.footer} height={80}>
            <Container className={classes.inner}>
                <Group spacing={0}  noWrap>
                    <Text fw={700} tt="uppercase" fz='lg' variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Weather-App</Text>
                </Group>

                <Group>
                    <Text>{currentYear}</Text>
                </Group>
            </Container>
        </Footer>
    );
}

export default AppFooter;