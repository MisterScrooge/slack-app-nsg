import { useState } from 'react'

const UserReg = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [passConfInput, setPassConfInput] = useState('');

    const registration = (regData) => {
        console.log("regData", regData);
        fetch("http://206.189.91.54/api/v1/auth", {
            method: "POST",
            body: JSON.stringify(regData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    };

    const newReg = {
        email: emailInput,
        password: passInput,
        password_confirmation: passConfInput,
    };

    const submitHandler = (e) => {
        e.preventDefault();
        registration(newReg)
    };

    return (
        <div>
            <form>
                <label>Email: </label>
                <input type="text" value={emailInput} onInput={e => setEmailInput(e.target.value)}></input>
                <label>Pass: </label>
                <input type="text" value={passInput} onInput={e => setPassInput(e.target.value)}></input>
                <label>Pass conf: </label>
                <input type="text" value={passConfInput} onInput={e => setPassConfInput(e.target.value)}></input>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default UserReg

