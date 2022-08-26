import { createContext, useState } from "react";

export const UserDMsContext = createContext();

export const UserDMsProvider = ({children}) => {
    const [userDMs, setUserDms] = useState(sessionStorage.getItem("userDMs") === null ? [] : JSON.parse(sessionStorage.getItem("userDMs")));

    const updateUserDMs = (newDMs) => {
        sessionStorage.setItem("userDMs", JSON.stringify(newDMs));
        setUserDms(newDMs);
    }

    return (
        <UserDMsContext.Provider value={{userDMs, updateUserDMs}}>
            {children}
        </UserDMsContext.Provider>
    )
}
