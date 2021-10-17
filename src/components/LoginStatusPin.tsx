import React, { useContext, useState } from "react";

// material ui stuff
import {
    Avatar,
    CircularProgress,
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { GlobalContext } from "../lib/store";

export default function LoginStatusPin() {
    // global state
    const { globalState, dispatch } = useContext(GlobalContext);

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = menuAnchor != null;

    const [loggingOut, setLoggingOut] = useState(false);

    const isDarkMode = globalState.theme === "dark";

    function avatarClick(e: React.MouseEvent<HTMLElement>) {
        setMenuAnchor(e.currentTarget);
    }

    const closeMenu = () => {
        setMenuAnchor(null);
    };

    function getAvatarLetter(): string | null {
        const letter = globalState.creds?.username[0].toUpperCase();
        if (letter != null && letter.match(/[a-z]/i)) return letter;
        return null;
    }

    function logout() {
        if (loggingOut) return;
        setLoggingOut(true);

        // do actual logout from server here, for now it's just a delay

        setTimeout(() => {
            dispatch({ type: "CLEAR_CREDS" });
            setLoggingOut(false);
        }, 2000);
    }

    function LoggingOutSpinner() {
        return (
            <>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Tooltip title={`Signing out... 👋`} arrow placement="left">
                        <CircularProgress
                            size={32}
                            thickness={6}
                            sx={{ ml: 2 }}
                            color={isDarkMode ? "primary" : "secondary"}
                        />
                    </Tooltip>
                </Grid>
            </>
        );
    }

    function LoggedInAvatar() {
        return (
            <>
                <Tooltip
                    title={`Logged in as ${globalState.creds?.username}`}
                    arrow
                    placement="left"
                >
                    <IconButton
                        onClick={avatarClick}
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {getAvatarLetter()}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={menuAnchor}
                    open={isMenuOpen}
                    onClose={closeMenu}
                    onClick={closeMenu}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Sign Out
                    </MenuItem>
                </Menu>
            </>
        );
    }

    return <>{loggingOut ? LoggingOutSpinner() : LoggedInAvatar()}</>;
}
