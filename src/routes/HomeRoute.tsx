import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import LessonView from "../components/mainview/lessons/LessonView";
import TaskView from "../components/mainview/tasks/TaskView";
import { GlobalContext } from "../lib/store";

import strings from "../lib/strings";

export default function HomeRoute() {
    const { globalState, dispatch } = useContext(GlobalContext);

    const friendlyUsername = globalState.creds?.username || "unknown";

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            // alignItems="center"
            gap={2}
            padding={2}
        >
            <Grid item xs={12} pb={1}>
                <Typography variant="h4">
                    Hello, {strings.capitalize(friendlyUsername)}.
                </Typography>
            </Grid>

            <Grid item xs>
                <Paper variant="outlined">
                    <Box p={2}>
                        <LessonView />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
