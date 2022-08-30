import { useContext } from "react";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { UsersContext } from "../../../contexts/UsersContext";
import { LoginInfo } from "../../../contexts/LoginContext";
import { UserDMsContext } from "../../../contexts/UserDMsContext";
import { useNavigate } from "react-router-dom";
import { SelectedContext } from "../../../contexts/SelectedContext";

const ChannelMembers = ({handleToggle}) => {
    const {users} = useContext(UsersContext);
    const {channelDetails} = useContext(ChannelDetails);
    const {loginInfo} = useContext(LoginInfo);
    const {userDMs, updateUserDMs} = useContext(UserDMsContext);
    const {updateSelected} = useContext(SelectedContext);
    const ownerIdx = users.findIndex(user => user.id === channelDetails['owner_id']);
    const navigate = useNavigate();

    const handleClick = (newDM) => {
        if(!userDMs.includes(newDM)) {
            const tempUserDMs = [...userDMs];
            tempUserDMs.unshift(newDM);
            updateUserDMs(tempUserDMs);
        }

        updateSelected(newDM);
        handleToggle();
    }

    return(
        <div className="channel-details-body">
            <div className="button" onClick={e => navigate("./add-new-member")}>+ Add a new member</div>

            <div className="channel-details-div channel-members">
                {channelDetails['channel_members'].map((member, i) => {
                    const idx = users.findIndex(user => user.id === member['user_id']);
                    const user = users[idx];
                    const isOwner = idx === ownerIdx;
                    const isLoggedInUser = loginInfo['data']['email'] === user.email;

                    return(
                        <div key={"member" + i} className="member">
                            <div className="initial">{user.email[0].toUpperCase()}</div>
                            {user.email}
                            {isOwner && <i className="fa-solid fa-crown"></i>}

                            {!isLoggedInUser && <i className="fa-solid fa-paper-plane" onClick={e => handleClick(user)}></i>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChannelMembers;
