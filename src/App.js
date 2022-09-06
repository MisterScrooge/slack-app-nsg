import { Route, Routes } from "react-router-dom";
import "./App.css"
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import UserReg from "./components/Login/UserReg";
import { ChannelsProvider } from "./contexts/ChannelsContext";
import { LoginProvider } from "./contexts/LoginContext";
import { SelectedProvider } from "./contexts/SelectedContext";
import { UserDMsProvider } from "./contexts/UserDMsContext";
import { UsersProvider } from "./contexts/UsersContext";

function App() {
  return (
    <LoginProvider>
      <UsersProvider>
        <ChannelsProvider>
          <UserDMsProvider>
            <SelectedProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/userreg" element={<UserReg />}/>
                <Route path="/homepage/*" element={<HomePage />}/>
              </Routes>
            </SelectedProvider>
          </UserDMsProvider>
        </ChannelsProvider>
      </UsersProvider>
    </LoginProvider>
  );
}

export default App;