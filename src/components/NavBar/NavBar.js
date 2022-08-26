import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders, LoginInfo } from "../../contexts/LoginContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import AddChannel from "../Popup/CreateChannel/AddChannel";
import "./NavBar.css"

const NavBar = ({retrieveChannels}) => {
    const {updateLoginHeaders} = useContext(LoginHeaders);
    const {loginInfo, updateLoginInfo} = useContext(LoginInfo);
    const {selected, updateSelected} = useContext(SelectedContext);
    const {channels} = useContext(ChannelsContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        updateLoginHeaders(null);
        updateLoginInfo(null);

        for(let i = sessionStorage.length; i >= 0; i--) {
            const key = sessionStorage.key(i);

            sessionStorage.removeItem(key);
        }

        navigate("../")
    }

    // S >>>>
    const addChannelWindowToggle = () => {
        // if(isOpen) {
        //     navigate("/homepage");
        // } else {
        //     navigate("./members");
        // }
        console.log(isOpen);
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    useEffect(() => {
        if(!selected && channels.length > 0) {
            updateSelected(channels[0]);
        }
    }, [channels]);

    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">
                    Channels
                    {/* <i className="fa-solid fa-user-group" onClick={handleToggle}></i> */}
                    <i class="fa-solid fa-plus" onClick={addChannelWindowToggle}></i>
                </h5>
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

            {isOpen && <AddChannel addChannelWindowToggle={addChannelWindowToggle} retrieveChannels={retrieveChannels} />}
        </div>
    )
}

export default NavBar;