import Container from "@mui/material/Container";

import { Grid } from "@mui/material";
import LoginForm from "../components/login/LoginForm";

export default function LoginRoute() {
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
                        padding={2}
                        paddingTop={10}
                        paddingBottom={10}
                    >
                        <LoginForm />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
