import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

import {
    Alert,
    AlertTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import React, { ReactNode, useContext, useState } from "react";
import { SetupContext } from "./SetupForm";

import LoginIcon from "@mui/icons-material/Login";
import { getUsernameError, getPasswordError } from "../../lib/validate";

export default function UserPassForm() {
    const { setupData, setSetupData } = useContext(SetupContext);

    const [showPassword, setShowPassword] = useState(false);

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | ReactNode>(null);

    async function setUsername(uname: string) {
        setSetupData({
            ...setupData,
            username: uname || "",
            credentialsOK: false,
        });

        setGeneralError(null);
        setUsernameError(getUsernameError(uname));
    }

    async function setPassword(pass: string) {
        setSetupData({
            ...setupData,
            password: pass || "",
            credentialsOK: false,
        });

        setGeneralError(null);
        setPasswordError(getPasswordError(pass));
    }

    function DEBUG_DELAY(ms: number): Promise<void> {
        // FIXME(codian): remember to remove this
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function runLogin(): Promise<boolean> {
        await DEBUG_DELAY(1000);

        // invalid credentials
        /* setGeneralError(
            <Grid item xs={12}>
                <Alert severity="error">
                    <AlertTitle>
                        Invalid username and/or password.
                    </AlertTitle>
                    Make sure your username and password is correct.
                </Alert>
            </Grid>
        ); */

        // setGeneralError(
        //     <Grid item xs={12}>
        //         <Alert severity="warning">
        //             <AlertTitle>Failed to communicate with server.</AlertTitle>
        //             Make sure you are connected to the internet.
        //             <br />
        //             <br />
        //             If nothing helps, try setting up Taskcollect on this device
        //             at a later time. We're sorry for any unintended downtime &
        //             any inconveniences caused.
        //             <br />
        //             <br />
        //             <i>
        //                 Error Code: <b>ERR_NOCONNECT</b>
        //             </i>
        //         </Alert>
        //     </Grid>
        // );

        return true;
    }

    async function submit() {
        if (setupData.loading || setupData.credentialsOK) return;

        setGeneralError(null);

        // state gets updated weirdly here, so we need some temp vars
        const unameError = getUsernameError(setupData.username);
        const pwError = getPasswordError(setupData.password);
        setUsernameError(unameError);
        setPasswordError(pwError);

        // don't allow continuation if fields are somehow invalid
        if (unameError != null || pwError != null) return;

        setSetupData({
            ...setupData,
            loading: true,
        });

        let loginOK = await runLogin();

        if (loginOK) {
            // login is valid
            setSetupData({
                ...setupData,
                credentialsOK: true,
                loading: false,
            });
        } else {
            // login is invalid
            setSetupData({
                ...setupData,
                credentialsOK: false,
                loading: false,
            });
        }
    }

    function submitOnEnter(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            submit();
        }
    }

    return (
        <Grid
            container
            direction="row"
            // style={{ textAlign: "center" }}
            alignItems="center" // vertical align
            spacing={2}
            maxWidth="500px"
        >
            <Grid item xs={12}>
                <Typography variant="h5">Username & Password</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Please enter your school username & password below.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>Why do I have to do this?</AlertTitle>
                    Taskcollect uses DayMap & the GIHS WebMail to show you your
                    assignments, lessons & messages (including emails).
                    <br /> <br />
                    We need to access your <b>school account</b> to do this.
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>Is my data safe?</AlertTitle>
                    Your credentials will <b>not</b> be stored on the
                    Taskcollect server at any point. A full list of data
                    collected is available in the last step of this setup.{" "}
                    <b>Data will be stored locally on this device.</b>
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} alignContent="center">
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    disabled={setupData.loading}
                    onKeyPress={submitOnEnter}
                    onChange={(e) => setUsername(e.target.value)}
                    value={setupData.username}
                    error={usernameError != null}
                    helperText={(usernameError || "") as string}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    fullWidth
                    disabled={setupData.loading}
                    onKeyPress={submitOnEnter}
                    onChange={(e) => setPassword(e.target.value)}
                    value={setupData.password}
                    error={passwordError != null}
                    helperText={(passwordError || "") as string}
                    InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    color={showPassword ? "warning" : "inherit"}
                                >
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            {generalError == null ? null : generalError}
            <Grid item xs>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    loading={setupData.loading}
                    disabled={
                        setupData.credentialsOK ||
                        usernameError != null ||
                        passwordError != null
                    }
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                >
                    {generalError == null ? "confirm" : "try again"}
                </LoadingButton>
            </Grid>
        </Grid>
    );
}
