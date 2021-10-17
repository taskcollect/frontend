import { Dispatch } from "react";
import { Credentials } from "./creds";

export interface GlobalStateInterface {
    creds: Credentials | null;
    theme: "dark" | "light";
}

export type ActionType = {
    type: string;
    payload?: any;
};

export type ContextType = {
    globalState: GlobalStateInterface;
    dispatch: Dispatch<ActionType>;
};

const initialState: GlobalStateInterface = {
    creds: null,
    theme: "dark",
};

// load the state from local storage
export function initializeState() {
    if (typeof Storage == "undefined") {
        throw new Error("You need to enable Storage to run this app.");
    }

    try {
        let data = JSON.parse(localStorage.getItem("globalState") as string);

        if (data == null) {
            throw new Error("No data found.");
        }

        return data
    } catch (error) {
        console.log(`Failed to load state from storage: ${error} Reverting to default data state.`);
        return initialState;
    }
}

const Reducer = (
    state: GlobalStateInterface,
    action: ActionType
): GlobalStateInterface => {
    switch (action.type) {
        case "SET_CREDS":
            return {
                ...state,
                creds: action.payload,
            };
        case "CLEAR_CREDS":
            return {
                ...state,
                creds: null,
            };
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload,
            };
        case "PURGE":
            return initialState;
        default:
            return state;
    }
};

export { initialState, Reducer };
