import { useContext, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./NavBar.css"

const NavBar = () => {
    const {selected, updateSelected} = useContext(SelectedContext);
    const {channels} = useContext(ChannelsContext);

    useEffect(() => {
        if(!selected && channels.length > 0) {
            updateSelected(channels[0]);
        }
    }, [channels]);

    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">Channels</h5>
                {channels.length > 0 && channels.map((channel, i) => {
                    return (
                        <div key={"channel" + channel.id}
                            className={selected && selected.id === channel.id ? "nav-item selected" : "nav-item"}
                            onClick={() => updateSelected(channels[i])}
                        >
                            <div className="initial">{channel.name[0]}</div>
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
