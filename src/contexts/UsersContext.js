import { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState([]);

    const updateUsers= (newUsers) => {
        setUsers(newUsers);
    }

    return (
        <UsersContext.Provider value={{users, updateUsers}}>
            {children}
        </UsersContext.Provider>
    )
}