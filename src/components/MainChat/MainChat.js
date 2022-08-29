import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelDetails, ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders, LoginInfo } from "../../contexts/LoginContext";
import { SelectedContext } from "../../contexts/SelectedContext";
import ChannelDetailsPopup from "../Popup/ChannelDetailsPopup/ChannelDetailsPopup";
import "./MainChat.css";

const MainChat = () => {
    const {channels} = useContext(ChannelsContext);
    const {updateChannelDetails} = useContext(ChannelDetails);
    const {selected} = useContext(SelectedContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const {loginInfo} = useContext(LoginInfo);
    const [send, setSend] = useState("");
    const [messages, setMessages] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    const url = "http://206.189.91.54/api/v1/";
    let recClass = selected && channels.includes(selected) ? "Channel" : "User";

    const handleToggle = () => {
        if(isToggled) {
            navigate("/homepage");
        } else {
            navigate("./members");
        }

        setIsToggled(!isToggled);
    }

    const retrieveChannelDetails = async () => {
        const response = await fetch(`${url}channels/${selected.id}`,  {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            updateChannelDetails(data['data']);
        }
    }

    const retrieveMessages = async () => {
        const response = await fetch(`${url}messages?receiver_id=${selected.id}&receiver_class=${recClass}`,  {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            setMessages(data['data']);
        }
    }

    const sendMessage = async (e, message) => {
        e.preventDefault();

        const response = await fetch(`${url}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...loginHeaders
            },
            body: JSON.stringify({
                'receiver_id': selected.id,
                'receiver_class': recClass,
                'body': message
            })
        });

        if(response.status === 200) {
            setSend("");
            retrieveMessages();
        }
    }

    const convertToLocalTime = (serverTime) => {
        const localTime = new Date(serverTime).toLocaleString("en-US", {timeZone: "Asia/Manila"});
        return localTime.toString();
    }

    useEffect(() => {
        recClass = channels.includes(selected) ? "Channel" : "User";
        setSend("");

        if(selected) {
            retrieveMessages();

            if(recClass === "Channel") {
                retrieveChannelDetails();
            }
        }
    }, [selected]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return(
        <div className="main">
            {selected && <>
            <div className="header chat-header">
                {selected.name || selected.email}
                {recClass === "Channel" && <i className="fa-solid fa-user-group" onClick={handleToggle}></i>}
            </div>

            {isToggled && <ChannelDetailsPopup handleToggle={handleToggle} retrieveChannelDetails={retrieveChannelDetails}/>}

            <div className="messages-div">
                {messages && messages.length > 0 && messages.map((message, i) => {
                    const time = convertToLocalTime(message['created_at']);
                    console.log(time);
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
                                    <div className="initial">{message.sender.email[0].toUpperCase()}</div>
                                    <div className="message-sender">{message.sender.email}</div>
                                    <div className="message-time">{time}</div>
                                </div>
                            }
                        </div>
                    )
                })}
                <div ref={bottomRef}/>
            </div>

            <form className="send-div" onSubmit={e => sendMessage(e, send)}>
                <input
                    type="text"
                    value={send}
                    placeholder={"Message " + (selected.name || selected.email)}
                    onInput={e => setSend(e.target.value)}
                />

                <div className="send-btn" type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                    Send
                </div>
            </form></>}
        </div>
    )
}

export default MainChat;
