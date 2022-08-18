import { useState } from 'react'

const Trial = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');

    const login = (userData) => {
        console.log("userData", userData);
        fetch("http://206.189.91.54/api/v1/auth/sign_in", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(data => alert(`Welcome ${data.name}`))
    };

    const userLogin = {
        email: emailInput,
        password: passInput,
    };

    const submitHandler = (e) => {
        e.preventDefault();
        login(userLogin)
    };



    return (
        <div>
            <form>
                <label>Email: </label>
                <input type="text" value={emailInput} onInput={e => setEmailInput(e.target.value)}></input>
                <label>Pass: </label>
                <input type="text" value={passInput} onInput={e => setPassInput(e.target.value)}></input>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default Trial;