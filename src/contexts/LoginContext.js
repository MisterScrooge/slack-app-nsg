import { createContext, useState } from "react";

export const LoginInfo = createContext();
export const LoginHeaders = createContext();

export const LoginProvider = ({children}) => {
    const [loginInfo, setLoginInfo] = useState(sessionStorage.getItem("loginInfo") === null ? {} : JSON.parse(sessionStorage.getItem("loginInfo")));
    const [loginHeaders, setLoginHeaders] = useState(sessionStorage.getItem("loginHeaders") === null ? {} : JSON.parse(sessionStorage.getItem("loginHeaders")));

    const updateLoginInfo = (info) => {
        sessionStorage.setItem("loginInfo", JSON.stringify(info));
        setLoginInfo(info);
    }

    const updateLoginHeaders = (headers) => {
        sessionStorage.setItem("loginHeaders", JSON.stringify(headers));
        setLoginHeaders(headers);
    }

    return (
        <LoginInfo.Provider value={{loginInfo, updateLoginInfo}}>
            <LoginHeaders.Provider value={{loginHeaders, updateLoginHeaders}}>
                {children}
            </LoginHeaders.Provider>
        </LoginInfo.Provider>
    )
}
