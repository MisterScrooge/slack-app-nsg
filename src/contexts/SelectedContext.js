import { createContext, useContext, useState } from "react";
import { ChannelsContext } from "./ChannelsContext";

export const SelectedContext = createContext();

export const SelectedProvider = ({children}) => {
    const {channels} = useContext(ChannelsContext);
    const [selected, setSelected] = useState(sessionStorage.getItem("selected") !== null ? JSON.parse(sessionStorage.getItem("selected")) : channels[0]);

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
