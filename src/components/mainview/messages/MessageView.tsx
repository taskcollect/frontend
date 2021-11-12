import {
    Backdrop,
    Box,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import dayjs from "dayjs";

import { Message, MessageOrigin } from "../../../lib/message";
import MessageCard from "./MessageCard";
import MessageDetailsDialog from "./MessageDetailsDialog";

export default function MessageView() {
    const [dialogOpenFor, setDialogOpenFor] = useState(null) as [
        Message | null,
        Dispatch<SetStateAction<Message | null>>
    ];

    const feed: Message[] = [
        {
            internalId: "1",
            content: `Hello Glenunga!
            Do you have stationery that you don't know what to do with?
            Recycle it!
            For a Global Change project, 11.12 has started stationery recycling at GIHS!
            There are now recycling bins in the Hub, Year 12 Wing, and soon in the Science Wing, and at the start of the Language Wing.`,
            sender: "Matthew MACIUNAS",
            subject: "GIHS Recycling - Help the Planet!",
            sent: dayjs(),
            origin: MessageOrigin.EMAIL,
        },
    ];

    return (
        <Grid
            container
            direction="row"
            // justifyContent="center"
            // alignItems="center"
            gap={1}
        >
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    // justifyContent="center"
                    gap={1}
                    padding={1}
                >
                    <Grid item>
                        <Typography variant="h5">Message Feed</Typography>
                    </Grid>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <Grid item>
                        <IconButton>
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            {feed.map((m, i) => (
                <Grid item xs={12} key={m.internalId}>
                    <MessageCard
                        data={m}
                        onClick={(m) => setDialogOpenFor(m)}
                    />
                </Grid>
            ))}

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={dialogOpenFor != null}
                onClick={() => setDialogOpenFor(null)}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <MessageDetailsDialog
                        data={dialogOpenFor}
                        onClose={() => setDialogOpenFor(null)}
                    />
                </div>
            </Backdrop>
        </Grid>
    );
}
