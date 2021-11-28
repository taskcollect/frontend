import {Tooltip} from "@mui/material"

const Dot = ({tooltip}) => {
    return (
        <Tooltip title={tooltip} arrow>
            <div
                style = {{
                    borderRadius: "5px", 
                    backgroundColor: "#FFFFFF", 
                    width: "10px", 
                    height: "10px", 
                    marginLeft: "0.7%", 
                    display: "inline-block",
                    marginTop: "10%"
                }}
            >
            </div>
        </Tooltip> 
    )
}

export default Dot
