import { Grid, Typography } from "@mui/material";

export function field(key: any, value: any) {
    return (
        <Grid item xs={12} style={{ display: "flex" }}>
            <Typography color="text.secondary" pr={1}>
                {key}
            </Typography>
            <Typography>
                <b>{value}</b>
            </Typography>
        </Grid>
    );
}