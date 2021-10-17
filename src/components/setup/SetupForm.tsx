import * as React from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import UserPassForm from "./UserPassForm";
import { useState } from "react";
import GoogleAuth from "./SetupGoogleAuth";
import PrivacyAgreement from "./PrivacyAgreement";

interface SetupDataInterface {
    username: string;
    password: string;
    googleCode: string | null;
    loading: boolean;
    credentialsOK: boolean;
    googleOK: boolean;
    agreedToTerms: boolean;
}

const defaultSetupValues: SetupDataInterface = {
    username: "",
    password: "",
    googleCode: null,
    loading: false,
    credentialsOK: false,
    googleOK: false,
    agreedToTerms: false,
};

export const SetupContext = React.createContext({
    setupData: defaultSetupValues,
    setSetupData: (data: SetupDataInterface) => {},
});

const steps = [
    "Username & Password",
    "Google Authorization",
    "Privacy Agreement",
];

export default function SetupForm() {
    const [setupData, setSetupData] = useState(defaultSetupValues);
    const setupContextValue = { setupData, setSetupData };

    const [activeStep, setActiveStep] = React.useState(0);

    const isLastStep = activeStep === steps.length - 1;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserPassForm />;
            case 1:
                return <GoogleAuth />;
            case 2:
                return <PrivacyAgreement />;
            default:
                return "Unknown step";
        }
    };

    const shouldAllowNext = (): boolean => {
        if (setupData.loading) return false;

        switch (activeStep) {
            case 0:
                return setupData.credentialsOK;
            case 1:
                return setupData.credentialsOK && setupData.googleOK;
            case 2:
                return setupData.credentialsOK && setupData.googleOK && setupData.agreedToTerms;
        }

        return false;
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Grid item xs>
                <Stepper
                    activeStep={activeStep}
                    orientation={isMobile ? "vertical" : "horizontal"}
                >
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>

            <Grid item xs>
                <Box mt={3}>
                    <Paper variant="outlined">
                        <Box m={5}>
                            <Grid container justifyContent="center">
                                <SetupContext.Provider
                                    value={setupContextValue}
                                >
                                    {stepContent(activeStep)}
                                </SetupContext.Provider>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                        onClick={handleNext}
                        variant="contained"
                        disabled={!shouldAllowNext()}
                    >
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Grid>

            <Grid item xs mt={2}>
                <Typography variant="h5" color="textSecondary">
                    Debug Data
                </Typography>
            </Grid>
            <Grid item xs>
                <div style={{ fontFamily: "monospace " }}>
                    {JSON.stringify(setupData, null, 1)}
                </div>
            </Grid>
        </>
    );
}
