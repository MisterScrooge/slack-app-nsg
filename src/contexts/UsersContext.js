import { createContext, useContext, useState } from "react";
import { LoginHeaders } from "./LoginContext";

export const UsersContext = createContext();

export const UsersProvider = ({children}) => {
    const {loginHeaders} = useContext(LoginHeaders);
    const url = "http://206.189.91.54/api/v1/";

    const retrieveUsers = async () => {
        const response = await fetch(`${url}users`,  {
            method: 'GET',
            headers: {...loginHeaders}
        });

        const data = await response.json();
        updateUsers(data['data']);
    }

    const [users, setUsers] = useState(sessionStorage.getItem("users") === null ? retrieveUsers() : JSON.parse(sessionStorage.getItem("users")));

    const updateUsers = (newUsers) => {
        sessionStorage.setItem("users", JSON.stringify(newUsers));
        setUsers(newUsers);
    }

    return (
        <UsersContext.Provider value={{users, updateUsers}}>
            {children}
        </UsersContext.Provider>
    )
}
