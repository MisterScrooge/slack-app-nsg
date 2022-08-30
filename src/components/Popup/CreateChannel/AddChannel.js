import { useNavigate, useState, useContext } from 'react';
import { LoginHeaders, LoginInfo } from "../../../contexts/LoginContext";
import { ChannelsContext } from '../../../contexts/ChannelsContext';
import { UsersContext } from '../../../contexts/UsersContext';
import AddMembers from './AddMembers';
import "./AddChannel.css";

const AddChannel = ({addChannelWindowToggle, retrieveChannels}) => {
    const url = "http://206.189.91.54/api/v1";
    const {loginHeaders} = useContext(LoginHeaders);
    const {updateChannels} = useContext(ChannelsContext);
    const [tags, setTags] = useState([]);
    const [indexTags, setIndexTags] = useState([]);
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
                ...loginHeaders
            },
            body: JSON.stringify(channelInput)
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data= ', data);
            retrieveChannels();
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Members to add: ', tags);
        console.log('Members to add: ', indexTags);
        channelInput.user_ids = indexTags;
        console.log('Passed to API: ', channelInput);
        createChannel(channelInput);
        addChannelWindowToggle();

        // let list = userInfo.user_ids;
        // list.push(userIds)
        // create(userInfo)
    }


    return (
        <div className="popup-overlay-div">
            <div className="popup channel-details-popup">
                <div className="popup-header">
                    Create Channel:
                    <i className="fa-solid fa-xmark" onClick={addChannelWindowToggle}></i>
                </div>
                <div className="popup-body">
                    {/* <Routes>
                        <Route path="/members" element={<ChannelMembers />}/>
                        <Route path="/members/add-new-member" element={<AddChannelMember retrieveChannelDetails={retrieveChannelDetails}/>}/>
                        <Route path="/about" element={<AboutChannel />}/>
                    </Routes> */}
                    <div>
                        <div className="channel-name-container">
                            <label>Enter Channel name: </label>
                            <input type="text" value={channelInput.name} onInput={e => setChannelInput({...channelInput, name: e.target.value})} className="channel-name-input"></input>
                        </div>
                        <label>Name your buddies...</label>
                        <AddMembers tags={tags} setTags={setTags} indexTags={indexTags} setIndexTags={setIndexTags} />
                        <div className="button-container">
                            <button onClick={submitHandler}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay" onClick={addChannelWindowToggle}></div>
        </div>
    )
}

export default AddChannel;
