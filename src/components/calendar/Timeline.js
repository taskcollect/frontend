import Dot from "./Dot.js"
import Line from "./Line.js"
var num1 = 0;
var num2 = 0;
var num3 = 0;
var num4 = 0;
var num5 = 0;
var num6 = 0;
var num7 = 0;
let day1, day2, day3, day4, day5, day6, day7 = "";
const Timeline = ({firstDay, month, year}) => {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        console.log("odd")
        num1 = firstDay
        num2 = firstDay+1
        num3 = firstDay+2
        num4 = firstDay+3
        num5 = firstDay+4
        num6 = firstDay+5
        num7 = firstDay+6
        day1 = ((num1).toString()).concat("/", (month).toString(), "/", year.toString())
        day2 = ((num2).toString()).concat("/", (month).toString(), "/", year.toString())
        day3 = ((num3).toString()).concat("/", (month).toString(), "/", year.toString())
        day4 = ((num4).toString()).concat("/", (month).toString(), "/", year.toString())
        day5 = ((num5).toString()).concat("/", (month).toString(), "/", year.toString())
        day6 = ((num6).toString()).concat("/", (month).toString(), "/", year.toString())
        day7 = ((num7).toString()).concat("/", (month).toString(), "/", year.toString())
        if ((31-firstDay)<7){
            if (num2 > 31){
                num2 = num2-31
                day2 = ((num2).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num3 > 31){
                num3 = num3-31
                day3 = ((num3).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num4 > 31){
                num4 = num4-31
                day4 = ((num4).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num5 > 31){
                num5 = num5-31
                day5 = ((num5).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num6 > 31){
                num6 = num6-31
                day6 = ((num6).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num7 > 31){
                num7 = num7-31
                day7 = ((num7).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
        }
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
        console.log(month+1)
        num1 = firstDay
        num2 = firstDay+1
        num3 = firstDay+2
        num4 = firstDay+3
        num5 = firstDay+4
        num6 = firstDay+5
        num7 = firstDay+6
        day1 = ((num1).toString()).concat("/", (month).toString(), "/", year.toString())
        day2 = ((num2).toString()).concat("/", (month).toString(), "/", year.toString())
        day3 = ((num3).toString()).concat("/", (month).toString(), "/", year.toString())
        day4 = ((num4).toString()).concat("/", (month).toString(), "/", year.toString())
        day5 = ((num5).toString()).concat("/", (month).toString(), "/", year.toString())
        day6 = ((num6).toString()).concat("/", (month).toString(), "/", year.toString())
        day7 = ((num7).toString()).concat("/", (month).toString(), "/", year.toString())
        if ((30-firstDay)<7){
            if (num2 > 30){
                num2 = num2-30
                day2 = ((num2).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num3 > 30){
                num3 = num3-30
                day3 = ((num3).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num4 > 30){
                num4 = num4-30
                day4 = ((num4).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num5 > 30){
                num5 = num5-30
                day5 = ((num5).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num6 > 30){
                num6 = num6-30
                day6 = ((num6).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
            if (num7 > 30){
                num7 = num7-30
                day7 = ((num7).toString()).concat("/", (month+1).toString(), "/", year.toString())
            }
        }
    }
    else if (month == 2) {
        if (year%4 == 0){
            num1 = firstDay
            num2 = firstDay+1
            num3 = firstDay+2
            num4 = firstDay+3
            num5 = firstDay+4
            num6 = firstDay+5
            num7 = firstDay+6
            if ((29-firstDay)<7){
                if (num2 > 29){
                    num2 = num2-29
                }
                if (num3 > 29){
                    num3 = num3-29
                }
                if (num4 > 29){
                    num4 = num4-29
                }
                if (num5 > 29){
                    num5 = num5-29
                }
                if (num6 > 29){
                    num6 = num6-29
                }
                if (num7 > 29){
                    num7 = num7-29
                }
            }
        }
        else{
            num1 = firstDay
            num2 = firstDay+1
            num3 = firstDay+2
            num4 = firstDay+3
            num5 = firstDay+4
            num6 = firstDay+5
            num7 = firstDay+6
            if ((28-firstDay)<7){
                if (num2 > 28){
                    num2 = num2-28
                }
                if (num3 > 28){
                    num3 = num3-28
                }
                if (num4 > 28){
                    num4 = num4-28
                }
                if (num5 > 28){
                    num5 = num5-28
                }
                if (num6 > 28){
                    num6 = num6-28
                }
                if (num7 > 28){
                    num7 = num7-28
                }
            }
        }
        
    }
    day1 = ((num1).toString()).concat("/", (month).toString(), "/", year.toString())
    console.log(day1 + " " + day2 + " " + day3 + " " + day4)
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
