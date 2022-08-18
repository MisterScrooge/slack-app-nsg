import { createContext, useState } from "react";

export const LoginInfo = createContext();
export const LoginHeaders = createContext();

export const LoginProvider = ({children}) => {
    const [loginInfo, setLoginInfo] = useState({});
    const [loginHeaders, setLoginHeaders] = useState({});

    const updateLoginInfo = (info) => {
        setLoginInfo(info);
    }

    const updateLoginHeaders = (headers) => {
        setLoginHeaders(headers);
    }

    return (
        <LoginInfo.Provider value={[loginInfo, updateLoginInfo]}>
            <LoginHeaders.Provider value={[loginHeaders, updateLoginHeaders]}>
                {children}
            </LoginHeaders.Provider>
        </LoginInfo.Provider>
    )
}
