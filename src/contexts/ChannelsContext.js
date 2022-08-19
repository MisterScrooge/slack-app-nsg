import { createContext, useState } from "react";

export const ChannelsContext = createContext();

export const ChannelsProvider = ({children}) => {
    const [channels, setChannels] = useState(sessionStorage.getItem("channels") === null ? [] : JSON.parse(sessionStorage.getItem("channels")));

    const updateChannels = (newChannels) => {
        sessionStorage.setItem("channels", JSON.stringify(channels));
        setChannels(newChannels);
    }

    return (
        <ChannelsContext.Provider value={{channels, updateChannels}}>
            {children}
        </ChannelsContext.Provider>
    )
}
