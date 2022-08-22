import { createContext, useState } from "react";

export const ChannelsContext = createContext();

export const ChannelsProvider = ({children}) => {
    const [channels, setChannels] = useState([]);

    const updateChannels = (newChannels) => {
        setChannels(newChannels);
    }
    
    const [chosenChannel, setChosenChannel] = useState('')      // S, added setChosenChannel on return

    const updateChosenChannel = (id) => {
        console.log(`Channel id: ${id}`);
        setChosenChannel(id);
        console.log(chosenChannel)
    }
    

    return (
        <ChannelsContext.Provider value={{channels, updateChannels, updateChosenChannel}}>
            {children}
        </ChannelsContext.Provider>
    )
}