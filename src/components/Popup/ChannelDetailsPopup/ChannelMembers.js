import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { UsersContext } from "../../../contexts/UsersContext";
import { LoginHeaders } from "../../../contexts/LoginContext";

const ChannelMembers = ({retrieveChannelDetails}) => {
    const {loginHeaders} = useContext(LoginHeaders);
    const {users} = useContext(UsersContext);
    const {channelDetails} = useContext(ChannelDetails);
    const url = "http://206.189.91.54/api/v1/";

    const addMember = async (newMember) => {
        const response = await fetch(`${url}api/v1/channel/add_member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...loginHeaders
            },
            body: {
                'id': channelDetails.id,
                'member_id': newMember.id
            }
        });

        if(response.status === 200) {
            retrieveChannelDetails();
        }
    }

    return(
        <div className="channel-details-body">
            <div className="button">+ Add a new member</div>

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
        </div>
    )
}

export default ChannelMembers;
