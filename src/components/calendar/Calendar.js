import { Grid, Fab, Popover, Button } from "@mui/material"
import React from "react"
import TaskAdder from "./TaskAdder.js"
const Calendar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Grid container spacing={2} align="center">
            <Grid item xs={3} align="center">
                <TaskAdder/>
            </Grid>
            <Grid item xs={6} align="center">
                
                <h2>Timeline</h2>
            </Grid>
            <Grid item xs={3} align="center"></Grid>
        </Grid>
    )
}

export default Calendar
