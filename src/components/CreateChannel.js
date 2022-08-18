
export default CreateChannel = () => {
    const url = "http://206.189.91.54/api/v1";
    const [userInfo, setUserInfo] = useState({
        name: '',
        user_ids: [],
    })

    const signUp = async () => {
        console.log('userInfo', userInfo);
        const response = await fetch(`${url}/auth/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        const data = await response.json();
        console.log(data);

        for (let [key, value] of response.headers) {
            console.log(`${key} = ${value}`);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        signUp(userInfo)
    }

    return (
        <div>
            <form>
                <label>Channel name: </label>
                <input type="text" value={userInfo.email} onInput={e => setUserInfo({...userInfo, name: e.target.value})}></input>
                <label>My email: </label>
                <input type="text" value={userInfo.password} onInput={e => setUserInfo({...userInfo, user_ids: push(e.target.value)})}></input>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}