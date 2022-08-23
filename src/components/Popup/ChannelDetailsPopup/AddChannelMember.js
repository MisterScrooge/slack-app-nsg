import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { LoginHeaders } from "../../../contexts/LoginContext";
import { UsersContext } from "../../../contexts/UsersContext";

const AddChannelMember = ({retrieveChannelDetails}) => {
    const {loginHeaders} = useContext(LoginHeaders);
    const {channelDetails} = useContext(ChannelDetails);
    const {users} = useContext(UsersContext);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const navigate = useNavigate();
    const url = "http://206.189.91.54/api/v1/";

    const addMember = async (newMember) => {
        const response = await fetch(`${url}channel/add_member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...loginHeaders
            },
            body: JSON.stringify({
                'id': channelDetails.id,
                'member_id': newMember.id
            })
        });

        if(response.status === 200) {
            retrieveChannelDetails();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const idx = users.findIndex(user => user.email === newMemberEmail.trim());

        if(idx !== -1) {
            addMember(users[idx]);
            setNewMemberEmail("");
        }
    }

    return(
        <div className="channel-details-body">
            <i className="fa-solid fa-arrow-left-long" onClick={e => navigate("../members")}></i>

            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-inner-con">
                    <label htmlFor="newUserEmail">Email</label>
                    <input
                        id="newUserEmail"
                        type="text"
                        value={newMemberEmail}
                        onInput={e => setNewMemberEmail(e.target.value)}
                    />
                </div>

                <div className="form-inner-con">
                    <button className="button" type="Submit">Add new member</button>
                </div>
            </form>
        </div>
    )
}

export default AddChannelMember;
