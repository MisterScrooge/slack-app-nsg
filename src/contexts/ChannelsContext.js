import { createContext, useState } from "react";

export const Channels = createContext();

export const ChannelsProvider = ({children}) => {
    const [channels, setChannels] = useState([]);

    const updateChannels = (newChannels) => {
        setChannels(newChannels);
    }

    return (
        <Channels.Provider value={[channels, updateChannels]}>
            {children}
        </Channels.Provider>
    )
}
