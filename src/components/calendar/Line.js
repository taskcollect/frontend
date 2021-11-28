const Line = ({width, marginBottom, marginLeft, marginTop, borderColor}) => {
    return (
        <div 
                style={{
                    border:"3px solid",
                    borderColor: borderColor, 
                    width: width, 
                    display: "inline-block",
                    marginBottom: marginBottom,
                    marginLeft: marginLeft,
                    marginTop: marginTop
                }}
            >

        </div>
    )
}

export default Line
