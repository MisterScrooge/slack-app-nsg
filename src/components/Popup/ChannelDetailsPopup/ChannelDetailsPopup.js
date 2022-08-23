import { useContext, useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import AddChannelMember from "./AddChannelMember";
import ChannelMembers from "./ChannelMembers";
import "../Popup.css"
import "./ChannelDetails.css"

const ChannelDetailsPopup = ({handleToggle, retrieveChannelDetails}) => {
    const {channelDetails} = useContext(ChannelDetails);
    const [toggled, setToggled] = useState("members");
    const navigate = useNavigate();

    useEffect(() => {
        setToggled("members");
    })

    return(
        <div className="popup-overlay-div">
            <div className="popup channel-details-popup">
                <div className="popup-header">
                    {channelDetails.name}
                    <i className="fa-solid fa-xmark" onClick={handleToggle}></i>
                </div>

                <div className="popup-nav">
                    <div className={toggled === "members" ? "popup-nav-item active" : "popup-nav-item"}
                        onClick={e => navigate("./members")}>
                        Members
                    </div>
                </div>

                <div className="popup-body">
                    <Routes>
                        <Route path="/members" element={<ChannelMembers />}/>
                        <Route path="/members/add-new-member" element={<AddChannelMember retrieveChannelDetails={retrieveChannelDetails}/>}/>
                    </Routes>
                </div>
            </div>
            <div className="overlay" onClick={handleToggle}></div>
        </div>
    )
}

export default ChannelDetailsPopup;
