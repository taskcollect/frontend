import { DateTimePicker, DesktopDatePicker } from "@mui/lab";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { border, borderColor } from "@mui/system";
import React, { useState } from "react";
import LessonCard from "./LessonCard";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useTheme } from "@emotion/react";

export default function LessonView() {
    const [lessonsDate, setLessonsDate] = useState(new Date());

    const theme = useTheme() as any;

    function compareDates(a: Date, b: Date): boolean {
        return (
            a.getUTCDate() === b.getUTCDate() &&
            a.getUTCMonth() === b.getUTCMonth() &&
            a.getUTCFullYear() === b.getUTCFullYear()
        );
    }

    // I don't know why, but the date time picker returns this...
    interface weirdDate {
        $d: Date;
    }

    function handleDateChange(wd: weirdDate | null) {
        console.log(wd);

        if (wd == null) {
            setLessonsDate(new Date());
        }

        setLessonsDate((wd as weirdDate)["$d"]);
    }

    const isDateToday = compareDates(new Date(), lessonsDate);

    return (
        <Grid
            container
            direction="row"
            // justifyContent="center"
            // alignItems="center"
            gap={1}
        >
            <Grid item xs={12}>
                {/* <Paper elevation={6}> */}
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    // justifyContent="center"
                    gap={1}
                    padding={1}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5">Your Lessons</Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography color="Caption">
                            Viewing lessons on
                        </Typography>
                    </Grid> */}
                    <Grid item>
                        <DesktopDatePicker
                            // label="Lessons on"
                            inputFormat="ddd, MMM DD, YYYY"
                            value={lessonsDate}
                            renderInput={(params) => (
                                <TextField variant="standard" {...params} />
                            )}
                            onChange={handleDateChange}
                        />
                    </Grid>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => setLessonsDate(new Date())}
                            size="small"
                            disabled={isDateToday}
                        >
                            Jump to Today
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* </Paper> */}
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <LessonCard />
            </Grid>
            <Grid item xs={12}>
                <LessonCard />
            </Grid>
            <Grid item xs={12}>
                <LessonCard />
            </Grid>
            <Grid item xs={12}>
                <LessonCard />
            </Grid>
            <Grid item xs={12}>
                <LessonCard />
            </Grid>
        </Grid>
    );
}
