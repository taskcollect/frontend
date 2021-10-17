import Container from "@mui/material/Container";

import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import SetupForm from "../components/setup/SetupForm";

export default function SetupRoute() {


    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container maxWidth="md">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center" // vertical align
                spacing={0}
                padding={2}
            >
                <Grid item xs justifyContent="center">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center" // vertical align
                        paddingTop={isTablet ? 2 : 5}
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                Let's get you set up.
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <SetupForm />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
