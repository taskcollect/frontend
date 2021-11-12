import { Divider, Typography, Box, Grid, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { GlobalContext } from "../../../lib/store";
import { capitalize } from "../../../lib/strings";

import ScheduleIcon from "@mui/icons-material/Schedule";
import FastForwardIcon from "@mui/icons-material/FastForward";

export default function GlancePanel() {
    const { globalState } = useContext(GlobalContext);

    const friendlyUsername = capitalize(
        globalState.creds?.username || "unknown"
    );

    return (
        <>
            <Grid container gap={3} justifyContent="center">
                <Grid item display="flex" alignItems="center">
                    <ScheduleIcon />
                    <Tooltip arrow title="Today's date">
                        <Typography variant="h5" pl={1} color="text.secondary">
                            {dayjs().format("ddd, Do MMMM, YYYY")}
                        </Typography>
                    </Tooltip>
                </Grid>
                <Grid item display="flex" alignItems="center">
                    <FastForwardIcon />
                    <Tooltip arrow title="Your next lesson">
                        <Typography variant="h5" pl={1} color="text.secondary">
                            Digital Technology 2LA03
                        </Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </>
    );
}
