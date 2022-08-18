import { Route, Routes } from "react-router-dom";
import "./App.css"
import Login from "./components/Login/Login";
import UserReg from "./components/Login/UserReg";

function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userreg" element={<UserReg />}/>
      </Routes>
    </div>
  );
}

export default App;
