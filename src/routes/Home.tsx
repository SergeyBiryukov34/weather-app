import React from 'react';
import {Container, Grid} from "@mantine/core";
import AppSearch from "../components/AppSearch/AppSearch";

const Home = () => {
    return (
        <Container>
            <Grid>
                <Grid.Col span={12}>
                    <AppSearch/>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default Home;