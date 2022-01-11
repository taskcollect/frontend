import Dot from "./Dot.js"
import Line from "./Line.js"
import {Button, Icon} from "@mui/material"
import { DateRangePickerView } from "@mui/lab/DateRangePicker/DateRangePickerView";
const Timeline = ({date}) => {
    const day1 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day2 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day3 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day4 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day5 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day6 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    date.setDate(date.getDate()+1);
    const day7 = (date.getDate()).toString() + "/" + (date.getMonth()+1).toString() + "/" + (date.getFullYear()).toString();
    return (
        <>
            
            <Line 
                width = "5.75%" 
                marginBottom = "2px" 
                marginLeft = "2%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day1} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day2} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day3} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day4} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day5} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day6} />
            <Line 
                width = "11.5%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
            <Dot tooltip={day7} />
            <Line 
                width = "5.75%" 
                marginBottom = "2px" 
                marginLeft = "0.7%" 
                marginTop = "10%" 
                borderColor = "#FFFFFF"
            />
        </>
    )
}

export default Timeline
