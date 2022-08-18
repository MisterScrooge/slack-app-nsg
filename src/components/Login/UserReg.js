import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-Reg.css";

const UserReg = () => {
    const [userInput, setUserInput] = useState({email: '', password: '', password_confirmation: ''});
    const navigate = useNavigate();

    return (
        <div className="login-reg-con">
            <div className="form-con">
                <h3>Create a new account</h3>
                <p className="sub-info">Please enter your details</p>

                <form className="login-reg-form">
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

                    <div className="form-inner-con">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password_confirmation}
                            onInput={e => setUserInput({...userInput, password_confirmation: e.target.value})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <button type="Submit" className="form-btn">Sign up</button>
                    </div>
                </form>

                <p className="sub-info">Already an account? <span onClick={() => navigate("/")}>Sign in</span></p>
            </div>
        </div>
    )
}

export default UserReg;
