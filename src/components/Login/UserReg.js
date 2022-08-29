import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-Reg.css";

const UserReg = () => {
    const [userInput, setUserInput] = useState({email: '', password: '', password_confirmation: ''});
    const navigate = useNavigate();

    const registration = async (userInput) => {

        const response = await fetch("http://206.189.91.54/api/v1/auth", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInput)
        });

        if(response.status === 200) {
            navigate("/");
        } else {
            return;
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        registration(userInput)
    };

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
                        <label>Confirm Your Password</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={userInput.password_confirmation}
                            onInput={e => setUserInput({...userInput, password_confirmation: e.target.value})}
                        />
                    </div>

                    <div className="form-inner-con">
                        <button
                            type="Submit"
                            className="form-btn"
                            onClick={submitHandler}
                            >Sign up
                        </button>
                    </div>
                </form>

                <p className="sub-info">Already have an account? <span onClick={() => navigate("/")}>Sign in</span></p>
            </div>
        </div>
    )
}

export default UserReg;
