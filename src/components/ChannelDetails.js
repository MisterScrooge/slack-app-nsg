import {useState, useContext} from 'react'
import { LoginHeaders } from '../context/LoginContext';


const ChannelDetails = () => {
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);
    const [channelInfo, setChannelInfo] = useState({
        channelID: ''
    })

    const submitHandler = (e) => {
        e.preventDefault();

        const channelData = {
            id: channelInfo.channelID,
        }
        
        fetch(`http://206.189.91.54/api/v1/channels/${channelInfo.channelID}`, {
            method: "GET",
            headers: {
                ...loginHeaders
            }
        })
        .then(res => res.json(channelData))
        .then(data => console.log(data))

    };


    return (
        <div>
            <h1>Send Message</h1>
                <input
                type='number'
                placeholder='Channel ID'
                name='channelID'
                value={channelInfo.channelID}
                onInput={e => setChannelInfo({...channelInfo, channelID: e.target.value})}
                />
                <button onClick={submitHandler}>Send</button>
        </div>
    )
}

export default ChannelDetails