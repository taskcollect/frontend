import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import LessonView from "../components/mainview/lessons/LessonView";
import MessageView from "../components/mainview/messages/MessageView";
import TaskView from "../components/mainview/tasks/TaskView";
import { GlobalContext } from "../lib/store";

export default function HomeRoute() {
    const { globalState } = useContext(GlobalContext);

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
            {/* <Grid item xs={12} pb={1}>
                <Typography variant="h4">
                    Hello, {strings.capitalize(friendlyUsername)}.
                </Typography>
            </Grid> */}

            <Grid item xs>
                <Box p={2}>
                    <LessonView />
                </Box>
            </Grid>

            <Grid item xs>
                <Box p={2}>
                    <TaskView />
                </Box>
            </Grid>

            <Grid item xs>
                <Box p={2}>
                    <MessageView />
                </Box>
            </Grid>
        </Grid>
    );
}
