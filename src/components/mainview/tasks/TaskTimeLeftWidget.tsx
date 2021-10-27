import {
    Box,
    CircularProgress,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Task, TaskSubmissionStatus } from "../../../lib/tasks";

import DoneIcon from "@mui/icons-material/Done";

import WarningIcon from "@mui/icons-material/WarningAmberRounded";
import { getTaskColor } from "./TaskCard";

export function friendlyTimeDifference(target: dayjs.Dayjs): string {
    let delta;

    const now = dayjs();

    if (target.isAfter(now)) {
        delta = target.diff(now, "s");
    } else {
        delta = now.diff(target, "s");
    }
    let out = "";

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta % 60;

    if (days > 0) out += `${days}d `;
    if (hours > 0) out += `${hours}h `;
    if (minutes > 0) out += `${minutes}m `;
    if (seconds > 0 || out === "") out += `${seconds}s `;

    return out;
}

interface proptypes {
    data: Task;
}

export default function TaskTimeLeftWidget({ data }: proptypes) {
    const theme = useTheme();
    const [genericColor, progressBarColor] = getTaskColor(data, theme);

    const [percentTimeLeft, setPercentTimeLeft] = useState(0);
    const [timeUntilDuedate, setTimeUntilDuedate] = useState("");

    useEffect(() => {
        // just don't update anything if the task is not due
        if (data.submission.status !== TaskSubmissionStatus.PENDING) return;

        function calcPercentTimeLeft(): number {
            const totalTime = data.dueOn.diff(data.setOn, "s");
            const timeLeft = data.dueOn.diff(dayjs(), "s");

            return (timeLeft / totalTime) * 100;
        }

        function updateTimes() {
            setPercentTimeLeft(calcPercentTimeLeft());
            setTimeUntilDuedate(friendlyTimeDifference(data.dueOn));
        }

        updateTimes();
        const interval = setInterval(updateTimes, 1000); // update every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, [data]);

    function timeLeftProgressBar(percent: number) {
        return (
            <Tooltip title="Hello!" arrow placement="left">
                <Box sx={{ position: "relative" }} pt={0.25}>
                    <CircularProgress
                        variant="determinate"
                        thickness={8}
                        size={20}
                        value={100}
                        sx={{
                            color: (theme) =>
                                theme.palette.grey[
                                    theme.palette.mode === "light" ? 300 : 800
                                ],
                        }}
                    />
                    <CircularProgress
                        variant="determinate"
                        thickness={8}
                        color={progressBarColor as unknown as any}
                        size={20}
                        value={percent}
                        sx={{
                            position: "absolute",
                            left: 0,
                        }}
                    />
                </Box>
            </Tooltip>
        );
    }

    function widget() {
        return (
        <Box style={{ display: "flex", alignItems: "center" }} pt={0.5}>
            {percentTimeLeft < 0 ? (
                <WarningIcon color={progressBarColor as unknown as any} />
            ) : (
                timeLeftProgressBar(percentTimeLeft)
            )}
            <Typography pl={1} sx={{ fontSize: 14 }} color={genericColor}>
                <b>
                    {`${timeUntilDuedate} ` +
                        (data.dueOn.isBefore(dayjs()) ? "overdue" : "left")}
                </b>
            </Typography>
        </Box>

        )
    }

    if (data.submission.status === TaskSubmissionStatus.PENDING) {
        return widget();
    } else {
        return (
            <Box sx={{ alignItems: "center", display: "flex" }}>
            <DoneIcon fontSize="small" color={progressBarColor as unknown as any} />
            <Typography
                color={genericColor}
                sx={{ fontSize: 14 }}
                pl={0.5}
            >
                <b>Turned in</b>
            </Typography>
        </Box>
        )
    }
}
