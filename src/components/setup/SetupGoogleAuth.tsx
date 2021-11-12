import { LoadingButton } from "@mui/lab";
import {
    Divider,
    Grid,
    Typography,
    Box,
    Alert,
    AlertTitle,
} from "@mui/material";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { SetupContext } from "./SetupForm";

import GoogleIcon from "@mui/icons-material/Google";
import ClearIcon from "@mui/icons-material/Clear";

import GoogleLoginButton, {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from "react-google-login";

export default function GoogleAuth() {
    const { setupData, setSetupData } = useContext(SetupContext);
    const [generalError, setGeneralError] = useState<string | ReactNode>(null);

    useEffect(() => {
        if (setupData.googleCode != null) return;

        setSetupData({
            ...setupData,
            loading: false,
        });
    }, [setupData.googleCode, setSetupData]);

    function startLoading() {
        setSetupData({
            ...setupData,
            googleOK: false,
            loading: true,
        });
    }

    function doAuth(buttonRenderProps: {
        onClick: () => void;
        disabled?: boolean;
    }) {
        startLoading();
        // pretend that the button was clicked
        buttonRenderProps.onClick();
    }

    function authSuccess(
        resp: GoogleLoginResponse | GoogleLoginResponseOffline
    ) {
        const code: string = (resp as GoogleLoginResponseOffline).code;

        console.log(resp);

        console.log("GOT CODE", code);

        setSetupData({
            ...setupData,
            googleCode: code,
            googleOK: true,
            loading: false,
        });
    }

    function authFailure(error: { error: string }) {
        setSetupData({
            ...setupData,
            googleCode: null,
            googleOK: false,
            loading: false,
        });

        if (error.error === "popup_closed_by_user") {
            const isFirefox = navigator.userAgent
                .toLowerCase()
                .includes("firefox");

            setGeneralError(
                <Alert severity="error">
                    <AlertTitle>Authorization Failed</AlertTitle>
                    <i>You closed the popup. Please try again.</i>

                    {isFirefox ? <>
                        <br /><br />
                        Google Authentication breaking down on Firefox is a known
                        issue. While Taskcollect fully supports firefox and is
                        searching for a fix we recommend you use Chrome just for
                        this setup process.
                        <br /><br />
                        You can still use Firefox once you've set up your 
                        Taskcollect account!
                        <br /><br />
                        Sorry for the inconvenience.
                    </> : null}
                </Alert>
            );
            return;
        }

        setGeneralError(
            <Alert severity="error">
                <AlertTitle>Authorization Failed</AlertTitle>
                Something went wrong while signing you in. Please try again.
                <br /><br />
                <i>
                    Error Details: <b>{error.error}</b>
                </i>
            </Alert>
        );
    }

    function scriptLoadFailure(error: { error: string }) {
        setGeneralError(
            <Alert severity="warning">
                <AlertTitle>
                    Google API Script may be improperly loaded.
                </AlertTitle>
                The Google Auth Library, or some parts thereof failed to load.
                Authentication may or may not fail.
                <br />
                <br />
                Make sure you are connected to the internet. Otherwise, try
                setting up Taskcollect on a different network, or try again
                later.
                <br />
                <br />
                <i>
                    Error Details: <b>{error.error}</b>
                </i>
            </Alert>
        );
    }

    function doRemoveAuth() {
        if (setupData.googleCode == null || !setupData.googleOK) return;

        startLoading();

        setTimeout(() => {
            setSetupData({
                ...setupData,
                googleCode: null,
                googleOK: false,
                loading: false,
            });
        }, 2000);
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
                <Typography variant="h5">Google Authorization</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Press the button below to authorize Taskcollect.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>Why do I have to do this?</AlertTitle>
                    Taskcollect uses Google Classroom to show you your
                    assignments, messages, classes and more.
                    <br /> <br />
                    We need to access your <b>school Google account</b> to do
                    this.
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {setupData.googleCode != null ? (
                <>
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Alert severity="success">
                                <AlertTitle>Success!</AlertTitle>
                                You have successfully authorized Taskcollect to
                                access your Google account.
                            </Alert>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton
                            color="error"
                            variant="outlined"
                            onClick={doRemoveAuth}
                            loading={setupData.loading}
                            loadingPosition="start"
                            startIcon={<ClearIcon />}
                        >
                            Revoke Access
                        </LoadingButton>
                    </Grid>
                </>
            ) : (
                <Grid item xs={12}>
                    <GoogleLoginButton
                        clientId="1037085997674-f3q7g82h53gttffmfr1n0uloc9n6rfi9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={authSuccess}
                        onFailure={authFailure}
                        onScriptLoadFailure={scriptLoadFailure}
                        accessType="offline"
                        responseType="code"
                        cookiePolicy={"single_host_origin"}
                        render={(renderProps) => (
                            <LoadingButton
                                color="primary"
                                variant="contained"
                                onClick={() => doAuth(renderProps)}
                                loading={setupData.loading}
                                disabled={
                                    setupData.googleOK || renderProps.disabled
                                }
                                loadingPosition="start"
                                startIcon={<GoogleIcon />}
                            >
                                Authorize
                            </LoadingButton>
                        )}
                    />
                </Grid>
            )}
            {generalError == null ? null : (
                <Grid item xs={12}>
                    {generalError}
                </Grid>
            )}
        </Grid>
    );
}
