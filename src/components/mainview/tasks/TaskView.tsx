import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import React, { Dispatch, SetStateAction, useState } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";
import TaskCard from "./TaskCard";
import { Task, TaskOrigin, TaskSubmissionStatus } from "../../../lib/tasks";
import dayjs from "dayjs";
import Backdrop from "@mui/material/Backdrop";
import TaskDetailsDialog from "./TaskDetailsDialog";
import GlanceChart, { sampleData } from "../chart/BarChart";

export default function TaskView() {
    const exampleTask: Task = {
        courseId: "12345",
        description: "This is an example task.",
        setOn: dayjs("Wed Nov 10 2021 22:15:00 GMT+0000"),
        dueOn: dayjs("Wed Nov 15 2021 23:45:00 GMT+0000"),
        internalId: "12345",
        materials: [
            {
                title: "HPE Safety Assignment - Google Docs",
                link: "https://docs.google.com/document/d/1lk_AMm2rUXmDXRTyPN4pw9SzWGuNh9Wl9ukXch88fy0/edit",
            },
            {
                title: "4. Digital Solution Task Sheet",
                link: "https://docs.google.com/document/d/1CHdn2-BKIHdlMgvElnLxGRUjaxRdhRlqy2rCobYllww/edit",
            },
        ],
        name: "Example Task",
        courseName: "Digital Technology",
        // submission: {
        //     internalId: "12345",
        //     late: true,
        //     status: TaskSubmissionStatus.PENDING,
        //     userId: "34567",
        // },
        submission: null,
        origin: TaskOrigin.USER,
        // origin: TaskOrigin.CLASSROOM,
    };

    const [dialogOpenFor, setDialogOpenFor] = useState(null) as [
        Task | null,
        Dispatch<SetStateAction<Task | null>>
    ];

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
                    <Grid item>
                        <Typography variant="h5">Assignments</Typography>
                    </Grid>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <Grid item>
                        <IconButton>
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <GlanceChart data={sampleData} />
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs>
                <TaskCard
                    data={exampleTask}
                    onClick={(l) => setDialogOpenFor(l)}
                />
            </Grid>
            <Grid item xs>
                <TaskCard
                    data={exampleTask}
                    onClick={(l) => setDialogOpenFor(l)}
                />
            </Grid>
            <Grid item xs>
                <TaskCard
                    data={exampleTask}
                    onClick={(l) => setDialogOpenFor(l)}
                />
            </Grid>
            <Grid item xs>
                <TaskCard
                    data={exampleTask}
                    onClick={(l) => setDialogOpenFor(l)}
                />
            </Grid>

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={dialogOpenFor != null}
                onClick={() => setDialogOpenFor(null)}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <TaskDetailsDialog
                        data={dialogOpenFor}
                        onClose={() => setDialogOpenFor(null)}
                    />
                </div>
            </Backdrop>
        </Grid>
    );
}
