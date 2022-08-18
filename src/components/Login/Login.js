import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-Reg.css"

const Login = () => {
    const [userInput, setUserInput] = useState({email: '', password: ''});
    const navigate = useNavigate();

    return (
        <div className="login-reg-con">
            <div className="form-con">
                <h3>Log in</h3>
                <p className="sub-info">Welcome Back! Please enter your details</p>

                <form className="login-reg-form">
                    <div className="form-inner-con">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={userInput.email}
                            onInput={e => setUserInput({email: e.target.value, password: userInput.password})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password}
                            onInput={e => setUserInput({email: userInput.email, password: e.target.value})}
                        />
                    </div>

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
