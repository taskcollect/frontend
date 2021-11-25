// import {
//     Box,
//     Button,
//     ButtonBase,
//     Card,
//     CardActions,
//     CardContent,
//     CircularProgress,
//     Divider,
//     Typography,
//     useTheme,
// } from "@mui/material";

import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Task, TaskSubmissionStatus } from "../../../lib/tasks";
import { Theme, useTheme } from "@mui/material";
import dayjs from "dayjs";
import TaskTimeLeftWidget from "./TaskTimeLeftWidget";

export function getTaskColor(data: Task, theme: Theme) {
    if (data.submission == null || data.submission.status === TaskSubmissionStatus.PENDING) {
        if (data.dueOn.isBefore(dayjs())) {
            return [theme.palette.error.main, "error"];
        }

        // if the assignment is due less than a day away, show a warning
        if (data.dueOn.diff(dayjs(), "day") < 1) {
            return [theme.palette.warning.main, "warning"];
        }

        return [theme.palette.primary.main, "primary"];
    }

    // it has been turned in
    if (data.submission.status === TaskSubmissionStatus.TURNED_IN) {
        return [theme.palette.success.main, "success"];
    }

    // don't know
    return [theme.palette.text.secondary, "inherit"];
}

export default function TaskCard({
    data,
    onClick,
}: {
    data: Task;
    onClick: (task: Task) => void;
}) {
    const theme = useTheme();
    const [genericColor] = getTaskColor(data, theme);

    return (
        <ButtonBase
            style={{ display: "unset", width: "100%", textAlign: "unset" }}
            onClick={() => onClick(data)}
        >
            <Card
                sx={{ minWidth: 280 }}
                elevation={3}
                style={{
                    borderLeft: `5px solid ${genericColor}`,
                }}
            >
                <CardContent>
                    <Typography gutterBottom={data.courseName == null}>
                        {data.name}
                    </Typography>
                    {data.courseName && (
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {data.courseName}
                        </Typography>
                    )}
                    <Divider />
                    <Typography
                        sx={{ fontSize: 14 }}
                        pt={1}
                        color="text.secondary"
                    >
                        {"Due on "}
                        <b style={{ color: genericColor }}>
                            {data.dueOn.format("ddd MMM DD")}
                        </b>
                        {" at "}
                        <b style={{ color: genericColor }}>
                            {data.dueOn.format("h:mm A")}
                        </b>
                    </Typography>
                    <TaskTimeLeftWidget data={data} />
                </CardContent>
                <CardActions>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                            size="small"
                            color="inherit"
                            startIcon={<OpenInNewIcon />}
                        >
                            Open
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </ButtonBase>
    );
}
