import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import MathsIcon from '@mui/icons-material/Calculate';

export default function LessonCard() {
    return (
        <>
            <Paper elevation={1}>
                <Box p={1} style={{ display: "flex" }}>
                    <Box pr={1} style={{ display: "flex", alignItems: "center"}}>
                        <MathsIcon fontSize="large"/>
                    </Box>
                    <Box>
                        <Typography>
                            <b>11 Maths Methods</b>
                        </Typography>
                        <Typography variant="body2">
                            11:50 AM - 12:45 AM
                        </Typography>
                    </Box>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Paper>
        </>
    );
}
