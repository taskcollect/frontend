import { TextField, Button, CardContent, CardActions, Popover, Fab, Grid, Typography, Divider } from "@mui/material"
import { DatePicker } from "@mui/lab"

import AddIcon from "@mui/icons-material/Add"
import AssignmentIcon from '@mui/icons-material/Assignment';

import React from "react"

const TaskAdder = () => {
    const [value, setValue] = React.useState(null);
    const [otherValue, otherSetValue] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
            <div>
                <Fab 
                    variant="contained" 
                    onClick={handleClick} 
                    color="primary"
                    sx={{ 
                        margin: "20px",
                        position: "fixed",
                        bottom: "20px",
                        right: "20px"
                    }}
                >
                    <AddIcon/>
                </Fab>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Grid 
                        container 
                        gap={3} 
                        alignItems="center" 
                        // justifyContent="center" 
                        padding={3}
                        maxWidth="sm"
                    >
                        <Grid item>
                            <AssignmentIcon fontSize="large" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Add New Task</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Task Name" 
                                fullWidth // this makes it expand to the full width of the parent
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Description" 
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <DatePicker
                                label="Start Date"
                                value = {value}
                                onChange={(startValue) => {
                                    setValue(startValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </Grid>
                        <Grid item xs>
                            <DatePicker
                                label="End Date"
                                value = {otherValue}
                                onChange={(endValue) => {
                                    otherSetValue(endValue);
                                }}
                                renderInput={(param) => <TextField fullWidth {...param} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleClose}>Add Task</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Popover>
            </div>
    )
}

export default TaskAdder
