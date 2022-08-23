import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { UsersContext } from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

const ChannelMembers = () => {
    const {users} = useContext(UsersContext);
    const {channelDetails} = useContext(ChannelDetails);
    const navigate = useNavigate();

    return(
        <div className="channel-details-body">
            <div className="button" onClick={e => navigate("./add-new-member")}>+ Add a new member</div>

            <div className="channel-details-div channel-members">
                {channelDetails['channel_members'].map((member, i) => {
                    const idx = users.findIndex(user => user.id === member['user_id']);
                    const user = users[idx];

                    return(
                        <div key={"member" + i} className="member">
                            <div className="initial">{user.email[0].toUpperCase()}</div>
                            {user.email}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChannelMembers;
