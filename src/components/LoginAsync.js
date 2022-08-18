import { useEffect, useState } from "react";

const LoginAsync = (props) => {
    const url = "http://206.189.91.54/api/v1";
    
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
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

        // let tempHeaders = {};
        for (let [key, value] of response.headers) {
            // let newKey = `${key}`
            console.log(`${key} = ${value}`);
            // tempHeaders[newKey] = value;
            props.setLoginHeaders({...props.loginHeaders, key: value})
        }
        // props.setLoginHeaders({...tempHeaders});
        // console.log(tempHeaders);
        console.log(props.loginHeaders);
    }

    // useEffect(() => {console.log(props.loginHeaders)}, [props.loginHeaders])

    const submitHandler = (e) => {
        e.preventDefault();
        signUp(userInfo)
    }

    return (
        <div>
            <form>
                <label>Email: </label>
                <input type="text" value={userInfo.email} onInput={e => setUserInfo({...userInfo, email: e.target.value})}></input>
                <label>Pass: </label>
                <input type="text" value={userInfo.password} onInput={e => setUserInfo({...userInfo, password: e.target.value})}></input>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default LoginAsync;