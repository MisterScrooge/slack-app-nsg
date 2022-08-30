import { useContext, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import AddChannelMember from "./AddChannelMember";
import ChannelMembers from "./ChannelMembers";
import "../Popup.css"
import "./ChannelDetails.css"
import AboutChannel from "./AboutChannel";

const ChannelDetailsPopup = ({handleToggle, retrieveChannelDetails}) => {
    const {channelDetails} = useContext(ChannelDetails);
    const [toggled, setToggled] = useState("members");
    const navigate = useNavigate();

    return(
        <div className="popup-overlay-div">
            <div className="popup channel-details-popup">
                <div className="popup-header">
                    {channelDetails.name}
                    <i className="fa-solid fa-xmark" onClick={handleToggle}></i>
                </div>

                <div className="popup-nav">
                    <div className={toggled === "members" ? "popup-nav-item active" : "popup-nav-item"}
                        onClick={e => {
                            setToggled("members");
                            navigate("./members");
                        }}>
                        Members
                    </div>
                    <div className={toggled === "about" ? "popup-nav-item active" : "popup-nav-item"}
                        onClick={e => {
                            setToggled("about");
                            navigate("./about");
                        }}>
                        About
                    </div>
                </div>

                <div className="popup-body">
                    <Routes>
                        <Route path="/members" element={<ChannelMembers handleToggle={handleToggle}/>}/>
                        <Route path="/members/add-new-member" element={<AddChannelMember retrieveChannelDetails={retrieveChannelDetails}/>}/>
                        <Route path="/about" element={<AboutChannel />}/>
                    </Routes>
                </div>
            </div>
            <div className="overlay" onClick={handleToggle}></div>
        </div>
    )
}

export default ChannelDetailsPopup;
