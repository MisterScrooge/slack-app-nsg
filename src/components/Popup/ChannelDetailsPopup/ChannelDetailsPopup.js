import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import "../Popup.css"

const ChannelDetailsPopup = ({handleToggle}) => {
    const {channelDetails} = useContext(ChannelDetails);

    return(
        <div className="popup-overlay-div">
            <div className="popup">
                <div className="popup-header">
                    {channelDetails.name}
                    <i className="fa-solid fa-xmark" onClick={handleToggle}></i>
                </div>
            </div>
            <div className="overlay" onClick={handleToggle}></div>
        </div>
    )
}

export default ChannelDetailsPopup;
