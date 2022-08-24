import React, { useContext } from 'react'
import { LoginHeaders } from '../context/LoginContext';

export default function UserList() {
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);

    const url = 'http://206.189.91.54/api/v1'

    const handleClickSubmit = (event) => {
        event.preventDefault()

        fetch(`${url}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...loginHeaders,
        },
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    return (
        <>
        <div>
            <button onClick={handleClickSubmit}>Get All Users</button>
        </div>
        </>
    )
    }