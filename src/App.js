import { Route, Routes } from "react-router-dom";
import "./App.css"
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import UserReg from "./components/Login/UserReg";
import { ChannelsProvider } from "./contexts/ChannelsContext";
import { LoginProvider } from "./contexts/LoginContext";
import { SelectedProvider } from "./contexts/SelectedContext";

function App() {
  return (
    <LoginProvider>
      <ChannelsProvider>
        <SelectedProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/userreg" element={<UserReg />}/>
            <Route path="/homepage" element={<HomePage />}/>
          </Routes>
        </SelectedProvider>
      </ChannelsProvider>
    </LoginProvider>
  );
}

export default App;
