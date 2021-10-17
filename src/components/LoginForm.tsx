import React, { useContext, useState } from "react";

import {
    Typography,
    TextField,
    Grid,
    Link,
    InputAdornment,
    IconButton,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { LoadingButton } from "@mui/lab";
import { GlobalContext } from "../lib/store";

enum LoginFormState {
    READY,
    PROCESSING,
    SUCCESS,
    WRONG,
    INTERNALERROR,
}

function LoginForm() {
    // import the global state
    const { dispatch } = useContext(GlobalContext);

    // should the password be shown?
    const [showPassword, setShowPassword] = useState(false);

    // what is the current state of the login form?
    const [loginState, setLoginState] = useState(LoginFormState.READY);
    // shortcut to see if the form is loading
    const isLoading = loginState === LoginFormState.PROCESSING;

    // the actual username & password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submit() {
        if (loginState === LoginFormState.PROCESSING) return;
        setLoginState(LoginFormState.PROCESSING);

        // send to the server here, etc...

        setTimeout(stopLoad, 2000); // just simulate a response after 2 seconds
    }

    async function stopLoad() {
        dispatch({ type: "SET_CREDS", payload: { username, password } });
        setLoginState(LoginFormState.SUCCESS);
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
            maxWidth="400px"
        >
            <Grid item xs={12} textAlign="center">
                <Typography variant="h4">
                    task<b>collect</b>
                </Typography>
                <Typography variant="h6">GIHS Login</Typography>
            </Grid>
            <Grid item xs={12} alignContent="center">
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    disabled={isLoading}
                    onKeyPress={submitOnEnter}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    fullWidth
                    disabled={isLoading}
                    onKeyPress={submitOnEnter}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
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
            <Grid item xs>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                >
                    Sign In
                </LoadingButton>
            </Grid>
            <Grid item xs>
                <Link
                    href="/"
                    style={{ float: "right" }}
                    color="inherit"
                    underline="hover"
                >
                    I Can't Sign In!
                </Link>
            </Grid>
        </Grid>
    );
}

export default LoginForm;
