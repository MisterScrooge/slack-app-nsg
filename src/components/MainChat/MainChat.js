import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import "./MainChat.css";

const MainChat = () => {
    const {selected} = useContext(SelectedContext);

    return(
        <div className="main">
            <div className="header chat-header">{selected.name}</div>
        </div>
    )
}

export default MainChat;
