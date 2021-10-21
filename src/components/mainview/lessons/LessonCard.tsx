import { Box, IconButton, Paper, Typography, ButtonBase } from "@mui/material";
import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import MathsIcon from "@mui/icons-material/Calculate";
import { LessonInterface } from "../../../lib/lesson";
import { date2string } from "../../../lib/date";
import dayjs from "dayjs";

export default function LessonCard({
    lesson,
    cbFn,
}: {
    lesson: LessonInterface;
    cbFn: (lesson: LessonInterface) => void;
}) {
    return (
        <>
            <ButtonBase style={{ display: "unset", width: "100%" }} onClick={() => cbFn(lesson)}>
                <Paper elevation={1}>
                    <Box p={1} style={{ display: "flex" }}>
                        <Box
                            pr={1}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <MathsIcon fontSize="large" />
                        </Box>
                        <Box style={{ textAlign: "left" }}>
                            <Typography variant="body2">
                                <b>{lesson.name}</b>
                            </Typography>
                            <Typography variant="body2">
                                {dayjs(lesson.start).format("hh:mm a")} -{" "}
                                {dayjs(lesson.end).format("hh:mm a")}
                            </Typography>
                        </Box>
                        {/* <Box style={{ flexGrow: 1 }}></Box>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton> */}
                    </Box>
                </Paper>
            </ButtonBase>
        </>
    );
}
