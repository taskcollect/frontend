import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import GlancePanel from "../components/mainview/ataglance/GlancePanel";
import LessonView from "../components/mainview/lessons/LessonView";
import MessageView from "../components/mainview/messages/MessageView";
import TaskView from "../components/mainview/tasks/TaskView";
import { GlobalContext } from "../lib/store";

export default function HomeRoute() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            // alignItems="center"
            // gap={0}
            padding={1}
        >
            <Grid item xs={12} pl={2} pr={2} pt={2}>
                <GlancePanel />
            </Grid>

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
