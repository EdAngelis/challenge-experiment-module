import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {

    const [experiments, setExperiments] = useState([{}])
    return (
        <AppContext.Provider value = {{ experiments, setExperiments}}>
            {children}
        </AppContext.Provider>
    )
}