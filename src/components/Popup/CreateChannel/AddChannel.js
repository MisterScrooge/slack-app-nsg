import { useNavigate, useState, useContext } from 'react';
import { LoginHeaders, LoginInfo } from "../../../contexts/LoginContext";
import AddMembers from './AddMembers';

const AddChannel = ({addChannelWindowToggle}) => {
    const url = "http://206.189.91.54/api/v1";
    const {loginHeaders} = useContext(LoginHeaders);
    const [channelInput, setChannelInput] = useState({
        name: '',
        user_ids: [],
    });


    const createChannel = async () => {
        console.log('channelInput', channelInput);
        const response = await fetch(`${url}/channels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ... loginHeaders
            },
            body: JSON.stringify(channelInput)
        });
        const data = await response.json();
        console.log(data);
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     let list = userInfo.user_ids;
    //     list.push(userIds)

    //     create(userInfo)
    // }


    return (
        <div className="popup-overlay-div">
            <div className="popup channel-details-popup">
                <div className="popup-header">
                    Create Channel
                    <i className="fa-solid fa-xmark" onClick={addChannelWindowToggle}></i>
                </div>
                <div className="popup-body">
                    {/* <Routes>
                        <Route path="/members" element={<ChannelMembers />}/>
                        <Route path="/members/add-new-member" element={<AddChannelMember retrieveChannelDetails={retrieveChannelDetails}/>}/>
                        <Route path="/about" element={<AboutChannel />}/>
                    </Routes> */}
                    <div>
                        <div>
                            <label>Enter Channel name: </label>
                            <input type="text" value={channelInput.name} onInput={e => setChannelInput({...channelInput, name: e.target.value})}></input>
                        </div>
                        <AddMembers />
                        <button>+ Add</button>
                    </div>
                </div>
            </div>
            <div className="overlay" onClick={addChannelWindowToggle}></div>
        </div>
    )
}

export default AddChannel;