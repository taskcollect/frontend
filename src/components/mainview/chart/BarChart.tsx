import { useTheme, Typography, Tooltip } from "@mui/material";
import "./BarChart.css";

import React from "react";
import MoodIcon from "@mui/icons-material/Mood";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface Bar {
    label: string;
    value: number;
}

const sampleData: Bar[] = [
    {
        label: "Mon",
        value: 1,
    },
    {
        label: "Tue",
        value: 1,
    },
    {
        label: "Wed",
        value: 3,
    },
    {
        label: "Thu",
        value: 0,
    },
    {
        label: "Fri",
        value: 0,
    },
    {
        label: "Sat",
        value: 0,
    },
    {
        label: "Sun",
        value: 2,
    },
];

export { sampleData };

interface props {
    data: Bar[];
    height?: number;
    gap?: number;
    whenZero?: any;
}

function BarChart({ data, height, gap, whenZero }: props) {
    const theme = useTheme();
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
        <div
            className="chart"
            style={{
                height: height,
            }}
        >
            {data.map((bar, index) => {
                const heightPercentage = (bar.value / maxValue) * 100;
                const widthPercentage = (1 / data.length) * 100;

                return (
                    <div
                        className="barOuter"
                        style={{
                            width: `${widthPercentage}%`,
                            marginLeft: index ? gap ?? theme.spacing(1) : 0,
                        }}
                    >
                        <div
                            className="barInner"
                            style={{
                                backgroundColor:
                                    theme.palette.grey[
                                        theme.palette.mode === "light"
                                            ? 200
                                            : 900
                                    ],
                                justifyContent:
                                    bar.value === 0 ? "center" : undefined,
                            }}
                        >
                            <div
                                className="barValue"
                                key={index}
                                style={{
                                    backgroundColor: theme.palette.primary.main,
                                    height: `${heightPercentage}%`,
                                }}
                            >
                                {bar.value === 0 ? (
                                    whenZero
                                ) : (
                                    <Typography
                                        color="primary.contrastText"
                                        sx={{ userSelect: "none" }}
                                    >
                                        {bar.value}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <Typography
                            color="text.secondary"
                            pt={0.5}
                            sx={{ userSelect: "none" }}
                        >
                            {bar.label}
                        </Typography>
                    </div>
                );
            })}
        </div>
    );
}

BarChart.defaultProps = {
    height: 150,
    gap: undefined,
    whenZero: (
        <Tooltip arrow title="Nothing due!">
            <BookmarkAddedIcon color="disabled" />
        </Tooltip>
    ),
};

export default BarChart;
