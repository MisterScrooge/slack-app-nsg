import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelDetails } from "../../../contexts/ChannelsContext";
import { LoginHeaders } from "../../../contexts/LoginContext";
import { UsersContext } from "../../../contexts/UsersContext";

const AddChannelMember = ({retrieveChannelDetails}) => {
    const {loginHeaders} = useContext(LoginHeaders);
    const {channelDetails} = useContext(ChannelDetails);
    const {users} = useContext(UsersContext);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [success, setSuccess] = useState("");
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
            const data = await response.json();

            if(data.hasOwnProperty('errors')) {
                setSuccess(false);
                setResMessage(`${newMemberEmail} is already a member of this channel!`);
                return;
            }

            retrieveChannelDetails();
            setSuccess(true);
            setResMessage(`${newMemberEmail} has been successfully added to this channel!`);
            setNewMemberEmail("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newMemberEmail.trim().length === 0) {
            return;
        }

        const idx = users.findIndex(user => user.email === newMemberEmail.trim());

        if(idx !== -1) {
            addMember(users[idx]);
        } else {
            setSuccess(false);
            setResMessage(`${newMemberEmail.trim()} is not a user!`);
        }
    }

    useEffect(() => {
        setResMessage(" ");
        console.log(resMessage);
    }, []);

    return(
        <div className="channel-details-body add-member-div">
            <i className="fa-solid fa-arrow-left-long" onClick={e => navigate("../members")}></i>

            <div>
                <p className="sub-info">Please enter the email address of the user that you'd like to add to this channel</p>
                <p className={success ? "success-add" : "failed-add"}>{resMessage}</p>
            </div>

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
