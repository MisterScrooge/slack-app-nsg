import { createContext, useState } from "react";

export const ChannelsContext = createContext();
export const ChannelDetails = createContext();

export const ChannelsProvider = ({children}) => {
    const [channels, setChannels] = useState(!sessionStorage.getItem("channels") ? [] : JSON.parse(sessionStorage.getItem("channels")));
    const [channelDetails, setChannelDetails] = useState(!sessionStorage.getItem("channel_details") ? {} : JSON.parse(sessionStorage.getItem("channel_details")));

    const updateChannels = (newChannels) => {
        console.log(newChannels);

        if(typeof newChannels === 'undefined') {
            sessionStorage.setItem("channels", JSON.stringify([]));
            setChannels([]);
            console.log('if happened'); //  S
            return;
        }

        sessionStorage.setItem("channels", JSON.stringify(newChannels));
        setChannels(newChannels);
    }

    const updateChannelDetails = (newDetails) => {
        sessionStorage.setItem("channel_details", JSON.stringify(newDetails));
        setChannelDetails(newDetails);
    }

    return (
        <ChannelsContext.Provider value={{channels, updateChannels}}>
            <ChannelDetails.Provider value={{channelDetails, updateChannelDetails}}>
                {children}
            </ChannelDetails.Provider>
        </ChannelsContext.Provider>
    )
}
