import { Box, Paper, Typography, ButtonBase, useTheme } from "@mui/material";

import MathsIcon from "@mui/icons-material/Calculate";
import { LessonInterface } from "../../../lib/lesson";
import dayjs from "dayjs";

export default function LessonCard({
    lesson,
    onClick,
}: {
    lesson: LessonInterface;
    onClick: (lesson: LessonInterface) => void;
}) {
    const theme = useTheme();
    
    return (
        <>
            <ButtonBase
                style={{ display: "unset", width: "100%" }}
                onClick={() => onClick(lesson)}
            >
                <Paper
                    elevation={2}
                    style={{
                        borderLeft: `5px solid ${theme.palette.primary.main}`,
                        minWidth: 250
                    }}
                >
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
                    </Box>
                </Paper>
            </ButtonBase>
        </>
    );
}
