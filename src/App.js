import { Route, Routes } from "react-router-dom";
import "./App.css"
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import UserReg from "./components/Login/UserReg";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userreg" element={<UserReg />}/>
        <Route path="/homepage" element={<HomePage />}/>
      </Routes>
    </LoginProvider>
  );
}

export default App;
