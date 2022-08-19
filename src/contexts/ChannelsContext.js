import { createContext, useState } from "react";

export const ChannelsContext = createContext();

export const ChannelsProvider = ({children}) => {
    const [channels, setChannels] = useState([]);

    const updateChannels = (newChannels) => {
        setChannels(newChannels);
    }

    return (
        <ChannelsContext.Provider value={{channels, updateChannels}}>
            {children}
        </ChannelsContext.Provider>
    )
}
