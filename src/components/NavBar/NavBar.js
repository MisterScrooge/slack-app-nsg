import { useContext, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders } from "../../contexts/LoginContext";
import "./NavBar.css"

const NavBar = () => {
    const {channels, updateChannels} = useContext(ChannelsContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const url = "http://206.189.91.54/api/v1";

    const retrieveChannels = async () => {
        const response = await fetch(`${url}/channels`, {
            method: 'GET',
            headers: {
                'expiry': loginHeaders['expiry'],
                'uid': loginHeaders['uid'],
                'access-token': loginHeaders['access-token'],
                'client': loginHeaders['client']
            }
        });

        if(response.status === 200) {
            const data = await response.json();
            console.log(data['data']);
            updateChannels(data['data']);
        }
    }

    useEffect(() => {
        retrieveChannels();
    });

    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">Channels</h5>
                {channels.length > 0 && channels.map((channel, i) => {
                    return (
                        <div key={channel.id} className="nav-item">
                            {channel.name}
                        </div>
                    )
                })}
            </div>

            <div className="nav-list">
                <h5 className="nav-header">Direct Messages</h5>
            </div>
        </div>
    )
}

export default NavBar;
