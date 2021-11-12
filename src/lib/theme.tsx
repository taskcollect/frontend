import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { red, amber } from "@mui/material/colors";
import { ReactNode, useContext, useState } from "react";
import { GlobalContext } from "./store";

// A custom theme for this app
export const defaultTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#3F80EE",
        },
        secondary: {
            main: amber.A400,
        },
        error: {
            main: red.A400,
        },
    },
};

interface props {
    children: ReactNode;
}

export function CustomizableThemeProvider({ children }: props) {
    const [theme] = useState(defaultTheme);

    // global state
    const { globalState } = useContext(GlobalContext);
    
    if (theme?.palette !== undefined) {
        theme.palette.mode = globalState?.theme;
    }

    return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
}
