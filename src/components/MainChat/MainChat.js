import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./MainChat.css";

const MainChat = () => {
    const {selected} = useContext(SelectedContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, [selected]);

    return(
        <div className="main">
            <div className="header chat-header">{selected.name}</div>

            <div className="messages-div">

            </div>

            <div className="send-div">
                <input
                    type="text"
                    value={message}
                    placeholder={"Message " + selected.name}
                    onInput={e => setMessage(e.target.value)}
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
