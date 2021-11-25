import {
    Paper,
    Box,
    Grid,
    Typography,
    Divider,
    IconButton,
    Button,
    Chip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneIcon from '@mui/icons-material/Done';

import { Task, TaskOrigin, TaskSubmissionStatus } from "../../../lib/tasks";
import TaskTimeLeftWidget from "./TaskTimeLeftWidget";

import LinkIcon from "@mui/icons-material/Link";
import { field } from "../../../lib/dialog";

interface proptypes {
    data: Task | null;
    onClose: () => void;
}

export default function TaskDetailsDialog({ data, onClose }: proptypes) {
    if (data == null) return <></>;

    function getStatusText() {
        if (data == null || data.submission == null) return "???";

        switch (data.submission.status) {
            case TaskSubmissionStatus.PENDING:
                return "Not turned in";
            case TaskSubmissionStatus.GRADED:
                return (
                    "Graded" + (data.submission.late ? " (submitted late)" : "")
                );
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

                    {data.submission != null ? field("Status", getStatusText()) : null}

                    {field(
                        "Set on",
                        data.setOn.format("ddd D MMM YYYY @ hh:mm A ")
                    )}
                    {field(
                        "Due on",
                        data.dueOn.format("ddd D MMM YYYY @ hh:mm A ")
                    )}
                    {
                        data.materials.length > 0 && <>
                            <Grid item xs={12}>
                                <Divider>Materials</Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container gap={1}>
                                    {data.materials.map((material, idx) => {
                                        return (
                                            <Grid item>
                                                <Chip
                                                    icon={<LinkIcon />}
                                                    label={material.title}
                                                    component="a"
                                                    href={material.link}
                                                    variant="outlined"
                                                    clickable
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </>
                    }
                    {
                        data.origin !== TaskOrigin.USER 
                            ? (
                                <Grid item>
                                    <Button startIcon={<OpenInNewIcon />}>
                                        Open in{" "}
                                        {data.origin === TaskOrigin.CLASSROOM
                                            ? "Google Classroom"
                                            : "Daymap"}
                                    </Button>
                                </Grid>
                            )
                            : (
                                <Grid item>
                                    <Button startIcon={<DoneIcon />}>
                                        Mark as done
                                    </Button>
                                </Grid>
                            )
                    }
                </Grid>
            </Box>
        </Paper>
    );
}
