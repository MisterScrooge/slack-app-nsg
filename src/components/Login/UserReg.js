import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login-Reg.css";

const UserReg = () => {
    const [userInput, setUserInput] = useState({email: '', password: '', password_confirmation: ''});

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
                            onInput={e => setUserInput({email: e.target.value, password: userInput.password})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password}
                            onInput={e => setUserInput({email: userInput.email, password: e.target.value, password_confirmation: userInput.password_confirmation})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password_confirmation}
                            onInput={e => setUserInput({email: userInput.email, password: userInput.password, password_confirmation: e.target.value})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <button type="Submit" className="form-btn">Sign up</button>
                    </div>
                </form>

                <p className="sub-info">Already an account? <Link to="/">Sign in</Link></p>
            </div>
        </div>
    )
}

export default UserReg;
