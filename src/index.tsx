import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";
import { CustomizableThemeProvider } from "./lib/theme";
import App from "./components/App";
import { GlobalStore } from "./lib/store";

import DateAdapter from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from "@mui/lab";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: 'a few seconds',
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    }
  })

ReactDOM.render(
    <GlobalStore>
        <LocalizationProvider dateAdapter={DateAdapter}>
            <CustomizableThemeProvider>
                <CssBaseline />
                <App />
            </CustomizableThemeProvider>
        </LocalizationProvider>
    </GlobalStore>,
    document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
