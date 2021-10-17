import {
    Alert,
    AlertTitle,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { SetupContext } from "./SetupForm";

export default function PrivacyAgreement() {
    const { setupData, setSetupData } = useContext(SetupContext);

    function whatAreHashes() {
        const description = `
        Hash functions are a way to identify a specific piece of data.
        The whole point of them is to be unable to get the data back,
        but still be able to check if the data is the same. Taskcollect,
        and many other websites including Google, Facebook, and the school
        use this technique to avoid storing users' passwords.`;

        return (
            <Tooltip title={description} arrow>
                <HelpOutlineIcon fontSize="small" />
            </Tooltip>
        );
    }

    return (
        <Grid
            container
            // style={{ textAlign: "center" }}
            alignItems="center" // vertical align
            spacing={2}
            maxWidth={500}
        >
            <Grid item xs={12}>
                <Typography variant="h5" component="h2">
                    Privacy Policy
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Taskcollect is committed to protecting your privacy. If any
                    of your data is being used, we will let you know, and
                    provide an option for cancellation of said usage.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>
                        Your username & password stays with you.
                    </AlertTitle>
                    Taskcollect is designed with privacy in mind. We store the
                    bare minimum of data to make the app work.
                    <br />
                    <br />
                    At the moment, this is the complete list of data stored:
                    <ul>
                        <li>Google Token</li>
                        <li>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography variant="body2">
                                        Password <b>Hash</b>
                                    </Typography>
                                </Grid>
                                <Grid item pl={1}>
                                    {whatAreHashes()}
                                </Grid>
                            </Grid>
                        </li>
                        <li>Taskcollect Preferences</li>
                    </ul>
                </Alert>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    We are committed to protecting your privacy.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={setupData.agreedToTerms}
                                onClick={() =>
                                    setSetupData({
                                        ...setupData,
                                        agreedToTerms: !setupData.agreedToTerms,
                                    })
                                }
                            />
                        }
                        label="I have read, and agree to these terms."
                    />
                </FormGroup>
            </Grid>
        </Grid>
    );
}
