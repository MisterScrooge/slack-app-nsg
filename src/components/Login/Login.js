import { useState } from "react";
import "./Login.css"

const Login = () => {
    const [userInput, setUserInput] = useState({email: '', password: ''});

    return (
        <div className="form-con">
            <h3>Log in</h3>
            <span className="sub-info">Welcome Back! Please enter your details</span>

            <form className="login-reg-form">
                <div className="form-inner-con">
                    <label>Email</label>
                    <input
                        type="text"
                        value={userInput.email}
                        onInput={e => setUserInput({email: e.target.value, password: userInput.password})}
                    />
                </div>

                <div className="form-inner-con">
                    <label>Password</label>
                    <input
                        type="text"
                        value={userInput.password}
                        onInput={e => setUserInput({email: userInput.email, password: e.target.value})}
                    />
                </div>

                <div className="form-inner-con">
                    <button type="Submit">Sign in</button>
                </div>
            </form>

            <span className="sub-info">Don't have an account? Sign up</span>
        </div>
    )
}

export default Login;
