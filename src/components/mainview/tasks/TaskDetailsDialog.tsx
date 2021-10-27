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
    Chip,
} from "@mui/material";
import React, { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import dayjs from "dayjs";

import { GlobalContext } from "../../../lib/store";
import { Task, TaskOrigin, TaskSubmissionStatus } from "../../../lib/tasks";
import TaskTimeLeftWidget from "./TaskTimeLeftWidget";

import LinkIcon from "@mui/icons-material/Link";

interface proptypes {
    data: Task | null;
    onClose: () => void;
}

export default function TaskDetailsDialog({ data, onClose }: proptypes) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    function field(key: any, value: any) {
        return (
            <Grid item xs={12} style={{ display: "flex" }}>
                <Typography color="text.secondary" pr={1}>
                    {key}
                </Typography>
                <Typography>
                    <b>{value}</b>
                </Typography>
            </Grid>
        );
    }

    if (data == null) return <></>;

    function getStatusText() {
        if (data == null) return "???"
        
        switch (data.submission.status) {
            case TaskSubmissionStatus.PENDING:
                return "Not turned in"
            case TaskSubmissionStatus.GRADED:
                return "Graded" + (data.submission.late ? " (submitted late)" : "");
            case TaskSubmissionStatus.TURNED_IN:
                return "Turned in" + (data.submission.late ? " late" : "");
        }
    }

    return (
        <Paper>
            <Box p={2} maxWidth={700}>
                <Grid container direction="row" gap={1} alignItems="center">
                    <Grid item xs={10}>
                        <Typography variant="h5">{data.name}</Typography>
                        {data.courseName && (
                            <Typography color="text.secondary">
                                {data.courseName}
                            </Typography>
                        )}
                        <TaskTimeLeftWidget data={data} />
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

                    {field(
                        "Status",
                        getStatusText()
                    )}

                    {field(
                        "Set on",
                        data.setOn.format("ddd D MMM YYYY @ hh:mm A ")
                    )}
                    {field(
                        "Due on",
                        data.dueOn.format("ddd D MMM YYYY @ hh:mm A ")
                    )}
                    <Grid item xs={12}>
                        <Divider>Materials</Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container gap={1}>
                            {data.materials.map((material, idx) => {
                                return <Grid item>
                                    <Chip
                                        icon={<LinkIcon />}
                                        label={material.title}
                                        component="a"
                                        href={material.link}
                                        variant="outlined"
                                        clickable
                                    />
                                </Grid>;
                            })}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<OpenInNewIcon />}>
                            Open in {
                                data.origin === TaskOrigin.CLASSROOM
                                ? "Google Classroom"
                                : "Daymap"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
