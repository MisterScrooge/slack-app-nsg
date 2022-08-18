import { Route, Routes } from "react-router-dom";
import "./App.css"
import Login from "./components/Login/Login";
import UserReg from "./components/Login/UserReg";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userreg" element={<UserReg />}/>
      </Routes>
    </LoginProvider>
  );
}

export default App;
