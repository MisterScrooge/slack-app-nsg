import { useState, useContext } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import "./AddDirectMessage.css"

const AddDirectMessage = ({handleToggle}) => {
    const {users} = useContext(UsersContext);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim().length === 0) {
            return;
        }

        const idx = users.findIndex(user => user.email === email.trim());

        if(idx === -1) {
            setSuccess(false);
            setMessage(`${email.trim()} is not a user!`);
            return;
        } else {
            setSuccess(true);
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
                            <div className={success ? " " : "failed-add"}>{message}</div>
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
