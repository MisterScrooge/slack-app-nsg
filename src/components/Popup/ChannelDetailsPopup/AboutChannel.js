import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { UsersContext } from "../../../contexts/UsersContext";
import "../Popup.css";
import "./ChannelDetails.css";

const AboutChannel = () => {
    const {channelDetails} = useContext(ChannelDetails);
    const {users} = useContext(UsersContext);

    const idx = users.findIndex(user => user.id === channelDetails['owner_id']);
    const ownerEmail = users[idx].email;

    const date = new Date(channelDetails['created_at']);
    const createDate = date.toLocaleDateString(undefined);

    return(
        <div className="channels-details-body">
            <div className="channel-details-div channel-about">
                <div>
                    <i className="fa-solid fa-crown"></i>
                    Owned by {ownerEmail}
                </div>
                <div>
                    <i class="fa-solid fa-stopwatch"></i>
                    Created on {createDate}
                </div>
            </div>
        </div>
    )
}

export default AboutChannel;
