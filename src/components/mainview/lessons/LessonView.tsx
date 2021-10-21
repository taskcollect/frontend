import { DateTimePicker, DesktopDatePicker } from "@mui/lab";
import {
    Backdrop,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { border, borderColor } from "@mui/system";
import React, { Dispatch, SetStateAction, useState } from "react";
import LessonCard from "./LessonCard";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useTheme } from "@emotion/react";
import { LessonInterface, LessonPresenceEnum } from "../../../lib/lesson";
import LessonDetailsDialog from "./LessonDetailsDialog";
import dayjs from "dayjs";

export default function LessonView() {
    const [lessonsDate, setLessonsDate] = useState(new Date());
    const [dialogOpenFor, setDialogOpenFor] = useState(null) as [
        LessonInterface | null,
        Dispatch<SetStateAction<LessonInterface | null>>
    ];

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
            return;
        }

        setLessonsDate((wd as weirdDate)["$d"]);
    }

    const isDateToday = compareDates(new Date(), lessonsDate);

    const exampleLesson: LessonInterface = {
        internalID: "123456",
        internalName: "11 Digital Technology 2MA07",
        name: "Digital Technology",
        teacherName: "Nevena SLOAN",
        location: {
            floor: 2,
            wing: "LA",
            room: 2,
        },
        start: new Date(),
        end: new Date(),
        presence: LessonPresenceEnum.PRESENT,
        notes: `You are the best class ever! Now write this homework from this <a href="https://www.youtube.com/watch?v=PC58uFFiLHM">video</a>!`,
    };

    // TODO: Make this a real list
    exampleLesson.end = new Date(exampleLesson.start.getTime() + 80 * 60000);

    var lessonList = [exampleLesson];

    for (let i = 1; i < 5; i++) {
        let l = { ...exampleLesson };
        l.start = new Date(lessonList[i - 1].end.getTime() + (i === 3 ? 25 : 5) * 60000);
        l.end = new Date(l.start.getTime() + 80 * 60000);
        console.log(l);
        lessonList.push(l);
    }

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
                        <Typography variant="h5">Lessons</Typography>
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
                            variant={isDateToday ? "outlined" : "contained"}
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

            {lessonList.map((l, i) => (
                <>
                    <Grid item xs={12} key={l.internalID}>
                        <LessonCard
                            lesson={l}
                            cbFn={(l) => setDialogOpenFor(l)}
                        />
                    </Grid>
                    {lessonList[i + 1] &&
                        (() => {
                            const start = dayjs(lessonList[i + 1].start);
                            const end = dayjs(l.end);
                            const mins = start.diff(end, "m");

                            if (mins < 10) {
                                return null;
                            }

                            return (
                                <Grid item xs={12}>
                                    <Divider>
                                        <Typography color="GrayText" style={{ userSelect: "none" }}>
                                            {mins} minute break
                                        </Typography>
                                    </Divider>
                                </Grid>
                            );
                        })()}
                </>
            ))}

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={dialogOpenFor != null}
                onClick={() => setDialogOpenFor(null)}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <LessonDetailsDialog
                        data={dialogOpenFor}
                        onClose={() => setDialogOpenFor(null)}
                    />
                </div>
            </Backdrop>
        </Grid>
    );
}
