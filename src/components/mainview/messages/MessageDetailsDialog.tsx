import {
    Paper,
    Box,
    Grid,
    Divider,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import React from "react";
import { Message, MessageOrigin } from "../../../lib/message";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import CloseIcon from "@mui/icons-material/Close";
import { field } from "../../../lib/dialog";

interface proptypes {
    data: Message | null;
    onClose: () => void;
}

export default function MessageDetailsDialog({ data, onClose }: proptypes) {
    if (data == null) return <></>;

    const providerName =
        data.origin === MessageOrigin.EMAIL ? "Webmail" : "Daymap";

    return (
        <Paper>
            <Box p={2}>
                <Grid
                    container
                    direction="row"
                    gap={1}
                    alignItems="center"
                    maxWidth={700}
                >
                    <Grid item xs={10}>
                        <Typography variant="h5" whiteSpace="nowrap">
                            {data.subject}
                        </Typography>
                        <Typography color="text.secondary">
                            <b>{data.sender}</b> on <b>{providerName}</b>
                        </Typography>
                    </Grid>
                    <Box style={{ flexGrow: 1 }}></Box>
                    <Grid item xs={1}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {field(
                        "Sent on",
                        data.sent.format("ddd D MMM YYYY @ hh:mm A")
                    )}

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Typography variant="body1">{data.content}</Typography>
                    <Grid item>
                        <Button startIcon={<OpenInNewIcon />}>
                            Open in {providerName}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
