// stuff from react
import React, { useContext } from "react";

// stuff from react router
import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
    Redirect,
} from "react-router-dom";

// stores & states
import { GlobalContext } from "../lib/store";

// routes
import HomeRoute from "../routes/HomeRoute";
import LoginRoute from "../routes/LoginRoute";
import NavHeader from "./NavHeader";
import SetupRoute from "../routes/SetupRoute";

export default function App() {
    const { globalState } = useContext(GlobalContext);

    return (
        <Router>
            <NavHeader />

            <RouterSwitch>
                <Route exact path="/login">
                    {globalState.creds != null ? (
                        <Redirect to="/" />
                    ) : (
                        <LoginRoute />
                    )}
                </Route>
                <Route exact path="/setup">
                    {globalState.creds != null ? (
                        <Redirect to="/" />
                    ) : (
                        <SetupRoute />
                    )}
                </Route>
                <Route exact path="/">
                    <Route exact path="/">
                        {globalState.creds != null ? (
                            <HomeRoute />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                </Route>
            </RouterSwitch>
        </Router>
    );
}
