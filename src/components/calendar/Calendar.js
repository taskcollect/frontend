import { Grid, Typography, TextField, Button, Divider, speedDialActionClasses } from "@mui/material"
import { DesktopDatePicker } from "@mui/lab"
import { useState } from "react"
import TaskAdder from "./TaskAdder.js"
import Timeline from "./Timeline.js"
const date = new Date();
const Calendar = () => {
    const [lessonsDate, setLessonsDate] = useState(new Date())
    const isDateToday = compareDates(new Date(), lessonsDate);
    function compareDates(a,  b) {
        return (
            a.getUTCDate() === b.getUTCDate() &&
            a.getUTCMonth() === b.getUTCMonth() &&
            a.getUTCFullYear() === b.getUTCFullYear()
        );
    }
    function handleDateChange(wd) {
        console.log(wd);

        if (wd == null) {
            setLessonsDate(new Date());
            return;
        }

        setLessonsDate((wd)["$d"]);
    }
    function DateReturn(){
        setLessonsDate(new Date()["$d"]);
        return;
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={3} sx = {{marginTop: "25px"}} align="right">
                <DesktopDatePicker
                    // label="Lessons on"
                    inputFormat="ddd, MMM DD, YYYY"
                    value={lessonsDate}
                    renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                    )}
                    onChange={handleDateChange}
                />
            </Grid>
            <Grid item xs={2} align="left">
                <Button
                    variant={isDateToday ? "outlined" : "contained"}
                    onClick={() => setLessonsDate(new Date())}
                    size="small"
                    disabled={isDateToday}
                    sx = {{
                        marginTop: "30px"
                    }}
                >
                    Jump to Today
                </Button>
            </Grid>
            <Grid item xs={6} sx = {{marginTop: "15px"}} align="left">
                <TaskAdder/>
                <Typography sx= {{ marginLeft: "35px"}} variant="h3">Timeline</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider></Divider>
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={10} marginTop="400px" display="inline-block">
                <Timeline date = {lessonsDate}/>
                {/* firstDay is the sunday of the week, month and year are self-explanatory */}
            </Grid> 
            <Grid item xs={1}>

            </Grid>
        </Grid>
    )
}

export default Calendar
