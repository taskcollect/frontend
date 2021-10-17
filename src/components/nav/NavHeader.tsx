import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

// import { ReactComponent as TaskcollectIcon } from "../assets/tc_transparent.svg";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import React, { useContext, useState } from "react";
import LoginStatusPin from "./LoginStatusPin";
import { GlobalContext } from "../../lib/store";

import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";

import { useHistory } from "react-router-dom";

export default function NavHeader() {
    // global state
    const { globalState, dispatch } = useContext(GlobalContext);

    const [mobileMenuAnchor, setMobileMenuAnchor] =
        useState<null | HTMLElement>(null);
    const isMobileMenuOpen = mobileMenuAnchor != null;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const history = useHistory();

    // const brandIcon = (
    //     <SvgIcon
    //         component={TaskcollectIcon}
    //         viewBox="0 0 512 512"
    //         style={{
    //             border: "1px solid red",
    //         }}
    //     />
    // );

    const tcTitle = (
        <Typography color="inherit" variant="h6">
            <RouterLink to="/" style={{ all: "unset", cursor: "pointer" }}>
                task<b>collect</b>
            </RouterLink>
        </Typography>
    );

    function mobileStart() {
        return (
            <>
                <Grid item>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    direction="column"
                    justifyContent="center"
                    alignItems="center" // vertical align
                    style={{
                        textAlign: "center",
                        flexGrow: 1,
                    }}
                >
                    {tcTitle}
                </Grid>
            </>
        );
    }

    function desktopStart() {
        return (
            <>
                <Grid item>{tcTitle}</Grid>

                <Box component="div" sx={{ flexGrow: 1 }} />
                {/* <Grid item>
                    <Button color="inherit">HOME</Button>
                </Grid>
                <Grid item>
                    <Button color="inherit">ABOUT</Button>
                </Grid> */}
            </>
        );
    }

    function desktopEnd() {
        return (
            <>
                <Grid item>
                    <Switch
                        onChange={handleThemeSwitchChange}
                        checked={isDarkMode}
                    ></Switch>
                </Grid>
                {globalState.creds == null ? (
                    [
                        <Grid item>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/login"
                            >
                                Sign In
                            </Button>
                        </Grid>,
                        <Grid item>
                            <Button
                                color={isDarkMode ? "primary" : "secondary"}
                                variant="contained"
                                component={RouterLink}
                                to="/setup"
                            >
                                Sign Up
                            </Button>
                        </Grid>,
                    ]
                ) : (
                    <Grid item>
                        <LoginStatusPin />
                    </Grid>
                )}
            </>
        );
    }

    function mobileEnd() {
        function closeMenu() {
            setMobileMenuAnchor(null);
        }

        function mobileMenuClick(e: React.MouseEvent<HTMLElement>) {
            setMobileMenuAnchor(e.currentTarget);
        }

        return (
            <>
                {globalState.creds == null ? (
                    [
                        <Grid item>
                            <IconButton
                                color="inherit"
                                onClick={mobileMenuClick}
                            >
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </Grid>,

                        <Menu
                            anchorEl={mobileMenuAnchor}
                            open={isMobileMenuOpen}
                            onClose={closeMenu}
                            onClick={closeMenu}
                        >
                            <MenuItem onClick={() => history.push("/login")}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                Sign In
                            </MenuItem>
                            <MenuItem onClick={() => history.push("/setup")}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                Sign Up
                            </MenuItem>
                        </Menu>,
                    ]
                ) : (
                    <Grid item>
                        <LoginStatusPin />
                    </Grid>
                )}
            </>
        );
    }

    function handleThemeSwitchChange(
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) {
        dispatch({ type: "SET_THEME", payload: checked ? "dark" : "light" });
    }

    const isDarkMode = globalState.theme === "dark";

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center" // vertical align
                        spacing={1}
                        padding={1}
                    >
                        {isMobile ? mobileStart() : desktopStart()}

                        {isMobile ? mobileEnd() : desktopEnd()}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
