import {
    Paper,
    Box,
    Grid,
    Typography,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme,
    Button,
} from "@mui/material";
import React, { useContext } from "react";

import {
    getRoomCode,
    LessonInterface,
    RoomIDInterface,
    getLessonPresence,
} from "../../../lib/lesson";

import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import dayjs from "dayjs";
import { GlobalContext } from "../../../lib/store";

import sanitizeHtml from "sanitize-html";

export default function LessonDetailsDialog({
    data,
    onClose,
}: {
    data: LessonInterface | null;
    onClose: () => void;
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { globalState, dispatch } = useContext(GlobalContext);

    const labelColor = globalState.theme === "dark" ? undefined : "GrayText";

    function field(key: any, value: any) {
        return (
            <Grid item xs={12} style={{ display: "flex" }}>
                <Typography color={labelColor} pr={1}>
                    {key}
                </Typography>
                <Typography>
                    <b>{value}</b>
                </Typography>
            </Grid>
        );
    }

    if (data == null) return <></>;

    return (
        <Paper>
            <Box p={2} maxWidth={700}>
                <Grid container direction="row" gap={1} alignItems="center">
                    <Grid item xs={10}>
                        <Typography variant="h5">{data.name}</Typography>
                        <Typography color={labelColor}>
                            with <b>{data.teacherName}</b> in{" "}
                            <b>{getRoomCode(data.location)}</b>
                        </Typography>
                    </Grid>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <Grid item xs={1}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {field("Presence:", getLessonPresence(data.presence))}
                    <Grid item xs={12}>
                        {field(
                            "Runtime:",
                            (() => {
                                const start = dayjs(data.start);
                                const end = dayjs(data.end);
                                const mins = end.diff(start, "m");

                                const fstart = start.format("hh:mm A");
                                const fend = end.format("hh:mm A");

                                return `${mins} mins (${fstart} - ${fend})`;
                            })()
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper variant="outlined">
                            <Box p={2}>
                                {(() => {
                                    if (data.notes == null) {
                                        return <></>
                                    }
                                    const clean = sanitizeHtml(data.notes as string, {
                                        allowedTags: [
                                            "b",
                                            "i",
                                            "em",
                                            "strong",
                                            "a",
                                        ],
                                        allowedAttributes: {
                                            a: ["href", "target"],
                                        },
                                    });
                                    return (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: clean,
                                            }}
                                        />
                                    );
                                })()}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Button startIcon={<OpenInNewIcon />}>
                            Open in Daymap
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<OpenInNewIcon />}>
                            Google Classroom
                        </Button>
                    </Grid>
                    {/* <Grid item>
                        <Typography fontSize={10} color="GrayText">
                            Obtained from DayMap. Lesson ID: <b>{data.internalID}</b>
                        </Typography>
                    </Grid> */}
                </Grid>
            </Box>
        </Paper>
    );
}
