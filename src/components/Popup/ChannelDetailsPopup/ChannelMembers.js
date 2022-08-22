import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { UsersContext } from "../../../contexts/UsersContext";

const ChannelMembers = () => {
    const {users} = useContext(UsersContext);
    const {channelDetails} = useContext(ChannelDetails);

    return(
        <div className="channel-members">
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
    )
}

export default ChannelMembers;
