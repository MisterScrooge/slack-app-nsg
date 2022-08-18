import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginHeaders, LoginInfo } from "../../contexts/LoginContext";
import "./Login-Reg.css"

const Login = () => {
    const [userInput, setUserInput] = useState({email: '', password: ''});
    const [invalid, setInvalid] = useState(false);
    const url = "http://206.189.91.54/api/v1";
    const [loginInfo, updateLoginInfo] = useContext(LoginInfo);
    const [loginHeaders, updateLoginHeaders] = useContext(LoginHeaders);
    const navigate = useNavigate();

    const signUp = async () => {
        updateLoginInfo(userInput);

        const response = await fetch(`${url}/auth/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        });

        const data = await response.json();
        console.log("data", data);

        let tempHeaders = {};
        for (let [key, value] of response.headers) {
            console.log(`${key} = ${value}`);
            tempHeaders[key] = value;
        }
        updateLoginHeaders(tempHeaders);

        if(response.status === 200) {
            setInvalid(false);
            navigate("/homepage");
        } else {
            setInvalid(true);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        signUp()
    }

    useEffect(() => {
        console.log("loginInfo", loginInfo);
        console.log("loginHeaders", loginHeaders);
    });

    return (
        <div className="login-reg-con">
            <div className="form-con">
                <h3>Log in</h3>
                <p className="sub-info">Welcome Back! Please enter your details</p>

                <form className="login-reg-form" onSubmit={submitHandler}>
                    <div className="form-inner-con">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={userInput.email}
                            onInput={e => setUserInput({...userInput, email: e.target.value})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password}
                            onInput={e => setUserInput({...userInput, password: e.target.value})}
                        />
                    </div>

                    {invalid && <div className="form-inner-con">
                        <p className="invalid">Invalid Email/Password</p>
                    </div>}

                    <div className="form-inner-con">
                        <button type="Submit" className="form-btn">Sign in</button>
                    </div>
                </form>

                <p className="sub-info">Don't have an account? <span onClick={() => navigate("/userreg")}>Sign up</span></p>
            </div>
        </div>
    )
}

export default Login;
