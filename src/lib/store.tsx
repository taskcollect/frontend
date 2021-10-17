// react stuff
import { createContext, ReactNode, useEffect, useReducer } from "react";

// state related imports
import { Reducer, ContextType, initializeState } from "./state";

// make the context object
export const GlobalContext = createContext({} as ContextType);


// props of the react element, note that the element should only have one child
interface props {
    children: ReactNode;
}

// react element that wraps the app
export function GlobalStore({ children }: props) {
    const [globalState, dispatch] = useReducer(Reducer, initializeState());
    
    useEffect(() => {
        /* populate localStorage every time we have a new update to the state */
        localStorage.setItem("globalState", JSON.stringify(globalState));
    }, [globalState]);

    return (
        <GlobalContext.Provider value={{ globalState, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
