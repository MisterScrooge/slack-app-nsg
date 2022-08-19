import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders } from "../../contexts/LoginContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./MainChat.css";

const MainChat = () => {
    const {channels} = useContext(ChannelsContext);
    const {selected} = useContext(SelectedContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const [send, setSend] = useState("");
    const [Messages, setMessages] = useState([]);
    const url = "http://206.189.91.54/api/v1/";

    const retrieveMessages = async () => {
        const recClass = channels.findIndex(obj => obj.id === selected.id) !== -1 ? "Channel" : "User";

        const response = await fetch(`${url}messages?receiver_id=${selected.id}&receiver_class=${recClass}`,  {
            method: 'GET',
            headers: {
                'expiry': loginHeaders['expiry'],
                'uid': loginHeaders['uid'],
                'access-token': loginHeaders['access-token'],
                'client': loginHeaders['client']
            }
        });

        const data = await response.json();
        console.log(data['data']);
    }

    useEffect(() => {
        setSend("");
        retrieveMessages();
    }, [selected]);

    return(
        <div className="main">
            <div className="header chat-header">{selected.name}</div>

            <div className="messages-div">

            </div>

            <div className="send-div">
                <input
                    type="text"
                    value={send}
                    placeholder={"Message " + selected.name}
                    onInput={e => setSend(e.target.value)}
                />

                <div className="send-btn">
                    <i className="fa-solid fa-paper-plane"></i>
                    Send
                </div>
            </div>
        </div>
    )
}

export default MainChat;
