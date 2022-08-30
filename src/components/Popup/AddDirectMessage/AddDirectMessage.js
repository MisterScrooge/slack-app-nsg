import { useState, useContext } from "react";
import { SelectedContext } from "../../../contexts/SelectedContext";
import { UsersContext } from "../../../contexts/UsersContext";
import { UserDMsContext } from "../../../contexts/UserDMsContext";
import { LoginInfo } from "../../../contexts/LoginContext";
import "./AddDirectMessage.css"

const AddDirectMessage = ({handleToggle}) => {
    const {users} = useContext(UsersContext);
    const {updateSelected} = useContext(SelectedContext);
    const {userDMs, updateUserDMs} = useContext(UserDMsContext);
    const {loginInfo} = useContext(LoginInfo);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim().length === 0) {
            return;
        }

        if(email.trim() === loginInfo['data']['email']) {
            setMessage("You can't send a DM to yourself, silly! 😏");
            return;
        }

        const idx = users.findIndex(user => user.email === email.trim());

        if(idx === -1) {
            setMessage(`${email.trim()} is not a user!`);
            return;
        } else {
            setMessage("");
            updateSelected(users[idx]);

            const tempUserDMs = [...userDMs];

            if(userDMs.includes(users[idx])) {
                const dmIdx = userDMs.findIndex(user => user.email === email);
                tempUserDMs.splice(dmIdx, 1);
            }

            tempUserDMs.unshift(users[idx]);
            updateUserDMs(tempUserDMs);

            handleToggle();
        }
    }

    return (
        <div className="popup-overlay-div">
            <div className="popup add-dm-popup">
                <div className="popup-header">
                    Send a direct message to:
                    <i className="fa-solid fa-xmark" onClick={handleToggle}></i>
                </div>

                <div className="popup-body">
                    <form className="form-con" onSubmit={handleSubmit}>
                        <div className="form-inner-con">
                            <p className="sub-info">Please enter the email address of the user that you'd like to send a message to:</p>
                            <div className="failed-add">{message}</div>
                        </div>

                        <div className="form-inner-con">
                            <label>Email</label>
                            <input
                                type="text"
                                value={email}
                                onInput={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-inner-con">
                            <button className="button" type="submit">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="overlay" onClick={handleToggle}></div>
        </div>
    )
}

export default AddDirectMessage;
