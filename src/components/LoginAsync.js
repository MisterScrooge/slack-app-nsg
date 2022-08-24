import { useState, useEffect, useContext } from "react";
import { LoginHeaders, LoginInfo } from "../context/LoginContext"

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const url = "http://206.189.91.54/api/v1";
    const {loginInfo, updateLoginInfo} = useContext(LoginInfo);
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);

    const testlogin = async () => {
        updateLoginInfo(userInfo)
        console.log('userinfo', userInfo);

        const response = await fetch (`${url}/auth/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        let test1 = {};

        test1 = {
            "access-token": response.headers.get("access-token"),
            "client": response.headers.get("client"),
            "expiry": response.headers.get("expiry"),
            "uid": response.headers.get("uid")
        };
        updateLoginHeaders(test1);

        console.log(test1);

        const data = await response.json();
        console.log("data", data);
        updateLoginInfo(data)
    }

    const submitHandler = (e) => {  
        e.preventDefault();
        testlogin(userInfo)
    }

    useEffect(() => {
        console.log("loginInfo", loginInfo);
        console.log("loginHeaders", loginHeaders);
    });

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

export default Login;