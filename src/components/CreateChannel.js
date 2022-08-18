import { useState } from 'react';

const CreateChannel = (props) => {
    const url = "http://206.189.91.54/api/v1";
    const [userInfo, setUserInfo] = useState({
        name: '',
        user_ids: [],
    })
    const [userIds, setUserIds] = useState('');
    const [message, setMessage] = useState('');

    const create = async () => {
        console.log('userInfo', userInfo);
        const response = await fetch(`${url}/channels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...props.loginHeaders
            },
            body: JSON.stringify(userInfo)
        });
        const data = await response.json();
        console.log(data);


        setMessage("Whats good pareh");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let list = userInfo.user_ids;
        list.push(userIds)

        create(userInfo)
    }

    return (
        <div>
            <form>
                <label>Channel name: </label>
                <input type="text" value={userInfo.email} onInput={e => setUserInfo({...userInfo, name: e.target.value})}></input>
                <label>My email: </label>
                <input type="text" onInput={e => setUserIds({...userIds, user_ids: e.target.value})}></input>
                <button onClick={submitHandler}>Submit</button>
            </form>
            <h1>{message}</h1>
        </div>
    )
}

export default CreateChannel;