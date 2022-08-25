import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders, LoginInfo } from "../../contexts/LoginContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import { UserDMsContext } from "../../contexts/UserDMsContext";
import "./NavBar.css"

const NavBar = ({handleDMToggle}) => {
    const {updateLoginHeaders} = useContext(LoginHeaders);
    const {loginInfo, updateLoginInfo} = useContext(LoginInfo);
    const {selected, updateSelected} = useContext(SelectedContext);
    const {userDMs, updateUserDMs} = useContext(UserDMsContext);
    const {channels, updateChannels} = useContext(ChannelsContext);
    const [isDMNavToggled, setIsDMNavToggled] = useState(true);
    const [isChannelNavToggled, setIsChannelNavToggled] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        updateLoginHeaders(null);
        updateLoginInfo(null);
        updateSelected(null);
        updateChannels([]);
        updateUserDMs([]);

        for(let i = sessionStorage.length; i >= 0; i--) {
            const key = sessionStorage.key(i);

            sessionStorage.removeItem(key);
        }

        navigate("../")
    }

    useEffect(() => {
        if(!selected && channels.length > 0) {
            updateSelected(channels[0]);
        }
    }, []);

    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">
                    <div>
                        <i className="fa-solid fa-caret-down"></i>
                        Channels
                    </div>
                    <i className="fa-solid fa-plus"></i>
                </h5>
                <div className="nav-body">
                    {channels.length > 0 && channels.map((channel, i) => {
                        return (
                            <div key={"channel" + channel.id}
                                className={selected && selected.id === channel.id ? "nav-item selected" : "nav-item"}
                                onClick={() => updateSelected(channels[i])}
                            >
                                <div className="initial">{channel.name[0]}</div>
                                <div className="nav-item-text">{channel.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="nav-list">
                <h5 className="nav-header">
                    <div>
                        <i className="fa-solid fa-caret-down"></i>
                        Direct Messages
                    </div>
                    <i className="fa-solid fa-plus" onClick={handleDMToggle}></i>
                </h5>

                <div className="nav-body">
                    {userDMs.length > 0 && userDMs.map((dm, i) => {
                        return (
                            <div key={"dm" + dm.id}
                                className={selected && selected.id === dm.id ? "nav-item selected" : "nav-item"}
                                onClick={() => updateSelected(userDMs[i])}
                            >
                                <div className="initial">{dm.email[0].toUpperCase()}</div>
                                <div className="nav-item-text">{dm.email}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="footer">
                <div className="loggedin-user">
                    <i className="fa-solid fa-user"></i>
                    {loginInfo['data'].email}
                </div>

                <div className="logout" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Log out
                </div>
            </div>
        </div>
    )
}

export default NavBar;
