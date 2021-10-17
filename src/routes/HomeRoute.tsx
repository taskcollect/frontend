import { Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function HomeRoute() {
    return (
        <Container maxWidth="md">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                padding={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Welcome to Taskcollect!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">You're logged in!</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
