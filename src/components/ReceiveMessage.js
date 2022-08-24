import React, { useContext, useState } from 'react'
import { LoginHeaders } from '../context/LoginContext';

const ReceiveMessage = () => {
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);

    const url = 'http://206.189.91.54/api/v1'

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(loginHeaders)
        fetch(`${url}/messages?receiver_id=2536&receiver_class=User`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...loginHeaders,
        },
        })
        .then((res) => res.json())
        .then((data) => console.log('', data))
    }

    return (
        <div>
            <h1>Receive Message</h1>
            <div>
                <button onClick={submitHandler}>Retrieve</button> 
            </div>
        </div>
    )
}

export default ReceiveMessage
