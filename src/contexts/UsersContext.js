import { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState(sessionStorage.getItem("users") === null ? [] : JSON.parse(sessionStorage.getItem("users")));

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
