import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders, LoginInfo } from "../../contexts/LoginContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./MainChat.css";

const MainChat = () => {
    const {channels} = useContext(ChannelsContext);
    const {selected} = useContext(SelectedContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const {loginInfo} = useContext(LoginInfo);
    const [send, setSend] = useState("");
    const [messages, setMessages] = useState([]);
    const url = "http://206.189.91.54/api/v1/";
    let recClass = selected !== null && channels.findIndex(obj => obj.id === selected.id) !== -1 ? "Channel" : "User";

    const retrieveMessages = async () => {

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
        setMessages(data['data']);
    }

    const sendMessage = async (e, message) => {
        e.preventDefault();

        const response = await fetch(`${url}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'expiry': loginHeaders['expiry'],
                'uid': loginHeaders['uid'],
                'access-token': loginHeaders['access-token'],
                'client': loginHeaders['client']
            },
            body: JSON.stringify({
                'receiver_id': selected.id,
                'receiver_class': recClass,
                'body': message
            })
        });

        const data = await response.json();
        console.log(data);
        retrieveMessages();
    }

    useEffect(() => {
        recClass = channels.findIndex(obj => obj.id === selected.id) !== -1 ? "Channel" : "User";
        setSend("");

        if(selected) {
            retrieveMessages();
        }
    }, [selected]);

    return(
        <div className="main">
            {selected && <><div className="header chat-header">{selected.name}</div>

            <div className="messages-div">
                {messages.map((message, i) => {
                    const time = message['created_at'].slice(11, 16);
                    const myMessage = message.sender.id === loginInfo.data.id;

                    return (
                        <div key={"message" + i} className={myMessage ? "message-div sent" : "message-div received"}>
                            <div className="message-body">{message.body}</div>
                            {myMessage ?
                                <div className="message-details">
                                    <div className="message-time">{time}</div>
                                    <div className="message-sender">You</div>
                                </div>
                            :
                                <div className="message-details">
                                    <div className="message-sender">{message.sender.email}</div>
                                    <div className="message-time">{time}</div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>

            <form className="send-div" onSubmit={e => sendMessage(e, send)}>
                <input
                    type="text"
                    value={send}
                    placeholder={"Message " + selected.name}
                    onInput={e => setSend(e.target.value)}
                />

                <div className="send-btn" onClick={e => sendMessage(e, send)}>
                    <i className="fa-solid fa-paper-plane"></i>
                    Send
                </div>
            </form></>}
        </div>
    )
}

export default MainChat;
