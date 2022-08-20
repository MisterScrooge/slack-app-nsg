import { createContext, useContext, useState } from "react";

export const SelectedContext = createContext();

export const SelectedProvider = ({children}) => {
    const [selected, setSelected] = useState(sessionStorage.getItem("selected") === null ? {} : JSON.parse(sessionStorage.getItem("selected")));

    const updateSelected = (select) => {
        sessionStorage.setItem("selected", JSON.stringify(select));
        setSelected(select);
    }

    return(
        <SelectedContext.Provider value={{selected, updateSelected}}>
            {children}
        </SelectedContext.Provider>
    )
}
