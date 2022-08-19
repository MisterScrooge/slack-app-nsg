import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./MainChat.css";

const MainChat = () => {
    const {selected} = useContext(SelectedContext);

    return(
        <div className="main">
            <div className="header chat-header">{selected.name}</div>

            <div className="messages-div">

            </div>

            <div className="send-div">
                <input
                    type="text"
                    placeholder={"Message " + selected.name}
                />

                <div className="send-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                    Send
                </div>
            </div>
        </div>
    )
}

export default MainChat;
