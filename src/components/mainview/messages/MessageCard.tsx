import {
    Box,
    Paper,
    Typography,
    ButtonBase,
    useTheme,
    Avatar,
} from "@mui/material";

import dayjs from "dayjs";
import { Message } from "../../../lib/message";

export default function MessageCard({
    data,
    onClick,
}: {
    data: Message;
    onClick: (data: Message) => void;
}) {
    const theme = useTheme();

    return (
        <>
            <ButtonBase
                style={{ display: "unset", width: "100%" }}
                onClick={() => onClick(data)}
            >
                <Paper
                    elevation={2}
                    style={{
                        borderLeft: `5px solid ${theme.palette.primary.main}`
                    }}
                    
                >
                    <Box
                        p={1}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Box
                            pr={1}
                            m={1}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Avatar />
                        </Box>
                        <Box style={{ textAlign: "left" }}>
                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>
                                    <b>{data.subject}</b>
                                </Typography>
                            </Box>

                            <Typography color="text.secondary" fontSize={12}>
                                {data.sender}, {dayjs().to(data.sent)}
                            </Typography>

                            <Typography fontSize={12} noWrap maxWidth="250px">
                                {data.content.substring(0, 100)}
                            </Typography>
                        </Box>
                        {/* <Box style={{ flexGrow: 1 }}></Box>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton> */}
                    </Box>
                </Paper>
            </ButtonBase>
        </>
    );
}
